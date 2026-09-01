"use client";

import {
  brandCharacterTraits,
  BrandCharacterTraitId,
  MAX_BRAND_CHARACTER_TRAITS,
} from "@/data/brandCharacterTraits";

import { useGuidelineStore } from "@/store/guidelineStore";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type BrandSide =
  | "A"
  | "B";

interface BrandCharacterSelectorProps {
  brand: BrandSide;
}

/* ------------------------------------------------ */
/* COMPONENT                                        */
/* ------------------------------------------------ */

export default function BrandCharacterSelector({
  brand,
}: BrandCharacterSelectorProps) {
  const brandA =
    useGuidelineStore(
      (state) =>
        state.brandA
    );

  const brandB =
    useGuidelineStore(
      (state) =>
        state.brandB
    );

  const currentBrand =
    brand === "A"
      ? brandA
      : brandB;

  const brandWithCharacter =
    currentBrand as typeof currentBrand & {
      characterTraits?:
        BrandCharacterTraitId[];
    };

  const selected =
    brandWithCharacter
      .characterTraits ??
    [];

  const reachedLimit =
    selected.length >=
    MAX_BRAND_CHARACTER_TRAITS;

  /* ------------------------------------------------ */
  /* TOGGLE                                           */
  /* ------------------------------------------------ */

  const toggleTrait = (
    trait:
      BrandCharacterTraitId
  ) => {
    const alreadySelected =
      selected.includes(
        trait
      );

    let next:
      BrandCharacterTraitId[];

    if (alreadySelected) {
      next =
        selected.filter(
          (item) =>
            item !== trait
        );
    } else if (
      reachedLimit
    ) {
      return;
    } else {
      next = [
        ...selected,
        trait,
      ];
    }

    useGuidelineStore.setState(
      (state) => {
        if (
          brand === "A"
        ) {
          return {
            brandA: {
              ...state.brandA,

              characterTraits:
                next,
            } as typeof state.brandA,
          };
        }

        return {
          brandB: {
            ...state.brandB,

            characterTraits:
              next,
          } as typeof state.brandB,
        };
      }
    );
  };

  /* ------------------------------------------------ */
  /* RENDER                                           */
  /* ------------------------------------------------ */

  return (
    <div>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-[10px]
        "
      >
        <div>
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.12em]

              text-white/55

              oook-medium
            "
          >
            Character
          </p>

          <p
            className="
              mt-[3px]

              text-[7px]
              leading-none

              text-white/20
            "
          >
            Select up to 5 traits
          </p>
        </div>

        {/* COUNTER */}

        <div
          className={`
            flex
            h-[17px]
            min-w-[28px]

            items-center
            justify-center

            rounded-full

            border

            px-[5px]

            ${
              reachedLimit
                ? `
                    border-white/14
                    bg-white/[0.05]
                    text-white/45
                  `
                : `
                    border-white/[0.06]
                    text-white/18
                  `
            }
          `}
          style={{
            fontSize: "6px",
            lineHeight: 1,
          }}
        >
          {selected.length}
          {" / "}
          {
            MAX_BRAND_CHARACTER_TRAITS
          }
        </div>
      </div>

      {/* ======================================== */}
      {/* FILTERS                                  */}
      {/* ======================================== */}

      <div
        className="
          mt-[9px]

          flex
          flex-wrap

          gap-x-[3px]
          gap-y-[3px]
        "
      >
        {brandCharacterTraits.map(
          (trait) => {
            const isSelected =
              selected.includes(
                trait.id
              );

            const disabled =
              reachedLimit &&
              !isSelected;

            return (
              <button
                key={trait.id}
                type="button"

                title={
                  trait.description
                }

                disabled={
                  disabled
                }

                onClick={() =>
                  toggleTrait(
                    trait.id
                  )
                }

                className={`
                  inline-flex

                  h-[19px]

                  items-center
                  justify-center

                  whitespace-nowrap

                  rounded-full

                  border

                  px-[6px]

                  transition-all
                  duration-150

                  ${
                    isSelected
                      ? `
                          border-white/80
                          bg-white
                          text-black
                        `
                      : `
                          border-white/[0.065]
                          bg-transparent
                          text-white/32

                          hover:border-white/16
                          hover:bg-white/[0.035]
                          hover:text-white/65
                        `
                  }

                  ${
                    disabled
                      ? `
                          cursor-not-allowed
                          opacity-20
                        `
                      : ""
                  }
                `}
                style={{
                  fontSize:
                    "8px",

                  lineHeight: 1,

                  letterSpacing:
                    "0.01em",
                }}
              >
                {trait.label}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}
