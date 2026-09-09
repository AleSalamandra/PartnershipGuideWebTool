"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage, {
  useGuidelineThemeStore,
} from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

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

interface PaletteConfig {
  collaboration:
    string;

  collaborationSecondary:
    string;

  accent:
    string;

  accentSecondary:
    string;

  collaborationLabel:
    string;

  accentLabel:
    string;

  description:
    string;

  rules:
    string[];

  neutralRatio:
    number;

  primaryRatio:
    number;

  accentRatio:
    number;
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function safeColour(
  value:
    unknown,

  fallback:
    string
) {
  return (
    typeof value ===
      "string" &&
    /^#[0-9A-Fa-f]{6}$/.test(
      value
    )
  )
    ? value
    : fallback;
}

function hexToRgb(
  colour:
    string
) {
  const value =
    parseInt(
      colour.replace(
        "#",
        ""
      ),
      16
    );

  return {
    r:
      (value >> 16) &
      255,

    g:
      (value >> 8) &
      255,

    b:
      value &
      255,
  };
}

function alpha(
  colour:
    string,

  opacity:
    number
) {
  const {
    r,
    g,
    b,
  } =
    hexToRgb(
      colour
    );

  return `rgba(${r},${g},${b},${opacity})`;
}

function mixHex(
  a:
    string,

  b:
    string,

  ratio =
    0.5
) {
  const ca =
    hexToRgb(
      a
    );

  const cb =
    hexToRgb(
      b
    );

  const mix = (
    x:
      number,

    y:
      number
  ) =>
    Math.round(
      x *
        ratio +
        y *
          (1 -
            ratio)
    );

  return (
    "#" +
    [
      mix(
        ca.r,
        cb.r
      ),

      mix(
        ca.g,
        cb.g
      ),

      mix(
        ca.b,
        cb.b
      ),
    ]
      .map(
        (
          value
        ) =>
          value
            .toString(
              16
            )
            .padStart(
              2,
              "0"
            )
      )
      .join(
        ""
      )
  );
}

/* ================================================= */
/* BASE A/B CONFIG                                   */
/* ================================================= */

function getBasePaletteConfig(
  model:
    PartnershipModelId,

  aPrimary:
    string,

  aSecondary:
    string,

  bPrimary:
    string,

  bSecondary:
    string
): PaletteConfig {
  switch (
    model
  ) {
    case "axb":
      return {
        collaboration:
          mixHex(
            aPrimary,
            bPrimary
          ),

        collaborationSecondary:
          mixHex(
            aSecondary,
            bSecondary
          ),

        accent:
          bPrimary,

        accentSecondary:
          aSecondary,

        collaborationLabel:
          "Shared collaboration colour",

        accentLabel:
          "Alternating brand accent",

        description:
          "Both brands contribute equally. Shared surfaces use a blended collaboration colour while individual brand colours remain accents.",

        rules: [
          "70% neutral foundation",
          "20% shared collaboration colour",
          "10% controlled brand accent",
        ],

        neutralRatio:
          70,

        primaryRatio:
          20,

        accentRatio:
          10,
      };

    case "aandb":
      return {
        collaboration:
          aPrimary,

        collaborationSecondary:
          aSecondary,

        accent:
          bPrimary,

        accentSecondary:
          bSecondary,

        collaborationLabel:
          "Brand A collaboration colour",

        accentLabel:
          "Brand B supporting accent",

        description:
          "Brand A establishes the chromatic world. Brand B enters through controlled accents and secondary details.",

        rules: [
          "70% neutral foundation",
          "20% Brand A colour system",
          "10% Brand B accent",
        ],

        neutralRatio:
          70,

        primaryRatio:
          20,

        accentRatio:
          10,
      };

    case "poweredByA":
      return {
        collaboration:
          bPrimary,

        collaborationSecondary:
          bSecondary,

        accent:
          aPrimary,

        accentSecondary:
          aSecondary,

        collaborationLabel:
          "Brand B experience colour",

        accentLabel:
          "Brand A endorsement accent",

        description:
          "Brand B owns the visible colour language. Brand A colour is reserved for endorsement and technology-credit moments.",

        rules: [
          "70% neutral / Brand B base",
          "20% Brand B colour system",
          "≤10% Brand A endorsement",
        ],

        neutralRatio:
          70,

        primaryRatio:
          20,

        accentRatio:
          10,
      };

    case "presentsB":
    default:
      return {
        collaboration:
          aPrimary,

        collaborationSecondary:
          aSecondary,

        accent:
          bPrimary,

        accentSecondary:
          bSecondary,

        collaborationLabel:
          "Brand A platform colour",

        accentLabel:
          "Brand B content colour",

        description:
          "Brand A defines the interface and container. Brand B colours are free to appear inside the featured content territory.",

        rules: [
          "Platform remains Brand A-led",
          "Brand B colour lives inside content",
          "Avoid merging both into one large surface",
        ],

        neutralRatio:
          70,

        primaryRatio:
          20,

        accentRatio:
          10,
      };
  }
}

