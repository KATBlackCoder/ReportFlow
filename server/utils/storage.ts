/**
 * Storage scaling and partitioning strategy for high-volume data
 * Designed for 1000-5000 reports/month with 7-year audit retention
 */

/**
 * Partition configuration for database tables
 */
export const PARTITION_CONFIG = {
  // Audit entries partitioned by year for efficient queries and retention
  audit: {
    strategy: "yearly" as const,
    retentionYears: 7,
  },
  // Reports partitioned by quarter for balanced distribution
  reports: {
    strategy: "quarterly" as const,
    retentionYears: 10, // Business requirement
  },
} as const;

/**
 * Get partition key for a date (YYYY format for yearly, YYYY-QN for quarterly)
 */
export function getPartitionKey(
  date: Date,
  strategy: "yearly" | "quarterly" | "monthly"
): string {
  const year = date.getFullYear();

  switch (strategy) {
    case "yearly":
      return `${year}`;
    case "quarterly": {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      return `${year}-Q${quarter}`;
    }
    case "monthly": {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return `${year}-${month}`;
    }
    default:
      return `${year}`;
  }
}

/**
 * Get date range for a partition key
 */
export function getPartitionDateRange(
  partitionKey: string
): { start: Date; end: Date } | null {
  // Yearly: "2024"
  if (/^\d{4}$/.test(partitionKey)) {
    const year = parseInt(partitionKey, 10);
    return {
      start: new Date(year, 0, 1),
      end: new Date(year, 11, 31, 23, 59, 59, 999),
    };
  }

  // Quarterly: "2024-Q1"
  const quarterMatch = partitionKey.match(/^(\d{4})-Q([1-4])$/);
  if (quarterMatch) {
    const year = parseInt(quarterMatch[1], 10);
    const quarter = parseInt(quarterMatch[2], 10);
    const startMonth = (quarter - 1) * 3;
    const endMonth = startMonth + 2;
    return {
      start: new Date(year, startMonth, 1),
      end: new Date(year, endMonth + 1, 0, 23, 59, 59, 999),
    };
  }

  // Monthly: "2024-01"
  const monthMatch = partitionKey.match(/^(\d{4})-(\d{2})$/);
  if (monthMatch) {
    const year = parseInt(monthMatch[1], 10);
    const month = parseInt(monthMatch[2], 10) - 1;
    return {
      start: new Date(year, month, 1),
      end: new Date(year, month + 1, 0, 23, 59, 59, 999),
    };
  }

  return null;
}

/**
 * Calculate storage estimates based on expected volume
 */
export interface StorageEstimate {
  table: string;
  rowsPerMonth: number;
  rowSizeKb: number;
  monthlyGrowthMb: number;
  yearlyGrowthGb: number;
  retentionYears: number;
  maxStorageGb: number;
}

export function calculateStorageEstimates(): StorageEstimate[] {
  return [
    {
      table: "reports",
      rowsPerMonth: 3000, // Average 3000 reports/month
      rowSizeKb: 5, // ~5KB per report (including JSON data)
      monthlyGrowthMb: 15,
      yearlyGrowthGb: 0.18,
      retentionYears: 10,
      maxStorageGb: 1.8,
    },
    {
      table: "audit_entries",
      rowsPerMonth: 15000, // ~5 actions per report average
      rowSizeKb: 2, // ~2KB per audit entry
      monthlyGrowthMb: 30,
      yearlyGrowthGb: 0.36,
      retentionYears: 7,
      maxStorageGb: 2.5,
    },
    {
      table: "review_actions",
      rowsPerMonth: 6000, // ~2 reviews per report
      rowSizeKb: 1, // ~1KB per review action
      monthlyGrowthMb: 6,
      yearlyGrowthGb: 0.07,
      retentionYears: 10,
      maxStorageGb: 0.7,
    },
    {
      table: "users",
      rowsPerMonth: 10, // Low user churn
      rowSizeKb: 1,
      monthlyGrowthMb: 0.01,
      yearlyGrowthGb: 0.0001,
      retentionYears: 10,
      maxStorageGb: 0.01,
    },
  ];
}

/**
 * Index recommendations for query optimization
 */
export const RECOMMENDED_INDEXES = [
  {
    table: "reports",
    columns: ["author_id", "state", "created_at"],
    purpose: "User report listings with state filter",
  },
  {
    table: "reports",
    columns: ["state", "author_role", "created_at"],
    purpose: "Reviewer queues by role",
  },
  {
    table: "reports",
    columns: ["questionnaire_id", "state"],
    purpose: "Questionnaire-based queries",
  },
  {
    table: "audit_entries",
    columns: ["actor_id", "created_at"],
    purpose: "User activity audit",
  },
  {
    table: "audit_entries",
    columns: ["resource_type", "resource_id", "created_at"],
    purpose: "Resource history lookup",
  },
  {
    table: "review_actions",
    columns: ["report_id", "created_at"],
    purpose: "Report review history",
  },
  {
    table: "users",
    columns: ["role", "is_active"],
    purpose: "Role-based user listing",
  },
] as const;

/**
 * Query pagination defaults
 */
export const PAGINATION_DEFAULTS = {
  defaultLimit: 50,
  maxLimit: 100,
  defaultOffset: 0,
} as const;

/**
 * Validate and normalize pagination parameters
 */
export function normalizePagination(
  limit?: number,
  offset?: number
): { limit: number; offset: number } {
  const normalizedLimit = Math.min(
    Math.max(1, limit ?? PAGINATION_DEFAULTS.defaultLimit),
    PAGINATION_DEFAULTS.maxLimit
  );
  const normalizedOffset = Math.max(0, offset ?? PAGINATION_DEFAULTS.defaultOffset);

  return { limit: normalizedLimit, offset: normalizedOffset };
}

