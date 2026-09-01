"use client";

import React from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface StageContent {
  title: string;

  statement: (
    brandA: string,
    brandB: string
  ) => string;

  rules: (
    brandA: string,
    brandB: string
  ) => string[];

  principle: (
    brandA: string,
    brandB: string
  ) => string;

  brandAWeight: number;
  brandBWeight: number;
}

interface ModelContent {
  opening: StageContent;
  content: StageContent;
  closing: StageContent;
}

/* ------------------------------------------------ */
/* CONTENT                                          */
/* ------------------------------------------------ */

const MODEL_CONTENT: Record<
  PartnershipModelId,
  ModelContent
> = {
  /* ================================================= */
  /* A × B                                             */
  /* ================================================= */

  axb: {
    opening: {
      title: "Opening",

      statement: (a, b) =>
        `${a} and ${b} enter the experience together.`,

      rules: () => [
        "Equal optical prominence",
        "Shared entrance timing",
        "No ownership language",
      ],

      principle: () =>
        "Both brands introduce the experience together.",

      brandAWeight: 50,
      brandBWeight: 50,
    },

    content: {
      title: "Content",

      statement: () =>
        "The collaboration becomes the visual identity.",

      rules: () => [
        "Shared colour or type system",
        "Joint motion language",
        "Avoid persistent dual logos",
      ],

      principle: () =>
        "Neither individual brand should dominate the content layer.",

      brandAWeight: 50,
      brandBWeight: 50,
    },

    closing: {
      title: "Closing",

      statement: (a, b) =>
        `${a} and ${b} return with equal prominence.`,

      rules: () => [
        "Balanced final lockup",
        "Shared animation timing",
        "CTA may follow the lockup",
      ],

      principle: () =>
        "Both brands jointly sign the experience.",

      brandAWeight: 50,
      brandBWeight: 50,
    },
  },

  /* ================================================= */
  /* A WITH B                                          */
  /* ================================================= */

  aandb: {
    opening: {
      title: "Opening",

      statement: (a, b) =>
        `${a} introduces the experience. ${b} validates the collaboration.`,

      rules: (a, b) => [
        `${a} appears first`,
        `${b} remains clearly visible`,
        "Hierarchy through scale, timing or position",
      ],

      principle: (a) =>
        `${a} leads the opening.`,

      brandAWeight: 70,
      brandBWeight: 30,
    },

    content: {
      title: "Content",

      statement: (a, b) =>
        `${a} owns the experience language. ${b} owns the content world.`,

      rules: (a, b) => [
        `${a}: UI, type and motion`,
        `${b}: footage, IP and talent`,
        `${b}'s logo need not remain persistent`,
      ],

      principle: (a, b) =>
        `${a} defines the container; ${b} contributes the content.`,

      brandAWeight: 70,
      brandBWeight: 30,
    },

    closing: {
      title: "Closing",

      statement: (a, b) =>
        `${a} receives the primary sign-off while acknowledging ${b}.`,

      rules: (a, b) => [
        `${a} leads the final frame`,
        `${b} remains secondary`,
        "Partner credit stays clearly legible",
      ],

      principle: (a) =>
        `${a} signs the experience.`,

      brandAWeight: 70,
      brandBWeight: 30,
    },
  },

  /* ================================================= */
  /* B POWERED BY A                                    */
  /* ================================================= */

  poweredByA: {
    opening: {
      title: "Opening",

      statement: (a, b) =>
        `${b} owns the experience. ${a} provides the technology layer.`,

      rules: (a, b) => [
        `${b} takes the main position`,
        `${a} appears as endorsement`,
        "Technology credit remains discreet",
      ],

      principle: (a, b) =>
        `${b} leads; ${a} enables.`,

      brandAWeight: 15,
      brandBWeight: 85,
    },

    content: {
      title: "Content",

      statement: (a, b) =>
        `${b}'s visual identity leads. ${a} stays integrated rather than advertised.`,

      rules: (a, b) => [
        `${b}: typography, colour and UI`,
        `${a}: technology and required credits`,
        `${a} normally leaves the main content layer`,
      ],

      principle: (a, b) =>
        `${a} enables the experience without competing with ${b}.`,

      brandAWeight: 15,
      brandBWeight: 85,
    },

    closing: {
      title: "Closing",

      statement: (a, b) =>
        `${b} owns the final relationship. ${a} receives a technology credit.`,

      rules: (a, b) => [
        `${b} takes the final sign-off`,
        `${a} appears as endorsement`,
        "Keep technical attribution secondary",
      ],

      principle: (a, b) =>
        `${b} closes; ${a} receives attribution.`,

      brandAWeight: 15,
      brandBWeight: 85,
    },
  },

  /* ================================================= */
  /* A PRESENTS B                                      */
  /* ================================================= */

  presentsB: {
    opening: {
      title: "Opening",

      statement: (a, b) =>
        `${a} establishes ownership before introducing ${b}.`,

      rules: (a, b) => [
        `${a} appears first`,
        `Use "${a} presents ${b}"`,
        "Narrative order creates hierarchy",
      ],

      principle: (a, b) =>
        `${a} introduces ${b}.`,

      brandAWeight: 70,
      brandBWeight: 30,
    },

    content: {
      title: "Content",

      statement: (a, b) =>
        `${a} owns the container. ${b} owns the featured content.`,

      rules: (a, b) => [
        `${a}: UI, navigation and motion`,
        `${b}: footage, talent and IP`,
        "Both systems coexist without duplication",
      ],

      principle: (a, b) =>
        `${a} owns the experience; ${b} owns the content world.`,

      brandAWeight: 60,
      brandBWeight: 40,
    },

    closing: {
      title: "Closing",

      statement: (a, b) =>
        `The experience returns to ${a} after ${b}'s content ends.`,

      rules: (a, b) => [
        `${a} provides the final signature`,
        `${b} may remain as featured content`,
        "Return clearly to the platform identity",
      ],

      principle: (a) =>
        `${a} closes the experience.`,

      brandAWeight: 80,
      brandBWeight: 20,
    },
  },
};

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page04() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } = useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const brandAName =
    brandA.name.trim() || "Brand A";

  const brandBName =
    brandB.name.trim() || "Brand B";

  const content =
    MODEL_CONTENT[model];

  return (
    <GuidelinePage>
      {/* HEADER */}

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
        </div>

        <PartnershipLockup
          model={model}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={brandA.logoUrl}
          brandBLogo={brandB.logoUrl}
        />
      </header>

      {/* THREE STAGES */}

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[210px]
          bottom-[95px]

          grid
          grid-cols-3
          gap-[20px]
        "
      >
        <StageCard
          number="01"
          stage={content.opening}
          brandAName={brandAName}
          brandBName={brandBName}
          brandAColor={brandA.primaryColor}
          brandBColor={brandB.primaryColor}
        />

        <StageCard
          number="02"
          stage={content.content}
          brandAName={brandAName}
          brandBName={brandBName}
          brandAColor={brandA.primaryColor}
          brandBColor={brandB.primaryColor}
        />

        <StageCard
          number="03"
          stage={content.closing}
          brandAName={brandAName}
          brandBName={brandBName}
          brandAColor={brandA.primaryColor}
          brandBColor={brandB.primaryColor}
        />
      </section>

      {/* FOOTNOTE */}

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
        <p
          className="
            text-[11px]
            text-white/20
          "
        >
          Visual emphasis is indicative, not a literal
          logo-size requirement.
        </p>

        <p
          className="
            text-[11px]
            text-white/20
          "
        >
          Sequence · scale · position · motion · colour
        </p>
      </footer>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* STAGE CARD                                       */
/* ------------------------------------------------ */

function StageCard({
  number,
  stage,

  brandAName,
  brandBName,

  brandAColor,
  brandBColor,
}: {
  number: string;

  stage: StageContent;

  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;
}) {
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

        px-[26px]
        py-[24px]
      "
    >
      {/* NUMBER */}

      <p
        className="
          text-[10px]
          uppercase
          tracking-[0.16em]
          text-white/22
        "
      >
        {number}
      </p>

      {/* TITLE */}

      <h2
        className="
          mt-[12px]

          text-[34px]
          tracking-[-0.035em]

          oook-medium
        "
      >
        {stage.title}
      </h2>

      {/* STATEMENT */}

      <p
        className="
          mt-[22px]

          min-h-[78px]

          text-[20px]
          leading-[1.4]
          tracking-[-0.015em]

          text-white/62
        "
      >
        {stage.statement(
          brandAName,
          brandBName
        )}
      </p>

      {/* HIERARCHY */}

      <div className="mt-[28px]">
        <HierarchyBar
          brandAName={brandAName}
          brandBName={brandBName}
          brandAWeight={
            stage.brandAWeight
          }
          brandBWeight={
            stage.brandBWeight
          }
          brandAColor={brandAColor}
          brandBColor={brandBColor}
        />
      </div>

      {/* RULES */}

      <div
        className="
          mt-[34px]

          border-t
          border-white/[0.08]

          pt-[24px]
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-white/24
          "
        >
          Key principles
        </p>

        <div className="mt-[16px] space-y-[13px]">
          {stage
            .rules(
              brandAName,
              brandBName
            )
            .map((rule) => (
              <div
                key={rule}
                className="
                  flex
                  items-start
                  gap-[12px]
                "
              >
                <span
                  className="
                    mt-[8px]
                    h-[4px]
                    w-[4px]
                    shrink-0
                    rounded-full
                    bg-white/30
                  "
                />

                <p
                  className="
                    text-[15px]
                    leading-[1.4]
                    text-white/42
                  "
                >
                  {rule}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* PRINCIPLE */}

      <div
        className="
          mt-auto

          rounded-[20px]

          border
          border-white/[0.07]

          bg-black/25

          px-[18px]
          py-[16px]
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-white/22
          "
        >
          Principle
        </p>

        <p
          className="
            mt-[7px]

            text-[16px]
            leading-[1.35]

            text-white/72

            oook-medium
          "
        >
          {stage.principle(
            brandAName,
            brandBName
          )}
        </p>
      </div>
    </article>
  );
}

/* ------------------------------------------------ */
/* HIERARCHY BAR                                    */
/* ------------------------------------------------ */

function HierarchyBar({
  brandAName,
  brandBName,

  brandAWeight,
  brandBWeight,

  brandAColor,
  brandBColor,
}: {
  brandAName: string;
  brandBName: string;

  brandAWeight: number;
  brandBWeight: number;

  brandAColor: string;
  brandBColor: string;
}) {
  return (
    <div>
      {/* LABELS */}

      <div
        className="
          mb-[10px]

          flex
          items-end
          justify-between
          gap-[20px]
        "
      >
        <HierarchyLabel
          name={brandAName}
          weight={brandAWeight}
          align="left"
        />

        <HierarchyLabel
          name={brandBName}
          weight={brandBWeight}
          align="right"
        />
      </div>

      {/* BAR */}

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
          style={{
            width: `${brandAWeight}%`,
            backgroundColor:
              brandAColor,
          }}
          className="h-full opacity-70"
        />

        <div
          style={{
            width: `${brandBWeight}%`,
            backgroundColor:
              brandBColor,
          }}
          className="h-full opacity-40"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* HIERARCHY LABEL                                  */
/* ------------------------------------------------ */

function HierarchyLabel({
  name,
  weight,
  align,
}: {
  name: string;
  weight: number;

  align:
    | "left"
    | "right";
}) {
  return (
    <div
      className={`
        min-w-0
        max-w-[45%]

        ${
          align === "right"
            ? "text-right"
            : "text-left"
        }
      `}
    >
      <p
        className="
          truncate

          text-[11px]
          uppercase
          tracking-[0.1em]
          text-white/30
        "
      >
        {name}
      </p>

      <p
        className="
          mt-[3px]

          text-[16px]
          text-white/65

          oook-medium
        "
      >
        {weight}%
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* TOP-RIGHT PARTNERSHIP LOCKUP                     */
/* ------------------------------------------------ */

function PartnershipLockup({
  model,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  /* A × B */

  if (model === "axb") {
    return (
      <div
        className="
          flex
          items-center
          gap-[16px]
        "
      >
        <TopLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <span
          className="
            text-[24px]
            text-white/20
          "
        >
          ×
        </span>

        <TopLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    );
  }

  /* A WITH B */

  if (model === "aandb") {
    return (
      <div
        className="
          flex
          items-end
          gap-[26px]
        "
      >
        <TopLabeledLogo
          label="Immersive experience by"
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <TopLabeledLogo
          label="In collaboration with"
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    );
  }

  /* B POWERED BY A */

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div
        className="
          flex
          flex-col
          items-end
        "
      >
        <div className="h-[44px] w-[155px]">
          <BrandLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>

        <div
          className="
            mt-[7px]

            flex
            items-center
            gap-[9px]
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.14em]
              text-white/20
            "
          >
            Powered by
          </span>

          <div className="h-[25px] w-[95px]">
            <BrandLogo
              logoUrl={brandALogo}
              fallback={brandAName}
            />
          </div>
        </div>
      </div>
    );
  }

  /* A PRESENTS B */

  return (
    <div
      className="
        flex
        flex-col
        items-end
      "
    >
      <div className="h-[28px] w-[110px]">
        <BrandLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />
      </div>

      <p
        className="
          my-[5px]

          text-[8px]
          uppercase
          tracking-[0.15em]
          text-white/20
        "
      >
        Presents
      </p>

      <div className="h-[39px] w-[140px]">
        <BrandLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* TOP LOGO HELPERS                                 */
/* ------------------------------------------------ */

function TopLogo({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div className="h-[44px] w-[135px]">
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

function TopLabeledLogo({
  label,
  logoUrl,
  fallback,
}: {
  label: string;
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div>
      <p
        className="
          mb-[5px]

          text-[8px]
          text-white/18
        "
      >
        {label}
      </p>

      <div className="h-[35px] w-[130px]">
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </div>
  );
}