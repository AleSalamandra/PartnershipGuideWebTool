"use client";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";

const relationships = [
  {
    id: "axb",
    label: "A × B",
    title: "Equal collaboration",
    description:
      "Both brands share visibility and contribute equally to the experience.",
  },
  {
    id: "aandb",
    label: "A with B",
    title: "Brand-led collaboration",
    description:
      "Brand A leads the experience while Brand B participates visibly.",
  },
  {
    id: "poweredByA",
    label: "B powered by A",
    title: "Technology partnership",
    description:
      "Brand B leads the experience while Brand A enables the technology.",
  },
  {
    id: "presentsB",
    label: "A presents B",
    title: "Presented experience",
    description:
      "One brand owns the environment while presenting the other brand or content.",
  },
] as const;

export default function PartnershipPrinciple() {
  const {
    brandA,
    brandB,
    partnershipModel,
  } = useGuidelineStore();

  const active =
    relationships.find(
      (item) => item.id === partnershipModel
    ) ?? relationships[0];

  return (
    <GuidelinePage>

      {/* HEADER */}
      <header
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[65px]
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
            01 / Partnership
          </p>

          <h1
            className="
              mt-[18px]
              text-[74px]
              leading-[0.95]
              tracking-[-0.055em]
            "
          >
            <span className="oook-semibold">
              Partnership
            </span>{" "}
            <span className="oook-light">
              Principle
            </span>
          </h1>
        </div>

        <LogoRelationship
          brandALogo={brandA.logoUrl}
          brandBLogo={brandB.logoUrl}
        />
      </header>

      {/* SECTION TITLE */}
      <div
        className="
          absolute
          left-[90px]
          top-[230px]
        "
      >
        <p
          className="
            text-[22px]
            uppercase
            tracking-[0.09em]
            text-white/45
          "
        >
          Brand relation nature
        </p>
      </div>

      {/* RELATIONSHIP LIST */}
      <section
        className="
          absolute
          left-[90px]
          top-[300px]
          w-[960px]
        "
      >
        {relationships.map((item) => {
          const selected =
            item.id === partnershipModel;

          return (
            <div
              key={item.id}
              className={`
                grid
                min-h-[94px]
                grid-cols-[220px_1fr]
                items-center
                gap-[50px]
                border-t
                px-[4px]

                ${
                  selected
                    ? "border-white/50"
                    : "border-white/10"
                }
              `}
            >
              <div>
                <p
                  className={`
                    text-[22px]
                    ${
                      selected
                        ? "text-white"
                        : "text-white/45"
                    }
                  `}
                >
                  {item.label}
                </p>
              </div>

              <div>
                <p
                  className={`
                    text-[21px]
                    oook-medium
                    ${
                      selected
                        ? "text-white"
                        : "text-white/60"
                    }
                  `}
                >
                  {item.title}
                </p>

                <p
                  className={`
                    mt-[5px]
                    text-[17px]
                    leading-[1.3]

                    ${
                      selected
                        ? "text-white/55"
                        : "text-white/30"
                    }
                  `}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}

        <div className="border-t border-white/10" />
      </section>

      {/* ACTIVE PRINCIPLE */}
      <aside
        className="
          absolute
          bottom-[80px]
          left-[90px]
          right-[90px]
          rounded-[26px]
          border border-white/10
          bg-white/[0.035]
          px-[38px]
          py-[30px]
        "
      >
        <div className="grid grid-cols-[240px_1fr] gap-[40px]">

          <p
            className="
              text-[14px]
              uppercase
              tracking-[0.16em]
              text-white/35
            "
          >
            Selected principle
          </p>

          <div>
            <p className="text-[22px] oook-medium">
              {active.label}
            </p>

            <p
              className="
                mt-[8px]
                max-w-[900px]
                text-[28px]
                leading-[1.25]
                tracking-[-0.02em]
                text-white/70
                oook-light
              "
            >
              {active.description}
            </p>
          </div>

        </div>
      </aside>

    </GuidelinePage>
  );
}

interface LogoRelationshipProps {
  brandALogo: string | null;
  brandBLogo: string | null;
}

function LogoRelationship({
  brandALogo,
  brandBLogo,
}: LogoRelationshipProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-[22px]
      "
    >
      <div className="h-[52px] w-[135px]">
        <BrandLogo
          logoUrl={brandALogo}
          fallback="Brand A"
        />
      </div>

      <span className="text-[25px] text-white/25">
        ×
      </span>

      <div className="h-[52px] w-[135px]">
        <BrandLogo
          logoUrl={brandBLogo}
          fallback="Brand B"
        />
      </div>
    </div>
  );
}