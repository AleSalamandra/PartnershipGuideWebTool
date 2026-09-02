"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";

import GuidelinePage, {
  useGuidelineThemeStore,
} from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface BrandView {
  name: string;
  logoUrl: string | null;
}

interface ClosingConfig {
  description: string;

  signature: string;
  overlay: string;
  cta: string;
  minimal: string;
}

/* ================================================= */
/* IMAGE CONFIG                                      */
/* ================================================= */

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
];

/* ================================================= */
/* MODEL CONFIG                                      */
/* ================================================= */

function getClosingConfig(
  model:
    PartnershipModelId
): ClosingConfig {
  switch (model) {
    case "axb":
      return {
        description:
          "Both brands close the experience together with equal optical prominence and a shared final signature.",

        signature:
          "Equal brand sign-off",

        overlay:
          "Shared closing overlay",

        cta:
          "Neutral shared CTA",

        minimal:
          "Brand A × Brand B",
      };

    case "aandb":
      return {
        description:
          "Brand A owns the closing moment while Brand B remains clearly visible as the supporting partner.",

        signature:
          "Brand A-led sign-off",

        overlay:
          "Brand A persistent identity",

        cta:
          "Brand A CTA with partner credit",

        minimal:
          "Brand A with Brand B",
      };

    case "poweredByA":
      return {
        description:
          "Brand B closes the consumer experience. Brand A remains present only as a clear technology or production endorsement.",

        signature:
          "Brand B sign-off",

        overlay:
          "Brand B + powered-by credit",

        cta:
          "Brand B consumer CTA",

        minimal:
          "Brand B powered by Brand A",
      };

    case "presentsB":
    default:
      return {
        description:
          "Brand B closes the featured content before Brand A returns as the platform or presenting identity.",

        signature:
          "Featured content sign-off",

        overlay:
          "Brand B inside Brand A container",

        cta:
          "Return to Brand A platform",

        minimal:
          "Brand A presents Brand B",
      };
  }
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page07() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } =
    useGuidelineStore();

  const theme =
    useGuidelineThemeStore(
      (state) =>
        state.theme
    );

  const isLight =
    theme === "light";

  const model =
    partnershipModel as PartnershipModelId;

  const config =
    getClosingConfig(
      model
    );

  const a:
    BrandView = {
    name:
      brandA.name ||
      "Brand A",

    logoUrl:
      brandA.logoUrl ??
      null,
  };

  const b:
    BrandView = {
    name:
      brandB.name ||
      "Brand B",

    logoUrl:
      brandB.logoUrl ??
      null,
  };

  const [
    images,
    setImages,
  ] =
    useState([
      2,
      5,
      7,
      9,
    ]);

  useEffect(
    () => {
      const source = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ];

      const shuffled =
        [...source].sort(
          () =>
            Math.random() -
            0.5
        );

      setImages(
        shuffled.slice(
          0,
          4
        )
      );
    },
    [model]
  );

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute

          left-[44px]
          right-[44px]
          top-[36px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.16em]

              text-white/28
            "
          >
            07 / Closing identity
          </p>

          <h1
            className="
              mt-[15px]

              text-[50px]
              leading-[0.95]
              tracking-[-0.05em]

              text-white

              oook-semibold
            "
          >
            Video closing applications
          </h1>

          <p
            className="
              mt-[16px]

              max-w-[820px]

              text-[15px]
              leading-[1.4]

              text-white/40
            "
          >
            {config.description}
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* ======================================== */}
      {/* GRID                                     */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[74px]
          left-[44px]
          right-[44px]
          top-[225px]

          grid
          grid-cols-2
          grid-rows-2

          gap-x-[26px]
          gap-y-[22px]
        "
      >
        <ClosingCard
          number="01"
          title="Final signature"
          description={
            config.signature
          }
        >
          <FinalSignature
            model={model}
            brandA={a}
            brandB={b}
            image={
              images[0]
            }
            isLight={
              isLight
            }
          />
        </ClosingCard>

        <ClosingCard
          number="02"
          title="Over footage"
          description={
            config.overlay
          }
        >
          <OverFootage
            model={model}
            brandA={a}
            brandB={b}
            image={
              images[1]
            }
            isLight={
              isLight
            }
          />
        </ClosingCard>

        <ClosingCard
          number="03"
          title="CTA end card"
          description={
            config.cta
          }
        >
          <CTAEndCard
            model={model}
            brandA={a}
            brandB={b}
            image={
              images[2]
            }
            isLight={
              isLight
            }
          />
        </ClosingCard>

        <ClosingCard
          number="04"
          title="Minimal closing"
          description={
            config.minimal
          }
        >
          <MinimalClosing
            model={model}
            brandA={a}
            brandB={b}
            image={
              images[3]
            }
            isLight={
              isLight
            }
          />
        </ClosingCard>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[36px]
          left-[44px]
          right-[44px]

          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[9px]

            text-white/22
          "
        >
          Closing layouts may adapt to duration, platform and campaign requirements.
        </p>

        <p
          className="
            text-[9px]

            text-white/22
          "
        >
          Sign-off · CTA · Credits · Ownership · Clear space
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function ClosingCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;

  children:
    ReactNode;
}) {
  return (
    <article
      className="
        grid
        min-h-0

        grid-cols-[112px_minmax(0,1fr)]

        gap-[14px]
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
            text-[8px]
            uppercase
            tracking-[0.14em]

            text-white/20
          "
        >
          {number}
        </p>

        <h3
          className="
            mt-[8px]

            text-[16px]
            leading-[1.05]
            tracking-[-0.025em]

            text-white/72

            oook-medium
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-[10px]

            h-px
            w-[42px]

            bg-white/[0.14]
          "
        />

        <p
          className="
            mt-[9px]

            max-w-[92px]

            text-[9px]
            leading-[1.38]

            text-white/31
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          min-h-0

          overflow-hidden

          rounded-[22px]

          border
          border-white/[0.08]

          bg-[#050506]
        "
      >
        {children}
      </div>
    </article>
  );
}

/* ================================================= */
/* BACKGROUND                                        */
/* ================================================= */

function ClosingBackground({
  image,
}: {
  image: number;
}) {
  const [
    extension,
    setExtension,
  ] =
    useState(0);

  useEffect(
    () => {
      setExtension(0);
    },
    [image]
  );

  return (
    <>
      <div
        className="
          absolute
          inset-0

          overflow-hidden
        "
        style={{
          filter:
            "grayscale(0.96) contrast(1.04)",
        }}
      >
        <img
          src={`/images/image${image}.${IMAGE_EXTENSIONS[extension]}`}
          alt=""
          draggable={false}
          onError={() => {
            if (
              extension <
              IMAGE_EXTENSIONS.length -
                1
            ) {
              setExtension(
                (current) =>
                  current + 1
              );
            }
          }}
          className="
            h-full
            w-full

            scale-[1.035]

            object-cover
          "
        />
      </div>

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-transparent
          via-transparent
          to-black/38
        "
      />
    </>
  );
}

/* ================================================= */
/* FINAL SIGNATURE                                   */
/* ================================================= */

function FinalSignature({
  model,
  brandA,
  brandB,
  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  image:
    number;

  isLight:
    boolean;
}) {
  return (
    <>
      <ClosingBackground
        image={image}
      />

      <div
        className="
          absolute
          inset-0

          flex
          items-center
          justify-center
        "
      >
        <ClosingLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
          isLight={isLight}
          large
        />
      </div>
    </>
  );
}

/* ================================================= */
/* OVER FOOTAGE                                      */
/* ================================================= */

function OverFootage({
  model,
  brandA,
  brandB,
  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  image:
    number;

  isLight:
    boolean;
}) {
  return (
    <>
      <ClosingBackground
        image={image}
      />

      <div
        className="
          absolute

          bottom-[14px]
          left-[14px]
          right-[14px]

          flex
          min-h-[52px]

          items-center
          justify-between

          rounded-[11px]

          border
          border-white/[0.09]

          bg-black/55

          px-[12px]

          backdrop-blur-[12px]
        "
      >
        <ClosingLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
          isLight={isLight}
        />

        <p
          className="
            text-[7px]

            text-white/25
          "
        >
          Thank you for watching
        </p>
      </div>
    </>
  );
}

/* ================================================= */
/* CTA END CARD                                      */
/* ================================================= */

function CTAEndCard({
  model,
  brandA,
  brandB,
  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  image:
    number;

  isLight:
    boolean;
}) {
  const primary =
    model ===
    "poweredByA"
      ? brandB
      : brandA;

  const secondary =
    primary === brandA
      ? brandB
      : brandA;

  const eyebrowColour =
    isLight
      ? "rgba(10,10,10,.42)"
      : "rgba(255,255,255,.28)";

  const titleColour =
    isLight
      ? "rgba(10,10,10,.82)"
      : "rgba(255,255,255,.76)";

  return (
    <>
      <ClosingBackground
        image={image}
      />

      <div
        className="
          absolute

          bottom-[24px]
          left-[24px]

          w-[48%]

          rounded-[13px]

          border
          border-white/[0.09]

          bg-black/55

          p-[13px]

          backdrop-blur-[12px]
        "
      >
        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.12em]
          "
          style={{
            color:
              eyebrowColour,
          }}
        >
          Continue the experience
        </p>

        <p
          className="
            mt-[5px]

            text-[14px]

            oook-medium
          "
          style={{
            color:
              titleColour,
          }}
        >
          Discover more
        </p>

        <button
          type="button"
          className="
            mt-[10px]

            rounded-full

            border
            border-white/[0.11]

            bg-white

            px-[11px]
            py-[6px]

            text-[7px]

            text-black
          "
        >
          Visit experience →
        </button>
      </div>

      <div
        className="
          absolute

          right-[20px]
          top-[20px]
        "
      >
        <ClosingLogo
          brand={secondary}
          width={80}
          isLight={isLight}
          floating
        />
      </div>

      <div
        className="
          absolute

          bottom-[18px]
          right-[20px]
        "
      >
        <ClosingLogo
          brand={primary}
          width={100}
          isLight={isLight}
          floating
        />
      </div>
    </>
  );
}

