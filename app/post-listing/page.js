// app/post-listing/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Electronics",
  "Furniture",
  "Clothing & Accessories",
  "Home & Garden",
  "Vehicles",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Media",
  "Health & Beauty",
  "Art & Collectibles",
  "Pet Supplies",
  "Baby & Kids",
  "Tools & DIY",
  "Jobs & Services",
  "Real Estate",
  "Other",
];

export default function PostListingPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    photos.forEach((photo) => formData.append("photos", photo));
    if (receipt) formData.append("receipt", receipt);

    const res = await fetch("/api/listings", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Listing posted successfully!");
      router.push("/marketplace");
    } else {
      alert("Failed to post listing.");
    }
  };

  return (
    <div>
      <h1>Post a Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setPhotos([...e.target.files])}
            required
          />
        </div>
        <div>
          <label>Receipt (Optional)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setReceipt(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Post Listing
        </button>
      </form>
    </div>
  );
}