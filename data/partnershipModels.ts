import { PartnershipModelId } from "@/types/guideline";

export interface GuidelinePageData {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  type:
    | "cover"
    | "principle"
    | "relationship"
    | "logo-system"
    | "application"
    | "content"
    | "motion"
    | "shared-visuals";
}

export interface PartnershipModel {
  id: PartnershipModelId;
  label: string;
  shortLabel: string;
  description: string;
  pages: GuidelinePageData[];
}

const commonPages: GuidelinePageData[] = [
  {
    id: "cover",
    number: "01",
    title: "Style Guide",
    type: "cover",
  },
  {
    id: "partnership-principle",
    number: "02",
    title: "Partnership Principle",
    type: "principle",
  },
];

const createModelPages = (
  model: string,
): GuidelinePageData[] => [
  {
    id: "relationship",
    number: "03",
    title: `${model} — Partnership`,
    type: "relationship",
  },
  {
    id: "logo-system",
    number: "04",
    title: "Logo System",
    type: "logo-system",
  },
  {
    id: "application",
    number: "05",
    title: "Logo Application",
    type: "application",
  },
  {
    id: "content",
    number: "06",
    title: "Content",
    type: "content",
  },
  {
    id: "motion",
    number: "07",
    title: "Motion",
    type: "motion",
  },
  {
    id: "shared-visuals",
    number: "08",
    title: "Shared Visuals",
    type: "shared-visuals",
  },
];

export const partnershipModels: Record<
  PartnershipModelId,
  PartnershipModel
> = {
  axb: {
    id: "axb",
    label: "A × B",
    shortLabel: "A × B",
    description:
      "Both brands participate with equal visual prominence.",
    pages: [...commonPages, ...createModelPages("A × B")],
  },

  aandb: {
    id: "aandb",
    label: "A & B",
    shortLabel: "A & B",
    description:
      "Both brands coexist while maintaining independent identities.",
    pages: [...commonPages, ...createModelPages("A & B")],
  },

  poweredByA: {
    id: "poweredByA",
    label: "B powered by A",
    shortLabel: "powered by",
    description:
      "Brand B leads the experience while Brand A provides the technology.",
    pages: [...commonPages, ...createModelPages("B powered by A")],
  },

  presentsB: {
    id: "presentsB",
    label: "A presents B",
    shortLabel: "presents",
    description:
      "Brand A owns the environment and presents Brand B content.",
    pages: [...commonPages, ...createModelPages("A presents B")],
  },
};

export const partnershipModelOptions = Object.values(
  partnershipModels,
);