-- ============================================
-- Ceylon Mango - Sri Lankan Localized Sample Data
-- ============================================

-- Insert Authentic Sri Lankan Users
INSERT INTO users (name, email, password, role, phone, address, status) VALUES
('Nimal Perera', 'nimal.perera.lk@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'ADMIN', '+94 77 123 4567', '23 Independence Avenue, Fort, Colombo 01', 'active'),
('Mohamed Aroos', 'aroos.dev@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 71 234 5678', '45 Galle Road, Colombo 03', 'active'),
('Kasun Silva', 'kasun.silva94@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 76 345 6789', '78 Peradeniya Road, Kandy', 'active'),
('Ayesha Fernando', 'ayesha.fernando.lk@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 72 456 7890', '112 Church Street, Galle', 'active'),
('Fathima Rizna', 'fathima.rizna@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 77 567 8901', '56 Lewis Place, Negombo', 'active'),
('Priya Jayawardena', 'priya.jaya22@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 76 678 9012', '89 Point Pedro Road, Jaffna', 'active'),
('Suresh Gunasekara', 'suresh.guna.lk@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 71 789 0123', '34 Colombo Road, Kurunegala', 'active'),
('Dilini Wijesundara', 'dilini.wijesundara@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 72 890 1234', '67 Main Street, Matara', 'inactive');

-- Insert Authentic Sri Lankan Mango Products (All prices in LKR)
INSERT INTO products (name, description, price, original_price, category, weight, stock, in_stock, featured, rating, reviews, sales) VALUES
('Karthakolomban Mango (Jaffna Premium)', 'Legendary Karthakolomban mangoes from Jaffna Peninsula. Known as the king of Sri Lankan mangoes, featuring a unique taste with perfect sweetness and creamy texture. Sourced directly from traditional Jaffna orchards.', 2800.00, 3500.00, 'fresh', '1 kg (3-4 pieces)', 45, true, true, 4.9, 267, 189),
('Batalu Mango (Kurunegala Grade A)', 'Premium Batalu mangoes from Kurunegala region. These versatile mangoes are perfect for eating fresh or making delicious mango preparations. Sweet, fiber-free, and full of authentic Sri Lankan flavor.', 2200.00, 2800.00, 'fresh', '1 kg (4-5 pieces)', 65, true, true, 4.7, 234, 156),
('Willard Mango (Colombo Elite)', 'Exclusive Willard mangoes cultivated in Colombo suburbs. These premium mangoes offer excellent flavor, minimal fiber, and are sought after by connoisseurs across Sri Lanka. Perfect for gifting.', 2600.00, NULL, 'fresh', '1 kg (3-4 pieces)', 38, true, true, 4.8, 201, 124),
('Gira Amba (Southern Delicacy)', 'Gira Amba sourced from Southern Province orchards. These mangoes are known for their distinctive aroma and sweet, juicy flesh. A true taste of Sri Lankan heritage.', 1950.00, 2500.00, 'fresh', '1 kg (4-5 pieces)', 52, true, false, 4.6, 178, 89),
('Malwana Mango (Malwana Special)', 'Rare Malwana mangoes from the Malwana region. These limited-availability mangoes are prized for their unique flavor profile and are a favorite among Sri Lankan mango enthusiasts.', 2100.00, NULL, 'fresh', '1 kg (4-5 pieces)', 28, true, false, 4.5, 145, 67),
('Sri Lankan Green Mango (Culinary Grade)', 'Sourced fresh for authentic Sri Lankan culinary uses. Perfect for pickles (achar), chutneys, and salads. Tangy, firm, and full of traditional flavor.', 950.00, NULL, 'fresh', '1 kg (5-6 pieces)', 85, true, false, 4.4, 112, 234),
('Fresh Mango Juice (500ml)', 'Cold-pressed mango juice made from 100% Sri Lankan mangoes. No added sugar, no preservatives. Fresh, natural, and delicious. Chilled and ready to serve.', 580.00, 750.00, 'juice', '500ml', 125, true, true, 4.8, 289, 567),
('Mango Nectar With Ginger & Lime (330ml)', 'Refreshing blend of mango nectar with a hint of fresh ginger and lime. The perfect tropical drink for warm Sri Lankan afternoons.', 420.00, NULL, 'juice', '330ml', 180, true, false, 4.6, 156, 401),
('Sun-Dried Mango Slices (250g)', 'Naturally sun-dried mango slices with no added sugar. A healthy, chewy snack packed with tropical flavor. Perfect for on-the-go enjoyment or as a natural sweetener.', 890.00, 1200.00, 'dried', '250g', 95, true, false, 4.7, 134, 267),
('Mango Powder Mix (200g)', 'Freeze-dried mango powder perfect for smoothies, desserts, and beverages. Just add water or milk for an instant tropical treat. No additives, pure mango goodness.', 750.00, NULL, 'dried', '200g', 72, true, false, 4.5, 98, 156),
('Traditional Mango Jam (350g)', 'Artisanal mango jam made in small batches using traditional Sri Lankan recipes. Perfect on bread, pastries, or as a gourmet ice cream topping.', 650.00, NULL, 'preserves', '350g', 110, true, false, 4.8, 201, 289),
('Authentic Mango Achar (400g)', 'Traditional Sri Lankan mango achar (pickle) with aromatic spices, mustard, and fenugreek. The perfect accompaniment to rice, curry, and grilled dishes. A staple in Sri Lankan cuisine.', 580.00, 750.00, 'preserves', '400g', 145, true, true, 4.9, 245, 456),
('Mango Chutney with Spices (300g)', 'A delightful blend of fresh mangoes with aromatic spices. Crafted for the Sri Lankan palate, this chutney is a versatile condiment for any meal.', 520.00, NULL, 'preserves', '300g', 125, true, false, 4.7, 167, 312),
('Premium Mango Marmalade (350g)', 'Luxurious mango marmalade with fine-cut peel made from premium Ceylon mangoes. A sophisticated spread for special occasions and gourmet experiencing.', 820.00, NULL, 'preserves', '350g', 68, true, false, 4.8, 89, 134),
('Mango Leather Roll (Pack of 3)', 'Homemade-style mango leather rolls — a traditional Sri Lankan treat. Chewy, sweet, and naturally made without artificial additives.', 450.00, NULL, 'dried', '150g (3 rolls)', 95, true, false, 4.6, 72, 178);

-- Insert Sample Cart Items
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(2, 1, 2),
(2, 3, 1),
(3, 2, 3);

-- Insert Sample Orders with Local Payment Methods
INSERT INTO orders (user_id, total_price, status, shipping_address, payment_method) VALUES
(2, 5600.00, 'COMPLETED', '45 Galle Road, Colombo 03', 'Cash on Delivery'),
(3, 6600.00, 'PROCESSING', '78 Peradeniya Road, Kandy', 'Bank Transfer'),
(4, 2800.00, 'PENDING', '112 Church Street, Galle', 'PayHere');

-- Insert Sample Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, product_name, product_image) VALUES
(1, 1, 1, 2800.00, 'Karthakolomban Mango (Jaffna Premium)', NULL),
(1, 3, 2, 2600.00, 'Willard Mango (Colombo Elite)', NULL),
(2, 2, 3, 2200.00, 'Batalu Mango (Kurunegala Grade A)', NULL),
(3, 1, 1, 2800.00, 'Karthakolomban Mango (Jaffna Premium)', NULL);

-- Insert Sample Wishlist Items
INSERT INTO wishlist (user_id, product_id) VALUES
(2, 4),
(2, 5),
(3, 6),
(3, 7),
(4, 1),
(4, 8);

-- Verify Insertions
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as product_count FROM products;
SELECT COUNT(*) as order_count FROM orders;
SELECT COUNT(*) as wishlist_count FROM wishlist;
