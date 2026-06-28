// ─────────────────────────────────────────────
// Strivo — SQLite Database Bootstrap
// Expo SQLite v2 (SDK 50+) synchronous API via
// the useSQLiteContext hook. This module opens
// the database and runs all schema migrations.
// ─────────────────────────────────────────────

import * as SQLite from "expo-sqlite";

export const DATABASE_NAME = "strivo.db";

/**
 * SQL migrations — append-only.
 * Never modify an existing entry; add a new version instead.
 */
const MIGRATIONS: string[] = [
  // ── v1 — core schema ─────────────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS habits (
    id                TEXT PRIMARY KEY NOT NULL,
    name              TEXT NOT NULL,
    emoji             TEXT NOT NULL DEFAULT '✅',
    frequency_type    TEXT NOT NULL DEFAULT 'daily',
    frequency_data    TEXT NOT NULL DEFAULT '{"frequency":"daily","weekdays":[],"times":[]}',
    best_streak       INTEGER NOT NULL DEFAULT 0,
    created_at        TEXT NOT NULL,
    updated_at        TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS habit_completions (
    id               TEXT PRIMARY KEY NOT NULL,
    habit_id         TEXT NOT NULL,
    completed_at     TEXT NOT NULL,
    completion_date  TEXT NOT NULL,
    UNIQUE(habit_id, completion_date),
    FOREIGN KEY(habit_id) REFERENCES habits(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS scheduled_notifications (
    id               TEXT PRIMARY KEY NOT NULL,
    habit_id         TEXT NOT NULL,
    notification_id  TEXT NOT NULL,
    type             TEXT NOT NULL DEFAULT 'REMINDER',
    created_at       TEXT NOT NULL,
    FOREIGN KEY(habit_id) REFERENCES habits(id) ON DELETE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS activity_log (
    id          TEXT PRIMARY KEY NOT NULL,
    type        TEXT NOT NULL,
    title       TEXT NOT NULL,
    subtitle    TEXT,
    metadata    TEXT,
    created_at  TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS app_settings (
    key    TEXT PRIMARY KEY NOT NULL,
    value  TEXT NOT NULL
  )`,

  // ── Indexes ───────────────────────────────────────────────────────
  `CREATE INDEX IF NOT EXISTS idx_completion_habit
     ON habit_completions(habit_id)`,

  `CREATE INDEX IF NOT EXISTS idx_completion_date
     ON habit_completions(completion_date)`,

  `CREATE INDEX IF NOT EXISTS idx_activity_created
     ON activity_log(created_at DESC)`,

  `CREATE INDEX IF NOT EXISTS idx_notification_habit
     ON scheduled_notifications(habit_id)`,
];

let _db: SQLite.SQLiteDatabase | null = null;

/**
 * Opens (or returns the cached) Strivo SQLite database.
 * Runs all pending migrations on first open.
 */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (_db) return _db;

  _db = SQLite.openDatabaseSync(DATABASE_NAME);

  // Enable WAL mode for better concurrent read performance.
  _db.execSync("PRAGMA journal_mode = WAL;");
  _db.execSync("PRAGMA foreign_keys = ON;");

  runMigrations(_db);

  return _db;
}

function runMigrations(db: SQLite.SQLiteDatabase): void {
  // Track applied migrations with a simple version counter.
  db.execSync(
    `CREATE TABLE IF NOT EXISTS _migrations (
      version   INTEGER PRIMARY KEY NOT NULL,
      applied_at TEXT NOT NULL
    )`,
  );

  const row = db.getFirstSync<{ version: number }>(
    "SELECT COALESCE(MAX(version), 0) AS version FROM _migrations",
  );
  const currentVersion = row?.version ?? 0;

  db.withTransactionSync(() => {
    MIGRATIONS.slice(currentVersion).forEach((sql, i) => {
      db.execSync(sql);
      db.runSync("INSERT INTO _migrations(version, applied_at) VALUES(?, ?)", [
        currentVersion + i + 1,
        new Date().toISOString(),
      ]);
    });
  });
}

/** Wipes the database — only used in tests / debug reset. */
export function resetDatabase(): void {
  const db = getDatabase();
  db.withTransactionSync(() => {
    db.execSync(`
      DROP TABLE IF EXISTS habit_completions;
      DROP TABLE IF EXISTS scheduled_notifications;
      DROP TABLE IF EXISTS activity_log;
      DROP TABLE IF EXISTS app_settings;
      DROP TABLE IF EXISTS habits;
      DROP TABLE IF EXISTS _migrations;
    `);
  });
  _db = null;
}
