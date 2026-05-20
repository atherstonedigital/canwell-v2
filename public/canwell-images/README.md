# Canwell showroom imagery — 20 May 2026

Photos captured at the Broadway showroom during the site planning visit with Jella.

## What's in this package

```
canwell-images/
├── public/images/
│   ├── showroom/        wide hero + walkthrough shots
│   ├── exterior/        front door logo, window signage
│   ├── carpets/         Cormar carpet display
│   ├── sofas/           sofa bay vignettes
│   ├── dining/          dining table vignettes
│   ├── lighting/        lamps and lighting displays
│   ├── accessories/     Sences fragrance, shelving, mirrors
│   └── lifestyle/       woodburner + sofa scene
└── src/lib/
    └── showroom-images.ts    typed image manifest with alt text
```

## How to use

### 1. Drop the images into the repo

Copy `public/images/*` into the repo's `public/images/` folder. Commit.

### 2. Drop the manifest into the repo

Copy `src/lib/showroom-images.ts` into `src/lib/`. Commit.

### 3. Reference in components

```tsx
import Image from "next/image";
import { showroomImages } from "@/lib/showroom-images";

<Image
  src={showroomImages.heroWide.src}
  alt={showroomImages.heroWide.alt}
  width={showroomImages.heroWide.width}
  height={showroomImages.heroWide.height}
  priority           // homepage hero
  sizes="100vw"
/>
```

For non-hero images, omit `priority` and set `sizes` for responsive serving:

```tsx
<Image
  {...showroomImages.carpetsCormarDisplay}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Recommended placement on site

| Image key | Suggested page / placement |
|---|---|
| `heroWide` | Homepage hero |
| `accessoriesWide` | About page hero, or showroom page secondary |
| `walkthrough` | Showroom page, in-content |
| `exteriorFrontDoor` | Contact / find us page |
| `exteriorWindowSignage` | Footer area or about page |
| `carpetsCormarDisplay` | Carpets service page hero |
| `sofasBolton` | Sofas service page |
| `sofasSnuggler` | Sofas service page, secondary |
| `diningOvalTable` | Dining service page hero |
| `diningRoundTable` | Dining service page, secondary |
| `lightingConsoleVignette` | Lighting / accessories vignette |
| `lightingTableLampDetail` | Lighting detail card |
| `lightingLampsDisplay` | Lighting service page hero |
| `accessoriesSencesFragrance` | Accessories page |
| `accessoriesCircularShelving` | Accessories page |
| `accessoriesMirrorHydrangeas{L,P}` | Mirrors / accessories secondary |
| `lifestyleWoodburner` | Homepage section break or about page |

## Technical notes

- All images resized to **max 2400px on the long edge** (Retina-ready, plenty for any hero)
- JPEG quality 85, progressive, optimised
- EXIF metadata stripped (no GPS data, smaller files)
- Average file size ~570KB
- `next/image` will further optimise on serve (WebP / AVIF, responsive sizes)

## Not included

- **Blurry shot dropped** (original `20260520_110130.jpg`, image 8 in the upload)
- **Curtains / blinds bay** — not in this batch, grab on next visit
- **Beds / bedrooms** — not in this batch
- **Building exterior wide** — only door/window detail captured
- **Team / fitter shots** — none captured

## Content note for Gary and Gemma

The window signage in `exterior-window-signage.jpg` reads "Curated Accessories" and the front door tagline in `exterior-front-door-logo.jpg` reads "Elevated Style". Both clash with the locked positioning ("The Cotswolds furnishings showroom. Walk in, choose, take home."). Worth a conversation about updating signage as part of the rebuild.
