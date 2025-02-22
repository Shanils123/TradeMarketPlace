// app/marketplace/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MarketplacePage() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Fetch items from the backend
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle interaction (e.g., chat, negotiate, location)
  const handleInteraction = () => {
    if (!isLoggedIn) {
      alert("Please log in to interact with this item.");
      router.push("/login");
    } else {
      // Proceed with interaction
    }
  };

  return (
    <div>
      <h1>Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <button
              onClick={handleInteraction}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isLoggedIn ? "Chat with Seller" : "Log In to Interact"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}