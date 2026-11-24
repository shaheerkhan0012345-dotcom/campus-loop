"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  University,
  UserProfile,
  Listing,
  LostFoundClaim,
  CommunityPost,
  PostComment,
  Opportunity,
  Project,
  ProjectApplication,
  EducationalResource,
  Tutor,
  CampusEvent,
  Conversation,
  Message,
  NotificationItem,
  UserReport,
  AdminAuditLog,
  UserRole,
} from "../types";
import {
  MOCK_UNIVERSITIES,
  MOCK_USERS,
  INITIAL_LISTINGS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_OPPORTUNITIES,
  INITIAL_PROJECTS,
  INITIAL_RESOURCES,
  INITIAL_TUTORS,
  INITIAL_EVENTS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS,
  INITIAL_AUDIT_LOGS,
} from "../mock/mockData";

interface CampusContextType {
  // Universities & Current Scope
  universities: University[];
  currentUniversity: University;
  setCurrentUniversity: (univ: University) => void;

  // Current User & Auth Switcher
  currentUser: UserProfile;
  allUsers: UserProfile[];
  switchUser: (userId: string) => void;
  updateCurrentUserProfile: (profile: Partial<UserProfile>) => void;

  // Listings (Marketplace + Lost & Found)
  listings: Listing[];
  addListing: (listing: Omit<Listing, "id" | "created_at" | "updated_at" | "views_count">) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  savedListingIds: string[];
  toggleSaveListing: (id: string) => void;

  // Lost & Found Claims
  claims: LostFoundClaim[];
  submitClaim: (listingId: string, claimNotes: string, verificationResponse?: string) => void;
  reviewClaim: (claimId: string, status: "approved" | "rejected", reviewerNotes?: string) => void;

  // Community
  posts: CommunityPost[];
  comments: Record<string, PostComment[]>;
  addPost: (title: string, content: string, category: CommunityPost["category"], imageUrl?: string) => void;
  toggleLikePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;

  // Opportunities
  opportunities: Opportunity[];
  toggleSaveOpportunity: (oppId: string) => void;
  addOpportunity: (opp: Omit<Opportunity, "id" | "created_at">) => void;

  // Projects / Teammates
  projects: Project[];
  projectApplications: ProjectApplication[];
  addProject: (proj: Omit<Project, "id" | "created_at" | "creator_id" | "creator_name">) => void;
  applyToProject: (projectId: string, pitch: string) => void;
  reviewProjectApplication: (appId: string, status: "accepted" | "rejected") => void;

  // Resources
  resources: EducationalResource[];
  addResource: (res: Omit<EducationalResource, "id" | "created_at" | "uploader_id" | "uploader_name" | "downloads_count" | "rating">) => void;
  downloadResource: (id: string) => void;

  // Tutors
  tutors: Tutor[];
  registerAsTutor: (tutorData: Omit<Tutor, "id" | "user_id" | "tutor_name" | "rating" | "reviews_count">) => void;
  requestTutoringSession: (tutorId: string, subject: string, notes: string) => void;

  // Events
  events: CampusEvent[];
  toggleRegisterEvent: (eventId: string) => void;
  addEvent: (eventData: Omit<CampusEvent, "id" | "organizer_id" | "registrations_count">) => void;

  // Messages & Realtime Chat
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  sendMessage: (conversationId: string, content: string) => void;
  startConversation: (otherUserId: string, listingId?: string, initialMessage?: string) => string;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Moderation & Reports
  reports: UserReport[];
  submitReport: (report: Omit<UserReport, "id" | "created_at" | "reporter_id" | "reporter_name" | "status">) => void;
  resolveReport: (reportId: string, status: "resolved" | "dismissed", actionTaken: string) => void;

