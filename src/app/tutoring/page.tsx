"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import {
  GraduationCap,
  Star,
  Clock,
  Calendar,
  MessageSquare,
  Search,
  CheckCircle2,
  PlusCircle,
  Send,
  BookOpen,
} from "lucide-react";

export default function PeerTutoringPage() {
  const { tutors, registerAsTutor, requestTutoringSession, currentUser, currentUniversity } =
    useCampus();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [sessionSubject, setSessionSubject] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionSuccess, setSessionSuccess] = useState(false);

  // Register as tutor modal
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [tutorBio, setTutorBio] = useState("");
  const [tutorSubjects, setTutorSubjects] = useState("");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [experienceYears, setExperienceYears] = useState(1);

  const handleRequestSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTutorId || !sessionSubject.trim()) return;

    requestTutoringSession(selectedTutorId, sessionSubject, sessionNotes);
    setSessionSuccess(true);
    setTimeout(() => {
      setSessionSuccess(false);
      setSelectedTutorId(null);
      setSessionSubject("");
      setSessionNotes("");
    }, 1800);
  };

  const handleRegisterAsTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorBio.trim() || !tutorSubjects.trim()) return;

    const subjectsArray = tutorSubjects
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    registerAsTutor({
      tutor_avatar: currentUser.avatar_url,
      department: currentUser.department,
      degree_program: currentUser.degree_program,
      university_id: currentUniversity.id,
      subjects: subjectsArray,
      bio: tutorBio,
      experience_years: experienceYears,
      hourly_rate_pkr: parseFloat(hourlyRate) || 0,
      availability: ["Mon, Wed: 5:00 PM - 7:00 PM", "Sat: 11:00 AM - 2:00 PM"],
    });

    setShowRegisterModal(false);
  };

  const filteredTutors = tutors.filter((tutor) =>
    searchQuery.trim() === ""
      ? true
      : tutor.tutor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Student-to-Student Mentorship
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Peer Tutoring Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Learn from top senior students and Teaching Assistants who aced your exact courses. Book
            volunteer or affordable 1-on-1 exam prep sessions.
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-5 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Become a Peer Tutor</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8">
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutor by subject (e.g. Calculus, Linear Algebra, OOP, Python)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
          />
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card hover:shadow-cardHover transition flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      tutor.tutor_avatar ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                    }
                    alt={tutor.tutor_name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-campus-teal"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-campus-navy">
                      {tutor.tutor_name}
                    </h3>
                    <p className="text-xs text-slate-500">{tutor.degree_program}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                        <span>{tutor.rating}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{tutor.reviews_count} student reviews</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-campus-navy block">
                    {tutor.hourly_rate_pkr === 0
                      ? "Free (Volunteer)"
                      : `PKR ${tutor.hourly_rate_pkr.toLocaleString()}/hr`}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    {tutor.experience_years}y Experience
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{tutor.bio}</p>

              {/* Subject Badges */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Subject Expertise:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs font-semibold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg border border-teal-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability schedule */}
              <div className="space-y-1 mb-4 text-xs text-slate-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Weekly Availability:
                </span>
                {tutor.availability.map((slot, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{slot}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">In-person on campus</span>
              <button
                onClick={() => setSelectedTutorId(tutor.id)}
                className="px-4 py-2 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Request Tutoring Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Session Modal */}
      {selectedTutorId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 shadow-2xl">
            {sessionSuccess ? (
              <div className="py-6 text-center animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-campus-teal flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-campus-navy">Session Requested</h4>
                <p className="text-xs text-slate-500 mt-1">
                  The peer tutor has been notified and will message you to confirm the time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSession} className="space-y-4">
                <h3 className="text-lg font-extrabold text-campus-navy">Request Peer Tutoring</h3>
                <p className="text-xs text-slate-500">
                  Select your course and describe what concepts you'd like to focus on.
                </p>

                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Course / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionSubject}
                    onChange={(e) => setSessionSubject(e.target.value)}
                    placeholder="e.g. Calculus II - Multivariable Integration"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Specific Questions or Doubts *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Describe specific problem sets or exam syllabus you are preparing for..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedTutorId(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Become a Tutor Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-campus-navy mb-1">Register as Peer Tutor</h3>
            <p className="text-xs text-slate-500 mb-4">
              Help your university peers and build your teaching portfolio.
            </p>

            <form onSubmit={handleRegisterAsTutor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Subjects You Can Teach (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={tutorSubjects}
                  onChange={(e) => setTutorSubjects(e.target.value)}
                  placeholder="e.g. Object Oriented Programming, Data Structures, Calculus I"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Hourly Rate (PKR) - 0 for Volunteer
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Years Mentoring
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Tutor Profile Bio *
                </label>
                <textarea
                  required
                  rows={3}
                  value={tutorBio}
                  onChange={(e) => setTutorBio(e.target.value)}
                  placeholder="Introduce your teaching style, past grades in these courses, and TA experience..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light shadow-sm"
                >
                  Create Tutor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
