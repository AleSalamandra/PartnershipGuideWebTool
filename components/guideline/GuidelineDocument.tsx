"use client";

import type {
  ComponentType,
} from "react";

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
import Page11 from "./Page11";
import Page12 from "./Page12";
import Page13 from "./Page13";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

export interface GuidelinePageDefinition {
  id: string;
  number: string;
  title: string;
  component: ComponentType;
}

interface GuidelineDocumentProps {
  currentPage: number;
}

/* ------------------------------------------------ */
/* DOCUMENT STRUCTURE                               */
/* ------------------------------------------------ */

/*
  SINGLE SOURCE OF TRUTH

  01  Cover
  02  Partnership Principle
  03  Partnership Model
  04  Corporate Visuals
  05  Logo Positioning
  06  Brand Hierarchy
  07  Video Opening
  08  Content Branding
  09  Video Closing
  10  Shared Visual Territory — Colour
  11  Shared Visual Territory — Typography
  12  Shared Visual Territory — Graphic Language
  13  Page11
  14  Page12
  15  Page13
*/

export const GUIDELINE_PAGES: GuidelinePageDefinition[] =
  [
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
      component:
        PartnershipPrinciple,
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
      title:
        "Logo Positioning Suggestions",
      component: Page03,
    },

    {
      id: "brand-hierarchy",
      number: "06",
      title:
        "Brand Hierarchy Across Media",
      component: Page04,
    },

    {
      id: "video-opening",
      number: "07",
      title:
        "Video Opening Keyframes",
      component: Page05,
    },

    {
      id: "content-branding",
      number: "08",
      title:
        "Content Branding Applications",
      component: Page06,
    },

    {
      id: "video-closing",
      number: "09",
      title:
        "Video Closing Applications",
      component: Page07,
    },

    {
      id: "shared-colour",
      number: "10",
      title:
        "Shared Visual Territory — Colour",
      component: Page08,
    },

    {
      id: "shared-typography",
      number: "11",
      title:
        "Shared Visual Territory — Typography",
      component: Page09,
    },

    {
      id: "shared-graphic-language",
      number: "12",
      title:
        "Shared Visual Territory — Graphic Language",
      component: Page10,
    },

    {
      id: "page-11",
      number: "13",
      title: "Guideline 11",
      component: Page11,
    },

    {
      id: "page-12",
      number: "14",
      title: "Guideline 12",
      component: Page12,
    },

    {
      id: "page-13",
      number: "15",
      title: "Guideline 13",
      component: Page13,
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
  const safePageIndex =
    Math.min(
      Math.max(
        currentPage,
        0
      ),
      GUIDELINE_PAGES.length -
        1
    );

  const pageDefinition =
    GUIDELINE_PAGES[
      safePageIndex
    ];

  const CurrentPage =
    pageDefinition.component;

  return <CurrentPage />;
}