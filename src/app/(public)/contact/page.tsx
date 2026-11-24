"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-campus-navy">Help & University Support</h1>
        <p className="text-sm text-slate-500 mt-2">
          Have inquiries regarding institutional onboarding, account verification, or safety?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-campus-navy">Get in Touch</h2>
          <div className="space-y-4 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-campus-teal shrink-0" />
              <div>
                <p className="font-bold text-campus-navy">General Inquiries</p>
                <p>support@campusloop.pk</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-campus-teal shrink-0" />
              <div>
                <p className="font-bold text-campus-navy">Campus Directorate Helpline</p>
                <p>+92 51 9085 1000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-campus-teal shrink-0" />
              <div>
                <p className="font-bold text-campus-navy">Headquarters</p>
                <p>National Incubation Center, Islamabad, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-campus-teal mx-auto mb-3" />
              <h3 className="text-base font-bold text-campus-navy">Message Dispatched</h3>
              <p className="text-xs text-slate-500 mt-1">
                Our student support team will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@university.edu.pk"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your inquiry or university onboarding request..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-campus-navy hover:bg-campus-navy-light text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
