"use client";

import { ChangeEvent } from "react";

interface FontUploaderProps {
  label: string;
  currentFont: string;
  onChange: (fontFamily: string) => void;
}

export default function FontUploader({
  label,
  currentFont,
  onChange,
}: FontUploaderProps) {
  const handleFontUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    const familyName = `${label.replaceAll(
      " ",
      "-",
    )}-${Date.now()}`;

    try {
      const font = new FontFace(
        familyName,
        `url(${url})`,
      );

      const loadedFont = await font.load();

      document.fonts.add(loadedFont);

      onChange(familyName);
    } catch (error) {
      console.error("Could not load font", error);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="
          flex items-center justify-between
          rounded-md
          border border-white/10
          px-3 py-3
        "
      >
        <span
          className="truncate text-sm"
          style={{
            fontFamily: currentFont,
          }}
        >
          {currentFont}
        </span>

        <label className="cursor-pointer text-xs text-white/40 hover:text-white">
          Upload
          <input
            type="file"
            accept=".woff,.woff2,.ttf,.otf"
            onChange={handleFontUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}