"use client";

import React from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type VariantTemplate =
  | "equal-horizontal"
  | "equal-offset"
  | "equal-stacked"
  | "with-horizontal"
  | "with-stacked"
  | "with-corner"
  | "powered-stacked"
  | "powered-inline"
  | "powered-corner"
  | "presents-stacked"
  | "presents-inline"
  | "presents-corner";

interface VariantSpec {
  id: string;
  title: string;
  template: VariantTemplate;
  scale: string;
}

/* ------------------------------------------------ */
/* VARIANTS                                         */
/* ------------------------------------------------ */

const MODEL_VARIANTS: Record<
  PartnershipModelId,
  VariantSpec[]
> = {
  axb: [
    {
      id: "01",
      title: "Balanced",
      template: "equal-horizontal",
      scale: "A 100% · B 100%",
    },
    {
      id: "02",
      title: "Offset",
      template: "equal-offset",
      scale: "A 100% · B 100%",
    },
    {
      id: "03",
      title: "Stacked",
      template: "equal-stacked",
      scale: "A 100% · B 100%",
    },
  ],

  aandb: [
    {
      id: "01",
      title: "Lead + support",
      template: "with-horizontal",
      scale: "A 100% · B 78%",
    },
    {
      id: "02",
      title: "Stacked",
      template: "with-stacked",
      scale: "A 100% · B 72%",
    },
    {
      id: "03",
      title: "Partner corner",
      template: "with-corner",
      scale: "A 100% · B 68%",
    },
  ],

  poweredByA: [
    {
      id: "01",
      title: "Powered by",
      template: "powered-stacked",
      scale: "B 100% · A 62%",
    },
    {
      id: "02",
      title: "Inline",
      template: "powered-inline",
      scale: "B 100% · A 58%",
    },
    {
      id: "03",
      title: "Endorsement",
      template: "powered-corner",
      scale: "B 100% · A 54%",
    },
  ],

  presentsB: [
    {
      id: "01",
      title: "Presents",
      template: "presents-stacked",
      scale: "A 62% · B 100%",
    },
    {
      id: "02",
      title: "Inline",
      template: "presents-inline",
      scale: "A 58% · B 100%",
    },
    {
      id: "03",
      title: "Presented by",
      template: "presents-corner",
      scale: "A 52% · B 100%",
    },
  ],
};

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page03() {
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

  const variants =
    MODEL_VARIANTS[model];

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
            03 / Logo Application
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
            Logo positioning
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

      {/* VARIANTS */}

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[205px]
          bottom-[75px]

          grid
          grid-cols-3
          gap-[20px]
        "
      >
        {variants.map(
          (variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              brandAName={brandAName}
              brandBName={brandBName}
              brandALogo={brandA.logoUrl}
              brandBLogo={brandB.logoUrl}
            />
          )
        )}
      </section>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* VARIANT CARD                                     */
/* ------------------------------------------------ */

function VariantCard({
  variant,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  variant: VariantSpec;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
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

        p-[22px]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-[18px]
        "
      >
        <div>
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-white/25
            "
          >
            Variant {variant.id}
          </p>

          <h2
            className="
              mt-[7px]

              text-[22px]
              leading-none

              oook-medium
            "
          >
            {variant.title}
          </h2>
        </div>

        <span
          className="
            shrink-0

            rounded-full

            border
            border-white/[0.08]

            px-[10px]
            py-[6px]

            text-[10px]
            uppercase
            tracking-[0.1em]
            text-white/35
          "
        >
          {variant.scale}
        </span>
      </div>

      {/* VISUAL */}

      <div className="mt-[22px] min-h-0 flex-1">
        <PositioningSurface
          template={variant.template}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={brandALogo}
          brandBLogo={brandBLogo}
        />
      </div>

      {/* SAFE AREA */}

      <div
        className="
          mt-[16px]

          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.14em]
            text-white/22
          "
        >
          Safe area
        </p>

        <p
          className="
            text-[12px]
            text-white/40
          "
        >
          8%
        </p>
      </div>
    </article>
  );
}

