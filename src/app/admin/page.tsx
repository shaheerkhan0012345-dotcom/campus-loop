"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import {
  Shield,
  Users,
  ShoppingBag,
  HelpCircle,
  AlertTriangle,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Trash2,
  Check,
  Building,
  Sliders,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    currentUser,
    switchUser,
    allUsers,
    currentUniversity,
    listings,
    deleteListing,
    posts,
    reports,
    resolveReport,
    auditLogs,
    opportunities,
    events,
  } = useCampus();

  const [activeTab, setActiveTab] = useState<
    "overview" | "reports" | "listings" | "audit" | "university"
  >("overview");

  const [actionReason, setActionReason] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const isAuthorized =
    currentUser.role === "university_admin" || currentUser.role === "super_admin";

  const adminUser = allUsers.find((u) => u.role === "university_admin") || allUsers[3];

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-campus-navy">Administrator Access Restricted</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6 max-w-md mx-auto">
          You are currently logged in as{" "}
          <span className="font-bold text-campus-navy">{currentUser.full_name}</span> (Role:{" "}
          {currentUser.role}). This section requires University Administrator or Super Admin
          privileges.
        </p>

        <div className="p-4 bg-slate-100 rounded-2xl max-w-sm mx-auto mb-6">
          <p className="text-xs font-bold text-slate-700 mb-2">Switch to Admin Persona for Testing:</p>
          <button
            onClick={() => switchUser(adminUser.id)}
            className="w-full py-2.5 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light transition flex items-center justify-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-rose-400" />
            Switch to Campus Directorate (Admin)
          </button>
        </div>

        <Link href="/" className="text-xs font-bold text-campus-teal hover:underline">
          Return to CampusLoop Home
        </Link>
      </div>
    );
  }

  const pendingReports = reports.filter((r) => r.status === "pending");
  const resolvedReports = reports.filter((r) => r.status !== "pending");

  const handleResolve = (status: "resolved" | "dismissed") => {
    if (!selectedReportId) return;
    resolveReport(selectedReportId, status, actionReason || `Admin marked as ${status}`);
    setSelectedReportId(null);
    setActionReason("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-campus-navy via-slate-900 to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-rose-500/20 text-rose-300">
              <Shield className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Institutional Governance & Safety Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentUniversity.short_name} Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Monitor platform health, enforce academic integrity, audit moderation actions, and
            manage university domain trust settings.
          </p>
        </div>

        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs text-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Logged In Admin:</span>
          <span className="font-bold text-white text-sm">{currentUser.full_name}</span>
          <p className="text-[11px] text-campus-teal-light mt-0.5">Role: University Administrator</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase">Students</span>
            <Users className="w-4 h-4 text-campus-navy" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{allUsers.length + 420}</p>
          <span className="text-[10px] text-emerald-600 font-bold">100% verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase">Marketplace</span>
            <ShoppingBag className="w-4 h-4 text-campus-teal" />
          </div>
          <p className="text-2xl font-black text-campus-navy">
            {listings.filter((l) => l.type === "marketplace").length}
          </p>
          <span className="text-[10px] text-slate-400">Active products</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase">Lost & Found</span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">
            {listings.filter((l) => l.type !== "marketplace").length}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">94% AI matched</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase">Threads</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{posts.length}</p>
          <span className="text-[10px] text-slate-400">Community posts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase">Open Reports</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600">{pendingReports.length}</p>
          <span className="text-[10px] text-rose-600 font-bold">Needs Review</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase">Audit Events</span>
            <Shield className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-campus-navy">{auditLogs.length}</p>
          <span className="text-[10px] text-slate-400">Logged actions</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs mb-6 text-xs font-bold">
        {[
          { id: "overview", label: "Admin Overview" },
          { id: "reports", label: `User Reports (${pendingReports.length} Pending)` },
          { id: "listings", label: `Content & Listings (${listings.length})` },
          { id: "audit", label: `Audit Log History (${auditLogs.length})` },
          { id: "university", label: "University Domain Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition shrink-0 ${
              activeTab === tab.id
                ? "bg-campus-navy text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Urgent Reports Queue */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-campus-navy flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Urgent Student Moderation Reports
                </h3>
                <span className="text-xs text-rose-600 font-bold">
                  {pendingReports.length} pending investigation
                </span>
              </div>

              {pendingReports.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                  No pending user reports. Campus ecosystem is healthy!
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingReports.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-4 bg-rose-50/40 rounded-2xl border border-rose-200 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-900">{rep.reason}</span>
                        <span className="text-[10px] text-slate-400">
                          {formatRelativeTime(rep.created_at)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 italic">"{rep.content_preview}"</p>
                      <p className="text-[11px] text-slate-500">
                        Reported by: <span className="font-semibold">{rep.reporter_name}</span>
                      </p>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedReportId(rep.id);
                            setActiveTab("reports");
                          }}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition"
                        >
                          Investigate & Take Action →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Platform Audit Feed */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <h3 className="text-sm font-extrabold text-campus-navy mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                Recent Administrative Actions
              </h3>
              <div className="space-y-3 text-xs">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-campus-navy">{log.action}</span>
                      <span className="text-[10px] text-slate-400">
                        {formatRelativeTime(log.created_at)}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{log.details}</p>
                    <span className="text-[10px] text-slate-400 block">By: {log.admin_name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Reports */}
      {activeTab === "reports" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-6">
          <h3 className="text-base font-extrabold text-campus-navy">
            Content Moderation & Safety Queue
          </h3>

          <div className="space-y-4">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className={`p-5 rounded-2xl border transition ${
                  rep.status === "pending"
                    ? "bg-rose-50/50 border-rose-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        rep.status === "pending"
                          ? "bg-rose-600 text-white"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {rep.status}
                    </span>
                    <span className="text-xs font-bold text-campus-navy">{rep.reason}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Filed on {formatDate(rep.created_at)}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 my-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Flagged Content ({rep.content_type}):
                  </span>
                  <p className="text-xs text-slate-800 font-medium italic">
                    "{rep.content_preview}"
                  </p>
                </div>

                {rep.description && (
                  <p className="text-xs text-slate-600 mb-3">
                    <span className="font-semibold">Reporter Notes:</span> {rep.description}
                  </p>
                )}

                {rep.status === "pending" && (
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Audit action note (e.g. Content removed, user notified)..."
                      value={selectedReportId === rep.id ? actionReason : ""}
                      onChange={(e) => {
                        setSelectedReportId(rep.id);
                        setActionReason(e.target.value);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                    />

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedReportId(rep.id);
                          handleResolve("resolved");
                        }}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition"
                      >
                        Enforce Penalty & Resolve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReportId(rep.id);
                          handleResolve("dismissed");
                        }}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition"
                      >
                        Dismiss Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Content & Listings */}
      {activeTab === "listings" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-campus-navy">
            All Campus Listings Moderation
          </h3>
          <div className="space-y-3">
            {listings.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={item.type === "marketplace" ? "teal" : "amber"}
                        size="sm"
                      >
                        {item.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-bold text-campus-navy">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      By {item.author_name} • {item.location_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (confirm(`Remove listing "${item.title}" from platform?`)) {
                        deleteListing(item.id);
                      }
                    }}
                    className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition"
                  >
                    Delete Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-campus-navy">Administrative Audit Trail</h3>
          <p className="text-xs text-slate-500">
            Immutable log of all moderation enforcement actions, role updates, and listing removals.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Administrator</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 text-slate-400 font-mono">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-semibold text-campus-navy">{log.admin_name}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium">{log.target_type}</td>
                    <td className="py-3 px-3 text-slate-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: University Settings */}
      {activeTab === "university" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-6">
          <h3 className="text-base font-extrabold text-campus-navy">
            {currentUniversity.name} Security Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-campus-navy flex items-center gap-1.5">
                <Building className="w-4 h-4 text-campus-teal" />
                Email Domain Whitelist
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Primary authorized domain: <span className="font-mono font-bold text-campus-navy">@{currentUniversity.domain}</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Students registering with @{currentUniversity.domain} receive automatic verification.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-campus-navy flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-campus-teal" />
                Row-Level Security & Role Hierarchy
              </h4>
              <p className="text-slate-600 leading-relaxed">
                4-tier Role Based Access Control: Student → Moderator → University Admin → Platform Super Admin.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
