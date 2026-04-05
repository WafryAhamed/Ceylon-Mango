import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGen {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("admin123 hash: " + encoder.encode("admin123"));
        System.out.println("password123 matches existing: " + encoder.matches("password123", "$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW"));
        System.out.println("admin123 matches existing: " + encoder.matches("admin123", "$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW"));
    }
}
