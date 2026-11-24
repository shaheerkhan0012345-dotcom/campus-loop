"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { CampusLoopAI } from "@/lib/ai/gemini";
import {
  FileText,
  Upload,
  Download,
  Star,
  Search,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Brain,
  FileCheck,
} from "lucide-react";

export default function NotesResourcesPage() {
  const { resources, addResource, downloadResource, currentUniversity } = useCampus();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [quizResource, setQuizResource] = useState<{
    title: string;
    subject: string;
    questions: Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>;
  } | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload form state
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newDepartment, setNewDepartment] = useState("Computer Science & SE");
  const [newSemester, setNewSemester] = useState(3);
  const [newDescription, setNewDescription] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("https://example.com/notes.pdf");

  const departments = [
    { id: "all", label: "All Departments" },
    { id: "Computer Science & SE", label: "Computer Science & SE" },
    { id: "Electrical Engineering", label: "Electrical Engineering" },
    { id: "Architecture & Civil", label: "Architecture & Civil" },
    { id: "Business & Management", label: "Business & Economics" },
  ];

  const handleLaunchQuiz = (subject: string, title: string) => {
    const questions = CampusLoopAI.generateStudyQuestions(subject, title);
    setQuizResource({ title, subject, questions });
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubject.trim()) return;

    addResource({
      university_id: currentUniversity.id,
      title: newTitle,
      description: newDescription,
      subject: newSubject,
      course_code: newCourseCode,
      department: newDepartment,
      semester: newSemester,
      file_url: newFileUrl,
      file_size_mb: 5.4,
      file_type: "pdf",
      ai_summary: `AI generated synopsis covering key core exam topics in ${newSubject}.`,
    });

    setNewTitle("");
    setNewSubject("");
    setNewCourseCode("");
    setShowUploadModal(false);
  };

  const filteredResources = resources
    .filter((r) => (selectedDept === "all" ? true : r.department === selectedDept))
    .filter((r) =>
      searchQuery.trim() === ""
        ? true
        : r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (r.course_code && r.course_code.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-rose-400/20 text-rose-300">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Centralized Academic Repository
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Notes & Study Materials
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Access verified lecture notes, solved midterm past papers, and cheat sheets for
            courses taught at {currentUniversity.name}. Powered by AI document summarization.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto bg-slate-100 p-1 rounded-xl">
            {departments.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  selectedDept === d.id
                    ? "bg-white text-campus-navy shadow-xs"
                    : "text-slate-600 hover:text-campus-navy"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course code (CS-214, CE-112) or topic..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card hover:shadow-cardHover transition flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-lg border border-rose-200">
                    {res.course_code || res.subject}
                  </span>
                  <span className="text-xs font-medium text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-semibold">{res.department}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{res.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-campus-navy mb-2">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{res.description}</p>

              {/* AI Summary Highlight Box */}
              {res.ai_summary && (
                <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200/80 mb-4 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-campus-navy mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-campus-teal" />
                    <span>AI Key Concepts Synopsis:</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{res.ai_summary}</p>
                </div>
              )}
            </div>

            {/* Actions: Download + Generate Interactive Quiz */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {res.file_type.toUpperCase()} • {res.file_size_mb} MB • {res.downloads_count} downloads
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunchQuiz(res.subject, res.title)}
                  className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Study Quiz (MCQs)</span>
                </button>

                <button
                  onClick={() => downloadResource(res.id)}
                  className="px-4 py-1.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive AI Study Quiz Modal */}
      {quizResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                  <Brain className="w-4 h-4" />
                  <span>AI Interactive Study Quiz</span>
                </div>
                <h3 className="text-base font-extrabold text-campus-navy mt-0.5">
                  {quizResource.subject}
                </h3>
              </div>
              <button
                onClick={() => setQuizResource(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {quizResource.questions.map((q, qIndex) => {
                const userSelected = selectedAnswers[qIndex];
                const isAnswered = userSelected !== undefined;
                const isCorrect = userSelected === q.correctIndex;

                return (
                  <div key={qIndex} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-xs font-bold text-campus-navy mb-3">
                      {qIndex + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                        if (showResults) {
                          if (optIndex === q.correctIndex) {
                            btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                          } else if (userSelected === optIndex) {
                            btnStyle = "bg-rose-50 border-rose-400 text-rose-800 line-through";
                          }
                        } else if (userSelected === optIndex) {
                          btnStyle = "bg-campus-navy text-white font-bold border-campus-navy";
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => {
                              if (!showResults) {
                                setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
                              }
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs rounded-xl border transition ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-3 p-3 bg-white rounded-xl border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                        <span className="font-bold text-campus-navy block mb-0.5">
                          {isCorrect ? "✓ Correct!" : "✗ Incorrect."} Explanation:
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setQuizResource(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setShowResults(!showResults)}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                {showResults ? "Retake Quiz" : "Check Answers"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-campus-navy mb-1">
              Share Educational Resource
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Help your peers with handwritten notes, formula sheets, or exam solutions.
            </p>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Data Structures & Algorithms Handwritten Notes..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Data Structures"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    placeholder="e.g. CS-214"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Department
                  </label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  >
                    <option value="Computer Science & SE">Computer Science & SE</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Architecture & Civil">Architecture & Civil</option>
                    <option value="Business & Management">Business & Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Semester
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSemester}
                    onChange={(e) => setNewSemester(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Description & Topics Covered
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline key topics, whether it covers midterms or finals, formulas included..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-campus-navy text-white text-xs font-bold rounded-xl hover:bg-campus-navy-light shadow-sm"
                >
                  Upload & Generate AI Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
