"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Listing } from "@/lib/types";
import { useCampus } from "@/lib/store/campusStore";
import { ShieldCheck, HelpCircle, Send, CheckCircle2 } from "lucide-react";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ isOpen, onClose, listing }) => {
  const { submitClaim, currentUser } = useCampus();
  const [claimNotes, setClaimNotes] = useState("");
  const [verificationResponse, setVerificationResponse] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimNotes.trim()) return;

    submitClaim(listing.id, claimNotes, verificationResponse);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verify & Claim Belonging"
      subtitle="To prevent fraudulent claims, provide identifying details known only to the true owner."
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-8 text-center animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-campus-teal flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-campus-navy">Ownership Claim Submitted</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Your verification answer has been securely delivered to the finder. You will receive a
            notification and internal chat message once approved.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Claiming Item
            </span>
            <p className="text-xs font-bold text-campus-navy">{listing.title}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Found at: {listing.location_name}
            </p>
          </div>

          {/* Secret Verification Question (if finder provided one) */}
          {listing.verification_question && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Finder's Verification Challenge:
              </div>
              <p className="text-xs text-slate-700 italic mb-2">
                "{listing.verification_question}"
              </p>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Your Answer *
              </label>
              <input
                type="text"
                required
                value={verificationResponse}
                onChange={(e) => setVerificationResponse(e.target.value)}
                placeholder="e.g. Exact sticker description, serial digits, lock code, etc."
                className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-campus-navy mb-1">
              Proof of Ownership / Circumstances *
            </label>
            <textarea
              required
              rows={3}
              value={claimNotes}
              onChange={(e) => setClaimNotes(e.target.value)}
              placeholder="Describe when and where you lost it, any distinguishing marks, scratches, or unique contents..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-campus-teal shrink-0 mt-0.5" />
            <span>
              False claims violate the university student code of conduct. The finder's contact
              information remains protected until the claim is reviewed.
            </span>
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
              className="px-4 py-2 text-xs font-bold bg-campus-navy text-white rounded-lg hover:bg-campus-navy-light transition flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Claim
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
