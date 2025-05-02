-- 🧠 MENTAL HEALTH LOGS
CREATE TABLE mental_health_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  mood TEXT, -- e.g. 'happy', 'anxious', 'burnt out'
  stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
  notes TEXT,
  created_by UUID REFERENCES users(id), -- could be self, coach, or therapist
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 🧑🏾‍⚕️ COUNSELING SESSIONS
CREATE TABLE therapy_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  counselor_name TEXT,
  session_date TIMESTAMPTZ,
  topic TEXT,
  outcome TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);