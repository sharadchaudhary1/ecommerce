# App Directory Documentation

## Overview

The `src/app` directory follows Next.js 15 App Router conventions with a grouped route structure. It contains all frontend pages, layouts, and API routes.

---

## Directory Structure

```
src/app/
├── (group)/                    # Route group with shared layout
│   ├── Header/
│   ├── cart/
│   ├── product/[id]/
│   ├── search/
│   ├── selectcategory/
│   ├── context/
│   ├── add-company-btn/
│   ├── addcompany/
│   ├── addproduct/
│   ├── address-and-contact/
│   ├── all-sales-product/
│   ├── edit-product/[id]/
│   ├── payment-page/
│   ├── register-addproduct/
│   ├── layout.tsx             # Shared layout with providers
│   └── page.tsx               # Home page
├── api/                       # Backend API routes
├── login/
├── signup/
├── globals.css
├── layout.tsx                 # Root layout
└── loading.tsx               # Global loading component
```

---

## (group) Route Group

### Purpose
The `(group)` folder creates a route group that shares a common layout without affecting the URL path. All pages inside inherit:
- Header component
- CartProvider context
- SaveProvider context
- SessionProvider for NextAuth

### Layout Configuration (`layout.tsx`)

```typescript
export default function layout({ children }) {
  return (
    <SaveProvider>
      <CartProvider>
        <SessionProvider>
          <Header/>
          {children}
        </SessionProvider>
      </CartProvider>
    </SaveProvider>
  )
}
```

**Key Features**:
- Wraps all grouped routes with context providers
- Ensures Header appears on all pages in group
- Enables global state management for cart and saved items

---

## Page Components

### 1. Home Page (`page.tsx`)

**Route**: `/`

**Functionality**:
- Displays product catalog with pagination
- Shows advertisement carousel
- Renders category selection navbar
- Conditionally shows usecase selector for new Google OAuth users

**Key Components Used**:
- `Pagination`: Displays 15 products per page
- `Advertisement`: Auto-rotating promotional banner
- `SelectProductsFromCategory`: Horizontal category navigation
- `SelectUseCase`: Modal for new OAuth users to choose account type

**Data Fetching**:
```typescript
// Server-side fetch from database
const products = await prismaClient.product.findMany();
```

**Special Logic**:
- Checks if authenticated user has selected usecase
- If not, shows `SelectUseCase` modal

---

### 2. Cart Page (`cart/page.tsx`)

**Route**: `/cart`

**Functionality**:
- Displays all cart items with images, prices, quantities
- Allows quantity increase/decrease
- Remove items from cart
- Move items to save-for-later
- Shows save-for-later section below cart
- Displays order summary with pricing breakdown
- "Buy Now" button leads to checkout

**State Management**:
```typescript
const {cart, setCart, totalItems, user} = useContext(CartContext);
const {savelater, setSavelater} = useContext(SaveContext);
```

**Key Functions**:

1. **increaseQuantity(id)**
   - If user logged in: Updates DB + local state
   - If guest: Updates localStorage only
   
2. **decreaseQuantity(id)**
   - Decrements quantity
   - Removes item if quantity reaches 0
   
3. **handleSaveForLater(item)**
   - Moves item from cart to save-for-later
   - Syncs with DB for authenticated users
   
4. **moveToCart(item)**
   - Reverse operation of save-for-later

**Price Calculations**:
```typescript
const totalPrice = cart.reduce((sum, item) => 
  sum + (item.price ?? item.product.price) * (item.quantity || 1), 0
);
```

**UI Features**:
- Empty cart state with placeholder
- Item cards with hover effects
- Quantity controls with + / - buttons
- Visual distinction between cart and saved items

---

### 3. Product Detail Page (`product/[id]/page.tsx`)

**Route**: `/product/[id]`

**Functionality**:
- Displays full product information
- Shows product image, title, description, price, category
- Add to cart button
- Save for later button
- Similar products section (based on category)

**Data Fetching**:
```typescript
// Fetch main product
const response = await fetch(`/api/products/${id}`);

// Fetch similar products
const res = await fetch(
  `/api/similarproducts?category=${product.category}&id=${id}`
);
```

