"use client";

import { useGuidelineStore } from "@/store/guidelineStore";
import { partnershipModels } from "@/data/partnershipModels";

import CoverPage from "./CoverPage";
import PartnershipPrinciple from "./PartnershipPrinciple";
import GenericPage from "./GenericPage";

interface GuidelineDocumentProps {
  currentPage: number;
}

export default function GuidelineDocument({
  currentPage,
}: GuidelineDocumentProps) {
  const partnershipModel = useGuidelineStore(
    (state) => state.partnershipModel
  );

  const pages = partnershipModels[partnershipModel].pages;
  const page = pages[currentPage];

  if (!page) return null;

  switch (page.type) {
    case "cover":
      return <CoverPage />;

    case "principle":
      return <PartnershipPrinciple />;

    default:
      return (
        <GenericPage
          pageNumber={page.number}
          title={page.title}
        />
      );
  }
}