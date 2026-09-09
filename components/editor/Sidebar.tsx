"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

import BrandCharacterSelector from "./BrandCharacterSelector";

import {
  DEFAULT_A_PRIMARY,
  DEFAULT_A_SECONDARY,
  DEFAULT_B_PRIMARY,
  DEFAULT_B_SECONDARY,
  DEFAULT_FONT,
  DEFAULT_X_PRIMARY,
  DEFAULT_X_SECONDARY,
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  AdditionalRelationshipMode,
  BrandConfig,
  PartnershipModelId,
  PropertyXConfig,
} from "@/types/guideline";

import {
  exportGuidelinePdf,
} from "@/utils/exportGuidelinePdf";

import {
  useGuidelineThemeStore,
  type GuidelineTheme,
} from "@/components/guideline/GuidelinePage";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type BrandSide =
  | "A"
  | "B";

type IdentityKey =
  | "A"
  | "B"
  | "X";

/* ================================================= */
/* PARTNERSHIP MODELS                                */
/* ================================================= */

const PARTNERSHIP_MODELS: {
  id:
    PartnershipModelId;

  label:
    string;

  description:
    string;
}[] = [
  {
    id:
      "axb",

    label:
      "A × B",

    description:
      "Equal collaboration",
  },

  {
    id:
      "aandb",

    label:
      "A with B",

    description:
      "Brand A leads",
  },

  {
    id:
      "poweredByA",

    label:
      "B powered by A",

    description:
      "Brand B owns the experience",
  },

  {
    id:
      "presentsB",

    label:
      "A presents B",

    description:
      "A platform / B content",
  },
];

/* ================================================= */
/* ADDITIONAL RELATIONSHIPS                          */
/* ================================================= */

const ADDITIONAL_RELATIONSHIPS: {
  id:
    AdditionalRelationshipMode;

  label:
    string;

  description:
    string;
}[] = [
  {
    id:
      "none",

    label:
      "None",

    description:
      "Only Brand A and Brand B",
  },

  {
    id:
      "presenting",

    label:
      "Presenting X",

    description:
      "X actively shapes the shared system",
  },

  {
    id:
      "sponsored",

    label:
      "Sponsored by X",

    description:
      "X appears as a restrained sponsor credit",
  },
];

/* ================================================= */
/* THEMES                                            */
/* ================================================= */

const THEMES: {
  id:
    GuidelineTheme;

  label:
    string;
}[] = [
  {
    id:
      "dark",

    label:
      "Dark",
  },

  {
    id:
      "light",

    label:
      "Light",
  },
];

/* ================================================= */
/* SIDEBAR                                           */
/* ================================================= */

