# Strivo Product Design Specification
# 07_EXPORT_GUIDELINES.md

Version: 1.0.0
Status: Production Frozen

> Defines how every visual asset must be exported, named and delivered.

---

# Source of Truth

- Figma is the master design source.
- SVG is the master vector format.
- Never edit exported assets.

---

# Export Formats

## Icons
Master: SVG
Runtime: SVG

## Illustrations
Master: SVG
Optional: WebP

## App Icon
1024×1024 PNG (master)
512×512 PNG (Play Store)

## Screenshots
PNG
1080×2400 px (Android reference)

## Feature Graphic
1024×500 PNG

---

# Naming Convention

Use lowercase kebab-case.

Examples:
hero-wave.svg
habit-card-bg.svg
empty-insights.svg

Never:
HeroWaveFinal2.svg

---

# Directory Layout

assets/
  icons/
  illustrations/
  logos/
  marketing/
  screenshots/

---

# Optimization

- Remove unused SVG metadata.
- Compress PNG losslessly.
- Do not rasterize vectors.

---

# Versioning

asset-name_v1.svg
asset-name_v2.svg

Only the latest approved asset is referenced by production code.

---

# QA

- Correct dimensions
- Correct filename
- Correct directory
- No duplicate exports
- Visual review passed

---

# Next Document

08_QA_CHECKLIST.md
