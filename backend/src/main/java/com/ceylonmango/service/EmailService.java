package com.ceylonmango.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Email service using Resend API for transactional email delivery.
 * Handles order confirmations, shipping notifications, and other transactional emails.
 */
@Service
@Slf4j
public class EmailService {

    private final Resend resend;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.email.company-name}")
    private String companyName;

    @Value("${app.email.support-email}")
    private String supportEmail;

    @Value("${app.email.contact-email}")
    private String contactEmail;

    @Autowired
    public EmailService(Resend resend) {
        this.resend = resend;
    }

    /**
     * Sends order confirmation email
     */
    public void sendOrderConfirmationEmail(String recipientEmail, String recipientName, 
                                          Long orderId, String totalPrice, String shippingAddress) {
        try {
            String subject = "Order Confirmation - Order #" + orderId;
            String htmlContent = buildOrderConfirmationTemplate(recipientName, orderId, totalPrice, shippingAddress);
            
            sendEmail(recipientEmail, subject, htmlContent);
            log.info("Order confirmation email sent to {} for order #{}", recipientEmail, orderId);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email to {}: {}", recipientEmail, e.getMessage(), e);
        }
    }

    /**
     * Sends order shipped notification email
     */
    public void sendShippingNotificationEmail(String recipientEmail, String recipientName, 
                                             Long orderId, String trackingNumber) {
        try {
            String subject = "Your Order #" + orderId + " Has Been Shipped!";
            String htmlContent = buildShippingNotificationTemplate(recipientName, orderId, trackingNumber);
            
            sendEmail(recipientEmail, subject, htmlContent);
            log.info("Shipping notification email sent to {} for order #{}", recipientEmail, orderId);
        } catch (Exception e) {
            log.error("Failed to send shipping notification email to {}: {}", recipientEmail, e.getMessage(), e);
        }
    }

    /**
     * Sends account verification email
     */
    public void sendVerificationEmail(String recipientEmail, String recipientName, String verificationLink) {
        try {
            String subject = "Verify Your " + companyName + " Account";
            String htmlContent = buildVerificationTemplate(recipientName, verificationLink);
            
            sendEmail(recipientEmail, subject, htmlContent);
            log.info("Verification email sent to {}", recipientEmail);
        } catch (Exception e) {
            log.error("Failed to send verification email to {}: {}", recipientEmail, e.getMessage(), e);
        }
    }

    /**
     * Sends password reset email
     */
    public void sendPasswordResetEmail(String recipientEmail, String recipientName, String resetLink) {
        try {
            String subject = "Reset Your " + companyName + " Password";
            String htmlContent = buildPasswordResetTemplate(recipientName, resetLink);
            
            sendEmail(recipientEmail, subject, htmlContent);
            log.info("Password reset email sent to {}", recipientEmail);
        } catch (Exception e) {
            log.error("Failed to send password reset email to {}: {}", recipientEmail, e.getMessage(), e);
        }
    }

    /**
     * Internal method to send email via Resend API
     */
    private void sendEmail(String toEmail, String subject, String htmlContent) throws ResendException {
        Map<String, Object> params = new HashMap<>();
        params.put("from", fromEmail);
        params.put("to", toEmail);
        params.put("subject", subject);
        params.put("html", htmlContent);

        resend.emails().send(params);
    }

    /**
     * Builds HTML content for order confirmation email
     */
    private String buildOrderConfirmationTemplate(String customerName, Long orderId, String totalPrice, String shippingAddress) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #3B653D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .order-details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                    .detail-row:last-child { border-bottom: none; }
                    .label { font-weight: bold; color: #555; }
                    .value { color: #333; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                    .button { display: inline-block; background: #EFB806; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🥭 Order Confirmation</h2>
                    </div>
                    <div class="content">
                        <p>Hi <strong>%s</strong>,</p>
                        <p>Thank you for your order! We're excited to prepare your fresh Ceylon mangoes.</p>
                        
                        <div class="order-details">
                            <div class="detail-row">
                                <span class="label">Order ID:</span>
                                <span class="value">#%d</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Order Date:</span>
                                <span class="value">%s</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Total Amount:</span>
                                <span class="value" style="font-weight: bold; color: #EFB806;">$%s</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Shipping Address:</span>
                                <span class="value">%s</span>
                            </div>
                        </div>
                        
                        <p><strong>What's Next?</strong></p>
                        <ul>
                            <li>We'll prepare your order with care</li>
                            <li>You'll receive a shipping notification within 24-48 hours</li>
                            <li>Track your order through your dashboard</li>
                        </ul>
                        
                        <p>Questions? Contact us at <a href="mailto:%s">%s</a></p>
                        
                        <p>Best regards,<br><strong>The Ceylon Mango Team</strong></p>
                        
                        <div class="footer">
                            <p>&copy; 2026 Ceylon Mango. All rights reserved.</p>
                            <p>42 Mango Lane, Colombo 07, Sri Lanka | +94 77 123 4567</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, orderId, java.time.LocalDate.now(), totalPrice, shippingAddress, supportEmail, supportEmail);
    }

    /**
     * Builds HTML content for shipping notification email
     */
    private String buildShippingNotificationTemplate(String customerName, Long orderId, String trackingNumber) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #3B653D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .tracking-box { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #EFB806; }
                    .tracking-number { font-size: 18px; font-weight: bold; color: #3B653D; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📦 Your Order Is On The Way!</h2>
                    </div>
                    <div class="content">
                        <p>Hi <strong>%s</strong>,</p>
                        <p>Great news! Your order #%d has been shipped and is on its way to you.</p>
                        
                        <div class="tracking-box">
                            <p>Tracking Number:</p>
                            <p class="tracking-number">%s</p>
                            <p style="font-size: 12px; color: #666;">Use this number to track your shipment</p>
                        </div>
                        
                        <p><strong>Estimated Delivery:</strong> 2-5 business days</p>
                        
                        <p>You can also track your order in your dashboard.</p>
                        
                        <p>Questions? Contact us at <a href="mailto:support@ceylonmango.lk">support@ceylonmango.lk</a></p>
                        
                        <p>Best regards,<br><strong>The Ceylon Mango Team</strong></p>
                        
                        <div class="footer">
                            <p>&copy; 2026 Ceylon Mango. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, orderId, trackingNumber);
    }

    /**
     * Builds HTML content for email verification
     */
    private String buildVerificationTemplate(String customerName, String verificationLink) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #3B653D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #EFB806; color: #333; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: bold; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>✉️ Verify Your Email</h2>
                    </div>
                    <div class="content">
                        <p>Hi <strong>%s</strong>,</p>
                        <p>Welcome to Ceylon Mango! Please verify your email address to activate your account.</p>
                        
                        <a href="%s" class="button">Verify Email</a>
                        
                        <p style="margin-top: 20px; font-size: 12px; color: #666;">Or copy and paste this link: %s</p>
                        
                        <p>If you didn't create this account, ignore this email.</p>
                        
                        <div class="footer">
                            <p>&copy; 2026 Ceylon Mango. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, verificationLink, verificationLink);
    }

    /**
     * Builds HTML content for password reset email
     */
    private String buildPasswordResetTemplate(String customerName, String resetLink) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #D37E05; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #D37E05; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: bold; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🔐 Reset Your Password</h2>
                    </div>
                    <div class="content">
                        <p>Hi <strong>%s</strong>,</p>
                        <p>We received a request to reset your password. Click the button below to create a new password.</p>
                        
                        <a href="%s" class="button">Reset Password</a>
                        
                        <p style="margin-top: 20px; color: #D37E05;"><strong>This link expires in 1 hour.</strong></p>
                        
                        <p style="font-size: 12px; color: #666;">Or copy and paste this link: %s</p>
                        
                        <p>If you didn't request this reset, ignore this email.</p>
                        
                        <div class="footer">
                            <p>&copy; 2026 Ceylon Mango. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, resetLink, resetLink);
    }
}
