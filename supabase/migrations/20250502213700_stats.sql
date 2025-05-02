CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  source TEXT CHECK (source IN ('performance', 'workout', 'health')) NOT NULL,
  metric_type TEXT NOT NULL,  -- e.g., 'speed', 'injury_count', 'workout_duration'
  value NUMERIC NOT NULL,
  unit TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
