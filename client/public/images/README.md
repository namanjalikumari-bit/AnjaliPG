# Anjali PG — Image Assets

Drop the **20 AI-generated images** into this folder using **exactly** these filenames.
Every page reads its image paths from `client/src/data/galleryImages.js`, so as long as
the filenames match, the whole site is wired up automatically.

| # | Filename | Used for |
|---|----------|----------|
| 1 | `pg-exterior.jpg` | PG Building Exterior (Home hero) |
| 2 | `reception.jpg` | Reception Area |
| 3 | `room-single.jpg` | Single Sharing Room |
| 4 | `room-double.jpg` | Double Sharing Room |
| 5 | `room-triple.jpg` | Triple Sharing Room |
| 6 | `dining-area.jpg` | Dining Area |
| 7 | `mess-food.jpg` | Mess / Food |
| 8 | `gym.jpg` | Gym |
| 9 | `gaming-area.jpg` | Gaming Area |
| 10 | `community-events.jpg` | Community Events |
| 11 | `study-area.jpg` | Study Area |
| 12 | `laundry-area.jpg` | Laundry Area |
| 13 | `common-area.jpg` | Common Area |
| 14 | `security-area.jpg` | Security Area |
| 15 | `hostel-lifestyle.jpg` | Hostel Lifestyle |
| 16 | `students-studying.jpg` | Students Studying |
| 17 | `wifi-workspace.jpg` | WiFi Workspace |
| 18 | `kitchen.jpg` | Kitchen |
| 19 | `housekeeping.jpg` | Housekeeping |
| 20 | `amenities-showcase.jpg` | Amenities Showcase |

## Notes
- Recommended size: ~1600×1200 px (4:3), compressed to < 300 KB each (use [Squoosh](https://squoosh.app) or `sharp`).
- Until you add a file, that spot shows a graceful purple placeholder with the image label — the app never breaks.
- `.jpg` is expected. If you use `.webp` or `.png`, update the paths in `client/src/data/galleryImages.js`.
- These are served from `/public`, so they resolve at runtime as e.g. `/images/pg-exterior.jpg`.
