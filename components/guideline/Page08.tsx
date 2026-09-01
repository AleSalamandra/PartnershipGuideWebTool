"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface PaletteConfig {
  collaboration: string;
  collaborationSecondary: string;

  accent: string;
  accentSecondary: string;

  collaborationLabel: string;
  accentLabel: string;

  description: string;

  rules: [
    string,
    string,
    string
  ];
}

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

function safeColour(
  value: unknown,
  fallback: string
) {
  return typeof value === "string" &&
    /^#[0-9A-Fa-f]{6}$/.test(value)
    ? value
    : fallback;
}

function hexToRgb(
  colour: string
) {
  const value =
    parseInt(
      colour.replace("#", ""),
      16
    );

  return {
    r:
      (value >> 16) & 255,

    g:
      (value >> 8) & 255,

    b:
      value & 255,
  };
}

function alpha(
  colour: string,
  opacity: number
) {
  const {
    r,
    g,
    b,
  } = hexToRgb(colour);

  return `rgba(${r},${g},${b},${opacity})`;
}

function mixHex(
  a: string,
  b: string,
  ratio = 0.5
) {
  const ca =
    hexToRgb(a);

  const cb =
    hexToRgb(b);

  const mix = (
    x: number,
    y: number
  ) =>
    Math.round(
      x * ratio +
      y * (1 - ratio)
    );

  return (
    "#" +
    [mix(ca.r, cb.r), mix(ca.g, cb.g), mix(ca.b, cb.b)]
      .map((v) =>
        v
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

/* ------------------------------------------------ */
/* MODEL CONFIG                                     */
/* ------------------------------------------------ */

function getPaletteConfig(
  model: PartnershipModelId,

  aPrimary: string,
  aSecondary: string,

  bPrimary: string,
  bSecondary: string
): PaletteConfig {
  switch (model) {
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
      };
  }
}

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page08() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } = useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

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

  const config =
    getPaletteConfig(
      model,

      aPrimary,
      aSecondary,

      bPrimary,
      bSecondary
    );

  return (
    <GuidelinePage>
      {/* HEADER */}

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
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            08 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] text-white oook-semibold">
            Shared visual territory — colours
          </h1>

          <p className="mt-[13px] max-w-[850px] text-[16px] leading-[1.38] text-white/45">
            A neutral shared foundation gives both brands room to coexist without creating visual competition.
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* LEFT */}

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

          <div className="mt-[12px] grid grid-cols-3 gap-[7px]">
            <Swatch
              colour="#000000"
              label="Black"
            />

            <Swatch
              colour="#FFFFFF"
              label="White"
              dark
            />

            <Swatch
              colour="#8A8A8A"
              label="Neutral grey"
            />
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Brand accents
          </SectionLabel>

          <BrandPalette
            label="Brand A"
            primary={aPrimary}
            secondary={aSecondary}
          />

          <BrandPalette
            label="Brand B"
            primary={bPrimary}
            secondary={bSecondary}
          />
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Recommended ratio
          </SectionLabel>

          <div className="mt-[13px] overflow-hidden rounded-full h-[10px] flex">
            <div className="w-[70%] bg-[#777]" />

            <div
              className="w-[20%]"
              style={{
                backgroundColor:
                  config.collaboration,
              }}
            />

            <div
              className="w-[10%]"
              style={{
                backgroundColor:
                  config.accent,
              }}
            />
          </div>

          <div className="mt-[9px] grid grid-cols-3 text-[9px] text-white/38">
            <span>70% neutral</span>
            <span>20% primary</span>
            <span>10% accent</span>
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Model logic
          </SectionLabel>

          <p className="mt-[10px] text-[11px] leading-[1.45] text-white/42">
            {config.description}
          </p>

          <div className="mt-[12px] space-y-[7px]">
            {config.rules.map(
              (rule, index) => (
                <div
                  key={rule}
                  className="grid grid-cols-[22px_1fr] gap-[6px]"
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

      {/* EXAMPLES */}

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
          />
        </ExampleCard>

        <ExampleCard
          number="07"
          title="DON'T"
          large
          danger
        >
          <ForbiddenExample
            aPrimary={aPrimary}
            bPrimary={bPrimary}
          />
        </ExampleCard>
      </section>

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
          Never use both brands’ primary colours simultaneously across large surfaces.
        </span>

        <span>
          Secondary colours support depth — never hierarchy.
        </span>
      </div>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* UI                                               */
/* ------------------------------------------------ */

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
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
  children: ReactNode;
}) {
  return (
    <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 oook-medium">
      {children}
    </p>
  );
}

function Swatch({
  colour,
  label,
  dark = false,
}: {
  colour: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div
        className="h-[46px] rounded-[9px] border border-white/[0.08]"
        style={{
          backgroundColor:
            colour,
        }}
      />

      <p
        className={`
          mt-[5px]
          text-[8px]

          ${
            dark
              ? "text-white/35"
              : "text-white/30"
          }
        `}
      >
        {label}
      </p>
    </div>
  );
}

function BrandPalette({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="mt-[12px]">
      <p className="text-[9px] text-white/45">
        {label}
      </p>

      <div className="mt-[6px] flex gap-[6px]">
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
  colour: string;
  label: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-[7px] rounded-[9px] border border-white/[0.06] px-[8px] py-[7px]">
      <div
        className="h-[13px] w-[13px] rounded-full"
        style={{
          backgroundColor:
            colour,
        }}
      />

      <div>
        <p className="text-[7px] text-white/28">
          {label}
        </p>

        <p className="mt-[1px] text-[8px] uppercase text-white/48">
          {colour}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* EXAMPLES                                         */
/* ------------------------------------------------ */

function ExampleCard({
  number,
  title,
  children,
  large = false,
  danger = false,
}: {
  number: string;
  title: string;
  children: ReactNode;
  large?: boolean;
  danger?: boolean;
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

function BackgroundExample({
  config,
}: {
  config: PaletteConfig;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[#09090A]" />

      <div
        className="absolute left-[14px] right-[14px] top-[15px] h-[52px] rounded-[10px]"
        style={{
          background:
            `linear-gradient(90deg,
              ${config.collaboration},
              ${config.collaborationSecondary}
            )`,
        }}
      />

      <div className="absolute bottom-[15px] left-[14px] right-[14px] h-[118px] rounded-[10px] bg-white/[0.035]">
        <div
          className="absolute bottom-[10px] left-[10px] h-[5px] w-[55px] rounded-full"
          style={{
            backgroundColor:
              config.accent,
          }}
        />

        <div
          className="absolute bottom-[10px] left-[72px] h-[5px] w-[28px] rounded-full"
          style={{
            backgroundColor:
              config.accentSecondary,
          }}
        />
      </div>
    </>
  );
}

function HeadlineExample({
  config,
}: {
  config: PaletteConfig;
}) {
  return (
    <div className="absolute inset-[18px]">
      <p className="text-[9px] uppercase tracking-[0.12em] text-white/24">
        Shared headline
      </p>

      <h3 className="mt-[32px] text-[29px] leading-[0.95] tracking-[-0.04em] text-white">
        Feel closer
        <br />
        to the moment.
      </h3>

      <div
        className="mt-[15px] h-[4px] w-[78px] rounded-full"
        style={{
          background:
            `linear-gradient(90deg,
              ${config.collaboration},
              ${config.collaborationSecondary}
            )`,
        }}
      />

      <p className="mt-[13px] text-[9px] leading-[1.4] text-white/31">
        Accent colour supports emphasis, never entire paragraphs.
      </p>
    </div>
  );
}

function OverlayExample({
  config,
}: {
  config: PaletteConfig;
}) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(circle at 80% 20%,
              ${alpha(
                config.collaborationSecondary,
                0.28
              )},
              transparent 45%
            )`,
        }}
      />

      <div className="absolute bottom-[15px] left-[15px] right-[15px] rounded-[11px] border border-white/[0.09] bg-black/60 p-[12px] backdrop-blur-[12px]">
        <div
          className="h-[4px] w-[38px] rounded-full"
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

function CTAExample({
  config,
}: {
  config: PaletteConfig;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="flex items-center gap-[9px] rounded-full px-[18px] py-[10px] text-[10px] text-white"
        style={{
          backgroundColor:
            config.collaboration,
        }}
      >
        <span>
          Explore experience
        </span>

        <span>→</span>
      </div>

      <div
        className="absolute bottom-[28px] h-[4px] w-[38px] rounded-full"
        style={{
          backgroundColor:
            config.accentSecondary,
        }}
      />
    </div>
  );
}

function GraphicsExample({
  config,
}: {
  config: PaletteConfig;
}) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute left-[15%] top-[20%] h-[115px] w-[115px] rounded-full border"
        style={{
          borderColor:
            alpha(
              config.collaboration,
              0.55
            ),
        }}
      />

      <div
        className="absolute left-[33%] top-[29%] h-[85px] w-[145px] rounded-[26px] border"
        style={{
          borderColor:
            alpha(
              config.collaborationSecondary,
              0.6
            ),
        }}
      />

      <div className="absolute bottom-[28px] left-[15%] right-[15%] flex gap-[4px]">
        {[30, 56, 38, 78, 45, 90, 52].map(
          (height, index) => (
            <div
              key={index}
              className="flex-1 rounded-full"
              style={{
                height:
                  `${height}px`,

                backgroundColor:
                  index % 3 === 0
                    ? config.accent
                    : index % 2 === 0
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

function VideoExample({
  config,
}: {
  config: PaletteConfig;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-black" />

      <div
        className="absolute -right-[40px] top-[10px] h-[150px] w-[150px] rounded-full blur-[60px]"
        style={{
          backgroundColor:
            alpha(
              config.collaborationSecondary,
              0.35
            ),
        }}
      />

      <div className="absolute bottom-[18px] left-[18px] right-[18px]">
        <p className="text-[19px] tracking-[-0.025em] text-white/85">
          Live from inside the event
        </p>

        <div className="mt-[8px] flex items-center gap-[6px]">
          <div
            className="h-[5px] w-[35px] rounded-full"
            style={{
              backgroundColor:
                config.collaboration,
            }}
          />

          <div
            className="h-[5px] w-[18px] rounded-full"
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

function ForbiddenExample({
  aPrimary,
  bPrimary,
}: {
  aPrimary: string;
  bPrimary: string;
}) {
  return (
    <>
      <div
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          backgroundColor:
            aPrimary,
        }}
      />

      <div
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          backgroundColor:
            bPrimary,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/70 text-[22px] text-white">
          ×
        </div>
      </div>

      <p className="absolute bottom-[14px] left-[14px] right-[14px] text-center text-[9px] text-white/60">
        Never create two competing large colour territories.
      </p>
    </>
  );
}