export default function Sidebar() {
  const {
    partnershipModel,
    additionalRelationship,

    brandA,
    brandB,
    propertyX,

    setPartnershipModel,
    setAdditionalRelationship,

    updateBrandA,
    updateBrandB,
    updatePropertyX,

    resetGuideline,
  } =
    useGuidelineStore();

  const theme =
    useGuidelineThemeStore(
      (
        state
      ) =>
        state.theme
    );

  const setTheme =
    useGuidelineThemeStore(
      (
        state
      ) =>
        state.setTheme
    );

  const [
    isExporting,
    setIsExporting,
  ] =
    useState(
      false
    );

  /* ================================================= */
  /* BRAND UPDATE                                      */
  /* ================================================= */

  const updateBrand = (
    side:
      BrandSide,

    patch:
      Partial<BrandConfig>
  ) => {
    if (
      side === "A"
    ) {
      updateBrandA(
        patch
      );

      return;
    }

    updateBrandB(
      patch
    );
  };

  /* ================================================= */
  /* RESET                                             */
  /* ================================================= */

  const handleReset =
    () => {
      setTheme(
        "dark"
      );

      resetGuideline();
    };

  /* ================================================= */
  /* EXPORT                                            */
  /* ================================================= */

  const handleExport =
    async () => {
      if (
        isExporting
      ) {
        return;
      }

      setIsExporting(
        true
      );

      try {
        await exportGuidelinePdf();
      } catch (
        error
      ) {
        console.error(
          "PDF export failed:",
          error
        );

        window.alert(
          "The PDF could not be exported. Check the console for details."
        );
      } finally {
        setIsExporting(
          false
        );
      }
    };

  /* ================================================= */
  /* RENDER                                            */
  /* ================================================= */

  return (
    <aside
      className="
        flex
        h-full
        w-[340px]

        shrink-0
        flex-col

        border-l
        border-white/[0.07]

        bg-[#0b0b0c]
      "
    >
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          shrink-0

          border-b
          border-white/[0.07]

          px-[24px]
          py-[22px]
        "
      >
        <p
          className="
            text-[17px]
            leading-none

            text-white/92

            oook-medium
          "
        >
          Configure
        </p>

        <p
          className="
            mt-[7px]

            text-[10px]
            leading-[1.4]

            text-white/28
          "
        >
          Partnership visual system
        </p>
      </header>

      {/* ======================================== */}
      {/* APPEARANCE                               */}
      {/* ======================================== */}

      <div
        className="
          shrink-0

          border-b
          border-white/[0.07]

          px-[24px]
          py-[16px]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-[14px]
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]

                text-white/48

                oook-medium
              "
            >
              Appearance
            </p>

            <p
              className="
                mt-[3px]

                text-[8px]

                text-white/20
              "
            >
              Document theme
            </p>
          </div>

          <div
            className="
              flex
              shrink-0

              rounded-full

              border
              border-white/[0.08]

              bg-white/[0.025]

              p-[3px]
            "
          >
            {THEMES.map(
              (
                option
              ) => {
                const active =
                  theme ===
                  option.id;

                return (
                  <button
                    key={
                      option.id
                    }

                    type="button"

                    onClick={() =>
                      setTheme(
                        option.id
                      )
                    }

                    className={`
                      flex

                      h-[29px]
                      min-w-[54px]

                      items-center
                      justify-center

                      rounded-full

                      px-[11px]

                      text-[8px]

                      transition-all
                      duration-150

                      ${
                        active
                          ? `
                              bg-white
                              text-black
                            `
                          : `
                              text-white/30

                              hover:bg-white/[0.05]
                              hover:text-white/65
                            `
                      }
                    `}
                  >
                    {
                      option.label
                    }
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* ======================================== */}
      {/* SCROLLABLE                               */}
      {/* ======================================== */}

      <div
        className="
          min-h-0
          flex-1

          overflow-y-auto

          px-[24px]
          py-[24px]

          [scrollbar-width:thin]
          [scrollbar-color:rgba(255,255,255,0.12)_transparent]
        "
      >
        {/* ====================================== */}
        {/* 01 — PARTNERSHIP MODEL                 */}
        {/* ====================================== */}

        <SidebarSection
          eyebrow="01"

          title="Partnership model"

          description="Defines ownership, hierarchy and how Brand A and Brand B relate."
        >
          <div
            className="
              grid
              grid-cols-2
              gap-[7px]
            "
          >
            {PARTNERSHIP_MODELS.map(
              (
                model
              ) => {
                const active =
                  partnershipModel ===
                  model.id;

                return (
                  <SelectionCard
                    key={
                      model.id
                    }

                    active={
                      active
                    }

                    label={
                      model.label
                    }

                    description={
                      model.description
                    }

                    onClick={() =>
                      setPartnershipModel(
                        model.id
                      )
                    }
                  />
                );
              }
            )}
          </div>
        </SidebarSection>

        <Divider />

        {/* ====================================== */}
        {/* 02 — ADDITIONAL RELATIONSHIP           */}
        {/* ====================================== */}

        <SidebarSection
          eyebrow="02"

          title="Additional relationship"

          description="Adds a presented property or commercial sponsor without changing the A / B partnership model."
        >
          <div
            className="
              grid
              grid-cols-1
              gap-[7px]
            "
          >
            {ADDITIONAL_RELATIONSHIPS.map(
              (
                option
              ) => {
                const active =
                  additionalRelationship ===
                  option.id;

                return (
                  <SelectionCard
                    key={
                      option.id
                    }

                    active={
                      active
                    }

                    label={
                      option.label
                    }

                    description={
                      option.description
                    }

                    horizontal

                    onClick={() =>
                      setAdditionalRelationship(
                        option.id
                      )
                    }
                  />
                );
              }
            )}
          </div>

          {/* ==================================== */}
          {/* PRESENTING X                         */}
          {/* ==================================== */}

          {additionalRelationship ===
            "presenting" && (
            <div
              className="
                mt-[20px]

                border-t
                border-white/[0.065]

                pt-[20px]
              "
            >
              <div
                className="
                  mb-[18px]

                  rounded-[12px]

                  border
                  border-white/[0.07]

                  bg-white/[0.018]

                  px-[12px]
                  py-[11px]
                "
              >
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]

                    text-white/46

                    oook-medium
                  "
                >
                  Presented property
                </p>

                <p
                  className="
                    mt-[4px]

                    text-[8px]
                    leading-[1.4]

                    text-white/24
                  "
                >
                  X becomes an active part of colour, typography, character, motion and content identity.
                </p>
              </div>

              <PresentedPropertyEditor
                property={
                  propertyX
                }

                onChange={
                  updatePropertyX
                }
              />
            </div>
          )}

          {/* ==================================== */}
          {/* SPONSORED BY X                       */}
          {/* ==================================== */}

          {additionalRelationship ===
            "sponsored" && (
            <div
              className="
                mt-[20px]

                border-t
                border-white/[0.065]

                pt-[20px]
              "
            >
              <div
                className="
                  mb-[18px]

                  rounded-[12px]

                  border
                  border-white/[0.07]

                  bg-white/[0.018]

                  px-[12px]
                  py-[11px]
                "
              >
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]

                    text-white/46

                    oook-medium
                  "
                >
                  Sponsor
                </p>

                <p
                  className="
                    mt-[4px]

                    text-[8px]
                    leading-[1.4]

                    text-white/24
                  "
                >
                  Sponsor identity remains a restrained commercial credit and does not alter the shared visual system.
                </p>
              </div>

              <SponsorEditor
                property={
                  propertyX
                }

                onChange={
                  updatePropertyX
                }
              />
            </div>
          )}
        </SidebarSection>

        <Divider />

        {/* ====================================== */}
        {/* 03 — BRAND A                           */}
        {/* ====================================== */}

        <BrandEditor
          sectionNumber="03"

          side="A"

          brand={
            brandA
          }

          defaultPrimary={
            DEFAULT_A_PRIMARY
          }

          defaultSecondary={
            DEFAULT_A_SECONDARY
          }

          onChange={
            updateBrand
          }
        />

        <Divider />

        {/* ====================================== */}
        {/* 04 — BRAND B                           */}
        {/* ====================================== */}

        <BrandEditor
          sectionNumber="04"

          side="B"

          brand={
            brandB
          }

          defaultPrimary={
            DEFAULT_B_PRIMARY
          }

          defaultSecondary={
            DEFAULT_B_SECONDARY
          }

          onChange={
            updateBrand
          }
        />

        <div className="h-[34px]" />
      </div>

      {/* ======================================== */}
      {/* FIXED ACTIONS                            */}
      {/* ======================================== */}

      <footer
        className="
          shrink-0

          border-t
          border-white/[0.07]

          bg-[#0b0b0c]

          px-[22px]
          py-[14px]
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-[8px]
          "
        >
          <button
            type="button"

            onClick={
              handleReset
            }

            disabled={
              isExporting
            }

            className="
              flex
              h-[42px]
              w-full

              items-center
              justify-center

              rounded-[11px]

              border
              border-white/[0.08]

              bg-white/[0.018]

              text-[10px]

              text-white/50

              transition-all
              duration-150

              hover:border-white/16
              hover:bg-white/[0.04]
              hover:text-white/78

              disabled:pointer-events-none
              disabled:opacity-30
            "
          >
            Reset
          </button>

          <button
            type="button"

            onClick={
              handleExport
            }

            disabled={
              isExporting
            }

            className="
              flex
              h-[48px]
              w-full

              items-center
              justify-center

              rounded-[11px]

              border
              border-white

              bg-white

              text-[11px]

              text-black

              transition-all
              duration-150

              oook-medium

              hover:bg-white/90

              disabled:cursor-wait
              disabled:opacity-60
            "
          >
            {isExporting ? (
              <span
                className="
                  flex
                  items-center
                  gap-[8px]
                "
              >
                <ExportSpinner />

                Exporting PDF…
              </span>
            ) : (
              "Export PDF"
            )}
          </button>
        </div>
      </footer>
    </aside>
  );
}

/* ================================================= */
/* SELECTION CARD                                    */
/* ================================================= */

function SelectionCard({
  active,
  label,
  description,
  onClick,
  horizontal = false,
}: {
  active:
    boolean;

  label:
    string;

  description:
    string;

  onClick: () => void;

  horizontal?:
    boolean;
}) {
  return (
    <button
      type="button"

      onClick={
        onClick
      }

      className={`
        rounded-[12px]

        border

        px-[11px]
        py-[10px]

        text-left

        transition-all
        duration-150

        ${
          horizontal
            ? "min-h-[52px]"
            : "min-h-[62px]"
        }

        ${
          active
            ? `
                border-white
                bg-white
              `
            : `
                border-white/[0.075]
                bg-white/[0.018]

                hover:border-white/16
                hover:bg-white/[0.04]
              `
        }
      `}
    >
      <p
        className={`
          text-[11px]
          leading-none

          oook-medium

          ${
            active
              ? "text-black"
              : "text-white/72"
          }
        `}
      >
        {label}
      </p>

      <p
        className={`
          mt-[5px]

          text-[7px]
          leading-[1.3]

          ${
            active
              ? "text-black/42"
              : "text-white/24"
          }
        `}
      >
        {description}
      </p>
    </button>
  );
}

/* ================================================= */
/* BRAND EDITOR                                      */
/* ================================================= */

function BrandEditor({
  sectionNumber,
  side,
  brand,
  defaultPrimary,
  defaultSecondary,
  onChange,
}: {
  sectionNumber:
    string;

  side:
    BrandSide;

  brand:
    BrandConfig;

  defaultPrimary:
    string;

  defaultSecondary:
    string;

  onChange: (
    side:
      BrandSide,

    patch:
      Partial<BrandConfig>
  ) => void;
}) {
  const brandLabel =
    side === "A"
      ? "Brand A"
      : "Brand B";

  return (
    <SidebarSection
      eyebrow={
        sectionNumber
      }

      title={
        brandLabel
      }

      description="Brand identity, visual assets and character."
    >
      <EditorGroup
        label="Brand name"
      >
        <TextControl
          value={
            brand.name
          }

          placeholder={
            brandLabel
          }

          onChange={(
            value
          ) =>
            onChange(
              side,
              {
                name:
                  value,
              }
            )
          }
        />
      </EditorGroup>

      <EditorGroup
        label="Logo"
      >
        <LogoControl
          identity={
            side
          }

          name={
            brand.name
          }

          logoUrl={
            brand.logoUrl
          }

          onChange={(
            logoUrl
          ) =>
            onChange(
              side,
              {
                logoUrl,
              }
            )
          }
        />
      </EditorGroup>

      <EditorGroup
        label="Colours"

        description="Primary and secondary brand accents."
      >
        <div
          className="
            grid
            grid-cols-2
            gap-[8px]
          "
        >
          <ColourControl
            label="Primary"

            value={
              brand.primaryColor
            }

            fallback={
              defaultPrimary
            }

            onChange={(
              colour
            ) =>
              onChange(
                side,
                {
                  primaryColor:
                    colour,
                }
              )
            }
          />

          <ColourControl
            label="Secondary"

            value={
              brand.secondaryColor
            }

            fallback={
              defaultSecondary
            }

            onChange={(
              colour
            ) =>
              onChange(
                side,
                {
                  secondaryColor:
                    colour,
                }
              )
            }
          />
        </div>
      </EditorGroup>

      <EditorGroup
        label="Typeface"

        description="Upload the brand font or enter an installed font family."
      >
        <TypefaceControl
          identity={
            side
          }

          value={
            brand.fontFamily
          }

          onChange={(
            value
          ) =>
            onChange(
              side,
              {
                fontFamily:
                  value,
              }
            )
          }
        />
      </EditorGroup>

      <div
        className="
          mt-[24px]

          border-t
          border-white/[0.065]

          pt-[20px]
        "
      >
        <BrandCharacterSelector
          brand={
            side
          }
        />
      </div>
    </SidebarSection>
  );
}

/* ================================================= */
/* PRESENTING X                                      */
/* ================================================= */

function PresentedPropertyEditor({
  property,
  onChange,
}: {
  property:
    PropertyXConfig;

  onChange: (
    patch:
      Partial<PropertyXConfig>
  ) => void;
}) {
  return (
    <>
      <EditorGroup
        label="Property name"
      >
        <TextControl
          value={
            property.name
          }

          placeholder="X"

          onChange={(
            value
          ) =>
            onChange({
              name:
                value,
            })
          }
        />
      </EditorGroup>

      <EditorGroup
        label="Logo"
      >
        <LogoControl
          identity="X"

          name={
            property.name ||
            "X"
          }

          logoUrl={
            property.logoUrl
          }

          onChange={(
            logoUrl
          ) =>
            onChange({
              logoUrl,
            })
          }
        />
      </EditorGroup>

      <EditorGroup
        label="Colours"

        description="X actively influences the shared palette in presenting mode."
      >
        <div
          className="
            grid
            grid-cols-2
            gap-[8px]
          "
        >
          <ColourControl
            label="Primary"

            value={
              property.primaryColor
            }

            fallback={
              DEFAULT_X_PRIMARY
            }

            onChange={(
              colour
            ) =>
              onChange({
                primaryColor:
                  colour,
              })
            }
          />

          <ColourControl
            label="Secondary"

            value={
              property.secondaryColor
            }

            fallback={
              DEFAULT_X_SECONDARY
            }

            onChange={(
              colour
            ) =>
              onChange({
                secondaryColor:
                  colour,
              })
            }
          />
        </div>
      </EditorGroup>

      <EditorGroup
        label="Typeface"

        description="Used by presented-content headlines and authored X moments."
      >
        <TypefaceControl
          identity="X"

          value={
            property.fontFamily ||
            DEFAULT_FONT
          }

          onChange={(
            fontFamily
          ) =>
            onChange({
              fontFamily,
            })
          }
        />
      </EditorGroup>

      <div
        className="
          mt-[24px]

          border-t
          border-white/[0.065]

          pt-[20px]
        "
      >
        <BrandCharacterSelector
          brand="X"
        />
      </div>
    </>
  );
}

/* ================================================= */
/* SPONSOR X                                         */
/* ================================================= */

function SponsorEditor({
  property,
  onChange,
}: {
  property:
    PropertyXConfig;

  onChange: (
    patch:
      Partial<PropertyXConfig>
  ) => void;
}) {
  return (
    <>
      <EditorGroup
        label="Sponsor name"
      >
        <TextControl
          value={
            property.name
          }

          placeholder="Sponsor X"

          onChange={(
            value
          ) =>
            onChange({
              name:
                value,
            })
          }
        />
      </EditorGroup>

      <EditorGroup
        label="Sponsor logo"

        description="The sponsor appears as a small endorsement only."
      >
        <LogoControl
          identity="X"

          name={
            property.name ||
            "Sponsor X"
          }

          logoUrl={
            property.logoUrl
          }

          onChange={(
            logoUrl
          ) =>
            onChange({
              logoUrl,
            })
          }
        />
      </EditorGroup>

      <div
        className="
          mt-[14px]

          rounded-[11px]

          border
          border-white/[0.055]

          bg-white/[0.012]

          px-[11px]
          py-[10px]
        "
      >
        <p
          className="
            text-[8px]
            leading-[1.45]

            text-white/24
          "
        >
          Sponsor colour, typography and character do not modify the partnership system. Only the sponsor name and logo are used.
        </p>
      </div>
    </>
  );
}

/* ================================================= */
/* TEXT                                              */
/* ================================================= */

function TextControl({
  value,
  placeholder,
  onChange,
}: {
  value:
    string;

  placeholder:
    string;

  onChange: (
    value:
      string
  ) => void;
}) {
  return (
    <input
      type="text"

      value={
        value
      }

      placeholder={
        placeholder
      }

      onChange={(
        event
      ) =>
        onChange(
          event.target
            .value
        )
      }

      className="
        h-[42px]
        w-full

        rounded-[11px]

        border
        border-white/[0.08]

        bg-white/[0.022]

        px-[12px]

        text-[11px]

        text-white/78

        outline-none

        transition-all
        duration-150

        placeholder:text-white/18

        hover:border-white/13

        focus:border-white/22
        focus:bg-white/[0.032]
      "
    />
  );
}

/* ================================================= */
/* LOGO                                              */
/* ================================================= */

function LogoControl({
  identity,
  name,
  logoUrl,
  onChange,
}: {
  identity:
    IdentityKey;

  name:
    string;

  logoUrl:
    string | null;

  onChange: (
    logoUrl:
      string | null
  ) => void;
}) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const handleUpload = (
    event:
      ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target
        .files?.[0];

    if (
      !file
    ) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload =
      () => {
        if (
          typeof reader.result ===
          "string"
        ) {
          onChange(
            reader.result
          );
        }
      };

    reader.readAsDataURL(
      file
    );

    event.target.value =
      "";
  };

  const hasLogo =
    Boolean(
      logoUrl
    );

  return (
    <div>
      <input
        ref={
          inputRef
        }

        type="file"

        accept="image/png,image/jpeg,image/webp,image/svg+xml"

        onChange={
          handleUpload
        }

        className="hidden"
      />

      <button
        type="button"

        onClick={() =>
          inputRef.current?.click()
        }

        className="
          group

          relative

          flex
          h-[92px]
          w-full

          items-center
          justify-center

          overflow-hidden

          rounded-[12px]

          border
          border-dashed
          border-white/[0.09]

          bg-white/[0.015]

          transition-all
          duration-150

          hover:border-white/18
          hover:bg-white/[0.025]
        "
      >
        {hasLogo ? (
          <>
            <img
              src={
                logoUrl ??
                ""
              }

              alt={
                name
              }

              draggable={
                false
              }

              className="
                max-h-[46px]
                max-w-[72%]

                object-contain
              "
            />

            <div
              className="
                absolute
                inset-0

                flex
                items-center
                justify-center

                bg-black/68

                opacity-0

                transition-opacity

                group-hover:opacity-100
              "
            >
              <span
                className="
                  text-[8px]
                  text-white/68
                "
              >
                Replace logo
              </span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div
              className="
                mx-auto

                flex
                h-[23px]
                w-[23px]

                items-center
                justify-center

                rounded-full

                border
                border-white/[0.08]

                text-[12px]

                text-white/28
              "
            >
              +
            </div>

            <p
              className="
                mt-[7px]

                text-[8px]

                text-white/30
              "
            >
              Upload logo
            </p>

            <p
              className="
                mt-[3px]

                text-[6px]
                uppercase
                tracking-[0.08em]

                text-white/14
              "
            >
              {identity} · SVG · PNG · WEBP
            </p>
          </div>
        )}
      </button>

      {hasLogo && (
        <button
          type="button"

          onClick={() =>
            onChange(
              null
            )
          }

          className="
            mt-[7px]

            text-[7px]

            text-white/20

            transition-colors

            hover:text-white/55
          "
        >
          Remove logo
        </button>
      )}
    </div>
  );
}

/* ================================================= */
/* COLOUR                                            */
/* ================================================= */

function ColourControl({
  label,
  value,
  fallback,
  onChange,
}: {
  label:
    string;

  value:
    string;

  fallback:
    string;

  onChange: (
    colour:
      string
  ) => void;
}) {
  const safeValue =
    normalizeColour(
      value,
      fallback
    );

  return (
    <div
      className="
        rounded-[11px]

        border
        border-white/[0.075]

        bg-white/[0.018]

        px-[10px]
        py-[11px]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.14em]

          text-white/23
        "
      >
        {label}
      </p>

      <div
        className="
          mt-[8px]

          flex
          items-center
          gap-[8px]
        "
      >
        <label
          className="
            relative

            h-[24px]
            w-[24px]

            shrink-0

            cursor-pointer

            overflow-hidden

            rounded-full

            border
            border-white/10
          "
          style={{
            backgroundColor:
              safeValue,
          }}
        >
          <input
            type="color"

            value={
              safeValue
            }

            onChange={(
              event
            ) =>
              onChange(
                event.target
                  .value
              )
            }

            className="
              absolute
              inset-0

              h-full
              w-full

              cursor-pointer

              opacity-0
            "
          />
        </label>

        <input
          type="text"

          value={
            value
          }

          onChange={(
            event
          ) =>
            onChange(
              event.target
                .value
            )
          }

          onBlur={() => {
            if (
              !isHexColour(
                value
              )
            ) {
              onChange(
                fallback
              );
            }
          }}

          spellCheck={
            false
          }

          className="
            min-w-0
            flex-1

            bg-transparent

            text-[10px]
            uppercase

            text-white/48

            outline-none
          "
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* TYPEFACE                                          */
/* ================================================= */

function TypefaceControl({
  identity,
  value,
  onChange,
}: {
  identity:
    IdentityKey;

  value:
    string;

  onChange: (
    value:
      string
  ) => void;
}) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const handleFontUpload =
    async (
      event:
        ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        event.target
          .files?.[0];

      if (
        !file
      ) {
        return;
      }

      try {
        const dataUrl =
          await readFileAsDataUrl(
            file
          );

        const fontName =
          `brand-${identity.toLowerCase()}-${Date.now()}`;

        const font =
          new FontFace(
            fontName,
            `url(${dataUrl})`
          );

        const loadedFont =
          await font.load();

        document.fonts.add(
          loadedFont
        );

        onChange(
          `"${fontName}", sans-serif`
        );
      } catch (
        error
      ) {
        console.error(
          "Unable to load font:",
          error
        );
      }

      event.target.value =
        "";
    };

  return (
    <div>
      <input
        ref={
          inputRef
        }

        type="file"

        accept=".ttf,.otf,.woff,.woff2,font/ttf,font/otf,font/woff,font/woff2"

        onChange={
          handleFontUpload
        }

        className="hidden"
      />

      {/* PREVIEW */}

      <div
        className="
          rounded-[12px]

          border
          border-white/[0.075]

          bg-white/[0.016]

          px-[13px]
          py-[13px]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-[10px]
          "
        >
          <p
            className="
              text-[7px]
              uppercase
              tracking-[0.14em]

              text-white/22
            "
          >
            Preview
          </p>

          <p
            className="
              max-w-[150px]
              truncate

              text-[7px]

              text-white/18
            "
          >
            {cleanFontName(
              value
            )}
          </p>
        </div>

        <p
          className="
            mt-[10px]

            truncate

            text-[24px]
            leading-none

            text-white/82
          "
          style={{
            fontFamily:
              value,
          }}
        >
          Aa Bb Cc
        </p>

        <p
          className="
            mt-[7px]

            truncate

            text-[8px]

            text-white/30
          "
          style={{
            fontFamily:
              value,
          }}
        >
          Immersive experiences
        </p>
      </div>

      <div
        className="
          mt-[8px]

          flex
          gap-[7px]
        "
      >
        <input
          type="text"

          value={
            value
          }

          placeholder="Font family"

          onChange={(
            event
          ) =>
            onChange(
              event.target
                .value
            )
          }

          className="
            h-[38px]
            min-w-0
            flex-1

            rounded-[10px]

            border
            border-white/[0.075]

            bg-white/[0.018]

            px-[10px]

            text-[9px]

            text-white/44

            outline-none

            transition-all

            placeholder:text-white/15

            hover:border-white/12

            focus:border-white/17
            focus:bg-white/[0.028]
          "
        />

        <button
          type="button"

          onClick={() =>
            inputRef.current?.click()
          }

          className="
            h-[38px]

            shrink-0

            rounded-[10px]

            border
            border-white/[0.08]

            bg-white/[0.022]

            px-[12px]

            text-[8px]

            text-white/40

            transition-all

            hover:border-white/17
            hover:bg-white/[0.05]
            hover:text-white/70
          "
        >
          Upload
        </button>
      </div>
    </div>
  );
}

/* ================================================= */
/* SECTION                                           */
/* ================================================= */

function SidebarSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow:
    string;

  title:
    string;

  description?:
    string;

  children:
    ReactNode;
}) {
  return (
    <section>
      <div
        className="
          flex
          items-start
          gap-[10px]
        "
      >
        <p
          className="
            mt-[5px]

            shrink-0

            text-[7px]
            tracking-[0.14em]

            text-white/13
          "
        >
          {eyebrow}
        </p>

        <div className="min-w-0">
          <h2
            className="
              text-[17px]
              leading-[1.05]
              tracking-[-0.025em]

              text-white/90

              oook-medium
            "
          >
            {title}
          </h2>

          {description && (
            <p
              className="
                mt-[5px]

                max-w-[255px]

                text-[9px]
                leading-[1.4]

                text-white/27
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-[18px]">
        {children}
      </div>
    </section>
  );
}

/* ================================================= */
/* EDITOR GROUP                                      */
/* ================================================= */

function EditorGroup({
  label,
  description,
  children,
}: {
  label:
    string;

  description?:
    string;

  children:
    ReactNode;
}) {
  return (
    <div
      className="
        mt-[24px]
        first:mt-0
      "
    >
      <div className="mb-[10px]">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.12em]

            text-white/53

            oook-medium
          "
        >
          {label}
        </p>

        {description && (
          <p
            className="
              mt-[4px]

              text-[8px]
              leading-[1.4]

              text-white/21
            "
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

/* ================================================= */
/* DIVIDER                                           */
/* ================================================= */

function Divider() {
  return (
    <div
      className="
        my-[30px]

        h-px
        w-full

        bg-white/[0.065]
      "
    />
  );
}

/* ================================================= */
/* EXPORT SPINNER                                    */
/* ================================================= */

function ExportSpinner() {
  return (
    <span
      className="
        h-[11px]
        w-[11px]

        animate-spin

        rounded-full

        border
        border-black/20
        border-t-black/80
      "
    />
  );
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function isHexColour(
  value:
    string
) {
  return /^#[0-9a-fA-F]{6}$/.test(
    value.trim()
  );
}

function normalizeColour(
  value:
    string,

  fallback:
    string
) {
  return isHexColour(
    value
  )
    ? value
    : fallback;
}

function cleanFontName(
  value:
    string
) {
  return value
    .replace(
      /["']/g,
      ""
    )
    .split(",")[0]
    .trim();
}

function readFileAsDataUrl(
  file:
    File
) {
  return new Promise<string>(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader();

      reader.onload =
        () => {
          if (
            typeof reader.result ===
            "string"
          ) {
            resolve(
              reader.result
            );
          } else {
            reject(
              new Error(
                "Invalid file result"
              )
            );
          }
        };

      reader.onerror =
        () => {
          reject(
            reader.error
          );
        };

      reader.readAsDataURL(
        file
      );
    }
  );
}