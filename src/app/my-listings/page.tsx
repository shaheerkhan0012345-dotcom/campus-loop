"use client";

import React from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { formatPKR, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  BookmarkCheck,
  ShoppingBag,
  HelpCircle,
  PlusCircle,
  ArrowRight,
  Trash2,
} from "lucide-react";

export default function MyListingsPage() {
  const { listings, currentUser, deleteListing, updateListing } = useCampus();

  const myListings = listings.filter((l) => l.user_id === currentUser.id);
  const marketplaceListings = myListings.filter((l) => l.type === "marketplace");
  const lostFoundListings = myListings.filter((l) => l.type !== "marketplace");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-8">
          <div>
            <h1 className="text-xl font-extrabold text-campus-navy flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-campus-teal" />
              My Active Listings & Reports
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your published marketplace items, lost reports, and found belongings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/marketplace/new"
              className="px-4 py-2 bg-campus-teal hover:bg-campus-teal-dark text-white text-xs font-bold rounded-xl transition"
            >
              + Sell Item
            </Link>
            <Link
              href="/lost-and-found/new"
              className="px-4 py-2 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition"
            >
              + Report Lost/Found
            </Link>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="mb-10">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-campus-teal" />
            Marketplace Products ({marketplaceListings.length})
          </h2>

          {marketplaceListings.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
              No products listed currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketplaceListings.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <Link href={`/marketplace/${item.id}`}>
                        <h3 className="text-xs font-bold text-campus-navy hover:text-campus-teal transition line-clamp-1">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs font-black text-campus-teal mt-0.5">
                        {formatPKR(item.price_pkr || 0)}
                      </p>
                      <span className="text-[10px] text-slate-400">Status: {item.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/marketplace/${item.id}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-campus-navy text-xs font-bold rounded-lg transition"
                    >
                      Edit / View
                    </Link>
                    <button
                      onClick={() => deleteListing(item.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lost & Found Section */}
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            Lost & Found Reports ({lostFoundListings.length})
          </h2>

          {lostFoundListings.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
              No lost or found reports on your account.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lostFoundListings.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <Badge variant={item.type === "lost" ? "rose" : "teal"} size="sm">
                        {item.type.toUpperCase()}
                      </Badge>
                      <Link href={`/lost-and-found/${item.id}`}>
                        <h3 className="text-xs font-bold text-campus-navy hover:text-campus-teal transition line-clamp-1 mt-1">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-[11px] text-slate-400">{item.location_name}</p>
                    </div>
                  </div>

                  <Link
                    href={`/lost-and-found/${item.id}`}
                    className="px-3.5 py-1.5 bg-campus-navy text-white text-xs font-bold rounded-lg transition"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