**Layout**:
- Top section: Image on left, details on right (50/50 split)
- Bottom section: Grid of similar product cards

---

### 4. Search Page (`search/page.tsx`)

**Route**: `/search?q=query&min=100&max=5000`

**Functionality**:
- Displays search results based on query and filters
- Shows empty state if no results
- Each product card shows:
  - Product image
  - Title, price
  - Save and Add to Cart buttons

**Layout Structure**:
```typescript
<Layout> // Sidebar with filters
  <div className="flex flex-wrap justify-center gap-8">
    {products.map(product => (
      <ProductCard />
    ))}
  </div>
</Layout>
```

**Filter Sidebar** (`search/layout.tsx`):
- Min Price input
- Max Price input
- Apply Filters button
- Sticky positioning on desktop

---

### 5. Category Selection Page (`selectcategory/page.tsx`)

**Route**: `/selectcategory?category=smartphones&min=0&max=50000`

**Functionality**:
- Displays products filtered by category
- Price range filtering
- Client-side component with useEffect for data fetching
- Hover effects and animations on product cards

**Data Fetching**:
```typescript
useEffect(() => {
  async function fetchProducts() {
    const res = await fetch(
      `/api/selectproducts?category=${category}&min=${minprice}&max=${maxprice}`
    );
    // Update state
  }
  fetchProducts();
}, [category, minprice, maxprice]);
```

**Visual Features**:
- Gradient backgrounds on cards
- Animated fade-in effects
- Category badges with custom colors
- Hover scale and shadow effects

---

### 6. Address & Contact Page (`address-and-contact/page.tsx`)

**Route**: `/address-and-contact`

**Functionality**:
- Collects shipping information
- Form validation (required fields marked with *)
- Proceeds to payment page on submit

**Form Fields**:
- Full Name*
- Email*
- Phone Number*
- Address Line 1*
- Address Line 2 (optional)
- City*, State*, Postal Code*, Country*

**Navigation**:
```typescript
function handleSubmit(e) {
  e.preventDefault();
  router.push('/payment-page');
}
```

---

### 7. Payment Page (`payment-page/page.jsx`)

**Route**: `/payment-page`

**Functionality**:
- Displays payment method selection
- Shows order summary
- Promo code application
- Calculates tax and total

**Payment Methods**:
- Razorpay (UPI/Cards/Wallets) - Recommended
- UPI Payment
- Cash on Delivery (+₹40 charge)
- Net Banking
- EMI Options

**Promo Codes**:
- `SAVE10`: 10% discount
- `FIRST50`: ₹50 off

**Price Breakdown**:
```typescript
const subtotal = cart.reduce((sum, item) => 
  sum + (item.price ?? item.product?.price) * (item.quantity || 1), 0
);
const shipping = subtotal > 499 ? 0 : 40;
const tax = subtotal * 0.18; // 18% GST
const total = subtotal + shipping + tax - discount;
```

**UI Components**:
- Payment method cards with icons
- Collapsible promo code section
- Order summary sidebar (sticky on desktop)
- Security badges

---

### 8. Company Registration Page (`addcompany/page.tsx`)

**Route**: `/addcompany`

**Functionality**:
- Register new business company
- Links company to user account

**Form Fields**:
- Company Name
- Description (textarea)
- Category (dropdown)

**Submit Logic**:
```typescript
const companydata = {
  name: companyname,
  category: category,
  description: description,
  ownerId: user?.id
};

await fetch("/api/addcompany", {
  method: "POST",
  body: JSON.stringify(companydata)
});
```

**Categories**:
- Electronics
- Beauty
- Mobile Accessories
- Cosmetics
- Nutrition and Supplements
- Other

---

### 9. Add Product Page (`addproduct/page.tsx`)

**Route**: `/addproduct`

**Functionality**:
- Business users add products to sell
- Modal-style overlay
- Form validation (required fields marked)

**Form Fields**:
- Title*
- Description
- Price* (number input)
- Category*
- Image URL*

