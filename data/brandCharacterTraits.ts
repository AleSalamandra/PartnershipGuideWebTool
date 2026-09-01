/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

export type BrandCharacterTraitId =
  | "classic"
  | "elegant"
  | "premium"
  | "minimal"
  | "editorial"
  | "technical"
  | "precise"
  | "futuristic"
  | "experimental"
  | "disruptive"
  | "bold"
  | "dynamic"
  | "energetic"
  | "playful"
  | "youthful"
  | "friendly"
  | "organic"
  | "immersive"
  | "cinematic"
  | "sporty";

export interface BrandCharacterTrait {
  id: BrandCharacterTraitId;
  label: string;

  description: string;

  /*
    Short translation of character
    into actual graphic behaviour.
  */

  graphicImplication: string;
}

/* ------------------------------------------------ */
/* CHARACTER TRAITS                                 */
/* ------------------------------------------------ */

export const brandCharacterTraits: BrandCharacterTrait[] =
  [
    {
      id: "classic",
      label: "Classic",

      description:
        "Stable proportions, symmetry and established visual codes.",

      graphicImplication:
        "Symmetry, stable frames, controlled proportions and low distortion.",
    },

    {
      id: "elegant",
      label: "Elegant",

      description:
        "Refined detail, generous space and restrained expression.",

      graphicImplication:
        "Fine lines, generous negative space and restrained graphic density.",
    },

    {
      id: "premium",
      label: "Premium",

      description:
        "Sophisticated materials, precision and controlled visual density.",

      graphicImplication:
        "Low density, subtle depth, refined surfaces and controlled glow.",
    },

    {
      id: "minimal",
      label: "Minimal",

      description:
        "Reduction, negative space and simple geometric systems.",

      graphicImplication:
        "Few primitives, simple geometry, neutral surfaces and more empty space.",
    },

    {
      id: "editorial",
      label: "Editorial",

      description:
        "Strong grids, typographic hierarchy and curated compositions.",

      graphicImplication:
        "Strong grids, cropped frames, structured masks and clear hierarchy.",
    },

    {
      id: "technical",
      label: "Technical",

      description:
        "Systems, data, diagrams, precision lines and functional graphics.",

      graphicImplication:
        "Fine lines, visible grids, data layers, diagrams and functional UI.",
    },

    {
      id: "precise",
      label: "Precise",

      description:
        "Strict geometry, alignment and controlled visual rhythm.",

      graphicImplication:
        "Exact alignment, strict geometry, repeated radii and consistent spacing.",
    },

    {
      id: "futuristic",
      label: "Futuristic",

      description:
        "Depth, digital light, spatial interfaces and advanced technology.",

      graphicImplication:
        "Glow, depth, spatial frames, digital gradients and subtle particles.",
    },

    {
      id: "experimental",
      label: "Experimental",

      description:
        "Unexpected masks, distortion, unconventional layouts and visual exploration.",

      graphicImplication:
        "Irregular masks, distortion, broken alignment and unexpected composition.",
    },

    {
      id: "disruptive",
      label: "Disruptive",

      description:
        "Strong contrast, scale shifts and deliberate visual tension.",

      graphicImplication:
        "Scale shifts, diagonals, broken grids and deliberate visual tension.",
    },

    {
      id: "bold",
      label: "Bold",

      description:
        "Large graphic masses, strong scale and immediate visual impact.",

      graphicImplication:
        "Large shapes, heavier lines, strong contrast and oversized graphic masses.",
    },

    {
      id: "dynamic",
      label: "Dynamic",

      description:
        "Directional layouts, diagonals and a sense of continuous movement.",

      graphicImplication:
        "Directional lines, diagonals, asymmetric layouts and active visualizers.",
    },

    {
      id: "energetic",
      label: "Energetic",

      description:
        "Fast rhythm, particles, pulses and high visual activity.",

      graphicImplication:
        "Higher density, particles, pulses, visualizers and rapid visual rhythm.",
    },

    {
      id: "playful",
      label: "Playful",

      description:
        "Flexible forms, surprise, elasticity and expressive movement.",

      graphicImplication:
        "Rounded shapes, variable scale, soft masks and unexpected combinations.",
    },

    {
      id: "youthful",
      label: "Youthful",

      description:
        "Fresh, spontaneous and culturally contemporary visual behaviour.",

      graphicImplication:
        "Asymmetry, fresher layouts, flexible grids and more expressive accents.",
    },

    {
      id: "friendly",
      label: "Friendly",

      description:
        "Soft shapes, approachable proportions and gentle interactions.",

      graphicImplication:
        "Soft corners, open spacing, rounded UI and approachable proportions.",
    },

    {
      id: "organic",
      label: "Organic",

      description:
        "Irregular forms, flowing movement and natural visual behaviour.",

      graphicImplication:
        "Fluid curves, irregular silhouettes, organic masks and less rigid grids.",
    },

    {
      id: "immersive",
      label: "Immersive",

      description:
        "Spatial depth, layers, scale transitions and environmental graphics.",

      graphicImplication:
        "Layering, spatial depth, overlapping frames and environmental scale.",
    },

    {
      id: "cinematic",
      label: "Cinematic",

      description:
        "Atmosphere, light, dramatic framing and narrative visual rhythm.",

      graphicImplication:
        "Atmospheric gradients, dark framing, controlled glow and visual depth.",
    },

    {
      id: "sporty",
      label: "Sporty",

      description:
        "Speed, performance data, tension and high-impact movement.",

      graphicImplication:
        "Speed lines, diagonals, data overlays, tracking graphics and visualizers.",
    },
  ];

/* ------------------------------------------------ */
/* LIMIT                                            */
/* ------------------------------------------------ */

export const MAX_BRAND_CHARACTER_TRAITS =
  5;