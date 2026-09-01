interface BrandLogoProps {
  logoUrl: string | null;
  fallback: string;
  className?: string;
}

export default function BrandLogo({
  logoUrl,
  fallback,
  className = "",
}: BrandLogoProps) {
  if (!logoUrl) {
    return (
      <div
        className={`
          flex h-full w-full
          items-center justify-center
          text-[18px]
          uppercase
          tracking-[0.18em]
          text-white/30
          ${className}
        `}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={`
        flex h-full w-full
        items-center justify-center
        ${className}
      `}
    >
      <img
        src={logoUrl}
        alt={fallback}
        className="
          block
          max-h-full
          max-w-full
          object-contain
        "
      />
    </div>
  );
}