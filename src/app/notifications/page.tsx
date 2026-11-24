"use client";

import React from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { formatRelativeTime } from "@/lib/utils";
import {
  Bell,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Briefcase,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useCampus();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return <Sparkles className="w-4 h-4 text-campus-teal" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "claim":
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      case "event":
        return <Calendar className="w-4 h-4 text-indigo-500" />;
      case "opportunity":
        return <Briefcase className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-campus-navy flex items-center gap-2">
              <Bell className="w-5 h-5 text-campus-teal" />
              Notifications Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates on AI matches, claims, messages, and campus deadlines.
            </p>
          </div>

          {notifications.some((n) => !n.is_read) && (
            <button
              onClick={markAllNotificationsRead}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-campus-navy text-xs font-bold rounded-xl transition"
            >
              Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No notifications in your history.
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-4 rounded-2xl border transition flex items-start gap-4 ${
                  !item.is_read
                    ? "bg-teal-50/40 border-teal-200"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white shadow-2xs border border-slate-100 shrink-0">
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-campus-navy">{item.title}</h3>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {formatRelativeTime(item.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                  {item.link_url && (
                    <Link
                      href={item.link_url}
                      className="inline-block mt-2 text-xs font-bold text-campus-teal hover:underline"
                    >
                      View details →
                    </Link>
                  )}
                </div>

                {!item.is_read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-campus-teal shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
