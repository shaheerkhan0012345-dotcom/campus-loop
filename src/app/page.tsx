"use client";

import React from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatPKR } from "@/lib/utils";
import {
  HelpCircle,
  ShoppingBag,
  MessageSquare,
  Briefcase,
  Users2,
  FileText,
  GraduationCap,
  Calendar,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

export default function HomePage() {
  const { currentUniversity, listings, opportunities, resources, tutors, events } = useCampus();

  const marketplaceItems = listings.filter((l) => l.type === "marketplace").slice(0, 4);
  const lostFoundItems = listings.filter((l) => l.type === "lost" || l.type === "found").slice(0, 3);
  const featuredOpps = opportunities.slice(0, 3);
  const featuredResources = resources.slice(0, 3);
  const featuredTutors = tutors.slice(0, 2);
  const featuredEvents = events.slice(0, 2);

  const modules = [
    {
      title: "Lost & Found",
      description: "Report missing items or return found belongings with AI photo similarity matching.",
      href: "/lost-and-found",
      icon: <HelpCircle className="w-6 h-6 text-amber-500" />,
      count: `${listings.filter((l) => l.type === "lost" || l.type === "found").length} items`,
      color: "border-amber-200 hover:border-amber-400 bg-amber-50/20",
    },
    {
      title: "Campus Marketplace",
      description: "Buy and sell electronics, books, lab kits and furniture safely inside campus in PKR.",
      href: "/marketplace",
      icon: <ShoppingBag className="w-6 h-6 text-campus-teal" />,
      count: `${listings.filter((l) => l.type === "marketplace").length} listings`,
      color: "border-teal-200 hover:border-teal-400 bg-teal-50/20",
    },
    {
      title: "Community Hub",
      description: "Campus discussions, course advice, faculty queries, and university life threads.",
      href: "/community",
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      count: "Active threads",
      color: "border-blue-200 hover:border-blue-400 bg-blue-50/20",
    },
    {
      title: "Opportunities Board",
      description: "Verified internships, HEC scholarships, hackathons and tech competitions.",
      href: "/opportunities",
      icon: <Briefcase className="w-6 h-6 text-purple-500" />,
      count: `${opportunities.length} open`,
      color: "border-purple-200 hover:border-purple-400 bg-purple-50/20",
    },
    {
      title: "Find a Teammate",
      description: "Recruit skilled collaborators for hackathons, final year projects (FYP) and startups.",
      href: "/teammates",
      icon: <Users2 className="w-6 h-6 text-emerald-500" />,
      count: "Teams recruiting",
      color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/20",
    },
    {
      title: "Notes & Resources",
      description: "Download verified past papers, handwritten notes, cheat sheets and lab manuals.",
      href: "/resources",
      icon: <FileText className="w-6 h-6 text-rose-500" />,
      count: `${resources.length} documents`,
      color: "border-rose-200 hover:border-rose-400 bg-rose-50/20",
    },
    {
      title: "Peer Tutoring",
      description: "Book 1-on-1 peer assistance for tough engineering mathematics and programming courses.",
      href: "/tutoring",
      icon: <GraduationCap className="w-6 h-6 text-cyan-500" />,
      count: `${tutors.length} tutors online`,
      color: "border-cyan-200 hover:border-cyan-400 bg-cyan-50/20",
    },
    {
      title: "Events & Activities",
      description: "RSVP for tech conferences, sports festivals, society workshops and cultural nights.",
      href: "/events",
      icon: <Calendar className="w-6 h-6 text-indigo-500" />,
      count: `${events.length} upcoming`,
      color: "border-indigo-200 hover:border-indigo-400 bg-indigo-50/20",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-campus-navy via-campus-navy-light to-campus-navy text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle geometric background grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16A085_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Institutional Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200 mb-6 animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-campus-teal animate-ping" />
            <span>Serving {currentUniversity.name}</span>
            <span className="text-white/40">•</span>
            <span className="text-campus-teal-light font-bold">{currentUniversity.city}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Everything on Campus, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300">
              Connected in One Loop.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The unified digital ecosystem built exclusively for university students in Pakistan.
            Recover lost belongings with AI, trade items safely in PKR, form hackathon teams,
            and discover verified career opportunities.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/marketplace"
              className="px-6 py-3 rounded-xl bg-campus-teal text-white font-bold text-sm hover:bg-campus-teal-dark transition shadow-lg shadow-campus-teal/20 flex items-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/lost-and-found"
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Report Lost / Found</span>
            </Link>

            <Link
              href="/opportunities"
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>Internships & Hackathons</span>
            </Link>
          </div>

          {/* Live Campus Metric Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">4,800+</p>
              <p className="text-xs text-slate-300 mt-1">Verified Students</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-campus-teal-light">94.2%</p>
              <p className="text-xs text-slate-300 mt-1">Lost Items Recovered</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">PKR 1.2M+</p>
              <p className="text-xs text-slate-300 mt-1">Student Marketplace Volume</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-campus-teal-light">100%</p>
              <p className="text-xs text-slate-300 mt-1">Institutional Moderation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Modules Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-campus-teal text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Centralized Campus Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-campus-navy">
              Explore Campus Hubs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Everything your student journey needs, organized into dedicated, high-security modules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((mod) => (
            <Link
              key={mod.title}
              href={mod.href}
              className={`p-5 rounded-2xl border bg-white shadow-card hover:shadow-cardHover transition group flex flex-col justify-between ${mod.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                    {mod.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {mod.count}
                  </span>
                </div>
                <h3 className="text-base font-bold text-campus-navy group-hover:text-campus-teal transition mb-1">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {mod.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-campus-navy group-hover:text-campus-teal transition pt-2 border-t border-slate-100">
                <span>Enter Hub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured 1: Lost & Found Alert Banner with AI Match Highlight */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-xl font-extrabold text-campus-navy">
                  Recent Lost & Found Reports
                </h3>
                <Badge variant="amber" size="sm">
                  AI Matching Active
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Visual embeddings automatically compare missing items against turned-in belongings.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/lost-and-found/new"
                className="px-3 py-1.5 rounded-lg bg-campus-navy text-white text-xs font-bold hover:bg-campus-navy-light transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Report Item
              </Link>
              <Link
                href="/lost-and-found"
                className="text-xs font-bold text-campus-teal hover:underline flex items-center gap-1"
              >
                View all ({listings.filter((l) => l.type !== "marketplace").length}) →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lostFoundItems.map((item) => (
              <Link
                key={item.id}
                href={`/lost-and-found/${item.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card hover:shadow-cardHover transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant={item.type === "lost" ? "rose" : "teal"}
                        size="sm"
                      >
                        {item.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {item.location_name}
                  </span>
                  <span className="font-semibold text-campus-teal">Check Match</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured 2: Campus Marketplace (PKR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-campus-teal" />
              <h3 className="text-xl font-extrabold text-campus-navy">
                Trending on Campus Marketplace
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Buy directly from fellow students. Safe in-person exchanges within campus premises.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="text-xs font-bold text-campus-teal hover:underline flex items-center gap-1"
          >
            Browse all items →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {marketplaceItems.map((item) => (
            <Link
              key={item.id}
              href={`/marketplace/${item.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-cardHover transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-900/70 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {item.condition?.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">{item.category}</p>
                  <h4 className="text-sm font-bold text-campus-navy group-hover:text-campus-teal transition line-clamp-1 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-base font-extrabold text-campus-navy">
                    {item.price_pkr ? formatPKR(item.price_pkr) : "Contact Seller"}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[120px]">{item.author_name}</span>
                  <span className="text-campus-teal font-semibold">View Item →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured 3: Opportunities & Peer Tutoring Dual Spotlight */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Opportunities Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-campus-teal-light" />
                <h3 className="text-lg font-bold text-white">Upcoming Deadlines</h3>
              </div>
              <Link href="/opportunities" className="text-xs text-campus-teal-light font-bold hover:underline">
                All Opportunities →
              </Link>
            </div>

            <div className="space-y-3">
              {featuredOpps.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-campus-teal/50 transition flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-campus-teal-light">
                        {opp.type} • {opp.organization}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{opp.title}</h4>
                    </div>
                    {opp.stipend_or_award && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                        {opp.stipend_or_award.split("+")[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Deadline: {new Date(opp.deadline).toLocaleDateString()}
                    </span>
                    <Link
                      href="/opportunities"
                      className="text-campus-teal-light font-semibold hover:underline"
                    >
                      Apply Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peer Tutors & Events Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-campus-teal-light" />
                <h3 className="text-lg font-bold text-white">Verified Peer Tutors</h3>
              </div>
              <Link href="/tutoring" className="text-xs text-campus-teal-light font-bold hover:underline">
                Find Tutors →
              </Link>
            </div>

            <div className="space-y-3">
              {featuredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-campus-teal/50 transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tutor.tutor_avatar}
                      alt={tutor.tutor_name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-campus-teal"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{tutor.tutor_name}</h4>
                      <p className="text-xs text-slate-400">{tutor.degree_program}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.subjects.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-campus-teal-light">
                      {tutor.hourly_rate_pkr === 0 ? "Volunteer (Free)" : `PKR ${tutor.hourly_rate_pkr}/hr`}
                    </p>
                    <Link
                      href="/tutoring"
                      className="inline-block mt-2 px-3 py-1 bg-campus-teal text-white text-xs font-bold rounded-lg hover:bg-campus-teal-dark transition"
                    >
                      Book Session
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Institutional Trust Assurance */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-campus-teal text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-5 h-5 text-campus-teal" />
              University Identity & Safety Standard
            </div>
            <h3 className="text-2xl font-extrabold text-campus-navy mb-2">
              Safe. Verified. Exclusively for University Students.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike public classified websites, every CampusLoop interaction requires institutional
              verification. Item handovers take place within campus libraries and common rooms,
              claim ownership is cryptographically protected, and all activities adhere to the
              University Student Code of Conduct.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/about"
              className="px-5 py-2.5 rounded-xl bg-campus-navy text-white text-xs font-bold hover:bg-campus-navy-light transition text-center"
            >
              Learn More
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-campus-navy text-xs font-bold hover:bg-slate-50 transition text-center"
            >
              Register with University Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
