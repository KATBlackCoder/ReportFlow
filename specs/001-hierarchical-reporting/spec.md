# Feature Specification: Hierarchical Reporting Application

**Feature Branch**: `001-hierarchical-reporting`
**Created**: 2025-12-24
**Status**: Draft
**Input**: User description: "# 📘 Specification — Hierarchical Reporting Application"

---

**⚠️ CONSTITUTION REQUIREMENT**: This specification is MANDATORY per Section 2.1 (Spec-Driven Development).
All implementation MUST satisfy these verified requirements. Tests MUST map to acceptance criteria.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Report as Employee (Priority: P1)

An employee submits a role-based questionnaire report that follows the hierarchical workflow validation process.

**Why this priority**: This is the core functionality - without report submission, the entire application has no value. Employees need to submit reports regularly, making this the most frequently used feature.

**Independent Test**: Can be fully tested by an employee logging in, filling out their questionnaire, and submitting it. The report should appear in the supervisor's dashboard for review, demonstrating the complete submission workflow.

**Acceptance Scenarios**:

1. **Given** an authenticated employee (R4), **When** they fill out and submit their role-specific questionnaire, **Then** the report is created in `submitted` state and becomes visible only to their supervisor (R3)
2. **Given** an authenticated supervisor (R3), **When** they fill out and submit their role-specific questionnaire, **Then** the report is created in `submitted` state and becomes visible to both R2 and R1
3. **Given** a submitted report, **When** the author views it, **Then** they can edit all fields freely while in `submitted` state

---

### User Story 2 - Review and Validate Reports (Priority: P1)

Supervisors and higher roles review submitted reports, either validate them to advance in the workflow or flag them for corrections.

**Why this priority**: Report review is equally critical to submission - without validation, reports cannot progress through the hierarchy. This enables the accountability and traceability requirements.

**Independent Test**: Can be fully tested by a supervisor receiving a submitted report, reviewing it, and either validating it (advancing to next level) or flagging it (returning to author with reason). The state transitions and visibility changes should be immediately verifiable.

**Acceptance Scenarios**:

1. **Given** a supervisor (R3) with a submitted report from an employee (R4), **When** they validate the report, **Then** the report transitions to `in_progress` state, becomes read-only for the author, and becomes visible to R2 and R1
2. **Given** a supervisor (R3) with a submitted report from an employee (R4), **When** they flag the report with a correction reason, **Then** the report transitions to `returned` state and is sent back to the author for editing
3. **Given** a report in `returned` state, **When** the author edits and resubmits it, **Then** the `modified` flag is set permanently and visible to all higher roles

---

### User Story 3 - Hierarchical Approval Workflow (Priority: P1)

Higher-level roles (R2, R1) provide final validation or rejection of reports that have passed initial supervisor review.

**Why this priority**: This completes the hierarchical validation chain. Without final approval, reports cannot reach their validated state, breaking the accountability workflow.

**Independent Test**: Can be fully tested by submitting a report that goes through R3 validation, then having R2 or R1 either validate it (final approval) or flag it for corrections. The complete workflow from submission to final validation should work independently.

**Acceptance Scenarios**:

1. **Given** a report in `in_progress` state (validated by R3), **When** R2 validates it, **Then** the report transitions to `validated` state and becomes permanently locked
2. **Given** a report in `submitted` state from R3, **When** R2 flags it with a correction reason, **Then** the report transitions to `returned` state and is sent back to R3 for editing
3. **Given** a report in `in_progress` or `validated` state, **When** any role attempts to edit it, **Then** the operation is blocked and the report remains unchanged

---

### User Story 4 - Role-Based User Management (Priority: P2)

Administrative users manage other users according to strict hierarchical permissions, including creation, editing, and deletion.

**Why this priority**: User management is essential for system administration but less frequently used than core reporting workflows. However, it's critical for system maintenance and access control.

**Independent Test**: Can be fully tested by an administrator (R1 or R2) creating, editing, and deleting users within their permitted scope. The role-based restrictions should prevent unauthorized operations.

**Acceptance Scenarios**:

1. **Given** an authenticated R1 user, **When** they create a new user of any role, **Then** the user is created successfully and can authenticate
2. **Given** an authenticated R2 user, **When** they attempt to create an R1 or R2 user, **Then** the operation is blocked and an error is displayed
3. **Given** an authenticated user, **When** they view their own profile, **Then** they can see and edit their personal information regardless of role
4. **Given** a user attempting to edit another user's profile, **When** they don't have permission based on role hierarchy, **Then** the operation is blocked

---

### User Story 5 - Export Reports by Role (Priority: P3)

Users export reports in Excel format according to their role-based permissions and data scope.

**Why this priority**: Export functionality is important for reporting and analysis but is a secondary feature used less frequently than core submission and review workflows.

**Independent Test**: Can be fully tested by users of different roles attempting to export reports. Each role should only see data they are permitted to access, and exports should be properly formatted as Excel files.

