"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { CampusLoopAI } from "@/lib/ai/gemini";
import { formatDate } from "@/lib/utils";
import {
  Briefcase,
  ExternalLink,
  Bookmark,
  Sparkles,
  Calendar,
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function OpportunitiesPage() {
  const { opportunities, toggleSaveOpportunity, currentUser, currentUniversity } = useCampus();

  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const types = [
    { id: "all", label: "All Opportunities" },
    { id: "internship", label: "Internships" },
    { id: "hackathon", label: "Hackathons" },
    { id: "scholarship", label: "Scholarships" },
    { id: "competition", label: "Competitions" },
    { id: "workshop", label: "Workshops" },
  ];

  // AI Matching against current user's skills
  const matchedOpps = CampusLoopAI.matchOpportunities(currentUser.skills, opportunities);

  const filteredOpps = opportunities
    .filter((opp) => (activeType === "all" ? true : opp.type === activeType))
    .filter((opp) =>
      searchQuery.trim() === ""
        ? true
        : opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.eligibility.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getDaysRemaining = (deadline: string) => {
    const d = new Date(deadline);
    const now = new Date();
    const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-purple-400/20 text-purple-300">
              <Briefcase className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Career & Academic Growth
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Opportunities & Hackathons
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Discover verified corporate software internships, government HEC scholarships, and
            national hackathons. AI matches your student skillset with requirements.
          </p>
        </div>

        {/* AI Match Overview Box */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs text-slate-200 shrink-0">
          <div className="flex items-center gap-2 text-campus-teal-light font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Skill Profile Matching</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Personalized for: <span className="font-bold text-white">{currentUser.full_name}</span>
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {currentUser.skills.slice(0, 3).map((s) => (
              <span key={s} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto bg-slate-100 p-1 rounded-xl">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  activeType === t.id
                    ? "bg-white text-campus-navy shadow-xs"
                    : "text-slate-600 hover:text-campus-navy"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Systems Ltd, HEC, Ignite, AI..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>
        </div>
      </div>

      {/* Opportunities Card Stream */}
      <div className="space-y-6">
        {filteredOpps.map((opp) => {
          const matchedItem = matchedOpps.find((m) => m.title === opp.title);
          const matchPct = matchedItem?.matchPercentage || 75;
          const daysLeft = getDaysRemaining(opp.deadline);

          return (
            <div
              key={opp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-card hover:shadow-cardHover transition flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-campus-navy px-2.5 py-1 rounded-lg">
                      {opp.type}
                    </span>
                    <span className="text-xs font-bold text-slate-400">•</span>
                    <span className="text-xs font-bold text-campus-teal">{opp.organization}</span>
                    {opp.is_verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> University Verified
                      </span>
                    )}
                  </div>

                  {/* AI Match Badge */}
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-campus-teal">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{matchPct}% Skill Fit</span>
                    </div>

                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        opp.is_saved
                          ? "bg-purple-50 border-purple-200 text-purple-600"
                          : "border-slate-200 text-slate-400 hover:text-slate-600"
                      }`}
                      aria-label="Save opportunity"
                    >
                      <Bookmark className={`w-4 h-4 ${opp.is_saved ? "fill-purple-600" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-campus-navy mb-2">{opp.title}</h3>

                {/* Stipend / Award Callout */}
                {opp.stipend_or_award && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-4">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Compensation / Award: {opp.stipend_or_award}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {opp.description}
                </p>

                {/* AI Eligibility Summary Card */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-campus-navy">
                    <ShieldCheck className="w-3.5 h-3.5 text-campus-teal" />
                    Eligibility Requirements
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{opp.eligibility}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Row */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {opp.location}
                  </span>
                  <span
                    className={`flex items-center gap-1 font-bold ${
                      daysLeft <= 7 ? "text-rose-600" : "text-amber-600"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {daysLeft > 0 ? `Closes in ${daysLeft} days` : "Deadline Passed"} (
                    {formatDate(opp.deadline)})
                  </span>
                </div>

                <a
                  href={opp.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Apply via Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
