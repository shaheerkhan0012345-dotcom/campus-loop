"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPKR } from "@/lib/utils";
import {
  ShoppingBag,
  PlusCircle,
  Search,
  Filter,
  SlidersHorizontal,
  Heart,
  ArrowRight,
  ShieldCheck,
  Tag,
  MapPin,
} from "lucide-react";

export default function MarketplacePage() {
  const { listings, savedListingIds, toggleSaveListing, currentUniversity } = useCampus();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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

  const conditions = [
    { id: "all", label: "All Conditions" },
    { id: "new", label: "Brand New" },
    { id: "like_new", label: "Like New" },
    { id: "good", label: "Good" },
    { id: "fair", label: "Fair" },
  ];

  // Filter listings
  const marketplaceItems = listings
    .filter((l) => l.type === "marketplace")
    .filter((item) => (selectedCategory === "all" ? true : item.category === selectedCategory))
    .filter((item) => (selectedCondition === "all" ? true : item.condition === selectedCondition))
    .filter((item) => (maxPrice ? (item.price_pkr || 0) <= maxPrice : true))
    .filter((item) =>
      searchQuery.trim() === ""
        ? true
        : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") return (a.price_pkr || 0) - (b.price_pkr || 0);
      if (sortBy === "price_desc") return (b.price_pkr || 0) - (a.price_pkr || 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-teal-400/20 text-teal-300">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Direct Peer-to-Peer Campus Commerce
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Campus Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Buy and sell textbooks, calculators, electronics, hostel furniture and lab gear safely in
            PKR within {currentUniversity.name}. No online transaction fees.
          </p>
        </div>

        <Link
          href="/marketplace/new"
          className="px-5 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post an Item for Sale</span>
        </Link>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, monitors, mice, calculus..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Condition Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30"
            >
              {conditions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition shrink-0 ${
              selectedCategory === "all"
                ? "bg-campus-navy text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition shrink-0 ${
                selectedCategory === cat
                  ? "bg-campus-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Listings Grid */}
      {marketplaceItems.length === 0 ? (
        <EmptyState
          title="No products found in this category"
          description="Try adjusting your filters or be the first student to post an item for sale!"
          actionHref="/marketplace/new"
          actionText="List a Product"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceItems.map((item) => {
            const isSaved = savedListingIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-cardHover transition flex flex-col justify-between group relative"
              >
                {/* Photo & Condition Badge */}
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* Condition badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                        {item.condition?.replace("_", " ")}
                      </span>
                    </div>

                    {/* Bookmark Heart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSaveListing(item.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600 transition shadow-xs"
                      aria-label="Save listing"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? "fill-rose-500 text-rose-500" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <span className="text-[11px] font-medium text-slate-400 block mb-1">
                      {item.category}
                    </span>
                    <Link href={`/marketplace/${item.id}`}>
                      <h3 className="text-sm font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1 mb-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-lg font-extrabold text-campus-navy">
                      {item.price_pkr ? formatPKR(item.price_pkr) : "Negotiable"}
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate max-w-[130px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {item.location_name}
                    </span>
                    <Link
                      href={`/marketplace/${item.id}`}
                      className="font-bold text-campus-teal hover:underline shrink-0"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
