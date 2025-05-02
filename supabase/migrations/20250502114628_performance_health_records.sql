-- PERFORMANCE METRICS (corrected FK)
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID REFERENCES athlete_profiles(user_id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('physical', 'technical', 'tactical', 'mental')),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC(10,2),
  test_date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  recorded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HEALTH RECORDS (corrected FK)
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID REFERENCES athlete_profiles(user_id) ON DELETE CASCADE,
  record_date TIMESTAMPTZ NOT NULL,
  record_type TEXT NOT NULL CHECK (record_type IN ('sleep', 'nutrition', 'injury', 'mental', 'other')),
  details JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
