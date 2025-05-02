-- EVENTS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  sport TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  team_id UUID REFERENCES teams(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WORKOUT TRACKING
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  workout_date DATE,
  duration_minutes INTEGER,
  intensity TEXT CHECK (intensity IN ('low', 'moderate', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
