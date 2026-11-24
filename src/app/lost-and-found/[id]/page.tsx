"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { ClaimModal } from "@/components/lost-and-found/ClaimModal";
import { AiMatchViewer } from "@/components/lost-and-found/AiMatchViewer";
import { ReportContentModal } from "@/components/ui/ReportContentModal";
import {
  HelpCircle,
  MapPin,
  Calendar,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  User,
  Share2,
  Eye,
  Check,
  X,
} from "lucide-react";

export default function LostFoundDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    listings,
    claims,
    currentUser,
    startConversation,
    updateListing,
    reviewClaim,
  } = useCampus();

  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const itemId = params.id as string;
  const item = listings.find((l) => l.id === itemId);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-campus-navy">Listing Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          The requested lost or found report may have been resolved or removed.
        </p>
        <Link
          href="/lost-and-found"
          className="px-4 py-2 bg-campus-navy text-white text-xs font-bold rounded-lg"
        >
          Back to Lost & Found
        </Link>
      </div>
    );
  }

  const isOwner = currentUser.id === item.user_id;
  const itemClaims = claims.filter((c) => c.listing_id === item.id);
  const userClaim = claims.find(
    (c) => c.listing_id === item.id && c.claimant_id === currentUser.id
  );

  const handleStartChat = () => {
    const convId = startConversation(
      item.user_id,
      item.id,
      `Hello! I am reaching out regarding your ${item.type} listing "${item.title}".`
    );
    router.push(`/messages?conv=${convId}`);
  };

  const handleMarkResolved = () => {
    updateListing(item.id, { status: "resolved" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/lost-and-found"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-campus-navy transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all Lost & Found listings
        </Link>
      </div>

      {/* AI Counterpart Match Notification */}
      <AiMatchViewer currentListing={item} candidateListings={listings} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Photo Showcase */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
            <div className="relative aspect-video bg-slate-100">
              <img
                src={item.images[activeImageIndex] || item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant={item.type === "lost" ? "rose" : "teal"} size="md">
                  {item.type.toUpperCase()} REPORT
                </Badge>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${
                    item.status === "resolved"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-900/80 text-white"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Thumbnail selector (if multiple images) */}
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
              <h1 className="text-2xl font-extrabold text-campus-navy mb-2">{item.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-campus-teal" />
                  <span className="font-medium text-slate-700">{item.location_name}</span>
                </div>
                {item.date_occurred && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Occurred: {formatDate(item.date_occurred)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{item.views_count} campus views</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Detailed Item Description
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-6">
                  {item.description}
                </p>
              </div>

              {/* Computer Vision Tags */}
              {item.visual_labels && item.visual_labels.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Visual Feature Tags (AI Analyzed)
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.visual_labels.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* If Owner: Claim Management Panel */}
          {isOwner && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-campus-navy">
                    Claims & Verification Reviews ({itemClaims.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review incoming ownership claims and approve the legitimate claimant.
                  </p>
                </div>
                {item.status !== "resolved" && (
                  <button
                    onClick={handleMarkResolved}
                    className="px-3.5 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Resolved & Returned
                  </button>
                )}
              </div>

              {itemClaims.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No claims submitted yet for this report.
                </div>
              ) : (
                <div className="space-y-3">
                  {itemClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-campus-navy">
                            {claim.claimant_name}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              claim.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : claim.status === "rejected"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {claim.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <span className="font-semibold">Claim statement:</span> "{claim.claim_notes}"
                        </p>
                        {claim.verification_response && (
                          <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                            <span className="font-semibold">Secret Answer Provided:</span> "
                            {claim.verification_response}"
                          </p>
                        )}
                      </div>

                      {claim.status === "pending" && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => reviewClaim(claim.id, "approved", "Verified by finder")}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => reviewClaim(claim.id, "rejected", "Did not match details")}
                            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-lg transition flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Poster Info, Actions, Safety Notice */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-campus-navy uppercase tracking-wider">
              Item Actions
            </h3>

            {item.status === "resolved" ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                <h4 className="text-sm font-bold text-emerald-900">Item Returned / Resolved</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  This belonging has been successfully recovered by its verified owner.
                </p>
              </div>
            ) : !isOwner ? (
              <div className="space-y-3">
                {/* If user already submitted claim */}
                {userClaim ? (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                    <p className="text-xs font-bold text-amber-900">
                      Your Claim is {userClaim.status.toUpperCase()}
                    </p>
                    <p className="text-[11px] text-amber-700 mt-1">
                      Submitted on {formatDate(userClaim.created_at)}. The finder will evaluate your
                      verification response.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setClaimModalOpen(true)}
                    className="w-full py-3 bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Verify Ownership & Claim
                  </button>
                )}

                <button
                  onClick={handleStartChat}
                  className="w-full py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Poster Privately
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                You created this {item.type} report. Check the incoming claims panel on the left.
              </div>
            )}

            {/* Poster Info */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Reporter Identity
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-campus-navy font-bold ring-2 ring-campus-teal">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-campus-navy">
                    {item.is_anonymous_found ? "Verified Student (Anonymous)" : item.author_name}
                  </p>
                  <p className="text-[11px] text-slate-500">Institutional ID Verified</p>
                </div>
              </div>
            </div>

            {/* Report Suspicious Listing */}
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

          {/* University Safety & Handover Guidelines */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2.5">
            <h4 className="font-bold text-campus-navy flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-campus-teal" />
              Safe Campus Handover Rules:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Meet only in high-visibility campus locations (Library foyer, Student Center).</li>
              <li>Inspect physical condition and serial numbers before confirming transfer.</li>
              <li>Never exchange private residential addresses or off-campus locations.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Claim Submission Modal */}
      <ClaimModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        listing={item}
      />

      {/* Report Listing Modal */}
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
