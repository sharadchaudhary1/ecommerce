

Table of Contents

Project Overview
Technology Stack
Architecture
Features
Database Schema
API Endpoints
Authentication & Authorization
State Management
Component Structure
Setup & Installation
Environment Variables
Deployment


Project Overview
This is a full-stack e-commerce platform built with Next.js 15, featuring both personal shopping and business product listing capabilities. The platform supports dual user types:

Personal Users: Browse, search, and purchase products
Business Users: Register companies and list products for sale

Key Highlights

Server-side rendering with Next.js App Router
Real-time cart synchronization
Google OAuth & credential-based authentication
MongoDB database with Prisma ORM
Persistent cart and save-for-later functionality
Advanced product filtering and search
Responsive UI with Tailwind CSS


Technology Stack
Frontend

Framework: Next.js 15.4.1 (React 19.1.0)
Styling: Tailwind CSS 4.x, Radix UI Themes
Icons: Lucide React, React Icons
State Management: React Context API

Backend

Runtime: Node.js
API Routes: Next.js API Routes
Database: MongoDB
ORM: Prisma 6.12.0
Authentication: NextAuth.js v5 (beta)
JWT: jsonwebtoken 9.0.2

DevOps

Package Manager: npm
TypeScript: 5.8.3
Build Tool: Next.js built-in (Turbopack)


Architecture
Directory Structure
src/
├── app/
│   ├── (group)/              # Grouped routes with shared layout
│   │   ├── Header/           # Navigation component
│   │   ├── cart/             # Shopping cart
│   │   ├── product/[id]/     # Product details
│   │   ├── search/           # Search results
│   │   ├── context/          # React Context providers
│   │   └── ...
│   ├── api/                  # Backend API routes
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── products/
│   │   └── ...
│   ├── login/
│   ├── signup/
│   └── globals.css
├── components/               # Reusable UI components
├── services/                 # Backend utilities
│   ├── prisma.ts
│   ├── jwt.ts
│   └── helper.ts
├── constants/                # Static data (categories, payment methods)
└── generated/prisma/         # Generated Prisma client

prisma/
└── schema.prisma             # Database schema

auth.ts                       # NextAuth configuration
middleware.ts                 # NextAuth middleware

Features
1. User Management

Dual Authentication: Google OAuth + Email/Password
Role-based Access: Personal vs Business users
Session Management: JWT-based with HTTP-only cookies

2. Product Catalog

Dynamic product listings with pagination (15 items/page)
Category-based filtering (10+ categories)
Price range filtering
Full-text search
Similar product recommendations

3. Shopping Cart

Guest cart (localStorage) → DB sync on login
Real-time quantity updates
"Save for Later" functionality
Persistent across sessions

4. Business Features

Company registration with verification
Product creation/editing
Sales dashboard (/all-sales-product)
Product management (CRUD operations)

5. Checkout Flow
Cart → Address & Contact → Payment Method → Order Confirmation

Address validation
Multiple payment options (Razorpay, UPI, COD, Net Banking, EMI)
Promo code support (SAVE10, FIRST50)

6. UI/UX

Responsive design (mobile-first)
Loading states with skeleton screens
Animated transitions (fade-in, hover effects)
Advertisement carousel (auto-rotating every 3s)
Toast notifications


Database Schema
Prisma Models
User
prismamodel user {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  email    String   @unique
  password String?
  username String?
  usecase  String?  // "personal" | "business"
  provider String   // "google" | "credentials"
  
  cart     cart[]
  cartdata cartdata[]
  company  company[]
  save     save[]
}
Product
prismamodel Product {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  price       Float
  thumbnail   String?
  category    String
  companyId   String?   @db.ObjectId
  
  company     company?  @relation(fields: [companyId], references: [id])
  cart        cart[]
  cartItems   cartdata[]
  save        save[]
}
Company
prismamodel company {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String?
  ownerId     String   @db.ObjectId
  category    String?
  description String?
  
  owner       user     @relation(fields: [ownerId], references: [id])
  Products    Product[]
}
Cart (Guest cart - temporary)
prismamodel cart {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  userId    String  @db.ObjectId
  productId String  @db.ObjectId
  quantity  Int     @default(1)
  
  user      user    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}
