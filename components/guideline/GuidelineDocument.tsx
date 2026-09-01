"use client";

import { useGuidelineStore } from "@/store/guidelineStore";
import { partnershipModels } from "@/data/partnershipModels";

/* COMMON PAGES */
import CoverPage from "./CoverPage";
import PartnershipPrinciple from "./PartnershipPrinciple";

/* PARTNERSHIP MODEL PAGES */
import Page01 from "./Page01";
import Page02 from "./Page02";
import Page03 from "./Page03";
import Page04 from "./Page04";
import Page05 from "./Page05";
import Page06 from "./Page06";

/* FALLBACK */
import GenericPage from "./GenericPage";

interface GuidelineDocumentProps {
  currentPage: number;
}

export default function GuidelineDocument({
  currentPage,
}: GuidelineDocumentProps) {
  const partnershipModel =
    useGuidelineStore(
      (state) => state.partnershipModel
    );

  const model =
    partnershipModels[
      partnershipModel
    ];

  const pages = model.pages;

  const page =
    pages[currentPage];

  if (!page) {
    return null;
  }

  switch (page.type) {
    /* ------------------------------------------ */
    /* COMMON PAGES                               */
    /* ------------------------------------------ */

    case "cover":
      return <CoverPage />;

    case "principle":
      return (
        <PartnershipPrinciple />
      );

    /* ------------------------------------------ */
    /* PARTNERSHIP MODEL PAGES                    */
    /* ------------------------------------------ */

    /*
      PAGE 01
      Partnership model / relationship
    */
    case "relationship":
      return <Page01 />;

    /*
      PAGE 02
      Corporate visuals
    */
    case "logo-system":
      return <Page02 />;

    /*
      PAGE 03
      Logo application / usage
    */
    case "application":
      return <Page03 />;

    /*
      PAGE 04
      Content
    */
    case "content":
      return <Page04 />;

    /*
      PAGE 05
      Motion / opening + closing
    */
    case "motion":
      return <Page05 />;

    /*
      PAGE 06
      Shared visuals
    */
    case "shared-visuals":
      return <Page06 />;

    /* ------------------------------------------ */
    /* FALLBACK                                   */
    /* ------------------------------------------ */

    default:
      return (
        <GenericPage
          pageNumber={page.number}
          title={page.title}
        />
      );
  }
}