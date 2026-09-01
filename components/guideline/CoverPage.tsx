"use client";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";

export default function CoverPage() {
  const {
    brandA,
    brandB,
  } = useGuidelineStore();

  const brandAName =
    brandA.name.trim() || "Brand A";

  const brandBName =
    brandB.name.trim() || "Brand B";

  return (
    <GuidelinePage>
      {/* TOP LABEL */}

      <header
        className="
          absolute
          left-[90px]
          top-[72px]
        "
      >
        <p
          className="
            text-[18px]
            uppercase
            tracking-[0.16em]
            text-white/45
          "
        >
          Visual Partnership Guidelines
        </p>
      </header>

      {/* HERO */}

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[180px]
        "
      >
        <h1
          className="
            max-w-[1150px]
            text-[126px]
            leading-[0.9]
            tracking-[-0.065em]
          "
        >
          <span className="oook-semibold">
            Style
          </span>{" "}
          <span className="oook-light">
            Guide
          </span>
        </h1>

        <p
          className="
            mt-[30px]
            max-w-[650px]
            text-[26px]
            leading-[1.35]
            tracking-[-0.02em]
            text-white/50
            oook-light
          "
        >
          A flexible visual system for creating a
          coherent collaboration between two brands.
        </p>
      </section>

      {/* BRAND RELATIONSHIP */}

      <section
        className="
          absolute
          bottom-[100px]
          left-[90px]
          right-[90px]
        "
      >
        <div className="mb-[26px] h-px bg-white/12" />

        <div
          className="
            grid
            grid-cols-[1fr_100px_1fr]
            items-center
            gap-[30px]
          "
        >
          <BrandCard
            eyebrow={brandAName}
            logoUrl={brandA.logoUrl}
            fallback={brandAName}
          />

          <div className="flex items-center justify-center">
            <span
              className="
                text-[44px]
                text-white/55
                oook-light
              "
            >
              ×
            </span>
          </div>

          <BrandCard
            eyebrow={brandBName}
            logoUrl={brandB.logoUrl}
            fallback={brandBName}
          />
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* BRAND CARD                                       */
/* ------------------------------------------------ */

interface BrandCardProps {
  eyebrow: string;
  logoUrl: string | null;
  fallback: string;
}

function BrandCard({
  eyebrow,
  logoUrl,
  fallback,
}: BrandCardProps) {
  return (
    <div
      className="
        relative
        h-[190px]
        rounded-[24px]
        border
        border-white/10
        bg-white/[0.025]
        p-[28px]
      "
    >
      <p
        className="
          absolute
          left-[28px]
          top-[22px]
          max-w-[85%]
          truncate
          text-[14px]
          uppercase
          tracking-[0.16em]
          text-white/35
        "
      >
        {eyebrow}
      </p>

      <div
        className="
          absolute
          bottom-[30px]
          left-[28px]
          right-[28px]
          top-[62px]
        "
      >
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </div>
  );
}