package com.example.bookstore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.util.StringUtils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class CloudinaryConfig {

    @Bean
    @Conditional(CloudinaryCredentialsCondition.class)
    public Cloudinary cloudinary() {
        // Skip bean creation when local dev has no Cloudinary credentials.
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        String cloudName = resolveConfig("CLOUDINARY_NAME", dotenv);
        String apiKey = resolveConfig("CLOUDINARY_API_KEY", dotenv);
        String apiSecret = resolveConfig("CLOUDINARY_API_SECRET", dotenv);

        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }

    private static String resolveConfig(String key, Dotenv dotenv) {
        String value = System.getenv(key);

        if (!StringUtils.hasText(value)) {
            value = dotenv.get(key);
        }

        return value;
    }

    static final class CloudinaryCredentialsCondition implements Condition {
        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

            // Only create the Cloudinary bean when all required values are present.
            return StringUtils.hasText(resolveConfig("CLOUDINARY_NAME", dotenv))
                    && StringUtils.hasText(resolveConfig("CLOUDINARY_API_KEY", dotenv))
                    && StringUtils.hasText(resolveConfig("CLOUDINARY_API_SECRET", dotenv));
        }
    }
}
