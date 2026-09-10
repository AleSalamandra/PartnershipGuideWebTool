"use client";

import type {
  SharedShapeGrammar,
} from "@/utils/sharedShapeGrammar";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export type SharedShapeUsage =
  | "family"
  | "shape"
  | "line"
  | "frame"
  | "surface"
  | "hero"
  | "lowerThird"
  | "transition";

interface SharedShapeSystemProps {
  grammar:
    SharedShapeGrammar;

  usage:
    SharedShapeUsage;

  className?:
    string;

  opacity?:
    number;
}

/* ================================================= */
/* STROKE                                            */
/* ================================================= */

function getStrokeWidth(
  grammar:
    SharedShapeGrammar
) {
  switch (
    grammar.stroke
  ) {
    case "hairline":
      return 1.3;

    case "heavy":
      return 5;

    case "regular":
    default:
      return 2.5;
  }
}

/* ================================================= */
/* PRIMARY PATH                                      */
/* ================================================= */

function getPrimaryPath(
  grammar:
    SharedShapeGrammar
) {
  const open =
    grammar.openness !==
    "closed";

  switch (
    grammar.primitive
  ) {
    case "rounded-frame":
      return open
        ? `
          M 105 42
          H 286
          Q 336 42 336 92
          V 148
          Q 336 198 286 198
          H 78
        `
        : `
          M 92 42
          H 286
          Q 336 42 336 92
          V 148
          Q 336 198 286 198
          H 92
          Q 42 198 42 148
          V 92
          Q 42 42 92 42
          Z
        `;

    case "cut-frame":
      return open
        ? `
          M 88 42
          H 292
          L 340 84
          V 145
          L 298 198
          H 102
        `
        : `
          M 88 42
          H 292
          L 340 84
          V 145
          L 298 198
          H 102
          L 58 158
          V 88
          Z
        `;

    case "arc":
      return `
        M 42 164
        C 92 58
          224 25
          350 87
        C 372 98
          382 112
          388 126
      `;

    case "capsule":
      return `
        M 111 48
        H 283
        C 327 48
          350 72
          350 120
        C 350 168
          327 192
          283 192
        H 111
        C 67 192
          44 168
          44 120
        C 44 72
          67 48
          111 48
        Z
      `;

    case "bracket":
      return `
        M 78 56
        H 300
        L 340 88

        M 340 88
        V 154

        M 340 154
        L 302 188
        H 154
      `;

    case "organic":
      return open
        ? `
          M 59 146
          C 48 82
            104 39
            174 52
          C 236 18
            337 58
            343 121
          C 349 172
            290 201
            229 185
        `
        : `
          M 59 146
          C 48 82
            104 39
            174 52
          C 236 18
            337 58
            343 121
          C 349 172
            290 201
            229 185
          C 161 221
            75 203
            59 146
          Z
        `;

    case "frame":
    default:
      return open
        ? `
          M 90 43
          H 338
          V 196
          H 98
        `
        : `
          M 58 43
          H 338
          V 196
          H 58
          Z
        `;
  }
}

/* ================================================= */
/* SECONDARY PATH                                    */
/* ================================================= */

function getSecondaryPath(
  grammar:
    SharedShapeGrammar
) {
  switch (
    grammar.primitive
  ) {
    case "arc":
      return `
        M 76 173
        C 132 89
          238 61
          343 105
      `;

    case "bracket":
      return `
        M 122 78
        H 288
        L 316 99

        M 316 99
        V 145
      `;

    case "organic":
      return `
        M 102 156
        C 82 106
          135 68
          194 80
        C 247 51
          301 76
          310 121
      `;

    case "cut-frame":
      return `
        M 112 70
        H 270
        L 308 101
        V 148
        L 282 171
        H 149
      `;

    case "capsule":
      return `
        M 145 76
        H 270
        C 297 76
          314 92
          314 120
        C 314 148
          297 164
          270 164
        H 145
      `;

    case "rounded-frame":
      return `
        M 135 72
        H 272
        Q 305 72
          305 105
        V 143
        Q 305 168
          278 168
        H 145
      `;

    case "frame":
    default:
      return `
        M 117 72
        H 302
        V 168
        H 147
      `;
  }
}

/* ================================================= */
/* ACCENT PATH                                       */
/* ================================================= */

