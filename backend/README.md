# Repair Shop Backend

Node.js + Express backend API for the Repair Shop Application, deployed on Amazon EC2 and connected to a private Amazon RDS MySQL database.

## What I Built

* Developed REST APIs using **Node.js and Express**
* Connected the application to **Amazon RDS MySQL**
* Implemented repair request creation and database persistence
* Added API health-check endpoint for service validation
* Configured environment variables for database credentials
* Ran the backend as a **systemd service** on Amazon EC2 for continuous operation
* Enabled CORS to allow communication with the S3-hosted frontend

## Application Flow

```text
React Frontend
      |
      V
EC2 Node.js / Express API
      |
      v
Private RDS MySQL
      |
      V
Repair Request Stored
```

## API Endpoints

 Method | Endpoint  | Purpose                           

 GET    - `/`       - Verify API is running             
 GET    - `/health` - Service health check              
 POST   -  `/repair` - Create and store a repair request 

## AWS Deployment

 Component           | AWS Service      

 Backend application - Amazon EC2       
 Database            - Amazon RDS MySQL 
 Networking          - Amazon VPC       
 Access control      - Security Groups  
 Service management  - Linux systemd    

The EC2 backend communicates with RDS through the private VPC network. Database access is restricted through the backend EC2 security group rather than exposing MySQL publicly.

## Cloud Relevance

This backend was designed not only as an application but also as a troubleshooting environment.

The deployment provides practical experience with:

* EC2 service and process troubleshooting
* Application health validation
* RDS connectivity troubleshooting
* Security Group analysis
* Application logs and error investigation
* Linux service management with systemd
* End-to-end API validation
* Frontend-to-backend connectivity troubleshooting

## Security

Sensitive configuration is stored in environment variables and is **not committed to GitHub**.

The repository excludes:

* `.env` files
* Private keys
* `node_modules`
* Generated build files

## Validation

The deployed backend was validated by:

1. Checking the EC2 backend service
2. Testing the `/health` endpoint
3. Submitting a repair request through the API
4. Confirming the request was stored in the private RDS database
5. Validating the same workflow through the AWS-hosted frontend

**Result:** The backend successfully supports the Repair Shop application's production workflow and provides a realistic environment for Cloud Support troubleshooting scenarios.

