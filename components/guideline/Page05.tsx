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

import GuidelineMediaImage from "./GuidelineMediaImage";
import PartnershipLockup from "./PartnershipLockup";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  GuidelineImageSlot,
} from "@/store/guidelineMediaStore";

import type {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const RESERVED_IMAGE:
  GuidelineImageSlot = 6;

const AVAILABLE_IMAGES:
  GuidelineImageSlot[] = [
    1,
    2,
    3,
    4,
    5,
    7,
    8,
    9,
    10,
  ];

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type FrameKind =
  | "atmosphere"
  | "brandA"
  | "brandB"
  | "property"
  | "connector"
  | "lockup"
  | "content";

interface FrameSpec {
  id:
    string;

  title:
    string;

  kind:
    FrameKind;

  text?:
    string;
}

/* ================================================= */
/* IMAGE SEQUENCE                                    */
/* ================================================= */

function createImageSequence():
  GuidelineImageSlot[] {
  const pool = [
    ...AVAILABLE_IMAGES,
  ];

  for (
    let i =
      pool.length - 1;
    i >
    0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (
            i +
            1
          )
      );

    [
      pool[i],
      pool[j],
    ] = [
      pool[j],
      pool[i],
    ];
  }

  /*
    IMPORTANT:

    image6 is reserved for KF02 and KF04.

    It must not appear in the other keyframes.
  */

  return [
    pool[0],
    RESERVED_IMAGE,
    pool[1],
    RESERVED_IMAGE,
    pool[2],
    pool[3],
  ];
}

/* ================================================= */
/* FLOW                                              */
/* ================================================= */

