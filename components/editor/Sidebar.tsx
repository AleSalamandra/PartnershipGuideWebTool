"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

import BrandCharacterSelector from "./BrandCharacterSelector";
import ImageBatchUploader from "./ImageBatchUploader";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import {
  useGuidelineMediaStore,
} from "@/store/guidelineMediaStore";

import type {
  PartnershipModelId,
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
  | "B"
  | "X";

type FontTarget =
  | "a"
  | "b"
  | "x"
  | "common";

type AdditionalRelationship =
  | "none"
  | "presenting"
  | "sponsored";

interface BrandData {
  name: string;

  logoUrl:
    string | null;

  primaryColor:
    string;

  secondaryColor:
    string;

  fontFamily:
    string;
}

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
    id: "axb",

    label:
      "A × B",

    description:
      "Equal collaboration",
  },

  {
    id: "aandb",

    label:
      "A with B",

    description:
      "Brand A leads",
  },

  {
    id: "poweredByA",

    label:
      "B powered by A",

    description:
      "Brand B owns the experience",
  },

  {
    id: "presentsB",

    label:
      "A presents B",

    description:
      "A platform / B content",
  },
];

/* ================================================= */
/* ADDITIONAL RELATIONSHIP                           */
/* ================================================= */

const ADDITIONAL_RELATIONSHIPS: {
  id:
    AdditionalRelationship;

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
      "Core A / B relationship only",
  },

  {
    id:
      "presenting",

    label:
      "Presenting X",

    description:
      "X actively shapes the content identity",
  },

  {
    id:
      "sponsored",

    label:
      "Sponsored by X",

    description:
      "X appears as attribution only",
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
/* DEFAULTS                                          */
/* ================================================= */

const DEFAULT_A_PRIMARY =
  "#FF453A";

const DEFAULT_A_SECONDARY =
  "#FF8A80";

const DEFAULT_B_PRIMARY =
  "#3478F6";

const DEFAULT_B_SECONDARY =
  "#64D2FF";

const DEFAULT_X_PRIMARY =
  "#8A8A8A";

const DEFAULT_X_SECONDARY =
  "#B8B8B8";

const DEFAULT_FONT =
  '"oook-variable", sans-serif';

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

    commonFontFamily,
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
  /* PARTNERSHIP                                       */
  /* ================================================= */

  function setPartnershipModel(
    model:
      PartnershipModelId
  ) {
    useGuidelineStore.setState({
      partnershipModel:
        model,
    });
  }

  /* ================================================= */
  /* ADDITIONAL RELATIONSHIP                           */
  /* ================================================= */

  function setAdditionalRelationship(
    mode:
      AdditionalRelationship
  ) {
    useGuidelineStore.setState({
      additionalRelationship:
        mode,
    });
  }

  /* ================================================= */
  /* BRAND UPDATE                                      */
  /* ================================================= */

  function updateBrand(
    side:
      BrandSide,

    patch:
      Partial<BrandData>
  ) {
    useGuidelineStore.setState(
      (
        state
      ) => {
        if (
          side ===
          "A"
        ) {
          return {
            brandA: {
              ...state.brandA,
              ...patch,
            },
          };
        }

        if (
          side ===
          "B"
        ) {
          return {
            brandB: {
              ...state.brandB,
              ...patch,
            },
          };
        }

        return {
          propertyX: {
            ...state.propertyX,
            ...patch,
          },
        };
      }
    );
  }

  /* ================================================= */
  /* COMMON FONT                                       */
  /* ================================================= */

  function setCommonFontFamily(
    fontFamily:
      string
  ) {
    useGuidelineStore.setState({
      commonFontFamily:
        fontFamily,
    });
  }

  /* ================================================= */
  /* RESET                                             */
  /* ================================================= */

  function handleReset() {
    setTheme(
      "dark"
    );

    useGuidelineStore.setState(
      (
        state
      ) => ({
        partnershipModel:
          "axb",

        additionalRelationship:
          "none",

        commonFontFamily:
          DEFAULT_FONT,

        brandA: {
          ...state.brandA,

          name:
            "Brand A",

          logoUrl:
            null,

          primaryColor:
            DEFAULT_A_PRIMARY,

          secondaryColor:
            DEFAULT_A_SECONDARY,

          fontFamily:
            DEFAULT_FONT,

          characterTraits:
            [],
        },

        brandB: {
          ...state.brandB,

          name:
            "Brand B",

          logoUrl:
            null,

          primaryColor:
            DEFAULT_B_PRIMARY,

          secondaryColor:
            DEFAULT_B_SECONDARY,

          fontFamily:
            DEFAULT_FONT,

          characterTraits:
            [],
        },

        propertyX: {
          ...state.propertyX,

          name:
            "Property X",

          logoUrl:
            null,

          primaryColor:
            DEFAULT_X_PRIMARY,

          secondaryColor:
            DEFAULT_X_SECONDARY,

          fontFamily:
            DEFAULT_FONT,

          characterTraits:
            [],
        },
      })
    );

    /*
      Reset also restores the
      original /public/images set.
    */

    useGuidelineMediaStore
      .getState()
      .clearImages();
  }

  /* ================================================= */
  /* EXPORT                                            */
  /* ================================================= */

  async function handleExport() {
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
  }

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
      {/* SCROLL                                   */}
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
        {/* 01 PARTNERSHIP                         */}
        {/* ====================================== */}

        <SidebarSection
          eyebrow="01"

          title="Partnership model"

          description="Defines ownership, hierarchy and how both brands relate."
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
                  <button
                    key={
                      model.id
                    }

                    type="button"

                    onClick={() =>
                      setPartnershipModel(
                        model.id
                      )
                    }

                    className={`
                      min-h-[62px]

                      rounded-[12px]

                      border

                      px-[11px]
                      py-[10px]

                      text-left

                      transition-all
                      duration-150

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
                      {
                        model.label
                      }
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
                      {
                        model.description
                      }
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </SidebarSection>

        <Divider />

        {/* ====================================== */}
        {/* 02 ADDITIONAL RELATIONSHIP             */}
        {/* ====================================== */}

        <SidebarSection
          eyebrow="02"

          title="Additional relationship"

          description="Adds a presented property or sponsorship layer without creating another partnership model."
        >
          <div
            className="
              space-y-[7px]
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
                  <button
                    key={
                      option.id
                    }

                    type="button"

                    onClick={() =>
                      setAdditionalRelationship(
                        option.id
                      )
                    }

                    className={`
                      w-full

                      rounded-[12px]

                      border

                      px-[12px]
                      py-[10px]

                      text-left

                      transition-all
                      duration-150

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
                        text-[10px]

                        oook-medium

                        ${
                          active
                            ? "text-black"
                            : "text-white/68"
                        }
                      `}
                    >
                      {
                        option.label
                      }
                    </p>

                    <p
                      className={`
                        mt-[4px]

                        text-[7px]
                        leading-[1.35]

                        ${
                          active
                            ? "text-black/42"
                            : "text-white/23"
                        }
                      `}
                    >
                      {
                        option.description
                      }
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </SidebarSection>

        <Divider />

        {/* ====================================== */}
        {/* 03 BRAND A                             */}
        {/* ====================================== */}

        <BrandEditor
          side="A"

          sectionNumber="03"

          title="Brand A"

          description="Brand identity, visual assets and character."

          brand={
            brandA as BrandData
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
        {/* 04 BRAND B                             */}
        {/* ====================================== */}

        <BrandEditor
          side="B"

          sectionNumber="04"

          title="Brand B"

          description="Brand identity, visual assets and character."

          brand={
            brandB as BrandData
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

        {/* ====================================== */}
        {/* 05 PROPERTY X                          */}
        {/* ====================================== */}

        {additionalRelationship !==
          "none" && (
          <>
            <Divider />

            <BrandEditor
              side="X"

              sectionNumber="05"

              title={
                additionalRelationship ===
                "presenting"
                  ? "Presented property X"
                  : "Sponsor X"
              }

              description={
                additionalRelationship ===
                "presenting"
                  ? "Its identity actively participates in the expressive visual territory."
                  : "Its identity appears as attribution but does not influence the shared visual language."
              }

              brand={
                propertyX as BrandData
              }

              defaultPrimary={
                DEFAULT_X_PRIMARY
              }

              defaultSecondary={
                DEFAULT_X_SECONDARY
              }

              onChange={
                updateBrand
              }
            />
          </>
        )}

        <Divider />

        {/* ====================================== */}
        {/* COMMON TYPEFACE                        */}
        {/* ====================================== */}

        <SidebarSection
          eyebrow={
            additionalRelationship !==
            "none"
              ? "06"
              : "05"
          }

          title="Common typography"

          description="Neutral shared typeface used when the partnership needs a common editorial voice."
        >
          <TypefaceControl
            fontTarget="common"

            value={
              commonFontFamily ||
              DEFAULT_FONT
            }

            onChange={
              setCommonFontFamily
            }
          />
        </SidebarSection>

        {/* ====================================== */}
        {/* USER IMAGES                             */}
        {/* ====================================== */}

        <ImageBatchUploader />

        <div
          className="
            h-[34px]
          "
        />
      </div>

      {/* ======================================== */}
      {/* ACTIONS                                  */}
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
/* BRAND EDITOR                                      */
/* ================================================= */

function BrandEditor({
  side,

  sectionNumber,

  title,
  description,

  brand,

  defaultPrimary,
  defaultSecondary,

  onChange,
}: {
  side:
    BrandSide;

  sectionNumber:
    string;

  title:
    string;

  description:
    string;

  brand:
    BrandData;

  defaultPrimary:
    string;

  defaultSecondary:
    string;

  onChange: (
    side:
      BrandSide,

    patch:
      Partial<BrandData>
  ) => void;
}) {
  const primaryColor =
    brand.primaryColor ||
    defaultPrimary;

  const secondaryColor =
    brand.secondaryColor ||
    defaultSecondary;

  const fontFamily =
    brand.fontFamily ||
    DEFAULT_FONT;

  return (
    <SidebarSection
      eyebrow={
        sectionNumber
      }

      title={
        title
      }

      description={
        description
      }
    >
      {/* ======================================== */}
      {/* NAME                                     */}
      {/* ======================================== */}

      <EditorGroup
        label="Name"
      >
        <input
          type="text"

          value={
            brand.name ??
            ""
          }

          placeholder={
            title
          }

          onChange={(
            event
          ) =>
            onChange(
              side,
              {
                name:
                  event.target
                    .value,
              }
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
      </EditorGroup>

      {/* ======================================== */}
      {/* LOGO                                     */}
      {/* ======================================== */}

      <EditorGroup
        label="Logo"
      >
        <LogoControl
          side={
            side
          }

          brand={
            brand
          }

          onChange={
            onChange
          }
        />
      </EditorGroup>

      {/* ======================================== */}
      {/* COLOURS                                  */}
      {/* ======================================== */}

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
              primaryColor
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
              secondaryColor
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

      {/* ======================================== */}
      {/* TYPEFACE                                 */}
      {/* ======================================== */}

      <EditorGroup
        label="Typeface"

        description="Upload the brand font or enter an installed font family."
      >
        <TypefaceControl
          fontTarget={
            side ===
            "A"
              ? "a"
              : side ===
                  "B"
                ? "b"
                : "x"
          }

          value={
            fontFamily
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

      {/* ======================================== */}
      {/* CHARACTER                                */}
      {/* ======================================== */}

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
/* LOGO CONTROL                                      */
/* ================================================= */

function LogoControl({
  side,
  brand,
  onChange,
}: {
  side:
    BrandSide;

  brand:
    BrandData;

  onChange: (
    side:
      BrandSide,

    patch:
      Partial<BrandData>
  ) => void;
}) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  function handleUpload(
    event:
      ChangeEvent<HTMLInputElement>
  ) {
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
            side,
            {
              logoUrl:
                reader.result,
            }
          );
        }
      };

    reader.readAsDataURL(
      file
    );

    event.target.value =
      "";
  }

  const hasLogo =
    Boolean(
      brand.logoUrl
    );

  return (
    <div>
      <input
        ref={
          inputRef
        }

        type="file"

        accept="
          image/png,
          image/jpeg,
          image/webp,
          image/svg+xml
        "

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
                brand.logoUrl ??
                ""
              }

              alt=""

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
          <div
            className="
              text-center
            "
          >
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
              SVG · PNG · WEBP
            </p>
          </div>
        )}
      </button>

      {hasLogo && (
        <button
          type="button"

          onClick={() =>
            onChange(
              side,
              {
                logoUrl:
                  null,
              }
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

          spellCheck={
            false
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
  fontTarget,
  value,
  onChange,
}: {
  fontTarget:
    FontTarget;

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

  async function handleFontUpload(
    event:
      ChangeEvent<HTMLInputElement>
  ) {
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
        `guideline-${fontTarget}-${Date.now()}`;

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
  }

  return (
    <div>
      <input
        ref={
          inputRef
        }

        type="file"

        accept="
          .ttf,
          .otf,
          .woff,
          .woff2,
          font/ttf,
          font/otf,
          font/woff,
          font/woff2
        "

        onChange={
          handleFontUpload
        }

        className="hidden"
      />

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
            {
              cleanFontName(
                value
              )
            }
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
/* SIDEBAR SECTION                                   */
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

        <div
          className="
            min-w-0
          "
        >
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
              {
                description
              }
            </p>
          )}
        </div>
      </div>

      <div
        className="
          mt-[18px]
        "
      >
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
      <div
        className="
          mb-[10px]
        "
      >
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
/* SPINNER                                           */
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

            return;
          }

          reject(
            new Error(
              "Invalid file result"
            )
          );
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