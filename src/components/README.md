# Components Directory Documentation

## Overview

The `src/components` directory contains reusable UI components used throughout the application. These components are primarily client-side React components that handle user interactions and UI logic.

---

## Directory Structure

```
src/components/
├── Homepage/
│   └── home-page.tsx          # (Not in use, removed from imports)
├── addtocartbtn.tsx           # Add product to cart button
├── advertisement.tsx          # Auto-rotating banner
├── delete-item-btn.tsx        # (Referenced but not in files)
├── edit-prod-btn.tsx          # Edit product button
├── logout-btn.tsx             # Logout functionality
├── pagination.tsx             # Product pagination
├── productcard.tsx            # Product display card (Itemcard)
├── removeproductfromcart.tsx  # Remove from cart button
├── savelater.tsx              # Save for later button
├── select-by-category.tsx     # Category navbar
├── select-usecase.tsx         # Use case selection modal
└── sign-in-with-google.tsx    # Google OAuth button
```

---

## Cart & Product Action Components

### 1. Add to Cart Button (`addtocartbtn.tsx`)

**Purpose**: Add products to shopping cart

**Usage**:
```tsx
<AddToCart product={product} />
```

**Props**:
```typescript
{
  product: {
    id: string;
    title: string;
    price: number;
    // ... other product fields
  }
}
```

**State Management**:
```typescript
const { cart, setCart } = useContext(CartContext);
const [user, setUser] = useState(null);
```

**Logic Flow**:

1. **Get Current User**:
```typescript
useEffect(() => {
  async function getcurrentuser() {
    const user = await getCurrentUserFromCookies();
    setUser(user);
  }
  getcurrentuser();
}, []);
```

2. **Handle Add to Cart**:

```typescript
async function handlecart() {
  if (user) {
    // Authenticated: Save to DB
    const res = await fetch("/api/cart/", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        productId: product.id,
        quantity: 1,
      }),
    });
    
    const data = await res.json();
    if (data.success) {
      setCart([...cart, data.data]);
    }
  } else {
    // Guest: Update localStorage via context
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      // Increment quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new item
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
}
```

**Key Features**:
- Dual behavior for guest/authenticated users
- Automatic quantity increment for existing items
- Real-time UI update via context

**UI**:
```tsx
<button 
  onClick={handlecart}
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 shadow-lg"
>
  <ShoppingCart className="w-4 h-4" />
  <span className="text-sm font-semibold">Add</span>
</button>
```

---

### 2. Save for Later Button (`savelater.tsx`)

**Purpose**: Move products to save-for-later list

**Usage**:
```tsx
<SaveLater product={product} />
```

**Props**: Same as AddToCart

**State Management**:
```typescript
const { savelater, setSavelater, user } = useContext(SaveContext);
```

**Logic**:

```typescript
async function handleSaveForLater() {
  if (user) {
    // Authenticated: Save to DB
    await fetch("/api/savelater", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        productId: product?.id,
      }),
    });
  } else {
    // Guest: Update localStorage
    setSavelater((prev) =>
      prev.find((p) => p.id === product.id) 
        ? prev 
        : [...prev, product]
    );
  }
}

// Sync to localStorage for guests
useEffect(() => {
  if (!user) {
    localStorage.setItem("savelater", JSON.stringify(savelater));
  }
}, [savelater, user]);
```

**Duplicate Prevention**: Checks if product already in save list

**UI**:
```tsx
<button
  onClick={handleSaveForLater}
  className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-red-700 hover:bg-red-50 hover:scale-110"
>
  <Heart className="w-5 h-5 text-red-500" />
  <span className="text-sm font-medium">Save</span>
</button>
```

---

### 3. Remove Product from Cart (`removeproductfromcart.tsx`)

**Purpose**: Delete item from shopping cart

**Usage**:
```tsx
<RemoveProduct id={item.id} />
```

**Props**:
```typescript
{
  id: string;  // cart item ID
}
```

**State Management**:
```typescript
const { cart, setCart, user } = useContext(CartContext);
```

**Logic**:

