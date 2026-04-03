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
            
            log.info("👥 Seeding users with authentic Sri Lankan data...");

            // Admin User - Platform Manager
            userRepository.save(User.builder()
                    .name("Nimal Perera")
                    .email("nimal.perera.lk@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .phone("+94 77 123 4567")
                    .address("23 Independence Avenue, Fort, Colombo 01")
                    .status("active")
                    .build());

            // Customer 1 - Colombo
            userRepository.save(User.builder()
                    .name("Mohamed Aroos")
                    .email("aroos.dev@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 71 234 5678")
                    .address("45 Galle Road, Colombo 03")
                    .status("active")
                    .build());

            // Customer 2 - Kandy
            userRepository.save(User.builder()
                    .name("Kasun Silva")
                    .email("kasun.silva94@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 76 345 6789")
                    .address("78 Peradeniya Road, Kandy")
                    .status("active")
                    .build());

            // Customer 3 - Galle
            userRepository.save(User.builder()
                    .name("Ayesha Fernando")
                    .email("ayesha.fernando.lk@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 72 456 7890")
                    .address("112 Church Street, Galle")
                    .status("active")
                    .build());

            // Customer 4 - Negombo
            userRepository.save(User.builder()
                    .name("Fathima Rizna")
                    .email("fathima.rizna@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 77 567 8901")
                    .address("56 Lewis Place, Negombo")
                    .status("active")
                    .build());

            // Customer 5 - Jaffna
            userRepository.save(User.builder()
                    .name("Priya Jayawardena")
                    .email("priya.jaya22@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 76 678 9012")
                    .address("89 Point Pedro Road, Jaffna")
                    .status("active")
                    .build());

            // Customer 6 - Kurunegala
            userRepository.save(User.builder()
                    .name("Suresh Gunasekara")
                    .email("suresh.guna.lk@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 71 789 0123")
                    .address("34 Colombo Road, Kurunegala")
                    .status("active")
                    .build());

            // Customer 7 - Matara (inactive)
            userRepository.save(User.builder()
                    .name("Dilini Wijesundara")
                    .email("dilini.wijesundara@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.USER)
                    .phone("+94 72 890 1234")
                    .address("67 Main Street, Matara")
                    .status("inactive")
                    .build());

            log.info("✅ Seeded {} authentic Sri Lankan users", userRepository.count());
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
            
            log.info("📦 Seeding authentic Sri Lankan mango products...");

            List<Product> products = List.of(
                // Fresh Mangoes - Sri Lankan Varieties
                Product.builder()
                    .name("Karthakolomban Mango (Jaffna Premium)")
                    .price(new BigDecimal("2800.00"))
                    .originalPrice(new BigDecimal("3500.00"))
                    .imageUrl("https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop")
                    .images(List.of(
                        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop"
                    ))
                    .category("fresh")
                    .description("Legendary Karthakolomban mangoes from Jaffna Peninsula. Known as the king of Sri Lankan mangoes, featuring a unique taste with perfect sweetness and creamy texture. Sourced directly from traditional Jaffna orchards where these rare varieties flourish.")
                    .weight("1 kg (3-4 pieces)")
                    .rating(4.9).reviews(267).inStock(true).featured(true).stock(45).sales(189)
                    .build(),

                Product.builder()
                    .name("Batalu Mango (Kurunegala Grade A)")
                    .price(new BigDecimal("2200.00"))
                    .originalPrice(new BigDecimal("2800.00"))
                    .imageUrl("https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop")
                    .images(List.of(
                        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop"
                    ))
                    .category("fresh")
                    .description("Premium Batalu mangoes from Kurunegala region. These versatile mangoes are perfect for eating fresh or making delicious mango preparations. Sweet, fibrous-free, and full of authentic Sri Lankan flavor.")
                    .weight("1 kg (4-5 pieces)")
                    .rating(4.7).reviews(234).inStock(true).featured(true).stock(65).sales(156)
                    .build(),

                Product.builder()
                    .name("Willard Mango (Colombo Elite)")
                    .price(new BigDecimal("2600.00"))
                    .imageUrl("https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&h=600&fit=crop")
                    .images(List.of(
                        "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&h=600&fit=crop"
                    ))
                    .category("fresh")
                    .description("Exclusive Willard mangoes cultivated in Colombo suburbs. These premium mangoes offer excellent flavor, minimal fiber, and are sought after by connoisseurs across Sri Lanka. Perfect for gifting or special occasions.")
                    .weight("1 kg (3-4 pieces)")
                    .rating(4.8).reviews(201).inStock(true).featured(true).stock(38).sales(124)
                    .build(),

                Product.builder()
                    .name("Gira Amba (Southern Delicacy)")
                    .price(new BigDecimal("1950.00"))
                    .originalPrice(new BigDecimal("2500.00"))
                    .imageUrl("https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=600&fit=crop")
                    .images(List.of(
                        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=600&fit=crop"
                    ))
                    .category("fresh")
                    .description("Gira Amba sourced from Southern Province orchards. These mangoes are known for their distinctive aroma and sweet, juicy flesh. A true taste of Sri Lankan heritage.")
                    .weight("1 kg (4-5 pieces)")
                    .rating(4.6).reviews(178).inStock(true).featured(false).stock(52).sales(89)
                    .build(),

                Product.builder()
                    .name("Malwana Mango (Malwana Special)")
                    .price(new BigDecimal("2100.00"))
                    .imageUrl("https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=600&h=600&fit=crop")
                    .images(List.of(
                        "https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=600&h=600&fit=crop"
                    ))
                    .category("fresh")
                    .description("Rare Malwana mangoes from the Malwana region. These limited-availability mangoes are prized for their unique flavor profile and are a favorite among Sri Lankan mango enthusiasts seeking authentic varieties.")
                    .weight("1 kg (4-5 pieces)")
                    .rating(4.5).reviews(145).inStock(true).featured(false).stock(28).sales(67)
                    .build(),

                // Fresh Green Mangoes for Cooking
                Product.builder()
                    .name("Sri Lankan Green Mango (Culinary Grade)")
                    .price(new BigDecimal("950.00"))
                    .imageUrl("https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=600&fit=crop")
                    .images(List.of(
                        "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=600&fit=crop"
                    ))
                    .category("fresh")
                    .description("Sourced fresh for authentic Sri Lankan culinary uses. Perfect for pickles (achar), chutneys, and salads. Tangy, firm, and full of traditional flavor.")
                    .weight("1 kg (5-6 pieces)")
                    .rating(4.4).reviews(112).inStock(true).featured(false).stock(85).sales(234)
                    .build(),

                // Fresh Juices & Beverages
                Product.builder()
                    .name("Fresh Mango Juice (500ml)")
                    .price(new BigDecimal("580.00"))
                    .originalPrice(new BigDecimal("750.00"))
                    .imageUrl("https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=600&fit=crop"))
                    .category("juice")
                    .description("Cold-pressed mango juice made from 100% Sri Lankan mangoes. No added sugar, no preservatives. Fresh, natural, and delicious. Chilled and ready to serve.")
                    .weight("500ml")
                    .rating(4.8).reviews(289).inStock(true).featured(true).stock(125).sales(567)
                    .build(),

                Product.builder()
                    .name("Mango Nectar With Ginger & Lime (330ml)")
                    .price(new BigDecimal("420.00"))
                    .imageUrl("https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&h=600&fit=crop"))
                    .category("juice")
                    .description("Refreshing blend of mango nectar with a hint of fresh ginger and lime. The perfect tropical drink for warm Sri Lankan afternoons.")
                    .weight("330ml")
                    .rating(4.6).reviews(156).inStock(true).featured(false).stock(180).sales(401)
                    .build(),

                // Dried & Processed Products
                Product.builder()
                    .name("Sun-Dried Mango Slices (250g)")
                    .price(new BigDecimal("890.00"))
                    .originalPrice(new BigDecimal("1200.00"))
                    .imageUrl("https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=600&fit=crop"))
                    .category("dried")
                    .description("Naturally sun-dried mango slices with no added sugar. A healthy, chewy snack packed with tropical flavor. Perfect for on-the-go enjoyment or as a natural sweetener.")
                    .weight("250g")
                    .rating(4.7).reviews(134).inStock(true).featured(false).stock(95).sales(267)
                    .build(),

                Product.builder()
                    .name("Mango Powder Mix (200g)")
                    .price(new BigDecimal("750.00"))
                    .imageUrl("https://images.unsplash.com/photo-1597528662465-55ece5734101?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1597528662465-55ece5734101?w=600&h=600&fit=crop"))
                    .category("dried")
                    .description("Freeze-dried mango powder perfect for smoothies, desserts, and beverages. Just add water or milk for an instant tropical treat. No additives, pure mango goodness.")
                    .weight("200g")
                    .rating(4.5).reviews(98).inStock(true).featured(false).stock(72).sales(156)
                    .build(),

                // Traditional Preserves & Spreads
                Product.builder()
                    .name("Traditional Mango Jam (350g)")
                    .price(new BigDecimal("650.00"))
                    .imageUrl("https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop"))
                    .category("preserves")
                    .description("Artisanal mango jam made in small batches using traditional Sri Lankan recipes. Perfect on bread, pastries, or as a gourmet ice cream topping.")
                    .weight("350g")
                    .rating(4.8).reviews(201).inStock(true).featured(false).stock(110).sales(289)
                    .build(),

                Product.builder()
                    .name("Authentic Mango Achar (400g)")
                    .price(new BigDecimal("580.00"))
                    .originalPrice(new BigDecimal("750.00"))
                    .imageUrl("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=600&fit=crop"))
                    .category("preserves")
                    .description("Traditional Sri Lankan mango achar (pickle) with aromatic spices, mustard, and fenugreek. The perfect accompaniment to rice, curry, and grilled dishes. A staple in Sri Lankan cuisine.")
                    .weight("400g")
                    .rating(4.9).reviews(245).inStock(true).featured(true).stock(145).sales(456)
                    .build(),

                Product.builder()
                    .name("Mango Chutney with Spices (300g)")
                    .price(new BigDecimal("520.00"))
                    .imageUrl("https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=600&fit=crop"))
                    .category("preserves")
                    .description("A delightful blend of fresh mangoes with aromatic spices. Crafted for the Sri Lankan palate, this chutney is a versatile condiment for any meal.")
                    .weight("300g")
                    .rating(4.7).reviews(167).inStock(true).featured(false).stock(125).sales(312)
                    .build(),

                Product.builder()
                    .name("Premium Mango Marmalade (350g)")
                    .price(new BigDecimal("820.00"))
                    .imageUrl("https://images.unsplash.com/photo-1597528662465-55ece5734101?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1597528662465-55ece5734101?w=600&h=600&fit=crop"))
                    .category("preserves")
                    .description("Luxurious mango marmalade with fine-cut peel made from premium Ceylon mangoes. A sophisticated spread for special occasions and gourmet experiencing.")
                    .weight("350g")
                    .rating(4.8).reviews(89).inStock(true).featured(false).stock(68).sales(134)
                    .build(),

                Product.builder()
                    .name("Mango Leather Roll (Pack of 3)")
                    .price(new BigDecimal("450.00"))
                    .imageUrl("https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=600&fit=crop")
                    .images(List.of("https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=600&fit=crop"))
                    .category("dried")
                    .description("Homemade-style mango leather rolls — a traditional Sri Lankan treat. Chewy, sweet, and naturally made without artificial additives.")
                    .weight("150g (3 rolls)")
                    .rating(4.6).reviews(72).inStock(true).featured(false).stock(95).sales(178)
                    .build()
        );

            productRepository.saveAll(products);
            log.info("✅ Seeded {} authentic Sri Lankan mango products with LKR pricing", productRepository.count());
        } catch (Exception e) {
            log.error("❌ Error seeding products: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to seed products", e);
        }
    }
}
