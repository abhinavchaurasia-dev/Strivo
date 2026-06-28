// ─────────────────────────────────────────────
// SettingsRepository
// Key/value store backed by app_settings table.
// ─────────────────────────────────────────────

import { getDatabase } from "@/database";
import type { AppSettings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/types/settings";

export class SettingsRepository {
  private get db() {
    return getDatabase();
  }

  private get<T>(key: string): T | null {
    const row = this.db.getFirstSync<{ value: string }>(
      "SELECT value FROM app_settings WHERE key = ?",
      [key],
    );

    if (!row) return null;

    try {
      return JSON.parse(row.value) as T;
    } catch {
      return null;
    }
  }

  private set(key: string, value: unknown): void {
    this.db.runSync(
      "INSERT OR REPLACE INTO app_settings(key, value) VALUES(?, ?)",
      [key, JSON.stringify(value)],
    );
  }

  /** Load the full settings object, applying defaults for missing keys. */
  load(): AppSettings {
    const stored = this.get<Partial<AppSettings>>("settings");
    return { ...DEFAULT_SETTINGS, ...stored };
  }

  /** Persist the full settings object. */
  save(settings: AppSettings): void {
    this.set("settings", settings);
  }

  /** Convenience: patch a subset of settings. */
  patch(partial: Partial<AppSettings>): AppSettings {
    const current = this.load();
    const next = { ...current, ...partial };
    this.save(next);
    return next;
  }
}

export const settingsRepository = new SettingsRepository();
