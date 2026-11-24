"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { CampusLoopAI } from "@/lib/ai/gemini";
import {
  Users2,
  PlusCircle,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  UserPlus,
  Send,
  X,
  Check,
} from "lucide-react";

export default function TeammatesPage() {
  const {
    projects,
    projectApplications,
    addProject,
    applyToProject,
    reviewProjectApplication,
    currentUser,
    allUsers,
    currentUniversity,
  } = useCampus();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [applyPitch, setApplyPitch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New project state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<any>("hackathon");
  const [newDescription, setNewDescription] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [newMembersNeeded, setNewMembersNeeded] = useState(2);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "hackathon", label: "Hackathons" },
    { id: "software", label: "Software & Web" },
    { id: "research", label: "Research & FYP" },
    { id: "robotics", label: "Robotics & Hardware" },
    { id: "entrepreneurship", label: "Startups" },
    { id: "design", label: "Design & UI/UX" },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !applyPitch.trim()) return;

    applyToProject(selectedProjectId, applyPitch);
    setApplyPitch("");
    setSelectedProjectId(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const parsedSkills = newSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    addProject({
      university_id: currentUniversity.id,
      title: newTitle,
      category: newCategory,
      description: newDescription,
      required_skills: parsedSkills.length > 0 ? parsedSkills : ["React", "Python"],
      members_needed: newMembersNeeded,
      members_current: 1,
      status: "recruiting",
    });

    setNewTitle("");
    setNewDescription("");
    setNewSkills("");
    setShowCreateModal(false);
  };

  const filteredProjects = projects
    .filter((p) => (activeCategory === "all" ? true : p.category === activeCategory))
    .filter((p) =>
      searchQuery.trim() === ""
        ? true
        : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.required_skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-400/20 text-emerald-300">
              <Users2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Cross-Disciplinary Team Formation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Find Project Teammates
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Assemble dream teams for national hackathons, research labs, Final Year Projects (FYP),
            and student tech startups across {currentUniversity.name}.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Recruit Teammates</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto bg-slate-100 p-1 rounded-xl">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  activeCategory === c.id
                    ? "bg-white text-campus-navy shadow-xs"
                    : "text-slate-600 hover:text-campus-navy"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. YOLO, Python, Three.js)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isCreator = currentUser.id === project.creator_id;
          const applications = projectApplications.filter((a) => a.project_id === project.id);
          const hasApplied =
            projectApplications.some(
              (a) => a.project_id === project.id && a.applicant_id === currentUser.id
            ) || project.has_applied;

          // AI Teammate Complementary Match Suggestions
          const candidateSuggestions = CampusLoopAI.recommendTeammates(
            project.required_skills,
            allUsers.filter((u) => u.id !== project.creator_id)
          );

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card hover:shadow-cardHover transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-campus-navy px-2.5 py-0.5 rounded-lg">
                      {project.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Recruiting: {project.members_needed} members
                    </span>
                  </div>

                  <span className="text-xs font-bold text-campus-teal bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 uppercase">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-campus-navy mb-2">{project.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Required Skills */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Skills Required:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Complementary Match Recommendation */}
                {candidateSuggestions.length > 0 && (
                  <div className="p-3 bg-teal-50/60 rounded-2xl border border-teal-200/80 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-campus-navy mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-campus-teal" />
                      <span>AI Suggested Campus Match:</span>
                      <span className="text-campus-teal font-extrabold">
                        {candidateSuggestions[0].full_name} ({candidateSuggestions[0].fitScore}% Fit)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Has complementary strengths in {candidateSuggestions[0].skills.slice(0, 3).join(", ")}.
                    </p>
                  </div>
                )}

                {/* Incoming Applications (if creator) */}
                {isCreator && applications.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Applicant Requests ({applications.length}):
                    </span>
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-campus-navy">{app.applicant_name}</p>
                          <p className="text-[11px] text-slate-500 italic">"{app.pitch}"</p>
                        </div>
                        {app.status === "pending" ? (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => reviewProjectApplication(app.id, "accepted")}
                              className="p-1 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200"
                              title="Accept"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => reviewProjectApplication(app.id, "rejected")}
                              className="p-1 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200"
                              title="Decline"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {app.status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      project.creator_avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    }
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-slate-600 font-medium">Lead: {project.creator_name}</span>
                </div>

                {!isCreator ? (
                  hasApplied ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      Application Pending
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      className="px-4 py-1.5 bg-campus-navy hover:bg-campus-navy-light text-white font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Apply to Join
                    </button>
                  )
                ) : (
                  <span className="text-xs font-bold text-slate-400">Your Project</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply to Project Modal */}
      {selectedProjectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-campus-navy mb-1">Join Project Team</h3>
            <p className="text-xs text-slate-500 mb-4">
              Write a short pitch explaining your experience and what you can contribute.
            </p>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Your Pitch & Relevant Skills *
                </label>
                <textarea
                  required
                  rows={4}
                  value={applyPitch}
                  onChange={(e) => setApplyPitch(e.target.value)}
                  placeholder="e.g. I have experience training computer vision models in PyTorch and deployed real-time object detection on edge devices..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-campus-navy mb-1">Post Team Recruitment</h3>
            <p className="text-xs text-slate-500 mb-4">
              Recruit developers, researchers, or designers from across your university.
            </p>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Smart Agriculture Drone with Edge AI..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  >
                    <option value="hackathon">Hackathon</option>
                    <option value="software">Software & Web</option>
                    <option value="research">Research & FYP</option>
                    <option value="robotics">Robotics</option>
                    <option value="entrepreneurship">Startup</option>
                    <option value="design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Teammates Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={newMembersNeeded}
                    onChange={(e) => setNewMembersNeeded(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Required Skills (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g. Python, OpenCV, Next.js, Figma"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Project Pitch & Objective *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the goals of the project, target competition, deadlines, and responsibilities..."
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
                  Publish Recruitment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
