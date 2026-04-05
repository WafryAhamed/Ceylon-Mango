-- ============================================
-- Ceylon Mango - PostgreSQL Database Schema
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    role            VARCHAR(20)  NOT NULL DEFAULT 'USER',
    phone           VARCHAR(50),
    address         TEXT,
    status          VARCHAR(20)  NOT NULL DEFAULT 'active',
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS products (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    price           DECIMAL(10,2) NOT NULL,
    original_price  DECIMAL(10,2),
    image_url       TEXT,
    category        VARCHAR(100) NOT NULL,
    weight          VARCHAR(100),
    stock           INTEGER NOT NULL DEFAULT 0,
    in_stock        BOOLEAN NOT NULL DEFAULT TRUE,
    featured        BOOLEAN DEFAULT FALSE,
    rating          DOUBLE PRECISION DEFAULT 0.0,
    reviews         INTEGER DEFAULT 0,
    sales           INTEGER DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

CREATE TABLE IF NOT EXISTS product_images (
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id  BIGINT  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity    INTEGER NOT NULL DEFAULT 1,
    UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);

CREATE TABLE IF NOT EXISTS orders (
    id               BIGSERIAL PRIMARY KEY,
    user_id          BIGINT        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_price      DECIMAL(10,2) NOT NULL,
    status           VARCHAR(50)   NOT NULL DEFAULT 'PENDING',
    shipping_address TEXT,
    payment_method   VARCHAR(100),
    created_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

CREATE TABLE IF NOT EXISTS order_items (
    id            BIGSERIAL PRIMARY KEY,
    order_id      BIGINT        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id    BIGINT        NOT NULL REFERENCES products(id),
    quantity      INTEGER       NOT NULL,
    price         DECIMAL(10,2) NOT NULL,
    product_name  VARCHAR(255),
    product_image TEXT
);

CREATE TABLE IF NOT EXISTS wishlist (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);

-- Insert Authentic Sri Lankan Users
INSERT INTO users (name, email, password, role, phone, address, status) VALUES
('Nimal Perera', 'nimal.perera.lk@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'ADMIN', '+94 77 123 4567', '23 Independence Avenue, Fort, Colombo 01', 'active'),
('Mohamed Aroos', 'aroos.dev@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 71 234 5678', '45 Galle Road, Colombo 03', 'active'),
('Kasun Silva', 'kasun.silva94@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 76 345 6789', '78 Peradeniya Road, Kandy', 'active'),
('Ayesha Fernando', 'ayesha.fernando.lk@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 72 456 7890', '112 Church Street, Galle', 'active'),
('Fathima Rizna', 'fathima.rizna@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 77 567 8901', '56 Lewis Place, Negombo', 'active'),
('Priya Jayawardena', 'priya.jaya22@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 76 678 9012', '89 Point Pedro Road, Jaffna', 'active'),
('Suresh Gunasekara', 'suresh.guna.lk@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 71 789 0123', '34 Colombo Road, Kurunegala', 'active'),
('Dilini Wijesundara', 'dilini.wijesundara@gmail.com', '$2a$10$slYQmyNdGzin7olVCN1I2OPST9/PgBkqquzi.Oy1jPvvlJ1tGLMLW', 'USER', '+94 72 890 1234', '67 Main Street, Matara', 'inactive') ON CONFLICT (email) DO NOTHING;

-- Insert Authentic Sri Lankan Mango Products
INSERT INTO products (id, name, description, price, original_price, category, weight, stock, in_stock, featured, rating, reviews, sales) VALUES
(1, 'Karthakolomban Mango (Jaffna Premium)', 'Legendary Karthakolomban mangoes from Jaffna Peninsula...', 2800.00, 3500.00, 'fresh', '1 kg (3-4 pieces)', 45, true, true, 4.9, 267, 189),
(2, 'Batalu Mango (Kurunegala Grade A)', 'Premium Batalu mangoes from Kurunegala region...', 2200.00, 2800.00, 'fresh', '1 kg (4-5 pieces)', 65, true, true, 4.7, 234, 156),
(3, 'Willard Mango (Colombo Elite)', 'Exclusive Willard mangoes cultivated in Colombo suburbs...', 2600.00, NULL, 'fresh', '1 kg (3-4 pieces)', 38, true, true, 4.8, 201, 124),
(4, 'Gira Amba (Southern Delicacy)', 'Gira Amba sourced from Southern Province orchards...', 1950.00, 2500.00, 'fresh', '1 kg (4-5 pieces)', 52, true, false, 4.6, 178, 89),
(5, 'Malwana Mango (Malwana Special)', 'Rare Malwana mangoes from the Malwana region...', 2100.00, NULL, 'fresh', '1 kg (4-5 pieces)', 28, true, false, 4.5, 145, 67),
(6, 'Sri Lankan Green Mango (Culinary Grade)', 'Sourced fresh for authentic Sri Lankan culinary uses...', 950.00, NULL, 'fresh', '1 kg (5-6 pieces)', 85, true, false, 4.4, 112, 234),
(7, 'Fresh Mango Juice (500ml)', 'Cold-pressed mango juice...', 580.00, 750.00, 'juice', '500ml', 125, true, true, 4.8, 289, 567),
(8, 'Mango Nectar With Ginger & Lime (330ml)', 'Refreshing blend of mango nectar...', 420.00, NULL, 'juice', '330ml', 180, true, false, 4.6, 156, 401),
(9, 'Sun-Dried Mango Slices (250g)', 'Naturally sun-dried mango slices...', 890.00, 1200.00, 'dried', '250g', 95, true, false, 4.7, 134, 267),
(10, 'Mango Powder Mix (200g)', 'Freeze-dried mango powder...', 750.00, NULL, 'dried', '200g', 72, true, false, 4.5, 98, 156),
(11, 'Traditional Mango Jam (350g)', 'Artisanal mango jam made in small batches...', 650.00, NULL, 'preserves', '350g', 110, true, false, 4.8, 201, 289),
(12, 'Authentic Mango Achar (400g)', 'Traditional Sri Lankan mango achar...', 580.00, 750.00, 'preserves', '400g', 145, true, true, 4.9, 245, 456),
(13, 'Mango Chutney with Spices (300g)', 'A delightful blend of fresh mangoes...', 520.00, NULL, 'preserves', '300g', 125, true, false, 4.7, 167, 312),
(14, 'Premium Mango Marmalade (350g)', 'Luxurious mango marmalade...', 820.00, NULL, 'preserves', '350g', 68, true, false, 4.8, 89, 134),
(15, 'Mango Leather Roll (Pack of 3)', 'Homemade-style mango leather rolls...', 450.00, NULL, 'dried', '150g (3 rolls)', 95, true, false, 4.6, 72, 178) ON CONFLICT (id) DO NOTHING;

-- Restart sequences
ALTER SEQUENCE products_id_seq RESTART WITH 16;
