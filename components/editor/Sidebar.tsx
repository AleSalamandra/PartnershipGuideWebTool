"use client";

import { useGuidelineStore } from "@/store/guidelineStore";

import {
  partnershipModels,
  partnershipModelOptions,
} from "@/data/partnershipModels";

import { PartnershipModelId } from "@/types/guideline";

import LogoUploader from "./LogoUploader";
import FontUploader from "./FontUploader";

export default function Sidebar() {
  const {
    partnershipModel,

    brandA,
    brandB,

    setPartnershipModel,

    updateBrandA,
    updateBrandB,

    reset,
  } = useGuidelineStore();

  const model =
    partnershipModels[partnershipModel];

  return (
    <aside
      className="
        flex
        h-screen
        w-[390px]
        shrink-0
        flex-col
        border-l
        border-white/[0.07]
        bg-[#101011]
      "
    >

      {/* TOP */}
      <header
        className="
          shrink-0
          border-b
          border-white/[0.07]
          px-[26px]
          py-[24px]
        "
      >
        <p className="text-[16px] oook-medium">
          Configure
        </p>

        <p className="mt-[4px] text-[13px] text-white/35">
          Partnership visual system
        </p>
      </header>

      {/* CONTENT */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-[26px]
          pb-[60px]
        "
      >

        {/* PARTNERSHIP */}
        <section className="py-[28px]">
          <SectionTitle>
            Partnership
          </SectionTitle>

          <select
            value={partnershipModel}
            onChange={(event) =>
              setPartnershipModel(
                event.target
                  .value as PartnershipModelId
              )
            }
            className="
              mt-[16px]
              h-[52px]
              w-full
              rounded-[14px]
              border
              border-white/10
              bg-white/[0.035]
              px-[16px]
              text-[15px]
              text-white
              outline-none
              transition
              focus:border-white/25
            "
          >
            {partnershipModelOptions.map(
              (item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.label}
                </option>
              )
            )}
          </select>

          <p
            className="
              mt-[12px]
              text-[13px]
              leading-[1.45]
              text-white/35
            "
          >
            {model.description}
          </p>
        </section>

        <Divider />

        {/* BRAND A */}
        <BrandSection
          title="Brand A"
          logo={brandA.logoUrl}
          primaryColor={
            brandA.primaryColor
          }
          secondaryColor={
            brandA.secondaryColor
          }
          font={brandA.fontFamily}
          update={updateBrandA}
        />

        <Divider />

        {/* BRAND B */}
        <BrandSection
          title="Brand B"
          logo={brandB.logoUrl}
          primaryColor={
            brandB.primaryColor
          }
          secondaryColor={
            brandB.secondaryColor
          }
          font={brandB.fontFamily}
          update={updateBrandB}
        />

      </div>

      {/* FOOTER */}
      <footer
        className="
          shrink-0
          space-y-[10px]
          border-t
          border-white/[0.07]
          bg-[#101011]
          p-[20px]
        "
      >
        <button
          onClick={reset}
          className="
            h-[48px]
            w-full
            rounded-[14px]
            border
            border-white/10
            text-[14px]
            text-white/50
            transition
            hover:bg-white/[0.04]
            hover:text-white
          "
        >
          Reset
        </button>

        <button
          className="
            h-[50px]
            w-full
            rounded-[14px]
            bg-white
            text-[15px]
            text-black
            oook-medium
            transition
            hover:bg-white/90
          "
        >
          Export PDF
        </button>
      </footer>

    </aside>
  );
}

function Divider() {
  return (
    <div className="h-px bg-white/[0.07]" />
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      className="
        text-[12px]
        uppercase
        tracking-[0.16em]
        text-white/40
      "
    >
      {children}
    </p>
  );
}

interface BrandSectionProps {
  title: string;

  logo: string | null;

  primaryColor: string;
  secondaryColor: string;

  font: string;

  update: (data: any) => void;
}

function BrandSection({
  title,
  logo,
  primaryColor,
  secondaryColor,
  font,
  update,
}: BrandSectionProps) {
  return (
    <section className="py-[28px]">

      <SectionTitle>
        {title}
      </SectionTitle>

      <div className="mt-[18px]">
        <FieldLabel>
          Logo
        </FieldLabel>

        <LogoUploader
          value={logo}
          onChange={(logoUrl) =>
            update({ logoUrl })
          }
        />
      </div>

      <div className="mt-[24px]">
        <FieldLabel>
          Primary color
        </FieldLabel>

        <ColorField
          value={primaryColor}
          onChange={(value) =>
            update({
              primaryColor: value,
            })
          }
        />
      </div>

      <div className="mt-[18px]">
        <FieldLabel>
          Secondary color
        </FieldLabel>

        <ColorField
          value={secondaryColor}
          onChange={(value) =>
            update({
              secondaryColor: value,
            })
          }
        />
      </div>

      <div className="mt-[24px]">
        <FieldLabel>
          Typeface
        </FieldLabel>

        <FontUploader
          label={title}
          currentFont={font}
          onChange={(fontFamily) =>
            update({
              fontFamily,
            })
          }
        />
      </div>

    </section>
  );
}

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      className="
        mb-[9px]
        text-[13px]
        text-white/45
      "
    >
      {children}
    </p>
  );
}

interface ColorFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function ColorField({
  value,
  onChange,
}: ColorFieldProps) {
  return (
    <div
      className="
        flex
        h-[48px]
        items-center
        gap-[12px]
        rounded-[14px]
        border
        border-white/10
        bg-white/[0.025]
        px-[12px]
      "
    >
      <input
        type="color"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-[26px]
          w-[26px]
          cursor-pointer
          border-0
          bg-transparent
        "
      />

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          min-w-0
          flex-1
          bg-transparent
          font-mono
          text-[13px]
          uppercase
          text-white/75
          outline-none
        "
      />
    </div>
  );
}