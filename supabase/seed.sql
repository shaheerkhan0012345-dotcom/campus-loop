-- ============================================================================
-- CAMPUSLOOP SEED DATA (PAKISTANI UNIVERSITIES & SAMPLE ECOSYSTEM)
-- ============================================================================

-- 1. Seed Universities
INSERT INTO public.universities (id, name, short_name, slug, domain, country, city, logo_url, is_active)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'National University of Sciences & Technology', 'NUST', 'nust-islamabad', 'nust.edu.pk', 'Pakistan', 'Islamabad', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200', true),
    ('22222222-2222-2222-2222-222222222222', 'Lahore University of Management Sciences', 'LUMS', 'lums-lahore', 'lums.edu.pk', 'Pakistan', 'Lahore', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200', true),
    ('33333333-3333-3333-3333-333333333333', 'FAST National University of Computer & Emerging Sciences', 'FAST-NUCES', 'fast-nu', 'nu.edu.pk', 'Pakistan', 'Islamabad / Lahore / Karachi', 'https://images.unsplash.com/photo-1562774053-701939374585?w=200', true),
    ('44444444-4444-4444-4444-444444444444', 'Ghulam Ishaq Khan Institute of Engineering Sciences and Technology', 'GIKI', 'giki-topi', 'giki.edu.pk', 'Pakistan', 'Topi, KPK', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200', true),
    ('55555555-5555-5555-5555-555555555555', 'NED University of Engineering and Technology', 'NED', 'ned-karachi', 'neduet.edu.pk', 'Pakistan', 'Karachi', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200', true)
ON CONFLICT (slug) DO NOTHING;

-- 2. Seed Sample Profiles (Demo UUIDs)
INSERT INTO public.profiles (id, university_id, full_name, email, avatar_url, department, degree_program, semester, student_id, phone, bio, skills, interests, is_verified)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Hamza Tariq', 'hamza.tariq@seecs.nust.edu.pk', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', 'SEECS', 'BS Software Engineering', 6, '2021-SE-104', '+92 300 1234567', 'Full-stack developer interested in distributed systems, Next.js, and open-source campus tools.', ARRAY['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Python'], ARRAY['Hackathons', 'Cricket', 'Robotics'], true),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Ayesha Malik', 'ayesha.malik@sada.nust.edu.pk', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', 'SADA', 'Bachelor of Architecture', 4, '2022-ARCH-032', '+92 321 7654321', 'Passionate about sustainable architecture, 3D modeling, and UI/UX design.', ARRAY['Figma', 'AutoCAD', 'Revit', 'UI/UX Design'], ARRAY['Photography', 'Model Making', 'Debating'], true),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Zayd Ahmed', 'zayd.ahmed@lums.edu.pk', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 'SBASSE', 'BS Computer Science', 8, '24100293', '+92 333 9876543', 'Senior year CS student focusing on AI, NLP, and machine learning research.', ARRAY['PyTorch', 'TensorFlow', 'FastAPI', 'Data Structures'], ARRAY['Machine Learning', 'Research', 'Chess'], true),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'Admin Staff (NUST Student Affairs)', 'admin@nust.edu.pk', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', 'Directorate of Student Affairs', 'Administration', 8, 'STAFF-09', '+92 51 9085 1000', 'CampusLoop NUST System Administrator and Moderator.', ARRAY['Administration', 'Community Oversight'], ARRAY['Student Welfare'], true)
ON CONFLICT (id) DO NOTHING;

-- 3. Seed User Roles
INSERT INTO public.user_roles (user_id, university_id, role)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'student'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'student'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'moderator'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'university_admin')
ON CONFLICT (user_id, role, university_id) DO NOTHING;

