package com.ceylonmango.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for Resend email service.
 * Holds Resend API configuration properties.
 */
@Configuration
@ConfigurationProperties(prefix = "app.resend")
public class ResendEmailConfig {

    private String apiKey;
    private String fromEmail;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getFromEmail() {
        return fromEmail;
    }

    public void setFromEmail(String fromEmail) {
        this.fromEmail = fromEmail;
    }
}
