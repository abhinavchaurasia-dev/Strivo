# Strivo Product Design Specification

## 01_DESIGN_SYSTEM.md

Version: 1.0.0
Status: Production Frozen

## Design Principles
- Consistency compounds.
- Token-driven implementation.
- Accessibility first.
- Motion communicates state.
- Components over one-off layouts.

## Base Grid
- 8-point grid
- Minimum touch target: 48×48 dp
- Screen horizontal padding: 20 dp

## Spacing Tokens

| Token | Value |
|---|---:|
| xs | 4 |
| sm | 8 |
| md | 12 |
| lg | 16 |
| xl | 20 |
| 2xl | 24 |
| 3xl | 32 |
| 4xl | 40 |
| 5xl | 48 |
| 6xl | 64 |

## Radius Tokens

| Token | Value |
|---|---:|
| xs | 4 |
| sm | 8 |
| md | 12 |
| lg | 16 |
| xl | 20 |
| 2xl | 24 |
| pill | 999 |

## Semantic Colors

- page.background = #F8F9FB
- surface.default = #FFFFFF
- text.primary = #111827
- text.secondary = #6B7280
- border.default = #E5E7EB
- brand.primary = #FF7A00
- brand.primaryLight = #FF9F43
- success = #22C55E
- warning = #F59E0B
- error = #EF4444
- info = #3B82F6

## Hero Gradient

Angle: 135°

Stops:
- 0% #FF7A00
- 54% #FF8A1C
- 100% #FFB347

Overlay:
- hero_wave.svg
- Soft Light
- 6% opacity

## Typography

Font: Inter

| Style | Size | Weight |
|---|---:|---:|
| Display L | 40 | 700 |
| Display M | 32 | 700 |
| Headline L | 24 | 700 |
| Headline M | 20 | 600 |
| Title L | 18 | 600 |
| Body L | 16 | 500 |
| Body M | 14 | 400 |
| Caption | 12 | 400 |

## Elevation

| Token | Y | Blur | Opacity |
|---|---:|---:|---:|
| sm | 2 | 8 | .08 |
| md | 6 | 16 | .10 |
| lg | 12 | 32 | .14 |
| xl | 16 | 40 | .18 |

## Motion

- Screen Push: 300ms
- Modal: 280ms
- Bottom Sheet: 320ms
- Button Press: 120ms
- Habit Complete: 520ms

## Haptics

- Habit Complete: Medium
- Milestone: Success
- Save: Light
- Delete: Heavy
- Error: Error

## Accessibility

- WCAG AA
- Dynamic text to 200%
- Reduced motion support
- Screen reader labels required

## Implementation Rules

- No hardcoded colors.
- No hardcoded spacing.
- No hardcoded typography.
- Use semantic tokens only.

Next: 02_THEME_TOKENS.md
