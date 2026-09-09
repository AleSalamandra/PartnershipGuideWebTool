"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";
import PartnershipLockup from "./PartnershipLockup";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  AdditionalRelationshipMode,
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type StageId =
  | "opening"
  | "content"
  | "closing";

interface StageContent {
  title:
    string;

  statement: (
    brandA:
      string,

    brandB:
      string
  ) => string;

  rules: (
    brandA:
      string,

    brandB:
      string
  ) => string[];

  principle: (
    brandA:
      string,

    brandB:
      string
  ) => string;

  brandAWeight:
    number;

  brandBWeight:
    number;
}

interface ModelContent {
  opening:
    StageContent;

  content:
    StageContent;

  closing:
    StageContent;
}

interface FinalHierarchy {
  brandA:
    number;

  brandB:
    number;

  x:
    number;
}

/* ================================================= */
/* MODEL CONTENT                                     */
/* ================================================= */

const MODEL_CONTENT:
  Record<
    PartnershipModelId,
    ModelContent
  > = {
  axb: {
    opening: {
      title:
        "Opening",

      statement:
        (
          a,
          b
        ) =>
          `${a} and ${b} enter the experience together.`,

      rules:
        () => [
          "Equal optical prominence",
          "Shared entrance timing",
          "No ownership language",
        ],

      principle:
        () =>
          "Both brands introduce the experience together.",

      brandAWeight:
        50,

      brandBWeight:
        50,
    },

    content: {
      title:
        "Content",

      statement:
        () =>
          "The collaboration becomes the visual identity.",

      rules:
        () => [
          "Shared colour or type system",
          "Joint motion language",
          "Avoid persistent dual logos",
        ],

      principle:
        () =>
          "Neither individual brand should dominate the content layer.",

      brandAWeight:
        50,

      brandBWeight:
        50,
    },

    closing: {
      title:
        "Closing",

      statement:
        (
          a,
          b
        ) =>
          `${a} and ${b} return with equal prominence.`,

      rules:
        () => [
          "Balanced final lockup",
          "Shared animation timing",
          "CTA may follow the lockup",
        ],

      principle:
        () =>
          "Both brands jointly sign the experience.",

      brandAWeight:
        50,

      brandBWeight:
        50,
    },
  },

  aandb: {
    opening: {
      title:
        "Opening",

      statement:
        (
          a,
          b
        ) =>
          `${a} introduces the experience. ${b} validates the collaboration.`,

      rules:
        (
          a,
          b
        ) => [
          `${a} appears first`,
          `${b} remains clearly visible`,
          "Hierarchy through scale, timing or position",
        ],

      principle:
        (
          a
        ) =>
          `${a} leads the opening.`,

      brandAWeight:
        70,

      brandBWeight:
        30,
    },

    content: {
      title:
        "Content",

      statement:
        (
          a,
          b
        ) =>
          `${a} owns the experience language. ${b} owns the content world.`,

      rules:
        (
          a,
          b
        ) => [
          `${a}: UI, type and motion`,
          `${b}: footage, IP and talent`,
          `${b}'s logo need not remain persistent`,
        ],

      principle:
        (
          a,
          b
        ) =>
          `${a} defines the container; ${b} contributes the content.`,

      brandAWeight:
        70,

      brandBWeight:
        30,
    },

    closing: {
      title:
        "Closing",

      statement:
        (
          a,
          b
        ) =>
          `${a} receives the primary sign-off while acknowledging ${b}.`,

      rules:
        (
          a,
          b
        ) => [
          `${a} leads the final frame`,
          `${b} remains secondary`,
          "Partner credit stays clearly legible",
        ],

      principle:
        (
          a
        ) =>
          `${a} signs the experience.`,

      brandAWeight:
        70,

      brandBWeight:
        30,
    },
  },

  poweredByA: {
    opening: {
      title:
        "Opening",

      statement:
        (
          a,
          b
        ) =>
          `${b} owns the experience. ${a} provides the technology layer.`,

      rules:
        (
          a,
          b
        ) => [
          `${b} takes the main position`,
          `${a} appears as endorsement`,
          "Technology credit remains discreet",
        ],

      principle:
        (
          a,
          b
        ) =>
          `${b} leads; ${a} enables.`,

      brandAWeight:
        15,

      brandBWeight:
        85,
    },

    content: {
      title:
        "Content",

      statement:
        (
          a,
          b
        ) =>
          `${b}'s visual identity leads. ${a} stays integrated rather than advertised.`,

      rules:
        (
          a,
          b
        ) => [
          `${b}: typography, colour and UI`,
          `${a}: technology and required credits`,
          `${a} normally leaves the main content layer`,
        ],

      principle:
        (
          a,
          b
        ) =>
          `${a} enables the experience without competing with ${b}.`,

      brandAWeight:
        15,

      brandBWeight:
        85,
    },

    closing: {
      title:
        "Closing",

      statement:
        (
          a,
          b
        ) =>
          `${b} owns the final relationship. ${a} receives a technology credit.`,

      rules:
        (
          a,
          b
        ) => [
          `${b} takes the final sign-off`,
          `${a} appears as endorsement`,
          "Keep technical attribution secondary",
        ],

      principle:
        (
          a,
          b
        ) =>
          `${b} closes; ${a} receives attribution.`,

      brandAWeight:
        15,

      brandBWeight:
        85,
    },
  },

  presentsB: {
    opening: {
      title:
        "Opening",

      statement:
        (
          a,
          b
        ) =>
          `${a} establishes ownership before introducing ${b}.`,

      rules:
        (
          a,
          b
        ) => [
          `${a} appears first`,
          `Use "${a} presents ${b}"`,
          "Narrative order creates hierarchy",
        ],

      principle:
        (
          a,
          b
        ) =>
          `${a} introduces ${b}.`,

      brandAWeight:
        70,

      brandBWeight:
        30,
    },

    content: {
      title:
        "Content",

      statement:
        (
          a,
          b
        ) =>
          `${a} owns the container. ${b} owns the featured content.`,

      rules:
        (
          a,
          b
        ) => [
          `${a}: UI, navigation and motion`,
          `${b}: footage, talent and IP`,
          "Both systems coexist without duplication",
        ],

      principle:
        (
          a,
          b
        ) =>
          `${a} owns the experience; ${b} owns the content world.`,

      brandAWeight:
        60,

      brandBWeight:
        40,
    },

    closing: {
      title:
        "Closing",

      statement:
        (
          a,
          b
        ) =>
          `The experience returns to ${a} after ${b}'s content ends.`,

      rules:
        (
          a,
          b
        ) => [
          `${a} provides the final signature`,
          `${b} may remain as featured content`,
          "Return clearly to the platform identity",
        ],

      principle:
        (
          a
        ) =>
          `${a} closes the experience.`,

      brandAWeight:
        80,

      brandBWeight:
        20,
    },
  },
};

