"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* CORE PALETTE                                     */
/* ------------------------------------------------ */

const CORE_BLACK = "#000000";
const CORE_WHITE = "#FFFFFF";
const CORE_GREY = "#8A8A8A";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface ModelColourConfig {
  eyebrow: string;
  intro: string;

  leadName: string;
  supportName: string;

  leadColor: string;
  supportColor: string;

  ratioText: string;
  strategy: string;

  backgroundRule: string;
  headlineRule: string;
  overlayRule: string;
  ctaRule: string;
  graphicsRule: string;
  videoRule: string;
  forbiddenRule: string;
}

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

function normalizeHex(
  value: string | undefined,
  fallback: string
) {
  if (!value) {
    return fallback;
  }

  const trimmed =
    value.trim();

  if (
    /^#[0-9A-Fa-f]{6}$/.test(
      trimmed
    )
  ) {
    return trimmed;
  }

  if (
    /^[0-9A-Fa-f]{6}$/.test(
      trimmed
    )
  ) {
    return `#${trimmed}`;
  }

  return fallback;
}

function hexToRgb(
  hex: string
) {
  const safe =
    normalizeHex(
      hex,
      "#000000"
    ).replace("#", "");

  const value =
    parseInt(
      safe,
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
  hex: string,
  opacity: number
) {
  const {
    r,
    g,
    b,
  } = hexToRgb(hex);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ------------------------------------------------ */
/* MODEL CONFIG                                     */
/* ------------------------------------------------ */

function getModelConfig(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string,
  brandAColor: string,
  brandBColor: string
): ModelColourConfig {
  switch (model) {
    /* ================================================= */
    /* A × B                                             */
    /* ================================================= */

    case "axb":
      return {
        eyebrow:
          "Equal collaboration",

        intro:
          "Neither brand owns the shared colour system. Neutral space remains dominant while either brand may provide the leading accent for an individual asset.",

        leadName:
          `${brandAName} or ${brandBName}`,

        supportName:
          "Other partner",

        leadColor:
          brandAColor,

        supportColor:
          brandBColor,

        ratioText:
          "70% neutral · 20% selected lead accent · 10% secondary accent",

        strategy:
          "Alternate which brand leads from asset to asset if needed. Never make both primaries compete at 20% simultaneously.",

        backgroundRule:
          "Neutral backgrounds. Small accent moments from both brands are allowed.",

        headlineRule:
          "Accent one key word using either brand colour — never both in the same headline.",

        overlayRule:
          "Shared neutral UI. Brand markers receive equivalent optical weight.",

        ctaRule:
          "Choose one active accent per screen. The other brand remains neutral.",

        graphicsRule:
          "One series leads in colour; the second accent may identify a secondary data point.",

        videoRule:
          "Lower thirds may carry both identities with balanced placement.",

        forbiddenRule:
          "Avoid 50/50 large colour fields. Equal brand importance does not mean equal coloured surface area.",
      };

    /* ================================================= */
    /* A WITH B                                          */
    /* ================================================= */

    case "aandb":
      return {
        eyebrow:
          `${brandAName}-led collaboration`,

        intro:
          `${brandAName} defines the visual environment. ${brandBName} remains clearly recognisable but participates through smaller accent moments.`,

        leadName:
          brandAName,

        supportName:
          brandBName,

        leadColor:
          brandAColor,

        supportColor:
          brandBColor,

        ratioText:
          `70% neutral · 20% ${brandAName} · 10% ${brandBName}`,

        strategy:
          `${brandAName}'s accent should guide hierarchy, interaction and emphasis. ${brandBName}'s colour validates the partnership without competing for ownership.`,

        backgroundRule:
          `${brandAName} may introduce a restrained colour field or glow. ${brandBName} remains local.`,

        headlineRule:
          `${brandAName}'s colour may highlight key messaging. ${brandBName}'s colour should not compete inside the same headline.`,

        overlayRule:
          `${brandAName} owns the interface language. ${brandBName} appears as partner identification.`,

        ctaRule:
          `Primary actions use ${brandAName}. ${brandBName} should not create a second competing CTA colour.`,

        graphicsRule:
          `${brandAName} highlights the primary data. ${brandBName} may identify partner-specific information.`,

        videoRule:
          `${brandAName} leads the lower-third system; ${brandBName} occupies a secondary partner position.`,

        forbiddenRule:
          `${brandBName} should never visually dominate the collaboration's overall interface or large background surfaces.`,
      };

    /* ================================================= */
    /* B POWERED BY A                                    */
    /* ================================================= */

    case "poweredByA":
      return {
        eyebrow:
          `${brandBName}-owned experience`,

        intro:
          `${brandBName} owns the consumer-facing colour system. ${brandAName} is present only as a restrained technology or production endorsement.`,

        leadName:
          brandBName,

        supportName:
          brandAName,

        leadColor:
          brandBColor,

        supportColor:
          brandAColor,

        ratioText:
          `70% neutral · 20% ${brandBName} · 10% ${brandAName}`,

        strategy:
          `${brandBName}'s accent owns interaction, emphasis and branded surfaces. ${brandAName}'s colour should be limited to credits, technical information or endorsement moments.`,

        backgroundRule:
          `${brandBName} may own the main accent atmosphere. ${brandAName} should never define the environment.`,

        headlineRule:
          `${brandBName}'s colour leads all consumer-facing emphasis. ${brandAName} stays out of editorial headlines.`,

        overlayRule:
          `${brandBName} owns the UI. ${brandAName} appears only inside an endorsement or technology credit.`,

        ctaRule:
          `All primary actions belong to ${brandBName}. ${brandAName} must never own the main CTA.`,

        graphicsRule:
          `${brandBName} owns the active data colour. ${brandAName} remains neutral unless identifying technology.`,

        videoRule:
          `${brandBName} controls lower thirds and bugs. ${brandAName} appears as a small Powered by / Technology by credit.`,

        forbiddenRule:
          `${brandAName}'s primary colour must never become the dominant consumer-facing surface.`,
      };

    /* ================================================= */
    /* A PRESENTS B                                      */
    /* ================================================= */

    case "presentsB":
    default:
      return {
        eyebrow:
          `${brandAName}-owned platform`,

        intro:
          `${brandAName} owns the visual container, interface and navigation. ${brandBName}'s colour may enter the system through the featured content itself.`,

        leadName:
          brandAName,

        supportName:
          brandBName,

        leadColor:
          brandAColor,

        supportColor:
          brandBColor,

        ratioText:
          `70% neutral · 20% ${brandAName} system · 10% ${brandBName} content accent`,

        strategy:
          `Separate platform identity from content identity. ${brandAName} controls the frame; ${brandBName} may colour what lives inside it.`,

        backgroundRule:
          `${brandAName} owns platform backgrounds and navigation surfaces. ${brandBName} colour may exist inside a content window.`,

        headlineRule:
          `${brandAName} styles platform messaging. ${brandBName} may colour titles that refer specifically to its featured content.`,

        overlayRule:
          `${brandAName} owns controls and interface chrome. ${brandBName} colour remains inside content-specific metadata.`,

        ctaRule:
          `Platform CTAs belong to ${brandAName}. ${brandBName} should not redefine navigation behaviour.`,

        graphicsRule:
          `${brandAName} owns system graphics; ${brandBName} may accent content-specific information.`,

        videoRule:
          `${brandAName} defines the lower-third container while ${brandBName} identifies the featured content.`,

        forbiddenRule:
          `${brandBName}'s colour must not take over platform navigation, global UI or the product container.`,
      };
  }
}

/* ------------------------------------------------ */
/* GENERIC CARD                                     */
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
        rounded-[20px]

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

/* ------------------------------------------------ */
/* COLOUR CHIP                                      */
/* ------------------------------------------------ */

function ColourChip({
  label,
  colour,
}: {
  label: string;
  colour: string;
}) {
  return (
    <div
      className="
        flex
        items-center

        gap-[10px]
      "
    >
      <div
        className="
          h-[17px]
          w-[17px]

          shrink-0

          rounded-full

          border
          border-white/10
        "
        style={{
          backgroundColor:
            colour,
        }}
      />

      <div
        className="
          min-w-0
        "
      >
        <p
          className="
            truncate

            text-[12px]

            text-white/68
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[1px]

            text-[8px]

            text-white/22
          "
        >
          {colour.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* EXAMPLE CARD                                     */
/* ------------------------------------------------ */

function ExampleCard({
  number,
  title,
  rule,
  children,
}: {
  number: string;
  title: string;
  rule: string;
  children: ReactNode;
}) {
  return (
    <Card
      className="
        grid

        grid-cols-[104px_minmax(0,1fr)]

        gap-[12px]

        p-[12px]
      "
    >
      <div
        className="
          flex
          flex-col
          justify-center
        "
      >
        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.15em]

            text-white/20
          "
        >
          {number}
        </p>

        <h3
          className="
            mt-[5px]

            text-[14px]
            leading-none

            text-white/80

            oook-medium
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-[7px]

            h-px
            w-[38px]

            bg-white/12
          "
        />

        <p
          className="
            mt-[7px]

            text-[8px]
            leading-[1.3]

            text-white/29
          "
        >
          {rule}
        </p>
      </div>

      <div
        className="
          relative

          h-[128px]

          overflow-hidden

          rounded-[14px]

          border
          border-white/[0.07]

          bg-[#070708]
        "
      >
        {/* SOFT LIGHT */}

        <div
          className="
            pointer-events-none

            absolute

            -right-[20%]
            -top-[35%]

            h-[90%]
            w-[70%]

            rounded-full

            bg-white/[0.04]

            blur-[40px]
          "
        />

        {/* NOISE */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.07]

            mix-blend-screen

            [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0px,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_3px)]
          "
        />

        {children}
      </div>
    </Card>
  );
}

/* ------------------------------------------------ */
/* RATIO                                            */
/* ------------------------------------------------ */

function RatioBar({
  model,
  brandAName,
  brandBName,
  brandAColor,
  brandBColor,
  leadColor,
  supportColor,
}: {
  model: PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;

  leadColor: string;
  supportColor: string;
}) {
  /*
    Equal collaboration gets two valid
    examples because either brand may lead.
  */

  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          mt-[13px]

          space-y-[11px]
        "
      >
        <RatioVariant
          label={`${brandAName} leads this asset`}
          lead={brandAColor}
          support={brandBColor}
        />

        <RatioVariant
          label={`${brandBName} leads this asset`}
          lead={brandBColor}
          support={brandAColor}
        />
      </div>
    );
  }

  return (
    <div
      className="
        mt-[13px]
      "
    >
      <RatioVariant
        label="Recommended balance"
        lead={leadColor}
        support={supportColor}
      />
    </div>
  );
}

function RatioVariant({
  label,
  lead,
  support,
}: {
  label: string;
  lead: string;
  support: string;
}) {
  return (
    <div>
      <p
        className="
          mb-[5px]

          text-[8px]

          text-white/27
        "
      >
        {label}
      </p>

      <div
        className="
          flex

          h-[10px]

          overflow-hidden

          rounded-full

          border
          border-white/[0.06]
        "
      >
        <div
          className="
            w-[70%]

            bg-white/[0.08]
          "
        />

        <div
          className="
            w-[20%]
          "
          style={{
            backgroundColor:
              lead,
          }}
        />

        <div
          className="
            w-[10%]
          "
          style={{
            backgroundColor:
              support,
          }}
        />
      </div>
    </div>
  );
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

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  const brandAColor =
    normalizeHex(
      brandA.primaryColor,
      "#FF453A"
    );

  const brandBColor =
    normalizeHex(
      brandB.primaryColor,
      "#3478F6"
    );

  const config =
    getModelConfig(
      model,
      brandAName,
      brandBName,
      brandAColor,
      brandBColor
    );

  return (
    <GuidelinePage>
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <header
        className="
          absolute

          left-[70px]
          right-[70px]
          top-[54px]

          flex
          items-start
          justify-between
        "
      >
        <div
          className="
            max-w-[940px]
          "
        >
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.18em]

              text-white/25
            "
          >
            08 / Shared visual territory
          </p>

          <h1
            className="
              mt-[13px]

              whitespace-nowrap

              text-[50px]
              leading-none
              tracking-[-0.045em]

              text-white

              oook-semibold
            "
          >
            Shared visual territory — colour
          </h1>

          <p
            className="
              mt-[12px]

              max-w-[760px]

              text-[14px]
              leading-[1.4]

              text-white/38
            "
          >
            {config.intro}
          </p>
        </div>

        {/* MODEL TAG */}

        <div
          className="
            mt-[2px]

            text-right
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.16em]

              text-white/20
            "
          >
            Colour model
          </p>

          <p
            className="
              mt-[5px]

              text-[15px]

              text-white/48

              oook-medium
            "
          >
            {config.eyebrow}
          </p>
        </div>
      </header>

      {/* ================================================= */}
      {/* LEFT SYSTEM                                       */}
      {/* ================================================= */}

      <aside
        className="
          absolute

          left-[70px]
          top-[196px]

          w-[374px]
        "
      >
        {/* CORE PALETTE */}

        <Card
          className="
            p-[17px]
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.17em]

              text-white/23
            "
          >
            Core collaboration palette
          </p>

          <div
            className="
              mt-[14px]

              grid
              grid-cols-3

              gap-[10px]
            "
          >
            <ColourChip
              label="Black"
              colour={CORE_BLACK}
            />

            <ColourChip
              label="White"
              colour={CORE_WHITE}
            />

            <ColourChip
              label="Neutral"
              colour={CORE_GREY}
            />
          </div>

          <div
            className="
              my-[15px]

              h-px

              bg-white/[0.06]
            "
          />

          <div
            className="
              grid
              grid-cols-2

              gap-[12px]
            "
          >
            <div>
              <p
                className="
                  mb-[7px]

                  text-[7px]
                  uppercase
                  tracking-[0.15em]

                  text-white/20
                "
              >
                Brand A accent
              </p>

              <ColourChip
                label={brandAName}
                colour={brandAColor}
              />
            </div>

            <div>
              <p
                className="
                  mb-[7px]

                  text-[7px]
                  uppercase
                  tracking-[0.15em]

                  text-white/20
                "
              >
                Brand B accent
              </p>

              <ColourChip
                label={brandBName}
                colour={brandBColor}
              />
            </div>
          </div>
        </Card>

        {/* BALANCE */}

        <Card
          className="
            mt-[13px]

            p-[17px]
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.17em]

              text-white/23
            "
          >
            Colour hierarchy
          </p>

          <RatioBar
            model={model}
            brandAName={brandAName}
            brandBName={brandBName}
            brandAColor={brandAColor}
            brandBColor={brandBColor}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
          />

          <p
            className="
              mt-[12px]

              text-[10px]
              leading-[1.38]

              text-white/37
            "
          >
            {config.ratioText}
          </p>

          <p
            className="
              mt-[9px]

              text-[11px]
              leading-[1.4]

              text-white/54
            "
          >
            {config.strategy}
          </p>
        </Card>

        {/* RULE */}

        <Card
          className="
            mt-[13px]

            p-[17px]
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.17em]

              text-white/23
            "
          >
            Universal restriction
          </p>

          <p
            className="
              mt-[9px]

              text-[13px]
              leading-[1.35]

              text-white/78
            "
          >
            Never use both primary brand colours
            simultaneously across large surfaces.
          </p>
        </Card>
      </aside>

      {/* ================================================= */}
      {/* APPLICATIONS                                      */}
      {/* ================================================= */}

      <main
        className="
          absolute

          left-[470px]
          right-[70px]
          top-[196px]
          bottom-[64px]

          grid
          grid-cols-2
          grid-rows-3

          gap-[11px]
        "
      >
        {/* ================================================= */}
        {/* 01 BACKGROUNDS                                    */}
        {/* ================================================= */}

        <ExampleCard
          number="01"
          title="Backgrounds"
          rule={config.backgroundRule}
        >
          <BackgroundExample
            model={model}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 02 HEADLINES                                      */}
        {/* ================================================= */}

        <ExampleCard
          number="02"
          title="Headlines"
          rule={config.headlineRule}
        >
          <HeadlineExample
            model={model}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 03 OVERLAYS                                       */}
        {/* ================================================= */}

        <ExampleCard
          number="03"
          title="Overlays"
          rule={config.overlayRule}
        >
          <OverlayExample
            model={model}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
            brandAName={brandAName}
            brandBName={brandBName}
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 04 CTA                                            */}
        {/* ================================================= */}

        <ExampleCard
          number="04"
          title="CTA"
          rule={config.ctaRule}
        >
          <CTAExample
            model={model}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 05 GRAPHICS                                       */}
        {/* ================================================= */}

        <ExampleCard
          number="05"
          title="Graphics"
          rule={config.graphicsRule}
        >
          <GraphicsExample
            model={model}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 06 VIDEO                                          */}
        {/* ================================================= */}

        <ExampleCard
          number="06"
          title="Video"
          rule={config.videoRule}
        >
          <VideoExample
            model={model}
            leadColor={config.leadColor}
            supportColor={config.supportColor}
            brandAName={brandAName}
            brandBName={brandBName}
          />
        </ExampleCard>
      </main>

      {/* ================================================= */}
      {/* PROHIBITED                                        */}
      {/* ================================================= */}

      <div
        className="
          absolute

          bottom-[30px]
          left-[70px]
          right-[70px]

          flex
          items-center

          gap-[16px]

          border-t
          border-white/[0.06]

          pt-[11px]
        "
      >
        <p
          className="
            shrink-0

            text-[8px]
            uppercase
            tracking-[0.16em]

            text-white/23
          "
        >
          Do not
        </p>

        <ForbiddenPreview
          model={model}
          brandAColor={brandAColor}
          brandBColor={brandBColor}
        />

        <p
          className="
            flex-1

            text-[9px]
            leading-[1.35]

            text-white/28
          "
        >
          {config.forbiddenRule}
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* BACKGROUND EXAMPLE                               */
/* ------------------------------------------------ */

