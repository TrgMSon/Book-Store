# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy file cấu hình trước để tận dụng Docker Cache (giúp build nhanh hơn ở các lần sau)
COPY pom.xml .
COPY src ./src

# Build ứng dụng
RUN mvn clean package -DskipTests

# Stage 2: Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy file .war từ build stage
COPY --from=build /app/target/*.war drcomputer.war

# Khai báo port
EXPOSE 8080 

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "drcomputer.war"]
