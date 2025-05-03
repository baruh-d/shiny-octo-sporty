-- 🎁 Donations
ALTER TABLE donations ADD COLUMN donor_id UUID REFERENCES users(id);
ALTER TABLE donations ADD COLUMN currency VARCHAR(3) DEFAULT 'USD';
ALTER TABLE donations ADD COLUMN donation_method TEXT CHECK (donation_method IN ('credit_card', 'bank_transfer', 'cash', 'other')) NULL;
ALTER TABLE donations ADD COLUMN transaction_id VARCHAR(255) NULL;

-- 📝 Activity Logs
ALTER TABLE activity_logs ALTER COLUMN details TYPE JSONB USING details::jsonb;

-- ⚠️ System Alerts
ALTER TABLE system_alerts ADD COLUMN priority INT DEFAULT 3;
ALTER TABLE system_alerts ADD COLUMN expires_at TIMESTAMPTZ;

