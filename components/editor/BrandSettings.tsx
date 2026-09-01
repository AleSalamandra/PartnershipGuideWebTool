"use client";

import { BrandConfig } from "@/types/guideline";
import LogoUploader from "./LogoUploader";
import FontUploader from "./FontUploader";

interface BrandSettingsProps {
  title: string;
  brand: BrandConfig;
  onChange: (data: Partial<BrandConfig>) => void;
}

export default function BrandSettings({
  title,
  brand,
  onChange,
}: BrandSettingsProps) {
  return (
    <section className="space-y-5 border-t border-white/10 pt-6">
      <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
        {title}
      </h2>

      <div>
        <p className="mb-2 text-xs text-white/40">
          Logo
        </p>

        <LogoUploader
          value={brand.logoUrl}
          onChange={(logoUrl) =>
            onChange({ logoUrl })
          }
        />
      </div>

      <div>
        <p className="mb-2 text-xs text-white/40">
          Primary color
        </p>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={brand.primaryColor}
            onChange={(e) =>
              onChange({
                primaryColor: e.target.value,
              })
            }
            className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent"
          />

          <input
            value={brand.primaryColor}
            onChange={(e) =>
              onChange({
                primaryColor: e.target.value,
              })
            }
            className="
              flex-1 rounded-md border border-white/10
              bg-transparent px-3 py-2
              font-mono text-xs uppercase
              outline-none focus:border-white/30
            "
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-white/40">
          Secondary color
        </p>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={brand.secondaryColor}
            onChange={(e) =>
              onChange({
                secondaryColor: e.target.value,
              })
            }
            className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent"
          />

          <input
            value={brand.secondaryColor}
            onChange={(e) =>
              onChange({
                secondaryColor: e.target.value,
              })
            }
            className="
              flex-1 rounded-md border border-white/10
              bg-transparent px-3 py-2
              font-mono text-xs uppercase
              outline-none focus:border-white/30
            "
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-white/40">
          Typeface
        </p>

        <FontUploader
          label={title}
          currentFont={brand.fontFamily}
          onChange={(fontFamily) =>
            onChange({ fontFamily })
          }
        />
      </div>
    </section>
  );
}