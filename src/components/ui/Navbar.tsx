"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CampusLogo } from "./CampusLogo";
import { Badge } from "./Badge";
import { useCampus } from "@/lib/store/campusStore";
import {
  Search,
  Bell,
  MessageSquare,
  Shield,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  BookmarkCheck,
  PackagePlus,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { GlobalSearchModal } from "./GlobalSearchModal";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currentUniversity,
    setCurrentUniversity,
    universities,
    currentUser,
    allUsers,
    switchUser,
    notifications,
    markAllNotificationsRead,
    conversations,
  } = useCampus();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [univDropdownOpen, setUnivDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.is_read);
  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unread_count, 0);

  const navLinks = [
    { name: "Lost & Found", href: "/lost-and-found" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Community", href: "/community" },
    { name: "Opportunities", href: "/opportunities" },
    { name: "Teammates", href: "/teammates" },
    { name: "Notes & Docs", href: "/resources" },
    { name: "Peer Tutors", href: "/tutoring" },
    { name: "Events", href: "/events" },
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "university_admin":
        return "rose";
      case "moderator":
        return "amber";
      default:
        return "teal";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-nav">
        {/* Top utility bar */}
        <div className="bg-campus-navy text-white text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">Active University:</span>
            {/* University Switcher */}
            <div className="relative">
              <button
                onClick={() => setUnivDropdownOpen(!univDropdownOpen)}
                className="inline-flex items-center gap-1 font-bold text-campus-teal-light hover:text-white transition px-1.5 py-0.5 rounded bg-white/10"
              >
                {currentUniversity.short_name} ({currentUniversity.city})
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {univDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-72 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Switch University Campus
                  </div>
                  {universities.map((univ) => (
                    <button
                      key={univ.id}
                      onClick={() => {
                        setCurrentUniversity(univ);
                        setUnivDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-campus-navy">{univ.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {univ.city} • {univ.domain}
                        </p>
                      </div>
                      {currentUniversity.id === univ.id && (
                        <CheckCircle2 className="w-4 h-4 text-campus-teal shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Test Persona / Role Switcher Header */}
          <div className="flex items-center gap-3">
            <span className="text-slate-300 hidden sm:inline">Active Persona:</span>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px]">
              <span className="font-bold text-white">{currentUser.full_name}</span>
              <span className="opacity-60">({currentUser.role.replace("_", " ")})</span>
            </div>
            {currentUser.role === "university_admin" && (
              <Link
                href="/admin"
                className="bg-campus-teal text-white font-bold px-2 py-0.5 rounded text-[11px] hover:bg-campus-teal-dark transition flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <CampusLogo size="sm" showTagline={false} />
            {/* Quick Search Shortcut Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200/80 transition w-56 justify-between group"
            >
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-campus-navy" />
                <span>Search campus...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border border-slate-300 text-slate-500 shadow-2xs font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "bg-campus-navy text-white shadow-xs"
                      : "text-slate-600 hover:text-campus-navy hover:bg-slate-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Post Button */}
            <Link
              href="/marketplace/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-campus-teal text-white rounded-lg text-xs font-bold hover:bg-campus-teal-dark transition shadow-xs"
            >
              <PackagePlus className="w-3.5 h-3.5" />
              <span>Post Item</span>
            </Link>

            {/* Messages Icon */}
            <Link
              href="/messages"
              className="relative p-2 rounded-lg text-slate-600 hover:text-campus-navy hover:bg-slate-100 transition"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnreadMessages > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-campus-teal text-white text-[10px] font-bold flex items-center justify-center">
                  {totalUnreadMessages}
                </span>
              )}
            </Link>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-campus-navy hover:bg-slate-100 transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-campus-navy">Notifications</span>
                      {unreadNotifs.length > 0 && (
                        <Badge variant="rose" size="sm">
                          {unreadNotifs.length} new
                        </Badge>
                      )}
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-campus-teal font-semibold hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <Link
                          key={item.id}
                          href={item.link_url || "/notifications"}
                          onClick={() => setNotifDropdownOpen(false)}
                          className={`block px-4 py-3 hover:bg-slate-50 transition text-left ${
                            !item.is_read ? "bg-teal-50/40" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-campus-navy">{item.title}</p>
                            {!item.is_read && (
                              <span className="w-2 h-2 rounded-full bg-campus-teal shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{item.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">
                            {new Date(item.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </Link>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <Link
                      href="/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs font-semibold text-campus-navy hover:text-campus-teal transition"
                    >
                      View all notification history →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Persona Switcher */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-slate-100 transition border border-slate-200"
              >
                <span className="text-xs font-bold text-campus-navy hidden sm:inline">
                  {currentUser.full_name.split(" ")[0]}
                </span>
                <img
                  src={currentUser.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                  alt={currentUser.full_name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-campus-teal"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-campus-navy">{currentUser.full_name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge variant={getRoleBadgeVariant(currentUser.role)} size="sm">
                        {currentUser.role.replace("_", " ").toUpperCase()}
                      </Badge>
                      <span className="text-[11px] text-slate-400">• {currentUser.department}</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1 border-b border-slate-100">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                      Student Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile & Verification
                    </Link>
                    <Link
                      href="/my-listings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <BookmarkCheck className="w-4 h-4 text-slate-400" />
                      My Listings & Claims
                    </Link>
                    {currentUser.role === "university_admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-rose-600" />
                        Admin Command Center
                      </Link>
                    )}
                  </div>

                  {/* Switch Test Persona Section */}
                  <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                      Switch Active Account:
                    </p>
                    <div className="space-y-1">
                      {allUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => {
                            switchUser(user.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                            user.id === currentUser.id
                              ? "bg-campus-navy text-white font-bold"
                              : "hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          <div>
                            <span className="block truncate">{user.full_name}</span>
                            <span
                              className={`text-[10px] block opacity-75 ${
                                user.id === currentUser.id ? "text-slate-200" : "text-slate-500"
                              }`}
                            >
                              {user.role} • {user.department}
                            </span>
                          </div>
                          {user.id === currentUser.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-campus-teal shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link
                      href="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-4 py-2 text-xs text-rose-600 font-medium hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
            <div className="mb-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-xs text-slate-500"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search campus items, notes, events...</span>
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? "bg-campus-navy text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/marketplace/new"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-campus-teal text-white rounded-lg text-sm font-bold text-center"
              >
                + Post Item (Lost/Found/Market)
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-slate-100 text-campus-navy rounded-lg text-sm font-bold text-center"
              >
                My Student Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
