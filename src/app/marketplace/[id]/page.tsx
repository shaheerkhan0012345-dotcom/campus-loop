"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatPKR, formatDate } from "@/lib/utils";
import { ReportContentModal } from "@/components/ui/ReportContentModal";
import {
  ShoppingBag,
  MapPin,
  Calendar,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  Heart,
  CheckCircle2,
  AlertTriangle,
  User,
  Share2,
  Eye,
  Trash2,
  Check,
} from "lucide-react";

export default function MarketplaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    listings,
    savedListingIds,
    toggleSaveListing,
    currentUser,
    startConversation,
    updateListing,
    deleteListing,
  } = useCampus();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const itemId = params.id as string;
  const item = listings.find((l) => l.id === itemId);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-campus-navy">Listing Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          This product may have been purchased or removed by the seller.
        </p>
        <Link
          href="/marketplace"
          className="px-4 py-2 bg-campus-navy text-white text-xs font-bold rounded-lg"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const isOwner = currentUser.id === item.user_id;
  const isSaved = savedListingIds.includes(item.id);

  const handleStartChat = () => {
    const convId = startConversation(
      item.user_id,
      item.id,
      `Hello! I'm interested in buying your item "${item.title}" for ${formatPKR(item.price_pkr || 0)}.`
    );
    router.push(`/messages?conv=${convId}`);
  };

  const handleMarkStatus = (status: "active" | "reserved" | "sold") => {
    updateListing(item.id, { status });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to remove this listing?")) {
      deleteListing(item.id);
      router.push("/marketplace");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-campus-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campus Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Showcase & Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
            {/* Main Picture */}
            <div className="relative aspect-4/3 bg-slate-100">
              <img
                src={item.images[activeImageIndex] || item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-900/80 text-white px-3 py-1 rounded-full backdrop-blur-md">
                  Condition: {item.condition?.replace("_", " ")}
                </span>
                {item.status !== "active" && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-amber-500 text-white px-3 py-1 rounded-full">
                    {item.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {item.images.length > 1 && (
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? "border-campus-teal" : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl font-extrabold text-campus-navy">{item.title}</h1>
                <p className="text-2xl font-black text-campus-navy shrink-0">
                  {item.price_pkr ? formatPKR(item.price_pkr) : "Negotiable"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <span className="font-semibold text-campus-teal bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-700">{item.location_name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Listed: {formatDate(item.created_at)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Product Details & Description
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-6">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Seller Profile, Buyer Actions, Safety Notice */}
        <div className="space-y-6">
          {/* Action Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-campus-navy uppercase tracking-wider">
              Purchase & Contact
            </h3>

            {isOwner ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
                  You are the seller of this listing.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">
                    Update Listing Status:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      onClick={() => handleMarkStatus("active")}
                      className={`py-2 rounded-lg border transition ${
                        item.status === "active"
                          ? "bg-campus-navy text-white border-campus-navy"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleMarkStatus("reserved")}
                      className={`py-2 rounded-lg border transition ${
                        item.status === "reserved"
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Reserved
                    </button>
                    <button
                      onClick={() => handleMarkStatus("sold")}
                      className={`py-2 rounded-lg border transition ${
                        item.status === "sold"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Sold
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleDelete}
                  className="w-full py-2.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Listing
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleStartChat}
                  className="w-full py-3 bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat with Seller
                </button>

                <button
                  onClick={() => toggleSaveListing(item.id)}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl border transition flex items-center justify-center gap-2 ${
                    isSaved
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                  {isSaved ? "Saved to Favourites" : "Save to Favourites"}
                </button>
              </div>
            )}

            {/* Seller Info */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Seller Information
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={
                    item.author_avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  }
                  alt={item.author_name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-campus-teal"
                />
                <div>
                  <p className="text-xs font-bold text-campus-navy">{item.author_name}</p>
                  <p className="text-[11px] text-slate-500">Verified CampusLoop Student</p>
                  <span className="text-[10px] text-emerald-600 font-bold inline-flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Institutional Email Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Report Suspicious Item */}
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-rose-600 hover:underline flex items-center gap-1 font-semibold text-[11px]"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Report Suspicious Listing
              </button>
            </div>
          </div>

          {/* Safe In-Person Transaction Guidelines */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2.5">
            <h4 className="font-bold text-campus-navy flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-campus-teal" />
              Safe Campus Trading Rules:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Meet during daylight hours at campus cafes or library commons.</li>
              <li>Inspect electronic gadgets, test power cords and verify hardware specs.</li>
              <li>Pay via cash or bank instant transfer (Raast / Nayapay / Sadapay) upon handover.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportContentModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        contentType="listing"
        contentId={item.id}
        contentPreview={item.title}
        reportedUserId={item.user_id}
      />
    </div>
  );
}