function getAccentPath(
  grammar:
    SharedShapeGrammar
) {
  if (
    grammar.direction ===
    "diagonal"
  ) {
    return `
      M 80 168
      L 150 104
    `;
  }

  if (
    grammar.primitive ===
      "arc" ||
    grammar.cornerStyle ===
      "round"
  ) {
    return `
      M 77 164
      C 104 121
        128 105
        172 94
    `;
  }

  if (
    grammar.cornerStyle ===
    "chamfered"
  ) {
    return `
      M 80 158
      H 142
      L 172 128
    `;
  }

  if (
    grammar.cornerStyle ===
    "open"
  ) {
    return `
      M 82 154
      H 158

      M 158 154
      V 108
    `;
  }

  return `
    M 80 156
    H 174
  `;
}

/* ================================================= */
/* TRANSFORM                                         */
/* ================================================= */

function getPrimaryTransform(
  grammar:
    SharedShapeGrammar
) {
  const transforms:
    string[] = [];

  switch (
    grammar.composition
  ) {
    case "offset":
      transforms.push(
        "translate(18 -8)"
      );
      break;

    case "cropped":
      transforms.push(
        "translate(48 0) scale(1.08)"
      );
      break;

    case "layered":
      transforms.push(
        "translate(4 -4)"
      );
      break;
  }

  if (
    grammar.direction ===
    "diagonal"
  ) {
    transforms.push(
      "rotate(-5 200 120)"
    );
  }

  return transforms.join(
    " "
  );
}

/* ================================================= */
/* SYSTEM                                            */
/* ================================================= */

