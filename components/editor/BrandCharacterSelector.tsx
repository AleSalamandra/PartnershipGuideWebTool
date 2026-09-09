"use client";

import {
  brandCharacterTraits,
  type BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export type CharacterIdentity =
  | "A"
  | "B"
  | "X";

interface BrandCharacterSelectorProps {
  brand:
    CharacterIdentity;
}

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const MAX_TRAITS =
  5;

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function getTraitDescription(
  trait:
    (typeof brandCharacterTraits)[number]
) {
  const value =
    trait as {
      description?:
        string;
    };

  return (
    value.description ??
    ""
  );
}

/* ================================================= */
/* COMPONENT                                         */
/* ================================================= */

export default function BrandCharacterSelector({
  brand,
}: BrandCharacterSelectorProps) {
  const {
    brandA,
    brandB,
    propertyX,

    updateBrandA,
    updateBrandB,
    updatePropertyX,
  } =
    useGuidelineStore();

  /* ------------------------------------------------ */
  /* ACTIVE IDENTITY                                  */
  /* ------------------------------------------------ */

  const selected =
    brand === "A"
      ? brandA.characterTraits
      : brand === "B"
        ? brandB.characterTraits
        : propertyX.characterTraits;

  const identityLabel =
    brand === "A"
      ? "Brand A"
      : brand === "B"
        ? "Brand B"
        : "Presented property";

  /* ------------------------------------------------ */
  /* UPDATE                                           */
  /* ------------------------------------------------ */

  const updateTraits = (
    characterTraits:
      BrandCharacterTraitId[]
  ) => {
    if (
      brand === "A"
    ) {
      updateBrandA({
        characterTraits,
      });

      return;
    }

    if (
      brand === "B"
    ) {
      updateBrandB({
        characterTraits,
      });

      return;
    }

    updatePropertyX({
      characterTraits,
    });
  };

  /* ------------------------------------------------ */
  /* TOGGLE                                           */
  /* ------------------------------------------------ */

  const toggleTrait = (
    id:
      BrandCharacterTraitId
  ) => {
    const active =
      selected.includes(
        id
      );

    if (
      active
    ) {
      updateTraits(
        selected.filter(
          (
            traitId
          ) =>
            traitId !==
            id
        )
      );

      return;
    }

    if (
      selected.length >=
      MAX_TRAITS
    ) {
      return;
    }

    updateTraits([
      ...selected,
      id,
    ]);
  };

  /* ------------------------------------------------ */
  /* RENDER                                           */
  /* ------------------------------------------------ */

  return (
    <div>
      <div
        className="
          flex
          items-start
          justify-between
          gap-[16px]
        "
      >
        <div>
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.12em]

              text-white/53

              oook-medium
            "
          >
            Character
          </p>

          <p
            className="
              mt-[4px]

              text-[8px]
              leading-[1.4]

              text-white/21
            "
          >
            Choose up to five traits for {identityLabel}.
          </p>
        </div>

        <span
          className="
            shrink-0

            rounded-full

            border
            border-white/[0.07]

            px-[7px]
            py-[4px]

            text-[7px]

            text-white/24
          "
        >
          {selected.length}
          /
          {MAX_TRAITS}
        </span>
      </div>

      {/* ======================================== */}
      {/* SELECTED                                 */}
      {/* ======================================== */}

      {selected.length >
        0 && (
        <div
          className="
            mt-[12px]

            flex
            flex-wrap

            gap-[4px]
          "
        >
          {selected.map(
            (
              id
            ) => {
              const trait =
                brandCharacterTraits.find(
                  (
                    item
                  ) =>
                    item.id ===
                    id
                );

              if (
                !trait
              ) {
                return null;
              }

              return (
                <button
                  key={
                    id
                  }

                  type="button"

                  onClick={() =>
                    toggleTrait(
                      id
                    )
                  }

                  className="
                    rounded-full

                    border
                    border-white/22

                    bg-white

                    px-[7px]
                    py-[4px]

                    text-[7px]

                    text-black/75

                    transition-opacity

                    hover:opacity-80
                  "
                >
                  {trait.label}
                  <span className="ml-[5px] opacity-45">
                    ×
                  </span>
                </button>
              );
            }
          )}
        </div>
      )}

      {/* ======================================== */}
      {/* OPTIONS                                  */}
      {/* ======================================== */}

      <div
        className="
          mt-[12px]

          flex
          flex-wrap

          gap-[4px]
        "
      >
        {brandCharacterTraits.map(
          (
            trait
          ) => {
            const active =
              selected.includes(
                trait.id
              );

            const disabled =
              !active &&
              selected.length >=
                MAX_TRAITS;

            const description =
              getTraitDescription(
                trait
              );

            return (
              <button
                key={
                  trait.id
                }

                type="button"

                title={
                  description ||
                  trait.label
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

                  px-[7px]
                  py-[4px]

                  text-[7px]

                  transition-all
                  duration-150

                  ${
                    active
                      ? `
                          border-white
                          bg-white
                          text-black
                        `
                      : `
                          border-white/[0.07]
                          bg-white/[0.018]
                          text-white/38

                          hover:border-white/17
                          hover:bg-white/[0.04]
                          hover:text-white/65
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
    </div>
  );
}