CartData (Persistent cart for logged-in users)
prismamodel cartdata {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  userId    String  @db.ObjectId
  productId String  @db.ObjectId
  quantity  Int     @default(1)
  
  user      user    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}
Save (Save for Later)
prismamodel save {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  userId    String  @db.ObjectId
  productId String  @db.ObjectId
  
  user      user    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

API Endpoints
Authentication
MethodEndpointDescriptionPOST/api/signupRegister new userPOST/api/loginAuthenticate userPOST/api/logoutClear sessionGET/POST/api/auth/[...nextauth]NextAuth handlers
Products
MethodEndpointDescriptionGET/api/productsList all productsGET/api/products/[id]Get product by IDPOST/api/productsCreate product (Business only)GET/api/search?q=&min=&max=Search productsGET/api/selectproducts?category=&min=&max=Filter by categoryGET/api/similarproducts?category=&id=Related products
Cart
MethodEndpointDescriptionGET/api/cartGet user's cartPOST/api/cartAdd to cartPUT/api/cart/updateUpdate quantityDELETE/api/cart/deleteRemove itemPOST/api/cart/mergeMerge guest cart on loginPOST/api/cart/savelaterMove to save-for-later
Save for Later
MethodEndpointDescriptionGET/api/savelaterGet saved itemsPOST/api/savelaterSave itemPOST/api/savelater/movetocartMove back to cartPOST/api/savelater/mergeMerge guest saves
Company
MethodEndpointDescriptionPOST/api/addcompanyRegister companyGET/api/allsalesproductList company products
Product Management
MethodEndpointDescriptionGET/api/edit-product/[id]Get product for editingPOST/api/edit-product/[id]Update product

Authentication & Authorization
NextAuth Configuration (auth.ts)
typescriptimport NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})
JWT Helper (services/jwt.ts)
typescriptexport function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET)
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
User Retrieval (services/helper.ts)
typescriptexport default async function getCurrentUserFromCookies() {
  // 1. Check NextAuth session (Google OAuth)
  const session = await auth()
  if (session) {
    return await prismaClient.user.findUnique({
      where: { email: session.user?.email },
      include: { company: true } // Include for business users
    })
  }

  // 2. Check JWT cookie (Credentials)
  const token = cookies().get('user')?.value
  const decoded = verifyToken(token)
  return await prismaClient.user.findUnique({
    where: { email: decoded?.email },
    include: { company: true }
  })
}

State Management
React Context API
CartContext (context/CartContext.tsx)
Manages shopping cart state:
typescriptconst CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  
  // Load cart from localStorage (guests) or API (logged-in)
  useEffect(() => {
    if (!user) {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
    } else {
      fetch('/api/cart').then(res => res.json())
        .then(data => setCart(data.items))
    }
  }, [user])
  
  // Sync to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, user])
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <CartContext.Provider value={{ cart, setCart, totalItems, user }}>
      {children}
    </CartContext.Provider>
  )
}
SaveContext (context/savecontext.tsx)
Manages "Save for Later" items with similar logic to CartContext.

Component Structure
Key Components
Header (Header/page.tsx)

Search bar with autocomplete
Cart icon with item count badge
Login/Logout button
Conditional "Add Product" button (business users)

Itemcard (components/productcard.tsx)
Reusable product card with:

Product image, title, price
Rating display
"Add to Cart" & "Save for Later" buttons
Hover effects and animations

AddToCart (components/addtocartbtn.tsx)
typescriptconst AddToCart = ({ product }) => {
  const { cart, setCart, user } = useContext(CartContext)
  
  async function handlecart() {
    if (user) {
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ userId: user.id, productId: product.id, quantity: 1 })
      })
    }
    // Update local state
    setCart([...cart, { ...product, quantity: 1 }])
  }
  
  return <button onClick={handlecart}>Add to Cart</button>
}
Pagination (components/pagination.tsx)

Client-side pagination (15 items/page)
Dynamic page range calculation
Prev/Next navigation

CategoryNavbar (components/select-by-category.tsx)

