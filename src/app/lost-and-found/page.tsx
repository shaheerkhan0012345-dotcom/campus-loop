"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";
import {
  HelpCircle,
  PlusCircle,
  Search,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function LostAndFoundPage() {
  const { listings, currentUniversity } = useCampus();

  const [activeTab, setActiveTab] = useState<"all" | "lost" | "found">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  const categories = ["Electronics", "Accessories", "Books", "Keys & Cards", "Clothing", "Other"];

  // Filter listings
  const filteredItems = listings
    .filter((l) => l.type === "lost" || l.type === "found")
    .filter((item) => (activeTab === "all" ? true : item.type === activeTab))
    .filter((item) => (selectedCategory === "all" ? true : item.category === selectedCategory))
    .filter((item) =>
      searchQuery.trim() === ""
        ? true
        : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const lostCount = listings.filter((l) => l.type === "lost").length;
  const foundCount = listings.filter((l) => l.type === "found").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
              <HelpCircle className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Campus Recovery System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Lost & Found Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Recover lost items or return found property across {currentUniversity.name}. Powered by
            AI visual embeddings to compare descriptions and photographs automatically.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/lost-and-found/new?type=lost"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Report Lost Item
          </Link>
          <Link
            href="/lost-and-found/new?type=found"
            className="px-4 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Report Found Item
          </Link>
        </div>
      </div>

      {/* AI Assistance Callout */}
      <div className="mb-8 p-4 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-campus-teal text-white rounded-xl shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-campus-navy">Automated AI Similarity Matching</span>
            <p className="text-slate-600">
              When you post a lost report, CampusLoop AI continuously compares your photos and
              descriptions against all found belongings in {currentUniversity.short_name}.
            </p>
          </div>
        </div>
        <Badge variant="teal" size="sm" className="hidden sm:inline-flex shrink-0">
          Neural Matching Engine Active
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "all" ? "bg-white text-campus-navy shadow-xs" : "text-slate-600"
              }`}
            >
              All Items ({lostCount + foundCount})
            </button>
            <button
              onClick={() => setActiveTab("lost")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "lost" ? "bg-white text-rose-600 shadow-xs" : "text-slate-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Lost ({lostCount})
            </button>
            <button
              onClick={() => setActiveTab("found")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "found" ? "bg-white text-campus-teal shadow-xs" : "text-slate-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-campus-teal" />
              Found ({foundCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. calculator, lanyard, keys)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition shrink-0 ${
              selectedCategory === "all"
                ? "bg-campus-navy text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition shrink-0 ${
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

      {/* Item Cards Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No lost or found items match your criteria"
          description="Try clearing search filters or report a new lost or found belonging to notify the campus."
          actionHref="/lost-and-found/new"
          actionText="Create Report"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/lost-and-found/${item.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-cardHover transition flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <Badge variant={item.type === "lost" ? "rose" : "teal"} size="sm">
                      {item.type.toUpperCase()}
                    </Badge>
                    {item.is_anonymous_found && (
                      <span className="text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Private Finder
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold bg-white/90 text-slate-700 px-2 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.location_name}</span>
                    </div>
                    {item.date_occurred && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{formatDate(item.date_occurred)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Posted by {item.is_anonymous_found ? "Verified Student" : item.author_name}
                  </span>
                  <span className="font-bold text-campus-navy group-hover:text-campus-teal transition flex items-center gap-1">
                    Details & Claim <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
