"use client";

import { ChangeEvent } from "react";

interface LogoUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function LogoUploader({
  value,
  onChange,
}: LogoUploaderProps) {
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label
        className="
          flex h-28 cursor-pointer
          items-center justify-center
          overflow-hidden
          rounded-md
          border border-dashed border-white/20
          bg-white/[0.025]
          transition
          hover:border-white/40
          hover:bg-white/[0.04]
        "
      >
        {value ? (
          <img
            src={value}
            alt="Uploaded logo"
            className="h-16 max-w-[80%] object-contain"
          />
        ) : (
          <span className="text-xs text-white/40">
            Drop or upload logo
          </span>
        )}

        <input
          type="file"
          accept=".svg,.png,.jpg,.jpeg"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {value && (
        <button
          onClick={() => onChange(null)}
          className="text-xs text-white/40 hover:text-white"
        >
          Remove
        </button>
      )}
    </div>
  );
}