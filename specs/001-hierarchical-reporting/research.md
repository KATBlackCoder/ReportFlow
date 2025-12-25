# Research Findings: Hierarchical Reporting Application

**Date**: 2025-12-24
**Context**: Nuxt 4 full-stack application with hierarchical workflow, RBAC, and audit trails

## Authentication with Phone Numbers

**Decision**: Use `nuxt-auth-utils` with custom phone number authentication flow
**Rationale**: The specification requires phone number as primary unique identifier, but `nuxt-auth-utils` is designed for email/password. We need to extend it to support phone-based authentication while maintaining the library's core functionality.
**Alternatives Considered**:

- Custom authentication system (rejected: violates constitution requirement for `nuxt-auth-utils`)
- Email fallback (rejected: specification requires phone as primary identifier)

**Implementation Approach**:

- Extend `nuxt-auth-utils` with custom phone validation
- Use phone number as username field
- Maintain email as optional secondary contact

## Database Schema Design

**Decision**: Use Nuxt Hub Database with PostgreSQL-compatible schema
**Rationale**: Nuxt Hub provides managed database with good Nuxt 4 integration, supporting the required relational model for users, reports, and audit trails.
**Alternatives Considered**:

- SQLite (rejected: not suitable for concurrent multi-user access)
- External PostgreSQL (rejected: adds complexity, Nuxt Hub meets requirements)

**Schema Considerations**:

- Users table with phone primary key
- Reports table with state machine columns
- Audit log table for 7-year retention
- Foreign key relationships for hierarchical data

## State Machine Implementation

**Decision**: Implement workflow state machine in server-side composables with database transactions
**Rationale**: Report state transitions are business-critical and must be atomic. Server-side implementation ensures consistency and prevents client-side bypass.
**Alternatives Considered**:

- Client-side state management only (rejected: violates security requirements)
- Database triggers (rejected: less maintainable than code-based logic)

**State Transitions**:

- submitted → returned/in_progress (with validation rules)
- returned → submitted (with modification flag)
- in_progress → validated (final approval)
- All transitions logged with audit trail

## Excel Export Implementation

**Decision**: Use `xlsx` library with server-side generation and streaming
**Rationale**: Provides reliable Excel generation, supports large datasets, and can be implemented server-side for security and performance.
**Alternatives Considered**:

- Client-side generation (rejected: exposes data to client, potential performance issues)
- CSV export (rejected: specification requires Excel format)

**Security Considerations**:

- Server-side only access
- Role-based data filtering before export
- File streaming for large datasets

## Audit Trail Architecture

**Decision**: Immutable audit log with partitioned storage for 7-year retention
**Rationale**: Legal compliance requires long-term data retention. Partitioning ensures performance while maintaining accessibility for compliance reviews.
**Alternatives Considered**:

- Single table (rejected: performance degradation over time)
- External audit system (rejected: adds complexity, native solution sufficient)

**Implementation**:

- Automatic audit entries on all state changes
- User attribution for all actions
- Partitioning by year for efficient queries
- Legal hold capabilities for investigations

## Form Validation Strategy

**Decision**: Dual validation (client + server) with reusable validation composables
**Rationale**: Client-side validation improves UX, server-side validation ensures security. Reusable composables maintain consistency across role-specific forms.
**Alternatives Considered**:

- Server-only validation (rejected: poor user experience)
- Library-based validation (rejected: custom business rules required)

**Validation Layers**:

- Field-level validation (required, format, length)
- Business rule validation (role permissions, state constraints)
- Cross-field validation (date ranges, dependencies)

## Concurrent Access Handling

**Decision**: Optimistic locking with conflict resolution UI
**Rationale**: Multiple reviewers may access reports simultaneously. Optimistic locking prevents data corruption while providing user-friendly conflict resolution.
**Alternatives Considered**:

- Pessimistic locking (rejected: poor user experience for concurrent workflows)
- Last-write-wins (rejected: violates data integrity requirements)

**Conflict Resolution**:

- Detect concurrent modifications
- Present changes to user for manual resolution
- Maintain audit trail of conflicts and resolutions

## Performance Optimization Strategy

**Decision**: Database indexing, query optimization, and selective hydration
**Rationale**: Target of 100-500 concurrent users requires efficient data access patterns. Proper indexing and query optimization essential for 2-second response time target.
**Alternatives Considered**:

- Cache everything (rejected: audit requirements need fresh data)
- No optimization (rejected: violates performance requirements)

**Optimization Techniques**:

- Composite indexes on frequently queried fields (user_id, state, created_at)
- Query result limiting and pagination
- Selective field loading based on use case
