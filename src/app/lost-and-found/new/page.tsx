"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { ListingType } from "@/lib/types";
import {
  HelpCircle,
  Upload,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  X,
  CheckCircle,
} from "lucide-react";

function NewLostFoundContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as ListingType) || "lost";

  const { addListing, currentUniversity, currentUser } = useCampus();

  const [type, setType] = useState<"lost" | "found">(
    initialType === "found" ? "found" : "lost"
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [locationName, setLocationName] = useState("");
  const [dateOccurred, setDateOccurred] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600",
  ]);

  // Found item privacy and challenge
  const [isAnonymousFound, setIsAnonymousFound] = useState(type === "found");
  const [verificationQuestion, setVerificationQuestion] = useState("");
  const [verificationAnswer, setVerificationAnswer] = useState("");

  const categories = [
    "Electronics",
    "Accessories",
    "Books & Stationery",
    "Keys & Cards",
    "Clothing",
    "Bags & Backpacks",
    "Sports Gear",
    "Other",
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
    if (!title.trim() || !description.trim() || !locationName.trim()) return;

    // Extract automated visual labels for AI similarity
    const inferredLabels = [
      category.toLowerCase(),
      ...title.toLowerCase().split(/\s+/).filter((w) => w.length > 3),
    ];

    const newListing = addListing({
      university_id: currentUniversity.id,
      user_id: currentUser.id,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
      type,
      title,
      description,
      category,
      status: "active",
      location_name: locationName,
      date_occurred: new Date(dateOccurred).toISOString(),
      is_anonymous_found: type === "found" ? isAnonymousFound : false,
      verification_question: type === "found" ? verificationQuestion : undefined,
      verification_answer_hash: type === "found" ? verificationAnswer : undefined,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600"],
      visual_labels: inferredLabels,
      tags: inferredLabels,
    });

    router.push(`/lost-and-found/${newListing.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-6">
        <Link
          href="/lost-and-found"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-campus-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lost & Found
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-100 text-amber-700">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {currentUniversity.short_name} Recovery Desk
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-campus-navy">
            Publish Lost & Found Report
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Fill in the details below. Our AI matching model will scan new and existing campus reports
            to find candidate matches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-2">
              Report Classification *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setType("lost");
                  setIsAnonymousFound(false);
                }}
                className={`py-3 px-4 rounded-xl border-2 font-bold text-xs transition flex flex-col items-center justify-center gap-1 ${
                  type === "lost"
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>LOST ITEM</span>
                <span className="text-[10px] font-normal opacity-80">I lost my personal item</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType("found");
                  setIsAnonymousFound(true);
                }}
                className={`py-3 px-4 rounded-xl border-2 font-bold text-xs transition flex flex-col items-center justify-center gap-1 ${
                  type === "found"
                    ? "border-campus-teal bg-teal-50 text-teal-800"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>FOUND ITEM</span>
                <span className="text-[10px] font-normal opacity-80">I found someone's belonging</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Item Title & Brand *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Casio Scientific Calculator fx-991EX, Blue NUST Lanyard with Keys"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Category & Location */}
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
                Campus Location *
              </label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. SEECS LH-3, Central Library 2nd Floor, Concordia 1"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
              />
            </div>
          </div>

          {/* Date Occurred */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Date Lost / Found *
            </label>
            <input
              type="date"
              required
              value={dateOccurred}
              onChange={(e) => setDateOccurred(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Item Description & Physical Clues *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide color, brand, condition, any visible stickers, scratches, or details..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>

          {/* Photo URLs / Uploads */}
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Photographs (AI Similarity Vision)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL (Unsplash or hosted photo)..."
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

          {/* Extra Verification Settings for Found Items */}
          {type === "found" && (
            <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-campus-navy">
                <ShieldCheck className="w-4 h-4 text-campus-teal" />
                Ownership Verification Protection (Anti-Fraud)
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secret Verification Question for True Owner
                </label>
                <input
                  type="text"
                  value={verificationQuestion}
                  onChange={(e) => setVerificationQuestion(e.target.value)}
                  placeholder="e.g. What picture/quote is on the keychain? What is the phone wallpaper?"
                  className="w-full px-3 py-2 text-xs bg-white border border-teal-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expected Answer (Kept Hidden from Public)
                </label>
                <input
                  type="text"
                  value={verificationAnswer}
                  onChange={(e) => setVerificationAnswer(e.target.value)}
                  placeholder="e.g. Red cartoon cat sticker, green lanyard, etc."
                  className="w-full px-3 py-2 text-xs bg-white border border-teal-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnonymousFound}
                  onChange={(e) => setIsAnonymousFound(e.target.checked)}
                  className="w-4 h-4 text-campus-teal rounded focus:ring-campus-teal"
                />
                <label htmlFor="anonCheck" className="text-xs text-slate-700 cursor-pointer">
                  Hide my name on the public post (only reveal after claim verification)
                </label>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/lost-and-found"
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-campus-teal" />
              Publish & Run AI Matching
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewLostFoundPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-16 text-center text-xs text-slate-400">
          Loading report form...
        </div>
      }
    >
      <NewLostFoundContent />
    </Suspense>
  );
}
