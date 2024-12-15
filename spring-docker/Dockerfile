FROM eclipse-temurin:17

LABEL maintainer="chiradev.com@gmail.com"

WORKDIR /app

COPY target/spring-docker-0.0.1-SNAPSHOT.jar /app/springboot-docker.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "springboot-docker.jar"]
