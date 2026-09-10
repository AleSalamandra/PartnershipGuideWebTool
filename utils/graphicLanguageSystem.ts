import {
  getTraitById,
  type BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import type {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* PUBLIC TYPES                                      */
/* ================================================= */

export type ShapeStyle =
  | "restrained"
  | "rounded"
  | "angular"
  | "organic"
  | "editorial"
  | "bold";

export type LineStyle =
  | "hairline"
  | "measured"
  | "directional"
  | "expressive";

export type MaskStyle =
  | "clean"
  | "soft"
  | "cropped"
  | "angular"
  | "layered";

export type GridStyle =
  | "strict"
  | "editorial"
  | "open"
  | "offset"
  | "dense";

export type UIStyle =
  | "minimal"
  | "soft"
  | "modular"
  | "data"
  | "bold";

export type TextureStyle =
  | "clean"
  | "grain"
  | "atmospheric"
  | "digital"
  | "tactile";

export type GlowStyle =
  | "none"
  | "soft"
  | "focused"
  | "luminous";

export type DepthStyle =
  | "flat"
  | "subtle"
  | "layered"
  | "immersive";

export type AdditionalRelationshipMode =
  | "none"
  | "presenting"
  | "sponsored";

/* ================================================= */
/* BRAND                                             */
/* ================================================= */

export interface LanguageBrand {
  name: string;

  logoUrl: string | null;

  primaryColor: string;
  secondaryColor: string;

  fontFamily: string;

  characterTraits:
    BrandCharacterTraitId[];
}

/* ================================================= */
/* CATEGORY                                          */
/* ================================================= */

export interface GraphicCategory<
  T extends string
> {
  style: T;

  label: string;

  description: string;
}

/* ================================================= */
/* RESULT                                            */
/* ================================================= */

export interface GraphicLanguageSystem {
  structureName: string;
  expressionName: string;

  structureTraits:
    BrandCharacterTraitId[];

  expressionTraits:
    BrandCharacterTraitId[];

  primaryColor: string;
  secondaryColor: string;
  supportColor: string;

  fontFamily: string;

  summary: string;

  shapes:
    GraphicCategory<ShapeStyle>;

  lines:
    GraphicCategory<LineStyle>;

  masks:
    GraphicCategory<MaskStyle>;

  grid:
    GraphicCategory<GridStyle>;

  ui:
    GraphicCategory<UIStyle>;

  texture:
    GraphicCategory<TextureStyle>;

  glow:
    GraphicCategory<GlowStyle>;

  depth:
    GraphicCategory<DepthStyle>;
}

/* ================================================= */
/* INTERNAL                                          */
/* ================================================= */

interface WeightedTrait {
  id:
    BrandCharacterTraitId;

  weight:
    number;
}

type CategoryScores<
  T extends string
> =
  Partial<
    Record<
      T,
      number
    >
  >;

interface TraitLanguage {
  shapes:
    CategoryScores<ShapeStyle>;

  lines:
    CategoryScores<LineStyle>;

  masks:
    CategoryScores<MaskStyle>;

  grid:
    CategoryScores<GridStyle>;

  ui:
    CategoryScores<UIStyle>;

  texture:
    CategoryScores<TextureStyle>;

  glow:
    CategoryScores<GlowStyle>;

  depth:
    CategoryScores<DepthStyle>;
}

/* ================================================= */
/* OPTIONS                                           */
/* ================================================= */

const SHAPES: ShapeStyle[] = [
  "restrained",
  "rounded",
  "angular",
  "organic",
  "editorial",
  "bold",
];

const LINES: LineStyle[] = [
  "hairline",
  "measured",
  "directional",
  "expressive",
];

const MASKS: MaskStyle[] = [
  "clean",
  "soft",
  "cropped",
  "angular",
  "layered",
];

const GRIDS: GridStyle[] = [
  "strict",
  "editorial",
  "open",
  "offset",
  "dense",
];

const UIS: UIStyle[] = [
  "minimal",
  "soft",
  "modular",
  "data",
  "bold",
];

const TEXTURES: TextureStyle[] = [
  "clean",
  "grain",
  "atmospheric",
  "digital",
  "tactile",
];

const GLOWS: GlowStyle[] = [
  "none",
  "soft",
  "focused",
  "luminous",
];

const DEPTHS: DepthStyle[] = [
  "flat",
  "subtle",
  "layered",
  "immersive",
];

/* ================================================= */
/* HELPER                                            */
/* ================================================= */

function trait(
  value:
    Partial<TraitLanguage>
): TraitLanguage {
  return {
    shapes:
      value.shapes ?? {},

    lines:
      value.lines ?? {},

    masks:
      value.masks ?? {},

    grid:
      value.grid ?? {},

    ui:
      value.ui ?? {},

    texture:
      value.texture ?? {},

    glow:
      value.glow ?? {},

    depth:
      value.depth ?? {},
  };
}

/* ================================================= */
/* CHARACTER LANGUAGE                                */
/* ================================================= */

/*
  Each trait influences each application separately.

  This deliberately avoids one universal
  "character score".
*/

const TRAIT_LANGUAGE:
  Record<
    BrandCharacterTraitId,
    TraitLanguage
  > = {
    classic:
      trait({
        shapes: {
          restrained: 1,
        },

        lines: {
          measured: 1,
        },

        masks: {
          clean: 1,
        },

        grid: {
          strict: 0.75,
          editorial: 0.25,
        },

        ui: {
          minimal: 0.65,
          modular: 0.35,
        },

        texture: {
          clean: 0.8,
          grain: 0.2,
        },

        glow: {
          none: 1,
        },

        depth: {
          flat: 0.8,
          subtle: 0.2,
        },
      }),

    elegant:
      trait({
        shapes: {
          rounded: 0.62,
          restrained: 0.38,
        },

        lines: {
          hairline: 1,
        },

        masks: {
          soft: 0.6,
          clean: 0.4,
        },

        grid: {
          open: 1,
        },

        ui: {
          minimal: 1,
        },

        texture: {
          clean: 0.55,
          atmospheric: 0.45,
        },

        glow: {
          soft: 0.65,
          none: 0.35,
        },

        depth: {
          subtle: 1,
        },
      }),

    premium:
      trait({
        shapes: {
          restrained: 1,
        },

        lines: {
          hairline: 0.65,
          measured: 0.35,
        },

        masks: {
          clean: 1,
        },

        grid: {
          open: 0.75,
          editorial: 0.25,
        },

        ui: {
          minimal: 1,
        },

        texture: {
          grain: 0.55,
          clean: 0.45,
        },

        glow: {
          soft: 0.6,
          none: 0.4,
        },

        depth: {
          subtle: 1,
        },
      }),

    minimal:
      trait({
        shapes: {
          restrained: 1,
        },

        lines: {
          hairline: 1,
        },

        masks: {
          clean: 1,
        },

        grid: {
          open: 1,
        },

        ui: {
          minimal: 1,
        },

        texture: {
          clean: 1,
        },

        glow: {
          none: 1,
        },

        depth: {
          flat: 1,
        },
      }),

    editorial:
      trait({
        shapes: {
          editorial: 1,
        },

        lines: {
          hairline: 0.7,
          measured: 0.3,
        },

        masks: {
          cropped: 1,
        },

        grid: {
          editorial: 1,
        },

        ui: {
          minimal: 0.7,
          modular: 0.3,
        },

        texture: {
          grain: 0.7,
          clean: 0.3,
        },

        glow: {
          none: 0.8,
          soft: 0.2,
        },

        depth: {
          subtle: 0.7,
          flat: 0.3,
        },
      }),

    technical:
      trait({
        shapes: {
          angular: 1,
        },

        lines: {
          measured: 0.8,
          directional: 0.2,
        },

        masks: {
          angular: 0.7,
          clean: 0.3,
        },

        grid: {
          strict: 1,
        },

        ui: {
          modular: 0.45,
          data: 0.55,
        },

        texture: {
          digital: 0.8,
          clean: 0.2,
        },

        glow: {
          focused: 0.7,
          none: 0.3,
        },

        depth: {
          subtle: 0.65,
          flat: 0.35,
        },
      }),

    precise:
      trait({
        shapes: {
          restrained: 0.55,
          angular: 0.45,
        },

        lines: {
          measured: 1,
        },

        masks: {
          clean: 1,
        },

        grid: {
          strict: 1,
        },

        ui: {
          modular: 0.7,
          minimal: 0.3,
        },

        texture: {
          clean: 1,
        },

        glow: {
          none: 1,
        },

        depth: {
          flat: 0.8,
          subtle: 0.2,
        },
      }),

    futuristic:
      trait({
        shapes: {
          angular: 0.65,
          editorial: 0.35,
        },

        lines: {
          directional: 0.7,
          measured: 0.3,
        },

        masks: {
          layered: 0.55,
          angular: 0.45,
        },

        grid: {
          strict: 0.55,
          offset: 0.45,
        },

        ui: {
          data: 1,
        },

        texture: {
          digital: 1,
        },

        glow: {
          luminous: 0.8,
          focused: 0.2,
        },

        depth: {
          layered: 1,
        },
      }),

    experimental:
      trait({
        shapes: {
          organic: 0.55,
          editorial: 0.45,
        },

        lines: {
          expressive: 1,
        },

        masks: {
          cropped: 0.55,
          layered: 0.45,
        },

        grid: {
          offset: 1,
        },

        ui: {
          bold: 0.55,
          modular: 0.45,
        },

        texture: {
          tactile: 0.55,
          digital: 0.45,
        },

        glow: {
          luminous: 0.6,
          focused: 0.4,
        },

        depth: {
          layered: 1,
        },
      }),

    disruptive:
      trait({
        shapes: {
          angular: 0.65,
          bold: 0.35,
        },

        lines: {
          directional: 1,
        },

        masks: {
          angular: 0.7,
          cropped: 0.3,
        },

        grid: {
          offset: 0.7,
          dense: 0.3,
        },

        ui: {
          bold: 0.7,
          data: 0.3,
        },

        texture: {
          digital: 1,
        },

        glow: {
          focused: 0.7,
          luminous: 0.3,
        },

        depth: {
          layered: 0.75,
          subtle: 0.25,
        },
      }),

    bold:
      trait({
        shapes: {
          bold: 1,
        },

        lines: {
          directional: 0.55,
          measured: 0.45,
        },

        masks: {
          angular: 0.55,
          clean: 0.45,
        },

        grid: {
          dense: 0.6,
          strict: 0.4,
        },

        ui: {
          bold: 1,
        },

        texture: {
          clean: 0.65,
          digital: 0.35,
        },

        glow: {
          focused: 0.65,
          none: 0.35,
        },

        depth: {
          subtle: 0.8,
          flat: 0.2,
        },
      }),

    dynamic:
      trait({
        shapes: {
          angular: 0.55,
          editorial: 0.45,
        },

        lines: {
          directional: 1,
        },

        masks: {
          cropped: 0.6,
          angular: 0.4,
        },

        grid: {
          offset: 1,
        },

        ui: {
          data: 0.7,
          modular: 0.3,
        },

        texture: {
          digital: 0.7,
          clean: 0.3,
        },

        glow: {
          focused: 0.75,
          soft: 0.25,
        },

        depth: {
          layered: 0.65,
          subtle: 0.35,
        },
      }),

    energetic:
      trait({
        shapes: {
          bold: 0.55,
          angular: 0.45,
        },

        lines: {
          directional: 1,
        },

        masks: {
          angular: 0.75,
          cropped: 0.25,
        },

        grid: {
          dense: 1,
        },

        ui: {
          data: 0.55,
          bold: 0.45,
        },

        texture: {
          digital: 1,
        },

        glow: {
          luminous: 0.75,
          focused: 0.25,
        },

        depth: {
          layered: 1,
        },
      }),

    playful:
      trait({
        shapes: {
          rounded: 0.65,
          organic: 0.35,
        },

        lines: {
          expressive: 1,
        },

        masks: {
          soft: 1,
        },

        grid: {
          offset: 1,
        },

        ui: {
          soft: 1,
        },

        texture: {
          tactile: 0.7,
          clean: 0.3,
        },

        glow: {
          soft: 1,
        },

        depth: {
          subtle: 1,
        },
      }),

    youthful:
      trait({
        shapes: {
          rounded: 1,
        },

        lines: {
          directional: 0.55,
          expressive: 0.45,
        },

        masks: {
          soft: 0.65,
          cropped: 0.35,
        },

        grid: {
          offset: 1,
        },

        ui: {
          soft: 1,
        },

        texture: {
          digital: 0.55,
          clean: 0.45,
        },

        glow: {
          soft: 1,
        },

        depth: {
          subtle: 1,
        },
      }),

    friendly:
      trait({
        shapes: {
          rounded: 1,
        },

        lines: {
          measured: 1,
        },

        masks: {
          soft: 1,
        },

        grid: {
          open: 1,
        },

        ui: {
          soft: 1,
        },

        texture: {
          clean: 1,
        },

        glow: {
          none: 0.6,
          soft: 0.4,
        },

        depth: {
          flat: 0.7,
          subtle: 0.3,
        },
      }),

    organic:
      trait({
        shapes: {
          organic: 1,
        },

        lines: {
          expressive: 1,
        },

        masks: {
          soft: 1,
        },

        grid: {
          open: 0.55,
          offset: 0.45,
        },

        ui: {
          soft: 1,
        },

        texture: {
          tactile: 1,
        },

        glow: {
          soft: 1,
        },

        depth: {
          layered: 0.7,
          subtle: 0.3,
        },
      }),

    immersive:
      trait({
        shapes: {
          editorial: 0.4,
          rounded: 0.35,
          organic: 0.25,
        },

        lines: {
          measured: 0.6,
          expressive: 0.4,
        },

        masks: {
          layered: 1,
        },

        grid: {
          open: 0.7,
          offset: 0.3,
        },

        ui: {
          minimal: 0.6,
          data: 0.4,
        },

        texture: {
          atmospheric: 1,
        },

        glow: {
          luminous: 0.7,
          soft: 0.3,
        },

        depth: {
          immersive: 1,
        },
      }),

    cinematic:
      trait({
        shapes: {
          editorial: 0.6,
          restrained: 0.4,
        },

        lines: {
          hairline: 1,
        },

        masks: {
          cropped: 0.7,
          layered: 0.3,
        },

        grid: {
          open: 0.6,
          editorial: 0.4,
        },

        ui: {
          minimal: 1,
        },

        texture: {
          atmospheric: 0.75,
          grain: 0.25,
        },

        glow: {
          soft: 1,
        },

        depth: {
          layered: 0.8,
          subtle: 0.2,
        },
      }),

    sporty:
      trait({
        shapes: {
          angular: 0.82,
          bold: 0.18,
        },

        lines: {
          directional: 1,
        },

        masks: {
          angular: 0.8,
          cropped: 0.2,
        },

        grid: {
          strict: 0.55,
          dense: 0.45,
        },

        ui: {
          data: 1,
        },

        texture: {
          digital: 1,
        },

        glow: {
          focused: 1,
        },

        depth: {
          layered: 0.55,
          subtle: 0.45,
        },
      }),
  };

/* ================================================= */
/* CATEGORY ROLE WEIGHTS                             */
/* ================================================= */

/*
  Structure dominates layout / system categories.
  Expression dominates aesthetic categories.
*/

const ROLE_WEIGHTS = {
  shapes: {
    structure: 0.2,
    expression: 1,
  },

  lines: {
    structure: 0.25,
    expression: 1,
  },

  masks: {
    structure: 0.65,
    expression: 0.8,
  },

  grid: {
    structure: 1,
    expression: 0.2,
  },

  ui: {
    structure: 0.85,
    expression: 0.35,
  },

  texture: {
    structure: 0.05,
    expression: 1,
  },

  glow: {
    structure: 0.05,
    expression: 1,
  },

  depth: {
    structure: 0.3,
    expression: 0.9,
  },
} as const;

/* ================================================= */
/* COPY                                              */
/* ================================================= */

const SHAPE_COPY: Record<
  ShapeStyle,
  {
    label: string;
    description: string;
  }
> = {
  restrained: {
    label:
      "Restrained geometry",

    description:
      "Few stable forms, controlled proportions and generous negative space.",
  },

  rounded: {
    label:
      "Soft geometry",

    description:
      "Rounded forms, generous radii and approachable continuous contours.",
  },

  angular: {
    label:
      "Angular geometry",

    description:
      "Straight edges, cuts and directional geometric construction.",
  },

  organic: {
    label:
      "Organic geometry",

    description:
      "Fluid asymmetric forms with irregular curvature and adaptive contours.",
  },

  editorial: {
    label:
      "Editorial geometry",

    description:
      "Frames, blocks and crops become compositional devices rather than decoration.",
  },

  bold: {
    label:
      "Bold geometry",

    description:
      "Large compact masses and strong silhouettes create immediate presence.",
  },
};

const LINE_COPY: Record<
  LineStyle,
  {
    label: string;
    description: string;
  }
> = {
  hairline: {
    label:
      "Fine / extended",

    description:
      "Long thin strokes, low frequency and generous spacing.",
  },

  measured: {
    label:
      "Measured rhythm",

    description:
      "Consistent lengths, spacing and controlled repetition.",
  },

  directional: {
    label:
      "Directional",

    description:
      "Lines create momentum through angle, progression and direction.",
  },

  expressive: {
    label:
      "Expressive",

    description:
      "Curved or irregular strokes introduce freer visual rhythm.",
  },
};

const MASK_COPY: Record<
  MaskStyle,
  {
    label: string;
    description: string;
  }
> = {
  clean: {
    label:
      "Clean containment",

    description:
      "Simple windows with stable margins and minimal intervention.",
  },

  soft: {
    label:
      "Soft framing",

    description:
      "Rounded windows and gentle containment reduce visual tension.",
  },

  cropped: {
    label:
      "Editorial crops",

    description:
      "Frames extend beyond the viewport to create scale and focus.",
  },

  angular: {
    label:
      "Cut framing",

    description:
      "Directional cuts create sharper visual hierarchy.",
  },

  layered: {
    label:
      "Layered masks",

    description:
      "Multiple spatial windows separate content, graphics and interface.",
  },
};

const GRID_COPY: Record<
  GridStyle,
  {
    label: string;
    description: string;
  }
> = {
  strict: {
    label:
      "Structured grid",

    description:
      "Regular columns, repeated spacing and clear alignment rules.",
  },

  editorial: {
    label:
      "Editorial grid",

    description:
      "Strong margins with controlled asymmetry and intentional alignment shifts.",
  },

  open: {
    label:
      "Open composition",

    description:
      "Generous negative space and fewer alignment constraints.",
  },

  offset: {
    label:
      "Offset composition",

    description:
      "Asymmetrical positioning creates energy over an underlying system.",
  },

  dense: {
    label:
      "Dense system",

    description:
      "More modules and shorter spacing create greater visual frequency.",
  },
};

const UI_COPY: Record<
  UIStyle,
  {
    label: string;
    description: string;
  }
> = {
  minimal: {
    label:
      "Minimal UI",

    description:
      "Only essential controls, labels and metadata remain visible.",
  },

  soft: {
    label:
      "Soft UI",

    description:
      "Rounded controls and calm containers create an approachable interface.",
  },

  modular: {
    label:
      "Modular UI",

    description:
      "Repeated components and predictable containers reinforce system logic.",
  },

  data: {
    label:
      "Data-led UI",

    description:
      "Metrics, indicators and compact data modules become visual assets.",
  },

  bold: {
    label:
      "High-emphasis UI",

    description:
      "Larger controls and stronger blocks prioritise visibility and immediacy.",
  },
};

const TEXTURE_COPY: Record<
  TextureStyle,
  {
    label: string;
    description: string;
  }
> = {
  clean: {
    label:
      "Clean surface",

    description:
      "Surfaces remain almost untouched and rely on image, type and composition.",
  },

  grain: {
    label:
      "Fine grain",

    description:
      "Restrained grain removes digital flatness without becoming decorative.",
  },

  atmospheric: {
    label:
      "Atmospheric",

    description:
      "Soft tonal variation supports depth, mood and image-led storytelling.",
  },

  digital: {
    label:
      "Digital texture",

    description:
      "Raster or systematic micro-patterns reinforce technological character.",
  },

  tactile: {
    label:
      "Tactile texture",

    description:
      "Irregular surface variation introduces a more physical quality.",
  },
};

const GLOW_COPY: Record<
  GlowStyle,
  {
    label: string;
    description: string;
  }
> = {
  none: {
    label:
      "No glow",

    description:
      "Hierarchy relies on form, colour and typography alone.",
  },

  soft: {
    label:
      "Soft atmosphere",

    description:
      "Broad low-intensity light creates atmosphere without becoming an effect.",
  },

  focused: {
    label:
      "Focused accent",

    description:
      "Small luminous areas reinforce active or directional information.",
  },

  luminous: {
    label:
      "Luminous field",

    description:
      "Light becomes a spatial layer while remaining secondary to content.",
  },
};

const DEPTH_COPY: Record<
  DepthStyle,
  {
    label: string;
    description: string;
  }
> = {
  flat: {
    label:
      "Flat",

    description:
      "Elements remain on one primary visual plane.",
  },

  subtle: {
    label:
      "Subtle depth",

    description:
      "A few overlapping planes create hierarchy without complexity.",
  },

  layered: {
    label:
      "Layered",

    description:
      "Foreground, content and background become clearly separated planes.",
  },

  immersive: {
    label:
      "Immersive depth",

    description:
      "Layers extend beyond conventional frames into environmental composition.",
  },
};

/* ================================================= */
/* WEIGHTS                                           */
/* ================================================= */

function weighted(
  traits:
    BrandCharacterTraitId[],

  weight:
    number
): WeightedTrait[] {
  return traits.map(
    (
      id
    ) => ({
      id,
      weight,
    })
  );
}

function unique(
  values:
    WeightedTrait[]
): BrandCharacterTraitId[] {
  return Array.from(
    new Set(
      values.map(
        (
          value
        ) =>
          value.id
      )
    )
  );
}

/* ================================================= */
/* RESOLVE                                           */
/* ================================================= */

function resolve<
  T extends string
>({
  variants,

  structure,
  expression,

  getPreferences,

  structureWeight,
  expressionWeight,

  fallback,
}: {
  variants:
    readonly T[];

  structure:
    WeightedTrait[];

  expression:
    WeightedTrait[];

  getPreferences: (
    trait:
      TraitLanguage
  ) => CategoryScores<T>;

  structureWeight:
    number;

  expressionWeight:
    number;

  fallback:
    T;
}): T {
  const scores =
    new Map<
      T,
      number
    >();

  variants.forEach(
    (
      variant
    ) =>
      scores.set(
        variant,
        0
      )
  );

  function add(
    source:
      WeightedTrait[],

    roleWeight:
      number
  ) {
    source.forEach(
      (
        weightedTrait
      ) => {
        const definition =
          TRAIT_LANGUAGE[
            weightedTrait.id
          ];

        const preferences =
          getPreferences(
            definition
          );

        variants.forEach(
          (
            variant
          ) => {
            const influence =
              preferences[
                variant
              ] ??
              0;

            const current =
              scores.get(
                variant
              ) ??
              0;

            scores.set(
              variant,

              current +
                influence *
                  weightedTrait.weight *
                  roleWeight
            );
          }
        );
      }
    );
  }

  add(
    structure,
    structureWeight
  );

  add(
    expression,
    expressionWeight
  );

  let winner =
    fallback;

  let winnerScore =
    -1;

  variants.forEach(
    (
      variant
    ) => {
      const score =
        scores.get(
          variant
        ) ??
        0;

      if (
        score >
        winnerScore
      ) {
        winner =
          variant;

        winnerScore =
          score;
      }
    }
  );

  return winner;
}

/* ================================================= */
/* BUILD                                             */
/* ================================================= */

export function buildGraphicLanguageSystem({
  model,

  additionalRelationship,

  brandA,
  brandB,
  propertyX,
}: {
  model:
    PartnershipModelId;

  additionalRelationship:
    AdditionalRelationshipMode;

  brandA:
    LanguageBrand;

  brandB:
    LanguageBrand;

  propertyX:
    LanguageBrand;
}): GraphicLanguageSystem {
  let structure:
    WeightedTrait[] = [];

  let expression:
    WeightedTrait[] = [];

  let structureName =
    brandA.name;

  let expressionName =
    brandA.name;

  let primaryColor =
    brandA.primaryColor;

  let secondaryColor =
    brandA.secondaryColor;

  let supportColor =
    brandB.primaryColor;

  let fontFamily =
    brandA.fontFamily;

  /* ------------------------------------------------ */
  /* PARTNERSHIP                                      */
  /* ------------------------------------------------ */

  switch (
    model
  ) {
    case "axb":
      structure = [
        ...weighted(
          brandA.characterTraits,
          0.5
        ),

        ...weighted(
          brandB.characterTraits,
          0.5
        ),
      ];

      expression = [
        ...weighted(
          brandA.characterTraits,
          0.5
        ),

        ...weighted(
          brandB.characterTraits,
          0.5
        ),
      ];

      structureName =
        `${brandA.name} + ${brandB.name}`;

      expressionName =
        `${brandA.name} + ${brandB.name}`;

      primaryColor =
        brandA.primaryColor;

      secondaryColor =
        brandB.primaryColor;

      supportColor =
        brandA.secondaryColor;

      fontFamily =
        brandA.fontFamily;

      break;

    case "aandb":
      structure = [
        ...weighted(
          brandA.characterTraits,
          0.8
        ),

        ...weighted(
          brandB.characterTraits,
          0.2
        ),
      ];

      expression = [
        ...weighted(
          brandA.characterTraits,
          0.75
        ),

        ...weighted(
          brandB.characterTraits,
          0.25
        ),
      ];

      structureName =
        brandA.name;

      expressionName =
        brandA.name;

      primaryColor =
        brandA.primaryColor;

      secondaryColor =
        brandA.secondaryColor;

      supportColor =
        brandB.primaryColor;

      fontFamily =
        brandA.fontFamily;

      break;

    case "poweredByA":
      structure = [
        ...weighted(
          brandB.characterTraits,
          0.85
        ),

        ...weighted(
          brandA.characterTraits,
          0.15
        ),
      ];

      expression = [
        ...weighted(
          brandB.characterTraits,
          0.95
        ),

        ...weighted(
          brandA.characterTraits,
          0.05
        ),
      ];

      structureName =
        brandB.name;

      expressionName =
        brandB.name;

      primaryColor =
        brandB.primaryColor;

      secondaryColor =
        brandB.secondaryColor;

      supportColor =
        brandA.primaryColor;

      fontFamily =
        brandB.fontFamily;

      break;

    case "presentsB":
    default:
      structure =
        weighted(
          brandA.characterTraits,
          1
        );

      expression =
        weighted(
          brandB.characterTraits,
          1
        );

      structureName =
        brandA.name;

      expressionName =
        brandB.name;

      primaryColor =
        brandB.primaryColor;

      secondaryColor =
        brandB.secondaryColor;

      supportColor =
        brandA.primaryColor;

      fontFamily =
        brandB.fontFamily;

      break;
  }

  /* ------------------------------------------------ */
  /* PRESENTING X                                     */
  /* ------------------------------------------------ */

  if (
    additionalRelationship ===
    "presenting"
  ) {
    expression =
      weighted(
        propertyX.characterTraits,
        1
      );

    expressionName =
      propertyX.name;

    primaryColor =
      propertyX.primaryColor;

    secondaryColor =
      propertyX.secondaryColor;

    fontFamily =
      propertyX.fontFamily;
  }

  /*
    Sponsored X intentionally has
    no effect on Page10 language.
  */

  /* ------------------------------------------------ */
  /* CATEGORIES                                       */
  /* ------------------------------------------------ */

  const shapes =
    resolve({
      variants:
        SHAPES,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.shapes,

      structureWeight:
        ROLE_WEIGHTS
          .shapes
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .shapes
          .expression,

      fallback:
        "restrained",
    });

  const lines =
    resolve({
      variants:
        LINES,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.lines,

      structureWeight:
        ROLE_WEIGHTS
          .lines
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .lines
          .expression,

      fallback:
        "measured",
    });

  const masks =
    resolve({
      variants:
        MASKS,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.masks,

      structureWeight:
        ROLE_WEIGHTS
          .masks
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .masks
          .expression,

      fallback:
        "clean",
    });

  const grid =
    resolve({
      variants:
        GRIDS,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.grid,

      structureWeight:
        ROLE_WEIGHTS
          .grid
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .grid
          .expression,

      fallback:
        "open",
    });

  const ui =
    resolve({
      variants:
        UIS,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.ui,

      structureWeight:
        ROLE_WEIGHTS
          .ui
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .ui
          .expression,

      fallback:
        "minimal",
    });

  const texture =
    resolve({
      variants:
        TEXTURES,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.texture,

      structureWeight:
        ROLE_WEIGHTS
          .texture
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .texture
          .expression,

      fallback:
        "clean",
    });

  const glow =
    resolve({
      variants:
        GLOWS,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.glow,

      structureWeight:
        ROLE_WEIGHTS
          .glow
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .glow
          .expression,

      fallback:
        "none",
    });

  const depth =
    resolve({
      variants:
        DEPTHS,

      structure,
      expression,

      getPreferences:
        (
          value
        ) =>
          value.depth,

      structureWeight:
        ROLE_WEIGHTS
          .depth
          .structure,

      expressionWeight:
        ROLE_WEIGHTS
          .depth
          .expression,

      fallback:
        "flat",
    });

  /* ------------------------------------------------ */
  /* SUMMARY                                          */
  /* ------------------------------------------------ */

  const expressionTraitIds =
    unique(
      expression
    );

  const labels =
    expressionTraitIds
      .map(
        (
          id
        ) =>
          getTraitById(
            id
          )?.label
      )
      .filter(
        Boolean
      ) as string[];

  const character =
    labels.length
      ? labels.join(
          " + "
        )
      : "Neutral";

  const sameOwner =
    structureName ===
    expressionName;

  const summary =
    `${character} creates ${SHAPE_COPY[
      shapes
    ].label.toLowerCase()}, ${LINE_COPY[
      lines
    ].label.toLowerCase()}, ${GRID_COPY[
      grid
    ].label.toLowerCase()} and ${DEPTH_COPY[
      depth
    ].label.toLowerCase()}. ${
      sameOwner
        ? `${expressionName} provides both structural and expressive direction.`
        : `${structureName} provides structural discipline while ${expressionName} drives the expressive layer.`
    }`;

  /* ------------------------------------------------ */
  /* RESULT                                           */
  /* ------------------------------------------------ */

  return {
    structureName,
    expressionName,

    structureTraits:
      unique(
        structure
      ),

    expressionTraits:
      expressionTraitIds,

    primaryColor,
    secondaryColor,
    supportColor,

    fontFamily,

    summary,

    shapes: {
      style:
        shapes,

      ...SHAPE_COPY[
        shapes
      ],
    },

    lines: {
      style:
        lines,

      ...LINE_COPY[
        lines
      ],
    },

    masks: {
      style:
        masks,

      ...MASK_COPY[
        masks
      ],
    },

    grid: {
      style:
        grid,

      ...GRID_COPY[
        grid
      ],
    },

    ui: {
      style:
        ui,

      ...UI_COPY[
        ui
      ],
    },

    texture: {
      style:
        texture,

      ...TEXTURE_COPY[
        texture
      ],
    },

    glow: {
      style:
        glow,

      ...GLOW_COPY[
        glow
      ],
    },

    depth: {
      style:
        depth,

      ...DEPTH_COPY[
        depth
      ],
    },
  };
}