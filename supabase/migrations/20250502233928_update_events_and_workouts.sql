-- Rename columns if needed
ALTER TABLE events RENAME COLUMN name TO title;
ALTER TABLE events RENAME COLUMN event_date TO start_date;

-- Add new columns
ALTER TABLE events
  ADD COLUMN end_date TIMESTAMPTZ,
  ADD COLUMN event_type TEXT CHECK (event_type IN ('training', 'match', 'camp', 'meeting', 'other')),
  ADD COLUMN status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop columns no longer needed (optional and irreversible!)
ALTER TABLE events DROP COLUMN team_id;
ALTER TABLE events DROP COLUMN sport;

-- Make sure title is required
ALTER TABLE workouts
  ALTER COLUMN title SET NOT NULL;

-- Rename workout_date → scheduled_date (optional)
ALTER TABLE workouts RENAME COLUMN workout_date TO scheduled_date;

-- Add workout_type & created_by columns
ALTER TABLE workouts
  ADD COLUMN workout_type TEXT CHECK (workout_type IN ('strength', 'cardio', 'flexibility', 'skill', 'recovery', 'other')),
  ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN created_by UUID REFERENCES users(id);
