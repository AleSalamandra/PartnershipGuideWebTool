"use client";

import type {
  ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";
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

const APPLICATIONS: {
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
      "Hero frame",

    slot:
      2,
  },

  {
    number:
      "02",

    title:
      "Lower third",

    slot:
      4,
  },

  {
    number:
      "03",

    title:
      "Information overlay",

    slot:
      7,
  },

  {
    number:
      "04",

    title:
      "Transition",

    slot:
      9,
  },
];

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page06() {
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

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header className="absolute left-[76px] right-[76px] top-[58px] flex items-start justify-between">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-white/28">
            06 / Content identity
          </p>

          <h1 className="mt-[15px] text-[52px] leading-[0.95] tracking-[-0.05em] oook-semibold">
            Content branding applications
          </h1>

          <p className="mt-[15px] max-w-[760px] text-[16px] leading-[1.4] text-white/40">
            Recurring content applications keep partnership hierarchy visible without interrupting the experience.
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
      {/* APPLICATIONS                            */}
      {/* ======================================== */}

      <section className="absolute bottom-[70px] left-[76px] right-[76px] top-[230px] grid grid-cols-2 grid-rows-2 gap-x-[24px] gap-y-[20px]">
        {APPLICATIONS.map(
          (
            application,
            index
          ) => (
            <ApplicationCard
              key={
                application.number
              }
              number={
                application.number
              }
              title={
                application.title
              }
            >
              <ApplicationVisual
                type={
                  index
                }
                slot={
                  application.slot
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
              />
            </ApplicationCard>
          )
        )}
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function ApplicationCard({
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

        <p className="mt-[9px] max-w-[92px] text-[9px] leading-[1.38] text-white/31">
          Shared hierarchy applied directly over content.
        </p>
      </div>

      <div className="relative min-h-0 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#050506]">
        {children}
      </div>
    </article>
  );
}

/* ================================================= */
/* VISUAL                                            */
/* ================================================= */

function ApplicationVisual({
  type,
  slot,
  model,
  brandA,
  brandB,
  propertyX,
  relationship,
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
}) {
  const consumer =
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

  return (
    <>
      {/* ======================================== */}
      {/* FULL-COLOUR CONTENT                      */}
      {/* ======================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <GuidelineMediaImage
          slot={
            slot
          }
          className="h-full w-full scale-[1.035] object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />

      {/* ======================================== */}
      {/* SMALL A / B SIGNATURE                    */}
      {/* ======================================== */}

      <FloatingPartnershipSignature
        type={
          type
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
      />

      {/* ======================================== */}
      {/* HERO                                     */}
      {/* ======================================== */}

      {type ===
        0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[58px] w-[210px]">
            <BrandLogo
              logoUrl={
                consumer.logoUrl
              }
              fallback={
                consumer.name
              }
            />
          </div>
        </div>
      )}

      {/* ======================================== */}
      {/* LOWER THIRD                              */}
      {/* ======================================== */}

      {type ===
        1 && (
        <div className="absolute bottom-[14px] left-[14px] right-[14px] flex items-center justify-between rounded-[12px] border border-white/[0.09] bg-black/60 px-[13px] py-[10px]">
          <div>
            <p className="text-[6px] uppercase tracking-[0.12em] text-white/28">
              Now watching
            </p>

            <p className="mt-[3px] text-[11px] text-white/72">
              Live immersive experience
            </p>
          </div>

          <MiniIdentity
            brand={
              consumer
            }
          />
        </div>
      )}

      {/* ======================================== */}
      {/* INFORMATION OVERLAY                      */}
      {/* ======================================== */}

      {type ===
        2 && (
        <div className="absolute right-[16px] top-[16px] w-[180px] rounded-[14px] border border-white/[0.09] bg-black/58 p-[12px]">
          <p className="text-[6px] uppercase tracking-[0.12em] text-white/25">
            Live data
          </p>

          <p className="mt-[6px] text-[19px] text-white/80 oook-medium">
            01:24:38
          </p>

          <div className="mt-[9px] flex gap-[4px]">
            <span
              className="h-[4px] flex-1 rounded-full"
              style={{
                backgroundColor:
                  consumer.primaryColor,
              }}
            />

            <span
              className="h-[4px] w-[25px] rounded-full"
              style={{
                backgroundColor:
                  consumer.secondaryColor,
              }}
            />
          </div>
        </div>
      )}

      {/* ======================================== */}
      {/* TRANSITION                               */}
      {/* ======================================== */}

      {type ===
        3 && (
        <>
          <div
            className="absolute -right-[70px] top-[-50px] h-[330px] w-[210px] rotate-[15deg]"
            style={{
              backgroundColor:
                consumer.primaryColor,

              opacity:
                0.48,
            }}
          />

          <div className="absolute bottom-[18px] left-[18px]">
            <p className="text-[7px] uppercase tracking-[0.15em] text-white/30">
              Transition
            </p>

            <p className="mt-[5px] text-[18px] text-white/85">
              Next chapter
            </p>
          </div>
        </>
      )}

      {/* ======================================== */}
      {/* SPONSOR                                  */}
      {/* ======================================== */}

      {relationship ===
        "sponsored" && (
        <div className="absolute bottom-[12px] right-[12px] flex items-center gap-[6px]">
          <span className="text-[5px] uppercase tracking-[0.1em] text-white/26">
            Sponsored by
          </span>

          <MiniIdentity
            brand={
              propertyX
            }
          />
        </div>
      )}
    </>
  );
}

/* ================================================= */
/* FLOATING PARTNERSHIP SIGNATURE                    */
/* ================================================= */

function FloatingPartnershipSignature({
  type,
  model,
  brandA,
  brandB,
}: {
  type:
    number;

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
  /*
    Same A / B signature, deliberately moved to
    different positions depending on the application.
  */

  const position =
    type ===
      0
      ? "right-[14px] top-[13px]"
      : type ===
          1
        ? "left-[14px] top-[13px]"
        : type ===
            2
          ? "bottom-[14px] left-[14px]"
          : "left-[14px] top-[13px]";

  return (
    <div
      className={`
        absolute
        z-20

        ${position}

        flex
        items-center

        rounded-full

        border
        border-white/[0.07]

        bg-black/30

        px-[8px]
        py-[5px]
      `}
    >
      <SmallPartnershipSignature
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
    </div>
  );
}

/* ================================================= */
/* SMALL PARTNERSHIP SIGNATURE                       */
/* ================================================= */

function SmallPartnershipSignature({
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
      <div className="flex items-center gap-[6px]">
        <MicroLogo
          brand={
            brandA
          }
          width={
            48
          }
        />

        <span className="text-[7px] text-white/35">
          ×
        </span>

        <MicroLogo
          brand={
            brandB
          }
          width={
            48
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
      <div className="flex items-center gap-[5px]">
        <MicroLogo
          brand={
            brandA
          }
          width={
            52
          }
        />

        <MicroRelationship>
          with
        </MicroRelationship>

        <MicroLogo
          brand={
            brandB
          }
          width={
            40
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
      <div className="flex items-center gap-[5px]">
        <MicroLogo
          brand={
            brandB
          }
          width={
            54
          }
        />

        <MicroRelationship>
          powered by
        </MicroRelationship>

        <MicroLogo
          brand={
            brandA
          }
          width={
            40
          }
        />
      </div>
    );
  }

  /* ------------------------------------------------ */
  /* A PRESENTS B                                     */
  /* ------------------------------------------------ */

  return (
    <div className="flex items-center gap-[5px]">
      <MicroLogo
        brand={
          brandA
        }
        width={
          40
        }
      />

      <MicroRelationship>
        presents
      </MicroRelationship>

      <MicroLogo
        brand={
          brandB
        }
        width={
          54
        }
      />
    </div>
  );
}

/* ================================================= */
/* MICRO LOGO                                        */
/* ================================================= */

function MicroLogo({
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
        h-[14px]

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
/* MICRO RELATIONSHIP                                */
/* ================================================= */

function MicroRelationship({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        whitespace-nowrap

        text-[4px]
        uppercase
        tracking-[0.1em]

        text-white/35
      "
    >
      {children}
    </span>
  );
}

/* ================================================= */
/* MINI IDENTITY                                     */
/* ================================================= */

function MiniIdentity({
  brand,
}: {
  brand: {
    name:
      string;

    logoUrl:
      string | null;
  };
}) {
  return (
    <div className="h-[23px] w-[80px]">
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