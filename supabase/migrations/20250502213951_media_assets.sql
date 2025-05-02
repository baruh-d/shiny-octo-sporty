-- Media Assets Table for Cloudinary-stored media
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  team_id UUID REFERENCES teams(id) NULL,
  athlete_id UUID REFERENCES athlete_profiles(user_id) NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  public_id TEXT NOT NULL, -- Cloudinary public ID
  url TEXT NOT NULL,
  tags TEXT[],
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE media_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  media_asset_id UUID REFERENCES media_assets(id),
  file_url TEXT,
  analysis JSONB, -- e.g., { speed: 7.2, balance: 9.1, shot_form: "leaning left" }
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
