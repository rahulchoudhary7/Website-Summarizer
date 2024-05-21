# Use the official OpenJDK 21 image as the base image
FROM openjdk:21-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build directory to the container
COPY build/libs /app

# Expose the port your application runs on
EXPOSE 3030

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "/app/summarizer-0.0.1-SNAPSHOT.jar"]
