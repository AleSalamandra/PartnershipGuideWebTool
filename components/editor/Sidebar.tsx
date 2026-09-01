"use client";

import { useGuidelineStore } from "@/store/guidelineStore";

import {
  partnershipModels,
  partnershipModelOptions,
} from "@/data/partnershipModels";

import {
  BrandConfig,
  PartnershipModelId,
} from "@/types/guideline";

import LogoUploader from "./LogoUploader";
import FontUploader from "./FontUploader";

export default function Sidebar() {
  const {
    partnershipModel,

    brandA,
    brandB,

    commonFontFamily,

    setPartnershipModel,

    updateBrandA,
    updateBrandB,

    setCommonFontFamily,

    reset,
  } = useGuidelineStore();

  const model =
    partnershipModels[
      partnershipModel
    ];

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
        text-white
      "
    >
      {/* HEADER */}

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
          pb-[50px]
        "
      >
        {/* PARTNERSHIP */}

        <section className="py-[28px]">
          <SectionTitle>
            Partnership model
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
              (option) => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.label}
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
          brand={brandA}
          update={updateBrandA}
        />

        <Divider />

        {/* BRAND B */}

        <BrandSection
          title="Brand B"
          brand={brandB}
          update={updateBrandB}
        />

        <Divider />

        {/* COMMON TYPOGRAPHY */}

        <section className="py-[28px]">
          <SectionTitle>
            Common typography
          </SectionTitle>

          <p
            className="
              mt-[10px]
              text-[13px]
              leading-[1.45]
              text-white/35
            "
          >
            Typeface used for shared
            partnership messaging.
          </p>

          <div className="mt-[18px]">
            <FieldLabel>
              Typeface
            </FieldLabel>

            <FontUploader
              label="Common Typography"
              currentFont={
                commonFontFamily
              }
              onChange={
                setCommonFontFamily
              }
            />
          </div>

          {commonFontFamily !==
            "oook-variable" && (
            <button
              onClick={() =>
                setCommonFontFamily(
                  "oook-variable"
                )
              }
              className="
                mt-[10px]
                text-[12px]
                text-white/30
                transition
                hover:text-white/65
              "
            >
              Reset to Oook Variable
            </button>
          )}
        </section>
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

/* ---------------------------------------------- */
/* BRAND SECTION                                  */
/* ---------------------------------------------- */

interface BrandSectionProps {
  title: string;

  brand: BrandConfig;

  update: (
    data: Partial<BrandConfig>
  ) => void;
}

function BrandSection({
  title,
  brand,
  update,
}: BrandSectionProps) {
  return (
    <section className="py-[28px]">
      <SectionTitle>
        {title}
      </SectionTitle>

      {/* NAME */}

      <div className="mt-[20px]">
        <FieldLabel>
          Brand name
        </FieldLabel>

        <TextField
          value={brand.name}
          placeholder={title}
          onChange={(value) =>
            update({
              name: value,
            })
          }
        />
      </div>

      {/* LOGO */}

      <div className="mt-[24px]">
        <FieldLabel>
          Logo
        </FieldLabel>

        <LogoUploader
          value={brand.logoUrl}
          onChange={(logoUrl) =>
            update({
              logoUrl,
            })
          }
        />
      </div>

      {/* PRIMARY */}

      <div className="mt-[24px]">
        <FieldLabel>
          Primary color
        </FieldLabel>

        <ColorField
          value={
            brand.primaryColor
          }
          onChange={(value) =>
            update({
              primaryColor: value,
            })
          }
        />
      </div>

      {/* SECONDARY */}

      <div className="mt-[18px]">
        <FieldLabel>
          Secondary color
        </FieldLabel>

        <ColorField
          value={
            brand.secondaryColor
          }
          onChange={(value) =>
            update({
              secondaryColor:
                value,
            })
          }
        />
      </div>

      {/* TYPEFACE */}

      <div className="mt-[24px]">
        <FieldLabel>
          Typeface
        </FieldLabel>

        <FontUploader
          label={title}
          currentFont={
            brand.fontFamily
          }
          onChange={(
            fontFamily
          ) =>
            update({
              fontFamily,
            })
          }
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------- */
/* TEXT FIELD                                     */
/* ---------------------------------------------- */

function TextField({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;

  onChange: (
    value: string
  ) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) =>
        onChange(
          event.target.value
        )
      }
      className="
        h-[48px]
        w-full
        rounded-[14px]
        border
        border-white/10
        bg-white/[0.025]
        px-[15px]
        text-[14px]
        text-white
        outline-none
        transition
        placeholder:text-white/20
        hover:border-white/15
        focus:border-white/25
        focus:bg-white/[0.035]
      "
    />
  );
}

/* ---------------------------------------------- */
/* COLOR                                          */
/* ---------------------------------------------- */

function ColorField({
  value,
  onChange,
}: {
  value: string;

  onChange: (
    value: string
  ) => void;
}) {
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
        transition
        hover:border-white/15
        focus-within:border-white/25
      "
    >
      <input
        type="color"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="
          h-[27px]
          w-[27px]
          shrink-0
          cursor-pointer
          border-0
          bg-transparent
          p-0
        "
      />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
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

/* ---------------------------------------------- */
/* SMALL COMPONENTS                               */
/* ---------------------------------------------- */

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

function Divider() {
  return (
    <div className="h-px bg-white/[0.07]" />
  );
}