import React from "react";
import Link from "next/link";
import { CampusLogo } from "@/components/ui/CampusLogo";
import { ShieldCheck, Sparkles, Building, Users2, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
      <div className="text-center">
        <CampusLogo size="lg" showTagline className="justify-center mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-campus-navy">
          About CampusLoop
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          The centralized digital ecosystem connecting students across university campuses in Pakistan.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-campus-navy">Our Mission</h2>
        <p>
          University campuses are bustling hubs of knowledge, innovation, and commerce—yet until now,
          student activities have been fragmented across disorganized social media groups, temporary
          chat rooms, and physical notice boards.
        </p>
        <p>
          <strong>CampusLoop</strong> brings every campus touchpoint into one unified, secure platform:
          helping students find lost belongings using state-of-the-art visual AI matching, buy and sell
          academic materials safely in PKR, form cross-disciplinary hackathon teams, and access verified
          educational resources.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-campus-teal mb-2" />
            <h3 className="font-bold text-campus-navy">Verified Identity</h3>
            <p className="text-xs text-slate-500 mt-1">
              All accounts are verified with institutional email addresses or administrator checks.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl">
            <Sparkles className="w-6 h-6 text-campus-teal mb-2" />
            <h3 className="font-bold text-campus-navy">Integrated AI</h3>
            <p className="text-xs text-slate-500 mt-1">
              Computer vision embeddings and semantic searches automate discovery and lost item matching.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl">
            <Building className="w-6 h-6 text-campus-teal mb-2" />
            <h3 className="font-bold text-campus-navy">Multi-Tenant</h3>
            <p className="text-xs text-slate-500 mt-1">
              Built to scale across universities nationwide with distinct institutional boundaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
