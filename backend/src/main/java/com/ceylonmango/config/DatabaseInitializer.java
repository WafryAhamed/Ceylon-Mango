package com.ceylonmango.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@Component
@Slf4j
public class DatabaseInitializer {

    private static final String DB_URL = "jdbc:postgresql://localhost:5432/";
    private static final String DB_NAME = "ceylon_mango";
    private static final String USERNAME = "postgres";
    
    @Value("${spring.datasource.password}")
    private String password;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeDatabase() {
        log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        log.info("🔄 Starting Database Initialization...");
        log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
        try {
            if (!databaseExists()) {
                log.info("📊 Database '{}' does not exist. Creating...", DB_NAME);
                createDatabase();
                log.info("✅ Database '{}' created successfully!", DB_NAME);
            } else {
                log.info("✅ Database '{}' already exists", DB_NAME);
            }
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.info("✅ DATABASE CONNECTION SUCCESSFUL!");
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        } catch (SQLException e) {
            log.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.error("❌ DATABASE CONNECTION FAILED!");
            log.error("Error: {}", e.getMessage());
            log.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.error("⚠️  TROUBLESHOOTING:");
            log.error("1️⃣  Ensure PostgreSQL is running on localhost:5432");
            log.error("2️⃣  Verify username is 'postgres'");
            log.error("3️⃣  Verify password matches PostgreSQL (check application.properties)");
            log.error("4️⃣  If wrong password, update in application.properties and restart");
            log.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        }
    }

    private boolean databaseExists() throws SQLException {
        try (Connection conn = DriverManager.getConnection(DB_URL, USERNAME, password);
             Statement stmt = conn.createStatement()) {
            
            ResultSet rs = stmt.executeQuery("SELECT 1 FROM pg_database WHERE datname = '" + DB_NAME + "'");
            boolean exists = rs.next();
            rs.close();
            return exists;
        } catch (SQLException e) {
            String errorMsg = e.getMessage();
            if (errorMsg.contains("password authentication failed")) {
                log.error("🔐 PASSWORD AUTHENTICATION FAILED!");
                log.error("Current password in config: {}", password);
                log.error("Please verify the password in application.properties matches PostgreSQL");
            }
            throw e;
        }
    }

    private void createDatabase() throws SQLException {
        try (Connection conn = DriverManager.getConnection(DB_URL, USERNAME, password);
             Statement stmt = conn.createStatement()) {
            
            conn.setAutoCommit(true);
            stmt.execute("CREATE DATABASE " + DB_NAME);
            log.info("✅ Database '{}' created with CREATE DATABASE command", DB_NAME);
        }
    }
}
