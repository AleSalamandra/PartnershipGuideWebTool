"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";
import BrandLogo from "./BrandLogo";

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

interface PageContent {
  title: (
    brandA: string,
    brandB: string
  ) => string;

  subtitle: (
    brandA: string,
    brandB: string
  ) => string;

  intro: (
    brandA: string,
    brandB: string
  ) => string;

  body: (
    brandA: string,
    brandB: string
  ) => string;

  brandExpression: (
    brandA: string,
    brandB: string
  ) => string;

  lockups: (
    brandA: string,
    brandB: string
  ) => string[];

  useWhen: (
    brandA: string,
    brandB: string
  ) => string;
}

interface AdditionalContent {
  label:
    string;

  intro:
    string;

  body:
    string;

  brandExpression:
    string;

  useWhen:
    string;

  lockupSuffix:
    string;
}

/* ================================================= */
/* PARTNERSHIP CONTENT                               */
/* ================================================= */

const PAGE_CONTENT:
  Record<
    PartnershipModelId,
    PageContent
  > = {
  axb: {
    title:
      (
        a,
        b
      ) =>
        `${a} × ${b}`,

    subtitle:
      () =>
        "Equal collaboration",

    intro:
      (
        a,
        b
      ) =>
        `${a} and ${b} jointly present the immersive experience.`,

    body:
      (
        a,
        b
      ) =>
        `${b} provides the content, access and IP, while ${a} provides the immersive capture, production, technology and experience platform. Both contributions are considered equally important to the final product.`,

    brandExpression:
      (
        a,
        b
      ) =>
        `${a} and ${b} receive comparable visual weight. A shared visual territory may be created for the collaboration.`,

    lockups:
      (
        a,
        b
      ) => [
        `${a} × ${b}`,
      ],

    useWhen:
      (
        a,
        b
      ) =>
        `The project is positioned as a strategic collaboration between ${a} and ${b}.`,
  },

  aandb: {
    title:
      (
        a,
        b
      ) =>
        `${a} with ${b}`,

    subtitle:
      (
        a
      ) =>
        `${a}-led collaboration`,

    intro:
      (
        a,
        b
      ) =>
        `${a} is the primary brand behind the immersive product, while ${b} is clearly recognised as the content partner.`,

    body:
      (
        a,
        b
      ) =>
        `The experience belongs primarily to the ${a} ecosystem, while ${b}'s content, access or IP plays a significant role and remains visible.`,

    brandExpression:
      (
        a,
        b
      ) =>
        `${a} defines the main visual language. ${b} appears with secondary but meaningful visibility.`,

    lockups:
      (
        a,
        b
      ) => [
        `${a}\nwith ${b}`,
        `${a} Immersive Experience\nin collaboration with ${b}`,
      ],

    useWhen:
      (
        a,
        b
      ) =>
        `${a} creates and distributes the experience while ${b} contributes the content.`,
  },

  poweredByA: {
    title:
      (
        a,
        b
      ) =>
        `${b} powered by ${a}`,

    subtitle:
      (
        a
      ) =>
        `${a}-enabled experience`,

    intro:
      (
        a,
        b
      ) =>
        `${b} owns the consumer-facing product or experience, while ${a} operates behind the scenes as the immersive technology and production partner.`,

    body:
      (
        a,
        b
      ) =>
        `${a} may provide capture, immersive video production, streaming technology, XR applications and platform infrastructure, while the experience is presented primarily as part of ${b}'s ecosystem.`,

    brandExpression:
      (
        a,
        b
      ) =>
        `${b}'s identity dominates. ${a} appears as a technology or production endorsement rather than as a co-owner of the experience.`,

    lockups:
      (
        a,
        b
      ) => [
        `${b}\nPowered by ${a}`,
        `${b} Immersive\nTechnology by ${a}`,
      ],

    useWhen:
      (
        _a,
        b
      ) =>
        `The experience is white-labelled or primarily distributed through ${b}'s channels.`,
  },

  presentsB: {
    title:
      (
        a,
        b
      ) =>
        `${a} presents ${b}`,

    subtitle:
      (
        a
      ) =>
        `${a}-owned experience`,

    intro:
      (
        a,
        b
      ) =>
        `${a} creates, owns and presents the immersive product, while ${b} provides the content or IP featured within it.`,

    body:
      (
        a,
        b
      ) =>
        `The audience enters a ${a} experience featuring ${b}, rather than a ${b} product built by ${a}.`,

    brandExpression:
      (
        a,
        b
      ) =>
        `The overall experience follows ${a}'s identity, including motion, interface, typography and navigation. ${b}'s identity is primarily expressed through its content.`,

    lockups:
      (
        a,
        b
      ) => [
        `${a} presents\n${b}`,
        `${b}\nA ${a} Immersive Experience`,
      ],

    useWhen:
      (
        a
      ) =>
        `Content from different partners lives within a ${a}-owned platform or product ecosystem.`,
  },
};

