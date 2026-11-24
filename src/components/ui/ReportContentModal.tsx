"use client";

import React, { useState } from "react";
import { Modal } from "./Modal";
import { useCampus } from "@/lib/store/campusStore";
import { AlertTriangle, Send } from "lucide-react";

interface ReportContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: "listing" | "post" | "comment" | "resource" | "user" | "message";
  contentId: string;
  contentPreview: string;
  reportedUserId?: string;
}

export const ReportContentModal: React.FC<ReportContentModalProps> = ({
  isOpen,
  onClose,
  contentType,
  contentId,
  contentPreview,
  reportedUserId,
}) => {
  const { submitReport } = useCampus();
  const [reason, setReason] = useState("Academic Dishonesty / Code Violation");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      content_type: contentType,
      content_id: contentId,
      content_preview: contentPreview,
      reported_user_id: reportedUserId,
      reason,
      description,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  const reportReasons = [
    "Academic Dishonesty / Code Violation",
    "Spam, Scam, or Counterfeit Listing",
    "Harassment or Abusive Behavior",
    "Copyright Infringement",
    "False or Misleading Information",
    "Prohibited Campus Items",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report Content or User"
      subtitle="All reports are sent directly to university administrators and campus moderators."
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-8 text-center animate-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-campus-navy">Report Submitted Successfully</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Thank you for helping keep our university community safe. A campus moderator will review this item.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Reported Item ({contentType})
            </span>
            <p className="text-xs font-medium text-slate-700 italic line-clamp-2">
              "{contentPreview}"
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Reason for Report *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal"
            >
              {reportReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1.5">
              Additional Details & Evidence (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide any relevant context or links that will assist the moderation team..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Report
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
