"use client";

import {
  ChangeEvent,
  useRef,
} from "react";

import BrandCharacterSelector from "./BrandCharacterSelector";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type BrandSide = "A" | "B";

interface BrandData {
  name: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor?: string;
  fontFamily?: string;
}

/* ------------------------------------------------ */
/* PARTNERSHIP MODELS                               */
/* ------------------------------------------------ */

const PARTNERSHIP_MODELS: {
  id: PartnershipModelId;
  label: string;
  description: string;
}[] = [
  {
    id: "axb",
    label: "A × B",
    description: "Equal collaboration",
  },

  {
    id: "aandb",
    label: "A with B",
    description: "Brand A leads",
  },

  {
    id: "poweredByA",
    label: "B powered by A",
    description: "Brand B owns experience",
  },

  {
    id: "presentsB",
    label: "A presents B",
    description: "A platform / B content",
  },
];

/* ------------------------------------------------ */
/* DEFAULTS                                         */
/* ------------------------------------------------ */

const DEFAULT_A_PRIMARY =
  "#FF453A";

const DEFAULT_A_SECONDARY =
  "#FF8A80";

const DEFAULT_B_PRIMARY =
  "#3478F6";

const DEFAULT_B_SECONDARY =
  "#64D2FF";

const DEFAULT_FONT =
  '"oook-variable", sans-serif';

/* ------------------------------------------------ */
/* SIDEBAR                                          */
/* ------------------------------------------------ */