Horizontal scrollable category list
10 predefined categories with icons
Gradient hover effects


Setup & Installation
Prerequisites

Node.js 18.18+ / 20.3+ / 21+
MongoDB Atlas account (or local MongoDB)
Google OAuth credentials

Steps

Clone Repository

bash   git clone <repository-url>
   cd ecommerce

Install Dependencies

bash   npm install

Configure Environment Variables
Create .env file:

env   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"
   JWT_SECRET="your-secret-key"
   AUTH_SECRET="your-auth-secret"
   AUTH_GOOGLE_ID="google-client-id"
   AUTH_GOOGLE_SECRET="google-client-secret"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"

Generate Prisma Client

bash   npm run generate
   # or
   npx prisma generate

Run Development Server

bash   npm run dev
   # Runs on http://localhost:3000

Build for Production

bash   npm run build
   npm start

Environment Variables
VariableDescriptionExampleDATABASE_URLMongoDB connection stringmongodb+srv://...JWT_SECRETSecret for JWT signingmySecretKey123AUTH_SECRETNextAuth secretopenssl rand -base64 32AUTH_GOOGLE_IDGoogle OAuth Client IDFrom Google Cloud ConsoleAUTH_GOOGLE_SECRETGoogle OAuth SecretFrom Google Cloud ConsoleNEXT_PUBLIC_BASE_URLApp base URLhttp://localhost:3000

Deployment
Vercel (Recommended)

Push to GitHub

bash   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
```

2. **Deploy on Vercel**
   - Import project from GitHub
   - Add environment variables in Settings
   - Deploy automatically

3. **Configure Domain**
   - Add custom domain in Vercel dashboard
   - Update `NEXT_PUBLIC_BASE_URL`

### Alternative Platforms
- **Railway**: Connect GitHub, add env vars, deploy
- **DigitalOcean App Platform**: Similar to Vercel
- **AWS Amplify**: For AWS ecosystem

---

## Key Features Implementation

### 1. Cart Synchronization Flow
```
Guest → Add to Cart → localStorage
       ↓ (User logs in)
Merge localStorage cart → Database (POST /api/cart/merge)
       ↓
Clear localStorage → Fetch from DB
2. Search Functionality

Full-text search on product title
Case-insensitive matching
Combined with price range filters

typescript// api/search/route.ts
const products = await prismaClient.product.findMany({
  where: {
    title: { contains: query, mode: 'insensitive' },
    price: { gte: min, lte: max }
  }
})
3. Category Filtering

10 predefined categories with Lucide icons
Gradient color schemes per category
Smooth horizontal scrolling

4. Payment Integration

Razorpay (primary): UPI, Cards, Wallets
Cash on Delivery: +₹40 charge
Promo Codes: SAVE10 (10% off), FIRST50 (₹50 off)


Security Considerations

HTTP-Only Cookies: JWT stored in secure cookies
Environment Secrets: All sensitive data in .env
Input Validation: Server-side validation on all API routes
CSRF Protection: NextAuth built-in protection
SQL Injection: Prevented by Prisma ORM


Performance Optimizations

Server Components: Default in Next.js 15 App Router
Image Optimization: Next.js <Image> component
Code Splitting: Automatic route-based splitting
Caching: Browser caching for static assets
Pagination: Reduces initial data load


Future Enhancements

 Order history and tracking
 Product reviews and ratings
 Wishlist functionality
 Advanced analytics dashboard for businesses
 Email notifications
 Multi-language support
 Dark mode
 PWA support
 Real-time inventory management


Troubleshooting
Common Issues

Prisma Client Not Found

bash   npm run generate

MongoDB Connection Error

Check DATABASE_URL format
Whitelist IP in MongoDB Atlas


NextAuth Callback Error

Verify AUTH_SECRET is set
Check Google OAuth redirect URIs


Build Errors

bash   rm -rf .next
   npm run build

Contributing

Fork the repository
Create feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open Pull Request


License
This project is proprietary. All rights reserved.

Contact & Support

Email: shopzone@gmail.com
GitHub Issues: Project Issues
Documentation: This README