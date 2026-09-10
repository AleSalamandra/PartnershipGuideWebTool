import type {
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import type {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export type ShapePrimitive =
  | "frame"
  | "rounded-frame"
  | "cut-frame"
  | "arc"
  | "capsule"
  | "bracket"
  | "organic";

export type CornerStyle =
  | "square"
  | "soft"
  | "round"
  | "chamfered"
  | "open";

export type ShapeProportion =
  | "square"
  | "horizontal"
  | "vertical"
  | "elongated";

export type StrokeStyle =
  | "hairline"
  | "regular"
  | "heavy";

export type CompositionStyle =
  | "centered"
  | "offset"
  | "cropped"
  | "layered";

export type RepetitionStyle =
  | "none"
  | "echo"
  | "sequence";

export type OpennessStyle =
  | "closed"
  | "partially-open"
  | "fragment";

export type DirectionStyle =
  | "neutral"
  | "horizontal"
  | "diagonal";

export type DepthStyle =
  | "flat"
  | "subtle"
  | "layered";

export type SharedSourceId =
  | "A"
  | "B"
  | "X"
  | "AB";

export type AdditionalRelationshipMode =
  | "none"
  | "presenting"
  | "sponsored";

export interface LanguageBrand {
  name: string;

  logoUrl:
    string | null;

  primaryColor: string;
  secondaryColor: string;

  fontFamily: string;

  characterTraits:
    BrandCharacterTraitId[];
}

export interface SharedShapeGrammar {
  primitive:
    ShapePrimitive;

  cornerStyle:
    CornerStyle;

  proportion:
    ShapeProportion;

  stroke:
    StrokeStyle;

  composition:
    CompositionStyle;

  repetition:
    RepetitionStyle;

  openness:
    OpennessStyle;

  direction:
    DirectionStyle;

  depth:
    DepthStyle;

  maxElements:
    1 | 2 | 3 | 4;

  echoCount:
    0 | 1 | 2 | 3;

  structureSource:
    SharedSourceId;

  expressionSource:
    SharedSourceId;

  structureName:
    string;

  expressionName:
    string;

  structureTraits:
    BrandCharacterTraitId[];

  expressionTraits:
    BrandCharacterTraitId[];

  primaryColor:
    string;

  secondaryColor:
    string;

  fontFamily:
    string;

  macroSource:
    "A" | "B" | "X" | null;

  summary:
    string;

  shapeDescription:
    string;

  lineDescription:
    string;

  frameDescription:
    string;

  surfaceDescription:
    string;
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function uniqueTraits(
  traits:
    BrandCharacterTraitId[]
) {
  return Array.from(
    new Set(
      traits
    )
  );
}

function has(
  traits:
    BrandCharacterTraitId[],

  ...ids:
    BrandCharacterTraitId[]
) {
  return ids.some(
    (
      id
    ) =>
      traits.includes(
        id
      )
  );
}

function hasAll(
  traits:
    BrandCharacterTraitId[],

  ...ids:
    BrandCharacterTraitId[]
) {
  return ids.every(
    (
      id
    ) =>
      traits.includes(
        id
      )
  );
}

/* ================================================= */
/* PRIMITIVE                                         */
/* ================================================= */

function resolvePrimitive(
  traits:
    BrandCharacterTraitId[]
): ShapePrimitive {
  /*
    Strongly identifiable families first.
  */

  if (
    has(
      traits,
      "organic"
    )
  ) {
    return "organic";
  }

  if (
    has(
      traits,
      "sporty",
      "technical",
      "disruptive"
    )
  ) {
    return "cut-frame";
  }

  if (
    has(
      traits,
      "playful",
      "friendly",
      "youthful"
    )
  ) {
    return "capsule";
  }

  if (
    hasAll(
      traits,
      "elegant",
      "cinematic"
    )
  ) {
    return "arc";
  }

  if (
    has(
      traits,
      "cinematic"
    )
  ) {
    return "arc";
  }

  if (
    has(
      traits,
      "elegant"
    )
  ) {
    return "rounded-frame";
  }

  if (
    has(
      traits,
      "futuristic"
    )
  ) {
    return "bracket";
  }

  if (
    has(
      traits,
      "editorial"
    )
  ) {
    return "frame";
  }

  if (
    has(
      traits,
      "immersive"
    )
  ) {
    return "rounded-frame";
  }

  return "frame";
}

/* ================================================= */
/* CORNERS                                           */
/* ================================================= */

function resolveCornerStyle(
  traits:
    BrandCharacterTraitId[]
): CornerStyle {
  if (
    has(
      traits,
      "technical",
      "sporty",
      "disruptive"
    )
  ) {
    return "chamfered";
  }

  if (
    has(
      traits,
      "organic",
      "playful",
      "friendly"
    )
  ) {
    return "round";
  }

  if (
    has(
      traits,
      "futuristic"
    )
  ) {
    return "open";
  }

  if (
    has(
      traits,
      "elegant",
      "cinematic",
      "youthful"
    )
  ) {
    return "soft";
  }

  if (
    has(
      traits,
      "precise",
      "technical",
      "editorial"
    )
  ) {
    return "square";
  }

  return "soft";
}

/* ================================================= */
/* PROPORTION                                        */
/* ================================================= */

function resolveProportion(
  traits:
    BrandCharacterTraitId[]
): ShapeProportion {
  if (
    has(
      traits,
      "cinematic",
      "elegant",
      "sporty",
      "dynamic"
    )
  ) {
    return "elongated";
  }

  if (
    has(
      traits,
      "editorial",
      "technical",
      "futuristic"
    )
  ) {
    return "horizontal";
  }

  if (
    has(
      traits,
      "organic",
      "playful",
      "friendly"
    )
  ) {
    return "square";
  }

  return "horizontal";
}

/* ================================================= */
/* STROKE                                            */
/* ================================================= */

function resolveStroke(
  traits:
    BrandCharacterTraitId[]
): StrokeStyle {
  if (
    has(
      traits,
      "bold",
      "disruptive"
    )
  ) {
    return "heavy";
  }

  if (
    has(
      traits,
      "sporty",
      "energetic"
    )
  ) {
    return "regular";
  }

  if (
    has(
      traits,
      "elegant",
      "minimal",
      "editorial",
      "cinematic",
      "precise",
      "premium"
    )
  ) {
    return "hairline";
  }

  return "regular";
}

/* ================================================= */
/* COMPOSITION                                       */
/* ================================================= */

function resolveComposition(
  expressionTraits:
    BrandCharacterTraitId[],

  structureTraits:
    BrandCharacterTraitId[]
): CompositionStyle {
  /*
    Expression can introduce spatial behaviour.
  */

  if (
    has(
      expressionTraits,
      "immersive"
    )
  ) {
    return "layered";
  }

  if (
    has(
      expressionTraits,
      "cinematic",
      "editorial"
    )
  ) {
    return "cropped";
  }

  if (
    has(
      expressionTraits,
      "dynamic",
      "experimental",
      "disruptive",
      "youthful",
      "sporty"
    )
  ) {
    return "offset";
  }

  /*
    Otherwise structure establishes discipline.
  */

  if (
    has(
      structureTraits,
      "precise",
      "classic",
      "technical",
      "minimal"
    )
  ) {
    return "centered";
  }

  return "offset";
}

/* ================================================= */
/* REPETITION                                        */
/* ================================================= */

function resolveRepetition(
  traits:
    BrandCharacterTraitId[]
): RepetitionStyle {
  if (
    has(
      traits,
      "energetic",
      "dynamic",
      "sporty"
    )
  ) {
    return "sequence";
  }

  if (
    has(
      traits,
      "immersive",
      "futuristic"
    )
  ) {
    return "echo";
  }

  if (
    has(
      traits,
      "minimal",
      "premium",
      "elegant",
      "classic",
      "cinematic"
    )
  ) {
    return "none";
  }

  return "echo";
}

/* ================================================= */
/* OPENNESS                                          */
/* ================================================= */

function resolveOpenness(
  traits:
    BrandCharacterTraitId[]
): OpennessStyle {
  if (
    has(
      traits,
      "experimental",
      "disruptive"
    )
  ) {
    return "fragment";
  }

  if (
    has(
      traits,
      "futuristic",
      "editorial",
      "elegant",
      "cinematic"
    )
  ) {
    return "partially-open";
  }

  return "closed";
}

/* ================================================= */
/* DIRECTION                                         */
/* ================================================= */

function resolveDirection(
  traits:
    BrandCharacterTraitId[]
): DirectionStyle {
  if (
    has(
      traits,
      "sporty",
      "dynamic",
      "disruptive",
      "energetic"
    )
  ) {
    return "diagonal";
  }

  if (
    has(
      traits,
      "cinematic",
      "editorial",
      "elegant"
    )
  ) {
    return "horizontal";
  }

  return "neutral";
}

/* ================================================= */
/* DEPTH                                             */
/* ================================================= */

function resolveDepth(
  traits:
    BrandCharacterTraitId[]
): DepthStyle {
  if (
    has(
      traits,
      "immersive"
    )
  ) {
    return "layered";
  }

  if (
    has(
      traits,
      "cinematic",
      "futuristic",
      "experimental",
      "premium"
    )
  ) {
    return "subtle";
  }

  return "flat";
}

/* ================================================= */
/* ELEMENT COUNT                                     */
/* ================================================= */

function resolveMaxElements(
  traits:
    BrandCharacterTraitId[]
): 1 | 2 | 3 | 4 {
  if (
    has(
      traits,
      "minimal"
    )
  ) {
    return 1;
  }

  if (
    has(
      traits,
      "premium",
      "elegant",
      "cinematic",
      "classic"
    )
  ) {
    return 2;
  }

  if (
    has(
      traits,
      "energetic",
      "experimental",
      "disruptive"
    )
  ) {
    return 4;
  }

  return 3;
}

/* ================================================= */
/* ECHO COUNT                                        */
/* ================================================= */

function resolveEchoCount(
  repetition:
    RepetitionStyle,

  maxElements:
    1 | 2 | 3 | 4
): 0 | 1 | 2 | 3 {
  if (
    repetition ===
    "none"
  ) {
    return 0;
  }

  if (
    repetition ===
    "echo"
  ) {
    return maxElements >=
      3
      ? 2
      : 1;
  }

  if (
    maxElements >=
    4
  ) {
    return 3;
  }

  return 2;
}

/* ================================================= */
/* DESCRIPTIONS                                      */
/* ================================================= */

function describeShape(
  primitive:
    ShapePrimitive,

  proportion:
    ShapeProportion,

  cornerStyle:
    CornerStyle,

  openness:
    OpennessStyle
) {
  const primitiveCopy: Record<
    ShapePrimitive,
    string
  > = {
    frame:
      "structured frame",

    "rounded-frame":
      "soft continuous frame",

    "cut-frame":
      "constructed cut frame",

    arc:
      "long curved gesture",

    capsule:
      "rounded compact form",

    bracket:
      "open structural bracket",

    organic:
      "fluid asymmetric form",
  };

  return `Use a ${primitiveCopy[primitive]} with ${proportion} proportions, ${cornerStyle} edges and a ${openness} construction.`;
}

function describeLine(
  stroke:
    StrokeStyle,

  direction:
    DirectionStyle,

  repetition:
    RepetitionStyle
) {
  const repetitionCopy =
    repetition ===
    "none"
      ? "without decorative repetition"
      : repetition ===
          "echo"
        ? "with restrained echoes"
        : "in controlled sequences";

  return `Lines use a ${stroke} weight and ${direction} direction, ${repetitionCopy}.`;
}

function describeFrame(
  composition:
    CompositionStyle,

  openness:
    OpennessStyle
) {
  const copy: Record<
    CompositionStyle,
    string
  > = {
    centered:
      "stable centred containment",

    offset:
      "controlled off-centre framing",

    cropped:
      "large crops extending beyond the viewport",

    layered:
      "nested spatial framing",
  };

  return `Content uses ${copy[composition]} with ${openness} boundaries.`;
}

function describeSurface(
  depth:
    DepthStyle,

  repetition:
    RepetitionStyle,

  maxElements:
    number
) {
  if (
    depth ===
    "flat"
  ) {
    return `Keep surfaces largely flat and limit the system to ${maxElements} primary graphic elements.`;
  }

  if (
    depth ===
    "layered"
  ) {
    return `Use nested planes derived from the same form, with ${repetition} repetition and clear spatial separation.`;
  }

  return `Introduce subtle depth using restrained overlays derived from the same geometry; avoid adding unrelated decorative shapes.`;
}

/* ================================================= */
/* BUILD LANGUAGE                                    */
/* ================================================= */

export function buildSharedShapeGrammar({
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
}): SharedShapeGrammar {
  let structureSource:
    SharedSourceId;

  let expressionSource:
    SharedSourceId;

  let structureName:
    string;

  let expressionName:
    string;

  let structureTraits:
    BrandCharacterTraitId[];

  let expressionTraits:
    BrandCharacterTraitId[];

  let primaryColor:
    string;

  let secondaryColor:
    string;

  let fontFamily:
    string;

  let macroSource:
    "A" | "B" | "X" | null;

  /* ------------------------------------------------ */
  /* BASE PARTNERSHIP                                 */
  /* ------------------------------------------------ */

  switch (
    model
  ) {
    case "axb":
      structureSource =
        "AB";

      expressionSource =
        "AB";

      structureName =
        `${brandA.name} + ${brandB.name}`;

      expressionName =
        `${brandA.name} + ${brandB.name}`;

      structureTraits =
        uniqueTraits([
          ...brandA.characterTraits,
          ...brandB.characterTraits,
        ]);

      expressionTraits =
        uniqueTraits([
          ...brandA.characterTraits,
          ...brandB.characterTraits,
        ]);

      primaryColor =
        brandA.primaryColor;

      secondaryColor =
        brandB.primaryColor;

      fontFamily =
        brandA.fontFamily;

      macroSource =
        null;
      break;

    case "aandb":
      structureSource =
        "A";

      expressionSource =
        "A";

      structureName =
        brandA.name;

      expressionName =
        brandA.name;

      structureTraits =
        brandA.characterTraits;

      expressionTraits =
        brandA.characterTraits;

      primaryColor =
        brandA.primaryColor;

      secondaryColor =
        brandA.secondaryColor;

      fontFamily =
        brandA.fontFamily;

      macroSource =
        "A";
      break;

    case "poweredByA":
      structureSource =
        "B";

      expressionSource =
        "B";

      structureName =
        brandB.name;

      expressionName =
        brandB.name;

      structureTraits =
        brandB.characterTraits;

      expressionTraits =
        brandB.characterTraits;

      primaryColor =
        brandB.primaryColor;

      secondaryColor =
        brandB.secondaryColor;

      fontFamily =
        brandB.fontFamily;

      macroSource =
        "B";
      break;

    case "presentsB":
    default:
      structureSource =
        "A";

      expressionSource =
        "B";

      structureName =
        brandA.name;

      expressionName =
        brandB.name;

      structureTraits =
        brandA.characterTraits;

      expressionTraits =
        brandB.characterTraits;

      primaryColor =
        brandB.primaryColor;

      secondaryColor =
        brandB.secondaryColor;

      fontFamily =
        brandB.fontFamily;

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
    expressionSource =
      "X";

    expressionName =
      propertyX.name;

    expressionTraits =
      propertyX.characterTraits;

    primaryColor =
      propertyX.primaryColor;

    secondaryColor =
      propertyX.secondaryColor;

    fontFamily =
      propertyX.fontFamily;

    macroSource =
      "X";
  }

  /*
    Sponsored X intentionally does not alter
    the graphic grammar.
  */

  const primitive =
    resolvePrimitive(
      expressionTraits
    );

  const cornerStyle =
    resolveCornerStyle(
      expressionTraits
    );

  const proportion =
    resolveProportion(
      expressionTraits
    );

  const stroke =
    resolveStroke(
      expressionTraits
    );

  const composition =
    resolveComposition(
      expressionTraits,
      structureTraits
    );

  const repetition =
    resolveRepetition(
      expressionTraits
    );

  const openness =
    resolveOpenness(
      expressionTraits
    );

  const direction =
    resolveDirection(
      expressionTraits
    );

  const depth =
    resolveDepth(
      expressionTraits
    );

  const maxElements =
    resolveMaxElements(
      expressionTraits
    );

  const echoCount =
    resolveEchoCount(
      repetition,
      maxElements
    );

  return {
    primitive,
    cornerStyle,
    proportion,
    stroke,
    composition,
    repetition,
    openness,
    direction,
    depth,
    maxElements,
    echoCount,

    structureSource,
    expressionSource,

    structureName,
    expressionName,

    structureTraits,
    expressionTraits,

    primaryColor,
    secondaryColor,
    fontFamily,

    macroSource,

    summary:
      `${expressionName} defines the expressive form while ${structureName} establishes compositional discipline. The result is one reusable graphic family rather than separate decorative assets.`,

    shapeDescription:
      describeShape(
        primitive,
        proportion,
        cornerStyle,
        openness
      ),

    lineDescription:
      describeLine(
        stroke,
        direction,
        repetition
      ),

    frameDescription:
      describeFrame(
        composition,
        openness
      ),

    surfaceDescription:
      describeSurface(
        depth,
        repetition,
        maxElements
      ),
  };
}