/* ------------------------------------------------ */
/* POSITIONING SURFACE                              */
/* ------------------------------------------------ */

function PositioningSurface({
  template,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  template: VariantTemplate;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <div
      className="
        relative

        h-full
        min-h-[400px]

        overflow-hidden

        rounded-[22px]

        border
        border-white/[0.07]

        bg-black/35
      "
    >
      <CanvasGuides />

      {/* ================================================= */}
      {/* A × B                                             */}
      {/* ================================================= */}

      {template ===
        "equal-horizontal" && (
        <div
          className="
            absolute
            left-[10%]
            right-[10%]
            top-1/2

            grid
            -translate-y-1/2

            grid-cols-[1fr_52px_1fr]

            items-center
            gap-[18px]
          "
        >
          <OpticalLogoFrame
            logoUrl={brandALogo}
            fallback={brandAName}
          />

          <RelationshipWord>
            ×
          </RelationshipWord>

          <OpticalLogoFrame
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>
      )}

      {template ===
        "equal-offset" && (
        <>
          <div
            className="
              absolute
              left-[10%]
              top-[22%]
              w-[34%]
            "
          >
            <OpticalLogoFrame
              logoUrl={brandALogo}
              fallback={brandAName}
            />
          </div>

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <RelationshipWord>
              ×
            </RelationshipWord>
          </div>

          <div
            className="
              absolute
              bottom-[22%]
              right-[10%]
              w-[34%]
            "
          >
            <OpticalLogoFrame
              logoUrl={brandBLogo}
              fallback={brandBName}
            />
          </div>
        </>
      )}

      {template ===
        "equal-stacked" && (
        <div
          className="
            absolute
            left-1/2
            top-1/2

            flex
            w-[46%]

            -translate-x-1/2
            -translate-y-1/2

            flex-col
            items-center
            gap-[18px]
          "
        >
          <OpticalLogoFrame
            logoUrl={brandALogo}
            fallback={brandAName}
          />

          <RelationshipWord>
            ×
          </RelationshipWord>

          <OpticalLogoFrame
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>
      )}

      {/* ================================================= */}
      {/* A WITH B                                          */}
      {/* ================================================= */}

      {template ===
        "with-horizontal" && (
        <div
          className="
            absolute
            left-[9%]
            right-[9%]
            top-1/2

            grid
            -translate-y-1/2

            grid-cols-[1.35fr_0.8fr]

            items-end
            gap-[54px]
          "
        >
          <LabeledLockupBlock
            label="Immersive experience by"
            logoUrl={brandALogo}
            fallback={brandAName}
            large
          />

          <LabeledLockupBlock
            label="In collaboration with"
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>
      )}

      {template ===
        "with-stacked" && (
        <div
          className="
            absolute
            left-1/2
            top-1/2

            flex
            w-[52%]

            -translate-x-1/2
            -translate-y-1/2

            flex-col
            gap-[34px]
          "
        >
          <LabeledLockupBlock
            label="Immersive experience by"
            logoUrl={brandALogo}
            fallback={brandAName}
            large
          />

          <div className="ml-[18%] w-[68%]">
            <LabeledLockupBlock
              label="In collaboration with"
              logoUrl={brandBLogo}
              fallback={brandBName}
            />
          </div>
        </div>
      )}

      {template ===
        "with-corner" && (
        <>
          <div
            className="
              absolute
              left-[10%]
              top-[30%]
              w-[48%]
            "
          >
            <OpticalLogoFrame
              logoUrl={brandALogo}
              fallback={brandAName}
              large
            />
          </div>

          <div
            className="
              absolute
              bottom-[11%]
              right-[11%]
              w-[27%]
            "
          >
            <LabeledLockupBlock
              label="In collaboration with"
              logoUrl={brandBLogo}
              fallback={brandBName}
              compact
            />
          </div>
        </>
      )}

      {/* ================================================= */}
      {/* B POWERED BY A                                    */}
      {/* ================================================= */}

      {template ===
        "powered-stacked" && (
        <div
          className="
            absolute
            left-1/2
            top-1/2

            flex
            w-[60%]

            -translate-x-1/2
            -translate-y-1/2

            flex-col
            items-center
          "
        >
          <OpticalLogoFrame
            logoUrl={brandBLogo}
            fallback={brandBName}
            large
          />

          <ConnectorText>
            Powered by
          </ConnectorText>

          <div className="w-[58%]">
            <OpticalLogoFrame
              logoUrl={brandALogo}
              fallback={brandAName}
              compact
            />
          </div>
        </div>
      )}

      {template ===
        "powered-inline" && (
        <div
          className="
            absolute
            left-[9%]
            right-[9%]
            top-1/2

            grid
            -translate-y-1/2

            grid-cols-[1.5fr_1px_0.82fr]

            items-center
            gap-[30px]
          "
        >
          {/* MAIN BRAND */}

          <OpticalLogoFrame
            logoUrl={brandBLogo}
            fallback={brandBName}
            large
          />

          {/* DIVIDER */}

          <div
            className="
              h-[92px]
              w-px
              bg-white/[0.1]
            "
          />

          {/* ENDORSEMENT */}

          <div
            className="
              flex
              flex-col
              items-start
              justify-center
            "
          >
            <p
              className="
                mb-[12px]

                text-[10px]
                uppercase
                tracking-[0.16em]
                text-white/32
              "
            >
              Powered by
            </p>

            <div className="w-full">
              <BareLogo
                logoUrl={brandALogo}
                fallback={brandAName}
              />
            </div>
          </div>
        </div>
      )}

      {template ===
        "powered-corner" && (
        <>
          <div
            className="
              absolute
              left-1/2
              top-[29%]

              w-[66%]

              -translate-x-1/2
            "
          >
            <OpticalLogoFrame
              logoUrl={brandBLogo}
              fallback={brandBName}
              large
            />
          </div>

          <div
            className="
              absolute
              bottom-[11%]
              right-[11%]

              flex
              w-[29%]
              flex-col
              items-end
            "
          >
            <p
              className="
                mb-[9px]

                text-[10px]
                uppercase
                tracking-[0.15em]
                text-white/30
              "
            >
              Powered by
            </p>

            <BareLogo
              logoUrl={brandALogo}
              fallback={brandAName}
            />
          </div>
        </>
      )}

      {/* ================================================= */}
      {/* A PRESENTS B                                      */}
      {/* ================================================= */}

      {template ===
        "presents-stacked" && (
        <div
          className="
            absolute
            left-1/2
            top-1/2

            flex
            w-[62%]

            -translate-x-1/2
            -translate-y-1/2

            flex-col
            items-center
          "
        >
          <div className="w-[56%]">
            <OpticalLogoFrame
              logoUrl={brandALogo}
              fallback={brandAName}
              compact
            />
          </div>

          <ConnectorText>
            Presents
          </ConnectorText>

          <OpticalLogoFrame
            logoUrl={brandBLogo}
            fallback={brandBName}
            large
          />
        </div>
      )}

      {template ===
        "presents-inline" && (
        <div
          className="
            absolute
            left-[9%]
            right-[9%]
            top-1/2

            grid
            -translate-y-1/2

            grid-cols-[0.75fr_1px_1.45fr]

            items-center
            gap-[30px]
          "
        >
          {/* PRESENTER */}

          <div
            className="
              flex
              flex-col
              items-end
              justify-center
            "
          >
            <div className="w-full">
              <BareLogo
                logoUrl={brandALogo}
                fallback={brandAName}
              />
            </div>

            <p
              className="
                mt-[12px]

                text-[10px]
                uppercase
                tracking-[0.16em]
                text-white/32
              "
            >
              Presents
            </p>
          </div>

          {/* DIVIDER */}

          <div
            className="
              h-[92px]
              w-px
              bg-white/[0.1]
            "
          />

          {/* FEATURED BRAND */}

          <OpticalLogoFrame
            logoUrl={brandBLogo}
            fallback={brandBName}
            large
          />
        </div>
      )}

      {template ===
        "presents-corner" && (
        <>
          <div
            className="
              absolute
              left-[11%]
              top-[14%]
              w-[28%]
            "
          >
            <LabeledLockupBlock
              label="Presented by"
              logoUrl={brandALogo}
              fallback={brandAName}
              compact
            />
          </div>

          <div
            className="
              absolute
              bottom-[18%]
              right-[10%]
              w-[61%]
            "
          >
            <OpticalLogoFrame
              logoUrl={brandBLogo}
              fallback={brandBName}
              large
            />
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* CANVAS GUIDES                                    */
/* ------------------------------------------------ */

function CanvasGuides() {
  return (
    <>
      {/* GLOBAL SAFE AREA */}

      <div
        className="
          pointer-events-none

          absolute

          rounded-[16px]

          border
          border-dashed
          border-white/[0.09]
        "
        style={{
          left: "8%",
          right: "8%",
          top: "8%",
          bottom: "8%",
        }}
      />

      {/* VERTICAL CENTER */}

      <div
        className="
          pointer-events-none

          absolute

          bottom-[8%]
          left-1/2
          top-[8%]

          w-px
          -translate-x-1/2

          bg-white/[0.04]
        "
      />

      {/* HORIZONTAL CENTER */}

      <div
        className="
          pointer-events-none

          absolute

          left-[8%]
          right-[8%]
          top-1/2

          h-px
          -translate-y-1/2

          bg-white/[0.04]
        "
      />

      <p
        className="
          absolute
          bottom-[10%]
          right-[10%]

          text-[9px]
          uppercase
          tracking-[0.14em]
          text-white/15
        "
      >
        8% safe area
      </p>
    </>
  );
}

/* ------------------------------------------------ */
/* OPTICAL LOGO FRAME                               */
/* ------------------------------------------------ */

function OpticalLogoFrame({
  logoUrl,
  fallback,

  large = false,
  compact = false,
}: {
  logoUrl: string | null;
  fallback: string;

  large?: boolean;
  compact?: boolean;
}) {
  const height =
    large
      ? "h-[112px]"
      : compact
        ? "h-[72px]"
        : "h-[92px]";

  return (
    <div
      className={`
        relative
        w-full
        ${height}

        rounded-[16px]

        border
        border-white/[0.11]

        bg-white/[0.012]
      `}
    >
      {/* INTERNAL SAFE AREA */}

      <div
        className="
          absolute
          inset-[10%]

          rounded-[10px]

          border
          border-dashed
          border-white/[0.07]
        "
      />

      {/* AXES */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          top-0

          w-px
          -translate-x-1/2

          bg-white/[0.035]
        "
      />

      <div
        className="
          absolute
          left-0
          right-0
          top-1/2

          h-px
          -translate-y-1/2

          bg-white/[0.035]
        "
      />

      {/* LOGO */}

      <div
        className="
          absolute

          bottom-[19%]
          left-[13%]
          right-[13%]
          top-[19%]
        "
      >
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* BARE LOGO                                        */
/* ------------------------------------------------ */

function BareLogo({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div className="h-[58px] w-full">
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* LABEL + LOGO                                     */
/* ------------------------------------------------ */

function LabeledLockupBlock({
  label,

  logoUrl,
  fallback,

  large = false,
  compact = false,
}: {
  label: string;

  logoUrl: string | null;
  fallback: string;

  large?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="w-full">
      <p
        className="
          mb-[10px]

          text-[10px]
          tracking-[0.02em]
          text-white/32
        "
      >
        {label}
      </p>

      <OpticalLogoFrame
        logoUrl={logoUrl}
        fallback={fallback}
        large={large}
        compact={compact}
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* CONNECTORS                                       */
/* ------------------------------------------------ */

function RelationshipWord({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center

        text-[30px]
        text-white/55

        oook-light
      "
    >
      {children}
    </div>
  );
}

function ConnectorText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        h-[48px]
        items-center
        justify-center
      "
    >
      <p
        className="
          text-[11px]
          uppercase
          tracking-[0.16em]
          text-white/34

          oook-medium
        "
      >
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* TOP RIGHT PARTNERSHIP LOCKUP                     */
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