  // Admin Audit Logs
  auditLogs: AdminAuditLog[];
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization
  const [universities] = useState<University[]>(MOCK_UNIVERSITIES);
  const [currentUniversity, setCurrentUniversity] = useState<University>(MOCK_UNIVERSITIES[0]);
  const [allUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]); // Default: Hamza Tariq (Student)

  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [savedListingIds, setSavedListingIds] = useState<string[]>(["mp-001"]);
  const [claims, setClaims] = useState<LostFoundClaim[]>([
    {
      id: "claim-001",
      listing_id: "lf-002",
      claimant_id: "user-hamza",
      claimant_name: "Hamza Tariq",
      status: "pending",
      claim_notes: "This Casio calculator was on my desk during the Differential Equations exam.",
      verification_response: "It has a green sticker on the back of the sliding cover.",
      created_at: new Date().toISOString(),
    },
  ]);

  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [comments, setComments] = useState<Record<string, PostComment[]>>({
    "post-001": [
      {
        id: "c-1",
        post_id: "post-001",
        user_id: "user-ayesha",
        author_name: "Ayesha Malik",
        content: "Super helpful! Especially the mutex locks part. Thank you!",
        created_at: "2026-11-23T09:30:00Z",
      },
    ],
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [projectApplications, setProjectApplications] = useState<ProjectApplication[]>([
    {
      id: "app-001",
      project_id: "proj-001",
      applicant_id: "user-zayd",
      applicant_name: "Zayd Ahmed",
      applicant_department: "Computer Science",
      applicant_skills: ["Python", "PyTorch", "Computer Vision"],
      pitch: "I have trained YOLO models for drone datasets during my summer lab. Would love to collaborate!",
      status: "pending",
      created_at: "2026-11-21T10:00:00Z",
    },
  ]);

  const [resources, setResources] = useState<EducationalResource[]>(INITIAL_RESOURCES);
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reports, setReports] = useState<UserReport[]>(INITIAL_REPORTS);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(INITIAL_AUDIT_LOGS);

  // Switch Active User / Persona
  const switchUser = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      // Auto switch current university if matches user's affiliation
      const univ = universities.find((u) => u.id === user.university_id);
      if (univ) setCurrentUniversity(univ);
    }
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  // Listings CRUD
  const addListing = (data: Omit<Listing, "id" | "created_at" | "updated_at" | "views_count">): Listing => {
    const newListing: Listing = {
      ...data,
      id: `listing-${Date.now()}`,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
      views_count: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setListings((prev) => [newListing, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: currentUser.id,
      type: "system",
      title: "Listing Published",
      message: `Your ${data.type} listing "${data.title}" is now active in ${currentUniversity.short_name}.`,
      link_url: data.type === "marketplace" ? `/marketplace/${newListing.id}` : `/lost-and-found/${newListing.id}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newListing;
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item))
    );
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSaveListing = (id: string) => {
    setSavedListingIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Lost & Found Claims
  const submitClaim = (listingId: string, claimNotes: string, verificationResponse?: string) => {
    const newClaim: LostFoundClaim = {
      id: `claim-${Date.now()}`,
      listing_id: listingId,
      claimant_id: currentUser.id,
      claimant_name: currentUser.full_name,
      status: "pending",
      claim_notes: claimNotes,
      verification_response: verificationResponse,
      created_at: new Date().toISOString(),
    };
    setClaims((prev) => [newClaim, ...prev]);

    // Notify the item poster
    const targetListing = listings.find((l) => l.id === listingId);
    if (targetListing) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: targetListing.user_id,
        type: "claim",
        title: "New Ownership Claim Received",
        message: `${currentUser.full_name} submitted a claim verification for "${targetListing.title}".`,
        link_url: `/lost-and-found/${listingId}`,
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const reviewClaim = (claimId: string, status: "approved" | "rejected", reviewerNotes?: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status, reviewer_notes: reviewerNotes } : c))
    );
  };

  // Community Hub
  const addPost = (title: string, content: string, category: CommunityPost["category"], imageUrl?: string) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      university_id: currentUniversity.id,
      user_id: currentUser.id,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
      author_department: `${currentUser.department} (${currentUser.degree_program})`,
      category,
      title,
      content,
      image_url: imageUrl,
      likes_count: 0,
      comments_count: 0,
      has_liked: false,
      created_at: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const liked = !p.has_liked;
          return {
            ...p,
            has_liked: liked,
            likes_count: liked ? p.likes_count + 1 : Math.max(0, p.likes_count - 1),
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    const newComment: PostComment = {
      id: `com-${Date.now()}`,
      post_id: postId,
      user_id: currentUser.id,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
      content,
      created_at: new Date().toISOString(),
    };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p))
    );
  };

  // Opportunities
  const toggleSaveOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, is_saved: !o.is_saved } : o))
    );
  };

  const addOpportunity = (oppData: Omit<Opportunity, "id" | "created_at">) => {
    const newOpp: Opportunity = {
      ...oppData,
      id: `opp-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setOpportunities((prev) => [newOpp, ...prev]);
  };

  // Projects / Find a Teammate
  const addProject = (projData: Omit<Project, "id" | "created_at" | "creator_id" | "creator_name">) => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      university_id: currentUniversity.id,
      creator_id: currentUser.id,
      creator_name: currentUser.full_name,
      creator_avatar: currentUser.avatar_url,
      created_at: new Date().toISOString(),
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const applyToProject = (projectId: string, pitch: string) => {
    const newApp: ProjectApplication = {
      id: `app-${Date.now()}`,
      project_id: projectId,
      applicant_id: currentUser.id,
      applicant_name: currentUser.full_name,
      applicant_department: currentUser.department,
      applicant_skills: currentUser.skills,
      pitch,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setProjectApplications((prev) => [newApp, ...prev]);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, has_applied: true } : p))
    );
  };

  const reviewProjectApplication = (appId: string, status: "accepted" | "rejected") => {
    setProjectApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status } : a))
    );
  };

  // Resources
  const addResource = (resData: Omit<EducationalResource, "id" | "created_at" | "uploader_id" | "uploader_name" | "downloads_count" | "rating">) => {
    const newRes: EducationalResource = {
      ...resData,
      id: `res-${Date.now()}`,
      university_id: currentUniversity.id,
      uploader_id: currentUser.id,
      uploader_name: currentUser.full_name,
      downloads_count: 0,
      rating: 5.0,
      created_at: new Date().toISOString(),
    };
    setResources((prev) => [newRes, ...prev]);
  };

  const downloadResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloads_count: r.downloads_count + 1 } : r))
    );
  };

  // Tutors
  const registerAsTutor = (tutorData: Omit<Tutor, "id" | "user_id" | "tutor_name" | "rating" | "reviews_count">) => {
    const newTutor: Tutor = {
      ...tutorData,
      id: `tutor-${Date.now()}`,
      user_id: currentUser.id,
      tutor_name: currentUser.full_name,
      tutor_avatar: currentUser.avatar_url,
      rating: 5.0,
      reviews_count: 1,
    };
    setTutors((prev) => [newTutor, ...prev]);
  };

  const requestTutoringSession = (tutorId: string, subject: string, notes: string) => {
    const targetTutor = tutors.find((t) => t.id === tutorId);
    if (targetTutor) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: targetTutor.user_id,
        type: "system",
        title: "New Tutoring Request",
        message: `${currentUser.full_name} requested a tutoring session for ${subject}: "${notes}".`,
        link_url: "/tutoring",
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  // Events
  const toggleRegisterEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const registered = !e.is_registered;
          return {
            ...e,
            is_registered: registered,
            registrations_count: registered ? e.registrations_count + 1 : Math.max(0, e.registrations_count - 1),
          };
        }
        return e;
      })
    );
  };

  const addEvent = (eventData: Omit<CampusEvent, "id" | "organizer_id" | "registrations_count">) => {
    const newEvent: CampusEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      organizer_id: currentUser.id,
      registrations_count: 1,
      is_registered: true,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  // Messaging
  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUser.id,
      content,
      created_at: new Date().toISOString(),
      is_read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            last_message: {
              content,
              created_at: newMsg.created_at,
              is_read: false,
              sender_id: currentUser.id,
            },
          };
        }
        return conv;
      })
    );
  };

  const startConversation = (otherUserId: string, listingId?: string, initialMessage?: string): string => {
    const otherUser = allUsers.find((u) => u.id === otherUserId) || allUsers[1];
    const listing = listingId ? listings.find((l) => l.id === listingId) : undefined;
    const existing = conversations.find(
      (c) => c.other_user.id === otherUserId && (!listingId || c.listing_id === listingId)
    );

    if (existing) {
      if (initialMessage) sendMessage(existing.id, initialMessage);
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      listing_id: listingId,
      listing_title: listing?.title,
      listing_price: listing?.price_pkr,
      listing_image: listing?.images[0],
      other_user: {
        id: otherUser.id,
        full_name: otherUser.full_name,
        avatar_url: otherUser.avatar_url,
        department: otherUser.department,
      },
      last_message: {
        content: initialMessage || "Started a new conversation",
        created_at: new Date().toISOString(),
        is_read: true,
        sender_id: currentUser.id,
      },
      unread_count: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    if (initialMessage) {
      setMessages((prev) => ({
        ...prev,
        [newConvId]: [
          {
            id: `msg-${Date.now()}`,
            conversation_id: newConvId,
            sender_id: currentUser.id,
            content: initialMessage,
            created_at: new Date().toISOString(),
            is_read: true,
          },
        ],
      }));
    }
    return newConvId;
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  // Moderation & Reports
  const submitReport = (reportData: Omit<UserReport, "id" | "created_at" | "reporter_id" | "reporter_name" | "status">) => {
    const newReport: UserReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      reporter_id: currentUser.id,
      reporter_name: currentUser.full_name,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
  };

  const resolveReport = (reportId: string, status: "resolved" | "dismissed", actionTaken: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status } : r))
    );
    // Add audit log
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}`,
      admin_id: currentUser.id,
      admin_name: currentUser.full_name,
      action: `REPORT_${status.toUpperCase()}`,
      target_type: "User Report",
      target_id: reportId,
      details: actionTaken,
      created_at: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <CampusContext.Provider
      value={{
        universities,
        currentUniversity,
        setCurrentUniversity,
        currentUser,
        allUsers,
        switchUser,
        updateCurrentUserProfile,
        listings,
        addListing,
        updateListing,
        deleteListing,
        savedListingIds,
        toggleSaveListing,
        claims,
        submitClaim,
        reviewClaim,
        posts,
        comments,
        addPost,
        toggleLikePost,
        addComment,
        opportunities,
        toggleSaveOpportunity,
        addOpportunity,
        projects,
        projectApplications,
        addProject,
        applyToProject,
        reviewProjectApplication,
        resources,
        addResource,
        downloadResource,
        tutors,
        registerAsTutor,
        requestTutoringSession,
        events,
        toggleRegisterEvent,
        addEvent,
        conversations,
        messages,
        sendMessage,
        startConversation,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        reports,
        submitReport,
        resolveReport,
        auditLogs,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error("useCampus must be used within a CampusProvider");
  }
  return context;
};
