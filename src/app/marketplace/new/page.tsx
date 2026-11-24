"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { ItemCondition } from "@/lib/types";
import {
  ShoppingBag,
  ArrowLeft,
  X,
  Plus,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function NewMarketplaceProductPage() {
  const router = useRouter();
  const { addListing, currentUniversity, currentUser } = useCampus();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [condition, setCondition] = useState<ItemCondition>("like_new");
  const [pricePkr, setPricePkr] = useState("");
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600",
  ]);

  const categories = [
    "Electronics",
    "Books",
    "Furniture",
    "Clothing",
    "Accessories",
    "Stationery",
    "Household items",
    "Sports equipment",
    "Other",
  ];

  const conditions: { id: ItemCondition; label: string; desc: string }[] = [
    { id: "new", label: "Brand New", desc: "Never used, in original packaging" },
    { id: "like_new", label: "Like New", desc: "Barely used, zero flaws" },
    { id: "good", label: "Good", desc: "Minor normal wear, fully functional" },
    { id: "fair", label: "Fair", desc: "Visible signs of wear, fully works" },
  ];

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !locationName.trim() || !pricePkr) return;

    const parsedPrice = parseFloat(pricePkr);
    if (isNaN(parsedPrice) || parsedPrice <= 0) return;

    const tags = [
      category.toLowerCase(),
      ...title.toLowerCase().split(/\s+/).filter((w) => w.length > 3),
    ];

    const newListing = addListing({
      university_id: currentUniversity.id,
      user_id: currentUser.id,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
      type: "marketplace",
      title,
      description,
      category,
      price_pkr: parsedPrice,
      condition,
      status: "active",
      location_name: locationName,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600"],
      tags,
    });

    router.push(`/marketplace/${newListing.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-campus-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campus Marketplace
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-teal-100 text-teal-800">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              {currentUniversity.short_name} Marketplace
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-campus-navy">
            Create Product Listing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            List your item for fellow university students. Set a transparent price in PKR and arrange
            safe handover on campus.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Logitech MX Master 3S, Thomas Calculus 14th Ed, Ergonomic Study Chair"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Price in PKR *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  PKR
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="50"
                  value={pricePkr}
                  onChange={(e) => setPricePkr(e.target.value)}
                  placeholder="e.g. 2500"
                  className="w-full pl-12 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
                />
              </div>
            </div>
          </div>

          {/* Product Condition Selection */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-2">
              Item Condition *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {conditions.map((cond) => (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setCondition(cond.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    condition === cond.id
                      ? "border-campus-teal bg-teal-50/70 text-campus-teal"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-xs font-bold">{cond.label}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{cond.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Handover Location */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Campus Handover Location *
            </label>
            <input
              type="text"
              required
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. Hostel Razi Hall Gate 1, Concordia 1 Cafe, SADA Building"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Detailed Description & Specifications *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State warranty, accessories included, original packaging, reason for selling..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Product Photographs */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Photographs
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL (Unsplash or hosted link)..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold rounded-xl transition"
              >
                Add Image
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/marketplace"
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-campus-teal hover:bg-campus-teal-dark text-white text-xs font-bold rounded-xl transition shadow-sm"
            >
              Publish Marketplace Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
