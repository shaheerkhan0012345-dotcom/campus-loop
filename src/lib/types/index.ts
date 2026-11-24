export type UserRole = 'student' | 'moderator' | 'university_admin' | 'super_admin';

export interface University {
  id: string;
  name: string;
  short_name: string;
  slug: string;
  domain: string;
  country: string;
  city: string;
  logo_url: string;
  banner_url?: string;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  university_id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  department: string;
  degree_program: string;
  semester: number;
  student_id: string;
  phone?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  is_verified: boolean;
  role: UserRole;
  created_at: string;
}

export type ListingType = 'marketplace' | 'lost' | 'found';
export type ListingStatus = 'active' | 'reserved' | 'sold' | 'resolved' | 'archived';
export type ItemCondition = 'new' | 'like_new' | 'good' | 'fair';

export interface Listing {
  id: string;
  university_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  type: ListingType;
  title: string;
  description: string;
  category: string;
  price_pkr?: number;
  condition?: ItemCondition;
  status: ListingStatus;
  location_name: string;
  date_occurred?: string;
  is_anonymous_found?: boolean;
  verification_question?: string;
  verification_answer_hash?: string;
  images: string[];
  visual_labels?: string[];
  tags: string[];
  views_count: number;
  created_at: string;
  updated_at: string;
  // AI matching score when compared against search or counter item
  ai_match_score?: number;
  ai_match_reason?: string;
}

export interface LostFoundClaim {
  id: string;
  listing_id: string;
  claimant_id: string;
  claimant_name: string;
  status: 'pending' | 'approved' | 'rejected';
  claim_notes: string;
  verification_response?: string;
  proof_image_url?: string;
  reviewer_notes?: string;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  university_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  author_department: string;
  category: 'general' | 'technology' | 'education' | 'campus_life' | 'career' | 'help' | 'entrepreneurship';
  title: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  has_liked?: boolean;
  is_pinned?: boolean;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  created_at: string;
}

export interface Opportunity {
  id: string;
  university_id?: string;
  title: string;
  organization: string;
  type: 'internship' | 'scholarship' | 'hackathon' | 'competition' | 'volunteer' | 'workshop' | 'training';
  description: string;
  eligibility: string;
  location: string;
  deadline: string;
  external_link: string;
  stipend_or_award?: string;
  tags: string[];
  is_verified: boolean;
  is_saved?: boolean;
  ai_summary?: string;
  created_at: string;
}

export interface Project {
  id: string;
  university_id: string;
  creator_id: string;
  creator_name: string;
  creator_avatar?: string;
  title: string;
  category: 'hackathon' | 'software' | 'research' | 'entrepreneurship' | 'assignment' | 'robotics' | 'design' | 'competition';
  description: string;
  required_skills: string[];
  members_needed: number;
  members_current: number;
  status: 'recruiting' | 'in_progress' | 'completed';
  deadline?: string;
  created_at: string;
  has_applied?: boolean;
}

export interface ProjectApplication {
  id: string;
  project_id: string;
  applicant_id: string;
  applicant_name: string;
  applicant_department: string;
  applicant_skills: string[];
  pitch: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface EducationalResource {
  id: string;
  university_id: string;
  uploader_id: string;
  uploader_name: string;
  title: string;
  description: string;
  subject: string;
  course_code?: string;
  department: string;
  semester: number;
  file_url: string;
  file_size_mb: number;
  file_type: 'pdf' | 'docx' | 'pptx' | 'zip';
  ai_summary?: string;
  downloads_count: number;
  rating: number;
  created_at: string;
}

export interface Tutor {
  id: string;
  user_id: string;
  tutor_name: string;
  tutor_avatar?: string;
  department: string;
  degree_program: string;
  university_id: string;
  subjects: string[];
  bio: string;
  experience_years: number;
  hourly_rate_pkr: number; // 0 for volunteer
  rating: number;
  reviews_count: number;
  availability: string[];
}

export interface CampusEvent {
  id: string;
  university_id: string;
  organizer_id: string;
  organizer_name: string;
  title: string;
  category: 'seminar' | 'workshop' | 'sports' | 'cultural' | 'competition' | 'hackathon' | 'society' | 'conference';
  description: string;
  venue: string;
  start_time: string;
  end_time: string;
  image_url?: string;
  capacity: number;
  registrations_count: number;
  is_registered?: boolean;
}

export interface Conversation {
  id: string;
  listing_id?: string;
  listing_title?: string;
  listing_price?: number;
  listing_image?: string;
  other_user: {
    id: string;
    full_name: string;
    avatar_url?: string;
    department?: string;
  };
  last_message: {
    content: string;
    created_at: string;
    is_read: boolean;
    sender_id: string;
  };
  unread_count: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: 'message' | 'claim' | 'match' | 'event' | 'opportunity' | 'system';
  title: string;
  message: string;
  link_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface UserReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  reported_user_id?: string;
  content_type: 'listing' | 'post' | 'comment' | 'resource' | 'user' | 'message';
  content_id: string;
  content_preview: string;
  reason: string;
  description?: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  action: string;
  target_type: string;
  target_id: string;
  details: string;
  created_at: string;
}