function BackgroundExample({
  model,
  leadColor,
  supportColor,
}: {
  model: PartnershipModelId;
  leadColor: string;
  supportColor: string;
}) {
  if (
    model === "axb"
  ) {
    return (
      <>
        <div
          className="
            absolute
            inset-[12px]

            rounded-[12px]

            bg-white/[0.025]
          "
        />

        <div
          className="
            absolute

            bottom-[12px]
            left-[12px]
            right-[12px]

            flex
            gap-[5px]
          "
        >
          <div
            className="
              h-[4px]
              flex-1

              rounded-full
            "
            style={{
              backgroundColor:
                leadColor,
            }}
          />

          <div
            className="
              h-[4px]
              w-[18%]

              rounded-full
            "
            style={{
              backgroundColor:
                supportColor,
            }}
          />
        </div>
      </>
    );
  }

  if (
    model === "presentsB"
  ) {
    return (
      <>
        {/* PLATFORM */}

        <div
          className="
            absolute
            inset-[11px]

            rounded-[12px]

            border
            border-white/[0.06]

            bg-white/[0.025]
          "
        >
          <div
            className="
              h-[8px]
              rounded-t-[12px]
            "
            style={{
              backgroundColor:
                alpha(
                  leadColor,
                  0.85
                ),
            }}
          />

          {/* CONTENT WINDOW */}

          <div
            className="
              absolute

              bottom-[12px]
              left-[14px]
              right-[14px]
              top-[22px]

              rounded-[9px]

              border
              border-white/[0.05]

              bg-black/45
            "
          >
            <div
              className="
                absolute

                bottom-[8px]
                right-[8px]

                h-[5px]
                w-[28%]

                rounded-full
              "
              style={{
                backgroundColor:
                  supportColor,
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="
          absolute
          inset-[12px]

          overflow-hidden

          rounded-[12px]

          bg-white/[0.025]
        "
      >
        <div
          className="
            absolute

            -bottom-[50%]
            -right-[15%]

            h-[140%]
            w-[60%]

            rounded-full

            blur-[30px]
          "
          style={{
            backgroundColor:
              alpha(
                leadColor,
                0.28
              ),
          }}
        />

        <div
          className="
            absolute

            right-[10px]
            top-[10px]

            h-[5px]
            w-[16%]

            rounded-full
          "
          style={{
            backgroundColor:
              supportColor,
          }}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* HEADLINE EXAMPLE                                 */
/* ------------------------------------------------ */

function HeadlineExample({
  model,
  leadColor,
  supportColor,
}: {
  model: PartnershipModelId;
  leadColor: string;
  supportColor: string;
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
          w-[82%]
        "
      >
        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.16em]

            text-white/22
          "
        >
          Headline
        </p>

        <p
          className="
            mt-[8px]

            text-[21px]
            leading-[1.03]
            tracking-[-0.035em]

            text-white/88
          "
        >
          A shared{" "}
          <span
            style={{
              color:
                leadColor,
            }}
          >
            immersive
          </span>
          <br />
          experience
        </p>

        {model === "axb" && (
          <p
            className="
              mt-[6px]

              text-[7px]

              text-white/24
            "
          >
            or{" "}
            <span
              style={{
                color:
                  supportColor,
              }}
            >
              invert the accent
            </span>{" "}
            on another asset
          </p>
        )}

        {model === "presentsB" && (
          <div
            className="
              mt-[7px]

              inline-flex

              rounded-full

              border
              border-white/[0.07]

              px-[7px]
              py-[3px]

              text-[6px]

              text-white/28
            "
          >
            Content title may use{" "}
            <span
              className="
                ml-[3px]
              "
              style={{
                color:
                  supportColor,
              }}
            >
              partner accent
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* OVERLAY EXAMPLE                                  */
/* ------------------------------------------------ */

function OverlayExample({
  model,
  leadColor,
  supportColor,
  brandAName,
  brandBName,
}: {
  model: PartnershipModelId;

  leadColor: string;
  supportColor: string;

  brandAName: string;
  brandBName: string;
}) {
  return (
    <div
      className="
        absolute

        bottom-[12px]
        left-[12px]
        right-[12px]

        rounded-[12px]

        border
        border-white/[0.08]

        bg-black/42

        px-[11px]
        py-[9px]

        backdrop-blur-[12px]
      "
    >
      <div
        className="
          flex
          items-center

          gap-[8px]
        "
      >
        <div
          className="
            h-[20px]
            w-[2px]

            rounded-full
          "
          style={{
            backgroundColor:
              leadColor,
          }}
        />

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              text-[6px]
              uppercase
              tracking-[0.13em]

              text-white/22
            "
          >
            {model === "poweredByA"
              ? `${brandBName} interface`
              : model === "presentsB"
                ? `${brandAName} platform`
                : "Shared interface"}
          </p>

          <p
            className="
              mt-[2px]

              truncate

              text-[9px]

              text-white/67
            "
          >
            Contextual information
          </p>
        </div>

        {model === "axb" && (
          <div
            className="
              h-[7px]
              w-[7px]

              rounded-full
            "
            style={{
              backgroundColor:
                supportColor,
            }}
          />
        )}

        {model === "aandb" && (
          <div
            className="
              rounded-full

              border
              border-white/[0.08]

              px-[6px]
              py-[3px]

              text-[5px]
              text-white/30
            "
          >
            {brandBName}
          </div>
        )}

        {model === "poweredByA" && (
          <div
            className="
              flex
              items-center
              gap-[3px]

              text-[5px]
              uppercase
              tracking-[0.1em]

              text-white/24
            "
          >
            Powered by

            <span
              className="
                h-[5px]
                w-[5px]

                rounded-full
              "
              style={{
                backgroundColor:
                  supportColor,
              }}
            />
          </div>
        )}

        {model === "presentsB" && (
          <div
            className="
              flex
              items-center
              gap-[4px]
            "
          >
            <span
              className="
                text-[5px]

                text-white/20
              "
            >
              content
            </span>

            <div
              className="
                h-[6px]
                w-[18px]

                rounded-full
              "
              style={{
                backgroundColor:
                  supportColor,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* CTA EXAMPLE                                      */
/* ------------------------------------------------ */

function CTAExample({
  model,
  leadColor,
  supportColor,
}: {
  model: PartnershipModelId;

  leadColor: string;
  supportColor: string;
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

          gap-[8px]
        "
      >
        <div
          className="
            rounded-full

            px-[14px]
            py-[8px]

            text-[8px]
            font-medium

            text-black
          "
          style={{
            backgroundColor:
              leadColor,
          }}
        >
          Primary CTA
        </div>

        <div
          className="
            rounded-full

            border
            border-white/[0.11]

            bg-white/[0.025]

            px-[13px]
            py-[8px]

            text-[8px]

            text-white/58
          "
        >
          Secondary
        </div>

        {model === "axb" && (
          <div
            className="
              h-[7px]
              w-[7px]

              rounded-full
            "
            style={{
              backgroundColor:
                supportColor,
            }}
            title="Partner accent"
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* GRAPHICS EXAMPLE                                 */
/* ------------------------------------------------ */

function GraphicsExample({
  model,
  leadColor,
  supportColor,
}: {
  model: PartnershipModelId;

  leadColor: string;
  supportColor: string;
}) {
  const bars = [
    38,
    55,
    44,
    72,
    86,
  ];

  return (
    <div
      className="
        absolute

        bottom-[14px]
        left-[18px]
        right-[18px]
        top-[14px]

        flex
        items-end
        justify-between
      "
    >
      {bars.map(
        (
          height,
          index
        ) => {
          let colour =
            "rgba(255,255,255,0.12)";

          if (
            index === 4
          ) {
            colour =
              leadColor;
          }

          if (
            model === "axb" &&
            index === 2
          ) {
            colour =
              supportColor;
          }

          if (
            model === "aandb" &&
            index === 1
          ) {
            colour =
              alpha(
                supportColor,
                0.55
              );
          }

          if (
            model === "presentsB" &&
            index === 2
          ) {
            colour =
              supportColor;
          }

          return (
            <div
              key={index}
              className="
                w-[23px]

                rounded-t-[6px]
              "
              style={{
                height:
                  `${height}px`,

                backgroundColor:
                  colour,
              }}
            />
          );
        }
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* VIDEO EXAMPLE                                    */
/* ------------------------------------------------ */

function VideoExample({
  model,
  leadColor,
  supportColor,
  brandAName,
  brandBName,
}: {
  model: PartnershipModelId;

  leadColor: string;
  supportColor: string;

  brandAName: string;
  brandBName: string;
}) {
  return (
    <>
      {/* CONTENT IMAGE */}

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_62%_24%,rgba(255,255,255,0.07),transparent_28%),linear-gradient(145deg,#171719,#050506)]
        "
      />

      {/* LOWER THIRD */}

      <div
        className="
          absolute

          bottom-[10px]
          left-[10px]
          right-[10px]

          flex
          items-center

          rounded-[11px]

          border
          border-white/[0.07]

          bg-black/42

          px-[10px]
          py-[7px]

          backdrop-blur-[10px]
        "
      >
        {model === "axb" && (
          <>
            <div
              className="
                h-[5px]
                w-[18px]

                rounded-full
              "
              style={{
                backgroundColor:
                  leadColor,
              }}
            />

            <div
              className="
                mx-[7px]

                h-[16px]
                w-px

                bg-white/10
              "
            />

            <span
              className="
                text-[6px]

                text-white/50
              "
            >
              Headline
            </span>

            <div
              className="
                ml-auto

                h-[5px]
                w-[18px]

                rounded-full
              "
              style={{
                backgroundColor:
                  supportColor,
              }}
            />
          </>
        )}

        {model === "aandb" && (
          <>
            <div
              className="
                h-[5px]
                w-[26px]

                rounded-full
              "
              style={{
                backgroundColor:
                  leadColor,
              }}
            />

            <span
              className="
                ml-[7px]

                text-[6px]

                text-white/48
              "
            >
              Headline
            </span>

            <div
              className="
                ml-auto

                flex
                items-center

                gap-[4px]
              "
            >
              <span
                className="
                  text-[5px]

                  text-white/20
                "
              >
                with
              </span>

              <div
                className="
                  h-[5px]
                  w-[12px]

                  rounded-full
                "
                style={{
                  backgroundColor:
                    supportColor,
                }}
              />
            </div>
          </>
        )}

        {model === "poweredByA" && (
          <>
            <div
              className="
                h-[5px]
                w-[28px]

                rounded-full
              "
              style={{
                backgroundColor:
                  leadColor,
              }}
            />

            <span
              className="
                ml-[7px]

                text-[6px]

                text-white/48
              "
            >
              {brandBName}
            </span>

            <div
              className="
                ml-auto

                flex
                items-center

                gap-[4px]

                text-[5px]
                uppercase
                tracking-[0.1em]

                text-white/18
              "
            >
              Powered by

              <div
                className="
                  h-[4px]
                  w-[9px]

                  rounded-full
                "
                style={{
                  backgroundColor:
                    supportColor,
                }}
              />
            </div>
          </>
        )}

        {model === "presentsB" && (
          <>
            {/* PLATFORM MARKER */}

            <div
              className="
                h-[5px]
                w-[20px]

                rounded-full
              "
              style={{
                backgroundColor:
                  leadColor,
              }}
            />

            <span
              className="
                ml-[7px]

                text-[6px]

                text-white/46
              "
            >
              {brandAName} player
            </span>

            <div
              className="
                ml-auto

                flex
                items-center

                gap-[5px]
              "
            >
              <span
                className="
                  text-[5px]

                  text-white/18
                "
              >
                featuring
              </span>

              <div
                className="
                  h-[5px]
                  w-[18px]

                  rounded-full
                "
                style={{
                  backgroundColor:
                    supportColor,
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* FORBIDDEN PREVIEW                                */
/* ------------------------------------------------ */

function ForbiddenPreview({
  model,
  brandAColor,
  brandBColor,
}: {
  model: PartnershipModelId;

  brandAColor: string;
  brandBColor: string;
}) {
  /* A × B — avoid equal colour split */

  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          flex

          h-[24px]
          w-[100px]

          overflow-hidden

          rounded-[6px]

          border
          border-white/[0.07]
        "
      >
        <div
          className="
            w-1/2
          "
          style={{
            backgroundColor:
              brandAColor,
          }}
        />

        <div
          className="
            w-1/2
          "
          style={{
            backgroundColor:
              brandBColor,
          }}
        />
      </div>
    );
  }

  /* A WITH B — B should not dominate */

  if (
    model === "aandb"
  ) {
    return (
      <div
        className="
          relative

          h-[24px]
          w-[100px]

          overflow-hidden

          rounded-[6px]
        "
        style={{
          backgroundColor:
            brandBColor,
        }}
      >
        <div
          className="
            absolute

            bottom-[4px]
            left-[4px]

            h-[4px]
            w-[15px]

            rounded-full
          "
          style={{
            backgroundColor:
              brandAColor,
          }}
        />
      </div>
    );
  }

  /* POWERED — A should never own surface */

  if (
    model === "poweredByA"
  ) {
    return (
      <div
        className="
          relative

          h-[24px]
          w-[100px]

          overflow-hidden

          rounded-[6px]
        "
        style={{
          backgroundColor:
            brandAColor,
        }}
      >
        <div
          className="
            absolute

            bottom-[4px]
            right-[4px]

            h-[4px]
            w-[15px]

            rounded-full
          "
          style={{
            backgroundColor:
              brandBColor,
          }}
        />
      </div>
    );
  }

  /* PRESENTS — B must not own interface chrome */

  return (
    <div
      className="
        relative

        h-[24px]
        w-[100px]

        overflow-hidden

        rounded-[6px]

        border
        border-white/[0.07]

        bg-black
      "
    >
      <div
        className="
          absolute

          inset-x-0
          top-0

          h-[7px]
        "
        style={{
          backgroundColor:
            brandBColor,
        }}
      />

      <div
        className="
          absolute

          inset-x-0
          bottom-0

          h-[7px]
        "
        style={{
          backgroundColor:
            brandBColor,
        }}
      />

      <div
        className="
          absolute

          left-[5px]
          top-[10px]

          h-[4px]
          w-[18px]

          rounded-full
        "
        style={{
          backgroundColor:
            brandAColor,
        }}
      />
    </div>
  );
}