# Incident 04 – Frontend Cannot Reach Backend API

## Incident Summary

A customer was unable to submit a repair request even though the production Repair Shop frontend was loading normally.

The backend API was healthy and reachable, but requests originating from the S3-hosted frontend were being blocked by an incorrect **CORS configuration** on the backend.

This incident demonstrates a practical Cloud Support workflow: **identify customer impact -> inspect browser evidence -> isolate the backend -> investigate application configuration -> identify root cause -> restore configuration -> validate recovery.**

---

## Incident Flow

**Customer Impact → Browser Investigation → Backend Verification → Configuration Investigation → Root Cause → Remediation → Recovery**

### 1. Customer Impact

The production frontend was accessible, but submitting a repair request failed.

[Customer frontend failure](01-repair-request-frontend-failure.png)


> Confirmed that customers could access the application but were unable to complete the repair request workflow.

---

### 2. Browser Investigation

The browser developer console was inspected after reproducing the failure.

[Browser CORS error](02-browser-console-cors-error.png)


> Browser diagnostics showed that the frontend request was being rejected by the backend's cross-origin access policy.

---

### 3. Backend Verification

The backend health endpoint was tested independently to determine whether the API itself was unavailable.

[Backend API reachable](03-backend-api-reachable.png)


> Verified that the backend remained healthy, ruling out backend service availability as the primary cause of the customer-facing failure.

---

### 4. CORS Configuration Investigation

The backend configuration was reviewed and the configured CORS origin was found to be incorrect.

[CORS configuration investigation](04-cors-configuration-investigation.png)


> Identified an invalid allowed origin in the backend configuration, preventing requests from the production S3 frontend.

---

## Root Cause

**Incorrect CORS origin → browser blocked frontend API request → repair request could not reach the application endpoint → customer submission failed.**

---

### 5. Remediation

The incorrect CORS setting was replaced with the working configuration and the backend service was restarted.

[CORS configuration restored](05-cors-configuration-restored.png)


> Applied the corrected cross-origin configuration and restarted the backend so the updated policy became active.

---

### 6. API Recovery

The backend API was tested directly after the configuration change.

[API recovery](06-api-recovery.png)


> Confirmed that the API could successfully process a repair request after the configuration change was applied.

---

### 7. Customer Recovery

The production frontend was tested again after the backend configuration was restored.

[Repair request recovered](07-repair-request-recovered.png)


> Verified that the complete customer workflow was operational again through the production frontend.

---

##  Skills Demonstrated

* Customer-impact identification
* Browser-based troubleshooting
* API health verification
* Cross-origin request troubleshooting
* Application configuration analysis
* Layer-by-layer fault isolation
* Root-cause identification
* Targeted configuration remediation
* API validation
* End-to-end recovery testing
* Incident documentation


## Incident Outcome

The incorrect CORS configuration was corrected without changing the database or application functionality.

The complete application flow returned to normal:

**Customer -> S3 Frontend -> EC2 Backend -> RDS MySQL**

