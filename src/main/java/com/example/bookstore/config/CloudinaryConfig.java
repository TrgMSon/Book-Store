package com.example.bookstore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Dotenv dotenv = Dotenv.configure().directory("./").load();;

        String cloudName = dotenv.get("CLOUDINARY_NAME");
        String apiKey = dotenv.get("CLOUDINARY_API_KEY");
        String apiSecret = dotenv.get("CLOUDINARY_API_SECRET");

        System.out.println("--- CLOUDINARY CONFIG CHECK ---");
        System.out.println("Name: " + cloudName);
        System.out.println("Key: " + apiKey);
        System.out.println("-------------------------------");

        // Debug thử xem có ra "null" không
        System.out.println("Cloud Name: " + cloudName);

        if (cloudName == null || apiKey == null || apiSecret == null) {
            throw new RuntimeException("Không tìm thấy cấu hình Cloudinary trong file .env!");
        }

        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }
}
