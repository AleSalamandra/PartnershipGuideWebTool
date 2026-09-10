"use client";

import type {
  ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";

import {
  getTraitById,
  type BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import {
  useGuidelineStore,
  type GuidelineBrand,
} from "@/store/guidelineStore";

import type {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function getFontName(
  value: string
) {
  return value
    .replace(
      /["']/g,
      ""
    )
    .split(",")[0]
    .trim();
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page02() {
  const {
    partnershipModel,

    additionalRelationship,

    brandA,
    brandB,

    propertyX,

    commonFontFamily,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const showProperty =
    additionalRelationship !==
    "none";

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute
          left-[60px]
          right-[60px]
          top-[46px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[13px]
              uppercase
              tracking-[0.17em]
              text-white/30
            "
          >
            02 / Visual system
          </p>

          <h1
            className="
              mt-[14px]

              text-[52px]
              leading-none
              tracking-[-0.045em]

              text-white
              oook-semibold
            "
          >
            Corporate visuals
          </h1>

          <p
            className="
              mt-[13px]
              max-w-[820px]

              text-[14px]
              leading-[1.4]

              text-white/40
            "
          >
            Identity assets and selected character traits define how each participant contributes to the shared visual territory.
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
      {/* CARDS                                    */}
      {/* ======================================== */}

      <section
        className={`
          absolute

          left-[60px]
          right-[60px]
          top-[168px]

          grid

          gap-[18px]

          ${
            showProperty
              ? "grid-cols-3"
              : "grid-cols-2"
          }
        `}
      >
        <IdentityCard
          eyebrow="Brand A"
          role="Identity"
          brand={
            brandA
          }
        />

        <IdentityCard
          eyebrow="Brand B"
          role="Identity"
          brand={
            brandB
          }
        />

        {showProperty && (
          <IdentityCard
            eyebrow={
              additionalRelationship ===
              "presenting"
                ? "Presented property"
                : "Sponsor"
            }
            role={
              additionalRelationship ===
              "presenting"
                ? "Content identity"
                : "Sponsor identity"
            }
            brand={
              propertyX
            }
            note={
              additionalRelationship ===
              "sponsored"
                ? "Character is documented here but does not alter the shared visual language."
                : "Character actively contributes to the expressive visual layer."
            }
          />
        )}
      </section>

      {/* ======================================== */}
      {/* COMMON TYPOGRAPHY                        */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[50px]
          left-1/2

          flex
          w-[760px]

          -translate-x-1/2

          items-center

          rounded-[20px]

          border
          border-white/[0.08]

          bg-white/[0.018]

          px-[30px]
          py-[20px]
        "
      >
        <div
          className="
            flex
            h-[62px]
            w-[92px]

            items-center

            border-r
            border-white/[0.07]
          "
        >
          <span
            className="
              text-[42px]
              leading-none

              text-white/82
            "
            style={{
              fontFamily:
                commonFontFamily,
            }}
          >
            Aa
          </span>
        </div>

        <div
          className="
            ml-[28px]
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.13em]

              text-white/25
            "
          >
            Common typography
          </p>

          <p
            className="
              mt-[6px]

              text-[14px]

              text-white/58
            "
          >
            {getFontName(
              commonFontFamily
            )}
          </p>

          <p
            className="
              mt-[4px]

              text-[11px]

              text-white/25
            "
          >
            Shared language for partnership communication.
          </p>
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function IdentityCard({
  eyebrow,
  role,
  brand,
  note,
}: {
  eyebrow:
    string;

  role:
    string;

  brand:
    GuidelineBrand;

  note?:
    string;
}) {
  const name =
    brand.name.trim() ||
    eyebrow;

  return (
    <article
      className="
        min-h-[480px]

        rounded-[24px]

        border
        border-white/[0.09]

        bg-white/[0.018]

        p-[22px]
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between

          gap-[14px]
        "
      >
        <div>
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]

              text-white/28
            "
          >
            {eyebrow}
          </p>

          <p
            className="
              mt-[7px]

              text-[17px]

              text-white/76

              oook-medium
            "
          >
            {name}
          </p>
        </div>

        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.12em]

            text-white/18
          "
        >
          {role}
        </p>
      </div>

      {/* LOGO */}

      <div
        className="
          mt-[18px]

          flex
          h-[115px]

          items-center
          justify-center

          rounded-[16px]

          border
          border-white/[0.07]

          bg-black/20

          px-[24px]
        "
      >
        <BrandLogo
          logoUrl={
            brand.logoUrl
          }
          fallback={
            name
          }
        />
      </div>

      {/* IDENTITY DATA */}

      <div
        className="
          mt-[18px]

          grid
          grid-cols-2

          gap-[18px]
        "
      >
        <div>
          <Label>
            Colours
          </Label>

          <div
            className="
              mt-[10px]
              space-y-[8px]
            "
          >
            <Colour
              value={
                brand.primaryColor
              }
            />

            <Colour
              value={
                brand.secondaryColor
              }
            />
          </div>
        </div>

        <div>
          <Label>
            Typeface
          </Label>

          <div
            className="
              mt-[9px]

              flex
              items-end

              gap-[9px]
            "
          >
            <span
              className="
                text-[31px]
                leading-none

                text-white/80
              "
              style={{
                fontFamily:
                  brand.fontFamily,
              }}
            >
              Aa
            </span>

            <div>
              <p
                className="
                  max-w-[125px]
                  truncate

                  text-[9px]

                  text-white/55
                "
              >
                {getFontName(
                  brand.fontFamily
                )}
              </p>

              <p
                className="
                  mt-[2px]

                  text-[7px]

                  text-white/20
                "
              >
                Brand typeface
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHARACTER */}

      <div
        className="
          mt-[20px]

          border-t
          border-white/[0.065]

          pt-[14px]
        "
      >
        <Label>
          Character
        </Label>

        <CharacterDescriptions
          traits={
            brand.characterTraits
          }
        />

        {note && (
          <p
            className="
              mt-[10px]

              text-[7px]
              leading-[1.4]

              text-white/17
            "
          >
            {note}
          </p>
        )}
      </div>
    </article>
  );
}

/* ================================================= */
/* CHARACTER                                         */
/* ================================================= */

function CharacterDescriptions({
  traits,
}: {
  traits:
    BrandCharacterTraitId[];
}) {
  if (
    traits.length === 0
  ) {
    return (
      <p
        className="
          mt-[10px]

          text-[9px]

          text-white/22
        "
      >
        Neutral character
      </p>
    );
  }

  return (
    <div
      className="
        mt-[10px]

        space-y-[10px]
      "
    >
      {traits.map(
        (id) => {
          const trait =
            getTraitById(id);

          if (!trait) {
            return null;
          }

          return (
            <div
              key={
                trait.id
              }
            >
              <div
                className="
                  flex
                  items-center

                  gap-[6px]
                "
              >
                <span
                  className="
                    h-[4px]
                    w-[16px]

                    rounded-full

                    bg-white/40
                  "
                />

                <p
                  className="
                    text-[9px]

                    text-white/58

                    oook-medium
                  "
                >
                  {trait.label}
                </p>
              </div>

              <p
                className="
                  mt-[4px]

                  pl-[22px]

                  text-[8px]
                  leading-[1.42]

                  text-white/27
                "
              >
                {
                  trait.description
                }
              </p>
            </div>
          );
        }
      )}
    </div>
  );
}

/* ================================================= */
/* SMALL COMPONENTS                                  */
/* ================================================= */

function Label({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <p
      className="
        text-[8px]
        uppercase
        tracking-[0.13em]

        text-white/24
      "
    >
      {children}
    </p>
  );
}

function Colour({
  value,
}: {
  value:
    string;
}) {
  return (
    <div
      className="
        flex
        items-center

        gap-[8px]
      "
    >
      <span
        className="
          h-[19px]
          w-[19px]

          shrink-0

          rounded-full

          border
          border-white/10
        "
        style={{
          backgroundColor:
            value,
        }}
      />

      <span
        className="
          font-mono

          text-[8px]
          uppercase

          text-white/32
        "
      >
        {value}
      </span>
    </div>
  );
}