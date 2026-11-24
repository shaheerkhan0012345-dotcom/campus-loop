import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CampusProvider } from "@/lib/store/campusStore";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CampusLoop — Everything on Campus, Connected",
  description:
    "An all-in-one university community ecosystem for Pakistani higher education. Lost & Found with AI matching, Campus Marketplace in PKR, Peer Tutoring, Projects, Notes, Opportunities, and Events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <CampusProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CampusProvider>
      </body>
    </html>
  );
}
