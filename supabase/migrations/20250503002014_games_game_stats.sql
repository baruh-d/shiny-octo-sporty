-- This migration file creates the tables for games and game stats in a sports application.
-- It includes the creation of the games table, which stores information about each game,
-- and the game_stats table, which stores statistics for each athlete in a game.
-- The tables are linked to the events and teams tables, and include fields for scores, dates, locations, and various statistics.
-- The tables also include timestamps for creation and updates.
-- This migration file is part of a larger schema for a sports application, which includes tables for events, teams, athletes, and more.

-- 📅 Games
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL, -- optional link to event
  team1_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  team2_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  team1_score INTEGER DEFAULT 0,
  team2_score INTEGER DEFAULT 0,
  game_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  status TEXT CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 🎮 Game Stats
CREATE TABLE game_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athlete_profiles(user_id) ON DELETE CASCADE,
  stat_type TEXT CHECK (stat_type IN ('points', 'rebounds', 'assists', 'steals', 'blocks', 'turnovers', 'fouls')) NULL,
  stat_value INTEGER NULL,
  points INTEGER DEFAULT 0,
  rebounds INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  steals INTEGER DEFAULT 0,
  blocks INTEGER DEFAULT 0,
  turnovers INTEGER DEFAULT 0,
  fouls INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
