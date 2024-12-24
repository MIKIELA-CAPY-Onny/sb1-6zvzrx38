/*
  # Initial Schema for HarmonyEvents

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - created_at (timestamp)
    
    - events
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - date (timestamp)
      - location_name (text)
      - latitude (float)
      - longitude (float)
      - type (text)
      - category (text)
      - price (decimal)
      - available_tickets (integer)
      - organizer_id (uuid, foreign key)
      - image_url (text)
      - created_at (timestamp)
    
    - tickets
      - id (uuid, primary key)
      - event_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - status (text)
      - payment_status (text)
      - created_at (timestamp)
    
    - favorites
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - event_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  location_name text NOT NULL,
  latitude float,
  longitude float,
  type text NOT NULL CHECK (type IN ('MUNDANE', 'CHRISTIAN')),
  category text NOT NULL,
  price decimal NOT NULL DEFAULT 0,
  available_tickets integer NOT NULL DEFAULT 0,
  organizer_id uuid REFERENCES users(id),
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Organizers can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = organizer_id);

-- Tickets table
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id),
  user_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')),
  payment_status text NOT NULL CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Favorites table
CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  event_id uuid REFERENCES events(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their favorites"
  ON favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);