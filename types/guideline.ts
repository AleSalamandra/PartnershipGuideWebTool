import type {
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

/* ================================================= */
/* PARTNERSHIP MODEL                                 */
/* ================================================= */

export type PartnershipModelId =
  | "axb"
  | "aandb"
  | "poweredByA"
  | "presentsB";

/* ================================================= */
/* ADDITIONAL RELATIONSHIP                           */
/* ================================================= */

/*
  This layer is completely independent from
  the A / B partnership model.

  Example:

  A × B
       +
  Presenting X

  or

  B powered by A
       +
  Sponsored by X
*/

export type AdditionalRelationshipMode =
  | "none"
  | "presenting"
  | "sponsored";

/* ================================================= */
/* BRAND                                             */
/* ================================================= */

export interface BrandConfig {
  name: string;

  logoUrl:
    string | null;

  primaryColor:
    string;

  secondaryColor:
    string;

  fontFamily:
    string;

  characterTraits:
    BrandCharacterTraitId[];
}

/* ================================================= */
/* PROPERTY / SPONSOR X                              */
/* ================================================= */

/*
  We keep one persistent X object regardless of
  whether X is acting as:

  - presented property
  - sponsor

  Presenting mode uses the complete identity.
  Sponsored mode intentionally uses only name/logo
  in the visual system.

  Keeping one object means switching modes does not
  destroy information the user already entered.
*/

export interface PropertyXConfig {
  name: string;

  logoUrl:
    string | null;

  primaryColor:
    string;

  secondaryColor:
    string;

  fontFamily:
    string;

  characterTraits:
    BrandCharacterTraitId[];
}

/* ================================================= */
/* STORE                                             */
/* ================================================= */

export interface GuidelineStoreState {
  partnershipModel:
    PartnershipModelId;

  additionalRelationship:
    AdditionalRelationshipMode;

  brandA:
    BrandConfig;

  brandB:
    BrandConfig;

  propertyX:
    PropertyXConfig;

  setPartnershipModel: (
    model:
      PartnershipModelId
  ) => void;

  setAdditionalRelationship: (
    mode:
      AdditionalRelationshipMode
  ) => void;

  updateBrandA: (
    patch:
      Partial<BrandConfig>
  ) => void;

  updateBrandB: (
    patch:
      Partial<BrandConfig>
  ) => void;

  updatePropertyX: (
    patch:
      Partial<PropertyXConfig>
  ) => void;

  resetGuideline: () => void;
}