**Submit Handler**:
```typescript
async function handleSubmit() {
  const data = {
    title,
    description,
    price: parseFloat(price),
    category,
    images: imageUrl,
  };

  await fetch(`/api/products`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

**Cancel Logic**:
- Confirms before canceling
- Retains form data if user cancels the cancel action
- Navigates to home if confirmed

---

### 10. Edit Product Page (`edit-product/[id]/page.jsx`)

**Route**: `/edit-product/[id]`

**Functionality**:
- Fetch existing product data
- Pre-fill form with current values
- Update product in database

**Data Flow**:
1. **On Mount**: Fetch product by ID
2. **Pre-fill Form**: Set state with existing values
3. **On Submit**: Send updated data to API

```typescript
useEffect(() => {
  async function EditProduct() {
    const res = await fetch(`/api/edit-product/${id}`);
    const data = await res.json();
    
    setTitle(data.product.title || "");
    setPrice(data.product.price || "");
    // ... set other fields
  }
  EditProduct();
}, [id]);
```

---

### 11. All Sales Products Page (`all-sales-product/page.tsx`)

**Route**: `/all-sales-product`

**Functionality**:
- Display all products belonging to user's company
- Edit product button for each item
- Empty state if no products

**Data Fetching**:
```typescript
useEffect(() => {
  async function ProductsIncompany() {
    const res = await fetch(`/api/allsalesproduct`);
    const data = await res.json();
    setProducts(data.products);
  }
  ProductsIncompany();
}, [user]);
```

**Card Features**:
- Product thumbnail
- Title, description, price
- Rating display (stars)
- Category badge
- Edit button (navigates to edit page)

---

### 12. Register/Add Product Router (`register-addproduct/page.tsx`)

**Route**: `/register-addproduct`

**Functionality**:
- Hub for business users
- Three main actions:
  1. View all products on sale
  2. Register new company
  3. Add product on sale

**UI Layout**:
- Hero section with title
- Two prominent cards (Register Company / Add Product)
- Each card has icon, description, and action button
- "All Products on Sale" button at top

**Navigation**:
- `/all-sales-product` - View sales
- `/addcompany` - Register company
- `/addproduct` - Add new product

---

### 13. Company Registration Prompt (`add-company-btn/page.tsx`)

**Route**: `/add-company-btn`

**Functionality**:
- Displayed when business user has no company registered
- Prompts user to register before adding products

**UI Elements**:
- Building icon
- Informative message
- "Register Your Company" CTA button
- Feature checkmarks (quick setup, secure, verified)

---

## Header Component (`Header/page.tsx`)

**Functionality**:
- Global navigation bar
- Search functionality with autocomplete
- Cart icon with item count badge
- Login/Logout button
- Conditional "Add Product" button for business users

**Search Implementation**:
```typescript
useEffect(() => {
  const fetchdata = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setSuggestion(data.products);
  };
  if (userInput) {
    fetchdata();
  }
}, [userInput]);

const filteredproducts = suggestion.filter((item) =>
  item.title.toLowerCase().includes(userInput.toLowerCase())
);
```

**Add Product Logic**:
```typescript
function handleAddProduct() {
  if (!user) return;
  
  if (user.company.length == 0) {
    router.push('add-company-btn');
  } else {
    router.push('/register-addproduct');
  }
}
```

**Header Sections**:
1. **Left**: Brand logo "ShopZone"
2. **Center**: Search bar with autocomplete dropdown
3. **Right**: Login/Logout, Add Product (if business), Cart icon

---

## Context Providers

### 1. CartContext (`context/CartContext.tsx`)

**Purpose**: Global cart state management

**State**:
- `cart`: Array of cart items
- `user`: Current authenticated user
- `isCartLoaded`: Loading flag
- `totalItems`: Computed total quantity

**Key Logic**:

1. **Load Cart on Mount**:
```typescript
useEffect(() => {
  async function loadCart() {
    if (!user) {
      // Load from localStorage
      let cartItems = localStorage.getItem("cart");
      cartItems = cartItems ? JSON.parse(cartItems) : [];
      setCart(cartItems);
    } else {
      // Merge localStorage cart to DB
      let localCart = localStorage.getItem("cart");
      localCart = localCart ? JSON.parse(localCart) : [];
      
      if (localCart.length > 0) {
        await fetch("/api/cart/merge", {
          method: "POST",
          body: JSON.stringify({ items: localCart }),
        });
        localStorage.removeItem("cart");
      }
      
      // Fetch from DB
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data.items);
    }
    setIsCartLoaded(true);
  }
  loadCart();
}, [user]);
```

2. **Sync to localStorage** (guests only):
```typescript
useEffect(() => {
  if (isCartLoaded && !user) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}, [cart, user, isCartLoaded]);
