FROM openjdk:21
EXPOSE 8080
ADD "backend_e-source/target/app.jar" app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]