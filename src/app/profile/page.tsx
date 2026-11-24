"use client";

import React, { useState } from "react";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  ShieldCheck,
  Mail,
  Building,
  GraduationCap,
  Calendar,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, currentUniversity, updateCurrentUserProfile } = useCampus();

  const [fullName, setFullName] = useState(currentUser.full_name);
  const [department, setDepartment] = useState(currentUser.department);
  const [degreeProgram, setDegreeProgram] = useState(currentUser.degree_program);
  const [semester, setSemester] = useState(currentUser.semester);
  const [studentId, setStudentId] = useState(currentUser.student_id);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [skills, setSkills] = useState(currentUser.skills.join(", "));
  const [interests, setInterests] = useState(currentUser.interests.join(", "));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      full_name: fullName,
      department,
      degree_program: degreeProgram,
      semester,
      student_id: studentId,
      bio,
      skills: skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0),
      interests: interests.split(",").map((s) => s.trim()).filter((s) => s.length > 0),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={
                currentUser.avatar_url ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              }
              alt={currentUser.full_name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-campus-teal"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-campus-navy">{currentUser.full_name}</h1>
                <Badge variant="teal" size="sm">
                  {currentUser.role.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-emerald-600 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Student of {currentUniversity.short_name}</span>
              </div>
            </div>
          </div>

          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Profile Updated
            </span>
          )}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                University Email (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100 text-slate-500 border border-slate-200 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Department / Faculty *
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. SEECS, SADA, SBASSE"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Degree Program *
              </label>
              <input
                type="text"
                required
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
                placeholder="e.g. BS Software Engineering"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Current Semester (1-12)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={semester}
                onChange={(e) => setSemester(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Student Registration / CMS ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 2021-SE-104"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              About You & Technical Interests
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a brief intro for peer tutors and teammate collaborators..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Skills & Tech Stack (Comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Next.js, Python, PyTorch, Figma"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-campus-navy mb-1.5">
                Interests & Clubs (Comma separated)
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Hackathons, Robotics, Cricket"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