```typescript
async function removeProduct(id) {
  if (user) {
    // Update local state immediately
    const remainingproduct = cart.filter((item) => item.id !== id);
    setCart(remainingproduct);
    
    // Sync to database
    const res = await fetch(`/api/cart/delete`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  } else {
    // Guest: Update localStorage via context
    const remainingproduct = cart.filter((item) => item.id !== id);
    setCart(remainingproduct);
  }
}
```

**Optimistic Update**: UI updates before API call completes

**UI**:
```tsx
<button
  onClick={() => removeProduct(id)}
  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
>
  <Trash2 className="w-4 h-4" />
  <span className="text-sm">Remove</span>
</button>
```

---

### 4. Edit Product Button (`edit-prod-btn.tsx`)

**Purpose**: Navigate to product edit page

**Usage**:
```tsx
<EditProductBtn product={product} />
```

**Props**:
```typescript
{
  product: {
    id: string;
    // ... other fields
  }
}
```

**Logic**:
```typescript
const router = useRouter();

function handleEditProduct() {
  router.push(`/edit-product/${product.id}`);
}
```

**UI**:
```tsx
<button 
  onClick={handleEditProduct}
  className="px-4 py-2 bg-red-300 rounded cursor-pointer"
>
  Edit
</button>
```

**Access Control**: Only shown to business users on their products page

---

## Display Components

### 1. Product Card (`productcard.tsx`)

**Purpose**: Display product information in card format

**Usage**:
```tsx
<Itemcard product={product} />
```

**Props**:
```typescript
{
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating?: number;
    brand?: string;
  }
}
```

**Layout Structure**:

```tsx
<div className="product-card-container">
  {/* Background gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50 opacity-60">
  
  <div className="relative p-6">
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-xl">
          <img 
            src={product.thumbnail}
            alt={product.title}
            className="w-full sm:w-32 h-32 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10" />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        {/* Title and Category */}
        <Link href={`/product/${product.id}`}>
          <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 line-clamp-2">
            {product.title}
          </h2>
        </Link>
        
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs capitalize">
          {product.category}
        </span>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <StarRating rating={product.rating || 4} />
        </div>
        
        {/* Price and Actions */}
        <div className="flex flex-col items-start gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          
          <div className="flex gap-3">
            <SaveLater product={product} />
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Hover border effect */}
  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-100" />
</div>
```

**Key Features**:
- Responsive layout (stacked on mobile, side-by-side on desktop)
- Hover effects (scale image, change border color)
- Category badge with color coding
- Star rating display
- Integrated action buttons


---

### 2. Pagination (`pagination.tsx`)

**Purpose**: Paginate product listings

**Usage**:
```tsx
<Pagination products={products} />
```

**Props**:
```typescript
{
  products: Array<Product>;
}
```

**Configuration**:
```typescript
const pagesize = 15;  // Items per page
const maxVisibleButtons = 5;  // Page number buttons to show
```

**State**:
```typescript
const [currentpage, setCurrentpage] = useState(1);
```

**Calculations**:
```typescript
const totalproducts = products.length;
const totalpage = Math.ceil(totalproducts / pagesize);
const start = (currentpage - 1) * pagesize;
const end = currentpage * pagesize;
```

**Page Range Logic**:
```typescript
const getPageRange = () => {
  let startPage = Math.max(1, currentpage - Math.floor(maxVisibleButtons / 2));
  let endPage = startPage + maxVisibleButtons - 1;

  if (endPage > totalpage) {
    endPage = totalpage;
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const range = [];
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }
  return range;
};
```



**Features**:
- Client-side pagination (no API calls)
- Smart page range display (shows 5 buttons around current page)
- Conditional Prev/Next buttons
- Active page highlighting

---

### 3. Advertisement Banner (`advertisement.tsx`)

**Purpose**: Auto-rotating promotional banner

**Usage**:
```tsx
<Advertisement />
```

**Configuration**:
```typescript
const ads = [
  "🔥 50% OFF on Electronics!",
  "🚚 Free Shipping on orders above ₹499!",
  "🎉 New arrivals in Fashion!",
  "⚡ Flash Sale: Limited Time Only!",
];
```

**State**:
```typescript
const [currentAd, setCurrentAd] = useState(0);
```