/* ================================================= */
/* MINIMAL CLOSING                                   */
/* ================================================= */

function MinimalClosing({
  model,
  brandA,
  brandB,
  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  image:
    number;

  isLight:
    boolean;
}) {
  return (
    <>
      <ClosingBackground
        image={image}
      />

      <div
        className="
          absolute
          inset-0

          flex
          items-center
          justify-center
        "
      >
        <ClosingLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
          isLight={isLight}
          minimal
        />
      </div>

      <div
        className="
          absolute

          bottom-[13px]
          left-1/2

          h-px
          w-[34%]

          -translate-x-1/2

          bg-white/[0.08]
        "
      />
    </>
  );
}

/* ================================================= */
/* LOCKUP                                            */
/* ================================================= */

function ClosingLockup({
  model,
  brandA,
  brandB,
  isLight,
  large = false,
  minimal = false,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  isLight:
    boolean;

  large?: boolean;
  minimal?: boolean;
}) {
  const equalWidth =
    large
      ? 146
      : minimal
        ? 96
        : 70;

  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          gap-[13px]
        "
      >
        <ClosingLogo
          brand={brandA}
          width={equalWidth}
          isLight={isLight}
          floating
        />

        <Symbol>
          ×
        </Symbol>

        <ClosingLogo
          brand={brandB}
          width={equalWidth}
          isLight={isLight}
          floating
        />
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
          items-center
          justify-center

          gap-[11px]
        "
      >
        <ClosingLogo
          brand={brandA}
          width={
            large
              ? 165
              : minimal
                ? 110
                : 78
          }
          isLight={isLight}
          floating
        />

        <Relationship>
          with
        </Relationship>

        <ClosingLogo
          brand={brandB}
          width={
            large
              ? 88
              : minimal
                ? 58
                : 42
          }
          isLight={isLight}
          floating
        />
      </div>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          gap-[11px]
        "
      >
        <ClosingLogo
          brand={brandB}
          width={
            large
              ? 175
              : minimal
                ? 118
                : 82
          }
          isLight={isLight}
          floating
        />

        <Relationship>
          powered by
        </Relationship>

        <ClosingLogo
          brand={brandA}
          width={
            large
              ? 70
              : minimal
                ? 50
                : 34
          }
          isLight={isLight}
          floating
        />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        justify-center

        gap-[11px]
      "
    >
      <ClosingLogo
        brand={brandA}
        width={
          large
            ? 86
            : minimal
              ? 62
              : 38
        }
        isLight={isLight}
        floating
      />

      <Relationship>
        presents
      </Relationship>

      <ClosingLogo
        brand={brandB}
        width={
          large
            ? 160
            : minimal
              ? 108
              : 78
        }
        isLight={isLight}
        floating
      />
    </div>
  );
}