function getBaseFlow(
  model:
    PartnershipModelId,

  a:
    string,

  b:
    string
): FrameSpec[] {
  switch (
    model
  ) {
    /* ------------------------------------------------ */
    /* A × B                                            */
    /* ------------------------------------------------ */

    case "axb":
      return [
        {
          id:
            "01",

          title:
            "Atmosphere",

          kind:
            "atmosphere",
        },

        {
          id:
            "02",

          title:
            a,

          kind:
            "brandA",
        },

        {
          id:
            "03",

          title:
            "×",

          kind:
            "connector",

          text:
            "×",
        },

        {
          id:
            "04",

          title:
            b,

          kind:
            "brandB",
        },

        {
          id:
            "05",

          title:
            `${a} × ${b}`,

          kind:
            "lockup",
        },

        {
          id:
            "06",

          title:
            "Content",

          kind:
            "content",
        },
      ];

    /* ------------------------------------------------ */
    /* A WITH B                                         */
    /* ------------------------------------------------ */

    case "aandb":
      return [
        {
          id:
            "01",

          title:
            "Atmosphere",

          kind:
            "atmosphere",
        },

        {
          id:
            "02",

          title:
            a,

          kind:
            "brandA",
        },

        {
          id:
            "03",

          title:
            "with",

          kind:
            "connector",

          text:
            "with",
        },

        {
          id:
            "04",

          title:
            b,

          kind:
            "brandB",
        },

        {
          id:
            "05",

          title:
            `${a} with ${b}`,

          kind:
            "lockup",
        },

        {
          id:
            "06",

          title:
            "Content",

          kind:
            "content",
        },
      ];

    /* ------------------------------------------------ */
    /* B POWERED BY A                                   */
    /* ------------------------------------------------ */

    case "poweredByA":
      return [
        {
          id:
            "01",

          title:
            "Atmosphere",

          kind:
            "atmosphere",
        },

        {
          id:
            "02",

          title:
            b,

          kind:
            "brandB",
        },

        {
          id:
            "03",

          title:
            "Powered by",

          kind:
            "connector",

          text:
            "Powered by",
        },

        {
          id:
            "04",

          title:
            a,

          kind:
            "brandA",
        },

        {
          id:
            "05",

          title:
            `${b} powered by ${a}`,

          kind:
            "lockup",
        },

        {
          id:
            "06",

          title:
            "Content",

          kind:
            "content",
        },
      ];

    /* ------------------------------------------------ */
    /* A PRESENTS B                                     */
    /* ------------------------------------------------ */

    case "presentsB":
    default:
      return [
        {
          id:
            "01",

          title:
            "Atmosphere",

          kind:
            "atmosphere",
        },

        {
          id:
            "02",

          title:
            a,

          kind:
            "brandA",
        },

        {
          id:
            "03",

          title:
            "Presents",

          kind:
            "connector",

          text:
            "Presents",
        },

        {
          id:
            "04",

          title:
            b,

          kind:
            "brandB",
        },

        {
          id:
            "05",

          title:
            `${a} presents ${b}`,

          kind:
            "lockup",
        },

        {
          id:
            "06",

          title:
            "Content",

          kind:
            "content",
        },
      ];
  }
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page05() {
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

  const aName =
    brandA.name.trim() ||
    "Brand A";

  const bName =
    brandB.name.trim() ||
    "Brand B";

  const xName =
    propertyX.name.trim() ||
    "Property X";

  const [
    images,
    setImages,
  ] =
    useState<GuidelineImageSlot[]>([
      1,
      6,
      2,
      6,
      3,
      4,
    ]);

  useEffect(
    () => {
      setImages(
        createImageSequence()
      );
    },
    [
      model,
      additionalRelationship,
    ]
  );

  const frames =
    getBaseFlow(
      model,
      aName,
      bName
    );

  /* ------------------------------------------------ */
  /* PRESENTING X                                     */
  /* ------------------------------------------------ */

  /*
    Presenting X does NOT replace the underlying
    A / B partnership model.

    KF01 introduces X.

    KF05 resolves:
      A / B business relationship
      +
      presenting X.
  */

  if (
    additionalRelationship ===
    "presenting"
  ) {
    frames[0] = {
      id:
        "01",

      title:
        xName,

      kind:
        "property",
    };

    frames[4] = {
      id:
        "05",

      title:
        `${frames[4].title} · presenting ${xName}`,

      kind:
        "lockup",
    };
  }

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header className="absolute left-[90px] right-[90px] top-[60px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.16em] text-white/30">
            05 / Opening motion
          </p>

          <h1 className="mt-[16px] text-[58px] leading-none tracking-[-0.05em] oook-semibold">
            Video opening keyframes
          </h1>

          <p className="mt-[15px] max-w-[720px] text-[16px] leading-[1.45] text-white/40">
            Brand hierarchy is introduced progressively rather than displaying every identity at once.
          </p>

          {/* ==================================== */}
          {/* YB STUDIOS PRODUCTION RULE           */}
          {/* ==================================== */}

          <div
            className="
              mt-[4px]

              inline-flex
              max-w-[1200px]

              items-center
              gap-[14px]

              rounded-[11px]

              border
              border-white/[0.4]

              bg-white/[0.05]

              px-[16px]
              py-[9px]
            "
          >
            <span
              className="
                shrink-0

                rounded-full

                bg-white

                px-[9px]
                py-[5px]

                text-[10px]
                uppercase
                tracking-[0.12em]

                text-black

                oook-medium
              "
            >
              Production rule
            </span>

            <p
              className="
                text-[12px]
                leading-[1.4]

                text-white/45
              "
            >
              Any video produced by YB Studios must be preceded by the YB Studios signature — a dedicated studio intro before the partnership opening sequence.
            </p>
          </div>
        </div>

        <PartnershipLockup
          model={
            model
          }
          brandA={
            brandA
          }
          brandB={
            brandB
          }
        />
      </header>

      {/* ======================================== */}
      {/* KEYFRAMES                                */}
      {/* ======================================== */}

      <section className="absolute bottom-[60px] left-[90px] right-[90px] top-[230px] grid grid-cols-3 grid-rows-2 gap-[18px]">
        {frames.map(
          (
            frame,
            index
          ) => (
            <Keyframe
              key={
                frame.id
              }
              frame={
                frame
              }
              slot={
                images[
                  index
                ]
              }
              model={
                model
              }
              brandA={
                brandA
              }
              brandB={
                brandB
              }
              propertyX={
                propertyX
              }
              relationship={
                additionalRelationship
              }
              isLight={
                isLight
              }
            />
          )
        )}
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* KEYFRAME                                          */
/* ================================================= */

function Keyframe({
  frame,
  slot,
  model,
  brandA,
  brandB,
  propertyX,
  relationship,
  isLight,
}: {
  frame:
    FrameSpec;

  slot:
    GuidelineImageSlot;

  model:
    PartnershipModelId;

  brandA:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandA"];

  brandB:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandB"];

  propertyX:
    ReturnType<
      typeof useGuidelineStore.getState
    >["propertyX"];

  relationship:
    string;

  isLight:
    boolean;
}) {
  const isBrandFrame =
    frame.kind ===
      "brandA" ||
    frame.kind ===
      "brandB" ||
    frame.kind ===
      "property";

  const isLockupFrame =
    frame.kind ===
    "lockup";

  const washOpacity =
    isBrandFrame
      ? 0.78
      : isLockupFrame
        ? 0.48
        : 0.28;

  return (
    <article className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-black">
      {/* ======================================== */}
      {/* DESATURATED IMAGE                        */}
      {/* ======================================== */}

      <GuidelineMediaImage
        slot={
          slot
        }
        treatmentFilter="grayscale(.96) saturate(.16) contrast(1.03)"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ======================================== */}
      {/* TONAL WASH                               */}
      {/* ======================================== */}

      <div
        className="absolute inset-0"
        style={{
          backgroundColor:
            isLight
              ? `rgba(255,255,255,${washOpacity})`
              : `rgba(0,0,0,${washOpacity})`,
        }}
      />

      {/* ======================================== */}
      {/* FRAME LABEL                              */}
      {/* ======================================== */}

      <div className="absolute left-[15px] top-[13px] z-10 flex items-center gap-[8px]">
        <span className="text-[7px] text-white/25">
          {frame.id}
        </span>

        <span className="text-[8px] text-white/48">
          {frame.title}
        </span>
      </div>

      {/* ======================================== */}
      {/* FRAME CONTENT                            */}
      {/* ======================================== */}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <FrameContent
          frame={
            frame
          }
          model={
            model
          }
          brandA={
            brandA
          }
          brandB={
            brandB
          }
          propertyX={
            propertyX
          }
          relationship={
            relationship
          }
        />
      </div>

      {/* ======================================== */}
      {/* SPONSORED X                              */}
      {/* ======================================== */}

      {relationship ===
        "sponsored" &&
        frame.id ===
          "05" && (
          <div className="absolute bottom-[12px] right-[14px] z-20 flex items-center gap-[7px]">
            <span className="text-[6px] uppercase tracking-[0.12em] text-white/30">
              Sponsored by
            </span>

            <div className="h-[22px] w-[78px]">
              <BrandLogo
                logoUrl={
                  propertyX.logoUrl
                }
                fallback={
                  propertyX.name
                }
              />
            </div>
          </div>
        )}
    </article>
  );
}

/* ================================================= */
/* FRAME CONTENT                                     */
/* ================================================= */

function FrameContent({
  frame,
  model,
  brandA,
  brandB,
  propertyX,
  relationship,
}: {
  frame:
    FrameSpec;

  model:
    PartnershipModelId;

  brandA:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandA"];

  brandB:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandB"];

  propertyX:
    ReturnType<
      typeof useGuidelineStore.getState
    >["propertyX"];

  relationship:
    string;
}) {
  /* ------------------------------------------------ */
  /* ATMOSPHERE                                       */
  /* ------------------------------------------------ */

  if (
    frame.kind ===
    "atmosphere"
  ) {
    return (
      <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
        Atmosphere
      </span>
    );
  }

  /* ------------------------------------------------ */
  /* CONNECTOR                                        */
  /* ------------------------------------------------ */

  if (
    frame.kind ===
    "connector"
  ) {
    return (
      <span className="text-[22px] text-white/80 oook-light">
        {frame.text}
      </span>
    );
  }

  /* ------------------------------------------------ */
  /* CONTENT                                          */
  /* ------------------------------------------------ */

  if (
    frame.kind ===
    "content"
  ) {
    return (
      <span className="text-[12px] uppercase tracking-[0.18em] text-white/65">
        Content begins
      </span>
    );
  }

  /* ------------------------------------------------ */
  /* BRAND A                                          */
  /* ------------------------------------------------ */

  if (
    frame.kind ===
    "brandA"
  ) {
    return (
      <Logo
        brand={
          brandA
        }
      />
    );
  }

  /* ------------------------------------------------ */
  /* BRAND B                                          */
  /* ------------------------------------------------ */

  if (
    frame.kind ===
    "brandB"
  ) {
    return (
      <Logo
        brand={
          brandB
        }
      />
    );
  }

  /* ------------------------------------------------ */
  /* PROPERTY X                                       */
  /* ------------------------------------------------ */

  if (
    frame.kind ===
    "property"
  ) {
    return (
      <Logo
        brand={
          propertyX
        }
      />
    );
  }

  /* ------------------------------------------------ */
  /* KF05 — COMPLETE RELATIONSHIP                     */
  /* ------------------------------------------------ */

  return (
    <CompleteRelationshipLockup
      model={
        model
      }
      brandA={
        brandA
      }
      brandB={
        brandB
      }
      propertyX={
        propertyX
      }
      presenting={
        relationship ===
        "presenting"
      }
    />
  );
}

/* ================================================= */
/* COMPLETE RELATIONSHIP                             */
/* ================================================= */

function CompleteRelationshipLockup({
  model,
  brandA,
  brandB,
  propertyX,
  presenting,
}: {
  model:
    PartnershipModelId;

  brandA:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandA"];

  brandB:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandB"];

  propertyX:
    ReturnType<
      typeof useGuidelineStore.getState
    >["propertyX"];

  presenting:
    boolean;
}) {
  return (
    <div
      className="
        flex
        max-w-[88%]

        flex-col
        items-center
      "
    >
      {/* ======================================== */}
      {/* BASE BUSINESS MODEL                      */}
      {/* ======================================== */}

      <BusinessModelLockup
        model={
          model
        }
        brandA={
          brandA
        }
        brandB={
          brandB
        }
      />

      {/* ======================================== */}
      {/* PRESENTING PROPERTY X                    */}
      {/* ======================================== */}

      {presenting && (
        <>
          <p
            className="
              my-[10px]

              text-[6px]
              uppercase
              tracking-[0.18em]

              text-white/34
            "
          >
            Present
          </p>

          <div className="h-[46px] w-[175px]">
            <BrandLogo
              logoUrl={
                propertyX.logoUrl
              }
              fallback={
                propertyX.name
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

/* ================================================= */
/* BUSINESS MODEL LOCKUP                             */
/* ================================================= */

function BusinessModelLockup({
  model,
  brandA,
  brandB,
}: {
  model:
    PartnershipModelId;

  brandA:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandA"];

  brandB:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandB"];
}) {
  /* ------------------------------------------------ */
  /* A × B                                            */
  /* ------------------------------------------------ */

  if (
    model ===
    "axb"
  ) {
    return (
      <div className="flex items-center gap-[12px]">
        <MiniLogo
          brand={
            brandA
          }
          width={
            105
          }
        />

        <span className="text-[15px] text-white/42">
          ×
        </span>

        <MiniLogo
          brand={
            brandB
          }
          width={
            105
          }
        />
      </div>
    );
  }

  /* ------------------------------------------------ */
  /* A WITH B                                         */
  /* ------------------------------------------------ */

  if (
    model ===
    "aandb"
  ) {
    return (
      <div className="flex items-center gap-[10px]">
        <MiniLogo
          brand={
            brandA
          }
          width={
            112
          }
        />

        <RelationshipLabel>
          with
        </RelationshipLabel>

        <MiniLogo
          brand={
            brandB
          }
          width={
            82
          }
        />
      </div>
    );
  }

  /* ------------------------------------------------ */
  /* B POWERED BY A                                   */
  /* ------------------------------------------------ */

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div className="flex items-center gap-[9px]">
        <MiniLogo
          brand={
            brandB
          }
          width={
            112
          }
        />

        <RelationshipLabel>
          powered by
        </RelationshipLabel>

        <MiniLogo
          brand={
            brandA
          }
          width={
            82
          }
        />
      </div>
    );
  }

  /* ------------------------------------------------ */
  /* A PRESENTS B                                     */
  /* ------------------------------------------------ */

  return (
    <div className="flex items-center gap-[9px]">
      <MiniLogo
        brand={
          brandA
        }
        width={
          78
        }
      />

      <RelationshipLabel>
        presents
      </RelationshipLabel>

      <MiniLogo
        brand={
          brandB
        }
        width={
          112
        }
      />
    </div>
  );
}

/* ================================================= */
/* RELATIONSHIP LABEL                                */
/* ================================================= */

function RelationshipLabel({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        whitespace-nowrap

        text-[6px]
        uppercase
        tracking-[0.11em]

        text-white/36
      "
    >
      {children}
    </span>
  );
}

/* ================================================= */
/* MINI LOGO                                         */
/* ================================================= */

function MiniLogo({
  brand,
  width,
}: {
  brand: {
    name:
      string;

    logoUrl:
      string | null;
  };

  width:
    number;
}) {
  return (
    <div
      className="
        h-[30px]
        shrink-0
      "
      style={{
        width,
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
/* STANDARD LOGO                                     */
/* ================================================= */

function Logo({
  brand,
  small = false,
}: {
  brand: {
    name:
      string;

    logoUrl:
      string | null;
  };

  small?:
    boolean;
}) {
  return (
    <div
      className={
        small
          ? "h-[40px] w-[130px]"
          : "h-[62px] w-[220px]"
      }
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