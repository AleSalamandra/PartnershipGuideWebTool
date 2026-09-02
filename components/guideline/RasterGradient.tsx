"use client";

import {
  useMemo,
  type CSSProperties,
} from "react";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export interface RasterGradientStop {
  color: string;

  offset: number;

  opacity?: number;
}

interface RasterGradientProps {
  stops:
    RasterGradientStop[];

  direction?:
    | "horizontal"
    | "vertical"
    | "diagonal";

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

export default function RasterGradient({
  stops,

  direction =
    "horizontal",

  className = "",

  style,
}: RasterGradientProps) {
  const src =
    useMemo(
      () => {
        const coordinates =
          direction ===
          "vertical"
            ? {
                x1: "0%",
                y1: "0%",
                x2: "0%",
                y2: "100%",
              }
            : direction ===
                "diagonal"
              ? {
                  x1: "0%",
                  y1: "100%",
                  x2: "100%",
                  y2: "0%",
                }
              : {
                  x1: "0%",
                  y1: "0%",
                  x2: "100%",
                  y2: "0%",
                };

        const svgStops =
          stops
            .map(
              (
                stop
              ) => {
                const rgb =
                  hexToRgb(
                    stop.color
                  );

                return `
                  <stop
                    offset="${clamp(
                      stop.offset /
                        100
                    ) *
                    100}%"
                    stop-color="rgb(${rgb.r},${rgb.g},${rgb.b})"
                    stop-opacity="${clamp(
                      stop.opacity ??
                        1
                    )}"
                  />
                `;
              }
            )
            .join(
              ""
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
              <linearGradient
                id="g"
                x1="${coordinates.x1}"
                y1="${coordinates.y1}"
                x2="${coordinates.x2}"
                y2="${coordinates.y2}"
              >
                ${svgStops}
              </linearGradient>
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
        stops,
        direction,
      ]
    );

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      data-raster-gradient="true"
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