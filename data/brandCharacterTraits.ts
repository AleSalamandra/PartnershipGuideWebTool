/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export interface BrandCharacterAxes {
  curvature: number;
  angularity: number;
  symmetry: number;
  density: number;
  weight: number;
  asymmetry: number;
  depth: number;
  motion: number;
}

/* ================================================= */
/* TRAITS                                            */
/* ================================================= */

export const BRAND_CHARACTER_TRAITS = [
  {
    id: "classic",
    label: "Classic",
    description:
      "Stable, balanced and recognisable. Uses simple proportions, clear alignment, restrained geometry and controlled symmetry.",
    axes: {
      curvature: 30,
      angularity: 35,
      symmetry: 80,
      density: 25,
      weight: 35,
      asymmetry: 15,
      depth: 20,
      motion: 20,
    },
  },

  {
    id: "elegant",
    label: "Elegant",
    description:
      "Slim and refined. Uses long curves, generous radii, fine lines, soft transitions and generous negative space.",
    axes: {
      curvature: 75,
      angularity: 10,
      symmetry: 60,
      density: 15,
      weight: 10,
      asymmetry: 25,
      depth: 35,
      motion: 25,
    },
  },

  {
    id: "premium",
    label: "Premium",
    description:
      "Large, controlled and confident. Uses few strong forms, precise proportions, generous space and restrained composition.",
    axes: {
      curvature: 45,
      angularity: 30,
      symmetry: 65,
      density: 10,
      weight: 40,
      asymmetry: 20,
      depth: 45,
      motion: 20,
    },
  },

  {
    id: "minimal",
    label: "Minimal",
    description:
      "Reduced to essentials. Uses very few elementary shapes, simple contours, minimal repetition and extensive negative space.",
    axes: {
      curvature: 35,
      angularity: 25,
      symmetry: 60,
      density: 5,
      weight: 20,
      asymmetry: 10,
      depth: 10,
      motion: 15,
    },
  },

  {
    id: "editorial",
    label: "Editorial",
    description:
      "Composition-led rather than decorative. Uses frames, lines, margins, blocks, controlled asymmetry and purposeful crops.",
    axes: {
      curvature: 25,
      angularity: 50,
      symmetry: 35,
      density: 30,
      weight: 20,
      asymmetry: 55,
      depth: 25,
      motion: 30,
    },
  },

  {
    id: "technical",
    label: "Technical",
    description:
      "Modular and systematic. Uses straight lines, corners, grids, repeated modules, brackets and coordinate-driven geometry.",
    axes: {
      curvature: 10,
      angularity: 90,
      symmetry: 70,
      density: 45,
      weight: 25,
      asymmetry: 15,
      depth: 25,
      motion: 35,
    },
  },

  {
    id: "precise",
    label: "Precise",
    description:
      "Highly controlled and repeatable. Uses consistent radii, strict spacing, crisp alignment and clean proportional systems.",
    axes: {
      curvature: 20,
      angularity: 65,
      symmetry: 85,
      density: 20,
      weight: 20,
      asymmetry: 5,
      depth: 15,
      motion: 15,
    },
  },

  {
    id: "futuristic",
    label: "Futuristic",
    description:
      "Clean but unconventional. Uses cuts, diagonals, layered planes, openings, offsets and interface-like spatial geometry.",
    axes: {
      curvature: 35,
      angularity: 70,
      symmetry: 35,
      density: 40,
      weight: 30,
      asymmetry: 55,
      depth: 70,
      motion: 55,
    },
  },

  {
    id: "experimental",
    label: "Experimental",
    description:
      "Rule-breaking and exploratory. Uses deformation, unusual intersections, scale contrast and deliberately unpredictable composition.",
    axes: {
      curvature: 60,
      angularity: 55,
      symmetry: 10,
      density: 55,
      weight: 45,
      asymmetry: 95,
      depth: 60,
      motion: 65,
    },
  },

  {
    id: "disruptive",
    label: "Disruptive",
    description:
      "Aggressive and high-contrast. Uses abrupt cuts, strong diagonals, interruptions, extreme offsets and visual tension.",
    axes: {
      curvature: 20,
      angularity: 95,
      symmetry: 5,
      density: 65,
      weight: 75,
      asymmetry: 95,
      depth: 45,
      motion: 80,
    },
  },

  {
    id: "bold",
    label: "Bold",
    description:
      "Compact and visually heavy. Uses strong silhouettes, thick strokes, large masses and high filled-to-empty ratios.",
    axes: {
      curvature: 30,
      angularity: 55,
      symmetry: 45,
      density: 45,
      weight: 95,
      asymmetry: 40,
      depth: 35,
      motion: 45,
    },
  },

  {
    id: "dynamic",
    label: "Dynamic",
    description:
      "Directional and active. Uses diagonals, progressive scale, offsets and compositions that suggest movement through the frame.",
    axes: {
      curvature: 25,
      angularity: 75,
      symmetry: 20,
      density: 55,
      weight: 50,
      asymmetry: 80,
      depth: 45,
      motion: 90,
    },
  },

  {
    id: "energetic",
    label: "Energetic",
    description:
      "Fast and high-frequency. Uses dense repetition, short rhythms, scale contrast and frequent directional changes.",
    axes: {
      curvature: 35,
      angularity: 65,
      symmetry: 15,
      density: 90,
      weight: 65,
      asymmetry: 75,
      depth: 45,
      motion: 95,
    },
  },

  {
    id: "playful",
    label: "Playful",
    description:
      "Soft, varied and deliberately irregular. Uses circles, capsules, curves, mixed scales, overlaps and controlled unpredictability.",
    axes: {
      curvature: 90,
      angularity: 10,
      symmetry: 15,
      density: 65,
      weight: 50,
      asymmetry: 80,
      depth: 35,
      motion: 70,
    },
  },

  {
    id: "youthful",
    label: "Youthful",
    description:
      "Fresh and direct. Uses simple expressive shapes, generous radii, scale contrast and less rigid composition.",
    axes: {
      curvature: 70,
      angularity: 25,
      symmetry: 25,
      density: 55,
      weight: 50,
      asymmetry: 65,
      depth: 30,
      motion: 65,
    },
  },

  {
    id: "friendly",
    label: "Friendly",
    description:
      "Open and approachable. Uses large radii, rounded corners, soft contours, balanced proportions and little visual tension.",
    axes: {
      curvature: 90,
      angularity: 5,
      symmetry: 55,
      density: 25,
      weight: 35,
      asymmetry: 25,
      depth: 20,
      motion: 30,
    },
  },

  {
    id: "organic",
    label: "Organic",
    description:
      "Fluid and non-cartesian. Uses continuous curves, irregular radii, asymmetrical contours and forms that appear to grow or adapt.",
    axes: {
      curvature: 100,
      angularity: 0,
      symmetry: 5,
      density: 40,
      weight: 35,
      asymmetry: 90,
      depth: 45,
      motion: 55,
    },
  },

  {
    id: "immersive",
    label: "Immersive",
    description:
      "Spatial and layered. Uses frames within frames, large crops, overlapping planes and geometry that surrounds the content.",
    axes: {
      curvature: 55,
      angularity: 35,
      symmetry: 25,
      density: 50,
      weight: 35,
      asymmetry: 55,
      depth: 100,
      motion: 65,
    },
  },

  {
    id: "cinematic",
    label: "Cinematic",
    description:
      "Broad, atmospheric and restrained. Uses large framing gestures, horizontal proportions, depth and dramatic negative space.",
    axes: {
      curvature: 70,
      angularity: 20,
      symmetry: 40,
      density: 15,
      weight: 20,
      asymmetry: 40,
      depth: 85,
      motion: 45,
    },
  },

  {
    id: "sporty",
    label: "Sporty",
    description:
      "Fast and tense. Uses sharp angles, elongated proportions, bars, directional repetition and strong velocity cues.",
    axes: {
      curvature: 10,
      angularity: 95,
      symmetry: 20,
      density: 65,
      weight: 65,
      asymmetry: 80,
      depth: 35,
      motion: 95,
    },
  },
] as const;

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export type BrandCharacterTrait =
  (typeof BRAND_CHARACTER_TRAITS)[number];

export type BrandCharacterTraitId =
  BrandCharacterTrait["id"];

/* ================================================= */
/* BACKWARDS COMPATIBILITY                           */
/* ================================================= */

export const brandCharacterTraits =
  BRAND_CHARACTER_TRAITS;

export const MAX_BRAND_CHARACTER_TRAITS = 2;

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

export function getTraitById(
  id: string
): BrandCharacterTrait | null {
  return (
    BRAND_CHARACTER_TRAITS.find(
      (trait) => trait.id === id
    ) ?? null
  );
}

export function isBrandCharacterTraitId(
  value: string
): value is BrandCharacterTraitId {
  return BRAND_CHARACTER_TRAITS.some(
    (trait) => trait.id === value
  );
}