-- 📦 Inventory Tracking (linked to donations)
CREATE TABLE equipment_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_id UUID REFERENCES donations(id),
  item_name TEXT NOT NULL,
  quantity INT NOT NULL,
  condition TEXT CHECK (condition IN ('new', 'used-good', 'used-fair', 'used-poor')),
  storage_location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 📣 Notification Preferences
CREATE TABLE notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  email_enabled BOOLEAN DEFAULT TRUE,
  sms_enabled BOOLEAN DEFAULT FALSE,
  alert_types TEXT[] DEFAULT ARRAY['error', 'warning']::TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);