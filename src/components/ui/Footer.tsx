import React from "react";
import Link from "next/link";
import { CampusLogo } from "./CampusLogo";
import { ShieldCheck, Heart, MapPin, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-campus-navy-dark text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <CampusLogo size="md" light showTagline />
            <p className="mt-4 text-xs text-slate-400 leading-relaxed max-w-sm">
              CampusLoop is an all-in-one university community platform connecting students across
              campuses in Pakistan. Centralizing lost & found recovery, peer marketplace, project
              teammates, educational notes, tutoring, and verified opportunities.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-campus-teal" />
              <span>Multi-Campus Architecture • Pakistan Higher Education</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-campus-teal" />
              <span>Enterprise Row-Level Security & Institutional Role-Based Access</span>
            </div>
          </div>

          {/* Quick Links 1: Platform Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Campus Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/lost-and-found" className="hover:text-campus-teal transition">
                  Lost & Found System
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-campus-teal transition">
                  Campus Marketplace (PKR)
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-campus-teal transition">
                  Community Discussions
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-campus-teal transition">
                  Internships & Grants
                </Link>
              </li>
              <li>
                <Link href="/teammates" className="hover:text-campus-teal transition">
                  Find a Teammate
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Academic & Student */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Academics & Life
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resources" className="hover:text-campus-teal transition">
                  Notes & Study Material
                </Link>
              </li>
              <li>
                <Link href="/tutoring" className="hover:text-campus-teal transition">
                  Peer Tutoring Network
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-campus-teal transition">
                  University Events & Seminars
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-campus-teal transition">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/my-listings" className="hover:text-campus-teal transition">
                  My Active Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 3: Trust, Safety & Institutional */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Trust & Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-campus-teal transition">
                  About CampusLoop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-campus-teal transition">
                  Help & Campus Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-campus-teal transition">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-campus-teal transition">
                  Privacy Policy & Data Rights
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-campus-teal hover:underline font-bold transition">
                  Admin Command Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusLoop Platform. Built for University Communities.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Pakistani universities
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-campus-teal" /> Multi-Tenant Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