**Auto-Rotation Logic**:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  }, 3000);  // Rotate every 3 seconds

  return () => clearInterval(interval);  // Cleanup on unmount
}, []);
```

**UI**:
```tsx
<div className="w-full h-40 bg-red-400 flex items-center justify-center text-white font-bold text-lg rounded-md">
  {ads[currentAd]}
</div>
```

**Cleanup**: Clears interval when component unmounts or page changes

---

## Navigation Components

### 1. Category Selection Navbar (`select-by-category.tsx`)

**Purpose**: Horizontal scrollable category navigation

**Usage**:
```tsx
<SelectProductsFromCategory />
```

**Categories Configuration** (`src/constants/categories.js`):
```javascript
import { Smartphone, Heart, Headphones, ... } from "lucide-react";

export const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    icon: Smartphone,
    gradient: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    id: "skin-care",
    name: "Beauty",
    icon: Heart,
    gradient: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-50",
    hoverColor: "hover:bg-pink-100",
  },
  // ... 10 categories total
];
```

**State**:
```typescript
const [hoveredCategory, setHoveredCategory] = useState(null);
```

**Scroll Functionality**:
```typescript
const scrollCategories = (direction) => {
  const container = document.getElementById("categories-container");
  const scrollAmount = 200;
  
  if (direction === "left") {
    container.scrollLeft -= scrollAmount;
  } else {
    container.scrollLeft += scrollAmount;
  }
};
```

**Navigation Handler**:
```typescript
function handleSearchProductWithCategory(e, category) {
  e.preventDefault();
  router.push(`/selectcategory?category=${category}`);
}
```

**Layout Structure**:

```tsx
<div className="bg-white w-full shadow-lg border-b">
  <div className="relative w-full bg-gradient-to-r from-gray-50 via-white to-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative flex items-center">
        {/* Left Scroll Button */}
        <button 
          onClick={() => scrollCategories("left")}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

   
      

               
        {/* Right Scroll Button */}
        <button 
          onClick={() => scrollCategories("right")}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg ml-4"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Instructions */}
  <div className="md:hidden bg-gray-50 px-4 py-2">
    <div className="flex justify-center">
      <span className="text-xs text-gray-500 font-medium">
        ← Scroll to explore categories →
      </span>
    </div>
  </div>
</div>
```

**Visual Features**:
- Gradient backgrounds on hover
- Icon and text color transitions
- Scale and translate animations
- Bottom indicator bar
- Smooth horizontal scrolling
- Desktop-only scroll buttons
- Mobile swipe support

---

## Authentication Components

### 1. Sign in with Google (`sign-in-with-google.tsx`)

**Purpose**: Google OAuth login button

**Usage**:
```tsx
<SignInWithGoogle />
```

**Logic**:
```typescript
import { signIn } from "next-auth/react";

export default function SignInWithGoogle() {
  return (
    <button 
      className="flex items-center justify-center gap-3 mt-5 bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-2 w-full hover:bg-gray-100 transition"
      onClick={() => signIn("google", { redirectTo: "/" })}
    >
      <img
        src="https://static.vecteezy.com/.../google-logo-transparent-background-free-png.png"
        alt="Google Logo"
        width={20}
        height={20}
      />
      <span className="text-gray-700 font-medium">
        continue with Google
      </span>
    </button>
  );
}
```

**Features**:
- NextAuth.js integration
- Redirect to home page after login
- Google branding compliance

---

### 2. Logout Button (`logout-btn.tsx`)

**Purpose**: Log out current user

**Usage**:
```tsx
<Logout />
```

**Logic**:

```typescript
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const { data: session } = useSession();

  async function handlelogout() {
    if (session) {
      // NextAuth session
      signOut();
    } else {
      // JWT session
      const res = await fetch("/api/logout", {
        method: "POST"
      });
      
      const data = await res.json();
      if (data.success) {
        router.push('/');
      }
    }
  }

  return (
    <button className="cursor-pointer" onClick={handlelogout}>
      <LogOut /> logout
    </button>
  );
}
```

**Dual Logout**:
- Google OAuth users: NextAuth signOut
- Credentials users: API call to clear JWT cookie

---

### 3. Select Use Case Modal (`select-usecase.tsx`)

**Purpose**: Prompt new OAuth users to choose account type

**Usage**:
```tsx
{session && !user?.usecase && <SelectUseCase />}
```

**State**:
```typescript
const [usecase, setUsecase] = useState("");
const [error, setError] = useState("");
```

**Logic**:

```typescript
const { data: session } = useSession();

