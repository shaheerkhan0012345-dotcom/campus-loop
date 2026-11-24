"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { ReportContentModal } from "@/components/ui/ReportContentModal";
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Share2,
  AlertTriangle,
  PlusCircle,
  Pin,
  Sparkles,
  Search,
  Send,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function CommunityHubPage() {
  const {
    posts,
    comments,
    addPost,
    toggleLikePost,
    addComment,
    currentUser,
    currentUniversity,
  } = useCampus();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>("post-001");
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // New Post Form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<any>("technology");
  const [newContent, setNewContent] = useState("");

  // Report Modal
  const [reportModalData, setReportModalData] = useState<{
    id: string;
    preview: string;
    userId?: string;
  } | null>(null);

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "general", label: "General Discussion" },
    { id: "technology", label: "Technology & Code" },
    { id: "education", label: "Academics & Exams" },
    { id: "campus_life", label: "Campus Life & Food" },
    { id: "career", label: "Career & Internships" },
    { id: "help", label: "Questions & Help" },
    { id: "entrepreneurship", label: "Startups & Projects" },
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addPost(newTitle, newContent, newCategory);
    setNewTitle("");
    setNewContent("");
    setShowCreateModal(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId] || "";
    if (!text.trim()) return;

    addComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const filteredPosts = posts
    .filter((p) => (activeCategory === "all" ? true : p.category === activeCategory))
    .filter((p) =>
      searchQuery.trim() === ""
        ? true
        : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-400/20 text-blue-300">
              <MessageSquare className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Student Voice & Discourse
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentUniversity.short_name} Community Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Discuss university courses, ask for senior advice, share technical discoveries, and connect
            with students across all departments.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Start a Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Categories Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
              Discussion Topics
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    activeCategory === cat.id
                      ? "bg-campus-navy text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-campus-navy flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-campus-teal" />
              Community Guidelines:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Keep discussions constructive, civil and respectful.</li>
              <li>Academic honesty is enforced. Exam papers leaks are banned.</li>
              <li>No commercial spam or unauthorized external links.</li>
            </ul>
          </div>
        </div>

        {/* Center: Discussion Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations, operating systems, food, hackathons..."
              className="w-full text-xs text-campus-navy bg-transparent focus:outline-hidden"
            />
          </div>

          {/* Posts Feed */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-campus-navy">No threads found</h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Be the first to start a conversation in this topic!
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-campus-navy text-white text-xs font-bold rounded-lg"
              >
                Start Discussion
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const postComments = comments[post.id] || [];
              const isExpanded = expandedPostId === post.id;

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card transition"
                >
                  {/* Header: Author Info & Category */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          post.author_avatar ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                        }
                        alt={post.author_name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-campus-teal/30"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-campus-navy">
                            {post.author_name}
                          </span>
                          <span className="text-[11px] text-slate-400">• {formatRelativeTime(post.created_at)}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{post.author_department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.is_pinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-base font-bold text-campus-navy mb-2">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4">
                    {post.content}
                  </p>

                  {/* Reactions & Interaction Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-4">
                      {/* Like button */}
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`inline-flex items-center gap-1.5 font-bold transition px-2 py-1 rounded-lg ${
                          post.has_liked
                            ? "text-campus-teal bg-teal-50"
                            : "text-slate-500 hover:text-campus-navy hover:bg-slate-100"
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${post.has_liked ? "fill-campus-teal" : ""}`} />
                        <span>{post.likes_count}</span>
                      </button>

                      {/* Comment toggle button */}
                      <button
                        onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-campus-navy transition px-2 py-1 rounded-lg hover:bg-slate-100"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments_count} Replies</span>
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setReportModalData({
                          id: post.id,
                          preview: post.title,
                          userId: post.user_id,
                        })
                      }
                      className="text-slate-400 hover:text-rose-600 transition p-1"
                      title="Report thread"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Comment Thread Area */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      {/* Comments List */}
                      {postComments.map((comm) => (
                        <div key={comm.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-campus-navy">{comm.author_name}</span>
                            <span className="text-[10px] text-slate-400">
                              {formatRelativeTime(comm.created_at)}
                            </span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{comm.content}</p>
                        </div>
                      ))}

                      {/* Add Comment Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                          onKeyDown={(e) => e.key === "Enter" && handleSendComment(post.id)}
                          placeholder="Write a constructive reply..."
                          className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
                        />
                        <button
                          onClick={() => handleSendComment(post.id)}
                          className="px-3.5 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light transition flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create New Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-campus-navy mb-1">Start a Discussion</h3>
            <p className="text-xs text-slate-500 mb-4">
              Share knowledge, ask campus questions, or organize a study group.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">Topic</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                >
                  <option value="technology">Technology & Code</option>
                  <option value="education">Academics & Exams</option>
                  <option value="campus_life">Campus Life & Food</option>
                  <option value="career">Career & Internships</option>
                  <option value="help">Questions & Help</option>
                  <option value="entrepreneurship">Startups & Projects</option>
                  <option value="general">General Discussion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Thread Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Tips for passing Operating Systems lab exams..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Discussion Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain the background, ask specific questions, or outline study recommendations..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light shadow-sm"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalData && (
        <ReportContentModal
          isOpen={true}
          onClose={() => setReportModalData(null)}
          contentType="post"
          contentId={reportModalData.id}
          contentPreview={reportModalData.preview}
          reportedUserId={reportModalData.userId}
        />
      )}
    </div>
  );
}
