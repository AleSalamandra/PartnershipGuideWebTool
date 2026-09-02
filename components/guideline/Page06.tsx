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

type BrandRole =
  | "equal"
  | "brandALead"
  | "brandBLead";

interface HierarchyConfig {
  brandA:
    number;

  brandB:
    number;

  role:
    BrandRole;
}

interface BrandView {
  name:
    string;

  logoUrl:
    string | null;
}


/* ================================================= */
/* HIERARCHY                                         */
/* ================================================= */

const BRAND_HIERARCHY:
  Record<
    PartnershipModelId,
    HierarchyConfig
  > = {
  axb: {
    brandA:
      50,

    brandB:
      50,

    role:
      "equal",
  },

  aandb: {
    brandA:
      68,

    brandB:
      32,

    role:
      "brandALead",
  },

  poweredByA: {
    brandA:
      15,

    brandB:
      85,

    role:
      "brandBLead",
  },

  presentsB: {
    brandA:
      35,

    brandB:
      65,

    role:
      "brandBLead",
  },
};


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
/* PAGE                                              */
/* ================================================= */

export default function Page06() {
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
    theme ===
    "light";

  const model =
    partnershipModel as PartnershipModelId;

  const hierarchy =
    BRAND_HIERARCHY[
      model
    ];

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
      4,
      7,
      9,
    ]);

  useEffect(
    () => {
      const available =
        [
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
        [
          ...available,
        ].sort(
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

          left-[76px]
          right-[76px]
          top-[62px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.16em]

              text-white/28
            "
          >
            06 / Content identity
          </p>

          <h1
            className="
              mt-[15px]

              whitespace-nowrap

              text-[52px]
              leading-[0.95]
              tracking-[-0.05em]

              text-white

              oook-semibold
            "
          >
            Content branding applications
          </h1>

          <p
            className="
              mt-[15px]

              max-w-[760px]

              text-[16px]
              leading-[1.4]

              text-white/40
            "
          >
            Four recurring content applications showing how partnership hierarchy remains visible without interrupting the experience.
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* ======================================== */}
      {/* APPLICATION GRID                         */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[74px]
          left-[76px]
          right-[76px]
          top-[250px]

          grid
          grid-cols-2
          grid-rows-2

          gap-x-[26px]
          gap-y-[22px]
        "
      >
        <ApplicationCard
          number="01"

          title="Hero frame"

          description={
            model ===
            "axb"
              ? "Equal brand presence"
              : model ===
                  "aandb"
                ? "Brand A-led hero"
                : model ===
                    "poweredByA"
                  ? "Brand B consumer identity"
                  : "Featured Brand B content"
          }
        >
          <HeroApplication
            model={model}
            hierarchy={
              hierarchy
            }
            brandA={a}
            brandB={b}
            image={
              images[0]
            }
            isLight={
              isLight
            }
          />
        </ApplicationCard>

        <ApplicationCard
          number="02"

          title="Lower third"

          description="Persistent shared identity"
        >
          <LowerThirdApplication
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
        </ApplicationCard>

        <ApplicationCard
          number="03"

          title="Information overlay"

          description="Neutral co-branded UI"
        >
          <OverlayApplication
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
        </ApplicationCard>

        <ApplicationCard
          number="04"

          title="Transition"

          description={
            getTransitionDescription(
              model
            )
          }
        >
          <TransitionApplication
            model={model}
            hierarchy={
              hierarchy
            }
            brandA={a}
            brandB={b}
            image={
              images[3]
            }
            isLight={
              isLight
            }
          />
        </ApplicationCard>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[39px]
          left-[76px]
          right-[76px]

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
          Examples are indicative — adapt placement to content, format and legibility.
        </p>

        <p
          className="
            text-[9px]

            text-white/22
          "
        >
          Safe area · Hierarchy · Contrast · Motion · Clear space
        </p>
      </div>
    </GuidelinePage>
  );
}


/* ================================================= */
/* CARD                                              */
/* ================================================= */

function ApplicationCard({
  number,
  title,
  description,
  children,
}: {
  number:
    string;

  title:
    string;

  description:
    string;

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

function FrameBackground({
  image,
}: {
  image:
    number;
}) {
  const [
    extension,
    setExtension,
  ] =
    useState(0);

  useEffect(
    () => {
      setExtension(
        0
      );
    },
    [image]
  );

  return (
    <div
      className="
        absolute
        inset-0

        overflow-hidden
      "
      style={{
        filter:
          "grayscale(0.95) contrast(1.03)",
      }}
    >
      <img
        src={`/images/image${image}.${IMAGE_EXTENSIONS[extension]}`}
        alt=""
        draggable={
          false
        }
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
  );
}


function FrameTreatment() {
  return (
    <>
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b

          from-transparent
          via-transparent
          to-black/36
        "
      />

      <div
        className="
          absolute
          inset-0

          opacity-[0.045]

          mix-blend-screen
        "
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,rgba(255,255,255,.12) 0px,rgba(255,255,255,.12) 1px,transparent 1px,transparent 3px)",
        }}
      />
    </>
  );
}


/* ================================================= */
/* HERO                                              */
/* ================================================= */

function HeroApplication({
  model,
  hierarchy,
  brandA,
  brandB,
  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  hierarchy:
    HierarchyConfig;

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
      <FrameBackground
        image={
          image
        }
      />

      <FrameTreatment />

      <div
        className="
          absolute
          inset-0

          flex
          items-center
          justify-center
        "
      >
        {model ===
          "axb" && (
          <div
            className="
              flex
              w-[68%]

              items-center
              justify-center

              gap-[22px]
            "
          >
            <FloatingLogo
              brand={
                brandA
              }
              mode="equal"
              isLight={
                isLight
              }
            />

            <Symbol>
              ×
            </Symbol>

            <FloatingLogo
              brand={
                brandB
              }
              mode="equal"
              isLight={
                isLight
              }
            />
          </div>
        )}

        {model ===
          "aandb" && (
          <div
            className="
              flex
              w-[70%]

              items-center
              justify-center

              gap-[18px]
            "
          >
            <FloatingLogo
              brand={
                brandA
              }
              mode="lead"
              isLight={
                isLight
              }
            />

            <Relationship>
              with
            </Relationship>

            <FloatingLogo
              brand={
                brandB
              }
              mode="support"
              isLight={
                isLight
              }
            />
          </div>
        )}

        {model ===
          "poweredByA" && (
          <div
            className="
              flex
              w-[72%]

              items-center
              justify-center

              gap-[16px]
            "
          >
            <FloatingLogo
              brand={
                brandB
              }
              mode="lead"
              isLight={
                isLight
              }
            />

            <Relationship>
              powered by
            </Relationship>

            <FloatingLogo
              brand={
                brandA
              }
              mode="endorsement"
              isLight={
                isLight
              }
            />
          </div>
        )}

        {model ===
          "presentsB" && (
          <div
            className="
              flex
              w-[72%]

              items-center
              justify-center

              gap-[16px]
            "
          >
            <FloatingLogo
              brand={
                brandA
              }
              mode="support"
              isLight={
                isLight
              }
            />

            <Relationship>
              presents
            </Relationship>

            <FloatingLogo
              brand={
                brandB
              }
              mode="lead"
              isLight={
                isLight
              }
            />
          </div>
        )}
      </div>

      <div
        className="
          absolute

          bottom-[12px]
          right-[14px]

          text-[7px]

          text-white/20
        "
      >
        A {hierarchy.brandA}% · B {hierarchy.brandB}%
      </div>
    </>
  );
}


/* ================================================= */
/* LOWER THIRD                                       */
/* ================================================= */

function LowerThirdApplication({
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
      <FrameBackground
        image={
          image
        }
      />

      <FrameTreatment />

      <div
        className="
          absolute

          bottom-[14px]
          left-[14px]
          right-[14px]

          flex
          min-h-[50px]

          items-center

          rounded-[11px]

          border
          border-white/[0.09]

          bg-black/55

          px-[12px]

          backdrop-blur-[12px]
        "
      >
        <LowerThirdIdentity
          model={model}
          brandA={brandA}
          brandB={brandB}
          isLight={isLight}
        />

        <div
          className="
            mx-[12px]

            h-[25px]
            w-px

            bg-white/[0.08]
          "
        />

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              truncate

              text-[9px]

              text-white/59
            "
          >
            Headline or key message
          </p>

          <p
            className="
              mt-[2px]

              text-[7px]

              text-white/24
            "
          >
            Persistent identity
          </p>
        </div>
      </div>
    </>
  );
}


function LowerThirdIdentity({
  model,
  brandA,
  brandB,
  isLight,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  isLight:
    boolean;
}) {
  if (
    model ===
    "axb"
  ) {
    return (
      <div
        className="
          flex
          items-center

          gap-[7px]
        "
      >
        <MiniLogo
          brand={brandA}
          width={66}
          isLight={isLight}
        />

        <Symbol>
          ×
        </Symbol>

        <MiniLogo
          brand={brandB}
          width={66}
          isLight={isLight}
        />
      </div>
    );
  }

  if (
    model ===
    "aandb"
  ) {
    return (
      <div
        className="
          flex
          items-center

          gap-[7px]
        "
      >
        <MiniLogo
          brand={brandA}
          width={78}
          isLight={isLight}
        />

        <Relationship>
          with
        </Relationship>

        <MiniLogo
          brand={brandB}
          width={42}
          isLight={isLight}
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

          gap-[7px]
        "
      >
        <MiniLogo
          brand={brandB}
          width={84}
          isLight={isLight}
        />

        <Relationship>
          powered by
        </Relationship>

        <MiniLogo
          brand={brandA}
          width={34}
          isLight={isLight}
        />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        items-center

        gap-[7px]
      "
    >
      <MiniLogo
        brand={brandA}
        width={38}
        isLight={isLight}
      />

      <Relationship>
        presents
      </Relationship>

      <MiniLogo
        brand={brandB}
        width={78}
        isLight={isLight}
      />
    </div>
  );
}


/* ================================================= */
/* OVERLAY                                           */
/* ================================================= */

function OverlayApplication({
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
      <FrameBackground
        image={
          image
        }
      />

      <FrameTreatment />

      <div
        className="
          absolute

          left-[15px]
          top-[15px]

          flex
          w-[44%]

          items-center

          rounded-[11px]

          border
          border-white/[0.08]

          bg-black/55

          px-[11px]
          py-[10px]

          backdrop-blur-[12px]
        "
      >
        <div
          className="
            flex
            h-[36px]
            w-[36px]

            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-white/[0.10]
          "
        >
          <span
            className="
              text-[11px]

              text-white/55
            "
          >
            65%
          </span>
        </div>

        <div
          className="
            ml-[10px]
          "
        >
          <p
            className="
              text-[9px]

              text-white/57
            "
          >
            Key metric
          </p>

          <p
            className="
              mt-[2px]

              text-[7px]

              text-white/24
            "
          >
            Short supporting information.
          </p>
        </div>
      </div>

      <OverlayFooter
        model={model}
        brandA={brandA}
        brandB={brandB}
        isLight={isLight}
      />
    </>
  );
}


function OverlayFooter({
  model,
  brandA,
  brandB,
  isLight,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  isLight:
    boolean;
}) {
  return (
    <div
      className="
        absolute

        bottom-[12px]
        left-[12px]
        right-[12px]

        flex
        items-center
        justify-between
      "
    >
      <MiniLogo
        brand={
          model ===
          "poweredByA"
            ? brandB
            : brandA
        }
        width={
          model ===
          "axb"
            ? 62
            : model ===
                "aandb"
              ? 76
              : model ===
                  "poweredByA"
                ? 82
                : 36
        }
        isLight={
          isLight
        }
      />

      <MiniLogo
        brand={
          model ===
          "poweredByA"
            ? brandA
            : brandB
        }
        width={
          model ===
          "axb"
            ? 62
            : model ===
                "aandb"
              ? 40
              : model ===
                  "poweredByA"
                ? 32
                : 76
        }
        isLight={
          isLight
        }
      />
    </div>
  );
}


/* ================================================= */
/* TRANSITION                                        */
/* ================================================= */

function TransitionApplication({
  model,
  hierarchy,
  brandA,
  brandB,
  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  hierarchy:
    HierarchyConfig;

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
      <FrameBackground
        image={
          image
        }
      />

      <FrameTreatment />

      <TransitionLines />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          w-[68%]

          -translate-x-1/2
          -translate-y-1/2
        "
      >
        {model ===
          "axb" && (
          <div
            className="
              flex
              items-center
              justify-center

              gap-[18px]
            "
          >
            <div
              className="
                w-[39%]
              "
            >
              <TransitionLogo
                brand={
                  brandA
                }
                isLight={
                  isLight
                }
              />
            </div>

            <Symbol>
              ×
            </Symbol>

            <div
              className="
                w-[39%]
              "
            >
              <TransitionLogo
                brand={
                  brandB
                }
                isLight={
                  isLight
                }
              />
            </div>
          </div>
        )}

        {model ===
          "aandb" && (
          <div
            className="
              flex
              items-center
              justify-center

              gap-[16px]
            "
          >
            <div
              className="
                w-[46%]
              "
            >
              <TransitionLogo
                brand={
                  brandA
                }
                isLight={
                  isLight
                }
              />
            </div>

            <Relationship>
              with
            </Relationship>

            <div
              className="
                w-[24%]
              "
            >
              <TransitionLogo
                brand={
                  brandB
                }
                isLight={
                  isLight
                }
              />
            </div>
          </div>
        )}

        {model ===
          "poweredByA" && (
          <div
            className="
              flex
              items-center
              justify-center

              gap-[14px]
            "
          >
            <div
              className="
                w-[52%]
              "
            >
              <TransitionLogo
                brand={
                  brandB
                }
                isLight={
                  isLight
                }
              />
            </div>

            <Relationship>
              powered by
            </Relationship>

            <div
              className="
                w-[18%]
              "
            >
              <TransitionLogo
                brand={
                  brandA
                }
                isLight={
                  isLight
                }
              />
            </div>
          </div>
        )}

        {model ===
          "presentsB" && (
          <div
            className="
              flex
              items-center
              justify-center

              gap-[14px]
            "
          >
            <div
              className="
                w-[23%]
              "
            >
              <TransitionLogo
                brand={
                  brandA
                }
                isLight={
                  isLight
                }
              />
            </div>

            <Relationship>
              presents
            </Relationship>

            <div
              className="
                w-[46%]
              "
            >
              <TransitionLogo
                brand={
                  brandB
                }
                isLight={
                  isLight
                }
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="
          absolute

          bottom-[12px]
          right-[13px]

          text-[7px]

          text-white/19
        "
      >
        A {hierarchy.brandA}% · B {hierarchy.brandB}%
      </div>
    </>
  );
}


function TransitionLines() {
  return (
    <>
      <div
        className="
          absolute

          -left-[65px]
          top-[15%]

          h-[70%]
          w-[150px]

          rounded-[50%]

          border
          border-white/[0.13]
        "
      />

      <div
        className="
          absolute

          -left-[45px]
          top-[24%]

          h-[52%]
          w-[105px]

          rounded-[50%]

          border
          border-white/[0.07]
        "
      />

      <div
        className="
          absolute

          -right-[65px]
          top-[15%]

          h-[70%]
          w-[150px]

          rounded-[50%]

          border
          border-white/[0.13]
        "
      />

      <div
        className="
          absolute

          -right-[45px]
          top-[24%]

          h-[52%]
          w-[105px]

          rounded-[50%]

          border
          border-white/[0.07]
        "
      />
    </>
  );
}


/* ================================================= */
/* LOGOS                                             */
/* ================================================= */

function FloatingLogo({
  brand,
  mode,
  isLight,
}: {
  brand:
    BrandView;

  mode:
    | "equal"
    | "lead"
    | "support"
    | "endorsement";

  isLight:
    boolean;
}) {
  const width =
    mode ===
    "equal"
      ? 150
      : mode ===
          "lead"
        ? 190
        : mode ===
            "support"
          ? 105
          : 70;

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
            26,
            width / 3
          ),

        filter:
          getLogoShadow(
            isLight,
            true
          ),
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


function MiniLogo({
  brand,
  width,
  isLight,
}: {
  brand:
    BrandView;

  width:
    number;

  isLight:
    boolean;
}) {
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
            15,
            width / 3
          ),

        filter:
          getLogoShadow(
            isLight,
            false
          ),
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


function TransitionLogo({
  brand,
  isLight,
}: {
  brand:
    BrandView;

  isLight:
    boolean;
}) {
  return (
    <div
      className="
        flex

        h-[48px]
        w-full

        items-center
        justify-center
      "
      style={{
        filter:
          getLogoShadow(
            isLight,
            true
          ),
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


function getLogoShadow(
  isLight:
    boolean,

  strong:
    boolean
) {
  if (
    isLight
  ) {
    return strong
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
          0 3px 10px
          rgba(255,255,255,.62)
        )
      `;
  }

  return strong
    ? `
      drop-shadow(
        0 8px 22px
        rgba(0,0,0,.62)
      )
      drop-shadow(
        0 2px 5px
        rgba(0,0,0,.65)
      )
    `
    : `
      drop-shadow(
        0 3px 10px
        rgba(0,0,0,.38)
      )
    `;
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

        text-white/29
      "
    >
      {children}
    </span>
  );
}


/* ================================================= */
/* DESCRIPTION                                      */
/* ================================================= */

function getTransitionDescription(
  model:
    PartnershipModelId
) {
  switch (model) {
    case "axb":
      return "Brand A × Brand B";

    case "aandb":
      return "Brand A leads the transition";

    case "poweredByA":
      return "Brand B with Brand A endorsement";

    case "presentsB":
    default:
      return "Brand A introduces Brand B";
  }
}