export default function SharedShapeSystem({
  grammar,
  usage,
  className = "",
  opacity = 1,
}: SharedShapeSystemProps) {
  const strokeWidth =
    getStrokeWidth(
      grammar
    );

  const primary =
    getPrimaryPath(
      grammar
    );

  const secondary =
    getSecondaryPath(
      grammar
    );

  const accent =
    getAccentPath(
      grammar
    );

  const primaryTransform =
    getPrimaryTransform(
      grammar
    );

  const massShape =
    grammar.stroke ===
      "heavy" &&
    (
      grammar.primitive ===
        "capsule" ||
      grammar.primitive ===
        "organic"
    );

  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`
        h-full
        w-full

        ${className}
      `}
      style={{
        opacity,
      }}
    >
      {usage ===
        "family" && (
        <>
          <ShapePath
            d={
              primary
            }
            colour={
              grammar.primaryColor
            }
            strokeWidth={
              strokeWidth
            }
            transform={
              primaryTransform
            }
            fill={
              massShape
            }
            opacity={
              0.8
            }
          />

          {grammar.maxElements >=
            2 && (
            <ShapePath
              d={
                secondary
              }
              colour={
                grammar.secondaryColor
              }
              strokeWidth={
                strokeWidth *
                0.78
              }
              transform="translate(8 3)"
              opacity={
                0.55
              }
            />
          )}

          {grammar.maxElements >=
            3 && (
            <ShapePath
              d={
                accent
              }
              colour={
                grammar.primaryColor
              }
              strokeWidth={
                strokeWidth
              }
              opacity={
                0.46
              }
            />
          )}
        </>
      )}

      {usage ===
        "shape" && (
        <>
          <ShapePath
            d={
              primary
            }
            colour={
              grammar.primaryColor
            }
            strokeWidth={
              strokeWidth
            }
            transform={
              primaryTransform
            }
            fill={
              massShape
            }
            opacity={
              0.82
            }
          />

          {grammar.maxElements >=
            2 && (
            <ShapePath
              d={
                secondary
              }
              colour={
                grammar.secondaryColor
              }
              strokeWidth={
                strokeWidth *
                0.75
              }
              transform="translate(12 5)"
              opacity={
                0.42
              }
            />
          )}
        </>
      )}

      {usage ===
        "line" && (
        <>
          <ShapePath
            d={
              accent
            }
            colour={
              grammar.primaryColor
            }
            strokeWidth={
              strokeWidth
            }
            transform="translate(55 -5) scale(1.35)"
            opacity={
              0.84
            }
          />

          {grammar.repetition !==
            "none" && (
            <ShapePath
              d={
                accent
              }
              colour={
                grammar.secondaryColor
              }
              strokeWidth={
                strokeWidth *
                0.75
              }
              transform="translate(82 18) scale(1.05)"
              opacity={
                0.36
              }
            />
          )}
        </>
      )}

      {usage ===
        "frame" && (
        <>
          <rect
            x="102"
            y="72"
            width="200"
            height="108"
            rx="5"
            fill="currentColor"
            opacity="0.035"
          />

          <ShapePath
            d={
              primary
            }
            colour={
              grammar.primaryColor
            }
            strokeWidth={
              strokeWidth
            }
            transform={
              primaryTransform
            }
            opacity={
              0.76
            }
          />
        </>
      )}

      {usage ===
        "surface" && (
        <>
          {Array.from({
            length:
              grammar.depth ===
              "layered"
                ? 3
                : grammar.depth ===
                    "subtle"
                  ? 2
                  : 1,
          }).map(
            (
              _,
              index
            ) => (
              <ShapePath
                key={
                  index
                }
                d={
                  primary
                }
                colour={
                  index ===
                  0
                    ? grammar.primaryColor
                    : grammar.secondaryColor
                }
                strokeWidth={
                  strokeWidth *
                  (
                    1 -
                    index *
                      0.12
                  )
                }
                transform={`translate(${
                  index *
                  18
                } ${
                  index *
                  10
                })`}
                fill={
                  true
                }
                opacity={
                  0.12 -
                  index *
                    0.022
                }
              />
            )
          )}
        </>
      )}

      {usage ===
        "hero" && (
        <>
          <g
            transform="
              translate(82 2)
              scale(0.82)
            "
          >
            <ShapePath
              d={
                primary
              }
              colour={
                grammar.primaryColor
              }
              strokeWidth={
                strokeWidth
              }
              transform={
                primaryTransform
              }
              fill={
                massShape
              }
              opacity={
                0.72
              }
            />

            {grammar.depth !==
              "flat" && (
              <ShapePath
                d={
                  secondary
                }
                colour={
                  grammar.secondaryColor
                }
                strokeWidth={
                  strokeWidth *
                  0.72
                }
                transform="translate(12 8)"
                opacity={
                  0.28
                }
              />
            )}
          </g>
        </>
      )}

      {usage ===
        "lowerThird" && (
        <>
          <g
            transform="
              translate(135 21)
              scale(0.55)
            "
          >
            <ShapePath
              d={
                accent
              }
              colour={
                grammar.primaryColor
              }
              strokeWidth={
                strokeWidth *
                1.15
              }
              opacity={
                0.84
              }
            />

            {grammar.repetition !==
              "none" && (
              <ShapePath
                d={
                  accent
                }
                colour={
                  grammar.secondaryColor
                }
                strokeWidth={
                  strokeWidth *
                  0.7
                }
                transform="translate(25 18)"
                opacity={
                  0.34
                }
              />
            )}
          </g>
        </>
      )}

      {usage ===
        "transition" && (
        <>
          {Array.from({
            length:
              Math.max(
                1,
                grammar.echoCount +
                  1
              ),
          }).map(
            (
              _,
              index
            ) => (
              <ShapePath
                key={
                  index
                }
                d={
                  primary
                }
                colour={
                  index ===
                  0
                    ? grammar.primaryColor
                    : grammar.secondaryColor
                }
                strokeWidth={
                  strokeWidth *
                  (
                    1 -
                    index *
                      0.12
                  )
                }
                transform={`
                  translate(
                    ${index * 24}
                    ${index * 12}
                  )
                  ${
                    grammar.direction ===
                    "diagonal"
                      ? "rotate(-5 200 120)"
                      : ""
                  }
                `}
                opacity={
                  0.66 -
                  index *
                    0.16
                }
              />
            )
          )}
        </>
      )}
    </svg>
  );
}

/* ================================================= */
/* PATH                                              */
/* ================================================= */

function ShapePath({
  d,
  colour,
  strokeWidth,
  transform,
  fill = false,
  opacity = 1,
}: {
  d:
    string;

  colour:
    string;

  strokeWidth:
    number;

  transform?:
    string;

  fill?:
    boolean;

  opacity?:
    number;
}) {
  return (
    <path
      d={
        d
      }
      transform={
        transform
      }
      fill={
        fill
          ? colour
          : "none"
      }
      fillOpacity={
        fill
          ? 0.16
          : 0
      }
      stroke={
        colour
      }
      strokeWidth={
        strokeWidth
      }
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      opacity={
        opacity
      }
    />
  );
}