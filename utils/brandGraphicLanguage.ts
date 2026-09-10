import {
  getTraitById,
  type BrandCharacterAxes,
  type BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import type {
  PartnershipModelId,
} from "@/types/guideline";

import type {
  AdditionalRelationshipMode,
} from "@/store/guidelineStore";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export interface LanguageBrand {
  name: string;

  primaryColor: string;
  secondaryColor: string;

  characterTraits:
    BrandCharacterTraitId[];
}

export interface SharedGraphicLanguage {
  structureName: string;
  expressionName: string;

  structureTraits:
    BrandCharacterTraitId[];

  expressionTraits:
    BrandCharacterTraitId[];

  axes:
    BrandCharacterAxes;

  shapeDescription: string;
  lineDescription: string;
  frameDescription: string;
  surfaceDescription: string;

  macroSource:
    "A" | "B" | "X" | null;
}

/* ================================================= */
/* DEFAULT                                            */
/* ================================================= */

const DEFAULT_AXES:
  BrandCharacterAxes = {
  curvature: 45,
  angularity: 40,
  symmetry: 50,
  density: 30,
  weight: 35,
  asymmetry: 30,
  depth: 35,
  motion: 35,
};

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function clamp(
  value: number
) {
  return Math.max(
    0,
    Math.min(
      100,
      value
    )
  );
}

function getProfile(
  traits:
    BrandCharacterTraitId[]
): BrandCharacterAxes {
  if (
    traits.length === 0
  ) {
    return {
      ...DEFAULT_AXES,
    };
  }

  const profiles =
    traits
      .map(
        (id) =>
          getTraitById(id)
            ?.axes
      )
      .filter(
        (
          value
        ): value is BrandCharacterAxes =>
          Boolean(value)
      );

  if (
    profiles.length === 0
  ) {
    return {
      ...DEFAULT_AXES,
    };
  }

  const keys =
    Object.keys(
      DEFAULT_AXES
    ) as Array<
      keyof BrandCharacterAxes
    >;

  const result = {
    ...DEFAULT_AXES,
  };

  keys.forEach(
    (key) => {
      result[key] =
        profiles.reduce(
          (
            total,
            profile
          ) =>
            total +
            profile[key],
          0
        ) /
        profiles.length;
    }
  );

  return result;
}

function blend(
  a:
    BrandCharacterAxes,

  b:
    BrandCharacterAxes,

  weightA:
    number
): BrandCharacterAxes {
  const weightB =
    1 -
    weightA;

  return {
    curvature:
      a.curvature *
        weightA +
      b.curvature *
        weightB,

    angularity:
      a.angularity *
        weightA +
      b.angularity *
        weightB,

    symmetry:
      a.symmetry *
        weightA +
      b.symmetry *
        weightB,

    density:
      a.density *
        weightA +
      b.density *
        weightB,

    weight:
      a.weight *
        weightA +
      b.weight *
        weightB,

    asymmetry:
      a.asymmetry *
        weightA +
      b.asymmetry *
        weightB,

    depth:
      a.depth *
        weightA +
      b.depth *
        weightB,

    motion:
      a.motion *
        weightA +
      b.motion *
        weightB,
  };
}

/* ================================================= */
/* LANGUAGE DESCRIPTIONS                             */
/* ================================================= */

function describeShape(
  axes:
    BrandCharacterAxes
) {
  if (
    axes.curvature >=
      70 &&
    axes.angularity <=
      35
  ) {
    return "Use broad curved forms, generous radii and soft continuous contours. Avoid sharp corners unless they are needed for hierarchy.";
  }

  if (
    axes.angularity >=
      70 &&
    axes.curvature <=
      35
  ) {
    return "Use constructed angular forms, cut corners, diagonals and modular geometry with clearly controlled proportions.";
  }

  return "Combine controlled curves and straighter structural geometry. Shapes should feel related rather than belonging to separate brand systems.";
}

function describeLines(
  axes:
    BrandCharacterAxes
) {
  const weight =
    axes.weight >= 70
      ? "substantial"
      : axes.weight <= 30
        ? "fine"
        : "medium";

  if (
    axes.motion >=
    70
  ) {
    return `Use ${weight} directional lines with varied length, offsets and progressive repetition to create visual momentum.`;
  }

  return `Use ${weight} lines as measured dividers, framing devices and hierarchy cues. Keep rhythm controlled and repetition limited.`;
}

function describeFrame(
  axes:
    BrandCharacterAxes
) {
  if (
    axes.depth >=
    70
  ) {
    return "Build frames in layered planes. Crops may extend beyond the viewport and overlap content to create spatial depth.";
  }

  if (
    axes.symmetry >=
    70
  ) {
    return "Use aligned, proportionally consistent frames with repeated margins and stable placement across content.";
  }

  return "Use controlled off-centre framing and selective crops while maintaining a consistent margin and containment system.";
}

function describeSurface(
  axes:
    BrandCharacterAxes
) {
  if (
    axes.density >=
    70
  ) {
    return "Allow several graphic layers, repeated accents and overlapping surfaces, but keep them governed by one spacing and scale system.";
  }

  if (
    axes.depth >=
    65
  ) {
    return "Use a small number of translucent or nested layers to create separation and atmosphere without introducing visual clutter.";
  }

  return "Keep surfaces clean and restrained. Use graphic layers only where they create hierarchy or improve readability.";
}

/* ================================================= */
/* BUILD                                             */
/* ================================================= */

export function buildSharedGraphicLanguage({
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
}): SharedGraphicLanguage {
  const aProfile =
    getProfile(
      brandA.characterTraits
    );

  const bProfile =
    getProfile(
      brandB.characterTraits
    );

  const xProfile =
    getProfile(
      propertyX.characterTraits
    );

  let structureProfile:
    BrandCharacterAxes;

  let expressionProfile:
    BrandCharacterAxes;

  let structureName:
    string;

  let expressionName:
    string;

  let structureTraits:
    BrandCharacterTraitId[];

  let expressionTraits:
    BrandCharacterTraitId[];

  let macroSource:
    "A" | "B" | "X" | null;

  switch (model) {
    case "axb":
      structureProfile =
        blend(
          aProfile,
          bProfile,
          0.5
        );

      expressionProfile =
        blend(
          aProfile,
          bProfile,
          0.5
        );

      structureName =
        `${brandA.name} + ${brandB.name}`;

      expressionName =
        `${brandA.name} + ${brandB.name}`;

      structureTraits = [
        ...brandA.characterTraits,
        ...brandB.characterTraits,
      ];

      expressionTraits = [
        ...brandA.characterTraits,
        ...brandB.characterTraits,
      ];

      macroSource =
        null;
      break;

    case "aandb":
      structureProfile =
        blend(
          aProfile,
          bProfile,
          0.8
        );

      expressionProfile =
        blend(
          aProfile,
          bProfile,
          0.75
        );

      structureName =
        brandA.name;

      expressionName =
        brandA.name;

      structureTraits =
        brandA.characterTraits;

      expressionTraits =
        brandA.characterTraits;

      macroSource =
        "A";
      break;

    case "poweredByA":
      structureProfile =
        blend(
          bProfile,
          aProfile,
          0.9
        );

      expressionProfile =
        blend(
          bProfile,
          aProfile,
          0.92
        );

      structureName =
        brandB.name;

      expressionName =
        brandB.name;

      structureTraits =
        brandB.characterTraits;

      expressionTraits =
        brandB.characterTraits;

      macroSource =
        "B";
      break;

    case "presentsB":
    default:
      structureProfile =
        aProfile;

      expressionProfile =
        bProfile;

      structureName =
        brandA.name;

      expressionName =
        brandB.name;

      structureTraits =
        brandA.characterTraits;

      expressionTraits =
        brandB.characterTraits;

      macroSource =
        "B";
      break;
  }

  /* ------------------------------------------------ */
  /* PRESENTING X                                     */
  /* ------------------------------------------------ */

  if (
    additionalRelationship ===
    "presenting"
  ) {
    expressionProfile =
      xProfile;

    expressionName =
      propertyX.name;

    expressionTraits =
      propertyX.characterTraits;

    macroSource =
      "X";
  }

  /*
    SPONSORED X intentionally does nothing.
  */

  const axes:
    BrandCharacterAxes = {
    curvature:
      clamp(
        expressionProfile.curvature
      ),

    angularity:
      clamp(
        expressionProfile.angularity
      ),

    /*
      Structure controls discipline and symmetry.
    */

    symmetry:
      clamp(
        structureProfile.symmetry *
          0.7 +
        expressionProfile.symmetry *
          0.3
      ),

    density:
      clamp(
        expressionProfile.density
      ),

    weight:
      clamp(
        expressionProfile.weight
      ),

    asymmetry:
      clamp(
        expressionProfile.asymmetry
      ),

    depth:
      clamp(
        expressionProfile.depth
      ),

    motion:
      clamp(
        expressionProfile.motion
      ),
  };

  return {
    structureName,
    expressionName,

    structureTraits,
    expressionTraits,

    axes,

    shapeDescription:
      describeShape(
        axes
      ),

    lineDescription:
      describeLines(
        axes
      ),

    frameDescription:
      describeFrame(
        axes
      ),

    surfaceDescription:
      describeSurface(
        axes
      ),

    macroSource,
  };
}