
# Incident 01 – Backend Service Stopped

## Incident Summary

A repair request could not be submitted from the production frontend because the backend API running on Amazon EC2 had been stopped.

This incident demonstrates a practical Cloud Support workflow: **identify customer impact -> isolate the failing layer -> investigate -> identify root cause -> restore service -> validate recovery.**

---

## Incident Flow

**Customer Impact -> API Investigation -> EC2 Investigation -> Root Cause -> Remediation -> Recovery Validation**

### 1. Customer Impact

The production Repair Shop frontend was accessible, but submitting a repair request failed.

![Customer-facing failure](screenshots/01-repair-request-failed.png)


> Reproduced the customer-facing failure, confirming that repair requests could no longer be submitted through the production frontend.

---

### 2. API Investigation

The backend `/health` endpoint was tested directly and was unreachable.

![Backend API unreachable](screenshots/02-backend-api-unreachable.png)


> Validated that the frontend failure was caused by the backend API becoming unreachable.

---

### 3. EC2 Service Investigation

The EC2 systemd service was checked and found to be inactive.

![Backend service inactive](screenshots/03-backend-service-inactive.png)


> Investigated the EC2 application service and confirmed that the backend systemd service was inactive.

---

### 4. Root Cause Investigation

The service status and system logs were reviewed to confirm that the backend process was no longer running.

![Service investigation](screenshots/04-service-investigation.png)



**Root Cause:**
The `repairshop-backend` systemd service had been stopped, making the backend API unavailable on port `3000`.

---

### 5. Remediation

The backend service was restored using systemd.

![Backend service restored](screenshots/05-backend-service-restored.png)



> Restored the failed backend service using systemd and confirmed that the application process returned to a running state.

---

### 6. API Recovery

The backend health endpoint was tested again and returned a healthy response.

![API health restored](screenshots/06-api-health-restored.png)



> Validated service recovery through the API health endpoint, confirming that the backend was responding normally again.

---

### 7. End-to-End Customer Recovery

A repair request was successfully submitted through the production frontend after the backend service was restored.

![Repair request recovered](screenshots/07-repair-request-recovered.png)



> Completed end-to-end recovery validation by successfully submitting a repair request after restoring the backend service.

---

## Root Cause

**Backend systemd service stopped → EC2 API unavailable → frontend requests failed.**

---

## Resolution

The `repairshop-backend` systemd service was started and verified as running. The API health endpoint and complete frontend-to-backend workflow were then tested successfully.

---

##  Support Skills Demonstrated

* Customer-impact identification
* API health verification
* EC2 troubleshooting
* Linux/systemd investigation
* Log analysis
* Root-cause identification
* Service remediation
* End-to-end recovery validation
* Incident documentation

---

## AWS Components Involved

| Component         |     Role                               |

| Amazon S3         -   Hosts the production frontend        |
| Amazon EC2        -   Runs the Node.js backend API         |
| Amazon RDS        -   Stores repair requests               |
| systemd           -   Manages the backend service          |
| CloudWatch / Logs -   Supports operational troubleshooting |

---

## Incident Outcome

The backend service was restored and the complete application flow was recovered.

**Customer -> S3 Frontend -> EC2 Backend API -> RDS**

This incident demonstrates the ability to **troubleshoot a customer-facing cloud application systematically, identify the failed service, apply a targeted fix, and verify complete recovery.**
