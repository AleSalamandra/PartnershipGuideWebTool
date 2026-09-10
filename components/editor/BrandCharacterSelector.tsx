"use client";

import {
  brandCharacterTraits,
  MAX_BRAND_CHARACTER_TRAITS,
  type BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type CharacterTarget =
  | "A"
  | "B"
  | "X";

interface BrandCharacterSelectorProps {
  brand:
    CharacterTarget;
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
  } =
    useGuidelineStore();

  const currentBrand =
    brand === "A"
      ? brandA
      : brand === "B"
        ? brandB
        : propertyX;

  /*
    Protect against old state containing
    more than two traits.
  */

  const selected =
    (
      currentBrand
        ?.characterTraits ??
      []
    ).slice(
      0,
      MAX_BRAND_CHARACTER_TRAITS
    );

  /* ------------------------------------------------ */
  /* LABEL                                            */
  /* ------------------------------------------------ */

  const title =
    brand === "A"
      ? "Brand A character"
      : brand === "B"
        ? "Brand B character"
        : "Property character";

  /* ------------------------------------------------ */
  /* UPDATE                                           */
  /* ------------------------------------------------ */

  function updateTraits(
    next:
      BrandCharacterTraitId[]
  ) {
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
            },
          };
        }

        if (
          brand === "B"
        ) {
          return {
            brandB: {
              ...state.brandB,

              characterTraits:
                next,
            },
          };
        }

        return {
          propertyX: {
            ...state.propertyX,

            characterTraits:
              next,
          },
        };
      }
    );
  }

  /* ------------------------------------------------ */
  /* TOGGLE                                           */
  /* ------------------------------------------------ */

  function toggleTrait(
    traitId:
      BrandCharacterTraitId
  ) {
    const active =
      selected.includes(
        traitId
      );

    /*
      Deselect.
    */

    if (
      active
    ) {
      updateTraits(
        selected.filter(
          (id) =>
            id !==
            traitId
        )
      );

      return;
    }

    /*
      Maximum two.

      Do NOT silently replace an
      existing trait.
    */

    if (
      selected.length >=
      MAX_BRAND_CHARACTER_TRAITS
    ) {
      return;
    }

    updateTraits([
      ...selected,
      traitId,
    ]);
  }

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
          items-end
          justify-between

          gap-[12px]
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
            {title}
          </p>

          <p
            className="
              mt-[4px]

              text-[8px]
              leading-[1.4]

              text-white/21
            "
          >
            Select up to 2 traits.
          </p>
        </div>

        <span
          className="
            rounded-full

            border
            border-white/[0.08]

            px-[7px]
            py-[4px]

            text-[7px]

            text-white/28
          "
        >
          {selected.length}/
          {MAX_BRAND_CHARACTER_TRAITS}
        </span>
      </div>

      {/* ======================================== */}
      {/* TRAITS                                   */}
      {/* ======================================== */}

      <div
        className="
          mt-[11px]

          flex
          flex-wrap

          gap-[5px]
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

            const blocked =
              !active &&
              selected.length >=
                MAX_BRAND_CHARACTER_TRAITS;

            return (
              <div
                key={
                  trait.id
                }
                className="
                  group
                  relative
                "
              >
                <button
                  type="button"
                  disabled={
                    blocked
                  }
                  onClick={() =>
                    toggleTrait(
                      trait.id
                    )
                  }
                  className={`
                    rounded-full

                    border

                    px-[8px]
                    py-[5px]

                    text-[8px]
                    leading-none

                    transition-all
                    duration-150

                    ${
                      active
                        ? `
                            border-white
                            bg-white

                            text-black
                          `
                        : blocked
                          ? `
                              cursor-not-allowed

                              border-white/[0.035]

                              bg-transparent

                              text-white/12
                            `
                          : `
                              border-white/[0.075]

                              bg-white/[0.018]

                              text-white/42

                              hover:border-white/18
                              hover:bg-white/[0.045]
                              hover:text-white/72
                            `
                    }
                  `}
                >
                  {
                    trait.label
                  }
                </button>

                {/* ================================= */}
                {/* TOOLTIP                           */}
                {/* ================================= */}

                <div
                  className="
                    pointer-events-none

                    absolute

                    bottom-[calc(100%+8px)]
                    left-1/2

                    z-[200]

                    w-[220px]

                    -translate-x-1/2
                    translate-y-[3px]

                    rounded-[11px]

                    border
                    border-white/[0.1]

                    bg-[#151517]

                    px-[11px]
                    py-[9px]

                    opacity-0

                    shadow-[0_14px_40px_rgba(0,0,0,0.48)]

                    transition-all
                    duration-150

                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <p
                    className="
                      text-[9px]

                      text-white/78

                      oook-medium
                    "
                  >
                    {
                      trait.label
                    }
                  </p>

                  <p
                    className="
                      mt-[4px]

                      text-[8px]
                      leading-[1.45]

                      text-white/43
                    "
                  >
                    {
                      trait.description
                    }
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* ======================================== */}
      {/* LIMIT MESSAGE                            */}
      {/* ======================================== */}

      {selected.length >=
        MAX_BRAND_CHARACTER_TRAITS && (
        <p
          className="
            mt-[8px]

            text-[7px]
            leading-[1.4]

            text-white/18
          "
        >
          Remove one trait to select another.
        </p>
      )}
    </div>
  );
}