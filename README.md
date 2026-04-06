# Ceylon-Mango

**Project Overview:**
Ceylon Mango is a full-stack, full-featured e-commerce web application dedicated to selling mangoes.

## Technology Stack

*   **Frontend:** React (using Vite as the build tool), utilizing modern JSX/React 18 components with custom styling and a responsive UI.
*   **Backend:** Java with Spring Boot, providing a robust REST API.
*   **Database:** PostgreSQL, using Flyway version control for database migrations.
*   **Security:** JWT (JSON Web Tokens) for secure authentication and authorization flows.

## Key Features & Capabilities

*   **Customer Features:** Product browsing, shopping cart, custom user settings, and a dedicated Wishlist feature.
*   **Order Management:** Full order tracking and persistence, complete with specific UI status icons for different order states.
*   **Admin Dashboard:** An integrated dashboard for analytics and management.
*   **User Experience (UX):** Includes modern features such as real-time toast notifications, proper session handling (including JWT expiration scenarios), reusable loading components, and consistent currency localization across the platform.

## Project Structure

```text
📁 e:\mango
├── 📁 backend/                       # ☕ Spring Boot Java Application
│   ├── 📁 .mvn/                      # 🛠️ Maven Wrapper
│   ├── 📁 src/
│   │   ├── 📁 main/
│   │   │   ├── 📁 java/com/ceylonmango/
│   │   │   │   ├── 📁 config/        # ⚙️ Spring configuration (CORS, Beans, etc.)
│   │   │   │   ├── 📁 controller/    # 🎛️ REST API controllers (AuthController, WishlistController)
│   │   │   │   ├── 📁 dto/           # 📦 Data Transfer Objects for API requests/responses
│   │   │   │   ├── 📁 model/         # 🗄️ JPA Entities (Order, Product, etc.)
│   │   │   │   ├── 📁 repository/    # 💾 Spring Data JPA Repositories
│   │   │   │   ├── 📁 security/      # 🔐 JWT Authentication & Security Filters
│   │   │   │   └── 📁 service/       # 🧠 Business logic implementation
│   │   │   └── 📁 resources/
│   │   │       ├── 📄 application.properties  # 📝 Database & Spring config
│   │   │       └── 📁 db/migration/           # 🗃️ Flyway SQL migrations
│   ├── 📄 pom.xml                    # 📋 Maven dependencies configuration
│   └── 📁 uploads/                   # 🖼️ Uploaded image assets 
│
├── 📁 frontend/                      # ⚛️ React frontend via Vite
│   ├── 📁 public/                    # 🌐 Static assets
│   ├── 📁 src/
│   │   ├── 📁 admin/                 # 👑 Admin dashboard pages and components
│   │   ├── 📁 api/                   # 🔌 Axios API configuration and calls
│   │   ├── 📁 assets/                # 🎨 Local images and generic assets
│   │   ├── 📁 components/            # 🧩 Reusable UI components (Loader, Navbar, UserSettings)
│   │   ├── 📁 context/               # 🌍 React Context (e.g., AuthContext)
│   │   ├── 📁 pages/                 # 📄 Full view pages (Wishlist, Home, Checkout)
│   │   ├── ⚛️ App.jsx                # 🔀 Main application routing and wrapper
│   │   ├── 🎨 index.css              # 🖌️ Global styles & Tailwind inclusions
│   │   └── ⚛️ index.jsx              # 🚀 Application entry point
│   ├── 📦 package.json               # 📦 Node dependencies
│   ├── ⚙️ tailwind.config.js         # 🎨 Tailwind CSS configuration
│   └── ⚙️ vite.config.js             # ⚡ Vite build configuration
│
└── 📖 README.md                      # 📚 Project documentation
```
