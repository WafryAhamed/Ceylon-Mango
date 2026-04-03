# 🥭 Ceylon Mango - Complete Testing & Deployment Guide

## 📍 Quick Navigation

### For New Users
- **Start Here**: [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete initial setup
- **Testing**: [TESTING_GUIDE.md](TESTING_GUIDE.md) - Comprehensive testing procedures
- **Reference**: [CONFIGURATION_SUMMARY.md](CONFIGURATION_SUMMARY.md) - Technical details

### Testing Scripts (Windows)

| Script | Purpose | How to Use |
|--------|---------|-----------|
| `run-tests.bat` | Full QA test suite | Double-click to run |
| `open-test-console.bat` | API test UI | Double-click to open browser |
| `run-backend.bat` | Start backend server | Double-click to start |
| `run-frontend.bat` | Start frontend server | Double-click to start |

### Direct Commands

```powershell
# Full system validation
.\run-full-test.ps1

# API automation testing
node api-test.js

# Backend with Maven
cd backend
.\mvnw.cmd spring-boot:run

# Frontend with Vite
cd frontend
npm run dev
```

---

## 🚀 Get Started in 3 Steps

### Step 1: Validate System
```batch
run-tests.bat
```
Expected: Green ✅ checkmarks for all items

### Step 2: Start Services
**Terminal 1 - Backend**:
```batch
run-backend.bat
```
Expected: `Started CeylonMangoApplication on port 8080`

**Terminal 2 - Frontend**:
```batch
run-frontend.bat
```
Expected: `Local: http://localhost:5173`

### Step 3: Test Everything
```batch
open-test-console.bat
```
Or run automated tests:
```bash
node api-test.js
```

---

## 📊 Project Structure

```
mango/
├── backend/                           # Spring Boot API
│   ├── src/main/java/com/ceylonmango/
│   │   ├── config/                    # Database, Security, CORS
│   │   ├── controller/                # REST API endpoints
│   │   ├── model/                     # Entity classes
│   │   ├── repository/                # JPA repositories
│   │   └── service/                   # Business logic
│   ├── src/main/resources/
│   │   └── application.properties     # Configuration
│   ├── pom.xml                        # Maven dependencies
│   └── mvnw.cmd                       # Maven wrapper
│
├── frontend/                          # React + Vite
│   ├── src/
│   │   ├── pages/                     # UI pages
│   │   ├── components/                # Reusable components
│   │   ├── context/                   # State management
│   │   └── api/                       # API calls
│   ├── package.json                   # Dependencies
│   └── vite.config.js                 # Build config
│
├── Documentation/
│   ├── SETUP_GUIDE.md                 # Initial setup
│   ├── CONFIGURATION_SUMMARY.md       # Technical config
│   ├── TESTING_GUIDE.md               # How to test
│   ├── QUICK_REFERENCE.md             # Quick lookup
│   ├── QA_TEST_PLAN.md                # Detailed test specs
│   └── START_HERE.md                  # Quick start
│
└── Testing Tools/
    ├── run-tests.bat                  # QA test launcher
    ├── open-test-console.bat          # API test UI
    ├── run-full-test.ps1              # Full validation
    ├── api-test.js                    # Automated API tests
    └── api-test-console.html          # Interactive tester
```

---

## 🔑 Key Credentials

### Customer Account
- **Email**: `john@example.com`
- **Password**: `password123`
- **Role**: User (shopping, orders)

### Admin Account
- **Email**: `admin@ceylonmango.lk`
- **Password**: `admin123`
- **Role**: Admin (full management access)

### Database
- **Type**: PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: ceylon_mango
- **Username**: postgres
- **Password**: 2001

---

## 🌐 Service URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:8080/api | 8080 |
| PostgreSQL | localhost:5432 | 5432 |
| pgAdmin 4 | http://localhost:5050 | 5050 |

---

## 📋 Pre-Launch Checklist

Before starting the application:

- [ ] PostgreSQL is running (Windows Services)
- [ ] Node.js is installed (`node --version`)
- [ ] Java is installed (`java -version`)
- [ ] Maven wrapper works (`mvn --version`)
- [ ] All ports available (8080, 5173, 5432)
- [ ] Internet connection available
- [ ] Enough disk space (1GB+ recommended)

---

## 🎯 Testing Workflows

### Workflow 1: Fast Validation (5 minutes)
```bash
# Run automated tests only
node api-test.js
```

### Workflow 2: Full QA Suite (15 minutes)
```bash
# Complete system validation
.\run-full-test.ps1
```

### Workflow 3: Interactive Testing (10 minutes)
```bash
# Open browser-based testing UI
open-test-console.bat
```

### Workflow 4: Manual Testing (30+ minutes)
1. Start backend and frontend
2. Use [TESTING_GUIDE.md](TESTING_GUIDE.md) checklist
3. Test each feature manually
4. Document results

---

## 🔍 What Gets Tested

### Backend API
- ✅ Authentication (login, JWT tokens)
- ✅ Products (list, filter, search)
- ✅ Shopping cart (CRUD operations)
- ✅ Orders (create, view history)
- ✅ Admin functions (user/product mgmt)
- ✅ Error handling (4xx/5xx codes)
- ✅ CORS configuration
- ✅ Database operations

### Frontend
- ✅ Page loads (Home, Shop, etc.)
- ✅ Navigation and routing
- ✅ Forms (login, search, filters)
- ✅ Shopping flow (cart, checkout)
- ✅ Authentication state
- ✅ Error messages
- ✅ Responsive design
- ✅ Browser console (no errors)

### Integration
- ✅ Frontend ↔ Backend communication
- ✅ JWT authentication flow
- ✅ Data display accuracy
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ State management
- ✅ Error propagation

---

## 📊 Test Results Documentation

### Automated Test Output Example

```
✅ Backend compilation successful
✅ Frontend dependencies installed
✅ Directory structure validated
✅ Configuration files present
✅ Port 8080 available
✅ Port 5173 available
✅ Port 5432 available

API Tests:
✅ Customer login successful
✅ Admin login successful
✅ Got 15 products
✅ Got 5 featured products
✅ Added product to cart
✅ Fetched cart items
✅ Retrieved user orders

Results: 14/14 PASSED (100%)
```

### Manual Test Report Template

```markdown
# QA Test Report
- Date: [YYYY-MM-DD]
- Tester: [Name]
- Environment: [Windows 11]

## Summary
- Backend: ✅ PASS
- Frontend: ✅ PASS
- Integration: ✅ PASS

## Issues Found
[List any issues]

## Sign-off
Approved for deployment ✅
```

---

## 🐛 Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Backend won't start | [See TESTING_GUIDE.md](TESTING_GUIDE.md#issue-backend-wont-start) |
| Frontend won't start | [See TESTING_GUIDE.md](TESTING_GUIDE.md#issue-frontend-wont-start) |
| CORS errors | [See TESTING_GUIDE.md](TESTING_GUIDE.md#issue-api-requests-fail-with-cors-error) |
| JWT token issues | [See TESTING_GUIDE.md](TESTING_GUIDE.md#issue-jwt-token-issues) |
| Port already in use | [See TESTING_GUIDE.md](TESTING_GUIDE.md#issue-backend-wont-start) |
| Database connection error | [See CONFIGURATION_SUMMARY.md](CONFIGURATION_SUMMARY.md) |

---

## 🚀 Deployment Readiness

### Ready for Deployment When:
- ✅ All QA tests pass
- ✅ No critical bugs found
- ✅ Performance acceptable
- ✅ Security validated
- ✅ Documentation complete
- ✅ Data backup taken

### Pre-Deployment Steps:
1. Run full test suite (`.\run-full-test.ps1`)
2. Review all test results
3. Check logs for warnings
4. Verify database backups
5. Create deployment checklist
6. Get stakeholder approval

---

## 📚 Full Documentation Index

### Setup & Configuration
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - 1200+ lines
- [CONFIGURATION_SUMMARY.md](CONFIGURATION_SUMMARY.md) - 800+ lines
- [START_HERE.md](START_HERE.md) - Quick reference

### Testing & Validation
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Comprehensive testing procedures
- [QA_TEST_PLAN.md](QA_TEST_PLAN.md) - Detailed test specifications
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick lookup guide

### Architecture & Design
- [README.md](README.md) - Project overview
- [backend/README.md](backend/README.md) - Backend details
- [frontend/README.md](frontend/README.md) - Frontend details

---

## 💡 Pro Tips

### Tip 1: Quick Backend Test
```bash
curl http://localhost:8080/api/products
# Should return JSON array of products
```

### Tip 2: Check Dev Tools Network
Open browser → F12 → Network tab
- Monitor API requests
- Check JWT tokens
- Verify CORS headers

### Tip 3: Database Query
```sql
-- Connect to PostgreSQL
psql -U postgres -d ceylon_mango

-- Check tables
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
```

### Tip 4: Backend Logs
Look for:
- ✅ `DATABASE CONNECTION SUCCESSFUL!`
- ✅ `DATA SEEDING COMPLETED`
- ✅ `Tomcat started on port`

### Tip 5: Frontend Logs
Check browser console (F12) for:
- No red errors
- API responses in Network tab
- State in React DevTools

---

## 🎓 Learning Resources

### Testing Concepts
- **Unit Testing**: Individual function/component tests
- **Integration Testing**: Multiple components working together
- **API Testing**: HTTP endpoints validation
- **UI Testing**: User interface functionality
- **E2E Testing**: Complete user workflows

### Technologies
- **Spring Boot**: Backend framework
- **React**: Frontend framework
- **PostgreSQL**: Database system
- **JWT**: Authentication tokens
- **Vite**: Build tool

---

## 📞 Support & Help

### Getting Help

1. **Check Documentation**
   - [SETUP_GUIDE.md](SETUP_GUIDE.md)
   - [TESTING_GUIDE.md](TESTING_GUIDE.md)
   - [CONFIGURATION_SUMMARY.md](CONFIGURATION_SUMMARY.md)

2. **Run Diagnostic Tests**
   ```bash
   .\run-full-test.ps1
   ```

3. **Check Logs**
   - Backend: Console output
   - Frontend: Browser F12 Console
   - Database: PostgreSQL logs

4. **Review Error Messages**
   - Read the full error text
   - Search documentation
   - Check configuration

---

## ✅ Completion Checklist

- [ ] Read SETUP_GUIDE.md
- [ ] Run `.\run-full-test.ps1` - all pass
- [ ] Start backend successfully
- [ ] Start frontend successfully
- [ ] Open test console in browser
- [ ] Run API tests - all pass
- [ ] Test customer features manually
- [ ] Test admin features manually
- [ ] Verify no console errors
- [ ] Review test results
- [ ] Document findings
- [ ] Get approval for deployment

---

## 🎉 Ready to Deploy!

When all tests pass and you're confident in the system:

1. **Create deployment package**
   ```bash
   cd backend
   mvn clean package
   ```

2. **Backup database**
   ```bash
   pg_dump ceylon_mango > backup.sql
   ```

3. **Document deployment**
   - Record all test results
   - Note any workarounds
   - List approved configurations

4. **Deploy to production**
   - Follow deployment procedures
   - Verify in production
   - Monitor for issues

---

## 📝 Version Information

- **Application**: Ceylon Mango v1.0.0
- **Backend**: Spring Boot 3.5.0
- **Frontend**: React 18.3.1 with Vite 8.0.3
- **Database**: PostgreSQL 14+
- **Java**: JDK 21+
- **Node.js**: v18+
- **Maven**: 3.9.9+

---

## 🌟 Thank You!

Thank you for using the Ceylon Mango e-commerce platform!

For questions, issues, or suggestions, please refer to the documentation or contact the development team.

**Happy Testing! 🚀**

---

**Last Updated**: [Current Date]
**Status**: ✅ Production Ready
**Maintained By**: Ceylon Mango Development Team
