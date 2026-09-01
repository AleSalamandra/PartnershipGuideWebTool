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
    },

    {
      id: "elegant",
      label: "Elegant",
      description:
        "Refined detail, generous space and restrained expression.",
    },

    {
      id: "premium",
      label: "Premium",
      description:
        "Sophisticated materials, precision and controlled visual density.",
    },

    {
      id: "minimal",
      label: "Minimal",
      description:
        "Reduction, negative space and simple geometric systems.",
    },

    {
      id: "editorial",
      label: "Editorial",
      description:
        "Strong grids, typographic hierarchy and curated compositions.",
    },

    {
      id: "technical",
      label: "Technical",
      description:
        "Systems, data, diagrams, precision lines and functional graphics.",
    },

    {
      id: "precise",
      label: "Precise",
      description:
        "Strict geometry, alignment and controlled visual rhythm.",
    },

    {
      id: "futuristic",
      label: "Futuristic",
      description:
        "Depth, digital light, spatial interfaces and advanced technology.",
    },

    {
      id: "experimental",
      label: "Experimental",
      description:
        "Unexpected masks, distortion, unconventional layouts and visual exploration.",
    },

    {
      id: "disruptive",
      label: "Disruptive",
      description:
        "Strong contrast, scale shifts and deliberate visual tension.",
    },

    {
      id: "bold",
      label: "Bold",
      description:
        "Large graphic masses, strong scale and immediate visual impact.",
    },

    {
      id: "dynamic",
      label: "Dynamic",
      description:
        "Directional layouts, diagonals and a sense of continuous movement.",
    },

    {
      id: "energetic",
      label: "Energetic",
      description:
        "Fast rhythm, particles, pulses and high visual activity.",
    },

    {
      id: "playful",
      label: "Playful",
      description:
        "Flexible forms, surprise, elasticity and expressive movement.",
    },

    {
      id: "youthful",
      label: "Youthful",
      description:
        "Fresh, spontaneous and culturally contemporary visual behaviour.",
    },

    {
      id: "friendly",
      label: "Friendly",
      description:
        "Soft shapes, approachable proportions and gentle interactions.",
    },

    {
      id: "organic",
      label: "Organic",
      description:
        "Irregular forms, flowing movement and natural visual behaviour.",
    },

    {
      id: "immersive",
      label: "Immersive",
      description:
        "Spatial depth, layers, scale transitions and environmental graphics.",
    },

    {
      id: "cinematic",
      label: "Cinematic",
      description:
        "Atmosphere, light, dramatic framing and narrative visual rhythm.",
    },

    {
      id: "sporty",
      label: "Sporty",
      description:
        "Speed, performance data, tension and high-impact movement.",
    },
  ];

export const MAX_BRAND_CHARACTER_TRAITS =
  5;