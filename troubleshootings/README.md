
# Incident 02 – Database Connectivity Failure

## Incident Summary

A customer was unable to submit a repair request because the EC2 backend could not connect to the private Amazon RDS MySQL database.

The incident was caused by a missing **RDS Security Group rule** allowing the backend EC2 security group to access MySQL on port `3306`.

This incident demonstrates a practical Cloud Support workflow: **identify customer impact -> isolate the failing layer -> verify network connectivity -> identify root cause -> restore access -> validate recovery.**

---

## Incident Flow

**Customer Impact -> API Investigation -> Network Investigation -> Root Cause -> Remediation -> Recovery**

### 1. Customer Impact

The production frontend was available, but submitting a repair request failed.

![Customer database failure](01-repair-request-database-failure.png)


> Reproduced the customer-facing failure, confirming that repair requests could not be saved to the backend database.

---

### 2. API Investigation

The backend API remained reachable, but the database-dependent repair request failed.

![API database error](02-api-database-error.png)


> Confirmed that the backend API was available while database operations were failing, narrowing the issue to backend-to-database connectivity.

---

### 3. Security Group Investigation

The RDS Security Group was inspected and the required MySQL access rule from the backend security group was found to be missing.

![RDS security group rule missing](03-rds-security-group-rule-missing.png)


> Identified the missing inbound MySQL access rule required by the EC2 backend.

---

### 4. Connectivity Verification

The EC2 instance was used to test connectivity to the RDS MySQL port.

![Database connectivity investigation](04-database-connectivity-investigation.png)


> Verified that the EC2-to-RDS network connection was blocked, confirming the security-group configuration as the failing layer.

---

## Root Cause

**Missing RDS Security Group rule -> EC2 could not reach RDS on TCP 3306 -> database requests failed -> customer repair submissions failed.**

---

### 5. Remediation

The required MySQL rule was restored for the backend security group.

![RDS security group rule restored](05-rds-security-group-rule-restored.png)


> Restored the required MySQL access rule for the EC2 backend security group.

---

### 6. API Recovery

A database-backed repair request was successfully processed after restoring connectivity.

![API database recovery](06-api-database-recovery.png)


> Confirmed backend recovery by successfully completing a database-backed repair request.

---

### 7. Customer Recovery

The production frontend was tested again and the repair request was successfully submitted.

![Repair request recovered](07-repair-request-recovered.png)



> Completed end-to-end recovery validation by successfully submitting a repair request through the production frontend.

---

##  Support Skills Demonstrated

* Customer-impact identification
* API troubleshooting
* EC2-to-RDS connectivity testing
* AWS Security Group troubleshooting
* Network-layer isolation
* Root-cause identification
* Least-scope access restoration
* End-to-end recovery validation
* Incident documentation


## Incident Outcome

Database connectivity was restored without changing the application code.

The complete application flow returned to normal:

**Customer -> S3 Frontend -> EC2 Backend -> RDS MySQL**

### HR / Recruiter Takeaway

This incident demonstrates the ability to **troubleshoot a cloud application layer by layer, use AWS networking evidence to identify the root cause, apply a targeted configuration fix, and verify customer recovery.**
