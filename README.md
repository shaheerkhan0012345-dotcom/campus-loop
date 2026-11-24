# CampusLoop — Everything on Campus, Connected

**CampusLoop** is a production-oriented, all-in-one university community platform designed specifically for higher education institutions. Initially architected for universities across Pakistan (NUST, LUMS, FAST-NUCES, GIKI, NED, etc.), CampusLoop features a multi-tenant database structure that seamlessly supports multiple universities.

---

## 🌟 Key Highlights & Modules

### 1. 🔍 Lost & Found with AI Matching (Module A)
- **Report Missing Belongings & Found Property**: Capture titles, detailed physical descriptions, general campus locations, categories, and photographs.
- **AI Computer Vision & Embedding Matching**: Automatically computes cosine and semantic feature similarity between lost and found reports. Suggests potential matches with real-time confidence scores (e.g. *94% Match*).
- **Fraud Prevention & Secret Verification**: Finders can issue secret verification questions (e.g. *"What sticker is on the back cover?"*). Claimants must answer before handover, and sensitive identifying answers are kept cryptographically private.
- **Anonymous Found Listings**: Protects the privacy of honest student finders until legitimate ownership is established.

### 2. 🛒 Campus Marketplace (Module B)
- **Student Peer-to-Peer Trading in PKR**: Buy and sell textbooks, electronics, scientific calculators, lab equipment, and hostel furniture.
- **Condition Grading**: Clear labels for *Brand New*, *Like New*, *Good*, and *Fair*.
- **Safe Campus Handover Rules**: No online payment gateways required—students exchange items safely in university commons, cafeterias, and libraries.
- **Filters & Search**: Fast filtering by price range in PKR, category, condition, and newest arrivals.
- **Seller Management**: Sellers can mark items as *Reserved* or *Sold*, edit details, and delete listings.

### 3. 💬 Community Hub (Module C)
- **Discussion Channels**: Structured into *Technology & Code*, *Academics & Exams*, *Campus Life & Food*, *Career & Internships*, *Questions & Help*, and *Startups*.
- **Interactive Threads**: Upvote posts, participate in nested comment threads, and view verified departmental credentials of authors.
- **Code of Conduct Enforcement**: Integrated reporting modal allowing students to flag academic dishonesty, leaked exam papers, or spam directly to university administrators.

### 4. 🚀 Opportunities Board (Module D)
- **Centralized Discovery**: Curated listings of corporate software engineering internships (e.g. Systems Ltd), government HEC need-based scholarships, national hackathons (e.g. Ignite AI Climate Hackathon), and workshops.
- **AI Skill Matching Engine**: Compares student tech stacks and departments against listing requirements, displaying personalized percentage match scores.
- **Deadline Countdown & Official Links**: Real-time closing countdowns and direct redirects to verified external application portals.

### 5. 🤝 Find a Teammate (Module E)
- **Interdisciplinary Collaboration**: Post recruitment notices for hackathons, Final Year Projects (FYP), robotics competitions, and student startups.
- **Role & Skill Requirements**: Specify required technical proficiencies (Python, Next.js, YOLO, OpenCV, Blender).
- **Application Workflow**: Candidates apply with custom pitches; project creators can accept or decline applicants in real time.
- **AI Teammate Recommender**: Suggests complementary students based on overlapping skillsets.

### 6. 📚 Notes & Educational Resources (Module F)
- **Academic Repository**: Download verified handwritten lecture notes, formula cheat sheets, solved midterm past papers, and lab manuals.
- **AI Document Summarizer**: Instant synopsis of core examinable concepts for quick revision.
- **Interactive AI Study Quiz**: Generates multi-choice study questions (MCQs) from course materials with instant answers and explanatory notes.

### 7. 🎓 Peer Tutoring Network (Module G)
- **Student-to-Student Mentorship**: Top senior students and Teaching Assistants offer 1-on-1 exam prep.
- **Transparent Rates**: Supports both paid tutoring in PKR and 100% free volunteer academic mentors.
- **Session Booking**: Students request session times, outline course doubts, and leave verified ratings.

### 8. 🎟️ Events & Activities (Module H)
- **Campus Life Central**: Seminars, technical summits, design showcases, cultural nights, and sports galas.
- **1-Click Digital Passes**: Reserve free student entry passes with instant digital ticket codes.
- **Auditorium Capacity Tracking**: Visual capacity indicators show remaining seats in real time.

### 9. 🛡️ University Administration & Moderation (Module I)
- **Protected Command Center**: Accessible only to users with `university_admin` or `super_admin` roles.
- **Moderation Queue**: Review student reports, investigate flagged content, and enforce penalties.
- **Immutable Audit Trail**: Logs all administrative interventions, listing deletions, and status overrides.
- **Multi-Tenant Settings**: Manage institutional email domains (e.g. `@nust.edu.pk`, `@lums.edu.pk`, `@nu.edu.pk`).

### 10. 💬 Realtime In-App Messaging & Notifications
- **Private 1-on-1 Chat**: Chat safely without publicly disclosing private WhatsApp or phone numbers.
- **Listing Context Headers**: In-chat preview cards show the active marketplace item or lost belonging under discussion.
- **Live Notifications**: Alerts for AI item matches, incoming ownership claims, and upcoming event reminders.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | **Next.js 14** (App Router, Server & Client Components) |
| **Language & Types** | **TypeScript 5**, React 18 |
| **Styling & Design System** | **Tailwind CSS**, Lucide Icons, Custom Radix-style UI |
| **Color Palette** | Primary: Deep Navy Blue (`#142B49`), Secondary: Teal (`#16A085`), Clean Neutrals |
| **Backend & Database** | **Supabase (PostgreSQL 15)** with Row Level Security (RLS) |
| **Auth & Security** | Supabase Auth (Institutional email verification, RBAC) |
| **AI Services** | **Google Gemini AI** (embeddings, vision similarity, semantic search, quiz generator) with resilient heuristic fallbacks |
| **Validation** | Zod input schemas, strict TypeScript typing |

