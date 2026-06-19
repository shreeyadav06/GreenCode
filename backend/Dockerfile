FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/classes /app/classes
# Also need to copy dependencies. Actually, maven exec plugin runs it, but for a raw java command we need a fat jar or dependency copies.
# Let's adjust Dockerfile to use maven exec just like local, or build a shadow jar.
# Actually, the simplest way is to run `mvn compile exec:java` in the container.

FROM maven:3.9.6-eclipse-temurin-21
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Pre-fetch dependencies
RUN mvn dependency:go-offline
# We expose 8080
EXPOSE 8080
# Run the application
CMD ["mvn", "exec:java"]
