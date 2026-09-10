import {
  getTraitById,
} from "@/data/brandCharacterTraits";

export interface LanguageAxisSet {
  curvature: number;
  angularity: number;
  symmetry: number;
  density: number;
  weight: number;
  playfulness: number;
  depth: number;
  motion: number;
}

export interface SharedGraphicLanguage {
  sharedSummary: string;
  shapePrinciple: string;
  linePrinciple: string;
  framePrinciple: string;
  uiPrinciple: string;
  texturePrinciple: string;
  motionPrinciple: string;
  doExample: string;
  dontExample: string;
  axes: LanguageAxisSet;
}

const DEFAULT_AXES: LanguageAxisSet = {
  curvature: 50,
  angularity: 50,
  symmetry: 50,
  density: 40,
  weight: 45,
  playfulness: 20,
  depth: 40,
  motion: 40,
};

const TRAIT_AXES: Record<
  string,
  Partial<LanguageAxisSet>
> = {
  classic: {
    symmetry: 80,
    density: 20,
    motion: 20,
    playfulness: 10,
  },
  elegant: {
    curvature: 75,
    density: 15,
    weight: 20,
    depth: 45,
  },
  premium: {
    density: 15,
    weight: 55,
    symmetry: 65,
  },
  minimal: {
    density: 5,
    weight: 25,
    playfulness: 5,
  },
  editorial: {
    angularity: 70,
    symmetry: 45,
    density: 35,
  },
  technical: {
    angularity: 90,
    symmetry: 75,
    density: 45,
    curvature: 10,
  },
  precise: {
    symmetry: 85,
    angularity: 70,
    density: 20,
  },
  futuristic: {
    angularity: 75,
    depth: 75,
    motion: 55,
  },
  experimental: {
    playfulness: 75,
    density: 55,
    symmetry: 15,
    motion: 60,
  },
  disruptive: {
    angularity: 95,
    weight: 80,
    motion: 70,
    density: 65,
  },
  bold: {
    weight: 95,
    density: 45,
  },
  dynamic: {
    motion: 85,
    angularity: 70,
    density: 50,
  },
  energetic: {
    motion: 95,
    density: 85,
    playfulness: 60,
  },
  playful: {
    curvature: 90,
    playfulness: 95,
    symmetry: 20,
  },
  youthful: {
    curvature: 70,
    playfulness: 70,
    motion: 55,
  },
  friendly: {
    curvature: 90,
    playfulness: 45,
    weight: 35,
  },
  organic: {
    curvature: 100,
    symmetry: 10,
    depth: 55,
  },
  immersive: {
    depth: 100,
    motion: 55,
    density: 50,
  },
  cinematic: {
    depth: 85,
    density: 20,
    motion: 35,
    weight: 30,
  },
  sporty: {
    angularity: 95,
    motion: 90,
    density: 60,
    weight: 65,
  },
};

function clamp(value: number) {
  return Math.max(
    0,
    Math.min(100, value)
  );
}

function averageAxes(
  traitIds: string[]
): LanguageAxisSet {
  if (traitIds.length === 0) {
    return DEFAULT_AXES;
  }

  const totals = {
    curvature: 0,
    angularity: 0,
    symmetry: 0,
    density: 0,
    weight: 0,
    playfulness: 0,
    depth: 0,
    motion: 0,
  };

  const count = traitIds.length;

  traitIds.forEach((id) => {
    const preset =
      TRAIT_AXES[id] || {};

    (
      Object.keys(totals) as Array<
        keyof LanguageAxisSet
      >
    ).forEach((key) => {
      const value =
        preset[key] ??
        DEFAULT_AXES[key];

      totals[key] += value;
    });
  });

  return {
    curvature: clamp(
      Math.round(totals.curvature / count)
    ),
    angularity: clamp(
      Math.round(totals.angularity / count)
    ),
    symmetry: clamp(
      Math.round(totals.symmetry / count)
    ),
    density: clamp(
      Math.round(totals.density / count)
    ),
    weight: clamp(
      Math.round(totals.weight / count)
    ),
    playfulness: clamp(
      Math.round(totals.playfulness / count)
    ),
    depth: clamp(
      Math.round(totals.depth / count)
    ),
    motion: clamp(
      Math.round(totals.motion / count)
    ),
  };
}

