-- COACH PROFILE EXTENSION
CREATE TABLE coach_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id),
  specialization TEXT[],
  certifications TEXT[],
  experience_years INTEGER,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SCOUT PROFILE EXTENSION
CREATE TABLE scout_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  organization TEXT,
  focus_areas TEXT[],
  experience_years INTEGER,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);