CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  sport TEXT,
  age_group TEXT, -- e.g., 'U14', 'U18', 'Adult'
  goal TEXT, -- e.g., 'muscle_gain', 'fat_loss', 'endurance'
  meals JSONB NOT NULL, -- structured meals: breakfast, lunch, etc.
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_meal_plan_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES meal_plans(id),
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