/* ================================================= */
/* ADDITIONAL CONTENT                                */
/* ================================================= */

function getAdditionalContent(
  mode:
    AdditionalRelationshipMode,

  propertyName:
    string
): AdditionalContent | null {
  if (
    mode ===
    "presenting"
  ) {
    return {
      label:
        `Presenting ${propertyName}`,

      intro:
        `${propertyName} is the presented property and becomes a major consumer-facing identity within the collaboration.`,

      body:
        `${propertyName} is not treated as a passive endorsement. Its identity may actively influence colour, typography, motion, image treatment and the broader content layer, while the underlying relationship between Brand A and Brand B remains unchanged.`,

      brandExpression:
        `${propertyName} should have substantial visual presence. The Brand A / Brand B partnership behaves as the presenting layer, while ${propertyName} can become the dominant identity inside the featured content territory.`,

      useWhen:
        `${propertyName} is the event, competition, programme, tour, property or content proposition that the partnership is jointly presenting.`,

      lockupSuffix:
        `present\n${propertyName}`,
    };
  }

  if (
    mode ===
    "sponsored"
  ) {
    return {
      label:
        `Sponsored by ${propertyName}`,

      intro:
        `${propertyName} is a commercial sponsor of the experience rather than an owner of the shared identity.`,

      body:
        `The partnership model remains visually intact. ${propertyName} appears through controlled sponsor credits and should not determine the shared colour, typography, motion or graphic language.`,

      brandExpression:
        `${propertyName} receives deliberately limited visual weight and should normally appear only in sponsor lockups, credits or designated commercial placements.`,

      useWhen:
        `${propertyName} financially supports or commercially sponsors the experience without becoming part of its core brand authorship.`,

      lockupSuffix:
        `Sponsored by ${propertyName}`,
    };
  }

  return null;
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page01() {
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

  const content =
    PAGE_CONTENT[
      model
    ];

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  const propertyName =
    propertyX.name.trim() ||
    "X";

  const additional =
    getAdditionalContent(
      additionalRelationship,
      propertyName
    );

  const title =
    content.title(
      brandAName,
      brandBName
    );

  const subtitle =
    content.subtitle(
      brandAName,
      brandBName
    );

  const baseLockups =
    content.lockups(
      brandAName,
      brandBName
    );

  const lockups =
    additional
      ? [
          ...baseLockups,

          `${baseLockups[0]}\n${additional.lockupSuffix}`,
        ]
      : baseLockups;

  const appRules = [
    {
      owner:
        brandBName,

      result:
        `${brandBName} powered by ${brandAName}`,
    },

    {
      owner:
        brandAName,

      result:
        `${brandAName} presents ${brandBName}`,
    },
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
        <div className="max-w-[960px]">
          <p
            className="
              text-[15px]
              uppercase
              tracking-[0.16em]

              text-white/30
            "
          >
            01 / Partnership Model
          </p>

          <div
            className="
              mt-[24px]

              flex
              flex-wrap

              items-baseline

              gap-x-[16px]
              gap-y-[8px]
            "
          >
            <h1
              className="
                text-[47px]
                leading-[1]
                tracking-[-0.045em]

                oook-semibold
              "
            >
              {title}
            </h1>

            <span
              className="
                text-[38px]
                leading-none

                text-white/30

                oook-light
              "
            >
              —
            </span>

            <p
              className="
                text-[40px]
                leading-[1]
                tracking-[-0.04em]

                text-white/55

                oook-light
              "
            >
              {subtitle}
            </p>
          </div>

          {additional && (
            <div
              className="
                mt-[15px]

                inline-flex
                items-center
                gap-[8px]

                rounded-full

                border
                border-white/[0.08]

                px-[10px]
                py-[6px]
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.13em]

                  text-white/25
                "
              >
                Additional relationship
              </span>

              <span className="text-[9px] text-white/55">
                {additional.label}
              </span>
            </div>
          )}
        </div>

        <div
          className="
            flex
            flex-col
            items-end
            gap-[13px]
          "
        >
          <PartnershipLockup
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {additionalRelationship !==
            "none" && (
            <XSignature
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
      {/* LEFT CONTENT                             */}
      {/* ======================================== */}

      <main
        className="
          absolute

          left-[90px]
          top-[225px]

          w-[760px]
        "
      >
        <p
          className="
            max-w-[700px]

            text-[20px]
            leading-[1.46]
            tracking-[-0.012em]

            text-white/82
          "
        >
          {content.intro(
            brandAName,
            brandBName
          )}

          {additional && (
            <>
              {" "}
              {additional.intro}
            </>
          )}
        </p>

        <p
          className="
            mt-[24px]

            max-w-[700px]

            text-[16px]
            leading-[1.5]

            text-white/45
          "
        >
          {content.body(
            brandAName,
            brandBName
          )}

          {additional && (
            <>
              {" "}
              {additional.body}
            </>
          )}
        </p>

        {/* ====================================== */}
        {/* BRAND EXPRESSION                       */}
        {/* ====================================== */}

        <InfoSection
          title="Brand expression"
          className="mt-[28px]"
        >
          {content.brandExpression(
            brandAName,
            brandBName
          )}

          {additional && (
            <>
              {" "}
              {
                additional.brandExpression
              }
            </>
          )}
        </InfoSection>

        {/* ====================================== */}
        {/* LOCKUPS                                */}
        {/* ====================================== */}

        <section className="mt-[28px]">
          <SectionLabel>
            Typical lockups
          </SectionLabel>

          <div
            className="
              mt-[12px]

              flex
              flex-wrap

              gap-[10px]
            "
          >
            {lockups.map(
              (
                lockup
              ) => (
                <div
                  key={
                    lockup
                  }
                  className="
                    flex

                    min-h-[66px]
                    min-w-[205px]
                    max-w-[310px]

                    items-center

                    rounded-[16px]

                    border
                    border-white/[0.08]

                    bg-white/[0.025]

                    px-[16px]
                    py-[12px]
                  "
                >
                  <p
                    className="
                      whitespace-pre-line

                      text-[14px]
                      leading-[1.32]

                      text-white/62
                    "
                  >
                    {lockup}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ====================================== */}
        {/* USE WHEN                               */}
        {/* ====================================== */}

        <InfoSection
          title="Use when"
          className="mt-[28px]"
        >
          {content.useWhen(
            brandAName,
            brandBName
          )}

          {additional && (
            <>
              {" "}
              {additional.useWhen}
            </>
          )}
        </InfoSection>
      </main>

      {/* ======================================== */}
      {/* APPLICATION OWNERSHIP                    */}
      {/* ======================================== */}

      <aside
        className="
          absolute

          right-[90px]
          top-[180px]

          w-[475px]

          rounded-[30px]

          border
          border-white/[0.07]

          bg-white/[0.035]

          px-[32px]
          py-[28px]
        "
      >
        <SectionLabel>
          Application ownership
        </SectionLabel>

        <h2
          className="
            mt-[13px]

            text-[28px]
            leading-[1.08]
            tracking-[-0.025em]

            oook-semibold
          "
        >
          The app owner
          <br />
          defines the model.
        </h2>

        <p
          className="
            mt-[14px]

            max-w-[380px]

            text-[15px]
            leading-[1.42]

            text-white/45
          "
        >
          When content lives inside an immersive application, ownership of the app takes precedence over the broader partnership.
        </p>

        <div
          className="
            mt-[22px]

            border-t
            border-white/[0.08]
          "
        >
          {appRules.map(
            (
              rule
            ) => (
              <div
                key={
                  rule.owner
                }
                className="
                  grid
                  grid-cols-[110px_1fr]

                  gap-[16px]

                  border-b
                  border-white/[0.08]

                  py-[17px]
                "
              >
                <p
                  className="
                    text-[12px]
                    leading-[1.35]

                    text-white/30
                  "
                >
                  {rule.owner}
                  <br />
                  app
                </p>

                <p
                  className="
                    text-[15px]
                    leading-[1.3]

                    text-white/75

                    oook-medium
                  "
                >
                  {rule.result}
                </p>
              </div>
            )
          )}
        </div>

        {/* ====================================== */}
        {/* X ROLE                                  */}
        {/* ====================================== */}

        {additional && (
          <div
            className="
              mt-[20px]

              rounded-[16px]

              border
              border-white/[0.07]

              bg-white/[0.018]

              p-[15px]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                gap-[16px]
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.13em]

                    text-white/23
                  "
                >
                  Additional role
                </p>

                <p
                  className="
                    mt-[5px]

                    text-[13px]

                    text-white/62

                    oook-medium
                  "
                >
                  {additional.label}
                </p>
              </div>

              <div className="h-[32px] w-[95px]">
                <BrandLogo
                  logoUrl={
                    propertyX.logoUrl
                  }
                  fallback={
                    propertyName
                  }
                />
              </div>
            </div>

            <p
              className="
                mt-[11px]

                text-[10px]
                leading-[1.4]

                text-white/32
              "
            >
              {additionalRelationship ===
              "presenting"
                ? "X actively influences the shared visual territory."
                : "X remains outside the core visual system and appears only as an endorsement."}
            </p>
          </div>
        )}

        <p
          className="
            mt-[16px]

            text-[10px]
            leading-[1.4]

            text-white/22
          "
        >
          Application ownership overrides the broader A / B collaboration model. The additional X relationship remains independent.
        </p>
      </aside>
    </GuidelinePage>
  );
}

/* ================================================= */
/* SECTION LABEL                                     */
/* ================================================= */

function SectionLabel({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <p
      className="
        text-[12px]
        uppercase
        tracking-[0.15em]

        text-white/30
      "
    >
      {children}
    </p>
  );
}

/* ================================================= */
/* INFO                                              */
/* ================================================= */

function InfoSection({
  title,
  children,
  className = "",
}: {
  title:
    string;

  children:
    ReactNode;

  className?:
    string;
}) {
  return (
    <section
      className={
        className
      }
    >
      <SectionLabel>
        {title}
      </SectionLabel>

      <p
        className="
          mt-[9px]

          max-w-[700px]

          text-[15px]
          leading-[1.45]

          text-white/50
        "
      >
        {children}
      </p>
    </section>
  );
}

/* ================================================= */
/* X SIGNATURE                                       */
/* ================================================= */

function XSignature({
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
    <div
      className="
        flex
        items-center
        gap-[10px]
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.13em]

          text-white/22
        "
      >
        {presenting
          ? "Presenting"
          : "Sponsored by"}
      </span>

      <div
        className={
          presenting
            ? "h-[38px] w-[125px]"
            : "h-[25px] w-[86px]"
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