function describeShape(
  axes: LanguageAxisSet
) {
  if (
    axes.curvature >= 75 &&
    axes.angularity <= 35
  ) {
    return "Shared shapes should be rounded, fluid and soft-edged, with generous radii and minimal corner tension.";
  }

  if (
    axes.angularity >= 75 &&
    axes.curvature <= 35
  ) {
    return "Shared shapes should be sharper and more constructed, using straighter edges, cut corners and directional geometry.";
  }

  return "Shared shapes should balance soft curvature with structural control, combining calm rounded forms and selective sharper interventions.";
}

function describeLines(
  axes: LanguageAxisSet
) {
  if (axes.motion >= 75) {
    return "Line behaviour should feel directional and progressive, supporting motion, sequencing and visual momentum.";
  }

  if (axes.symmetry >= 70) {
    return "Line behaviour should be measured and stabilising, reinforcing structure, alignment and consistency.";
  }

  return "Line behaviour should remain restrained and functional, helping define hierarchy without becoming decorative.";
}

function describeFrames(
  axes: LanguageAxisSet
) {
  if (axes.depth >= 75) {
    return "Frames should feel spatial and immersive, using layered masks, depth windows and environmental cropping.";
  }

  if (axes.density <= 20) {
    return "Frames should be minimal and quiet, relying on clean margins, subtle containers and light separation only where needed.";
  }

  return "Frames should provide clear content containment and hierarchy, without overpowering imagery or typography.";
}

function describeUI(
  axes: LanguageAxisSet
) {
  if (
    axes.angularity >= 70 &&
    axes.symmetry >= 65
  ) {
    return "UI elements should be modular, precise and grid-led, with consistent spacing, tidy segmentation and crisp states.";
  }

  if (
    axes.curvature >= 70 &&
    axes.playfulness >= 50
  ) {
    return "UI elements should be softer and more approachable, using rounded pills, calm containers and welcoming interaction cues.";
  }

  return "UI elements should remain understated, clean and functional, supporting content without introducing a separate visual language.";
}

function describeTexture(
  axes: LanguageAxisSet
) {
  if (axes.depth >= 70) {
    return "Texture should support atmosphere and depth through soft bloom, layered gradients and environmental softness.";
  }

  if (axes.density >= 65) {
    return "Texture can carry more activity, introducing subtle rhythm, pattern or particle presence to energise the system.";
  }

  return "Texture should stay restrained, used only to avoid flatness and to support legibility, contrast and tone.";
}

function describeMotion(
  axes: LanguageAxisSet
) {
  if (axes.motion >= 80) {
    return "Motion should be clearly directional, paced with acceleration, reveal logic and dynamic transition behaviour.";
  }

  if (axes.depth >= 75) {
    return "Motion should prioritise spatial transitions, layered entrances and depth-aware movement through the frame.";
  }

  return "Motion should remain calm and purposeful, supporting hierarchy and continuity rather than spectacle.";
}

export function buildSharedGraphicLanguage(
  brandATraits: string[],
  brandBTraits: string[],
  propertyTraits: string[] = []
): SharedGraphicLanguage {
  const mergedTraits = [
    ...brandATraits,
    ...brandBTraits,
    ...propertyTraits,
  ].filter(Boolean);

  const axes =
    averageAxes(mergedTraits);

  const traitLabels = mergedTraits
    .map((id) => getTraitById(id)?.label)
    .filter(Boolean) as string[];

  const shapePrinciple =
    describeShape(axes);

  const linePrinciple =
    describeLines(axes);

  const framePrinciple =
    describeFrames(axes);

  const uiPrinciple =
    describeUI(axes);

  const texturePrinciple =
    describeTexture(axes);

  const motionPrinciple =
    describeMotion(axes);

  return {
    axes,
    sharedSummary:
      traitLabels.length > 0
        ? `The shared system blends ${traitLabels.join(
            ", "
          )} into one consistent video language instead of keeping separate graphic behaviours.`
        : "The shared system builds one coherent visual language across all participating identities.",
    shapePrinciple,
    linePrinciple,
    framePrinciple,
    uiPrinciple,
    texturePrinciple,
    motionPrinciple,
    doExample:
      "Build one controlled visual grammar where shape, framing and overlays feel related across titles, lower thirds, transitions and key moments.",
    dontExample:
      "Do not let each identity keep its own unrelated shapes, UI logic or framing rules inside the same piece of content.",
  };
}