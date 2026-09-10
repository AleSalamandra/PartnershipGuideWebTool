"use client";

import type {
  ReactNode,
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
/* CONFIG                                            */
/* ================================================= */

const CLOSING_FRAMES: {
  number:
    string;

  title:
    string;

  slot:
    GuidelineImageSlot;
}[] = [
  {
    number:
      "01",

    title:
      "Final signature",

    slot:
      2,
  },

  {
    number:
      "02",

    title:
      "Credits",

    slot:
      5,
  },

  {
    number:
      "03",

    title:
      "CTA end card",

    slot:
      7,
  },

  {
    number:
      "04",

    title:
      "Minimal closing",

    slot:
      9,
  },
];

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page07() {
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

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header className="absolute left-[44px] right-[44px] top-[38px] flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/28">
            07 / Closing identity
          </p>

          <h1 className="mt-[15px] text-[50px] leading-[0.95] tracking-[-0.05em] oook-semibold">
            Video closing applications
          </h1>

          <p className="mt-[15px] max-w-[800px] text-[15px] leading-[1.4] text-white/40">
            Closing layouts resolve ownership, featured content and attribution without creating competing sign-offs.
          </p>
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
      {/* CLOSING APPLICATIONS                    */}
      {/* ======================================== */}

      <section className="absolute bottom-[70px] left-[44px] right-[44px] top-[220px] grid grid-cols-2 grid-rows-2 gap-x-[26px] gap-y-[22px]">
        {CLOSING_FRAMES.map(
          (
            item,
            index
          ) => (
            <ClosingCard
              key={
                item.number
              }
              number={
                item.number
              }
              title={
                item.title
              }
            >
              <ClosingVisual
                type={
                  index
                }
                slot={
                  item.slot
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
            </ClosingCard>
          )
        )}
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function ClosingCard({
  number,
  title,
  children,
}: {
  number:
    string;

  title:
    string;

  children:
    ReactNode;
}) {
  return (
    <article className="grid min-h-0 grid-cols-[112px_minmax(0,1fr)] gap-[14px]">
      <div className="flex flex-col justify-center">
        <p className="text-[8px] uppercase tracking-[0.14em] text-white/20">
          {number}
        </p>

        <h3 className="mt-[8px] text-[16px] leading-[1.05] text-white/72 oook-medium">
          {title}
        </h3>

        <div className="mt-[10px] h-px w-[42px] bg-white/[0.14]" />

        <p className="mt-[9px] max-w-[94px] text-[9px] leading-[1.38] text-white/31">
          Clear final ownership and restrained attribution.
        </p>
      </div>

      <div className="relative min-h-0 overflow-hidden rounded-[22px] border border-white/[0.08] bg-black">
        {children}
      </div>
    </article>
  );
}

/* ================================================= */
/* VISUAL                                            */
/* ================================================= */

function ClosingVisual({
  type,
  slot,
  model,
  brandA,
  brandB,
  propertyX,
  relationship,
  isLight,
}: {
  type:
    number;

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
  const mainBrand =
    relationship ===
    "presenting"
      ? propertyX
      : model ===
          "poweredByA"
        ? brandB
        : model ===
            "presentsB"
          ? brandB
          : brandA;

  /*
    Final signature + Minimal closing
    use a clean neutral background.

    Credits + CTA keep colour footage.
  */

  const useSolidBackground =
    type ===
      0 ||
    type ===
      3;

  return (
    <>
      {/* ======================================== */}
      {/* BACKGROUND                               */}
      {/* ======================================== */}

      {useSolidBackground ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor:
              isLight
                ? "#FFFFFF"
                : "#000000",
          }}
        />
      ) : (
        <>
          <GuidelineMediaImage
            slot={
              slot
            }
            className="absolute inset-0 h-full w-full scale-[1.035] object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              backgroundColor:
                isLight
                  ? "rgba(255,255,255,0.16)"
                  : "rgba(0,0,0,0.22)",
            }}
          />
        </>
      )}

      {/* ======================================== */}
      {/* FINAL SIGNATURE                          */}
      {/* ======================================== */}

      {type ===
        0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LargeIdentity
            brand={
              mainBrand
            }
          />
        </div>
      )}

      {/* ======================================== */}
      {/* CREDITS                                  */}
      {/* ======================================== */}

      {type ===
        1 && (
        <CreditsApplication
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
      )}

      {/* ======================================== */}
      {/* CTA                                      */}
      {/* ======================================== */}

      {type ===
        2 && (
        <div className="absolute bottom-[23px] left-[23px] w-[48%] rounded-[14px] border border-white/[0.09] bg-black/62 p-[14px]">
          <p className="text-[7px] uppercase tracking-[0.12em] text-white/30">
            Continue the experience
          </p>

          <p className="mt-[5px] text-[16px] text-white/80 oook-medium">
            Discover more
          </p>

          <button
            type="button"
            className="mt-[11px] rounded-full px-[14px] py-[7px] text-[8px] text-black"
            style={{
              backgroundColor:
                mainBrand.primaryColor,
            }}
          >
            Explore
          </button>
        </div>
      )}

      {/* ======================================== */}
      {/* MINIMAL CLOSING                          */}
      {/* ======================================== */}

      {type ===
        3 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CompleteClosingLockup
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
      )}

      {/* ======================================== */}
      {/* SPONSOR CREDIT                           */}
      {/* ======================================== */}

      {relationship ===
        "sponsored" &&
        type !==
          3 && (
          <div className="absolute bottom-[12px] right-[12px] z-20 flex items-center gap-[7px]">
            <span className="text-[5px] uppercase tracking-[0.12em] text-white/26">
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
    </>
  );
}