/* ================================================= */
/* LOGO                                              */
/* ================================================= */

function ClosingLogo({
  brand,
  width,
  isLight,
  floating = false,
}: {
  brand:
    BrandView;

  width:
    number;

  isLight:
    boolean;

  floating?:
    boolean;
}) {
  const shadow =
    !floating
      ? "none"
      : isLight
        ? `
          drop-shadow(
            0 8px 22px
            rgba(255,255,255,.90)
          )
          drop-shadow(
            0 0 7px
            rgba(255,255,255,.58)
          )
        `
        : `
          drop-shadow(
            0 8px 22px
            rgba(0,0,0,.62)
          )
          drop-shadow(
            0 2px 5px
            rgba(0,0,0,.64)
          )
        `;

  return (
    <div
      className="
        flex
        shrink-0

        items-center
        justify-center
      "
      style={{
        width,

        height:
          Math.max(
            18,
            width / 3
          ),

        filter:
          shadow,
      }}
    >
      <BrandLogo
        logoUrl={
          brand.logoUrl
        }
        fallback={
          brand.name
        }
      />
    </div>
  );
}

/* ================================================= */
/* SMALL ELEMENTS                                    */
/* ================================================= */

function Symbol({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        shrink-0

        text-[15px]

        text-white/38
      "
    >
      {children}
    </span>
  );
}

function Relationship({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        shrink-0

        whitespace-nowrap

        text-[7px]
        uppercase
        tracking-[0.11em]

        text-white/28
      "
    >
      {children}
    </span>
  );
}