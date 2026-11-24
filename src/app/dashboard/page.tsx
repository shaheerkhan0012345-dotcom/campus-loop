"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatPKR, formatDate } from "@/lib/utils";
import {
  ShoppingBag,
  HelpCircle,
  Briefcase,
  Users2,
  Calendar,
  Heart,
  Plus,
  ArrowRight,
  Sparkles,
  Ticket,
  Clock,
  CheckCircle2,
  Trash2,
  FileText,
} from "lucide-react";

export default function StudentDashboardPage() {
  const {
    currentUser,
    currentUniversity,
    listings,
    savedListingIds,
    claims,
    opportunities,
    projects,
    projectApplications,
    events,
    deleteListing,
    updateListing,
  } = useCampus();

  const [activeTab, setActiveTab] = useState<
    "overview" | "marketplace" | "lost_found" | "saved" | "applications" | "events"
  >("overview");

  // User's specific items
  const myListings = listings.filter((l) => l.user_id === currentUser.id);
  const myMarketplace = myListings.filter((l) => l.type === "marketplace");
  const myLostFound = myListings.filter((l) => l.type === "lost" || l.type === "found");
  const mySavedListings = listings.filter((l) => savedListingIds.includes(l.id));
  const mySavedOpps = opportunities.filter((o) => o.is_saved);
  const myProjects = projects.filter((p) => p.creator_id === currentUser.id);
  const myApplications = projectApplications.filter((a) => a.applicant_id === currentUser.id);
  const myRegisteredEvents = events.filter((e) => e.is_registered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Student Profile Header Card */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={
              currentUser.avatar_url ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            }
            alt={currentUser.full_name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-campus-teal/40"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Welcome back, {currentUser.full_name}!
              </h1>
              {currentUser.is_verified && (
                <span className="p-0.5 rounded-full bg-emerald-400 text-campus-navy" title="Verified Student">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentUser.degree_program} • Semester {currentUser.semester} • {currentUser.department}
            </p>
            <p className="text-xs text-campus-teal-light font-bold mt-1">
              {currentUniversity.name} ({currentUniversity.city})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/marketplace/new"
            className="px-4 py-2 bg-campus-teal hover:bg-campus-teal-dark text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List an Item</span>
          </Link>
          <Link
            href="/profile"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">My Sales</span>
            <ShoppingBag className="w-4 h-4 text-campus-teal" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{myMarketplace.length}</p>
          <span className="text-[10px] text-slate-400">Marketplace listings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lost & Found</span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{myLostFound.length}</p>
          <span className="text-[10px] text-slate-400">Reports filed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Saved Items</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{mySavedListings.length}</p>
          <span className="text-[10px] text-slate-400">Saved products</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Saved Opps</span>
            <Briefcase className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{mySavedOpps.length}</p>
          <span className="text-[10px] text-slate-400">Bookmarked</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Teams</span>
            <Users2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{myApplications.length}</p>
          <span className="text-[10px] text-slate-400">Project applications</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Events</span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{myRegisteredEvents.length}</p>
          <span className="text-[10px] text-slate-400">Tickets confirmed</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs mb-6 text-xs font-bold">
        {[
          { id: "overview", label: "Dashboard Overview" },
          { id: "marketplace", label: `My Marketplace (${myMarketplace.length})` },
          { id: "lost_found", label: `My Lost & Found (${myLostFound.length})` },
          { id: "saved", label: `Saved Favourites (${mySavedListings.length})` },
          { id: "applications", label: `Team Applications (${myApplications.length})` },
          { id: "events", label: `Event Tickets (${myRegisteredEvents.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
              activeTab === tab.id
                ? "bg-campus-navy text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {/* 1. Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Selling Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-campus-navy flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-campus-teal" />
                  My Marketplace Listings
                </h3>
                <Link
                  href="/marketplace/new"
                  className="text-xs font-bold text-campus-teal hover:underline"
                >
                  + Add New
                </Link>
              </div>

              {myMarketplace.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                  You haven't listed any items for sale yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {myMarketplace.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <Link href={`/marketplace/${item.id}`}>
                            <p className="text-xs font-bold text-campus-navy hover:text-campus-teal transition line-clamp-1">
                              {item.title}
                            </p>
                          </Link>
                          <p className="text-xs font-extrabold text-campus-teal mt-0.5">
                            {formatPKR(item.price_pkr || 0)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                        <Link
                          href={`/marketplace/${item.id}`}
                          className="text-xs font-bold text-campus-navy hover:underline"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Lost & Found Reports */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-campus-navy flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  My Lost & Found Reports
                </h3>
                <Link
                  href="/lost-and-found/new"
                  className="text-xs font-bold text-campus-teal hover:underline"
                >
                  + Report Belonging
                </Link>
              </div>

              {myLostFound.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                  No lost or found reports submitted by your account.
                </div>
              ) : (
                <div className="space-y-3">
                  {myLostFound.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                item.type === "lost"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-teal-100 text-teal-800"
                              }`}
                            >
                              {item.type}
                            </span>
                            <Link href={`/lost-and-found/${item.id}`}>
                              <p className="text-xs font-bold text-campus-navy hover:text-campus-teal line-clamp-1">
                                {item.title}
                              </p>
                            </Link>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Location: {item.location_name}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/lost-and-found/${item.id}`}
                        className="text-xs font-bold text-campus-teal hover:underline shrink-0"
                      >
                        View Status →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quick Status & Registered Events */}
          <div className="space-y-6">
            {/* Event Passes */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <h3 className="text-sm font-extrabold text-campus-navy mb-4 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-indigo-500" />
                My Event Tickets ({myRegisteredEvents.length})
              </h3>

              {myRegisteredEvents.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  No upcoming event registrations.
                </p>
              ) : (
                <div className="space-y-3">
                  {myRegisteredEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1"
                    >
                      <span className="text-[10px] font-bold uppercase text-indigo-600 block">
                        PASS CONFIRMED
                      </span>
                      <h4 className="text-xs font-bold text-campus-navy">{evt.title}</h4>
                      <p className="text-[11px] text-slate-500">{evt.venue}</p>
                      <p className="text-[10px] font-mono text-slate-400 pt-1">
                        Ticket Code: #{evt.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Shortcuts */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 text-xs space-y-3">
              <h4 className="font-bold text-campus-navy uppercase tracking-wider text-[11px]">
                Quick Campus Shortcuts
              </h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/lost-and-found/new"
                  className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 hover:text-campus-navy font-semibold flex items-center justify-between"
                >
                  <span>Report Missing Belonging</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href="/teammates"
                  className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 hover:text-campus-navy font-semibold flex items-center justify-between"
                >
                  <span>Find Hackathon Teammates</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href="/resources"
                  className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 hover:text-campus-navy font-semibold flex items-center justify-between"
                >
                  <span>Download Past Exam Notes</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Marketplace Tab */}
      {activeTab === "marketplace" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-campus-navy">All My Listed Products</h3>
            <Link
              href="/marketplace/new"
              className="px-3.5 py-1.5 bg-campus-teal text-white text-xs font-bold rounded-xl"
            >
              + Create Listing
            </Link>
          </div>
          {myMarketplace.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No listings yet.</p>
          ) : (
            <div className="space-y-3">
              {myMarketplace.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-campus-navy">{item.title}</h4>
                      <p className="text-xs font-black text-campus-navy mt-0.5">
                        {formatPKR(item.price_pkr || 0)}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.category} • {item.location_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateListing(item.id, {
                          status: item.status === "active" ? "sold" : "active",
                        })
                      }
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-50"
                    >
                      {item.status === "active" ? "Mark Sold" : "Re-activate"}
                    </button>
                    <button
                      onClick={() => deleteListing(item.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Lost & Found Tab */}
      {activeTab === "lost_found" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-campus-navy">My Lost & Found Records</h3>
          {myLostFound.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                />
                <div>
                  <Badge variant={item.type === "lost" ? "rose" : "teal"} size="sm">
                    {item.type.toUpperCase()}
                  </Badge>
                  <h4 className="text-xs font-bold text-campus-navy mt-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.location_name}</p>
                </div>
              </div>

              <Link
                href={`/lost-and-found/${item.id}`}
                className="px-4 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl"
              >
                Manage Claims
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 4. Saved Items */}
      {activeTab === "saved" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-campus-navy">Saved Favourites</h3>
          {mySavedListings.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No saved items.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mySavedListings.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-full aspect-video rounded-xl object-cover mb-2"
                    />
                    <h4 className="text-xs font-bold text-campus-navy line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-extrabold text-campus-teal mt-0.5">
                      {item.price_pkr ? formatPKR(item.price_pkr) : "View details"}
                    </p>
                  </div>
                  <Link
                    href={`/marketplace/${item.id}`}
                    className="text-xs font-bold text-campus-navy hover:underline mt-3"
                  >
                    View Listing →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. Team Applications */}
      {activeTab === "applications" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-campus-navy">My Project Applications</h3>
          {myApplications.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              You haven't submitted any teammate applications yet.
            </p>
          ) : (
            <div className="space-y-3">
              {myApplications.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-campus-navy">
                      Project #{app.project_id.slice(0, 8)}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{app.pitch}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Event Tickets */}
      {activeTab === "events" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-campus-navy">Registered Event Passes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myRegisteredEvents.map((evt) => (
              <div key={evt.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-campus-navy">{evt.title}</h4>
                <p className="text-xs text-slate-500">{evt.venue}</p>
                <p className="text-xs text-slate-500">{formatDate(evt.start_time)}</p>
                <div className="p-2 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600">
                  Barcode: PASS-{evt.id.slice(0, 8).toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