/* ================================================= */
/* X WEIGHT                                          */
/* ================================================= */

function getXWeight(
  mode:
    AdditionalRelationshipMode,

  stage:
    StageId
) {
  if (
    mode ===
    "presenting"
  ) {
    if (
      stage ===
      "opening"
    ) {
      return 40;
    }

    if (
      stage ===
      "content"
    ) {
      return 55;
    }

    return 45;
  }

  if (
    mode ===
    "sponsored"
  ) {
    if (
      stage ===
      "opening"
    ) {
      return 5;
    }

    if (
      stage ===
      "content"
    ) {
      return 0;
    }

    return 8;
  }

  return 0;
}

/* ================================================= */
/* HIERARCHY CALCULATION                             */
/* ================================================= */

function calculateHierarchy(
  stage:
    StageContent,

  xWeight:
    number
): FinalHierarchy {
  const partnershipWeight =
    100 -
    xWeight;

  return {
    brandA:
      stage.brandAWeight /
      100 *
      partnershipWeight,

    brandB:
      stage.brandBWeight /
      100 *
      partnershipWeight,

    x:
      xWeight,
  };
}

/* ================================================= */
/* COPY                                              */
/* ================================================= */

function getAdditionalStatement(
  mode:
    AdditionalRelationshipMode,

  stage:
    StageId,

  x:
    string
) {
  if (
    mode ===
    "presenting"
  ) {
    if (
      stage ===
      "opening"
    ) {
      return `${x} is revealed as the property being presented.`;
    }

    if (
      stage ===
      "content"
    ) {
      return `${x} becomes the dominant identity inside the content territory.`;
    }

    return `${x} receives the principal content sign-off while the partnership acts as presenting signature.`;
  }

  if (
    mode ===
    "sponsored"
  ) {
    if (
      stage ===
      "content"
    ) {
      return `${x} does not alter the active content identity.`;
    }

    return `${x} appears only as a restrained sponsor credit.`;
  }

  return "";
}