-- 4. Seed Lost & Found Listings
INSERT INTO public.listings (id, university_id, user_id, type, title, description, category, status, location_name, date_occurred, is_anonymous_found, verification_question, verification_answer_hash)
VALUES 
    ('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'lost', 'Matte Black Scientific Calculator (Casio fx-991EX ClassWiz)', 'Left inside Lecture Hall 3, SEECS building right after the Differential Equations midterm on Monday morning. Has a small green sticker on the back cover.', 'Electronics', 'active', 'SEECS Lecture Hall 3', NOW() - INTERVAL '2 days', false, NULL, NULL),
    ('10000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'found', 'Found Casio Scientific Calculator with Back Sticker', 'Found a Casio calculator on the desk in LH-3 around 1:00 PM. Turned it over to SEECS student desk or contact me here.', 'Electronics', 'active', 'SEECS Lecture Hall 3', NOW() - INTERVAL '2 days', true, 'What color and design is the sticker on the back of the cover?', 'green-cat'),
    ('10000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'lost', 'Silver NUST Lanyard with Student Card & Hostel Keys', 'Lost between Central Library and Concordia 1 cafeteria yesterday afternoon.', 'Accessories', 'active', 'Central Library walkway', NOW() - INTERVAL '1 day', false, NULL, NULL),
    ('10000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'found', 'Apple AirPods Pro 2nd Gen in Blue Silicone Case', 'Found near the sports complex bench. Please verify case engraving or exact serial last 3 digits to claim.', 'Electronics', 'active', 'LUMS Sports Complex', NOW() - INTERVAL '3 hours', false, 'What is the brand or engraving on the silicone case?', 'blue-star')
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Listing Images
INSERT INTO public.listing_images (listing_id, image_url, is_primary, visual_labels)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600', true, ARRAY['calculator', 'scientific', 'casio', 'matte black', 'desk']),
    ('10000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600', true, ARRAY['calculator', 'scientific', 'black', 'sticker', 'electronics']),
    ('10000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600', true, ARRAY['lanyard', 'keys', 'id card', 'blue lanyard']),
    ('10000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600', true, ARRAY['airpods', 'headphones', 'earbuds', 'case'])
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Marketplace Listings
INSERT INTO public.listings (id, university_id, user_id, type, title, description, category, price_pkr, condition, status, location_name)
VALUES 
    ('20000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'marketplace', 'Logitech MX Master 3S Wireless Mouse (Black)', 'Used gently for 4 months. Complete box, Type-C cable, and Logi Bolt USB receiver included. Works flawlessly with Mac and Windows.', 'Electronics', 18500.00, 'like_new', 'active', 'Hostel Razi Hall, NUST H-12'),
    ('20000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'marketplace', 'Thomas Calculus (14th Edition) Hardcover + Solution Manual', 'Essential for Calculus I & II. Clean pages, no highlights or tears. Great condition for engineering freshers.', 'Books', 2200.00, 'good', 'active', 'SADA Campus, NUST'),
    ('20000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'marketplace', 'Ergonomic Desk Chair with Mesh Back & Lumbar Support', 'Moving out of hostel. 360 swivel, tilt lock, adjustable height. Very comfortable for long study hours.', 'Furniture', 9500.00, 'good', 'active', 'Razi Hall Gate 1'),
    ('20000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'marketplace', 'Arduino Complete Starter Kit with Sensors & Breadboard', 'Contains Arduino Uno R3, 30+ sensors, jumper cables, LCD screen, and motors. Perfect for EE / CS embedded systems lab projects.', 'Electronics', 6000.00, 'like_new', 'active', 'LUMS Dorm 4')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.listing_images (listing_id, image_url, is_primary)
VALUES 
    ('20000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600', true),
    ('20000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600', true),
    ('20000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1580481077195-c22e3074fb38?w=600', true),
    ('20000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Opportunities
INSERT INTO public.opportunities (id, university_id, title, organization, type, description, eligibility, location, deadline, external_link, stipend_or_award, tags, is_verified)
VALUES 
    ('30000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Summer Software Engineering Intern 2027', 'Systems Limited', 'internship', 'Join Pakistans leading IT enterprise. Hands-on experience in cloud microservices, React frontends, and CI/CD pipelines.', '3rd/4th year CS/SE students with minimum 3.0 CGPA. Familiarity with Java, Node.js or Python.', 'Islamabad / Lahore / Remote', NOW() + INTERVAL '25 days', 'https://systemsltd.com/careers', 'PKR 45,000 / month', ARRAY['Software Engineering', 'Internship', 'React', 'Cloud'], true),
    ('30000000-0000-0000-0000-000000000002', NULL, 'National Hackathon Pakistan 2027: AI for Climate Resilience', 'Ignite National Technology Fund', 'hackathon', '48-hour hackathon tackling urban heatwaves, water management, and agri-tech using generative AI and IoT.', 'Undergraduate university students in teams of 3 to 5 members.', 'Islamabad & Virtual', NOW() + INTERVAL '14 days', 'https://ignite.org.pk/hackathons', 'PKR 1,500,000 Grand Prize Pool', ARRAY['Hackathon', 'AI', 'IoT', 'Climate'], true),
    ('30000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'HEC Need-Based Undergraduate Scholarship Cohort 2026-27', 'Higher Education Commission Pakistan', 'scholarship', 'Full tuition fee waiver plus monthly living stipend for deserving undergraduate students.', 'Enrolled undergraduate students with documented financial hardship and minimum 2.50 CGPA.', 'Across Pakistan', NOW() + INTERVAL '40 days', 'https://hec.gov.pk/scholarships', '100% Tuition Fee + PKR 6,000/mo allowance', ARRAY['Scholarship', 'HEC', 'Need-Based'], true)
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Projects (Find a Teammate)
INSERT INTO public.projects (id, university_id, creator_id, title, category, description, required_skills, members_needed, members_current, status, deadline)
VALUES 
    ('40000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Smart Agriculture Drone with Crop Disease Detection', 'hackathon', 'Building an autonomous lightweight quadcopter using edge computer vision (YOLOv8 on Raspberry Pi) to survey cotton farms and flag pest outbreaks.', ARRAY['Python', 'OpenCV', 'PyTorch', 'Hardware / Drone Assembly', 'Next.js'], 2, 2, 'recruiting', NOW() + INTERVAL '10 days'),
    ('40000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Urban Planning VR Simulation for Green Spaces in Lahore', 'research', 'Research project funded by university lab exploring immersive VR walkthroughs to assess community wellbeing in densely populated urban centers.', ARRAY['Blender / 3D', 'Unity / Unreal Engine', 'UI/UX Design', 'Academic Writing'], 1, 3, 'recruiting', NOW() + INTERVAL '18 days')
ON CONFLICT (id) DO NOTHING;

-- 9. Seed Community Posts
INSERT INTO public.community_posts (id, university_id, user_id, category, title, content, likes_count, comments_count)
VALUES 
    ('50000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'technology', 'Tips for passing Operating Systems lab exams with flying colors', 'Hey everyone! Since OS lab midterms are next week, here are key reminders: make sure you practice fork(), pipe(), and pthread mutex locks thoroughly in C on Ubuntu VM. The race condition questions are almost guaranteed to show up. Feel free to ask any doubts below!', 28, 4),
    ('50000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'campus_life', 'Which cafeteria has the best chai and paratha on campus?', 'Concordia 1 vs Concordia 2 debate! Where do you go during late study sessions? Concordia 1 roll paratha has been my go-to, but I heard the new stall at SADA has amazing Karak chai.', 45, 12)
ON CONFLICT (id) DO NOTHING;

-- 10. Seed Resources & Notes
INSERT INTO public.resources (id, university_id, uploader_id, title, description, subject, course_code, department, semester, file_url, file_size_mb, file_type, ai_summary, downloads_count, rating)
VALUES 
    ('60000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Data Structures & Algorithms - Complete Comprehensive Handwritten Notes', 'Contains detailed diagrams for AVL Trees, Red-Black Trees, Graph traversals (BFS, DFS, Dijkstra, Bellman-Ford) and Dynamic Programming patterns with step-by-step dry runs.', 'Data Structures', 'CS-214', 'Computer Science / SE', 3, 'https://example.com/notes/dsa_handwritten.pdf', 8.4, 'pdf', 'Key topics summarized: AVL tree rotations, Dijkstra algorithm edge cases, memoization versus tabulation in DP. Includes 15 solved midterm problems.', 142, 4.95),
    ('60000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Structural Analysis & Statics Cheat Sheet', 'Formula summaries for bending moments, shear force diagrams, and truss method of joints / sections.', 'Civil & Architecture', 'CE-112', 'Architecture & Civil Eng', 2, 'https://example.com/notes/statics_summary.pdf', 4.1, 'pdf', 'Formulas for indeterminate beams, Mohr circle stress calculations, and centroid centroids.', 89, 4.80)
ON CONFLICT (id) DO NOTHING;

-- 11. Seed Tutors
INSERT INTO public.tutors (id, user_id, university_id, subjects, bio, experience_years, hourly_rate_pkr, rating, reviews_count)
VALUES 
    ('70000000-0000-0000-0000-000000000001', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', ARRAY['Calculus I & II', 'Linear Algebra', 'Algorithms', 'Python'], 'Teaching Assistant for CS-200. I love breaking down complex math and algorithm concepts into intuitive mental models.', 2, 1200.00, 4.98, 14),
    ('70000000-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', ARRAY['Object Oriented Programming', 'Database Systems', 'Web Development'], 'Peer tutor for 3 semesters. Helping juniors master OOP principles, SQL queries, and building web apps.', 1, 0.00, 4.90, 9)
ON CONFLICT (id) DO NOTHING;

-- 12. Seed Events
INSERT INTO public.events (id, university_id, organizer_id, organizer_name, title, category, description, venue, start_time, end_time, image_url, capacity, registrations_count)
VALUES 
    ('80000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'NUST ACM Student Chapter', 'DevCon Pakistan 2027: Future of AI & Cloud Systems', 'conference', 'Annual flagship technology conference with keynote speakers from Google, Microsoft, and leading Pakistani unicorns. Includes panel discussions and startup expo.', 'Jinnah Auditorium, NUST H-12', NOW() + INTERVAL '12 days', NOW() + INTERVAL '12 days 8 hours', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 350, 218),
    ('80000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'NUST Fine Arts & Design Club', 'Campus Photography & Design Showcase', 'cultural', 'Exhibition of top student photography, architectural renderings, and digital illustrations. Open to all students and faculty.', 'SADA Exhibition Hall', NOW() + INTERVAL '6 days', NOW() + INTERVAL '7 days', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', 150, 94)
ON CONFLICT (id) DO NOTHING;
