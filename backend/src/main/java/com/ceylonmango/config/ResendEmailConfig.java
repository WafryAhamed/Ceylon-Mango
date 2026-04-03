package com.ceylonmango.config;

import com.resend.Resend;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for Resend email service.
 * Initializes the Resend client with API key from application properties.
 */
@Configuration
public class ResendEmailConfig {

    @Value("${app.resend.api-key}")
    private String resendApiKey;

    @Bean
    public Resend resend() {
        return new Resend(resendApiKey);
    }
}
