"use client";

import { create } from "zustand";
import {
  BrandConfig,
  GuidelineState,
  PartnershipModelId,
} from "@/types/guideline";

const defaultBrandA: BrandConfig = {
  logoUrl: null,
  primaryColor: "#FFFFFF",
  secondaryColor: "#8A8A8A",
  fontFamily: "Arial",
};

const defaultBrandB: BrandConfig = {
  logoUrl: null,
  primaryColor: "#FFFFFF",
  secondaryColor: "#8A8A8A",
  fontFamily: "Arial",
};

export const useGuidelineStore = create<GuidelineState>((set) => ({
  partnershipModel: "axb",

  brandA: defaultBrandA,
  brandB: defaultBrandB,

  setPartnershipModel: (model: PartnershipModelId) =>
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

  reset: () =>
    set({
      partnershipModel: "axb",
      brandA: defaultBrandA,
      brandB: defaultBrandB,
    }),
}));