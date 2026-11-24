"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCampus } from "@/lib/store/campusStore";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Ticket,
  PlusCircle,
  Search,
} from "lucide-react";

export default function EventsActivitiesPage() {
  const { events, toggleRegisterEvent, addEvent, currentUser, currentUniversity } = useCampus();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<any>("seminar");
  const [newVenue, setNewVenue] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCapacity, setNewCapacity] = useState(150);

  const categories = [
    { id: "all", label: "All Events" },
    { id: "conference", label: "Conferences & Tech" },
    { id: "workshop", label: "Workshops" },
    { id: "cultural", label: "Arts & Cultural" },
    { id: "sports", label: "Sports" },
    { id: "competition", label: "Competitions" },
  ];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVenue.trim()) return;

    addEvent({
      university_id: currentUniversity.id,
      organizer_name: currentUser.full_name,
      title: newTitle,
      category: newCategory,
      description: newDescription,
      venue: newVenue,
      start_time: new Date(Date.now() + 86400000 * 7).toISOString(),
      end_time: new Date(Date.now() + 86400000 * 7 + 14400000).toISOString(),
      capacity: newCapacity,
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    });

    setNewTitle("");
    setNewVenue("");
    setNewDescription("");
    setShowCreateModal(false);
  };

  const filteredEvents = events
    .filter((e) => (activeCategory === "all" ? true : e.category === activeCategory))
    .filter((e) =>
      searchQuery.trim() === ""
        ? true
        : e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.organizer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-navy rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-400/20 text-indigo-300">
              <Calendar className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Campus Life & Gatherings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Events & Activities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Discover student society workshops, tech summits, annual sports galas, and design
            showcases happening at {currentUniversity.name}.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-campus-teal hover:bg-campus-teal-dark text-white font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Society Event</span>
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
              placeholder="Search DevCon, auditorium, SADA, workshop..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-campus-teal/30 focus:border-campus-teal transition"
            />
          </div>
        </div>
      </div>

      {/* Events Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => {
          const registered = event.is_registered;
          const pctCapacity = Math.round((event.registrations_count / event.capacity) * 100);

          return (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-cardHover transition flex flex-col justify-between"
            >
              <div>
                {/* Event Photo */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-900/80 text-white px-2.5 py-1 rounded-full backdrop-blur-md">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-bold bg-white text-campus-navy px-2.5 py-1 rounded-full shadow-sm">
                      {formatDate(event.start_time)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-campus-teal block mb-1">
                    Organized by: {event.organizer_name}
                  </span>
                  <h3 className="text-lg font-extrabold text-campus-navy mb-2">{event.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{event.description}</p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-700">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>Registrations ({event.registrations_count} / {event.capacity})</span>
                      <span>{pctCapacity}% Full</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-campus-teal rounded-full"
                        style={{ width: `${Math.min(100, pctCapacity)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Free University Entry</span>
                  <button
                    onClick={() => toggleRegisterEvent(event.id)}
                    className={`px-5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm ${
                      registered
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-campus-navy text-white hover:bg-campus-navy-light"
                    }`}
                  >
                    {registered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Registered (Ticket Confirmed)</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        <span>Reserve Free Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-campus-navy mb-1">Publish Campus Event</h3>
            <p className="text-xs text-slate-500 mb-4">
              Authorized university administrators and approved student society organizers.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI & Cloud Architecture Summit 2027"
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
                    <option value="seminar">Seminar / Conference</option>
                    <option value="workshop">Technical Workshop</option>
                    <option value="cultural">Cultural / Arts</option>
                    <option value="sports">Sports Gala</option>
                    <option value="competition">Competition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-campus-navy mb-1">
                    Auditorium Capacity
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Campus Venue *
                </label>
                <input
                  type="text"
                  required
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  placeholder="e.g. Jinnah Auditorium, SADA Exhibition Hall"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-campus-navy mb-1">
                  Event Description & Agenda *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline speakers, timing, workshops, rules, and who can attend..."
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
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
