
# Repair Shop Frontend

A React-based frontend for the Repair Shop Application, designed to help users create and view customer repair requests.

## What I Built

* Created a user-friendly repair request form using React.
* Added fields for customer name, vehicle/device, and repair issue.
* Connected the frontend to a Node.js backend API.
* Added success and error messages for user actions.
* Displayed submitted repair requests with their current status.
* Created a production build using Vite.
* Deployed the frontend to Amazon S3 static website hosting.

## How It Works

```text
User enters repair details
          |
          V
React frontend sends the request
          |
          V
Node.js backend processes it
          |
          V
Amazon RDS stores the repair details
          |
          V
User receives confirmation
```

## Technologies Used

 Technology               Purpose                          

 React               -   Frontend application             
 Vite                -   Development and production build 
 Amazon S3           -   Frontend hosting                 
 Node.js / Express   -   Backend API                      
 Amazon RDS MySQL    -   Data storage                     

## Project Outcome

The frontend was successfully deployed to AWS and connected to the backend and database.

A user can submit a repair request through the AWS-hosted website, receive a confirmation message, and have the request stored in the application database.

## Support Relevance

This project provided practical experience with:

* Frontend deployment
* API integration
* HTTP request troubleshooting
* CORS-related issues
* S3 static website hosting
* End-to-end application validation

The frontend also provides a starting point for troubleshooting real application issues such as unavailable APIs, failed requests, incorrect configuration, and hosting problems.
