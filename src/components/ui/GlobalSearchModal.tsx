"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { CampusLoopAI } from "@/lib/ai/gemini";
import {
  Search,
  X,
  Package,
  HelpCircle,
  Briefcase,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { listings, opportunities, resources, events } = useCampus();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "market" | "lost_found" | "opps" | "resources" | "events">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from shortcut
        }
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter listings
  const filteredMarket = CampusLoopAI.semanticSearch(
    query,
    listings.filter((l) => l.type === "marketplace")
  );
  const filteredLostFound = CampusLoopAI.semanticSearch(
    query,
    listings.filter((l) => l.type === "lost" || l.type === "found")
  );
  const filteredOpps = CampusLoopAI.semanticSearch(query, opportunities);
  const filteredRes = CampusLoopAI.semanticSearch(query, resources);
  const filteredEvents = CampusLoopAI.semanticSearch(query, events);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden transform animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across Marketplace, Lost & Found, Notes, Opportunities..."
            className="w-full bg-transparent text-sm text-campus-navy focus:outline-hidden placeholder:text-slate-400"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-200/70 text-slate-600 hover:bg-slate-300 font-mono transition"
          >
            ESC
          </button>
        </div>

        {/* Tab Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-white border-b border-slate-100 overflow-x-auto text-xs">
          {[
            { id: "all", label: "All Results" },
            { id: "market", label: `Marketplace (${filteredMarket.length})` },
            { id: "lost_found", label: `Lost & Found (${filteredLostFound.length})` },
            { id: "opps", label: `Opportunities (${filteredOpps.length})` },
            { id: "resources", label: `Notes (${filteredRes.length})` },
            { id: "events", label: `Events (${filteredEvents.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 rounded-full font-medium transition shrink-0 ${
                activeTab === tab.id
                  ? "bg-campus-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Marketplace Results */}
          {(activeTab === "all" || activeTab === "market") && filteredMarket.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-campus-navy uppercase tracking-wider mb-2">
                <Package className="w-3.5 h-3.5 text-campus-teal" />
                Marketplace Items
              </div>
              <div className="space-y-1.5">
                {filteredMarket.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/marketplace/${item.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.location_name} • Condition: {item.condition}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-campus-teal shrink-0">
                      PKR {item.price_pkr?.toLocaleString()}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Lost & Found Results */}
          {(activeTab === "all" || activeTab === "lost_found") && filteredLostFound.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-campus-navy uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                Lost & Found Reports
              </div>
              <div className="space-y-1.5">
                {filteredLostFound.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/lost-and-found/${item.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs uppercase ${
                          item.type === "lost"
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : "bg-teal-50 text-teal-700 border border-teal-200"
                        }`}
                      >
                        {item.type}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400">{item.location_name}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      View details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Opportunities */}
          {(activeTab === "all" || activeTab === "opps") && filteredOpps.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-campus-navy uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                Opportunities & Hackathons
              </div>
              <div className="space-y-1.5">
                {filteredOpps.slice(0, 3).map((opp) => (
                  <Link
                    key={opp.id}
                    href="/opportunities"
                    onClick={onClose}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-campus-navy group-hover:text-campus-teal transition">
                        {opp.title}
                      </p>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {opp.organization} • {opp.stipend_or_award}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Educational Resources */}
          {(activeTab === "all" || activeTab === "resources") && filteredRes.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-campus-navy uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                Notes & Exam Solutions
              </div>
              <div className="space-y-1.5">
                {filteredRes.slice(0, 3).map((res) => (
                  <Link
                    key={res.id}
                    href="/resources"
                    onClick={onClose}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
                  >
                    <p className="text-xs font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1">
                      {res.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {res.subject} ({res.course_code}) • {res.downloads_count} downloads
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredMarket.length === 0 &&
            filteredLostFound.length === 0 &&
            filteredOpps.length === 0 &&
            filteredRes.length === 0 &&
            filteredEvents.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm font-semibold text-slate-700">No matching campus records found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching with broader keywords like "casio", "calculus", "internship", or "mouse"
                </p>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-campus-teal" />
            AI-powered semantic matching active
          </span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
