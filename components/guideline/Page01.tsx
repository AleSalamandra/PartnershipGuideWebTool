"use client";

import React from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type ModelId =
  | "axb"
  | "aandb"
  | "poweredByA"
  | "presentsB";

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

/* ------------------------------------------------ */
/* CONTENT                                          */
/* ------------------------------------------------ */

const PAGE_CONTENT: Record<
  ModelId,
  PageContent
> = {
  axb: {
    title: (a, b) =>
      `${a} × ${b}`,

    subtitle: () =>
      "Equal collaboration",

    intro: (a, b) =>
      `${a} and ${b} jointly present the immersive experience.`,

    body: (a, b) =>
      `${b} provides the content, access and IP, while ${a} provides the immersive capture, production, technology and experience platform. Both contributions are considered equally important to the final product.`,

    brandExpression: (a, b) =>
      `${a} and ${b} receive comparable visual weight. A shared visual territory may be created for the collaboration.`,

    lockups: (a, b) => [
      `${a} × ${b}`,
    ],

    useWhen: (a, b) =>
      `The project is positioned as a strategic collaboration between ${a} and ${b}.`,
  },

  aandb: {
    title: (a, b) =>
      `${a} with ${b}`,

    subtitle: (a) =>
      `${a}-led collaboration`,

    intro: (a, b) =>
      `${a} is the primary brand behind the immersive product, while ${b} is clearly recognised as the content partner.`,

    body: (a, b) =>
      `The experience belongs primarily to the ${a} ecosystem, while ${b}'s content, access or IP plays a significant role and remains visible.`,

    brandExpression: (a, b) =>
      `${a} defines the main visual language. ${b} appears with secondary but meaningful visibility.`,

    lockups: (a, b) => [
      `${a}\nwith ${b}`,
      `${a} Immersive Experience\nin collaboration with ${b}`,
    ],

    useWhen: (a, b) =>
      `${a} creates and distributes the experience while ${b} contributes the content.`,
  },

  poweredByA: {
    title: (a, b) =>
      `${b} powered by ${a}`,

    subtitle: (a) =>
      `${a}-enabled experience`,

    intro: (a, b) =>
      `${b} owns the consumer-facing product or experience, while ${a} operates behind the scenes as the immersive technology and production partner.`,

    body: (a, b) =>
      `${a} may provide capture, immersive video production, streaming technology, XR applications and platform infrastructure, while the experience is presented primarily as part of ${b}'s ecosystem.`,

    brandExpression: (a, b) =>
      `${b}'s identity dominates. ${a} appears as a technology or production endorsement rather than as a co-owner of the experience.`,

    lockups: (a, b) => [
      `${b}\nPowered by ${a}`,
      `${b} Immersive\nTechnology by ${a}`,
    ],

    useWhen: (a, b) =>
      `The experience is white-labelled or primarily distributed through ${b}'s channels.`,
  },

  presentsB: {
    title: (a, b) =>
      `${a} presents ${b}`,

    subtitle: (a) =>
      `${a}-owned experience`,

    intro: (a, b) =>
      `${a} creates, owns and presents the immersive product, while ${b} provides the content or IP featured within it.`,

    body: (a, b) =>
      `The audience enters a ${a} experience featuring ${b}, rather than a ${b} product built by ${a}.`,

    brandExpression: (a, b) =>
      `The overall experience follows ${a}'s identity, including motion, interface, typography and navigation. ${b}'s identity is primarily expressed through its content.`,

    lockups: (a, b) => [
      `${a} presents\n${b}`,
      `${b}\nA ${a} Immersive Experience`,
    ],

    useWhen: (a) =>
      `Content from different partners lives within a ${a}-owned platform or product ecosystem.`,
  },
};

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page01() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } = useGuidelineStore();

  const model =
    partnershipModel as ModelId;

  const content =
    PAGE_CONTENT[model];

  const brandAName =
    brandA.name.trim() || "Brand A";

  const brandBName =
    brandB.name.trim() || "Brand B";

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

  const appRules = [
    {
      owner: brandBName,
      result:
        `${brandBName} powered by ${brandAName}`,
    },

    {
      owner: brandAName,
      result:
        `${brandAName} presents ${brandBName}`,
    },
  ];

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
        </div>

        <PartnershipLockup
          model={model}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={brandA.logoUrl}
          brandBLogo={brandB.logoUrl}
        />
      </header>

      {/* LEFT CONTENT */}

      <main
        className="
          absolute
          left-[90px]
          top-[220px]
          w-[760px]
        "
      >
        {/* INTRO */}

        <p
          className="
            max-w-[700px]
            text-[21px]
            leading-[1.48]
            tracking-[-0.012em]
            text-white/82
          "
        >
          {content.intro(
            brandAName,
            brandBName
          )}
        </p>

        {/* BODY */}

        <p
          className="
            mt-[30px]
            max-w-[700px]
            text-[18px]
            leading-[1.55]
            text-white/45
          "
        >
          {content.body(
            brandAName,
            brandBName
          )}
        </p>

        {/* BRAND EXPRESSION */}

        <InfoSection
          title="Brand expression"
          className="mt-[38px]"
        >
          {content.brandExpression(
            brandAName,
            brandBName
          )}
        </InfoSection>

        {/* TYPICAL LOCKUPS */}

        <section className="mt-[38px]">
          <SectionLabel>
            Typical lockups
          </SectionLabel>

          <div
            className="
              mt-[15px]
              flex
              flex-wrap
              gap-[14px]
            "
          >
            {content
              .lockups(
                brandAName,
                brandBName
              )
              .map(
                (lockup) => (
                  <div
                    key={lockup}
                    className="
                      flex
                      min-h-[74px]
                      min-w-[220px]
                      max-w-[320px]
                      items-center
                      rounded-[18px]
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-[20px]
                      py-[15px]
                    "
                  >
                    <p
                      className="
                        whitespace-pre-line
                        text-[16px]
                        leading-[1.35]
                        text-white/65
                      "
                    >
                      {lockup}
                    </p>
                  </div>
                )
              )}
          </div>
        </section>

        {/* USE WHEN */}

        <InfoSection
          title="Use when"
          className="mt-[38px]"
        >
          {content.useWhen(
            brandAName,
            brandBName
          )}
        </InfoSection>
      </main>

      {/* APPLICATION OWNERSHIP */}

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
          px-[36px]
          py-[32px]
        "
      >
        <SectionLabel>
          Application ownership
        </SectionLabel>

        <h2
          className="
            mt-[14px]
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
            mt-[16px]
            max-w-[360px]
            text-[17px]
            leading-[1.42]
            text-white/45
          "
        >
          When content lives inside an immersive
          application, ownership of the app takes
          precedence over the broader partnership.
        </p>

        <div
          className="
            mt-[28px]
            border-t
            border-white/[0.08]
          "
        >
          {appRules.map(
            (rule) => (
              <div
                key={rule.owner}
                className="
                  grid
                  grid-cols-[120px_1fr]
                  gap-[18px]
                  border-b
                  border-white/[0.08]
                  py-[21px]
                "
              >
                <p
                  className="
                    text-[13px]
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
                    text-[17px]
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

        <p
          className="
            mt-[18px]
            text-[12px]
            leading-[1.4]
            text-white/22
          "
        >
          Application ownership overrides the
          broader collaboration model.
        </p>
      </aside>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* TEXT COMPONENTS                                  */
/* ------------------------------------------------ */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
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

function InfoSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <SectionLabel>
        {title}
      </SectionLabel>

      <p
        className="
          mt-[11px]
          max-w-[700px]
          text-[17px]
          leading-[1.5]
          text-white/50
        "
      >
        {children}
      </p>
    </section>
  );
}

/* ------------------------------------------------ */
/* PARTNERSHIP LOCKUP                               */
/* ------------------------------------------------ */

interface PartnershipLockupProps {
  model: ModelId;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}

function PartnershipLockup({
  model,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: PartnershipLockupProps) {
  /* A × B */

  if (model === "axb") {
    return (
      <div
        className="
          flex
          items-center
          gap-[16px]
          pt-[4px]
        "
      >
        <LogoBox
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <span
          className="
            text-[26px]
            text-white/20
            oook-light
          "
        >
          ×
        </span>

        <LogoBox
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
          gap-[28px]
          pt-[2px]
        "
      >
        <LogoWithLabel
          label="Immersive experience by"
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <LogoWithLabel
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
          w-[250px]
          flex-col
          items-end
        "
      >
        <div className="h-[48px] w-[165px]">
          <BrandLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>

        <div
          className="
            mt-[8px]
            flex
            items-center
            gap-[10px]
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]
              text-white/20
            "
          >
            Powered by
          </span>

          <div className="h-[28px] w-[110px]">
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
        w-[230px]
        flex-col
        items-end
      "
    >
      <div className="h-[33px] w-[130px]">
        <BrandLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />
      </div>

      <p
        className="
          my-[6px]
          text-[9px]
          uppercase
          tracking-[0.16em]
          text-white/20
        "
      >
        Presents
      </p>

      <div className="h-[43px] w-[150px]">
        <BrandLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* LOGO HELPERS                                     */
/* ------------------------------------------------ */

function LogoBox({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div className="h-[48px] w-[145px]">
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

function LogoWithLabel({
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
          mb-[6px]
          text-[9px]
          tracking-[0.03em]
          text-white/20
        "
      >
        {label}
      </p>

      <div className="h-[40px] w-[145px]">
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </div>
  );
}