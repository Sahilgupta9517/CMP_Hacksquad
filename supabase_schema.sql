-- JanDrishti AI Database Schema for Supabase
-- Digital Public Infrastructure & Governance Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CITIZEN REQUESTS TABLE
CREATE TABLE IF NOT EXISTS citizen_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id VARCHAR(20) UNIQUE NOT NULL,
    citizen_name VARCHAR(100) DEFAULT 'Anonymous Citizen',
    channel VARCHAR(30) DEFAULT 'Voice App', -- 'Voice App', 'WhatsApp', 'Text SMS', 'Web Portal'
    language VARCHAR(30) DEFAULT 'Hindi',
    original_text TEXT NOT NULL,
    translated_text TEXT,
    category VARCHAR(50) NOT NULL, -- 'Water Supply', 'Healthcare', 'Road Infrastructure', 'Electricity', 'Digital Connectivity', 'Education'
    urgency_level VARCHAR(20) DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Critical'
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    pincode VARCHAR(10),
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    upvotes INT DEFAULT 1,
    status VARCHAR(30) DEFAULT 'Pending Review', -- 'Pending Review', 'AI Analyzed', 'In Project Plan', 'Fund Approved', 'Resolved'
    ai_confidence NUMERIC(4, 2) DEFAULT 0.92,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DEMOGRAPHIC & INFRASTRUCTURE INDEXES TABLE
CREATE TABLE IF NOT EXISTS district_indices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    population INT NOT NULL,
    poverty_rate NUMERIC(5, 2), -- Percentage below poverty line
    vulnerability_score NUMERIC(5, 2), -- 0 - 100
    dpi_fiber_coverage NUMERIC(5, 2), -- Percentage connected to BharatNet
    healthcare_deficit_index NUMERIC(5, 2), -- 0 - 100
    clean_water_coverage NUMERIC(5, 2), -- Percentage
    road_density_km NUMERIC(8, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AI RECOMMENDED PROJECTS TABLE
CREATE TABLE IF NOT EXISTS ai_recommended_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code VARCHAR(30) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    target_beneficiaries INT NOT NULL,
    estimated_budget_inr NUMERIC(15, 2) NOT NULL, -- In INR Lakhs/Crores
    priority_score NUMERIC(5, 2) NOT NULL, -- 0 - 100 calculated by AI
    urgency_reason TEXT NOT NULL,
    sdg_goal VARCHAR(100), -- E.g. 'SDG 6: Clean Water & Sanitation'
    status VARCHAR(30) DEFAULT 'Proposed', -- 'Proposed', 'Approved', 'Allocated', 'Work In Progress', 'Completed'
    matching_request_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR SPEED
CREATE INDEX IF NOT EXISTS idx_requests_state_district ON citizen_requests(state, district);
CREATE INDEX IF NOT EXISTS idx_requests_category ON citizen_requests(category);
CREATE INDEX IF NOT EXISTS idx_requests_status ON citizen_requests(status);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON ai_recommended_projects(priority_score DESC);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE citizen_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE district_indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommended_projects ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ & INSERT POLICIES (Digital Public Good Access)
CREATE POLICY "Allow public select on citizen_requests" ON citizen_requests FOR SELECT USING (true);
CREATE POLICY "Allow public insert on citizen_requests" ON citizen_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update upvotes on citizen_requests" ON citizen_requests FOR UPDATE USING (true);

CREATE POLICY "Allow public select on district_indices" ON district_indices FOR SELECT USING (true);
CREATE POLICY "Allow public select on ai_recommended_projects" ON ai_recommended_projects FOR SELECT USING (true);
CREATE POLICY "Allow public update status on ai_recommended_projects" ON ai_recommended_projects FOR UPDATE USING (true);

-- SEED DATA FOR DEMO
INSERT INTO district_indices (state, district, population, poverty_rate, vulnerability_score, dpi_fiber_coverage, healthcare_deficit_index, clean_water_coverage)
VALUES 
('Maharashtra', 'Gadchiroli', 1072942, 38.5, 84.2, 42.0, 78.5, 54.0),
('Odisha', 'Kalahandi', 1576869, 42.1, 88.0, 36.5, 82.0, 48.2),
('Bihar', 'Purnia', 3264619, 45.3, 91.5, 28.0, 85.4, 41.0),
('Kerala', 'Wayanad', 817420, 12.4, 34.0, 84.5, 22.0, 89.0),
('Uttar Pradesh', 'Chitrakoot', 991730, 39.8, 81.0, 45.0, 74.0, 52.0),
('Rajasthan', 'Barmer', 2603751, 31.2, 76.5, 51.0, 68.0, 35.0),
('Tamil Nadu', 'Dharmapuri', 1506843, 22.5, 48.0, 72.0, 41.0, 78.0)
ON CONFLICT DO NOTHING;
