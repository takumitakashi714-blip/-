import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

declare global {
  var __salonDb: Database.Database | undefined;
}

function createDb() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const db = new Database(path.join(dataDir, "app.db"));
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_slug TEXT NOT NULL,
      service_name TEXT NOT NULL,
      variant_id TEXT NOT NULL,
      variant_name TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      price INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_session_id TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      customer_email TEXT,
      total_amount INTEGER NOT NULL,
      items TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

export function getDb(): Database.Database {
  if (!global.__salonDb) {
    global.__salonDb = createDb();
  }
  return global.__salonDb;
}
