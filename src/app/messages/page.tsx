"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { formatPKR, formatRelativeTime } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  ShieldCheck,
  Package,
  Search,
  CheckCheck,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

function MessagesContent() {
  const searchParams = useSearchParams();
  const initialConvId = searchParams.get("conv");

  const { conversations, messages, sendMessage, currentUser } = useCampus();

  const [activeConvId, setActiveConvId] = useState<string>(
    initialConvId || (conversations.length > 0 ? conversations[0].id : "")
  );
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialConvId) {
      setActiveConvId(initialConvId);
    } else if (conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [initialConvId, conversations, activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeConvId]);

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const activeMessageList = activeConvId ? messages[activeConvId] || [] : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    sendMessage(activeConvId, inputText);
    setInputText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden h-[80vh] flex flex-col md:flex-row">
        {/* Left: Conversation List */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/60 ${
            activeConvId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="text-base font-extrabold text-campus-navy flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-campus-teal" />
              Campus Messages
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Secure in-platform communication between verified students.
            </p>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No active conversations yet. Reach out to a seller or item finder!
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-4 transition flex items-start gap-3 ${
                      isSelected
                        ? "bg-white border-l-4 border-campus-teal shadow-2xs"
                        : "hover:bg-white/80"
                    }`}
                  >
                    <img
                      src={
                        conv.other_user.avatar_url ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      }
                      alt={conv.other_user.full_name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-campus-navy truncate">
                          {conv.other_user.full_name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {formatRelativeTime(conv.last_message.created_at)}
                        </span>
                      </div>

                      {conv.listing_title && (
                        <p className="text-[10px] font-semibold text-campus-teal truncate mt-0.5">
                          Listing: {conv.listing_title}
                        </p>
                      )}

                      <p className="text-xs text-slate-500 truncate mt-1">
                        {conv.last_message.content}
                      </p>
                    </div>

                    {conv.unread_count > 0 && (
                      <span className="w-4 h-4 rounded-full bg-campus-teal text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {conv.unread_count}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat View */}
        {activeConv ? (
          <div
            className={`flex-1 flex flex-col bg-white ${
              !activeConvId ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Chat Top Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConvId("")}
                  className="md:hidden p-1 text-slate-500 hover:text-campus-navy"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img
                  src={
                    activeConv.other_user.avatar_url ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-campus-teal/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-campus-navy">
                    {activeConv.other_user.full_name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {activeConv.other_user.department || "Verified University Student"}
                  </p>
                </div>
              </div>

              {/* Listing Context Pill */}
              {activeConv.listing_title && (
                <div className="hidden sm:flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 text-xs">
                  {activeConv.listing_image && (
                    <img
                      src={activeConv.listing_image}
                      alt=""
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-bold text-campus-navy line-clamp-1">
                      {activeConv.listing_title}
                    </p>
                    {activeConv.listing_price !== undefined && (
                      <p className="text-[11px] text-campus-teal font-extrabold">
                        {formatPKR(activeConv.listing_price)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Safety Banner */}
            <div className="bg-amber-50/80 px-4 py-2 text-[11px] text-amber-800 border-b border-amber-200/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Safety Reminder: Keep all communication on CampusLoop. Never transfer money in advance
                without seeing the item in person.
              </span>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
              {activeMessageList.map((msg) => {
                const isMe = msg.sender_id === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? "bg-campus-navy text-white rounded-tr-xs"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Send Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${activeConv.other_user.full_name}...`}
                className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center p-8 text-center text-slate-400">
            <div>
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-400">
          Loading conversation stream...
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
