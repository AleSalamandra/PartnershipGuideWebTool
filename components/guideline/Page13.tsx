"use client";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";
import GuidelineMediaImage from "./GuidelineMediaImage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

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
/* PAGE                                              */
/* ================================================= */

export default function Page13() {
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

  const imageSlot:
    GuidelineImageSlot =
    model ===
    "axb"
      ? 3
      : model ===
          "aandb"
        ? 4
        : model ===
            "poweredByA"
          ? 7
          : 9;

  const expressionBrand =
    additionalRelationship ===
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
    <GuidelinePage>
      <header className="absolute left-[70px] right-[70px] top-[46px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            13 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] oook-semibold">
            Complete shared branding example
          </h1>

          <p className="mt-[13px] max-w-[850px] text-[16px] leading-[1.38] text-white/45">
            A complete application of hierarchy, colour, typography, graphic language, image treatment and brand character.
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

      <section className="absolute bottom-[58px] left-[70px] right-[70px] top-[185px]">
        <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#050506]">
          {/* ==================================== */}
          {/* MEDIA                                */}
          {/* ==================================== */}

          <GuidelineMediaImage
            slot={
              imageSlot
            }
            treatmentFilter="grayscale(.22) brightness(.69) contrast(1.1)"
            className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
          />

          {/* ==================================== */}
          {/* ATMOSPHERE                           */}
          {/* ==================================== */}

          <RasterGradient
            direction="horizontal"
            className="absolute inset-0 h-full w-full"
            stops={[
              {
                color:
                  "#000000",
                offset:
                  0,
                opacity:
                  0.8,
              },
              {
                color:
                  "#000000",
                offset:
                  52,
                opacity:
                  0.25,
              },
              {
                color:
                  "#000000",
                offset:
                  100,
                opacity:
                  0.18,
              },
            ]}
          />

          <RasterGlow
            color={
              expressionBrand.primaryColor
            }
            secondaryColor={
              expressionBrand.secondaryColor
            }
            opacity={
              0.2
            }
            secondaryOpacity={
              0.05
            }
            centerX={
              72
            }
            centerY={
              62
            }
            className="absolute -bottom-[30%] right-[-4%] h-[470px] w-[570px]"
          />

          {/* ==================================== */}
          {/* TOP SIGNATURE                        */}
          {/* ==================================== */}

          <div className="absolute left-[38px] top-[32px] flex items-center gap-[18px]">
            {additionalRelationship ===
            "presenting" ? (
              <>
                <Identity
                  brand={
                    propertyX
                  }
                  width={
                    210
                  }
                  height={
                    55
                  }
                />

                <span className="text-[7px] uppercase tracking-[0.14em] text-white/28">
                  presented through
                </span>

                <SmallABLockup
                  brandA={
                    brandA
                  }
                  brandB={
                    brandB
                  }
                />
              </>
            ) : (
              <SmallABLockup
                brandA={
                  brandA
                }
                brandB={
                  brandB
                }
              />
            )}
          </div>

          {/* ==================================== */}
          {/* COPY                                 */}
          {/* ==================================== */}

          <div className="absolute bottom-[58px] left-[42px] max-w-[620px]">
            <p className="text-[8px] uppercase tracking-[0.16em] text-white/32">
              {expressionBrand.name}
            </p>

            <h2
              className="mt-[8px] text-[48px] leading-[0.95] tracking-[-0.045em] text-white"
              style={{
                fontFamily:
                  expressionBrand.fontFamily,
              }}
            >
              Experience the moment
              <br />
              from inside.
            </h2>

            <div className="mt-[20px] flex items-center gap-[8px]">
              <button
                type="button"
                className="rounded-full px-[17px] py-[9px] text-[9px] text-black"
                style={{
                  backgroundColor:
                    expressionBrand.primaryColor,
                }}
              >
                Enter experience
              </button>

              <div
                className="h-[5px] w-[30px] rounded-full"
                style={{
                  backgroundColor:
                    expressionBrand.secondaryColor,
                }}
              />
            </div>
          </div>

          {/* ==================================== */}
          {/* SPONSOR                              */}
          {/* ==================================== */}

          {additionalRelationship ===
            "sponsored" && (
            <div className="absolute bottom-[26px] right-[30px] flex items-center gap-[9px] rounded-[12px] border border-white/[0.08] bg-black/45 px-[12px] py-[9px]">
              <span className="text-[6px] uppercase tracking-[0.13em] text-white/27">
                Sponsored by
              </span>

              <Identity
                brand={
                  propertyX
                }
                width={
                  95
                }
                height={
                  26
                }
              />
            </div>
          )}
        </div>
      </section>

      <footer className="absolute bottom-[24px] left-[70px] right-[70px] flex justify-between text-[9px] text-white/22">
        <span>
          Full application sample
        </span>

        <span>
          Image · colour · type · graphic language · hierarchy
        </span>
      </footer>
    </GuidelinePage>
  );
}

/* ================================================= */
/* AB LOCKUP                                         */
/* ================================================= */

function SmallABLockup({
  brandA,
  brandB,
}: {
  brandA:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandA"];

  brandB:
    ReturnType<
      typeof useGuidelineStore.getState
    >["brandB"];
}) {
  return (
    <div className="flex items-center gap-[13px]">
      <Identity
        brand={
          brandA
        }
        width={
          130
        }
        height={
          38
        }
      />

      <span className="text-[15px] text-white/30">
        ×
      </span>

      <Identity
        brand={
          brandB
        }
        width={
          130
        }
        height={
          38
        }
      />
    </div>
  );
}

/* ================================================= */
/* IDENTITY                                          */
/* ================================================= */

function Identity({
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