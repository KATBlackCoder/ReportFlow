import type { ReportState } from "./report";

/**
 * Review action types for report workflow
 */
export enum ReviewActionType {
  VALIDATE = "validate",
  FLAG = "flag",
}

/**
 * Review action entity interface
 */
export interface ReviewAction {
  id: string;
  reportId: string;
  reviewerId: string;
  actionType: ReviewActionType;
  fromState: ReportState;
  toState: ReportState;
  reason: string | null;
  createdAt: Date;
}

/**
 * Payload for creating a review action
 */
export interface CreateReviewActionPayload {
  reportId: string;
  actionType: ReviewActionType;
  reason?: string;
}

/**
 * Payload for validating a report
 */
export interface ValidateReportPayload {
  reportId: string;
}

/**
 * Payload for flagging a report
 */
export interface FlagReportPayload {
  reportId: string;
  reason: string;
}

/**
 * Review action display labels (French)
 */
export const REVIEW_ACTION_LABELS: Record<ReviewActionType, string> = {
  [ReviewActionType.VALIDATE]: "Validé",
  [ReviewActionType.FLAG]: "Retourné pour correction",
} as const;

/**
 * Check if a reason is required for the action type
 */
export function isReasonRequired(actionType: ReviewActionType): boolean {
  return actionType === ReviewActionType.FLAG;
}

