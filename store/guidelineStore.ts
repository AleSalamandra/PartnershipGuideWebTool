import {
  create,
} from "zustand";

import type {
  BrandConfig,
  GuidelineStoreState,
  PropertyXConfig,
} from "@/types/guideline";

/* ================================================= */
/* DEFAULTS                                          */
/* ================================================= */

export const DEFAULT_FONT =
  '"oook-variable", sans-serif';

export const DEFAULT_A_PRIMARY =
  "#FF453A";

export const DEFAULT_A_SECONDARY =
  "#FF8A80";

export const DEFAULT_B_PRIMARY =
  "#3478F6";

export const DEFAULT_B_SECONDARY =
  "#64D2FF";

export const DEFAULT_X_PRIMARY =
  "#8A8A8A";

export const DEFAULT_X_SECONDARY =
  "#B9B9B9";

/* ================================================= */
/* DEFAULT FACTORIES                                 */
/* ================================================= */

/*
  Factories rather than shared objects so arrays and
  nested state are always recreated on Reset.
*/

export function createDefaultBrandA():
  BrandConfig {
  return {
    name:
      "Brand A",

    logoUrl:
      null,

    primaryColor:
      DEFAULT_A_PRIMARY,

    secondaryColor:
      DEFAULT_A_SECONDARY,

    fontFamily:
      DEFAULT_FONT,

    characterTraits:
      [],
  };
}

export function createDefaultBrandB():
  BrandConfig {
  return {
    name:
      "Brand B",

    logoUrl:
      null,

    primaryColor:
      DEFAULT_B_PRIMARY,

    secondaryColor:
      DEFAULT_B_SECONDARY,

    fontFamily:
      DEFAULT_FONT,

    characterTraits:
      [],
  };
}

export function createDefaultPropertyX():
  PropertyXConfig {
  return {
    name:
      "X",

    logoUrl:
      null,

    primaryColor:
      DEFAULT_X_PRIMARY,

    secondaryColor:
      DEFAULT_X_SECONDARY,

    fontFamily:
      DEFAULT_FONT,

    characterTraits:
      [],
  };
}

/* ================================================= */
/* STORE                                             */
/* ================================================= */

export const useGuidelineStore =
  create<GuidelineStoreState>(
    (
      set
    ) => ({
      /* ========================================= */
      /* DATA                                      */
      /* ========================================= */

      partnershipModel:
        "axb",

      additionalRelationship:
        "none",

      brandA:
        createDefaultBrandA(),

      brandB:
        createDefaultBrandB(),

      propertyX:
        createDefaultPropertyX(),

      /* ========================================= */
      /* PARTNERSHIP                               */
      /* ========================================= */

      setPartnershipModel: (
        model
      ) => {
        set({
          partnershipModel:
            model,
        });
      },

      /* ========================================= */
      /* ADDITIONAL RELATIONSHIP                   */
      /* ========================================= */

      setAdditionalRelationship: (
        mode
      ) => {
        set({
          additionalRelationship:
            mode,
        });
      },

      /* ========================================= */
      /* BRAND A                                   */
      /* ========================================= */

      updateBrandA: (
        patch
      ) => {
        set(
          (
            state
          ) => ({
            brandA: {
              ...state.brandA,
              ...patch,
            },
          })
        );
      },

      /* ========================================= */
      /* BRAND B                                   */
      /* ========================================= */

      updateBrandB: (
        patch
      ) => {
        set(
          (
            state
          ) => ({
            brandB: {
              ...state.brandB,
              ...patch,
            },
          })
        );
      },

      /* ========================================= */
      /* PROPERTY X                                */
      /* ========================================= */

      updatePropertyX: (
        patch
      ) => {
        set(
          (
            state
          ) => ({
            propertyX: {
              ...state.propertyX,
              ...patch,
            },
          })
        );
      },

      /* ========================================= */
      /* RESET                                     */
      /* ========================================= */

      resetGuideline: () => {
        set({
          partnershipModel:
            "axb",

          additionalRelationship:
            "none",

          brandA:
            createDefaultBrandA(),

          brandB:
            createDefaultBrandB(),

          propertyX:
            createDefaultPropertyX(),
        });
      },
    })
  );