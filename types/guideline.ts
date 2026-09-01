export type PartnershipModelId =
  | "axb"
  | "aandb"
  | "poweredByA"
  | "presentsB";

export interface BrandConfig {
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface GuidelineState {
  partnershipModel: PartnershipModelId;

  brandA: BrandConfig;
  brandB: BrandConfig;

  setPartnershipModel: (model: PartnershipModelId) => void;

  updateBrandA: (data: Partial<BrandConfig>) => void;
  updateBrandB: (data: Partial<BrandConfig>) => void;

  reset: () => void;
}