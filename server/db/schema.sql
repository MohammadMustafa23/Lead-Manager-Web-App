CREATE TABLE IF NOT EXISTS leads (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20)  NOT NULL,
  company     VARCHAR(150) NOT NULL,
 source      VARCHAR(50)  NOT NULL CHECK (source IN ('Website','Referral','LinkedIn','Cold Call','Event','Other')),
  status      VARCHAR(20)  NOT NULL DEFAULT 'New' CHECK (status IN ('New','Contacted','Qualified','Lost')),
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_name   ON leads(name);