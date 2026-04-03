-- ============================================
-- Ceylon Mango - Sample Data for QA Testing
-- ============================================

-- Insert Sample Users
INSERT INTO users (name, email, password, role, phone, address, status) VALUES
('Admin User', 'admin@ceylonmango.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'ADMIN', '+94771234567', '123 Admin Street, Colombo 01', 'active'),
('John Doe', 'john.doe@example.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94772345678', '456 User Lane, Kandy', 'active'),
('Jane Smith', 'jane.smith@example.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94773456789', '789 Customer Road, Galle', 'active'),
('Test User', 'test@ceylonmango.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94774567890', '321 Test Avenue, Jaffna', 'active');

-- Insert Sample Products
INSERT INTO products (name, description, price, original_price, category, weight, stock, in_stock, featured, rating, reviews, sales) VALUES
('Premium Alphonso Mango', 'Golden yellow Alphonso mangoes from Ratnagiri region, sweet and juicy', 850.00, 1000.00, 'Premium', '300g', 50, true, true, 4.8, 45, 120),
('Langda Mango', 'Fresh and sweet Langda variety mangoes, rich flavor and creamy texture', 750.00, 900.00, 'Standard', '280g', 75, true, true, 4.5, 32, 95),
('Sindhri Mango', 'Large fiberless Sindhri mangoes with excellent flavor profile', 950.00, 1200.00, 'Premium', '350g', 30, true, false, 4.7, 28, 55),
('Ataulfo Mango', 'Small, sweet honey-flavored Ataulfo mangoes perfect for snacking', 550.00, 700.00, 'Standard', '150g', 100, true, true, 4.3, 18, 75),
('Tommy Atkins Mango', 'Firm and flavorful red mangoes, excellent for transport', 700.00, 850.00, 'Standard', '320g', 60, true, false, 4.2, 15, 42),
('Organic Mango Mix', 'Assorted organic mangoes from certified farms', 1200.00, 1500.00, 'Organic', '1kg', 25, true, true, 4.9, 52, 88),
('Dried Mango Slices', 'Naturally dried mango slices without preservatives', 450.00, 600.00, 'Processed', '200g', 80, true, false, 4.4, 22, 110),
('Mango Pulp - 400g', 'Pure mango pulp for smoothies and desserts', 350.00, 450.00, 'Processed', '400g', 120, true, true, 4.6, 35, 200);

-- Insert Sample Cart Items
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(2, 1, 2),
(2, 3, 1),
(3, 2, 3);

-- Insert Sample Orders
INSERT INTO orders (user_id, total_price, status, shipping_address, payment_method) VALUES
(2, 2450.00, 'COMPLETED', '456 User Lane, Kandy', 'Credit Card'),
(3, 2250.00, 'PROCESSING', '789 Customer Road, Galle', 'Bank Transfer'),
(4, 1200.00, 'PENDING', '321 Test Avenue, Jaffna', 'Cash on Delivery');

-- Insert Sample Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, product_name, product_image) VALUES
(1, 1, 1, 850.00, 'Premium Alphonso Mango', 'alphonso-mango.jpg'),
(1, 3, 2, 950.00, 'Sindhri Mango', 'sindhri-mango.jpg'),
(2, 2, 3, 750.00, 'Langda Mango', 'langda-mango.jpg'),
(3, 6, 1, 1200.00, 'Organic Mango Mix', 'organic-mango-mix.jpg');

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