const usertosave = {
  provider: "google",
  email: session?.user?.email,
  username: session?.user?.name,
  usecase: usecase,
};

async function handleUseCase(e) {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usertosave),
    });

    const data = await res.json();
    
    if (data.success) {
      router.refresh();
    } else {
      setError(data?.message);
    }
  } catch (err) {
    setError("Failed to connect to server.");
  }
}
```

**UI**:
```tsx
<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
  <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
    <h2 className="text-lg font-semibold mb-4">
      How do you want to use this account?
    </h2>

    <form onSubmit={handleUseCase} className="flex flex-col gap-4">
      <select
        value={usecase}
        onChange={(e) => setUsecase(e.target.value)}
        required
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select --</option>
        <option value="personal">Personal use</option>
        <option value="business">Business</option>
      </select>

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>

    {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
  </div>
</div>
```

**Trigger Condition**: Shows when:
- User is authenticated via Google OAuth
- User record exists in database
- User's `usecase` field is null/empty

**Purpose**: Complete user profile for Google OAuth users who don't have business/personal preference set

---

## Component Patterns

### 1. Client-Side Components

**Pattern**:
```typescript
"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Component() {
  // State and logic
}
```

**When to use `"use client"`**:
- Component uses hooks (useState, useEffect, useContext)
- Component has event handlers
- Component uses browser APIs
- Component needs to be interactive

---

### 2. Context Usage

**Pattern**:
```typescript
const { cart, setCart, user } = useContext(CartContext);
const { savelater, setSavelater } = useContext(SaveContext);
```

**Benefits**:
- Shared state across components
- No prop drilling
- Centralized cart/save logic

---

### 3. Optimistic UI Updates

**Pattern**:
```typescript
async function updateState(data) {
  // Update UI immediately
  setLocalState(newState);
  
  // Then sync to server
  await fetch('/api/endpoint', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

**Used in**: RemoveProduct, AddToCart

---

### 4. Conditional Rendering

**Pattern**:
```typescript
{user ? (
  <AuthenticatedComponent />
) : (
  <GuestComponent />
)}
```

**Used in**: Header, AddToCart, SaveLater

---

### 5. Event Handling

**Pattern**:
```typescript
function handleEvent(e, data) {
  e.preventDefault();
  
  // Validation
  if (!data) return;
  
  // Async operation
  await performAction(data);
  
  // Navigation or state update
  router.push('/next-page');
}
```

---

## Styling Patterns

### 1. Gradient Backgrounds
```tsx
className="bg-gradient-to-r from-blue-500 to-purple-600"
```

### 2. Hover Effects
```tsx
className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
```

### 3. Responsive Layout
```tsx
className="flex flex-col md:flex-row"
```

### 4. Conditional Classes
```tsx
className={`base-class ${condition ? 'active' : 'inactive'}`}
```

---

## Performance Considerations

1. **Lazy Loading**: Could add React.lazy for code splitting
2. **Memoization**: Could use React.memo for expensive components
3. **Virtual Scrolling**: Could implement for long product lists
4. **Image Optimization**: Using Next.js Image component recommended

---

## Accessibility Features

1. **Semantic HTML**: Using appropriate HTML tags
2. **Keyboard Navigation**: Buttons are keyboard accessible
3. **ARIA Labels**: Could be improved with aria-label attributes
4. **Focus Management**: Default browser focus indicators

---

## Summary

The components directory provides:
- **Cart Operations**: Add, remove, save-for-later
- **Product Display**: Cards, pagination, categories
- **Authentication**: Login, logout, use case selection
- **Navigation**: Category navbar with smooth scrolling
- **Visual Effects**: Gradients, animations, hover states