---

## 📁 Repository Structure

```
campusloop/
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql    # 27 relational tables with RLS policies & indexes
│   └── seed.sql                      # Realistic Pakistan university seed ecosystem
├── src/
│   ├── app/
│   │   ├── (auth)/                   # Login & registration portals
│   │   ├── (public)/                 # About, Contact, Terms, Privacy
│   │   ├── admin/                    # Administrator console, reports, and audit trail
│   │   ├── community/                # Discussion boards & threads
│   │   ├── dashboard/                # Personalized student dashboard
│   │   ├── events/                   # Campus gatherings & digital ticketing
│   │   ├── lost-and-found/           # Lost & found recovery with AI match viewer
│   │   ├── marketplace/              # Peer-to-peer campus marketplace in PKR
│   │   ├── messages/                 # Private realtime student chat
│   │   ├── my-listings/              # Personal item management
│   │   ├── notifications/            # Alerts & AI match notification center
│   │   ├── opportunities/            # Internships, HEC scholarships, & hackathons
│   │   ├── profile/                  # Student credentials, skills, & verification
│   │   ├── resources/                # Educational notes, AI summaries, & MCQ quizzes
│   │   ├── teammates/                # Hackathon & FYP teammate recruitment
│   │   ├── tutoring/                 # Peer tutoring booking & mentor profiles
│   │   ├── globals.css               # Global CSS & Tailwind definitions
│   │   ├── layout.tsx                # Root layout with Navbar and Footer
│   │   └── page.tsx                  # Brand homepage & live metrics
│   ├── components/
│   │   ├── lost-and-found/           # Claim modal & AI similarity viewer
│   │   └── ui/                       # Connected-loop logo, Navbar, modals, badges, search
│   └── lib/
│       ├── ai/                       # Gemini AI & intelligent heuristic services
│       ├── mock/                     # Seed data mirroring PostgreSQL schema
│       ├── store/                    # Interactive reactive store with persona switcher
│       ├── supabase/                 # Browser, server, and SSR Supabase clients
│       ├── types/                    # Domain data models & TypeScript definitions
│       └── utils.ts                  # Currency (PKR), time, & styling formatters
├── .env.example                      # Production environment template
├── .env.local                        # Local development variables
├── package.json                      # Dependencies & build scripts
├── tailwind.config.ts                # Brand colors (#142B49, #16A085)
└── tsconfig.json                     # Strict TypeScript compiler options
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0 or newer (tested on Node v24)
- **npm** or **pnpm**

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd "campus loop"
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# Google Gemini AI Key (Optional: Heuristic fallback active if omitted)
GEMINI_API_KEY="your-gemini-api-key"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
> **Note**: CampusLoop features **Zero-Friction Local Testing**. If Supabase credentials are left empty, CampusLoop immediately activates a high-fidelity local state engine pre-seeded with Pakistani university student profiles, items, hackathons, and discussions. You can test all 9 modules without any initial setup!

### 4. Database Setup (Supabase / PostgreSQL)
1. In your **Supabase Dashboard**, navigate to **SQL Editor**.
2. Run `supabase/migrations/001_initial_schema.sql` to generate all 27 tables, UUID keys, foreign constraints, indexes, and Row Level Security policies.
3. Run `supabase/seed.sql` to populate initial universities (NUST, LUMS, FAST-NUCES, GIKI, NED), sample student profiles, listings, and hackathons.

### 5. Running the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 6. Building for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security Architecture

1. **Supabase Row Level Security (RLS)**:
   - Sensitive tables (`profiles`, `messages`, `lost_found_claims`, `user_reports`, `admin_audit_logs`) enforce strict PostgreSQL policies ensuring only authorized users can read or write their records.
2. **Owner-Only Mutations**:
   - Students can only update or delete content they authored.
3. **Privileged Access Control (RBAC)**:
   - 4 user tiers: `student`, `moderator`, `university_admin`, and `super_admin`.
4. **Data Privacy**:
   - Private phone numbers and personal emails are never exposed publicly.
   - Ownership verification challenge answers remain hidden from other claimants.
5. **Audit Logging**:
   - All moderation actions, listing suspensions, and report resolutions are recorded in `admin_audit_logs`.

---

## 👥 Personas Included for Testing

Use the active persona switcher in the top navigation bar to test the platform from multiple user perspectives:
- **Hamza Tariq (Student, NUST)**: SEECS Software Engineering student, seller of the Logitech MX Master mouse, creator of the Lost Casio calculator report.
- **Ayesha Malik (Student, NUST)**: SADA Architecture student, finder of the Casio calculator in LH-3, seeking VR teammate.
- **Zayd Ahmed (Moderator / TA, LUMS)**: Senior CS student, peer tutor for Calculus & Linear Algebra, claimant of found AirPods.
- **CampusLoop Directorate (University Admin)**: Full administrative access to the Admin Command Center, moderation queue, and audit trail.

---

## 📄 License
CampusLoop is released under the **MIT License**. Built for the Pakistani university community.
