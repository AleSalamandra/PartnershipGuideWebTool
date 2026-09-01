"use client";

import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";
import { partnershipModels } from "@/data/partnershipModels";

interface GenericPageProps {
  pageNumber: string;
  title: string;
}

export default function GenericPage({
  pageNumber,
  title,
}: GenericPageProps) {
  const {
    partnershipModel,
  } = useGuidelineStore();

  const model =
    partnershipModels[partnershipModel];

  return (
    <GuidelinePage>

      <header
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[70px]
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[15px]
              uppercase
              tracking-[0.15em]
              text-white/35
            "
          >
            {pageNumber} / Partnership
          </p>

          <h1
            className="
              mt-[18px]
              text-[76px]
              leading-[0.95]
              tracking-[-0.055em]
            "
          >
            {title}
          </h1>
        </div>

        <p
          className="
            text-[18px]
            text-white/35
          "
        >
          {model.label}
        </p>
      </header>

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[250px]
        "
      >
        <div className="h-px bg-white/10" />

        <div
          className="
            grid
            grid-cols-[420px_1fr]
            gap-[100px]
            pt-[55px]
          "
        >
          <div>
            <p
              className="
                text-[15px]
                uppercase
                tracking-[0.15em]
                text-white/35
              "
            >
              Principle
            </p>

            <p
              className="
                mt-[18px]
                text-[36px]
                leading-[1.15]
                tracking-[-0.03em]
                oook-light
              "
            >
              A clear and consistent visual
              relationship between both brands.
            </p>
          </div>

          <div
            className="
              min-h-[430px]
              rounded-[28px]
              border border-white/10
              bg-white/[0.025]
            "
          />
        </div>
      </section>

    </GuidelinePage>
  );
}