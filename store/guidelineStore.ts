"use client";

import { create } from "zustand";

import type {
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import type {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export type AdditionalRelationshipMode =
  | "none"
  | "presenting"
  | "sponsored";

export interface GuidelineBrand {
  name: string;

  logoUrl: string | null;

  primaryColor: string;
  secondaryColor: string;

  fontFamily: string;

  characterTraits:
    BrandCharacterTraitId[];
}

interface GuidelineStore {
  partnershipModel:
    PartnershipModelId;

  additionalRelationship:
    AdditionalRelationshipMode;

  brandA:
    GuidelineBrand;

  brandB:
    GuidelineBrand;

  propertyX:
    GuidelineBrand;

  commonFontFamily:
    string;

  setPartnershipModel: (
    model: PartnershipModelId
  ) => void;

  setAdditionalRelationship: (
    mode: AdditionalRelationshipMode
  ) => void;

  updateBrandA: (
    patch: Partial<GuidelineBrand>
  ) => void;

  updateBrandB: (
    patch: Partial<GuidelineBrand>
  ) => void;

  updatePropertyX: (
    patch: Partial<GuidelineBrand>
  ) => void;

  setCommonFontFamily: (
    fontFamily: string
  ) => void;

  resetGuideline: () => void;
}

/* ================================================= */
/* DEFAULTS                                          */
/* ================================================= */

const DEFAULT_FONT =
  '"oook-variable", sans-serif';

function createBrandA(): GuidelineBrand {
  return {
    name: "Brand A",
    logoUrl: null,

    primaryColor: "#FF453A",
    secondaryColor: "#FF8A80",

    fontFamily: DEFAULT_FONT,

    characterTraits: [],
  };
}

function createBrandB(): GuidelineBrand {
  return {
    name: "Brand B",
    logoUrl: null,

    primaryColor: "#3478F6",
    secondaryColor: "#64D2FF",

    fontFamily: DEFAULT_FONT,

    characterTraits: [],
  };
}

function createPropertyX(): GuidelineBrand {
  return {
    name: "Property X",
    logoUrl: null,

    primaryColor: "#8A8A8A",
    secondaryColor: "#B8B8B8",

    fontFamily: DEFAULT_FONT,

    characterTraits: [],
  };
}

/* ================================================= */
/* STORE                                             */
/* ================================================= */

export const useGuidelineStore =
  create<GuidelineStore>((set) => ({
    partnershipModel: "axb",

    additionalRelationship: "none",

    brandA: createBrandA(),

    brandB: createBrandB(),

    propertyX: createPropertyX(),

    commonFontFamily: DEFAULT_FONT,

    setPartnershipModel: (
      partnershipModel
    ) => {
      set({
        partnershipModel,
      });
    },

    setAdditionalRelationship: (
      additionalRelationship
    ) => {
      set({
        additionalRelationship,
      });
    },

    updateBrandA: (patch) => {
      set((state) => ({
        brandA: {
          ...state.brandA,
          ...patch,
        },
      }));
    },

    updateBrandB: (patch) => {
      set((state) => ({
        brandB: {
          ...state.brandB,
          ...patch,
        },
      }));
    },

    updatePropertyX: (patch) => {
      set((state) => ({
        propertyX: {
          ...state.propertyX,
          ...patch,
        },
      }));
    },

    setCommonFontFamily: (
      commonFontFamily
    ) => {
      set({
        commonFontFamily,
      });
    },

    resetGuideline: () => {
      set({
        partnershipModel: "axb",

        additionalRelationship: "none",

        brandA: createBrandA(),

        brandB: createBrandB(),

        propertyX: createPropertyX(),

        commonFontFamily: DEFAULT_FONT,
      });
    },
  }));