function getAdditionalRules(
  mode:
    AdditionalRelationshipMode,

  stage:
    StageId,

  x:
    string
) {
  if (
    mode ===
    "presenting"
  ) {
    if (
      stage ===
      "opening"
    ) {
      return [
        `${x} receives a dedicated reveal`,
        "The A / B signature remains legible as presenter",
      ];
    }

    if (
      stage ===
      "content"
    ) {
      return [
        `${x} may lead colour, type and content graphics`,
        "A / B behaves as a smaller presenting signature",
      ];
    }

    return [
      `${x} can receive the largest final content mark`,
      "Presenter signature remains clearly associated",
    ];
  }

  if (
    mode ===
    "sponsored"
  ) {
    if (
      stage ===
      "content"
    ) {
      return [
        `${x} does not influence colour, type or motion`,
      ];
    }

    return [
      `${x} remains smaller than all ownership marks`,
      "Use one sponsor credit rather than persistent repetition",
    ];
  }

  return [];
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page04() {
  const {
    partnershipModel,
    additionalRelationship,

    brandA,
    brandB,
    propertyX,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  const propertyName =
    propertyX.name.trim() ||
    "X";

  const content =
    MODEL_CONTENT[
      model
    ];

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute

          left-[90px]
          right-[90px]
          top-[68px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[15px]
              uppercase
              tracking-[0.16em]

              text-white/30
            "
          >
            04 / Brand Hierarchy
          </p>

          <h1
            className="
              mt-[18px]

              text-[62px]
              leading-none
              tracking-[-0.05em]

              oook-semibold
            "
          >
            Brand hierarchy across media
          </h1>

          {additionalRelationship !==
            "none" && (
            <p className="mt-[13px] text-[13px] text-white/35">
              {additionalRelationship ===
              "presenting"
                ? `${propertyName} enters the hierarchy as a major content identity while the A / B relationship remains intact.`
                : `${propertyName} remains outside the core hierarchy and is limited to sponsor attribution.`}
            </p>
          )}
        </div>

        <div
          className="
            flex
            flex-col
            items-end

            gap-[12px]
          "
        >
          <PartnershipLockup
            model={
              model
            }
            brandA={
              brandA
            }
            brandB={
              brandB
            }
          />

          {additionalRelationship !==
            "none" && (
            <XHeader
              mode={
                additionalRelationship
              }
              name={
                propertyName
              }
              logoUrl={
                propertyX.logoUrl
              }
            />
          )}
        </div>
      </header>

      {/* ======================================== */}
      {/* THREE STAGES                             */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[95px]
          left-[90px]
          right-[90px]
          top-[225px]

          grid
          grid-cols-3

          gap-[20px]
        "
      >
        <StageCard
          number="01"
          stageId="opening"
          stage={
            content.opening
          }
          mode={
            additionalRelationship
          }
          brandAName={
            brandAName
          }
          brandBName={
            brandBName
          }
          propertyName={
            propertyName
          }
          brandAColor={
            brandA.primaryColor
          }
          brandBColor={
            brandB.primaryColor
          }
          propertyColor={
            propertyX.primaryColor
          }
        />

        <StageCard
          number="02"
          stageId="content"
          stage={
            content.content
          }
          mode={
            additionalRelationship
          }
          brandAName={
            brandAName
          }
          brandBName={
            brandBName
          }
          propertyName={
            propertyName
          }
          brandAColor={
            brandA.primaryColor
          }
          brandBColor={
            brandB.primaryColor
          }
          propertyColor={
            propertyX.primaryColor
          }
        />

        <StageCard
          number="03"
          stageId="closing"
          stage={
            content.closing
          }
          mode={
            additionalRelationship
          }
          brandAName={
            brandAName
          }
          brandBName={
            brandBName
          }
          propertyName={
            propertyName
          }
          brandAColor={
            brandA.primaryColor
          }
          brandBColor={
            brandB.primaryColor
          }
          propertyColor={
            propertyX.primaryColor
          }
        />
      </section>

      {/* ======================================== */}
      {/* FOOTNOTE                                 */}
      {/* ======================================== */}

      <footer
        className="
          absolute

          bottom-[54px]
          left-[90px]
          right-[90px]

          flex
          items-center
          justify-between
        "
      >
        <p className="text-[11px] text-white/20">
          Visual emphasis is indicative, not a literal logo-size requirement.
        </p>

        <p className="text-[11px] text-white/20">
          Sequence · scale · position · motion · colour
        </p>
      </footer>
    </GuidelinePage>
  );
}

/* ================================================= */
/* STAGE CARD                                        */
/* ================================================= */

function StageCard({
  number,
  stageId,
  stage,
  mode,

  brandAName,
  brandBName,
  propertyName,

  brandAColor,
  brandBColor,
  propertyColor,
}: {
  number:
    string;

  stageId:
    StageId;

  stage:
    StageContent;

  mode:
    AdditionalRelationshipMode;

  brandAName:
    string;

  brandBName:
    string;

  propertyName:
    string;

  brandAColor:
    string;

  brandBColor:
    string;

  propertyColor:
    string;
}) {
  const xWeight =
    getXWeight(
      mode,
      stageId
    );

  const hierarchy =
    calculateHierarchy(
      stage,
      xWeight
    );

  const extraStatement =
    getAdditionalStatement(
      mode,
      stageId,
      propertyName
    );

  const baseRules =
    stage.rules(
      brandAName,
      brandBName
    );

  const extraRules =
    getAdditionalRules(
      mode,
      stageId,
      propertyName
    );

  return (
    <article
      className="
        flex
        h-full
        flex-col

        rounded-[28px]

        border
        border-white/[0.08]

        bg-white/[0.025]

        px-[24px]
        py-[22px]
      "
    >
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/22">
        {number}
      </p>

      <h2 className="mt-[10px] text-[32px] tracking-[-0.035em] oook-medium">
        {stage.title}
      </h2>

      <p
        className="
          mt-[18px]

          min-h-[88px]

          text-[17px]
          leading-[1.38]
          tracking-[-0.015em]

          text-white/62
        "
      >
        {stage.statement(
          brandAName,
          brandBName
        )}

        {extraStatement && (
          <>
            {" "}
            {extraStatement}
          </>
        )}
      </p>

      {/* ======================================== */}
      {/* HIERARCHY                                */}
      {/* ======================================== */}

      <div className="mt-[22px]">
        <HierarchyBar
          brandAName={
            brandAName
          }
          brandBName={
            brandBName
          }
          propertyName={
            propertyName
          }
          mode={
            mode
          }
          brandAWeight={
            hierarchy.brandA
          }
          brandBWeight={
            hierarchy.brandB
          }
          xWeight={
            hierarchy.x
          }
          brandAColor={
            brandAColor
          }
          brandBColor={
            brandBColor
          }
          propertyColor={
            propertyColor
          }
        />
      </div>

      {/* ======================================== */}
      {/* RULES                                    */}
      {/* ======================================== */}

      <div
        className="
          mt-[28px]

          border-t
          border-white/[0.08]

          pt-[20px]
        "
      >
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/24">
          Key principles
        </p>

        <div className="mt-[13px] space-y-[9px]">
          {[
            ...baseRules,
            ...extraRules,
          ]
            .slice(
              0,
              5
            )
            .map(
              (
                rule
              ) => (
                <div
                  key={
                    rule
                  }
                  className="
                    flex
                    items-start

                    gap-[10px]
                  "
                >
                  <span
                    className="
                      mt-[7px]

                      h-[4px]
                      w-[4px]

                      shrink-0

                      rounded-full

                      bg-white/30
                    "
                  />

                  <p
                    className="
                      text-[13px]
                      leading-[1.35]

                      text-white/42
                    "
                  >
                    {rule}
                  </p>
                </div>
              )
            )}
        </div>
      </div>

      {/* ======================================== */}
      {/* PRINCIPLE                                */}
      {/* ======================================== */}

      <div
        className="
          mt-auto

          rounded-[18px]

          border
          border-white/[0.07]

          bg-black/25

          px-[16px]
          py-[14px]
        "
      >
        <p className="text-[9px] uppercase tracking-[0.15em] text-white/22">
          Principle
        </p>

        <p
          className="
            mt-[6px]

            text-[14px]
            leading-[1.35]

            text-white/72

            oook-medium
          "
        >
          {stage.principle(
            brandAName,
            brandBName
          )}

          {mode ===
            "presenting" && (
            <>
              {" "}
              {propertyName} becomes the principal featured property.
            </>
          )}

          {mode ===
            "sponsored" && (
            <>
              {" "}
              Sponsorship remains subordinate to ownership.
            </>
          )}
        </p>
      </div>
    </article>
  );
}

/* ================================================= */
/* HIERARCHY BAR                                     */
/* ================================================= */

function HierarchyBar({
  brandAName,
  brandBName,
  propertyName,

  mode,

  brandAWeight,
  brandBWeight,
  xWeight,

  brandAColor,
  brandBColor,
  propertyColor,
}: {
  brandAName:
    string;

  brandBName:
    string;

  propertyName:
    string;

  mode:
    AdditionalRelationshipMode;

  brandAWeight:
    number;

  brandBWeight:
    number;

  xWeight:
    number;

  brandAColor:
    string;

  brandBColor:
    string;

  propertyColor:
    string;
}) {
  return (
    <div>
      <div
        className={`
          mb-[10px]

          grid

          items-end
          gap-[10px]

          ${
            mode ===
            "none"
              ? "grid-cols-2"
              : "grid-cols-3"
          }
        `}
      >
        <HierarchyLabel
          name={
            brandAName
          }
          weight={
            brandAWeight
          }
          align="left"
        />

        <HierarchyLabel
          name={
            brandBName
          }
          weight={
            brandBWeight
          }
          align={
            mode ===
            "none"
              ? "right"
              : "center"
          }
        />

        {mode !==
          "none" && (
          <HierarchyLabel
            name={
              mode ===
              "sponsored"
                ? `Sponsor · ${propertyName}`
                : propertyName
            }
            weight={
              xWeight
            }
            align="right"
          />
        )}
      </div>

      <div
        className="
          flex

          h-[7px]
          w-full

          overflow-hidden

          rounded-full

          bg-white/[0.05]
        "
      >
        <div
          className="h-full opacity-70"
          style={{
            width:
              `${brandAWeight}%`,

            backgroundColor:
              brandAColor,
          }}
        />

        <div
          className="h-full opacity-45"
          style={{
            width:
              `${brandBWeight}%`,

            backgroundColor:
              brandBColor,
          }}
        />

        {xWeight >
          0 && (
          <div
            className="h-full"
            style={{
              width:
                `${xWeight}%`,

              backgroundColor:
                propertyColor,

              opacity:
                mode ===
                "presenting"
                  ? 0.85
                  : 0.3,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ================================================= */
/* HIERARCHY LABEL                                   */
/* ================================================= */

function HierarchyLabel({
  name,
  weight,
  align,
}: {
  name:
    string;

  weight:
    number;

  align:
    | "left"
    | "center"
    | "right";
}) {
  return (
    <div
      className={`
        min-w-0

        ${
          align ===
          "right"
            ? "text-right"
            : align ===
                "center"
              ? "text-center"
              : "text-left"
        }
      `}
    >
      <p
        className="
          truncate

          text-[9px]
          uppercase
          tracking-[0.08em]

          text-white/30
        "
      >
        {name}
      </p>

      <p
        className="
          mt-[3px]

          text-[14px]

          text-white/65

          oook-medium
        "
      >
        {Math.round(
          weight
        )}
        %
      </p>
    </div>
  );
}

/* ================================================= */
/* X HEADER                                          */
/* ================================================= */

function XHeader({
  mode,
  name,
  logoUrl,
}: {
  mode:
    AdditionalRelationshipMode;

  name:
    string;

  logoUrl:
    string | null;
}) {
  const presenting =
    mode ===
    "presenting";

  return (
    <div className="flex items-center gap-[9px]">
      <span className="text-[8px] uppercase tracking-[0.13em] text-white/22">
        {presenting
          ? "Presenting"
          : "Sponsored by"}
      </span>

      <div
        className={
          presenting
            ? "h-[34px] w-[115px]"
            : "h-[22px] w-[74px]"
        }
      >
        <BrandLogo
          logoUrl={
            logoUrl
          }
          fallback={
            name
          }
        />
      </div>
    </div>
  );
}