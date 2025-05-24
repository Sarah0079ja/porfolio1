To build my portfolio website, I leveraged a modern, cloud-native architecture on Google Cloud Platform (GCP) to ensure performance, scalability, and automation.
The frontend was hosted on Google Cloud Storage (GCS) with Cloud CDN to cache assets globally for low-latency delivery. I used Namecheap to manage my custom domain,
seamlessly pointing traffic to a global HTTPS Load Balancer. The backend was powered by Cloud Run, hosting a containerized API that serves visitor analytics. 
This API connects securely to Firestore, a fully-managed NoSQL database, which remains private and access-controlled.
My CI/CD pipeline was automated using Cloud Build, triggered by GitHub pushes. Each build pushed artifacts to Artifact Registry and stored logs in Cloud Storage
for traceability. This architecture showcases my ability to design scalable, secure, and automated solutions using GCP’s suite of tools.





