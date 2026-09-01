export type PartnershipModelId =
  | "axb"
  | "aandb"
  | "poweredByA"
  | "presentsB";

export interface BrandConfig {
  name: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface GuidelineState {
  partnershipModel: PartnershipModelId;

  brandA: BrandConfig;
  brandB: BrandConfig;

  commonFontFamily: string;

  setPartnershipModel: (
    model: PartnershipModelId
  ) => void;

  updateBrandA: (
    data: Partial<BrandConfig>
  ) => void;

  updateBrandB: (
    data: Partial<BrandConfig>
  ) => void;

  setCommonFontFamily: (
    fontFamily: string
  ) => void;

  reset: () => void;
}