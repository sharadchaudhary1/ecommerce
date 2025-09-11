
"use client";
import { useEffect, useState } from "react";

export default function Advertisement() {
  
  const ads = [
    "🔥 50% OFF on Electronics!",
    "🚚 Free Shipping on orders above ₹499!",
    "🎉 New arrivals in Fashion!",
    "⚡ Flash Sale: Limited Time Only!",
  ];

  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000); 

    return () => clearInterval(interval); // it is used to stop the execution of setinterval when a current page change .ex:move from home-> about page 
  }, []);

  return (
    <div className="w-full h-40 bg-red-400 flex items-center justify-center text-white font-bold text-lg rounded-md">
      {ads[currentAd]}
    </div>
  );
}
