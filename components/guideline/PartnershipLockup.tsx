"use client";

import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface BrandLike {
  name: string;

  logoUrl?: string | null;

  fontFamily?: string;
}

interface PartnershipLockupProps {
  model: PartnershipModelId;

  brandA: BrandLike;
  brandB: BrandLike;

  className?: string;
}

/* ------------------------------------------------ */
/* COMPONENT                                        */
/* ------------------------------------------------ */

export default function PartnershipLockup({
  model,
  brandA,
  brandB,
  className = "",
}: PartnershipLockupProps) {
  return (
    <div
      className={`
        flex
        items-center
        justify-end

        gap-[10px]

        ${className}
      `}
    >
      {/* ======================================== */}
      {/* A × B                                    */}
      {/* ======================================== */}

      {model === "axb" && (
        <>
          <BrandMark
            brand={brandA}
            width={94}
            height={28}
          />

          <RelationshipMark>
            ×
          </RelationshipMark>

          <BrandMark
            brand={brandB}
            width={94}
            height={28}
          />
        </>
      )}

      {/* ======================================== */}
      {/* A WITH B                                 */}
      {/* ======================================== */}

      {model === "aandb" && (
        <>
          <BrandMark
            brand={brandA}
            width={108}
            height={30}
          />

          <RelationshipLabel>
            with
          </RelationshipLabel>

          <BrandMark
            brand={brandB}
            width={74}
            height={22}
          />
        </>
      )}

      {/* ======================================== */}
      {/* B POWERED BY A                           */}
      {/* ======================================== */}

      {model === "poweredByA" && (
        <>
          <BrandMark
            brand={brandB}
            width={106}
            height={30}
          />

          <div
            className="
              flex
              items-center

              gap-[6px]
            "
          >
            <RelationshipLabel>
              powered by
            </RelationshipLabel>

            <BrandMark
              brand={brandA}
              width={72}
              height={21}
            />
          </div>
        </>
      )}

      {/* ======================================== */}
      {/* A PRESENTS B                             */}
      {/* ======================================== */}

      {model === "presentsB" && (
        <>
          <BrandMark
            brand={brandA}
            width={92}
            height={27}
          />

          <RelationshipLabel>
            presents
          </RelationshipLabel>

          <BrandMark
            brand={brandB}
            width={104}
            height={30}
          />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* BRAND MARK                                       */
/* ------------------------------------------------ */

function BrandMark({
  brand,
  width,
  height,
}: {
  brand: BrandLike;

  width: number;
  height: number;
}) {
  if (brand.logoUrl) {
    return (
      <div
        className="
          flex
          shrink-0
          items-center
          justify-center
        "
        style={{
          width,
          height,
        }}
      >
        <img
          src={brand.logoUrl}
          alt={brand.name}
          draggable={false}
          className="
            block
            h-full
            w-full
            object-contain
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        shrink-0
        items-center
      "
      style={{
        width,
        minHeight: height,
      }}
    >
      <span
        className="
          whitespace-nowrap

          text-[14px]
          leading-none

          text-white/72

          oook-medium
        "
        style={{
          fontFamily:
            brand.fontFamily,
        }}
      >
        {brand.name}
      </span>
    </div>
  );
}

/* ------------------------------------------------ */
/* RELATIONSHIP                                     */
/* ------------------------------------------------ */

function RelationshipMark({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        text-[16px]

        text-white/28
      "
    >
      {children}
    </span>
  );
}

function RelationshipLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        whitespace-nowrap

        text-[7px]
        uppercase
        tracking-[0.12em]

        text-white/25
      "
    >
      {children}
    </span>
  );
}