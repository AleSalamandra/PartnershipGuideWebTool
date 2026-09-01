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
  /* ---------------------------------------------- */
  /* STORE                                          */
  /* ---------------------------------------------- */

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

  /* ---------------------------------------------- */
  /* CHARACTER DATA                                 */
  /* ---------------------------------------------- */

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

  /* ---------------------------------------------- */
  /* TOGGLE                                         */
  /* ---------------------------------------------- */

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

    /* REMOVE */

    if (alreadySelected) {
      next =
        selected.filter(
          (item) =>
            item !== trait
        );
    }

    /* MAX REACHED */

    else if (
      reachedLimit
    ) {
      return;
    }

    /* ADD */

    else {
      next = [
        ...selected,
        trait,
      ];
    }

    /* -------------------------------------------- */
    /* SAVE                                         */
    /* -------------------------------------------- */

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

  /* ---------------------------------------------- */
  /* RENDER                                         */
  /* ---------------------------------------------- */

  return (
    <div
      className="
        mt-[18px]
      "
    >
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          gap-[12px]
        "
      >
        <div>
          <p
            className="
              text-[12px]
              text-white/72

              oook-medium
            "
          >
            Character
          </p>

          <p
            className="
              mt-[2px]

              text-[10px]
              leading-[1.3]

              text-white/28
            "
          >
            Select up to 5
            personality traits.
          </p>
        </div>

        {/* COUNTER */}

        <div
          className={`
            rounded-full

            border

            px-[8px]
            py-[4px]

            text-[9px]

            ${
              reachedLimit
                ? `
                    border-white/18
                    bg-white/[0.06]
                    text-white/65
                  `
                : `
                    border-white/[0.07]
                    text-white/26
                  `
            }
          `}
        >
          {selected.length}
          {" / "}
          {
            MAX_BRAND_CHARACTER_TRAITS
          }
        </div>
      </div>

      {/* ======================================== */}
      {/* CHIPS                                    */}
      {/* ======================================== */}

      <div
        className="
          mt-[11px]

          flex
          flex-wrap

          gap-[6px]
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
                  rounded-full

                  border

                  px-[9px]
                  py-[5px]

                  text-[9px]
                  leading-none

                  transition-all
                  duration-150

                  ${
                    isSelected
                      ? `
                          border-white
                          bg-white
                          text-black
                        `
                      : `
                          border-white/[0.08]
                          bg-white/[0.025]
                          text-white/42

                          hover:border-white/20
                          hover:bg-white/[0.05]
                          hover:text-white/78
                        `
                  }

                  ${
                    disabled
                      ? `
                          cursor-not-allowed
                          opacity-25
                        `
                      : ""
                  }
                `}
              >
                {trait.label}
              </button>
            );
          }
        )}
      </div>

      {/* ======================================== */}
      {/* EMPTY / SELECTED SUMMARY                 */}
      {/* ======================================== */}

      {selected.length ===
      0 ? (
        <p
          className="
            mt-[9px]

            text-[9px]
            leading-[1.35]

            text-white/18
          "
        >
          Character will influence
          shapes, motion, texture,
          depth and graphic behaviour.
        </p>
      ) : (
        <div
          className="
            mt-[9px]

            flex
            items-center

            gap-[5px]
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.12em]

              text-white/18
            "
          >
            Profile
          </span>

          <span
            className="
              text-[9px]

              text-white/32
            "
          >
            {selected
              .map(
                (
                  id
                ) =>
                  brandCharacterTraits.find(
                    (
                      trait
                    ) =>
                      trait.id ===
                      id
                  )?.label
              )
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
      )}
    </div>
  );
}