/* ================================================= */
/* X LAYER                                           */
/* ================================================= */

function applyAdditionalRelationship(
  base:
    PaletteConfig,

  mode:
    AdditionalRelationshipMode,

  propertyName:
    string,

  xPrimary:
    string,

  xSecondary:
    string
): PaletteConfig {
  if (
    mode ===
    "presenting"
  ) {
    return {
      collaboration:
        xPrimary,

      collaborationSecondary:
        xSecondary,

      accent:
        base.collaboration,

      accentSecondary:
        base.accent,

      collaborationLabel:
        `${propertyName} primary territory`,

      accentLabel:
        "Partnership supporting accent",

      description:
        `${propertyName} becomes the dominant non-neutral colour source. The underlying Brand A / Brand B palette remains visible as a supporting presentation layer rather than competing with the property.`,

      rules: [
        "60% neutral foundation",
        `25% ${propertyName} colour system`,
        "15% controlled partnership accent",
        "Never create three competing brand-colour territories",
      ],

      neutralRatio:
        60,

      primaryRatio:
        25,

      accentRatio:
        15,
    };
  }

  if (
    mode ===
    "sponsored"
  ) {
    return {
      ...base,

      description:
        `${base.description} ${propertyName} is a sponsor only, so its colours do not enter the shared visual territory.`,

      rules: [
        ...base.rules,
        `${propertyName} colour is restricted to its own sponsor logo or approved sponsor asset`,
      ],
    };
  }

  return base;
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page08() {
  const {
    partnershipModel,
    additionalRelationship,

    brandA,
    brandB,
    propertyX,
  } =
    useGuidelineStore();

  const theme =
    useGuidelineThemeStore(
      (
        state
      ) =>
        state.theme
    );

  const isLight =
    theme ===
    "light";

  const model =
    partnershipModel as PartnershipModelId;

  const propertyName =
    propertyX.name.trim() ||
    "X";

  const aPrimary =
    safeColour(
      brandA.primaryColor,
      "#FF453A"
    );

  const aSecondary =
    safeColour(
      brandA.secondaryColor,
      "#FF8A80"
    );

  const bPrimary =
    safeColour(
      brandB.primaryColor,
      "#3478F6"
    );

  const bSecondary =
    safeColour(
      brandB.secondaryColor,
      "#64D2FF"
    );

  const xPrimary =
    safeColour(
      propertyX.primaryColor,
      "#8A8A8A"
    );

  const xSecondary =
    safeColour(
      propertyX.secondaryColor,
      "#B9B9B9"
    );

  const baseConfig =
    getBasePaletteConfig(
      model,
      aPrimary,
      aSecondary,
      bPrimary,
      bSecondary
    );

  const config =
    applyAdditionalRelationship(
      baseConfig,
      additionalRelationship,
      propertyName,
      xPrimary,
      xSecondary
    );

  const presenting =
    additionalRelationship ===
    "presenting";

  const sponsored =
    additionalRelationship ===
    "sponsored";

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute
          left-[70px]
          right-[70px]
          top-[46px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[13px]
              uppercase
              tracking-[0.17em]

              text-white/30
            "
          >
            08 / Shared visual territory
          </p>

          <h1
            className="
              mt-[12px]

              text-[52px]
              leading-none
              tracking-[-0.045em]

              text-white
              oook-semibold
            "
          >
            Shared visual territory — colours
          </h1>

          <p
            className="
              mt-[13px]

              max-w-[900px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            {presenting
              ? `${propertyName} actively influences the shared visual territory while the A / B relationship remains visible as a supporting partnership layer.`
              : sponsored
                ? `The partnership colour system remains unchanged. ${propertyName} does not contribute colour to shared surfaces.`
                : "A neutral shared foundation gives both brands room to coexist without creating visual competition."}
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            items-end
            gap-[10px]
          "
        >
          <PartnershipLockup
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {presenting && (
            <RelationshipLabel
              text={`Presenting ${propertyName}`}
            />
          )}

          {sponsored && (
            <RelationshipLabel
              text={`Sponsored by ${propertyName}`}
            />
          )}
        </div>
      </header>

      {/* ======================================== */}
      {/* LEFT                                     */}
      {/* ======================================== */}

      <aside
        className="
          absolute

          left-[70px]
          top-[190px]

          w-[310px]
        "
      >
        <Card className="p-[16px]">
          <SectionLabel>
            Core collaboration palette
          </SectionLabel>

          <div
            className="
              mt-[12px]

              grid
              grid-cols-3

              gap-[7px]
            "
          >
            <Swatch
              colour="#000000"
              label="Black"
            />

            <Swatch
              colour="#FFFFFF"
              label="White"
            />

            <Swatch
              colour="#8A8A8A"
              label="Neutral grey"
            />
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Identity colours
          </SectionLabel>

          <BrandPalette
            label="Brand A"
            primary={
              aPrimary
            }
            secondary={
              aSecondary
            }
          />

          <BrandPalette
            label="Brand B"
            primary={
              bPrimary
            }
            secondary={
              bSecondary
            }
          />

          {presenting && (
            <BrandPalette
              label={`Presented · ${propertyName}`}
              primary={
                xPrimary
              }
              secondary={
                xSecondary
              }
              featured
            />
          )}

          {sponsored && (
            <div
              className="
                mt-[12px]

                rounded-[10px]

                border
                border-white/[0.06]

                px-[10px]
                py-[9px]
              "
            >
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]

                  text-white/25
                "
              >
                Sponsor
              </p>

              <p
                className="
                  mt-[4px]

                  text-[9px]
                  leading-[1.35]

                  text-white/38
                "
              >
                {propertyName} colours are not part of this palette.
              </p>
            </div>
          )}
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Recommended ratio
          </SectionLabel>

          <div
            className="
              mt-[13px]

              flex
              h-[10px]

              overflow-hidden

              rounded-full
            "
          >
            <div
              style={{
                width:
                  `${config.neutralRatio}%`,
              }}
              className="bg-[#777]"
            />

            <div
              style={{
                width:
                  `${config.primaryRatio}%`,

                backgroundColor:
                  config.collaboration,
              }}
            />

            <div
              style={{
                width:
                  `${config.accentRatio}%`,

                backgroundColor:
                  config.accent,
              }}
            />
          </div>

          <div
            className="
              mt-[9px]

              grid
              grid-cols-3

              text-[9px]
              text-white/38
            "
          >
            <span>
              {config.neutralRatio}% neutral
            </span>

            <span>
              {config.primaryRatio}% primary
            </span>

            <span>
              {config.accentRatio}% accent
            </span>
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Model logic
          </SectionLabel>

          <p
            className="
              mt-[10px]

              text-[11px]
              leading-[1.45]

              text-white/42
            "
          >
            {config.description}
          </p>

          <div
            className="
              mt-[12px]
              space-y-[7px]
            "
          >
            {config.rules.map(
              (
                rule,
                index
              ) => (
                <div
                  key={
                    rule
                  }
                  className="
                    grid
                    grid-cols-[22px_1fr]
                    gap-[6px]
                  "
                >
                  <span className="text-[9px] text-white/20">
                    0{index + 1}
                  </span>

                  <span className="text-[10px] text-white/52">
                    {rule}
                  </span>
                </div>
              )
            )}
          </div>
        </Card>
      </aside>

      {/* ======================================== */}
      {/* EXAMPLES TOP                             */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[405px]
          right-[70px]
          top-[190px]

          grid
          grid-cols-4

          gap-[10px]
        "
      >
        <ExampleCard
          number="01"
          title="Background"
        >
          <BackgroundExample
            config={config}
          />
        </ExampleCard>

        <ExampleCard
          number="02"
          title="Headlines"
        >
          <HeadlineExample
            config={config}
            fontFamily={
              presenting
                ? propertyX.fontFamily
                : undefined
            }
          />
        </ExampleCard>

        <ExampleCard
          number="03"
          title="Overlay"
        >
          <OverlayExample
            config={config}
          />
        </ExampleCard>

        <ExampleCard
          number="04"
          title="CTA"
        >
          <CTAExample
            config={config}
          />
        </ExampleCard>
      </section>

      {/* ======================================== */}
      {/* EXAMPLES BOTTOM                          */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[405px]
          right-[70px]
          top-[505px]

          grid
          grid-cols-3

          gap-[10px]
        "
      >
        <ExampleCard
          number="05"
          title="Graphics"
          large
        >
          <GraphicsExample
            config={config}
          />
        </ExampleCard>

        <ExampleCard
          number="06"
          title="Video"
          large
        >
          <VideoExample
            config={config}
            isLight={
              isLight
            }
            fontFamily={
              presenting
                ? propertyX.fontFamily
                : undefined
            }
          />
        </ExampleCard>

        <ExampleCard
          number="07"
          title="DON'T"
          large
          danger
        >
          <ForbiddenExample
            mode={
              additionalRelationship
            }
            aPrimary={
              aPrimary
            }
            bPrimary={
              bPrimary
            }
            xPrimary={
              xPrimary
            }
          />
        </ExampleCard>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[25px]
          left-[70px]
          right-[70px]

          flex
          justify-between

          border-t
          border-white/[0.06]

          pt-[10px]

          text-[9px]
          text-white/25
        "
      >
        <span>
          {presenting
            ? "Never create large competing colour territories between Brand A, Brand B and the presented property."
            : sponsored
              ? `${propertyName} sponsor colours never replace or modify the collaboration palette.`
              : "Never use both brands’ primary colours simultaneously across large surfaces."}
        </span>

        <span>
          Secondary colours support depth — never hierarchy.
        </span>
      </div>
    </GuidelinePage>
  );
}

/* ================================================= */
/* UI                                                */
/* ================================================= */

function Card({
  children,
  className = "",
}: {
  children:
    ReactNode;

  className?:
    string;
}) {
  return (
    <div
      className={`
        rounded-[18px]

        border
        border-white/[0.07]

        bg-white/[0.018]

        ${className}
      `}
    >
      {children}
    </div>
  );
}

function SectionLabel({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <p
      className="
        text-[10px]
        uppercase
        tracking-[0.14em]

        text-white/30
        oook-medium
      "
    >
      {children}
    </p>
  );
}

function RelationshipLabel({
  text,
}: {
  text:
    string;
}) {
  return (
    <span
      className="
        rounded-full

        border
        border-white/[0.07]

        px-[10px]
        py-[6px]

        text-[8px]
        uppercase
        tracking-[0.12em]

        text-white/30
      "
    >
      {text}
    </span>
  );
}

function Swatch({
  colour,
  label,
}: {
  colour:
    string;

  label:
    string;
}) {
  return (
    <div>
      <div
        className="
          h-[46px]

          rounded-[9px]

          border
          border-white/[0.08]
        "
        style={{
          backgroundColor:
            colour,
        }}
      />

      <p className="mt-[5px] text-[8px] text-white/30">
        {label}
      </p>
    </div>
  );
}

function BrandPalette({
  label,
  primary,
  secondary,
  featured = false,
}: {
  label:
    string;

  primary:
    string;

  secondary:
    string;

  featured?:
    boolean;
}) {
  return (
    <div
      className={
        featured
          ? `
              mt-[12px]

              rounded-[10px]

              border
              border-white/[0.08]

              p-[8px]
            `
          : "mt-[12px]"
      }
    >
      <p
        className={
          featured
            ? "text-[9px] text-white/65"
            : "text-[9px] text-white/45"
        }
      >
        {label}
      </p>

      <div
        className="
          mt-[6px]

          flex
          gap-[6px]
        "
      >
        <ColourChip
          colour={primary}
          label="Primary"
        />

        <ColourChip
          colour={secondary}
          label="Secondary"
        />
      </div>
    </div>
  );
}

function ColourChip({
  colour,
  label,
}: {
  colour:
    string;

  label:
    string;
}) {
  return (
    <div
      className="
        flex
        flex-1

        items-center
        gap-[7px]

        rounded-[9px]

        border
        border-white/[0.06]

        px-[8px]
        py-[7px]
      "
    >
      <div
        className="
          h-[13px]
          w-[13px]

          rounded-full
        "
        style={{
          backgroundColor:
            colour,
        }}
      />

      <div>
        <p className="text-[7px] text-white/28">
          {label}
        </p>

        <p
          className="
            mt-[1px]

            text-[8px]
            uppercase

            text-white/48
          "
        >
          {colour}
        </p>
      </div>
    </div>
  );
}

/* ================================================= */
/* EXAMPLE CARD                                      */
/* ================================================= */

function ExampleCard({
  number,
  title,
  children,
  large = false,
  danger = false,
}: {
  number:
    string;

  title:
    string;

  children:
    ReactNode;

  large?:
    boolean;

  danger?:
    boolean;
}) {
  return (
    <Card className="overflow-hidden p-[10px]">
      <div className="flex items-center gap-[7px]">
        <span className="text-[8px] text-white/20">
          {number}
        </span>

        <p
          className={`
            text-[11px]
            oook-medium

            ${
              danger
                ? "text-white/55"
                : "text-white/68"
            }
          `}
        >
          {title}
        </p>
      </div>

      <div
        className="
          relative

          mt-[8px]

          overflow-hidden

          rounded-[11px]

          border
          border-white/[0.06]

          bg-[#050506]
        "
        style={{
          height:
            large
              ? 220
              : 225,
        }}
      >
        {children}
      </div>
    </Card>
  );
}

/* ================================================= */
/* BACKGROUND EXAMPLE                                */
/* ================================================= */

function BackgroundExample({
  config,
}: {
  config:
    PaletteConfig;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[#09090A]" />

      <div
        className="
          absolute

          left-[14px]
          right-[14px]
          top-[15px]

          h-[52px]

          overflow-hidden

          rounded-[10px]
        "
      >
        <RasterGradient
          direction="horizontal"
          className="h-full w-full"
          stops={[
            {
              color:
                config.collaboration,
              offset:
                0,
            },

            {
              color:
                config.collaborationSecondary,
              offset:
                100,
            },
          ]}
        />
      </div>

      <div
        className="
          absolute

          bottom-[15px]
          left-[14px]
          right-[14px]

          h-[118px]

          rounded-[10px]

          bg-white/[0.035]
        "
      >
        <div
          className="
            absolute

            bottom-[10px]
            left-[10px]

            h-[5px]
            w-[55px]

            rounded-full
          "
          style={{
            backgroundColor:
              config.accent,
          }}
        />

        <div
          className="
            absolute

            bottom-[10px]
            left-[72px]

            h-[5px]
            w-[28px]

            rounded-full
          "
          style={{
            backgroundColor:
              config.accentSecondary,
          }}
        />
      </div>
    </>
  );
}

/* ================================================= */
/* HEADLINE                                          */
/* ================================================= */

function HeadlineExample({
  config,
  fontFamily,
}: {
  config:
    PaletteConfig;

  fontFamily?:
    string;
}) {
  return (
    <div className="absolute inset-[18px]">
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.12em]

          text-white/24
        "
      >
        Shared headline
      </p>

      <h3
        className="
          mt-[32px]

          text-[29px]
          leading-[0.95]
          tracking-[-0.04em]

          text-white
        "
        style={
          fontFamily
            ? {
                fontFamily,
              }
            : undefined
        }
      >
        Feel closer
        <br />
        to the moment.
      </h3>

      <div
        className="
          mt-[15px]

          h-[4px]
          w-[78px]

          overflow-hidden

          rounded-full
        "
      >
        <RasterGradient
          className="h-full w-full"
          stops={[
            {
              color:
                config.collaboration,
              offset:
                0,
            },

            {
              color:
                config.collaborationSecondary,
              offset:
                100,
            },
          ]}
        />
      </div>

      <p
        className="
          mt-[13px]

          text-[9px]
          leading-[1.4]

          text-white/31
        "
      >
        Accent colour supports emphasis, never entire paragraphs.
      </p>
    </div>
  );
}

/* ================================================= */
/* OVERLAY                                           */
/* ================================================= */

function OverlayExample({
  config,
}: {
  config:
    PaletteConfig;
}) {
  return (
    <>
      <RasterGlow
        color={
          config.collaborationSecondary
        }
        secondaryColor={
          config.collaboration
        }
        opacity={0.28}
        secondaryOpacity={0.08}
        centerX={78}
        centerY={18}
        radius={68}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />

      <div
        className="
          absolute

          bottom-[15px]
          left-[15px]
          right-[15px]

          rounded-[11px]

          border
          border-white/[0.09]

          bg-black/60

          p-[12px]
        "
      >
        <div
          className="
            h-[4px]
            w-[38px]

            rounded-full
          "
          style={{
            backgroundColor:
              config.accent,
          }}
        />

        <p className="mt-[7px] text-[11px] text-white/70">
          Live immersive coverage
        </p>

        <p className="mt-[3px] text-[8px] text-white/30">
          Shared persistent identity
        </p>
      </div>
    </>
  );
}

/* ================================================= */
/* CTA                                               */
/* ================================================= */

function CTAExample({
  config,
}: {
  config:
    PaletteConfig;
}) {
  return (
    <div
      className="
        absolute
        inset-0

        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          flex
          items-center
          gap-[9px]

          rounded-full

          px-[18px]
          py-[10px]

          text-[10px]
          text-white
        "
        style={{
          backgroundColor:
            config.collaboration,
        }}
      >
        <span>
          Explore experience
        </span>

        <span>
          →
        </span>
      </div>

      <div
        className="
          absolute

          bottom-[28px]

          h-[4px]
          w-[38px]

          rounded-full
        "
        style={{
          backgroundColor:
            config.accentSecondary,
        }}
      />
    </div>
  );
}

/* ================================================= */
/* GRAPHICS                                          */
/* ================================================= */

function GraphicsExample({
  config,
}: {
  config:
    PaletteConfig;
}) {
  return (
    <div className="absolute inset-0">
      <div
        className="
          absolute

          left-[15%]
          top-[20%]

          h-[115px]
          w-[115px]

          rounded-full

          border
        "
        style={{
          borderColor:
            alpha(
              config.collaboration,
              0.55
            ),
        }}
      />

      <div
        className="
          absolute

          left-[33%]
          top-[29%]

          h-[85px]
          w-[145px]

          rounded-[26px]

          border
        "
        style={{
          borderColor:
            alpha(
              config.collaborationSecondary,
              0.6
            ),
        }}
      />

      <div
        className="
          absolute

          bottom-[28px]
          left-[15%]
          right-[15%]

          flex
          gap-[4px]
        "
      >
        {[
          30,
          56,
          38,
          78,
          45,
          90,
          52,
        ].map(
          (
            height,
            index
          ) => (
            <div
              key={index}
              className="
                flex-1
                rounded-full
              "
              style={{
                height:
                  `${height}px`,

                backgroundColor:
                  index %
                      3 ===
                    0
                    ? config.accent
                    : index %
                          2 ===
                        0
                      ? alpha(
                          config.collaborationSecondary,
                          0.55
                        )
                      : "rgba(255,255,255,.12)",
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

/* ================================================= */
/* VIDEO                                             */
/* ================================================= */

function VideoExample({
  config,
  isLight,
  fontFamily,
}: {
  config:
    PaletteConfig;

  isLight:
    boolean;

  fontFamily?:
    string;
}) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundColor:
            isLight
              ? "#F2F2EF"
              : "#080809",
        }}
      />

      <RasterGradient
        direction="vertical"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        stops={
          isLight
            ? [
                {
                  color:
                    "#FFFFFF",
                  offset:
                    0,
                  opacity:
                    0.58,
                },
                {
                  color:
                    "#E8E8E4",
                  offset:
                    100,
                  opacity:
                    0.92,
                },
              ]
            : [
                {
                  color:
                    "#FFFFFF",
                  offset:
                    0,
                  opacity:
                    0.08,
                },
                {
                  color:
                    "#000000",
                  offset:
                    100,
                  opacity:
                    1,
                },
              ]
        }
      />

      <RasterGlow
        color={
          config.collaborationSecondary
        }
        secondaryColor={
          config.collaboration
        }
        opacity={0.32}
        secondaryOpacity={0.08}
        centerX={84}
        centerY={22}
        className="
          absolute

          -right-[40px]
          -top-[25px]

          h-[220px]
          w-[220px]
        "
      />

      <div
        className="
          absolute

          bottom-[18px]
          left-[18px]
          right-[18px]
        "
      >
        <p
          className="
            text-[19px]
            tracking-[-0.025em]

            text-white/85
          "
          style={
            fontFamily
              ? {
                  fontFamily,
                }
              : undefined
          }
        >
          Live from inside the event
        </p>

        <div
          className="
            mt-[8px]

            flex
            items-center
            gap-[6px]
          "
        >
          <div
            className="
              h-[5px]
              w-[35px]

              rounded-full
            "
            style={{
              backgroundColor:
                config.collaboration,
            }}
          />

          <div
            className="
              h-[5px]
              w-[18px]

              rounded-full
            "
            style={{
              backgroundColor:
                config.accentSecondary,
            }}
          />
        </div>
      </div>
    </>
  );
}

/* ================================================= */
/* DON'T                                             */
/* ================================================= */

function ForbiddenExample({
  mode,
  aPrimary,
  bPrimary,
  xPrimary,
}: {
  mode:
    AdditionalRelationshipMode;

  aPrimary:
    string;

  bPrimary:
    string;

  xPrimary:
    string;
}) {
  if (
    mode ===
    "presenting"
  ) {
    return (
      <>
        <div
          className="
            absolute
            inset-y-0
            left-0
            w-1/3
          "
          style={{
            backgroundColor:
              aPrimary,
          }}
        />

        <div
          className="
            absolute
            inset-y-0
            left-1/3
            w-1/3
          "
          style={{
            backgroundColor:
              bPrimary,
          }}
        />

        <div
          className="
            absolute
            inset-y-0
            right-0
            w-1/3
          "
          style={{
            backgroundColor:
              xPrimary,
          }}
        />

        <ForbiddenMark />

        <p
          className="
            absolute

            bottom-[14px]
            left-[14px]
            right-[14px]

            text-center
            text-[9px]

            text-white/60
          "
        >
          Never create three competing large colour territories.
        </p>
      </>
    );
  }

  return (
    <>
      <div
        className="
          absolute
          inset-y-0
          left-0
          w-1/2
        "
        style={{
          backgroundColor:
            aPrimary,
        }}
      />

      <div
        className="
          absolute
          inset-y-0
          right-0
          w-1/2
        "
        style={{
          backgroundColor:
            bPrimary,
        }}
      />

      <ForbiddenMark />

      <p
        className="
          absolute

          bottom-[14px]
          left-[14px]
          right-[14px]

          text-center
          text-[9px]

          text-white/60
        "
      >
        Never create two competing large colour territories.
      </p>
    </>
  );
}

function ForbiddenMark() {
  return (
    <div
      className="
        absolute
        inset-0

        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          flex
          h-[42px]
          w-[42px]

          items-center
          justify-center

          rounded-full

          bg-black/70

          text-[22px]
          text-white
        "
      >
        ×
      </div>
    </div>
  );
}