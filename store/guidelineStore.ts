"use client";

import { create } from "zustand";

import {
  BrandConfig,
  GuidelineState,
  PartnershipModelId,
} from "@/types/guideline";

const defaultBrandA: BrandConfig = {
  name: "Brand A",
  logoUrl: null,
  primaryColor: "#FFFFFF",
  secondaryColor: "#8A8A8A",
  fontFamily: "Arial",
};

const defaultBrandB: BrandConfig = {
  name: "Brand B",
  logoUrl: null,
  primaryColor: "#FFFFFF",
  secondaryColor: "#8A8A8A",
  fontFamily: "Arial",
};

export const useGuidelineStore =
  create<GuidelineState>((set) => ({
    partnershipModel: "axb",

    brandA: {
      ...defaultBrandA,
    },

    brandB: {
      ...defaultBrandB,
    },

    commonFontFamily:
      "oook-variable",

    setPartnershipModel: (
      model: PartnershipModelId
    ) =>
      set({
        partnershipModel: model,
      }),

    updateBrandA: (data) =>
      set((state) => ({
        brandA: {
          ...state.brandA,
          ...data,
        },
      })),

    updateBrandB: (data) =>
      set((state) => ({
        brandB: {
          ...state.brandB,
          ...data,
        },
      })),

    setCommonFontFamily: (
      fontFamily
    ) =>
      set({
        commonFontFamily:
          fontFamily,
      }),

    reset: () =>
      set({
        partnershipModel: "axb",

        brandA: {
          ...defaultBrandA,
        },

        brandB: {
          ...defaultBrandB,
        },

        commonFontFamily:
          "oook-variable",
      }),
  }));