/* ================================================= */
/* CREDITS                                           */
/* ================================================= */

function CreditsApplication({
  model,
  brandA,
  brandB,
  propertyX,
  relationship,
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

  relationship:
    string;
}) {
  return (
    <div className="absolute bottom-[14px] left-[14px] right-[14px] rounded-[12px] border border-white/[0.09] bg-black/60 px-[14px] py-[11px]">
      <div className="flex items-end justify-between gap-[24px]">
        {/* ====================================== */}
        {/* CREDITS                                */}
        {/* ====================================== */}

        <div>
          <p className="text-[6px] uppercase tracking-[0.14em] text-white/28">
            Credits
          </p>

          <div className="mt-[7px] flex gap-[22px]">
            <CreditItem
              role="Content"
              name={
                brandB.name
              }
            />

            <CreditItem
              role="Technology & production"
              name={
                brandA.name
              }
            />

            {relationship !==
              "none" && (
              <CreditItem
                role={
                  relationship ===
                  "presenting"
                    ? "Presented property"
                    : "Sponsor"
                }
                name={
                  propertyX.name
                }
              />
            )}
          </div>
        </div>

        {/* ====================================== */}
        {/* SMALL PARTNERSHIP SIGNATURE            */}
        {/* ====================================== */}

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
          scale="tiny"
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* CREDIT ITEM                                       */
/* ================================================= */

function CreditItem({
  role,
  name,
}: {
  role:
    string;

  name:
    string;
}) {
  return (
    <div>
      <p className="text-[5px] uppercase tracking-[0.11em] text-white/23">
        {role}
      </p>

      <p className="mt-[3px] text-[7px] text-white/58">
        {name}
      </p>
    </div>
  );
}

/* ================================================= */
/* COMPLETE CLOSING LOCKUP                           */
/* ================================================= */

function CompleteClosingLockup({
  model,
  brandA,
  brandB,
  propertyX,
  relationship,
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

  relationship:
    string;
}) {
  return (
    <div className="flex max-w-[84%] flex-col items-center">
      {/* ======================================== */}
      {/* BASE A / B MODEL                         */}
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
        scale="normal"
      />

      {/* ======================================== */}
      {/* PRESENTING X                             */}
      {/* ======================================== */}

      {relationship ===
        "presenting" && (
        <>
          <p className="my-[11px] text-[6px] uppercase tracking-[0.17em] text-white/30">
            Present
          </p>

          <div className="h-[48px] w-[185px]">
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

      {/* ======================================== */}
      {/* SPONSORED X                              */}
      {/* ======================================== */}

      {relationship ===
        "sponsored" && (
        <>
          <p className="my-[11px] text-[5px] uppercase tracking-[0.16em] text-white/25">
            Sponsored by
          </p>

          <div className="h-[27px] w-[95px]">
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

      <p className="mt-[14px] text-[6px] uppercase tracking-[0.16em] text-white/22">
        End of experience
      </p>
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
  scale,
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

  scale:
    "normal" | "tiny";
}) {
  const isTiny =
    scale ===
    "tiny";

  const largeWidth =
    isTiny
      ? 52
      : 112;

  const smallWidth =
    isTiny
      ? 38
      : 80;

  const height =
    isTiny
      ? 14
      : 30;

  /* ------------------------------------------------ */
  /* A × B                                            */
  /* ------------------------------------------------ */

  if (
    model ===
    "axb"
  ) {
    return (
      <div className="flex items-center gap-[8px]">
        <ScaledLogo
          brand={
            brandA
          }
          width={
            largeWidth
          }
          height={
            height
          }
        />

        <span
          className={
            isTiny
              ? "text-[6px] text-white/32"
              : "text-[14px] text-white/38"
          }
        >
          ×
        </span>

        <ScaledLogo
          brand={
            brandB
          }
          width={
            largeWidth
          }
          height={
            height
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
      <div className="flex items-center gap-[7px]">
        <ScaledLogo
          brand={
            brandA
          }
          width={
            largeWidth
          }
          height={
            height
          }
        />

        <RelationshipLabel
          tiny={
            isTiny
          }
        >
          with
        </RelationshipLabel>

        <ScaledLogo
          brand={
            brandB
          }
          width={
            smallWidth
          }
          height={
            height
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
      <div className="flex items-center gap-[7px]">
        <ScaledLogo
          brand={
            brandB
          }
          width={
            largeWidth
          }
          height={
            height
          }
        />

        <RelationshipLabel
          tiny={
            isTiny
          }
        >
          powered by
        </RelationshipLabel>

        <ScaledLogo
          brand={
            brandA
          }
          width={
            smallWidth
          }
          height={
            height
          }
        />
      </div>
    );
  }

  /* ------------------------------------------------ */
  /* A PRESENTS B                                     */
  /* ------------------------------------------------ */

  return (
    <div className="flex items-center gap-[7px]">
      <ScaledLogo
        brand={
          brandA
        }
        width={
          smallWidth
        }
        height={
          height
        }
      />

      <RelationshipLabel
        tiny={
          isTiny
        }
      >
        presents
      </RelationshipLabel>

      <ScaledLogo
        brand={
          brandB
        }
        width={
          largeWidth
        }
        height={
          height
        }
      />
    </div>
  );
}

/* ================================================= */
/* SCALED LOGO                                       */
/* ================================================= */

function ScaledLogo({
  brand,
  width,
  height,
}: {
  brand: {
    name:
      string;

    logoUrl:
      string | null;
  };

  width:
    number;

  height:
    number;
}) {
  return (
    <div
      className="shrink-0"
      style={{
        width,
        height,
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
/* RELATIONSHIP LABEL                                */
/* ================================================= */

function RelationshipLabel({
  children,
  tiny = false,
}: {
  children:
    ReactNode;

  tiny?:
    boolean;
}) {
  return (
    <span
      className={`
        whitespace-nowrap

        uppercase

        ${
          tiny
            ? `
                text-[4px]
                tracking-[0.09em]
                text-white/30
              `
            : `
                text-[6px]
                tracking-[0.11em]
                text-white/34
              `
        }
      `}
    >
      {children}
    </span>
  );
}

/* ================================================= */
/* IDENTITY                                          */
/* ================================================= */

function LargeIdentity({
  brand,
  compact = false,
}: {
  brand: {
    name:
      string;

    logoUrl:
      string | null;
  };

  compact?:
    boolean;
}) {
  return (
    <div
      className={
        compact
          ? "h-[34px] w-[130px]"
          : "h-[64px] w-[240px]"
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