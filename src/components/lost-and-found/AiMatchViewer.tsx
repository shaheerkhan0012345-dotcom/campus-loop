"use client";

import React from "react";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { CampusLoopAI } from "@/lib/ai/gemini";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface AiMatchViewerProps {
  currentListing: Listing;
  candidateListings: Listing[];
}

export const AiMatchViewer: React.FC<AiMatchViewerProps> = ({
  currentListing,
  candidateListings,
}) => {
  // Candidate listings must be opposite type: if current is lost, look for found, and vice-versa
  const counterType = currentListing.type === "lost" ? "found" : "lost";
  const candidates = candidateListings.filter((l) => l.type === counterType && l.id !== currentListing.id);

  if (candidates.length === 0) return null;

  // Calculate similarity match with each candidate
  const matches = candidates
    .map((candidate) => {
      const matchData = CampusLoopAI.calculateLostFoundMatch(
        {
          title: currentListing.title,
          description: currentListing.description,
          category: currentListing.category,
          labels: currentListing.visual_labels,
        },
        {
          title: candidate.title,
          description: candidate.description,
          category: candidate.category,
          labels: candidate.visual_labels,
        }
      );
      return {
        candidate,
        ...matchData,
      };
    })
    .filter((m) => m.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);

  if (matches.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 border-2 border-campus-teal/30 rounded-2xl p-5 shadow-card mb-8 animate-in fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-campus-teal text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-campus-navy">
              CampusLoop AI: Potential Match Detected!
            </h4>
            <p className="text-xs text-slate-500">
              Neural similarity algorithm discovered a candidate {counterType} item report with high
              overlap.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-campus-teal bg-teal-100/70 px-2.5 py-1 rounded-full border border-teal-200">
          {matches[0].matchScore}% Match
        </span>
      </div>

      <div className="space-y-3">
        {matches.slice(0, 2).map(({ candidate, matchScore, confidence, reasons, suggestedAction }) => (
          <div
            key={candidate.id}
            className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={candidate.images[0]}
                alt={candidate.title}
                className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      candidate.type === "found"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {candidate.type} Report
                  </span>
                  <span className="text-xs font-bold text-campus-navy line-clamp-1">
                    {candidate.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{candidate.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-1 text-[10px] text-slate-400">
                  {reasons.slice(0, 2).map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-teal-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0">
              <span className="text-[11px] text-slate-500 font-medium">
                Location: {candidate.location_name}
              </span>
              <Link
                href={`/lost-and-found/${candidate.id}`}
                className="px-3 py-1.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
              >
                <span>Compare & Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
