

//@ts-nocheck
"use client";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
// import products from "@/constants/data";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import AddProdButton from "@/components/addproductbtn";

const Header = () => {
  const [userInput, setUserInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
 const {totalItems}= useContext(CartContext)

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setSuggestion(data.products);
    };
    if (userInput) {
      fetchdata();
    } else {
      return setSuggestion([]);
    }
  }, [userInput]);

  const filteredproducts = suggestion.filter((item) =>
    item.title.toLowerCase().includes(userInput.toLowerCase())
  );

  return (
    <header className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between shadow">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <span className="text-yellow-300">ShopZone</span>
      </Link>
      <div>
        <form
          action="/search"
          method="GET"
          className="flex flex-grow max-w-lg mx-6"
        >
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            name="q"
            className="w-full px-4 py-2 border-none rounded-l bg-white outline-none text-black"
            placeholder="Search products..."
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-r"
          >
            🔍
          </button>
           

        </form>
        {userInput && filteredproducts.length > 0 && (
          <ul className="absolute bg-white text-black mt-1 rounded shadow w-full max-w-lg z-50">
            {filteredproducts.slice(0, 10).map((item) => (
              <li key={item.id} className="px-4 py-2 hover:bg-gray-200">
                <Link href={`/product/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/login"
          className="flex items-center gap-1 text-white hover:text-yellow-300 transition"
        >
          <FaUser className="text-lg" />
          <span className="font-medium">Login</span>
        </Link>
           
           <AddProdButton/>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex items-center text-white hover:text-yellow-300 transition"
        >
          <FaShoppingCart className="text-2xl " />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
          {/* <span className="ml-1 font-medium absolute">{totalItems} </span> */}
        </Link>
      </div>
    </header>
  );
};

export default Header;
0