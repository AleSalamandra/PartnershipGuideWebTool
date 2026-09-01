"use client";

import type {
  CSSProperties,
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* DEFAULT TYPOGRAPHY                               */
/* ------------------------------------------------ */

const DEFAULT_COMMON_FONT =
  '"oook-variable", sans-serif';

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface TypographyConfig {
  eyebrow: string;
  intro: string;

  commonShare: number;
  brandAShare: number;
  brandBShare: number;

  headlineFont:
    | "common"
    | "brandA"
    | "brandB";

  systemFont:
    | "common"
    | "brandA"
    | "brandB";

  contentFont:
    | "common"
    | "brandA"
    | "brandB";

  headlineRule: string;
  bodyRule: string;
  uiRule: string;
  ctaRule: string;
  videoRule: string;
  contentRule: string;
  forbiddenRule: string;
}

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

function resolveCommonFont(
  store: unknown
) {
  const state =
    store as {
      commonFontFamily?: unknown;
      sharedFontFamily?: unknown;
      commonTypography?: unknown;

      typography?: {
        commonFontFamily?: unknown;
      };
    };

  const candidates = [
    state.commonFontFamily,
    state.sharedFontFamily,
    state.commonTypography,
    state.typography
      ?.commonFontFamily,
  ];

  const match =
    candidates.find(
      (value) =>
        typeof value === "string" &&
        value.trim().length > 0
    );

  return typeof match === "string"
    ? match
    : DEFAULT_COMMON_FONT;
}

function cleanFontName(
  value: string
) {
  return value
    .replace(/["']/g, "")
    .split(",")[0]
    .trim();
}

function getFont(
  role:
    | "common"
    | "brandA"
    | "brandB",

  commonFont: string,
  brandAFont: string,
  brandBFont: string
) {
  if (role === "brandA") {
    return brandAFont;
  }

  if (role === "brandB") {
    return brandBFont;
  }

  return commonFont;
}

/* ------------------------------------------------ */
/* MODEL CONFIG                                     */
/* ------------------------------------------------ */

function getTypographyConfig(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): TypographyConfig {
  switch (model) {
    /* ================================================= */
    /* A × B                                             */
    /* ================================================= */

    case "axb":
      return {
        eyebrow:
          "Equal collaboration",

        intro:
          "The shared type system should feel neutral first. Both brand typefaces may appear, but neither should dominate the complete experience.",

        commonShare: 70,
        brandAShare: 15,
        brandBShare: 15,

        headlineFont:
          "common",

        systemFont:
          "common",

        contentFont:
          "common",

        headlineRule:
          "Use the common typeface for shared messaging. Brand typography may take over a complete headline in clearly branded moments.",

        bodyRule:
          "Body copy, captions and long-form information should remain in the common typeface.",

        uiRule:
          "Navigation, metadata and interface labels always use the common typography.",

        ctaRule:
          "CTA typography remains common and neutral, regardless of which brand colour is leading the action.",

        videoRule:
          "Shared lower thirds use common typography. Brand fonts may appear in isolated brand identifiers.",

        contentRule:
          `${brandAName} and ${brandBName} may each use their own typography in separate brand-owned moments, never inside the same text block.`,

        forbiddenRule:
          "Do not construct split headlines where words alternate between Brand A and Brand B typefaces.",
      };

    /* ================================================= */
    /* A WITH B                                          */
    /* ================================================= */

    case "aandb":
      return {
        eyebrow:
          `${brandAName}-led typography`,

        intro:
          `${brandAName} provides the expressive typographic voice. The common font structures the experience while ${brandBName} typography remains a supporting signature.`,

        commonShare: 60,
        brandAShare: 30,
        brandBShare: 10,

        headlineFont:
          "brandA",

        systemFont:
          "common",

        contentFont:
          "brandA",

        headlineRule:
          `${brandAName} typography may lead hero headlines and campaign-level messaging.`,

        bodyRule:
          "Body copy returns to the common typography to keep the collaboration coherent and readable.",

        uiRule:
          "UI, navigation, metadata and utility information remain in the common typography.",

        ctaRule:
          `${brandAName} may influence headline expression, but CTA labels should remain in the common interface typeface.`,

        videoRule:
          `${brandAName} may lead title cards. Lower-third information remains common, with ${brandBName} used only as partner identification.`,

        contentRule:
          `${brandBName} typography is permitted in explicitly partner-owned labels or content moments, not as the primary system voice.`,

        forbiddenRule:
          `${brandBName} typography must not become the dominant headline or interface language of the collaboration.`,
      };

    /* ================================================= */
    /* B POWERED BY A                                    */
    /* ================================================= */

    case "poweredByA":
      return {
        eyebrow:
          `${brandBName}-owned typography`,

        intro:
          `${brandBName} owns the consumer-facing typographic expression. ${brandAName} typography is restricted to technology endorsement and production credits.`,

        commonShare: 55,
        brandAShare: 10,
        brandBShare: 35,

        headlineFont:
          "brandB",

        systemFont:
          "common",

        contentFont:
          "brandB",

        headlineRule:
          `${brandBName} typography owns hero messaging, editorial titles and expressive consumer-facing moments.`,

        bodyRule:
          "Body copy may use the common typography to maintain accessibility and system consistency.",

        uiRule:
          `UI should use either the common typeface or ${brandBName}'s system typeface. ${brandAName} typography should not enter navigation.`,

        ctaRule:
          `${brandBName} owns the branded action language. Utility CTA labels may remain common.`,

        videoRule:
          `${brandBName} controls titles and lower thirds. ${brandAName} appears only inside small Powered by or Technology by credits.`,

        contentRule:
          `${brandAName} typography is an endorsement device, not a second consumer-facing voice.`,

        forbiddenRule:
          `${brandAName} typography must never become the hero headline, navigation language or dominant editorial voice.`,
      };

    /* ================================================= */
    /* A PRESENTS B                                      */
    /* ================================================= */

    case "presentsB":
    default:
      return {
        eyebrow:
          `${brandAName} platform / ${brandBName} content`,

        intro:
          `${brandAName} owns the typographic container and platform language. ${brandBName} may introduce its own typography inside featured content.`,

        commonShare: 55,
        brandAShare: 25,
        brandBShare: 20,

        headlineFont:
          "brandA",

        systemFont:
          "common",

        contentFont:
          "brandB",

        headlineRule:
          `${brandAName} typography leads platform headlines. ${brandBName} typography may lead titles referring specifically to featured content.`,

        bodyRule:
          "Shared descriptions, metadata and explanatory copy remain in the common typography.",

        uiRule:
          `${brandAName} and the common typeface own navigation and interface structure. ${brandBName} typography stays out of global UI.`,

        ctaRule:
          `Platform CTA labels remain common. ${brandBName} may use its typography only inside content-specific promotional material.`,

        videoRule:
          `${brandAName} owns the player and information container. ${brandBName} typography may appear inside the title or content layer.`,

        contentRule:
          "The typographic boundary should make it obvious what belongs to the platform and what belongs to the featured content.",

        forbiddenRule:
          `${brandBName} typography must not replace the platform typeface in navigation, global UI or persistent controls.`,
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
/* FONT SAMPLE                                      */
/* ------------------------------------------------ */

function FontSample({
  label,
  owner,
  fontFamily,
}: {
  label: string;
  owner: string;
  fontFamily: string;
}) {
  return (
    <div
      className="
        rounded-[15px]

        border
        border-white/[0.06]

        bg-black/20

        p-[12px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          gap-[10px]
        "
      >
        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.15em]

            text-white/22
          "
        >
          {label}
        </p>

        <p
          className="
            max-w-[110px]

            truncate

            text-[7px]
            text-white/20
          "
        >
          {cleanFontName(
            fontFamily
          )}
        </p>
      </div>

      <p
        className="
          mt-[10px]

          truncate

          text-[24px]
          leading-none

          text-white/82
        "
        style={{
          fontFamily,
        }}
      >
        Aa
      </p>

      <p
        className="
          mt-[7px]

          truncate

          text-[10px]

          text-white/38
        "
        style={{
          fontFamily,
        }}
      >
        {owner}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* TYPOGRAPHY RATIO                                 */
/* ------------------------------------------------ */

function TypographyRatio({
  config,
}: {
  config:
    TypographyConfig;
}) {
  return (
    <div>
      <div
        className="
          flex

          h-[11px]

          overflow-hidden

          rounded-full

          border
          border-white/[0.06]
        "
      >
        {/* COMMON */}

        <div
          style={{
            width:
              `${config.commonShare}%`,
          }}
          className="
            bg-white/[0.16]
          "
        />

        {/* BRAND A */}

        <div
          style={{
            width:
              `${config.brandAShare}%`,
          }}
          className="
            bg-white/[0.38]
          "
        />

        {/* BRAND B */}

        <div
          style={{
            width:
              `${config.brandBShare}%`,
          }}
          className="
            bg-white/[0.68]
          "
        />
      </div>

      <div
        className="
          mt-[8px]

          grid
          grid-cols-3

          gap-[8px]
        "
      >
        <RatioLabel
          value={
            config.commonShare
          }
          label="Common"
        />

        <RatioLabel
          value={
            config.brandAShare
          }
          label="Brand A"
        />

        <RatioLabel
          value={
            config.brandBShare
          }
          label="Brand B"
        />
      </div>
    </div>
  );
}

function RatioLabel({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div>
      <p
        className="
          text-[13px]

          text-white/68

          oook-medium
        "
      >
        {value}%
      </p>

      <p
        className="
          mt-[2px]

          text-[7px]
          uppercase
          tracking-[0.13em]

          text-white/20
        "
      >
        {label}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* RULE                                              */
/* ------------------------------------------------ */

function RuleRow({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div
      className="
        border-t
        border-white/[0.055]

        py-[9px]

        first:border-t-0
        first:pt-0
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.15em]

          text-white/22
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[4px]

          text-[10px]
          leading-[1.35]

          text-white/48
        "
      >
        {text}
      </p>
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

        grid-cols-[112px_minmax(0,1fr)]

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

            text-[15px]
            leading-none

            text-white/82

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

            text-white/30
          "
        >
          {rule}
        </p>
      </div>

      <MiniFrame>
        {children}
      </MiniFrame>
    </Card>
  );
}

/* ------------------------------------------------ */
/* MINI FRAME                                       */
/* ------------------------------------------------ */

function MiniFrame({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <div
      className="
        relative

        h-[132px]

        overflow-hidden

        rounded-[14px]

        border
        border-white/[0.07]

        bg-[#070708]
      "
    >
      {/* LIGHT */}

      <div
        className="
          pointer-events-none

          absolute

          -right-[22%]
          -top-[35%]

          h-[95%]
          w-[72%]

          rounded-full

          bg-white/[0.04]

          blur-[42px]
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
  );
}

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page09() {
  const store =
    useGuidelineStore();

  const {
    partnershipModel,
    brandA,
    brandB,
  } = store;

  const model =
    partnershipModel as PartnershipModelId;

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  /* ---------------------------------------------- */
  /* FONTS                                          */
  /* ---------------------------------------------- */

  const commonFont =
    resolveCommonFont(
      store
    );

  const brandAFont =
    brandA.fontFamily?.trim() ||
    commonFont;

  const brandBFont =
    brandB.fontFamily?.trim() ||
    commonFont;

  const config =
    getTypographyConfig(
      model,
      brandAName,
      brandBName
    );

  const headlineFont =
    getFont(
      config.headlineFont,
      commonFont,
      brandAFont,
      brandBFont
    );

  const systemFont =
    getFont(
      config.systemFont,
      commonFont,
      brandAFont,
      brandBFont
    );

  const contentFont =
    getFont(
      config.contentFont,
      commonFont,
      brandAFont,
      brandBFont
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
            max-w-[990px]
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
            09 / Shared visual territory
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
            Shared visual territory — typography
          </h1>

          <p
            className="
              mt-[12px]

              max-w-[790px]

              text-[14px]
              leading-[1.4]

              text-white/38
            "
          >
            {config.intro}
          </p>
        </div>

        {/* MODEL */}

        <div
          className="
            mt-[2px]

            max-w-[260px]

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
            Typography model
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
      {/* LEFT — TYPOGRAPHIC SYSTEM                          */}
      {/* ================================================= */}

      <aside
        className="
          absolute

          left-[70px]
          top-[196px]

          w-[390px]
        "
      >
        {/* -------------------------------------------- */}
        {/* FONT FAMILIES                                */}
        {/* -------------------------------------------- */}

        <Card
          className="
            p-[16px]
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
            Typeface palette
          </p>

          <div
            className="
              mt-[13px]

              grid
              grid-cols-3

              gap-[8px]
            "
          >
            <FontSample
              label="Common"
              owner="Shared system"
              fontFamily={
                commonFont
              }
            />

            <FontSample
              label="Brand A"
              owner={brandAName}
              fontFamily={
                brandAFont
              }
            />

            <FontSample
              label="Brand B"
              owner={brandBName}
              fontFamily={
                brandBFont
              }
            />
          </div>
        </Card>

        {/* -------------------------------------------- */}
        {/* BALANCE                                      */}
        {/* -------------------------------------------- */}

        <Card
          className="
            mt-[12px]

            p-[16px]
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
            Recommended presence
          </p>

          <div
            className="
              mt-[13px]
            "
          >
            <TypographyRatio
              config={config}
            />
          </div>

          <p
            className="
              mt-[12px]

              text-[10px]
              leading-[1.38]

              text-white/34
            "
          >
            Percentages describe overall
            typographic presence across the
            experience — not the composition
            of every individual screen.
          </p>
        </Card>

        {/* -------------------------------------------- */}
        {/* GLOBAL RULES                                 */}
        {/* -------------------------------------------- */}

        <Card
          className="
            mt-[12px]

            p-[16px]
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
            Shared rules
          </p>

          <div
            className="
              mt-[12px]
            "
          >
            <RuleRow
              label="Structure"
              text="Common typography is the default language for body copy, metadata, captions and system information."
            />

            <RuleRow
              label="Mixing"
              text="Never mix multiple typefaces inside the same sentence or text block."
            />

            <RuleRow
              label="Limit"
              text="Use a maximum of two visible font families within any single frame."
            />

            <RuleRow
              label="Hierarchy"
              text="Typography should reinforce the partnership hierarchy, not create a second competing hierarchy."
            />
          </div>
        </Card>
      </aside>

      {/* ================================================= */}
      {/* RIGHT — EXAMPLES                                   */}
      {/* ================================================= */}

      <main
        className="
          absolute

          left-[486px]
          right-[70px]
          top-[196px]
          bottom-[66px]

          grid
          grid-cols-2
          grid-rows-3

          gap-[11px]
        "
      >
        {/* ================================================= */}
        {/* 01 HEADLINE                                       */}
        {/* ================================================= */}

        <ExampleCard
          number="01"
          title="Headline"
          rule={
            config.headlineRule
          }
        >
          <HeadlineExample
            model={model}
            fontFamily={
              headlineFont
            }
            commonFont={
              commonFont
            }
            brandAFont={
              brandAFont
            }
            brandBFont={
              brandBFont
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 02 BODY COPY                                      */}
        {/* ================================================= */}

        <ExampleCard
          number="02"
          title="Body copy"
          rule={
            config.bodyRule
          }
        >
          <BodyExample
            commonFont={
              commonFont
            }
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 03 UI                                             */}
        {/* ================================================= */}

        <ExampleCard
          number="03"
          title="Interface"
          rule={
            config.uiRule
          }
        >
          <UIExample
            model={model}
            systemFont={
              systemFont
            }
            brandAFont={
              brandAFont
            }
            brandBFont={
              brandBFont
            }
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 04 CTA                                            */}
        {/* ================================================= */}

        <ExampleCard
          number="04"
          title="CTA & controls"
          rule={
            config.ctaRule
          }
        >
          <CTAExample
            commonFont={
              commonFont
            }
            headlineFont={
              headlineFont
            }
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 05 VIDEO                                          */}
        {/* ================================================= */}

        <ExampleCard
          number="05"
          title="Video"
          rule={
            config.videoRule
          }
        >
          <VideoExample
            model={model}
            commonFont={
              commonFont
            }
            headlineFont={
              headlineFont
            }
            brandAFont={
              brandAFont
            }
            brandBFont={
              brandBFont
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
          />
        </ExampleCard>

        {/* ================================================= */}
        {/* 06 CONTENT                                        */}
        {/* ================================================= */}

        <ExampleCard
          number="06"
          title="Brand content"
          rule={
            config.contentRule
          }
        >
          <ContentExample
            model={model}
            contentFont={
              contentFont
            }
            commonFont={
              commonFont
            }
            brandAFont={
              brandAFont
            }
            brandBFont={
              brandBFont
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
          />
        </ExampleCard>
      </main>

      {/* ================================================= */}
      {/* PROHIBITED                                         */}
      {/* ================================================= */}

      <footer
        className="
          absolute

          bottom-[29px]
          left-[70px]
          right-[70px]

          flex
          items-center

          gap-[14px]

          border-t
          border-white/[0.06]

          pt-[10px]
        "
      >
        <p
          className="
            shrink-0

            text-[8px]
            uppercase
            tracking-[0.16em]

            text-white/22
          "
        >
          Do not
        </p>

        <ForbiddenExample
          model={model}
          brandAFont={
            brandAFont
          }
          brandBFont={
            brandBFont
          }
          commonFont={
            commonFont
          }
        />

        <p
          className="
            flex-1

            text-[9px]
            leading-[1.35]

            text-white/30
          "
        >
          {config.forbiddenRule}
        </p>
      </footer>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* HEADLINE EXAMPLE                                 */
/* ------------------------------------------------ */

function HeadlineExample({
  model,
  fontFamily,
  commonFont,
  brandAFont,
  brandBFont,
  brandAName,
  brandBName,
}: {
  model:
    PartnershipModelId;

  fontFamily: string;
  commonFont: string;
  brandAFont: string;
  brandBFont: string;

  brandAName: string;
  brandBName: string;
}) {
  return (
    <div
      className="
        absolute
        inset-0

        flex
        items-center

        px-[18px]
      "
    >
      <div>
        <p
          className="
            text-[6px]
            uppercase
            tracking-[0.16em]

            text-white/22
          "
          style={{
            fontFamily:
              commonFont,
          }}
        >
          Hero message
        </p>

        <p
          className="
            mt-[9px]

            text-[24px]
            leading-[0.98]
            tracking-[-0.035em]

            text-white/90
          "
          style={{
            fontFamily,
          }}
        >
          Beyond
          <br />
          the screen.
        </p>

        {model === "axb" && (
          <div
            className="
              mt-[10px]

              flex
              gap-[11px]
            "
          >
            <span
              className="
                text-[6px]

                text-white/25
              "
              style={{
                fontFamily:
                  brandAFont,
              }}
            >
              {brandAName}
            </span>

            <span
              className="
                text-[6px]

                text-white/12
              "
            >
              or
            </span>

            <span
              className="
                text-[6px]

                text-white/25
              "
              style={{
                fontFamily:
                  brandBFont,
              }}
            >
              {brandBName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* BODY EXAMPLE                                     */
/* ------------------------------------------------ */

function BodyExample({
  commonFont,
}: {
  commonFont: string;
}) {
  return (
    <div
      className="
        absolute
        inset-0

        flex
        items-center

        px-[18px]
      "
      style={{
        fontFamily:
          commonFont,
      }}
    >
      <div
        className="
          w-[88%]
        "
      >
        <p
          className="
            text-[9px]
            leading-[1.45]

            text-white/65
          "
        >
          Immersive content should remain
          easy to understand across every
          partner environment.
        </p>

        <p
          className="
            mt-[8px]

            text-[7px]
            leading-[1.45]

            text-white/30
          "
        >
          The shared typeface creates
          continuity between navigation,
          supporting information and
          longer-form communication.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* UI EXAMPLE                                       */
/* ------------------------------------------------ */

function UIExample({
  model,
  systemFont,
  brandAFont,
  brandBFont,
}: {
  model:
    PartnershipModelId;

  systemFont: string;
  brandAFont: string;
  brandBFont: string;
}) {
  return (
    <div
      className="
        absolute
        inset-[13px]

        rounded-[12px]

        border
        border-white/[0.06]

        bg-white/[0.02]
      "
      style={{
        fontFamily:
          systemFont,
      }}
    >
      {/* NAV */}

      <div
        className="
          flex
          h-[29px]
          items-center

          border-b
          border-white/[0.06]

          px-[10px]
        "
      >
        <span
          className="
            text-[6px]
            text-white/62
          "
        >
          Discover
        </span>

        <span
          className="
            ml-[11px]

            text-[6px]
            text-white/26
          "
        >
          Live
        </span>

        <span
          className="
            ml-[11px]

            text-[6px]
            text-white/26
          "
        >
          Library
        </span>

        <div
          className="
            ml-auto

            rounded-full

            border
            border-white/[0.08]

            px-[6px]
            py-[3px]

            text-[5px]

            text-white/28
          "
        >
          Profile
        </div>
      </div>

      {/* CARD */}

      <div
        className="
          absolute

          bottom-[10px]
          left-[10px]
          right-[10px]
          top-[39px]

          rounded-[9px]

          bg-white/[0.025]

          p-[9px]
        "
      >
        <p
          className="
            text-[5px]
            uppercase
            tracking-[0.12em]

            text-white/20
          "
        >
          Featured
        </p>

        <p
          className="
            mt-[5px]

            text-[11px]

            text-white/70
          "
          style={{
            fontFamily:
              model ===
              "presentsB"
                ? brandBFont
                : model ===
                    "poweredByA"
                  ? brandBFont
                  : model ===
                      "aandb"
                    ? brandAFont
                    : systemFont,
          }}
        >
          Live immersive experience
        </p>

        <p
          className="
            mt-[4px]

            text-[6px]

            text-white/25
          "
        >
          18:30 · Live
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* CTA EXAMPLE                                      */
/* ------------------------------------------------ */

function CTAExample({
  commonFont,
  headlineFont,
}: {
  commonFont: string;
  headlineFont: string;
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
          text-center
        "
      >
        <p
          className="
            text-[15px]
            tracking-[-0.025em]

            text-white/75
          "
          style={{
            fontFamily:
              headlineFont,
          }}
        >
          Ready to enter?
        </p>

        <div
          className="
            mt-[10px]

            flex
            justify-center

            gap-[7px]
          "
          style={{
            fontFamily:
              commonFont,
          }}
        >
          <div
            className="
              rounded-full

              bg-white

              px-[13px]
              py-[7px]

              text-[7px]

              text-black
            "
          >
            Start experience
          </div>

          <div
            className="
              rounded-full

              border
              border-white/[0.1]

              px-[13px]
              py-[7px]

              text-[7px]

              text-white/45
            "
          >
            Learn more
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* VIDEO EXAMPLE                                    */
/* ------------------------------------------------ */

function VideoExample({
  model,
  commonFont,
  headlineFont,
  brandAFont,
  brandBFont,
  brandAName,
  brandBName,
}: {
  model:
    PartnershipModelId;

  commonFont: string;
  headlineFont: string;
  brandAFont: string;
  brandBFont: string;

  brandAName: string;
  brandBName: string;
}) {
  return (
    <>
      {/* IMAGE */}

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_68%_25%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,#171719,#050506)]
        "
      />

      {/* TITLE */}

      <p
        className="
          absolute

          left-[12px]
          top-[12px]

          text-[12px]
          tracking-[-0.02em]

          text-white/68
        "
        style={{
          fontFamily:
            headlineFont,
        }}
      >
        Live experience
      </p>

      {/* LOWER THIRD */}

      <div
        className="
          absolute

          bottom-[10px]
          left-[10px]
          right-[10px]

          flex
          items-center

          rounded-[10px]

          border
          border-white/[0.07]

          bg-black/42

          px-[9px]
          py-[7px]

          backdrop-blur-[10px]
        "
        style={{
          fontFamily:
            commonFont,
        }}
      >
        <div>
          <p
            className="
              text-[5px]
              uppercase
              tracking-[0.13em]

              text-white/22
            "
          >
            Live
          </p>

          <p
            className="
              mt-[2px]

              text-[7px]

              text-white/56
            "
          >
            Headline or key information
          </p>
        </div>

        <div
          className="
            ml-auto
          "
        >
          {model ===
            "aandb" && (
            <p
              className="
                text-[6px]
                text-white/28
              "
              style={{
                fontFamily:
                  brandBFont,
              }}
            >
              {brandBName}
            </p>
          )}

          {model ===
            "poweredByA" && (
            <div
              className="
                text-right
              "
            >
              <p
                className="
                  text-[4px]
                  uppercase
                  tracking-[0.12em]

                  text-white/18
                "
                style={{
                  fontFamily:
                    commonFont,
                }}
              >
                Powered by
              </p>

              <p
                className="
                  mt-[2px]

                  text-[6px]

                  text-white/28
                "
                style={{
                  fontFamily:
                    brandAFont,
                }}
              >
                {brandAName}
              </p>
            </div>
          )}

          {model ===
            "presentsB" && (
            <p
              className="
                text-[7px]

                text-white/34
              "
              style={{
                fontFamily:
                  brandBFont,
              }}
            >
              {brandBName}
            </p>
          )}

          {model ===
            "axb" && (
            <p
              className="
                text-[5px]

                text-white/23
              "
            >
              Shared identity
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* CONTENT EXAMPLE                                  */
/* ------------------------------------------------ */

function ContentExample({
  model,
  contentFont,
  commonFont,
  brandAFont,
  brandBFont,
  brandAName,
  brandBName,
}: {
  model:
    PartnershipModelId;

  contentFont: string;
  commonFont: string;
  brandAFont: string;
  brandBFont: string;

  brandAName: string;
  brandBName: string;
}) {
  if (
    model === "presentsB"
  ) {
    return (
      <div
        className="
          absolute
          inset-[12px]

          overflow-hidden

          rounded-[11px]

          border
          border-white/[0.06]
        "
      >
        {/* PLATFORM HEADER */}

        <div
          className="
            flex
            h-[27px]
            items-center

            border-b
            border-white/[0.06]

            px-[9px]
          "
          style={{
            fontFamily:
              brandAFont,
          }}
        >
          <span
            className="
              text-[6px]

              text-white/38
            "
          >
            {brandAName}
          </span>

          <span
            className="
              ml-auto

              text-[5px]

              text-white/18
            "
            style={{
              fontFamily:
                commonFont,
            }}
          >
            Featured content
          </span>
        </div>

        {/* CONTENT */}

        <div
          className="
            px-[11px]
            py-[10px]
          "
        >
          <p
            className="
              text-[6px]
              uppercase
              tracking-[0.12em]

              text-white/22
            "
            style={{
              fontFamily:
                commonFont,
            }}
          >
            Presented content
          </p>

          <p
            className="
              mt-[7px]

              text-[18px]
              leading-none

              text-white/80
            "
            style={{
              fontFamily:
                brandBFont,
            }}
          >
            {brandBName}
          </p>

          <p
            className="
              mt-[6px]

              text-[6px]

              text-white/26
            "
            style={{
              fontFamily:
                commonFont,
            }}
          >
            Content title can adopt
            the featured brand voice.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        absolute
        inset-0

        flex
        items-center

        px-[18px]
      "
    >
      <div>
        <p
          className="
            text-[6px]
            uppercase
            tracking-[0.14em]

            text-white/20
          "
          style={{
            fontFamily:
              commonFont,
          }}
        >
          Brand moment
        </p>

        <p
          className="
            mt-[8px]

            text-[21px]
            leading-none

            text-white/80
          "
          style={{
            fontFamily:
              contentFont,
          }}
        >
          {model ===
          "poweredByA"
            ? brandBName
            : model ===
                "aandb"
              ? brandAName
              : "Shared content"}
        </p>

        <p
          className="
            mt-[7px]

            max-w-[210px]

            text-[6px]
            leading-[1.4]

            text-white/27
          "
          style={{
            fontFamily:
              commonFont,
          }}
        >
          Brand typography enters only
          where ownership or expression
          needs to be explicit.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* FORBIDDEN                                        */
/* ------------------------------------------------ */

function ForbiddenExample({
  model,
  brandAFont,
  brandBFont,
  commonFont,
}: {
  model:
    PartnershipModelId;

  brandAFont: string;
  brandBFont: string;
  commonFont: string;
}) {
  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          flex
          h-[28px]

          items-center

          overflow-hidden

          rounded-[7px]

          border
          border-white/[0.07]

          bg-white/[0.025]

          px-[9px]
        "
      >
        <span
          className="
            text-[8px]

            text-white/55
          "
          style={{
            fontFamily:
              brandAFont,
          }}
        >
          Shared
        </span>

        <span
          className="
            ml-[4px]

            text-[8px]

            text-white/55
          "
          style={{
            fontFamily:
              brandBFont,
          }}
        >
          experience
        </span>

        <span
          className="
            ml-[8px]

            text-[10px]

            text-white/25
          "
        >
          ×
        </span>
      </div>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <div
        className="
          flex
          h-[28px]

          items-center

          rounded-[7px]

          border
          border-white/[0.07]

          bg-white/[0.025]

          px-[9px]
        "
      >
        <span
          className="
            text-[11px]

            text-white/60
          "
          style={{
            fontFamily:
              brandBFont,
          }}
        >
          Primary platform headline
        </span>

        <span
          className="
            ml-[8px]

            text-[10px]

            text-white/25
          "
        >
          ×
        </span>
      </div>
    );
  }

  if (
    model === "poweredByA"
  ) {
    return (
      <div
        className="
          flex
          h-[28px]

          items-center

          rounded-[7px]

          border
          border-white/[0.07]

          bg-white/[0.025]

          px-[9px]
        "
      >
        <span
          className="
            text-[11px]

            text-white/60
          "
          style={{
            fontFamily:
              brandAFont,
          }}
        >
          Consumer headline
        </span>

        <span
          className="
            ml-[8px]

            text-[10px]

            text-white/25
          "
        >
          ×
        </span>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-[28px]

        items-center

        rounded-[7px]

        border
        border-white/[0.07]

        bg-white/[0.025]

        px-[9px]
      "
    >
      <span
        className="
          text-[7px]

          text-white/35
        "
        style={{
          fontFamily:
            brandBFont,
        }}
      >
        HOME
      </span>

      <span
        className="
          ml-[11px]

          text-[7px]

          text-white/35
        "
        style={{
          fontFamily:
            brandBFont,
        }}
      >
        DISCOVER
      </span>

      <span
        className="
          ml-[11px]

          text-[7px]

          text-white/35
        "
        style={{
          fontFamily:
            brandBFont,
        }}
      >
        PROFILE
      </span>

      <span
        className="
          ml-[8px]

          text-[10px]

          text-white/25
        "
        style={{
          fontFamily:
            commonFont,
        }}
      >
        ×
      </span>
    </div>
  );
}