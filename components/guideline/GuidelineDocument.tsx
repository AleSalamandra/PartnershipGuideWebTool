"use client";

import CoverPage from "./CoverPage";
import PartnershipPrinciple from "./PartnershipPrinciple";

import Page01 from "./Page01";
import Page02 from "./Page02";
import Page03 from "./Page03";
import Page04 from "./Page04";
import Page05 from "./Page05";
import Page06 from "./Page06";
import Page07 from "./Page07";
import Page08 from "./Page08";
import Page09 from "./Page09";
import Page10 from "./Page10";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

export interface GuidelinePageDefinition {
  id: string;
  number: string;
  title: string;
  component: React.ComponentType;
}

interface GuidelineDocumentProps {
  currentPage: number;
}

/* ------------------------------------------------ */
/* DOCUMENT STRUCTURE                               */
/* ------------------------------------------------ */

/*
  This is now the SINGLE SOURCE OF TRUTH
  for the document structure.

  Adding a page here automatically adds it
  to the viewer navigation.
*/

export const GUIDELINE_PAGES: GuidelinePageDefinition[] = [
  {
    id: "cover",
    number: "01",
    title: "Style Guide",
    component: CoverPage,
  },

  {
    id: "partnership-principle",
    number: "02",
    title: "Partnership Principle",
    component: PartnershipPrinciple,
  },

  {
    id: "partnership-model",
    number: "03",
    title: "Partnership Model",
    component: Page01,
  },

  {
    id: "corporate-visuals",
    number: "04",
    title: "Corporate Visuals",
    component: Page02,
  },

  {
    id: "logo-positioning",
    number: "05",
    title: "Logo Positioning Suggestions",
    component: Page03,
  },

  {
    id: "brand-hierarchy",
    number: "06",
    title: "Brand Hierarchy Across Media",
    component: Page04,
  },

  {
    id: "opening-motion",
    number: "07",
    title: "Video Opening Keyframes",
    component: Page05,
  },

  {
    id: "content-identity",
    number: "08",
    title: "Content Branding Applications",
    component: Page06,
  },

  {
    id: "closing-identity",
    number: "09",
    title: "Video Closing Applications",
    component: Page07,
  },

  {
    id: "page-08",
    number: "10",
    title: "Guideline 08",
    component: Page08,
  },

  {
    id: "page-09",
    number: "11",
    title: "Guideline 09",
    component: Page09,
  },

  {
    id: "page-10",
    number: "12",
    title: "Guideline 10",
    component: Page10,
  },
];

/* ------------------------------------------------ */
/* PAGE COUNT                                       */
/* ------------------------------------------------ */

export const GUIDELINE_PAGE_COUNT =
  GUIDELINE_PAGES.length;

/* ------------------------------------------------ */
/* DOCUMENT                                         */
/* ------------------------------------------------ */

export default function GuidelineDocument({
  currentPage,
}: GuidelineDocumentProps) {
  /*
    Protect against indexes outside the
    available document range.
  */

  const safePage = Math.min(
    Math.max(currentPage, 0),
    GUIDELINE_PAGES.length - 1
  );

  const pageDefinition =
    GUIDELINE_PAGES[safePage];

  const CurrentPage =
    pageDefinition.component;

  return <CurrentPage />;
}