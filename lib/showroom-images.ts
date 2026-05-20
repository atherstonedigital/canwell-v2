/**
 * Canwell showroom imagery — captured at Broadway, 20 May 2026.
 * All paths are relative to the public root, so reference as e.g.
 *   <Image src={showroomImages.heroWide.src} alt={showroomImages.heroWide.alt} ... />
 */

export type ShowroomImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const showroomImages = {
  // Showroom — wide / hero
  heroWide: {
    src: "/images/showroom/showroom-hero-wide.jpg",
    alt: "Wide view of the Canwell showroom with exposed beams, lighting and furniture displays",
    width: 2400,
    height: 1350,
  },
  accessoriesWide: {
    src: "/images/showroom/showroom-accessories-wide.jpg",
    alt: "Wide view through the accessories area with lamps, art and styling",
    width: 2400,
    height: 1350,
  },
  walkthrough: {
    src: "/images/showroom/showroom-walkthrough.jpg",
    alt: "Walking view through the Canwell showroom, fragrance and accessories shelving",
    width: 1350,
    height: 2400,
  },

  // Exterior
  exteriorFrontDoor: {
    src: "/images/exterior/exterior-front-door-logo.jpg",
    alt: "Canwell Interiors front door with logo, open daily signage and Broadway showroom phone number",
    width: 1350,
    height: 2400,
  },
  exteriorWindowSignage: {
    src: "/images/exterior/exterior-window-signage.jpg",
    alt: "Canwell Interiors signage: furniture, accessories, carpets, fabrics, curtains and blinds",
    width: 1350,
    height: 2400,
  },

  // Carpets
  carpetsCormarDisplay: {
    src: "/images/carpets/carpets-cormar-display.jpg",
    alt: "Cormar Carpet Co sample display in the Canwell carpets showroom",
    width: 2400,
    height: 1350,
  },

  // Sofas
  sofasBolton: {
    src: "/images/sofas/sofas-bolton-cushions.jpg",
    alt: "Cream Bolton sofa styled with navy, orange and cream cushions",
    width: 2400,
    height: 1350,
  },
  sofasSnuggler: {
    src: "/images/sofas/sofas-snuggler-armchair.jpg",
    alt: "Snuggler armchair styled with cushions and lamps",
    width: 2400,
    height: 1350,
  },

  // Dining
  diningOvalTable: {
    src: "/images/dining/dining-oval-table-vignette.jpg",
    alt: "Oval dining table styled with glassware, surrounded by accent chairs and sofas in the Canwell showroom",
    width: 2400,
    height: 1350,
  },
  diningRoundTable: {
    src: "/images/dining/dining-round-table-vignette.jpg",
    alt: "Round wooden dining table styled with stoneware and brass bowl, set between a cream and green sofa",
    width: 2400,
    height: 1350,
  },

  // Lighting
  lightingConsoleVignette: {
    src: "/images/lighting/lighting-console-vignette.jpg",
    alt: "Lamps and lighting styled on a wooden console table with foliage",
    width: 1350,
    height: 2400,
  },
  lightingTableLampDetail: {
    src: "/images/lighting/lighting-table-lamp-detail.jpg",
    alt: "White ceramic table lamp with linen shade styled with bronze figurine",
    width: 1350,
    height: 2400,
  },
  lightingLampsDisplay: {
    src: "/images/lighting/lighting-lamps-display.jpg",
    alt: "Table lamp display on a console with marble lamp bases and linen shades",
    width: 2400,
    height: 1350,
  },

  // Accessories
  accessoriesSencesFragrance: {
    src: "/images/accessories/accessories-sences-fragrance.jpg",
    alt: "Sences home fragrance display with diffusers and candles in the accessories area",
    width: 2400,
    height: 1350,
  },
  accessoriesCircularShelving: {
    src: "/images/accessories/accessories-circular-shelving.jpg",
    alt: "Circular metal shelving unit displaying home fragrance, vases and gift sets",
    width: 2400,
    height: 1350,
  },
  accessoriesMirrorHydrangeasLandscape: {
    src: "/images/accessories/accessories-mirror-hydrangeas-l.jpg",
    alt: "Arched mirror with stone vase of hydrangeas in the accessories area",
    width: 1350,
    height: 2400,
  },
  accessoriesMirrorHydrangeasPortrait: {
    src: "/images/accessories/accessories-mirror-hydrangeas-p.jpg",
    alt: "Tall arched mirror reflecting the showroom, with hydrangeas in a stone vase",
    width: 1350,
    height: 2400,
  },

  // Lifestyle
  lifestyleWoodburner: {
    src: "/images/lifestyle/lifestyle-woodburner-green-sofa.jpg",
    alt: "Green velvet Duxford sofa next to a woodburning stove with dining table set for two",
    width: 2400,
    height: 1350,
  },

  // Placeholder vignettes — to be replaced with proper photography
  curtainsVignettePlaceholder: {
    src: "/images/curtains/curtains-vignette-placeholder.jpg",
    alt: "Curtain fabrics on display at the Canwell Interiors showroom",
    width: 1350,
    height: 2400,
  },
  blindsVignettePlaceholder: {
    src: "/images/blinds/blinds-vignette-placeholder.jpg",
    alt: "Blinds on display at the Canwell Interiors showroom",
    width: 1350,
    height: 2400,
  },
} as const satisfies Record<string, ShowroomImage>;

const showroomImagesBySrc: Map<string, ShowroomImage> = new Map(
  Object.values(showroomImages).map((img) => [img.src, img])
);

export function getShowroomImage(src: string | undefined): ShowroomImage | undefined {
  return src ? showroomImagesBySrc.get(src) : undefined;
}