```

**Exported Values**:
```typescript
{ cart, setCart, totalItems, user, setUser }
```

---

### 2. SaveContext (`context/savecontext.tsx`)

**Purpose**: Manage save-for-later items

**State**:
- `savelater`: Array of saved items
- `user`: Current authenticated user

**Logic**:
- Similar to CartContext
- Fetches from localStorage for guests
- Fetches from `/api/savelater` for authenticated users
- Merges localStorage saves to DB on login

**Exported Values**:
```typescript
{ savelater, setSavelater, user, setUser }
```

---

## Root Layout (`layout.tsx`)

**Purpose**: Global app wrapper

```typescript
export default function layout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
```

**Note**: Kept minimal to allow route groups to define their own providers

---

## Loading Component (`loading.tsx`)

**Purpose**: Global loading UI shown during route transitions

**UI Elements**:
- Shopping bag icon with animated badge
- Rotating spinner
- Loading message
- Pulsing dots animation
- Brand message at bottom

**Styling**:
- Gradient background
- Centered flexbox layout
- Tailwind CSS animations

---

## Global Styles (`globals.css`)

**Tailwind Configuration**:
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Custom Animations**:
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
```

**Utility Classes**:
```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## Authentication Pages

### Login Page (`login/page.tsx`)

**Route**: `/login`

**Functionality**:
- Email/username + password login
- Google OAuth login option
- Link to signup page

**Form Fields**:
- `usercred`: Email or username
- `password`: Password field

**Submit Handler**:
```typescript
async function handlelogin(e) {
  e.preventDefault();
  
  const res = await fetch(`/api/login`, {
    method: "POST",
    body: JSON.stringify({ usercred, password })
  });
  
  const data = await res.json();
  
  if (data.success) {
    router.push("/");
  } else {
    setError(data.message);
  }
}
```

**UI Features**:
- Error message display
- "Sign in with Google" button component
- Link to signup page

---

### Signup Page (`signup/page.tsx`)

**Route**: `/signup`

**Functionality**:
- Create new account
- Email/password registration
- Username selection
- Use case selection (personal/business)
- Google OAuth signup option

**Form Fields**:
- Email
- Username
- Password
- Confirm Password
- Use Case (dropdown: personal/business)

**Validation**:
```typescript
if (password !== confirmpassword) {
  alert("Passwords do not match");
  return;
}
```

**Submit Handler**:
```typescript
const data = {
  email,
  password,
  username,
  usecase: use,
  provider: "credentials"
};

const res = await fetch(`/api/signup`, {
  method: "POST",
  body: JSON.stringify(data)
});
```

**UI Features**:
- Password mismatch warning
- Styled dropdown for use case
- Google sign-in button
- Link to login page

---

## Key Patterns & Conventions

### 1. Client vs Server Components
- **Server Components** (default): Data fetching, static content
- **Client Components** (`"use client"`): Interactivity, state, context

### 2. Data Fetching
- **Server Components**: Direct Prisma queries or fetch in component
- **Client Components**: useEffect with fetch, or API routes

### 3. Form Handling
- Controlled inputs with useState
- Form submission with async/await
- Error handling with try-catch or response checking

### 4. Navigation
- `useRouter` hook from `next/navigation`
- `Link` component for client-side routing
- Programmatic navigation with `router.push()`

### 5. Styling
- Tailwind utility classes
- Gradient backgrounds for visual appeal
- Hover effects and transitions
- Responsive breakpoints (sm, md, lg, xl)

---

## Summary

The app directory showcases modern Next.js 15 patterns:
- Route groups for shared layouts
- Context API for state management
- Server and client component separation
- File-based routing with dynamic segments
- Nested layouts for progressive enhancement

The structure supports both e-commerce core features and business management capabilities while maintaining clean separation of concerns.