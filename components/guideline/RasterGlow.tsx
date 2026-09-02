"use client";

import {
  useMemo,
  type CSSProperties,
} from "react";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface RasterGlowProps {
  color: string;

  secondaryColor?: string;

  opacity?: number;

  secondaryOpacity?: number;

  centerX?: number;

  centerY?: number;

  radius?: number;

  className?: string;

  style?: CSSProperties;
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function clamp(
  value: number,
  min = 0,
  max = 1
) {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}

function safeHex(
  value: string,
  fallback = "#FFFFFF"
) {
  return /^#[0-9A-Fa-f]{6}$/.test(
    value
  )
    ? value
    : fallback;
}

function hexToRgb(
  value: string
) {
  const safe =
    safeHex(value);

  const numeric =
    parseInt(
      safe.slice(1),
      16
    );

  return {
    r:
      (numeric >> 16) &
      255,

    g:
      (numeric >> 8) &
      255,

    b:
      numeric &
      255,
  };
}

function encodeSvg(
  svg: string
) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    svg
  )}`;
}

/* ================================================= */
/* COMPONENT                                         */
/* ================================================= */

export default function RasterGlow({
  color,

  secondaryColor,

  opacity = 0.24,

  secondaryOpacity = 0.12,

  centerX = 50,

  centerY = 50,

  radius = 62,

  className = "",

  style,
}: RasterGlowProps) {
  const src =
    useMemo(
      () => {
        const primary =
          hexToRgb(
            color
          );

        const secondary =
          hexToRgb(
            secondaryColor ??
              color
          );

        const p =
          clamp(
            opacity
          );

        const s =
          clamp(
            secondaryOpacity
          );

        const svg = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="1000"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="g"
                cx="${centerX}%"
                cy="${centerY}%"
                r="${radius}%"
              >
                <stop
                  offset="0%"
                  stop-color="rgb(${primary.r},${primary.g},${primary.b})"
                  stop-opacity="${p}"
                />

                <stop
                  offset="24%"
                  stop-color="rgb(${primary.r},${primary.g},${primary.b})"
                  stop-opacity="${p * 0.72}"
                />

                <stop
                  offset="46%"
                  stop-color="rgb(${secondary.r},${secondary.g},${secondary.b})"
                  stop-opacity="${s}"
                />

                <stop
                  offset="68%"
                  stop-color="rgb(${secondary.r},${secondary.g},${secondary.b})"
                  stop-opacity="${s * 0.28}"
                />

                <stop
                  offset="86%"
                  stop-color="rgb(${secondary.r},${secondary.g},${secondary.b})"
                  stop-opacity="0.015"
                />

                <stop
                  offset="100%"
                  stop-color="rgb(${secondary.r},${secondary.g},${secondary.b})"
                  stop-opacity="0"
                />
              </radialGradient>
            </defs>

            <rect
              width="1000"
              height="1000"
              fill="url(#g)"
            />
          </svg>
        `;

        return encodeSvg(
          svg
        );
      },
      [
        color,
        secondaryColor,
        opacity,
        secondaryOpacity,
        centerX,
        centerY,
        radius,
      ]
    );

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      data-raster-glow="true"
      className={`
        pointer-events-none
        select-none
        ${className}
      `}
      style={{
        objectFit:
          "fill",

        filter:
          "none",

        ...style,
      }}
    />
  );
}