**Acceptance Scenarios**:

1. **Given** an authenticated R1 user, **When** they request a full export, **Then** all reports in the system are included in the Excel export
2. **Given** an authenticated R2 user, **When** they request an export, **Then** all reports in the system are included in the Excel export
3. **Given** an authenticated R3 user, **When** they request an export, **Then** only reports from their team (R4 users under their supervision) are included
4. **Given** an authenticated R4 user, **When** they attempt to export, **Then** the operation is blocked and no export is generated

---

### Edge Cases

- What happens when a supervisor (R3) submits a report but there are no R2 users available to review it?
- How does the system handle concurrent edits when multiple reviewers access the same report simultaneously?
- What happens when a user is deleted while they have pending reports in the workflow?
- How does the system prevent role escalation attacks through user management operations?
- What happens when network connectivity is lost during report submission or validation?
- How does the system handle reports with extremely large amounts of data or attachments?
- What happens when a report author is reassigned to a different supervisor mid-workflow?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement strict role-based access control with four hierarchical roles (R1-R4) as defined in the specification
- **FR-002**: System MUST authenticate users using nuxt-auth-utils with custom login endpoint supporting both phone number and email as identifiers, with phone number as primary unique identifier
- **FR-003**: System MUST provide password reset functionality via email reset links
- **FR-004**: System MUST enforce user management permissions where R1 can manage all roles, R2 can manage R3-R4 only, and R3-R4 have no management permissions
- **FR-005**: System MUST display role-specific questionnaires created exclusively by R1
- **FR-006**: System MUST route submitted reports according to role hierarchy (R4→R3 only, R3→R2+R1)
- **FR-007**: System MUST implement report state transitions (submitted→returned/in_progress→validated) with proper validation rules
- **FR-008**: System MUST enforce editability rules based on report state and author permissions
- **FR-009**: System MUST set and persist modification flags when reports are edited after submission
- **FR-010**: System MUST lock reports in in_progress or validated states to prevent further modifications
- **FR-011**: System MUST enforce export permissions by role with Excel format output
- **FR-012**: System MUST persist complete audit trail including timestamps, authors, validation actions, and flag reasons
- **FR-013**: System MUST implement both server-side and UI-side RBAC enforcement to prevent unauthorized access
- **FR-016**: System MUST protect against authentication attacks including brute force and credential stuffing
- **FR-017**: System MUST protect against data tampering including man-in-the-middle and injection attacks
- **FR-018**: System MUST retain audit data for 7 years for legal compliance and 2 years for operational audit
- **FR-014**: System MUST use reusable form components with dynamic role-based dispatching for questionnaires
- **FR-015**: System MUST ensure business rules are not embedded in UI components but handled separately

### Key Entities *(include if feature involves data)*

- **User**: Represents system users with role hierarchy (R1-R4), phone number as primary unique identifier, optional email address, and profile information
- **Questionnaire**: Role-specific form templates created by R1, containing field definitions and validation rules
- **Report**: User-submitted responses to questionnaires with state transitions, audit trail, and modification tracking
- **Review Action**: Validation or flagging actions performed by reviewers, including timestamps and reasons
- **Audit Entry**: Immutable log entries tracking all report lifecycle events and user actions

## Clarifications

### Session 2025-12-24

- Q: What unique identifier will be used for users (email, employee ID, UUID, etc.) and what are the uniqueness constraints? → A: Phone number (required, unique) + email address (optional)
- Q: What specific security threats should the system protect against beyond role-based access control? → A: Authentication attacks (brute force, credential stuffing) + data tampering (man-in-the-middle, injection attacks)
- Q: What is the expected scale in terms of users and reports? → A: Medium scale (100-500 users, 1000-5000 reports/month) for a departmental system
- Q: What are the performance requirements for concurrent users? → A: Good performance (2-second response time, support for peak concurrent usage)
- Q: How long should audit data be retained? → A: 7 years (legal compliance) + 2 years (operational)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of submitted reports follow correct hierarchical routing based on author role
- **SC-002**: All report state transitions occur deterministically according to defined workflow rules
- **SC-003**: Zero unauthorized access attempts succeed through both UI and server-side enforcement
- **SC-004**: 100% of flagged reports include mandatory correction reasons provided by reviewers
- **SC-005**: Reports in locked states (in_progress/validated) maintain data integrity with zero unauthorized modifications
- **SC-006**: All role-based permissions are correctly enforced for user management operations
- **SC-007**: Export operations respect role-based data scope limitations with 100% accuracy
- **SC-008**: Complete audit trails are maintained for all report lifecycle events with full traceability
- **SC-009**: Users can complete questionnaire submission within 5 minutes for typical report complexity
- **SC-010**: Reviewers can complete report validation decisions within 3 minutes per report
- **SC-011**: System MUST support 100-500 concurrent users with 2-second average response time
- **SC-012**: System MUST handle 1000-5000 reports per month with storage capacity for 50,000 reports and automatic cleanup of reports older than 7 years