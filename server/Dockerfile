FROM ubuntu:latest
LABEL authors="thanush"

ENTRYPOINT ["top", "-b"]

# Use a base image with your desired Jakarta EE runtime, e.g., Payara Server
FROM payara/server-full:latest

# Set environment variables
ENV DEPLOY_DIR /opt/payara/deployments

# Copy your WAR or EAR file to the deployments directory
COPY server.war $DEPLOY_DIR/

# Expose the port your Jakarta EE application will run on
EXPOSE 8080

# Start Payara Server
CMD ["start-domain", "--verbose"]
