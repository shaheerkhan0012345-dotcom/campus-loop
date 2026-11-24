"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CampusLogo } from "@/components/ui/CampusLogo";
import { useCampus } from "@/lib/store/campusStore";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { currentUniversity, switchUser, allUsers } = useCampus();

  const [email, setEmail] = useState("hamza.tariq@seecs.nust.edu.pk");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Find matching user or default to first
      const matched = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || allUsers[0];
      switchUser(matched.id);
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6">
        <div className="text-center">
          <CampusLogo size="md" showTagline className="justify-center mb-4" />
          <h2 className="text-xl font-extrabold text-campus-navy">Student & Staff Portal</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your university community account for {currentUniversity.short_name}.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              University Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`student@${currentUniversity.domain}`}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-campus-navy">Password</label>
              <Link href="#" className="text-[11px] font-semibold text-campus-teal hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Signing In..." : "Sign In to CampusLoop"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Persona Switcher for Evaluation */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
            Instant Demo Logins:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => {
                switchUser(allUsers[0].id);
                router.push("/dashboard");
              }}
              className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-left hover:bg-slate-100 transition"
            >
              <span className="font-bold text-campus-navy block">Hamza Tariq</span>
              <span className="text-[10px] text-slate-500">Student (SEECS)</span>
            </button>
            <button
              onClick={() => {
                switchUser(allUsers[3].id);
                router.push("/admin");
              }}
              className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-left hover:bg-slate-100 transition"
            >
              <span className="font-bold text-rose-700 block">Directorate</span>
              <span className="text-[10px] text-slate-500">Administrator</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          New student?{" "}
          <Link href="/register" className="font-bold text-campus-teal hover:underline">
            Register your institutional account
          </Link>
        </p>
      </div>
    </div>
  );
}
