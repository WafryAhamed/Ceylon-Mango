package com.ceylonmango.config;

import com.ceylonmango.model.Product;
import com.ceylonmango.model.User;
import com.ceylonmango.repository.ProductRepository;
import com.ceylonmango.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        try {
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.info("🌱 Starting Data Seeding...");
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            
            seedUsers();
            seedProducts();
            
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.info("✅ DATA SEEDING COMPLETED SUCCESSFULLY!");
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        } catch (Exception e) {
            log.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.error("❌ ERROR DURING DATA SEEDING!");
            log.error("Error: {}", e.getMessage());
            log.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        }
    }

    private void seedUsers() {
        try {
            if (userRepository.count() > 0) {
                log.info("👥 Users already exist ({} records), skipping user seeding...", userRepository.count());
                return;
            }
            
            log.info("👥 Seeding users...");


        // Admin user
        userRepository.save(User.builder()
                .name("Sarah Silva")
                .email("admin@ceylonmango.lk")
                .password(passwordEncoder.encode("admin123"))
                .role(User.Role.ADMIN)
                .phone("+94 77 987 6543")
                .status("active")
                .build());

        // Customer user
        userRepository.save(User.builder()
                .name("John Doe")
                .email("john@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 77 123 4567")
                .address("42 Palm Avenue, Colombo 07, Sri Lanka")
                .status("active")
                .build());

        // Additional customers matching admin data
        userRepository.save(User.builder()
                .name("Amal Perera")
                .email("amal@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 71 555 1234")
                .status("active")
                .build());

        userRepository.save(User.builder()
                .name("Nisha Fernando")
                .email("nisha@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 76 222 3344")
                .status("active")
                .build());

        userRepository.save(User.builder()
                .name("Raj Kumar")
                .email("raj@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 77 888 9900")
                .status("inactive")
                .build());

        userRepository.save(User.builder()
                .name("Emily Chen")
                .email("emily@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 71 444 5566")
                .status("active")
                .build());

        userRepository.save(User.builder()
                .name("David Bandara")
                .email("david@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 76 111 2233")
                .status("active")
                .build());

        userRepository.save(User.builder()
                .name("Priya Jayawardena")
                .email("priya@example.com")
                .password(passwordEncoder.encode("password123"))
                .role(User.Role.USER)
                .phone("+94 77 666 7788")
                .status("active")
                .build());

        log.info("✅ Seeded {} users", userRepository.count());
        } catch (Exception e) {
            log.error("❌ Error seeding users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to seed users", e);
        }
    }

    private void seedProducts() {
        try {
            if (productRepository.count() > 0) {
                log.info("📦 Products already exist ({} records), skipping product seeding...", productRepository.count());
                return;
            }
            
            log.info("📦 Seeding products...");

            List<Product> products = List.of(
            Product.builder()
                .name("Royal Ceylon Mango")
                .price(new BigDecimal("24.99"))
                .originalPrice(new BigDecimal("29.99"))
                .imageUrl("https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop")
                .images(List.of(
                    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&h=600&fit=crop"
                ))
                .category("fresh")
                .description("Hand-picked premium Ceylon mangoes, known for their exceptional sweetness and rich golden flesh. Each mango is carefully selected at peak ripeness to deliver the most authentic tropical flavor experience.")
                .weight("1 kg (3-4 pieces)")
                .rating(4.9).reviews(234).inStock(true).featured(true).stock(150).sales(342)
                .build(),

            Product.builder()
                .name("Golden Alphonso Mango")
                .price(new BigDecimal("34.99"))
                .imageUrl("https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop")
                .images(List.of(
                    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop"
                ))
                .category("fresh")
                .description("The king of mangoes — Alphonso variety with its signature creamy texture and intoxicating aroma. Sourced directly from premium orchards in Sri Lanka.")
                .weight("1 kg (3-4 pieces)")
                .rating(5.0).reviews(189).inStock(true).featured(true).stock(85).sales(189)
                .build(),

            Product.builder()
                .name("Tropical Mango Juice")
                .price(new BigDecimal("8.99"))
                .originalPrice(new BigDecimal("11.99"))
                .imageUrl("https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=600&fit=crop"))
                .category("juice")
                .description("Pure cold-pressed mango juice made from 100% Ceylon mangoes. No added sugar, no preservatives — just pure tropical bliss in every sip.")
                .weight("500ml")
                .rating(4.7).reviews(156).inStock(true).featured(true).stock(320).sales(567)
                .build(),

            Product.builder()
                .name("Premium Mango Jam")
                .price(new BigDecimal("12.99"))
                .imageUrl("https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop"))
                .category("preserves")
                .description("Artisanal mango jam crafted in small batches using traditional recipes. Perfect on toast, pastries, or as a gourmet condiment.")
                .weight("350g")
                .rating(4.8).reviews(98).inStock(true).featured(true).stock(200).sales(234)
                .build(),

            Product.builder()
                .name("Sun-Dried Mango Slices")
                .price(new BigDecimal("15.99"))
                .originalPrice(new BigDecimal("18.99"))
                .imageUrl("https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=600&h=600&fit=crop"))
                .category("dried")
                .description("Naturally sun-dried mango slices with no added sugar. A healthy, chewy snack packed with tropical flavor and nutrients.")
                .weight("250g")
                .rating(4.6).reviews(112).inStock(true).featured(false).stock(175).sales(298)
                .build(),

            Product.builder()
                .name("Mango Nectar Blend")
                .price(new BigDecimal("6.99"))
                .imageUrl("https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=600&fit=crop"))
                .category("juice")
                .description("A refreshing blend of mango nectar with a hint of lime and ginger. The perfect tropical refreshment for any occasion.")
                .weight("330ml")
                .rating(4.5).reviews(87).inStock(true).featured(false).stock(410).sales(445)
                .build(),

            Product.builder()
                .name("Organic Green Mango")
                .price(new BigDecimal("19.99"))
                .imageUrl("https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&h=600&fit=crop"))
                .category("fresh")
                .description("Certified organic green mangoes, perfect for pickles, chutneys, and salads. Tangy, crunchy, and full of natural goodness.")
                .weight("1 kg (4-5 pieces)")
                .rating(4.4).reviews(67).inStock(true).featured(false).stock(60).sales(112)
                .build(),

            Product.builder()
                .name("Mango Chutney")
                .price(new BigDecimal("9.99"))
                .imageUrl("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=600&fit=crop"))
                .category("preserves")
                .description("Traditional Sri Lankan mango chutney with aromatic spices. A perfect accompaniment to rice, curry, or grilled meats.")
                .weight("300g")
                .rating(4.7).reviews(134).inStock(true).featured(false).stock(190).sales(356)
                .build(),

            Product.builder()
                .name("Mango Smoothie Mix")
                .price(new BigDecimal("14.99"))
                .imageUrl("https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&h=600&fit=crop"))
                .category("juice")
                .description("Freeze-dried mango powder perfect for smoothies, shakes, and desserts. Just add water or milk for an instant tropical treat.")
                .weight("200g")
                .rating(4.3).reviews(56).inStock(true).featured(false).stock(95).sales(178)
                .build(),

            Product.builder()
                .name("Mango Pickle")
                .price(new BigDecimal("7.99"))
                .originalPrice(new BigDecimal("9.99"))
                .imageUrl("https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=600&fit=crop"))
                .category("preserves")
                .description("Authentic Sri Lankan mango pickle made with raw mangoes, mustard oil, and traditional spices. Aged to perfection.")
                .weight("400g")
                .rating(4.8).reviews(201).inStock(true).featured(false).stock(220).sales(401)
                .build(),

            Product.builder()
                .name("Crispy Mango Chips")
                .price(new BigDecimal("11.99"))
                .imageUrl("https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=600&fit=crop"))
                .category("dried")
                .description("Thinly sliced and vacuum-fried mango chips with a satisfying crunch. A guilt-free snack for mango lovers.")
                .weight("150g")
                .rating(4.5).reviews(78).inStock(true).featured(false).stock(130).sales(267)
                .build(),

            Product.builder()
                .name("Mango Marmalade")
                .price(new BigDecimal("13.99"))
                .imageUrl("https://images.unsplash.com/photo-1597528662465-55ece5734101?w=600&h=600&fit=crop")
                .images(List.of("https://images.unsplash.com/photo-1597528662465-55ece5734101?w=600&h=600&fit=crop"))
                .category("preserves")
                .description("Luxurious mango marmalade with fine-cut peel. Made with premium Ceylon mangoes and a touch of vanilla.")
                .weight("350g")
                .rating(4.9).reviews(45).inStock(false).featured(false).stock(0).sales(89)
                .build()
        );

            productRepository.saveAll(products);
            log.info("✅ Seeded {} products", productRepository.count());
        } catch (Exception e) {
            log.error("❌ Error seeding products: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to seed products", e);
        }
    }
}
