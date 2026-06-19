FROM maven:3.9.6-eclipse-temurin-21
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Pre-fetch dependencies for faster subsequent boots
RUN mvn dependency:go-offline

# Expose backend port
EXPOSE 8080

# Run the application
CMD ["mvn", "exec:java"]
