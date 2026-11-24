import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6 text-xs text-slate-700 leading-relaxed">
        <h1 className="text-2xl font-extrabold text-campus-navy">Terms of Service & Code of Conduct</h1>
        <p className="text-slate-400">Effective Date: Academic Session 2026-2027</p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">1. Institutional Eligibility</h2>
        <p>
          CampusLoop is exclusively intended for currently enrolled students, faculty, and authorized
          administrative staff of registered universities and colleges in Pakistan. Users agree to provide
          accurate credentials during registration.
        </p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">2. Academic Integrity Enforcement</h2>
        <p>
          Selling, leaking, or distributing confidential examination papers, assignments, or unauthorized
          copyrighted material is strictly prohibited. Violations result in immediate suspension and referral
          to the respective University Disciplinary Committee.
        </p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">3. Marketplace Transactions</h2>
        <p>
          CampusLoop operates as a peer-to-peer campus communication platform. Payments in Pakistani Rupees
          (PKR) are executed directly between buyers and sellers during physical handover on campus premises.
          CampusLoop does not act as an escrow agent.
        </p>

        <h2 className="text-sm font-bold text-campus-navy uppercase">4. Lost & Found Claims</h2>
        <p>
          False claiming of belongings is an offense under the university code of conduct. Finders retain the
          right to request verifiable proof before transferring property.
        </p>
      </div>
    </div>
  );
}
