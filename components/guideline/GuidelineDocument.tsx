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

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export interface GuidelinePageDefinition {
  /*
    Stable unique identifier.

    Used by ThumbnailBar as React key
    and by GuidelineDocument for remounting.
  */

  id:
    string;

  /*
    Visible document number.

    IMPORTANT:
    ThumbnailBar consumes this value.
  */

  number:
    string;

  /*
    Kept as an alias for UI components that may
    use `label` rather than `number`.

    This also keeps the page metadata resilient
    while we debug the viewer.
  */

  label:
    string;

  /*
    Human-readable page name.
  */

  title:
    string;

  component:
    ComponentType;
}

interface GuidelineDocumentProps {
  currentPage:
    number;
}

/* ================================================= */
/* PAGES                                             */
/* ================================================= */

/*
  DOCUMENT ORDER

  01  Cover
  02  Partnership Principle
  03  Partnership Model
  04  Corporate Visuals
  05  Logo Positioning
  06  Brand Hierarchy
  07  Opening Keyframes
  08  Content Branding
  09  Closing
  10  Colours
  11  Typography
  12  Graphic Language
  13  Motion Language
  14  Footage & Image Treatment
  15  Complete Example


  IMPORTANT:

  Do not turn this back into an array
  of bare React components.

  Several parts of the application consume
  the metadata attached to each page.
*/

export const GUIDELINE_PAGES:
  GuidelinePageDefinition[] = [
    {
      id:
        "cover",

      number:
        "01",

      label:
        "01",

      title:
        "Cover",

      component:
        CoverPage,
    },

    {
      id:
        "partnership-principle",

      number:
        "02",

      label:
        "02",

      title:
        "Partnership Principle",

      component:
        PartnershipPrinciple,
    },

    {
      id:
        "page-01",

      number:
        "03",

      label:
        "03",

      title:
        "Partnership Model",

      component:
        Page01,
    },

    {
      id:
        "page-02",

      number:
        "04",

      label:
        "04",

      title:
        "Corporate Visuals",

      component:
        Page02,
    },

    {
      id:
        "page-03",

      number:
        "05",

      label:
        "05",

      title:
        "Logo Positioning",

      component:
        Page03,
    },

    {
      id:
        "page-04",

      number:
        "06",

      label:
        "06",

      title:
        "Brand Hierarchy",

      component:
        Page04,
    },

    {
      id:
        "page-05",

      number:
        "07",

      label:
        "07",

      title:
        "Opening Keyframes",

      component:
        Page05,
    },

    {
      id:
        "page-06",

      number:
        "08",

      label:
        "08",

      title:
        "Content Branding",

      component:
        Page06,
    },

    {
      id:
        "page-07",

      number:
        "09",

      label:
        "09",

      title:
        "Closing",

      component:
        Page07,
    },

    {
      id:
        "page-08",

      number:
        "10",

      label:
        "10",

      title:
        "Colours",

      component:
        Page08,
    },

    {
      id:
        "page-09",

      number:
        "11",

      label:
        "11",

      title:
        "Typography",

      component:
        Page09,
    },

    {
      id:
        "page-10",

      number:
        "12",

      label:
        "12",

      title:
        "Graphic Language",

      component:
        Page10,
    },

    {
      id:
        "page-11",

      number:
        "13",

      label:
        "13",

      title:
        "Motion Language",

      component:
        Page11,
    },

    {
      id:
        "page-12",

      number:
        "14",

      label:
        "14",

      title:
        "Footage & Image Treatment",

      component:
        Page12,
    },

    {
      id:
        "page-13",

      number:
        "15",

      label:
        "15",

      title:
        "Complete Example",

      component:
        Page13,
    },
  ];

/* ================================================= */
/* SAFE PAGE INDEX                                   */
/* ================================================= */

function getSafePageIndex(
  value:
    number
) {
  if (
    !Number.isFinite(
      value
    )
  ) {
    return 0;
  }

  const pageIndex =
    Math.floor(
      value
    );

  return Math.max(
    0,

    Math.min(
      GUIDELINE_PAGES.length -
        1,

      pageIndex
    )
  );
}

/* ================================================= */
/* DOCUMENT                                          */
/* ================================================= */

export default function GuidelineDocument({
  currentPage,
}: GuidelineDocumentProps) {
  const partnershipModel =
    useGuidelineStore(
      (
        state
      ) =>
        state.partnershipModel
    );

  const additionalRelationship =
    useGuidelineStore(
      (
        state
      ) =>
        state.additionalRelationship
    );

  /* ------------------------------------------------ */
  /* CURRENT PAGE                                     */
  /* ------------------------------------------------ */

  const pageIndex =
    getSafePageIndex(
      currentPage
    );

  const pageDefinition =
    GUIDELINE_PAGES[
      pageIndex
    ];

  const CurrentPage =
    pageDefinition.component;

  /* ------------------------------------------------ */
  /* REMOUNT KEY                                      */
  /* ------------------------------------------------ */

  const pageKey =
    [
      pageDefinition.id,

      partnershipModel,

      additionalRelationship,
    ].join(
      "-"
    );

  /* ------------------------------------------------ */
  /* RENDER                                           */
  /* ------------------------------------------------ */

  return (
    <div
      data-guideline-document="true"

      data-guideline-page-id={
        pageDefinition.id
      }

      data-guideline-page-number={
        pageDefinition.number
      }

      className="
        relative

        h-[900px]
        w-[1600px]

        shrink-0

        overflow-hidden
      "
    >
      <CurrentPage
        key={
          pageKey
        }
      />
    </div>
  );
}