export default function Sidebar() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } = useGuidelineStore();

  /* ---------------------------------------------- */
  /* PARTNERSHIP MODEL                              */
  /* ---------------------------------------------- */

  const setPartnershipModel = (
    model: PartnershipModelId
  ) => {
    useGuidelineStore.setState({
      partnershipModel: model,
    });
  };

  /* ---------------------------------------------- */
  /* UPDATE BRAND                                   */
  /* ---------------------------------------------- */

  const updateBrand = (
    side: BrandSide,
    patch: Partial<BrandData>
  ) => {
    useGuidelineStore.setState(
      (state) => {
        if (side === "A") {
          return {
            brandA: {
              ...state.brandA,
              ...patch,
            } as typeof state.brandA,
          };
        }

        return {
          brandB: {
            ...state.brandB,
            ...patch,
          } as typeof state.brandB,
        };
      }
    );
  };

  /* ---------------------------------------------- */
  /* RENDER                                         */
  /* ---------------------------------------------- */

  return (
    <aside
      className="
        flex
        h-full
        w-[340px]
        shrink-0
        flex-col

        border-r
        border-white/[0.07]

        bg-[#0b0b0c]
      "
    >
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <div
        className="
          shrink-0

          border-b
          border-white/[0.07]

          px-[22px]
          py-[20px]
        "
      >
        <p
          className="
            text-[15px]
            text-white

            oook-medium
          "
        >
          Partnership Guide
        </p>

        <p
          className="
            mt-[3px]

            text-[11px]
            leading-[1.4]

            text-white/30
          "
        >
          Define the relationship and visual
          identity of both brands.
        </p>
      </div>

      {/* ======================================== */}
      {/* SCROLLABLE CONTENT                       */}
      {/* ======================================== */}

      <div
        className="
          min-h-0
          flex-1

          overflow-y-auto

          px-[22px]
          py-[22px]

          [scrollbar-width:thin]
          [scrollbar-color:rgba(255,255,255,0.12)_transparent]
        "
      >
        {/* ====================================== */}
        {/* PARTNERSHIP MODEL                      */}
        {/* ====================================== */}

        <SidebarSection
          eyebrow="01"
          title="Partnership model"
          description="Defines ownership, hierarchy and the relationship between both brands."
        >
          <div
            className="
              mt-[14px]

              grid
              grid-cols-2

              gap-[7px]
            "
          >
            {PARTNERSHIP_MODELS.map(
              (model) => {
                const active =
                  partnershipModel ===
                  model.id;

                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() =>
                      setPartnershipModel(
                        model.id
                      )
                    }
                    className={`
                      min-h-[64px]

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
                              border-white/32
                              bg-white
                            `
                          : `
                              border-white/[0.07]
                              bg-white/[0.025]

                              hover:border-white/15
                              hover:bg-white/[0.045]
                            `
                      }
                    `}
                  >
                    <p
                      className={`
                        text-[11px]

                        oook-medium

                        ${
                          active
                            ? "text-black"
                            : "text-white/72"
                        }
                      `}
                    >
                      {model.label}
                    </p>

                    <p
                      className={`
                        mt-[3px]

                        text-[8px]
                        leading-[1.25]

                        ${
                          active
                            ? "text-black/45"
                            : "text-white/25"
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
        {/* BRAND A                                */}
        {/* ====================================== */}

        <BrandEditor
          side="A"
          brand={
            brandA as BrandData
          }
          defaultPrimary={
            DEFAULT_A_PRIMARY
          }
          defaultSecondary={
            DEFAULT_A_SECONDARY
          }
          onChange={updateBrand}
        />

        <Divider />

        {/* ====================================== */}
        {/* BRAND B                                */}
        {/* ====================================== */}

        <BrandEditor
          side="B"
          brand={
            brandB as BrandData
          }
          defaultPrimary={
            DEFAULT_B_PRIMARY
          }
          defaultSecondary={
            DEFAULT_B_SECONDARY
          }
          onChange={updateBrand}
        />

        {/* BOTTOM SPACE */}

        <div className="h-[30px]" />
      </div>
    </aside>
  );
}

/* ------------------------------------------------ */
/* BRAND EDITOR                                     */
/* ------------------------------------------------ */

function BrandEditor({
  side,
  brand,
  defaultPrimary,
  defaultSecondary,
  onChange,
}: {
  side: BrandSide;

  brand: BrandData;

  defaultPrimary: string;
  defaultSecondary: string;

  onChange: (
    side: BrandSide,
    patch: Partial<BrandData>
  ) => void;
}) {
  const brandLabel =
    side === "A"
      ? "Brand A"
      : "Brand B";

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
        side === "A"
          ? "02"
          : "03"
      }
      title={brandLabel}
      description={
        side === "A"
          ? "Define Brand A's identity and personality."
          : "Define Brand B's identity and personality."
      }
    >
      {/* ======================================== */}
      {/* NAME                                     */}
      {/* ======================================== */}

      <EditorGroup
        label="Brand name"
      >
        <input
          type="text"
          value={
            brand.name ?? ""
          }
          placeholder={
            brandLabel
          }
          onChange={(
            event
          ) =>
            onChange(side, {
              name:
                event.target
                  .value,
            })
          }
          className="
            h-[38px]
            w-full

            rounded-[10px]

            border
            border-white/[0.08]

            bg-white/[0.025]

            px-[11px]

            text-[11px]
            text-white/78

            outline-none

            transition-all

            placeholder:text-white/18

            hover:border-white/12

            focus:border-white/22
            focus:bg-white/[0.035]
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
          side={side}
          brand={brand}
          onChange={onChange}
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
              onChange(side, {
                primaryColor:
                  colour,
              })
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
              onChange(side, {
                secondaryColor:
                  colour,
              })
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
          side={side}
          value={fontFamily}
          onChange={(
            value
          ) =>
            onChange(side, {
              fontFamily:
                value,
            })
          }
        />
      </EditorGroup>

      {/* ======================================== */}
      {/* CHARACTER                                */}
      {/* ======================================== */}

      <div
        className="
          mt-[22px]

          border-t
          border-white/[0.06]

          pt-[18px]
        "
      >
        <BrandCharacterSelector
          brand={side}
        />
      </div>
    </SidebarSection>
  );
}

/* ------------------------------------------------ */
/* LOGO                                             */
/* ------------------------------------------------ */

function LogoControl({
  side,
  brand,
  onChange,
}: {
  side: BrandSide;

  brand: BrandData;

  onChange: (
    side: BrandSide,
    patch: Partial<BrandData>
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

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        onChange(side, {
          logoUrl:
            reader.result,
        });
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
      brand.logoUrl
    );

  return (
    <div>
      <input
        ref={inputRef}
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
          h-[86px]
          w-full

          items-center
          justify-center

          overflow-hidden

          rounded-[11px]

          border
          border-dashed
          border-white/[0.09]

          bg-white/[0.018]

          transition-all

          hover:border-white/18
          hover:bg-white/[0.03]
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
              draggable={false}
              className="
                max-h-[42px]
                max-w-[68%]

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

                bg-black/65

                opacity-0

                backdrop-blur-[4px]

                transition-opacity

                group-hover:opacity-100
              "
            >
              <span
                className="
                  text-[9px]

                  text-white/70
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
                h-[24px]
                w-[24px]

                items-center
                justify-center

                rounded-full

                border
                border-white/[0.08]

                text-[13px]

                text-white/30
              "
            >
              +
            </div>

            <p
              className="
                mt-[7px]

                text-[9px]

                text-white/28
              "
            >
              Upload logo
            </p>

            <p
              className="
                mt-[2px]

                text-[7px]

                text-white/16
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
            onChange(side, {
              logoUrl: null,
            })
          }
          className="
            mt-[6px]

            text-[8px]

            text-white/22

            transition-colors

            hover:text-white/55
          "
        >
          Remove
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* COLOUR                                           */
/* ------------------------------------------------ */

function ColourControl({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value: string;
  fallback: string;

  onChange: (
    colour: string
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
        rounded-[10px]

        border
        border-white/[0.07]

        bg-white/[0.018]

        p-[9px]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.13em]

          text-white/20
        "
      >
        {label}
      </p>

      <div
        className="
          mt-[7px]

          flex
          items-center

          gap-[7px]
        "
      >
        {/* COLOUR PICKER */}

        <label
          className="
            relative

            h-[22px]
            w-[22px]

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

        {/* HEX */}

        <input
          type="text"
          value={value}
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
          spellCheck={false}
          className="
            min-w-0
            flex-1

            bg-transparent

            text-[9px]
            uppercase

            text-white/46

            outline-none
          "
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* TYPEFACE                                         */
/* ------------------------------------------------ */

function TypefaceControl({
  side,
  value,
  onChange,
}: {
  side: BrandSide;
  value: string;

  onChange: (
    value: string
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

      if (!file) return;

      try {
        const dataUrl =
          await readFileAsDataUrl(
            file
          );

        const fontName =
          `brand-${side.toLowerCase()}-${Date.now()}`;

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
        ref={inputRef}
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

      {/* PREVIEW */}

      <div
        className="
          rounded-[11px]

          border
          border-white/[0.07]

          bg-white/[0.018]

          px-[12px]
          py-[12px]
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
              tracking-[0.13em]

              text-white/20
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
            mt-[9px]

            truncate

            text-[22px]
            leading-none

            text-white/78
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
            mt-[6px]

            truncate

            text-[9px]

            text-white/34
          "
          style={{
            fontFamily:
              value,
          }}
        >
          Immersive experiences
        </p>
      </div>

      {/* CONTROLS */}

      <div
        className="
          mt-[7px]

          flex

          gap-[6px]
        "
      >
        <input
          type="text"
          value={value}
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
            h-[34px]
            min-w-0
            flex-1

            rounded-[9px]

            border
            border-white/[0.07]

            bg-white/[0.02]

            px-[9px]

            text-[8px]

            text-white/42

            outline-none

            placeholder:text-white/16

            focus:border-white/16
          "
        />

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            h-[34px]

            shrink-0

            rounded-[9px]

            border
            border-white/[0.08]

            bg-white/[0.025]

            px-[10px]

            text-[8px]

            text-white/42

            transition-all

            hover:border-white/16
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

/* ------------------------------------------------ */
/* SIDEBAR SECTION                                  */
/* ------------------------------------------------ */

function SidebarSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children:
    React.ReactNode;
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
            mt-[3px]

            shrink-0

            text-[8px]
            tracking-[0.12em]

            text-white/15
          "
        >
          {eyebrow}
        </p>

        <div>
          <h2
            className="
              text-[13px]

              text-white/78

              oook-medium
            "
          >
            {title}
          </h2>

          {description && (
            <p
              className="
                mt-[3px]

                max-w-[245px]

                text-[9px]
                leading-[1.4]

                text-white/26
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <div
        className="
          mt-[14px]
        "
      >
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* EDITOR GROUP                                     */
/* ------------------------------------------------ */

function EditorGroup({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children:
    React.ReactNode;
}) {
  return (
    <div
      className="
        mt-[18px]

        first:mt-0
      "
    >
      <div
        className="
          mb-[8px]
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.14em]

            text-white/28
          "
        >
          {label}
        </p>

        {description && (
          <p
            className="
              mt-[2px]

              text-[8px]
              leading-[1.35]

              text-white/18
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

/* ------------------------------------------------ */
/* DIVIDER                                          */
/* ------------------------------------------------ */

function Divider() {
  return (
    <div
      className="
        my-[24px]

        h-px
        w-full

        bg-white/[0.06]
      "
    />
  );
}

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

function isHexColour(
  value: string
) {
  return /^#[0-9a-fA-F]{6}$/.test(
    value.trim()
  );
}

function normalizeColour(
  value: string,
  fallback: string
) {
  if (
    isHexColour(value)
  ) {
    return value;
  }

  return fallback;
}

function cleanFontName(
  value: string
) {
  return value
    .replace(/["']/g, "")
    .split(",")[0]
    .trim();
}

function readFileAsDataUrl(
  file: File
) {
  return new Promise<string>(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader();

      reader.onload = () => {
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