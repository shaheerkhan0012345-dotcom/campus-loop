import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6 text-xs text-slate-700 leading-relaxed">
        <h1 className="text-2xl font-extrabold text-campus-navy">Privacy Policy & Student Data Rights</h1>
        <p className="text-slate-400">Effective Date: Academic Session 2026-2027</p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">1. Information We Collect</h2>
        <p>
          We collect basic directory details (full name, student email, department, degree program, and
          semester) solely for institutional authentication and fraud prevention.
        </p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">2. Phone & Email Privacy</h2>
        <p>
          Your personal phone number and private contact email are never exposed publicly on listings or
          forum posts. All buyer-seller and claimant interactions take place through secure in-app messaging.
        </p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">3. Row Level Security & Encryption</h2>
        <p>
          Our PostgreSQL database architecture utilizes Supabase Row Level Security (RLS) policies. Only
          authorized participants can read private direct messages and claim verification answers.
        </p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">4. Data Deletion Rights</h2>
        <p>
          Students may delete their marketplace listings, discussion threads, and profile data at any time
          via their student dashboard.
        </p>
      </div>
    </div>
  );
}
