"use client";

import {
  useEffect,
  useState,
} from "react";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  minY: number;

  maxX: number;
  maxY: number;

  width: number;
  height: number;

  area: number;
}

interface SkeletonSegment {
  points: Point[];
  closed: boolean;
}

interface SegmentDescriptor {
  segment: SkeletonSegment;

  length: number;
  lengthNormalized: number;

  scale: number;
  curvature: number;
  straightness: number;

  aspect: number;

  centroidX: number;
  centroidY: number;

  uniqueness: number;

  score: number;
}

export interface LogoDNAData {
  ready: boolean;
  hasSourceLogo: boolean;

  useMotif: boolean;

  path: string | null;

  score: number;
  complexity: number;

  focusX: number;
  focusY: number;

  macroCropUrl: string | null;
}

interface UseLogoDNAOptions {
  logoUrl: string | null;

  fallback: string;

  macroColor?: string;
}

interface LogoDNAMotifProps {
  dna: LogoDNAData;

  stroke?: string;

  strokeWidth?: number;
  opacity?: number;

  className?: string;

  flipX?: boolean;
  flipY?: boolean;
}

interface LogoDNAMacroCropProps {
  dna: LogoDNAData;

  className?: string;

  opacity?: number;
}

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const ANALYSIS_WIDTH =
  460;

const ANALYSIS_HEIGHT =
  190;

const MASK_THRESHOLD =
  32;

const MAX_THINNING_ITERATIONS =
  70;

const MIN_SEGMENT_LENGTH =
  9;

const MIN_DISTINCTIVENESS =
  0.48;

const MACRO_WIDTH =
  1200;

const MACRO_HEIGHT =
  500;

/* ================================================= */
/* GENERIC HELPERS                                   */
/* ================================================= */

function clamp(
  value: number
) {
  return Math.min(
    1,
    Math.max(
      0,
      value
    )
  );
}

function clampRange(
  value: number,
  minimum: number,
  maximum: number
) {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      value
    )
  );
}

function distance(
  a: Point,
  b: Point
) {
  return Math.sqrt(
    Math.pow(
      b.x - a.x,
      2
    ) +
      Math.pow(
        b.y - a.y,
        2
      )
  );
}

function escapeXml(
  value: string
) {
  return value
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&apos;"
    );
}

/* ================================================= */
/* COLOUR                                            */
/* ================================================= */

function safeColour(
  value: string | undefined,
  fallback: string
) {
  return (
    typeof value === "string" &&
    /^#[0-9A-Fa-f]{6}$/.test(
      value
    )
  )
    ? value
    : fallback;
}

function hexToRgb(
  colour: string
) {
  const value =
    parseInt(
      safeColour(
        colour,
        "#FFFFFF"
      ).replace(
        "#",
        ""
      ),
      16
    );

  return {
    r:
      (value >> 16) &
      255,

    g:
      (value >> 8) &
      255,

    b:
      value &
      255,
  };
}

function colourDistance(
  r1: number,
  g1: number,
  b1: number,

  r2: number,
  g2: number,
  b2: number
) {
  return Math.sqrt(
    Math.pow(
      r1 - r2,
      2
    ) +
      Math.pow(
        g1 - g2,
        2
      ) +
      Math.pow(
        b1 - b2,
        2
      )
  );
}

/* ================================================= */
/* FALLBACK SOURCE                                   */
/* ================================================= */

function createFallbackLogo(
  label: string
) {
  const safeLabel =
    escapeXml(
      label ||
        "Brand"
    );

  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="360"
      viewBox="0 0 1200 360"
    >
      <rect
        width="100%"
        height="100%"
        fill="transparent"
      />

      <text
        x="600"
        y="190"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="150"
        font-weight="600"
        fill="#ffffff"
      >
        ${safeLabel}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svg
  )}`;
}

/* ================================================= */
/* IMAGE LOADING                                     */
/* ================================================= */

function loadImage(
  source: string
) {
  return new Promise<HTMLImageElement>(
    (
      resolve,
      reject
    ) => {
      const image =
        new Image();

      if (
        source.startsWith(
          "http://"
        ) ||
        source.startsWith(
          "https://"
        )
      ) {
        image.crossOrigin =
          "anonymous";
      }

      image.onload =
        () => {
          resolve(
            image
          );
        };

      image.onerror =
        () => {
          reject(
            new Error(
              `Could not load logo: ${source}`
            )
          );
        };

      image.src =
        source;
    }
  );
}

/* ================================================= */
/* COLOUR SAMPLE                                     */
/* ================================================= */

interface ColourSample {
  r: number;
  g: number;
  b: number;
  a: number;
}

function samplePatch(
  pixels:
    Uint8ClampedArray,

  width: number,
  height: number,

  centerX: number,
  centerY: number,

  radius =
    4
): ColourSample {
  let r =
    0;

  let g =
    0;

  let b =
    0;

  let a =
    0;

  let count =
    0;

  for (
    let y =
      Math.max(
        0,
        centerY - radius
      );

    y <=
    Math.min(
      height - 1,
      centerY + radius
    );

    y += 1
  ) {
    for (
      let x =
        Math.max(
          0,
          centerX - radius
        );

      x <=
      Math.min(
        width - 1,
        centerX + radius
      );

      x += 1
    ) {
      const index =
        (
          y *
            width +
          x
        ) *
        4;

      r +=
        pixels[
          index
        ];

      g +=
        pixels[
          index + 1
        ];

      b +=
        pixels[
          index + 2
        ];

      a +=
        pixels[
          index + 3
        ];

      count +=
        1;
    }
  }

  return {
    r:
      r / count,

    g:
      g / count,

    b:
      b / count,

    a:
      a / count,
  };
}

function averageSamples(
  samples:
    ColourSample[]
): ColourSample {
  return {
    r:
      samples.reduce(
        (
          total,
          sample
        ) =>
          total +
          sample.r,
        0
      ) /
      samples.length,

    g:
      samples.reduce(
        (
          total,
          sample
        ) =>
          total +
          sample.g,
        0
      ) /
      samples.length,

    b:
      samples.reduce(
        (
          total,
          sample
        ) =>
          total +
          sample.b,
        0
      ) /
      samples.length,

    a:
      samples.reduce(
        (
          total,
          sample
        ) =>
          total +
          sample.a,
        0
      ) /
      samples.length,
  };
}

/* ================================================= */
/* BUILD MASK                                        */
/* ================================================= */

function buildMask(
  pixels:
    Uint8ClampedArray,

  width: number,
  height: number
) {
  const corners = [
    samplePatch(
      pixels,
      width,
      height,
      4,
      4
    ),

    samplePatch(
      pixels,
      width,
      height,
      width - 5,
      4
    ),

    samplePatch(
      pixels,
      width,
      height,
      4,
      height - 5
    ),

    samplePatch(
      pixels,
      width,
      height,
      width - 5,
      height - 5
    ),
  ];

  const background =
    averageSamples(
      corners
    );

  const opaqueCorners =
    corners.every(
      (
        corner
      ) =>
        corner.a >
        225
    );

  const backgroundVariation =
    Math.max(
      ...corners.map(
        (
          corner
        ) =>
          colourDistance(
            corner.r,
            corner.g,
            corner.b,

            background.r,
            background.g,
            background.b
          )
      )
    );

  const removeBackground =
    opaqueCorners &&
    backgroundVariation <
      28;

  const mask =
    new Uint8Array(
      width *
        height
    );

  for (
    let y = 0;
    y < height;
    y += 1
  ) {
    for (
      let x = 0;
      x < width;
      x += 1
    ) {
      const index =
        (
          y *
            width +
          x
        ) *
        4;

      const alpha =
        pixels[
          index + 3
        ];

      if (
        alpha <
        MASK_THRESHOLD
      ) {
        continue;
      }

      if (
        removeBackground
      ) {
        const delta =
          colourDistance(
            pixels[
              index
            ],
            pixels[
              index + 1
            ],
            pixels[
              index + 2
            ],

            background.r,
            background.g,
            background.b
          );

        if (
          delta <
          28
        ) {
          continue;
        }
      }

      mask[
        y *
          width +
        x
      ] =
        1;
    }
  }

  return mask;
}

/* ================================================= */
/* BOUNDS                                            */
/* ================================================= */

function getBounds(
  mask:
    Uint8Array,

  width: number,
  height: number
): Bounds | null {
  let minX =
    width;

  let minY =
    height;

  let maxX =
    -1;

  let maxY =
    -1;

  let area =
    0;

  for (
    let y = 0;
    y < height;
    y += 1
  ) {
    for (
      let x = 0;
      x < width;
      x += 1
    ) {
      if (
        !mask[
          y *
            width +
          x
        ]
      ) {
        continue;
      }

      area +=
        1;

      minX =
        Math.min(
          minX,
          x
        );

      minY =
        Math.min(
          minY,
          y
        );

      maxX =
        Math.max(
          maxX,
          x
        );

      maxY =
        Math.max(
          maxY,
          y
        );
    }
  }

  if (
    maxX <
      minX ||
    maxY <
      minY
  ) {
    return null;
  }

  return {
    minX,
    minY,

    maxX,
    maxY,

    width:
      maxX -
      minX +
      1,

    height:
      maxY -
      minY +
      1,

    area,
  };
}

/* ================================================= */
/* ZHANG-SUEN THINNING                               */
/* ================================================= */

function thinMask(
  input:
    Uint8Array,

  width: number,
  height: number,

  bounds:
    Bounds
) {
  const skeleton =
    new Uint8Array(
      input
    );

  const minX =
    Math.max(
      1,
      bounds.minX - 2
    );

  const minY =
    Math.max(
      1,
      bounds.minY - 2
    );

  const maxX =
    Math.min(
      width - 2,
      bounds.maxX + 2
    );

  const maxY =
    Math.min(
      height - 2,
      bounds.maxY + 2
    );

  const get =
    (
      x: number,
      y: number
    ) =>
      skeleton[
        y *
          width +
        x
      ];

  for (
    let iteration = 0;
    iteration <
    MAX_THINNING_ITERATIONS;
    iteration += 1
  ) {
    let changed =
      false;

    const firstPass:
      number[] = [];

    for (
      let y = minY;
      y <=
      maxY;
      y += 1
    ) {
      for (
        let x = minX;
        x <=
        maxX;
        x += 1
      ) {
        const index =
          y *
            width +
          x;

        if (
          !skeleton[
            index
          ]
        ) {
          continue;
        }

        const p2 =
          get(
            x,
            y - 1
          );

        const p3 =
          get(
            x + 1,
            y - 1
          );

        const p4 =
          get(
            x + 1,
            y
          );

        const p5 =
          get(
            x + 1,
            y + 1
          );

        const p6 =
          get(
            x,
            y + 1
          );

        const p7 =
          get(
            x - 1,
            y + 1
          );

        const p8 =
          get(
            x - 1,
            y
          );

        const p9 =
          get(
            x - 1,
            y - 1
          );

        const neighbours = [
          p2,
          p3,
          p4,
          p5,
          p6,
          p7,
          p8,
          p9,
        ];

        const count =
          neighbours.reduce(
            (
              total,
              value
            ) =>
              total +
              value,
            0
          );

        if (
          count <
            2 ||
          count >
            6
        ) {
          continue;
        }

        let transitions =
          0;

        for (
          let n = 0;
          n <
          neighbours.length;
          n += 1
        ) {
          const current =
            neighbours[
              n
            ];

          const next =
            neighbours[
              (
                n + 1
              ) %
              neighbours.length
            ];

          if (
            current ===
              0 &&
            next ===
              1
          ) {
            transitions +=
              1;
          }
        }

        if (
          transitions !==
          1
        ) {
          continue;
        }

        if (
          p2 *
            p4 *
            p6 !==
          0
        ) {
          continue;
        }

        if (
          p4 *
            p6 *
            p8 !==
          0
        ) {
          continue;
        }

        firstPass.push(
          index
        );
      }
    }

    firstPass.forEach(
      (
        index
      ) => {
        skeleton[
          index
        ] =
          0;

        changed =
          true;
      }
    );

    const secondPass:
      number[] = [];

    for (
      let y = minY;
      y <=
      maxY;
      y += 1
    ) {
      for (
        let x = minX;
        x <=
        maxX;
        x += 1
      ) {
        const index =
          y *
            width +
          x;

        if (
          !skeleton[
            index
          ]
        ) {
          continue;
        }

        const p2 =
          get(
            x,
            y - 1
          );

        const p3 =
          get(
            x + 1,
            y - 1
          );

        const p4 =
          get(
            x + 1,
            y
          );

        const p5 =
          get(
            x + 1,
            y + 1
          );

        const p6 =
          get(
            x,
            y + 1
          );

        const p7 =
          get(
            x - 1,
            y + 1
          );

        const p8 =
          get(
            x - 1,
            y
          );

        const p9 =
          get(
            x - 1,
            y - 1
          );

        const neighbours = [
          p2,
          p3,
          p4,
          p5,
          p6,
          p7,
          p8,
          p9,
        ];

        const count =
          neighbours.reduce(
            (
              total,
              value
            ) =>
              total +
              value,
            0
          );

        if (
          count <
            2 ||
          count >
            6
        ) {
          continue;
        }

        let transitions =
          0;

        for (
          let n = 0;
          n <
          neighbours.length;
          n += 1
        ) {
          const current =
            neighbours[
              n
            ];

          const next =
            neighbours[
              (
                n + 1
              ) %
              neighbours.length
            ];

          if (
            current ===
              0 &&
            next ===
              1
          ) {
            transitions +=
              1;
          }
        }

        if (
          transitions !==
          1
        ) {
          continue;
        }

        if (
          p2 *
            p4 *
            p8 !==
          0
        ) {
          continue;
        }

        if (
          p2 *
            p6 *
            p8 !==
          0
        ) {
          continue;
        }

        secondPass.push(
          index
        );
      }
    }

    secondPass.forEach(
      (
        index
      ) => {
        skeleton[
          index
        ] =
          0;

        changed =
          true;
      }
    );

    if (
      !changed
    ) {
      break;
    }
  }

  return skeleton;
}

/* ================================================= */
/* SKELETON GRAPH                                    */
/* ================================================= */

const NEIGHBOUR_OFFSETS = [
  [-1, -1],
  [0, -1],
  [1, -1],

  [-1, 0],
  [1, 0],

  [-1, 1],
  [0, 1],
  [1, 1],
];

function idToPoint(
  id: number,
  width: number
): Point {
  return {
    x:
      id %
      width,

    y:
      Math.floor(
        id /
          width
      ),
  };
}

function getSkeletonNeighbours(
  skeleton:
    Uint8Array,

  id: number,

  width: number,
  height: number
) {
  const point =
    idToPoint(
      id,
      width
    );

  const result:
    number[] = [];

  NEIGHBOUR_OFFSETS.forEach(
    (
      [
        dx,
        dy,
      ]
    ) => {
      const x =
        point.x +
        dx;

      const y =
        point.y +
        dy;

      if (
        x <
          0 ||
        y <
          0 ||
        x >=
          width ||
        y >=
          height
      ) {
        return;
      }

      const neighbourId =
        y *
          width +
        x;

      if (
        skeleton[
          neighbourId
        ]
      ) {
        result.push(
          neighbourId
        );
      }
    }
  );

  return result;
}

function edgeKey(
  a: number,
  b: number
) {
  return a <
    b
    ? `${a}:${b}`
    : `${b}:${a}`;
}

/* ================================================= */
/* TRACE SEGMENTS                                    */
/* ================================================= */

function traceSkeletonSegments(
  skeleton:
    Uint8Array,

  width: number,
  height: number,

  bounds:
    Bounds
): SkeletonSegment[] {
  const ids:
    number[] = [];

  for (
    let y =
      bounds.minY;

    y <=
    bounds.maxY;

    y += 1
  ) {
    for (
      let x =
        bounds.minX;

      x <=
      bounds.maxX;

      x += 1
    ) {
      const id =
        y *
          width +
        x;

      if (
        skeleton[
          id
        ]
      ) {
        ids.push(
          id
        );
      }
    }
  }

  const nodeIds =
    ids.filter(
      (
        id
      ) =>
        getSkeletonNeighbours(
          skeleton,
          id,
          width,
          height
        ).length !==
        2
    );

  const visitedEdges =
    new Set<string>();

  const result:
    SkeletonSegment[] = [];

  const trace =
    (
      start:
        number,

      next:
        number
    ) => {
      const pointIds = [
        start,
        next,
      ];

      visitedEdges.add(
        edgeKey(
          start,
          next
        )
      );

      let previous =
        start;

      let current =
        next;

      let closed =
        false;

      for (
        let guard = 0;
        guard <
        ids.length + 10;
        guard += 1
      ) {
        if (
          current ===
          start
        ) {
          closed =
            true;

          break;
        }

        const neighbours =
          getSkeletonNeighbours(
            skeleton,
            current,
            width,
            height
          );

        if (
          neighbours.length !==
          2
        ) {
          break;
        }

        const candidate =
          neighbours[
            0
          ] ===
          previous
            ? neighbours[
                1
              ]
            : neighbours[
                0
              ];

        const key =
          edgeKey(
            current,
            candidate
          );

        if (
          visitedEdges.has(
            key
          )
        ) {
          if (
            candidate ===
            start
          ) {
            pointIds.push(
              candidate
            );

            closed =
              true;
          }

          break;
        }

        visitedEdges.add(
          key
        );

        previous =
          current;

        current =
          candidate;

        pointIds.push(
          current
        );
      }

      const points =
        pointIds.map(
          (
            id
          ) =>
            idToPoint(
              id,
              width
            )
        );

      return {
        points,
        closed,
      };
    };

  /* ------------------------------------------------ */
  /* START FROM ENDPOINTS / JUNCTIONS                 */
  /* ------------------------------------------------ */

  nodeIds.forEach(
    (
      nodeId
    ) => {
      const neighbours =
        getSkeletonNeighbours(
          skeleton,
          nodeId,
          width,
          height
        );

      neighbours.forEach(
        (
          neighbourId
        ) => {
          const key =
            edgeKey(
              nodeId,
              neighbourId
            );

          if (
            visitedEdges.has(
              key
            )
          ) {
            return;
          }

          const segment =
            trace(
              nodeId,
              neighbourId
            );

          if (
            segment.points.length >=
            MIN_SEGMENT_LENGTH
          ) {
            result.push(
              segment
            );
          }
        }
      );
    }
  );

  /* ------------------------------------------------ */
  /* CLOSED LOOPS WITH NO GRAPH NODE                  */
  /* ------------------------------------------------ */

  ids.forEach(
    (
      id
    ) => {
      const neighbours =
        getSkeletonNeighbours(
          skeleton,
          id,
          width,
          height
        );

      neighbours.forEach(
        (
          neighbourId
        ) => {
          const key =
            edgeKey(
              id,
              neighbourId
            );

          if (
            visitedEdges.has(
              key
            )
          ) {
            return;
          }

          const segment =
            trace(
              id,
              neighbourId
            );

          if (
            segment.points.length >=
            MIN_SEGMENT_LENGTH
          ) {
            result.push(
              segment
            );
          }
        }
      );
    }
  );

  return result;
}

/* ================================================= */
/* GEOMETRY                                          */
/* ================================================= */

function getSegmentLength(
  points:
    Point[]
) {
  let total =
    0;

  for (
    let index = 1;
    index <
    points.length;
    index += 1
  ) {
    total +=
      distance(
        points[
          index - 1
        ],
        points[
          index
        ]
      );
  }

  return total;
}

function getPointBounds(
  points:
    Point[]
) {
  let minX =
    Infinity;

  let minY =
    Infinity;

  let maxX =
    -Infinity;

  let maxY =
    -Infinity;

  points.forEach(
    (
      point
    ) => {
      minX =
        Math.min(
          minX,
          point.x
        );

      minY =
        Math.min(
          minY,
          point.y
        );

      maxX =
        Math.max(
          maxX,
          point.x
        );

      maxY =
        Math.max(
          maxY,
          point.y
        );
    }
  );

  return {
    minX,
    minY,
    maxX,
    maxY,

    width:
      Math.max(
        1,
        maxX -
          minX
      ),

    height:
      Math.max(
        1,
        maxY -
          minY
      ),
  };
}

/* ================================================= */
/* RESAMPLE                                          */
/* ================================================= */

function resamplePath(
  points:
    Point[],

  count =
    24
) {
  if (
    points.length <=
    2
  ) {
    return points;
  }

  const cumulative = [
    0,
  ];

  for (
    let index = 1;
    index <
    points.length;
    index += 1
  ) {
    cumulative.push(
      cumulative[
        cumulative.length -
          1
      ] +
        distance(
          points[
            index - 1
          ],
          points[
            index
          ]
        )
    );
  }

  const total =
    cumulative[
      cumulative.length -
        1
    ];

  if (
    total <=
    0
  ) {
    return points;
  }

  const result:
    Point[] = [];

  for (
    let sample = 0;
    sample <
    count;
    sample += 1
  ) {
    const target =
      (
        sample /
        (
          count -
          1
        )
      ) *
      total;

    let segmentIndex =
      1;

    while (
      segmentIndex <
        cumulative.length &&
      cumulative[
        segmentIndex
      ] <
        target
    ) {
      segmentIndex +=
        1;
    }

    segmentIndex =
      Math.min(
        segmentIndex,
        points.length - 1
      );

    const previousDistance =
      cumulative[
        segmentIndex - 1
      ];

    const nextDistance =
      cumulative[
        segmentIndex
      ];

    const denominator =
      Math.max(
        0.0001,
        nextDistance -
          previousDistance
      );

    const t =
      (
        target -
        previousDistance
      ) /
      denominator;

    const a =
      points[
        segmentIndex - 1
      ];

    const b =
      points[
        segmentIndex
      ];

    result.push({
      x:
        a.x +
        (
          b.x -
          a.x
        ) *
          t,

      y:
        a.y +
        (
          b.y -
          a.y
        ) *
          t,
    });
  }

  return result;
}

/* ================================================= */
/* CURVATURE                                         */
/* ================================================= */

function getCurvature(
  points:
    Point[]
) {
  const sampled =
    resamplePath(
      points,
      22
    );

  if (
    sampled.length <
    3
  ) {
    return 0;
  }

  let totalTurn =
    0;

  for (
    let index = 1;
    index <
    sampled.length - 1;
    index += 1
  ) {
    const previous =
      sampled[
        index - 1
      ];

    const current =
      sampled[
        index
      ];

    const next =
      sampled[
        index + 1
      ];

    const angleA =
      Math.atan2(
        current.y -
          previous.y,

        current.x -
          previous.x
      );

    const angleB =
      Math.atan2(
        next.y -
          current.y,

        next.x -
          current.x
      );

    let delta =
      angleB -
      angleA;

    while (
      delta >
      Math.PI
    ) {
      delta -=
        Math.PI *
        2;
    }

    while (
      delta <
      -Math.PI
    ) {
      delta +=
        Math.PI *
        2;
    }

    totalTurn +=
      Math.abs(
        delta
      );
  }

  return clamp(
    totalTurn /
      (
        Math.PI *
        1.8
      )
  );
}

/* ================================================= */
/* DESCRIPTORS                                       */
/* ================================================= */

function createDescriptors(
  segments:
    SkeletonSegment[],

  logoBounds:
    Bounds
): SegmentDescriptor[] {
  const logoDiagonal =
    Math.sqrt(
      Math.pow(
        logoBounds.width,
        2
      ) +
        Math.pow(
          logoBounds.height,
          2
        )
    );

  const initial =
    segments
      .map(
        (
          segment
        ) => {
          const points =
            segment.points;

          const length =
            getSegmentLength(
              points
            );

          const bounds =
            getPointBounds(
              points
            );

          const scale =
            clamp(
              Math.sqrt(
                Math.pow(
                  bounds.width,
                  2
                ) +
                  Math.pow(
                    bounds.height,
                    2
                  )
              ) /
                logoDiagonal
            );

          const endpointDistance =
            segment.closed
              ? 0
              : distance(
                  points[
                    0
                  ],
                  points[
                    points.length -
                      1
                  ]
                );

          const straightness =
            segment.closed
              ? 0
              : clamp(
                  endpointDistance /
                    Math.max(
                      0.001,
                      length
                    )
                );

          const curvature =
            segment.closed
              ? Math.max(
                  0.82,
                  getCurvature(
                    points
                  )
                )
              : getCurvature(
                  points
                );

          const aspect =
            Math.min(
              bounds.width,
              bounds.height
            ) /
            Math.max(
              bounds.width,
              bounds.height
            );

          const centroidX =
            points.reduce(
              (
                total,
                point
              ) =>
                total +
                point.x,
              0
            ) /
            points.length;

          const centroidY =
            points.reduce(
              (
                total,
                point
              ) =>
                total +
                point.y,
              0
            ) /
            points.length;

          return {
            segment,

            length,

            lengthNormalized:
              clamp(
                length /
                  (
                    logoDiagonal *
                    0.72
                  )
              ),

            scale,
            curvature,
            straightness,
            aspect,

            centroidX,
            centroidY,

            uniqueness:
              1,

            score:
              0,
          };
        }
      )
      .filter(
        (
          descriptor
        ) =>
          descriptor.length >=
            8 &&
          descriptor.scale >
            0.025
      );

  /* ------------------------------------------------ */
  /* UNIQUENESS                                       */
  /* ------------------------------------------------ */

  initial.forEach(
    (
      descriptor,
      index
    ) => {
      let similar =
        0;

      initial.forEach(
        (
          other,
          otherIndex
        ) => {
          if (
            index ===
            otherIndex
          ) {
            return;
          }

          const deltaLength =
            Math.abs(
              descriptor.lengthNormalized -
                other.lengthNormalized
            );

          const deltaCurve =
            Math.abs(
              descriptor.curvature -
                other.curvature
            );

          const deltaStraight =
            Math.abs(
              descriptor.straightness -
                other.straightness
            );

          const deltaAspect =
            Math.abs(
              descriptor.aspect -
                other.aspect
            );

          const closedDifference =
            descriptor.segment.closed ===
            other.segment.closed
              ? 0
              : 0.4;

          const similarityDistance =
            deltaLength *
              0.22 +
            deltaCurve *
              0.34 +
            deltaStraight *
              0.24 +
            deltaAspect *
              0.2 +
            closedDifference;

          if (
            similarityDistance <
            0.12
          ) {
            similar +=
              1;
          }
        }
      );

      descriptor.uniqueness =
        clamp(
          1 -
          similar /
            5
        );
    }
  );

  /* ------------------------------------------------ */
  /* FINAL SCORE                                      */
  /* ------------------------------------------------ */

  initial.forEach(
    (
      descriptor
    ) => {
      const genericStraight =
        descriptor.curvature <
          0.11 &&
        descriptor.straightness >
          0.94;

      const tiny =
        descriptor.scale <
          0.07;

      const loopBonus =
        descriptor.segment.closed
          ? 0.13
          : 0;

      const expressiveCurve =
        clamp(
          (
            1 -
            descriptor.straightness
          ) *
            1.3
        );

      let score =
        descriptor.uniqueness *
          0.35 +
        descriptor.curvature *
          0.24 +
        descriptor.lengthNormalized *
          0.17 +
        descriptor.scale *
          0.14 +
        expressiveCurve *
          0.1 +
        loopBonus;

      /*
        Repeated horizontal/vertical stems
        should not win simply because they are long.
      */

      if (
        genericStraight
      ) {
        score *=
          0.32;
      }

      if (
        tiny
      ) {
        score *=
          0.55;
      }

      descriptor.score =
        clamp(
          score
        );
    }
  );

  return initial;
}

/* ================================================= */
/* RDP SIMPLIFICATION                                */
/* ================================================= */

function perpendicularDistance(
  point:
    Point,

  start:
    Point,

  end:
    Point
) {
  const dx =
    end.x -
    start.x;

  const dy =
    end.y -
    start.y;

  if (
    dx === 0 &&
    dy === 0
  ) {
    return distance(
      point,
      start
    );
  }

  return (
    Math.abs(
      dy *
        point.x -
        dx *
          point.y +
        end.x *
          start.y -
        end.y *
          start.x
    ) /
    Math.sqrt(
      dx *
        dx +
      dy *
        dy
    )
  );
}

function simplifyRDP(
  points:
    Point[],

  epsilon:
    number
): Point[] {
  if (
    points.length <=
    2
  ) {
    return points;
  }

  let maximumDistance =
    0;

  let splitIndex =
    0;

  for (
    let index = 1;
    index <
    points.length - 1;
    index += 1
  ) {
    const currentDistance =
      perpendicularDistance(
        points[
          index
        ],

        points[
          0
        ],

        points[
          points.length -
            1
        ]
      );

    if (
      currentDistance >
      maximumDistance
    ) {
      maximumDistance =
        currentDistance;

      splitIndex =
        index;
    }
  }

  if (
    maximumDistance >
    epsilon
  ) {
    const left =
      simplifyRDP(
        points.slice(
          0,
          splitIndex + 1
        ),
        epsilon
      );

    const right =
      simplifyRDP(
        points.slice(
          splitIndex
        ),
        epsilon
      );

    return [
      ...left.slice(
        0,
        -1
      ),

      ...right,
    ];
  }

  return [
    points[
      0
    ],

    points[
      points.length -
        1
    ],
  ];
}

/* ================================================= */
/* NORMALIZE                                         */
/* ================================================= */

function normalizePoints(
  points:
    Point[]
) {
  const bounds =
    getPointBounds(
      points
    );

  const width =
    Math.max(
      1,
      bounds.width
    );

  const height =
    Math.max(
      1,
      bounds.height
    );

  const maxDimension =
    Math.max(
      width,
      height
    );

  const scale =
    76 /
    maxDimension;

  const renderedWidth =
    width *
    scale;

  const renderedHeight =
    height *
    scale;

  const offsetX =
    (
      100 -
      renderedWidth
    ) /
    2;

  const offsetY =
    (
      100 -
      renderedHeight
    ) /
    2;

  return points.map(
    (
      point
    ) => ({
      x:
        offsetX +
        (
          point.x -
          bounds.minX
        ) *
          scale,

      y:
        offsetY +
        (
          point.y -
          bounds.minY
        ) *
          scale,
    })
  );
}

/* ================================================= */
/* SVG PATH                                          */
/* ================================================= */

function midpoint(
  a: Point,
  b: Point
): Point {
  return {
    x:
      (
        a.x +
        b.x
      ) /
      2,

    y:
      (
        a.y +
        b.y
      ) /
      2,
  };
}

function createSmoothPath(
  sourcePoints:
    Point[],

  closed:
    boolean
) {
  const sampled =
    resamplePath(
      sourcePoints,
      closed
        ? 28
        : 22
    );

  const simplified =
    simplifyRDP(
      sampled,
      1.55
    );

  const points =
    normalizePoints(
      simplified
    );

  if (
    points.length <
    2
  ) {
    return null;
  }

  if (
    closed &&
    points.length >=
      3
  ) {
    const last =
      points[
        points.length - 1
      ];

    const first =
      points[
        0
      ];

    const start =
      midpoint(
        last,
        first
      );

    let path =
      `M ${start.x.toFixed(
        2
      )} ${start.y.toFixed(
        2
      )}`;

    for (
      let index = 0;
      index <
      points.length;
      index += 1
    ) {
      const current =
        points[
          index
        ];

      const next =
        points[
          (
            index + 1
          ) %
          points.length
        ];

      const mid =
        midpoint(
          current,
          next
        );

      path +=
        ` Q ${current.x.toFixed(
          2
        )} ${current.y.toFixed(
          2
        )} ${mid.x.toFixed(
          2
        )} ${mid.y.toFixed(
          2
        )}`;
    }

    path +=
      " Z";

    return path;
  }

  let path =
    `M ${points[0].x.toFixed(
      2
    )} ${points[0].y.toFixed(
      2
    )}`;

  for (
    let index = 1;
    index <
    points.length - 1;
    index += 1
  ) {
    const current =
      points[
        index
      ];

    const next =
      points[
        index + 1
      ];

    const mid =
      midpoint(
        current,
        next
      );

    path +=
      ` Q ${current.x.toFixed(
        2
      )} ${current.y.toFixed(
        2
      )} ${mid.x.toFixed(
        2
      )} ${mid.y.toFixed(
        2
      )}`;
  }

  const penultimate =
    points[
      points.length - 2
    ];

  const final =
    points[
      points.length - 1
    ];

  path +=
    ` Q ${penultimate.x.toFixed(
      2
    )} ${penultimate.y.toFixed(
      2
    )} ${final.x.toFixed(
      2
    )} ${final.y.toFixed(
      2
    )}`;

  return path;
}

/* ================================================= */
/* COLOURISED MASK                                   */
/* ================================================= */

function createColouredMaskCanvas(
  mask:
    Uint8Array,

  width: number,
  height: number,

  colour:
    string
) {
  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    width;

  canvas.height =
    height;

  const context =
    canvas.getContext(
      "2d"
    );

  if (
    !context
  ) {
    throw new Error(
      "Could not create macro canvas."
    );
  }

  const {
    r,
    g,
    b,
  } =
    hexToRgb(
      colour
    );

  const output =
    context.createImageData(
      width,
      height
    );

  for (
    let index = 0;
    index <
    mask.length;
    index += 1
  ) {
    if (
      !mask[
        index
      ]
    ) {
      continue;
    }

    const target =
      index *
      4;

    output.data[
      target
    ] =
      r;

    output.data[
      target + 1
    ] =
      g;

    output.data[
      target + 2
    ] =
      b;

    output.data[
      target + 3
    ] =
      255;
  }

  context.putImageData(
    output,
    0,
    0
  );

  return canvas;
}

/* ================================================= */
/* MACRO CROP                                        */
/* ================================================= */

function createMacroCrop(
  mask:
    Uint8Array,

  focusX:
    number,

  focusY:
    number,

  colour:
    string
) {
  const source =
    createColouredMaskCanvas(
      mask,
      ANALYSIS_WIDTH,
      ANALYSIS_HEIGHT,
      colour
    );

  const output =
    document.createElement(
      "canvas"
    );

  output.width =
    MACRO_WIDTH;

  output.height =
    MACRO_HEIGHT;

  const context =
    output.getContext(
      "2d"
    );

  if (
    !context
  ) {
    throw new Error(
      "Could not create macro crop output."
    );
  }

  context.clearRect(
    0,
    0,
    MACRO_WIDTH,
    MACRO_HEIGHT
  );

  const targetAspect =
    MACRO_WIDTH /
    MACRO_HEIGHT;

  let sourceWidth =
    ANALYSIS_WIDTH /
    4.25;

  let sourceHeight =
    sourceWidth /
    targetAspect;

  if (
    sourceHeight >
    ANALYSIS_HEIGHT
  ) {
    sourceHeight =
      ANALYSIS_HEIGHT;

    sourceWidth =
      sourceHeight *
      targetAspect;
  }

  const focusPixelX =
    focusX *
    ANALYSIS_WIDTH;

  const focusPixelY =
    focusY *
    ANALYSIS_HEIGHT;

  const sourceX =
    clampRange(
      focusPixelX -
        sourceWidth /
          2,

      0,
      ANALYSIS_WIDTH -
        sourceWidth
    );

  const sourceY =
    clampRange(
      focusPixelY -
        sourceHeight /
          2,

      0,
      ANALYSIS_HEIGHT -
        sourceHeight
    );

  context.imageSmoothingEnabled =
    true;

  context.imageSmoothingQuality =
    "high";

  context.drawImage(
    source,

    sourceX,
    sourceY,

    sourceWidth,
    sourceHeight,

    0,
    0,

    MACRO_WIDTH,
    MACRO_HEIGHT
  );

  return output.toDataURL(
    "image/png"
  );
}

/* ================================================= */
/* ANALYSE LOGO                                      */
/* ================================================= */

function analyseLogo(
  image:
    HTMLImageElement,

  macroColor:
    string
) {
  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    ANALYSIS_WIDTH;

  canvas.height =
    ANALYSIS_HEIGHT;

  const context =
    canvas.getContext(
      "2d",
      {
        willReadFrequently:
          true,
      }
    );

  if (
    !context
  ) {
    throw new Error(
      "Could not create analysis canvas."
    );
  }

  context.clearRect(
    0,
    0,
    ANALYSIS_WIDTH,
    ANALYSIS_HEIGHT
  );

  const naturalWidth =
    image.naturalWidth ||
    image.width ||
    1;

  const naturalHeight =
    image.naturalHeight ||
    image.height ||
    1;

  const padding =
    9;

  const scale =
    Math.min(
      (
        ANALYSIS_WIDTH -
        padding *
          2
      ) /
        naturalWidth,

      (
        ANALYSIS_HEIGHT -
        padding *
          2
      ) /
        naturalHeight
    );

  const renderWidth =
    naturalWidth *
    scale;

  const renderHeight =
    naturalHeight *
    scale;

  const renderX =
    (
      ANALYSIS_WIDTH -
      renderWidth
    ) /
    2;

  const renderY =
    (
      ANALYSIS_HEIGHT -
      renderHeight
    ) /
    2;

  context.drawImage(
    image,

    renderX,
    renderY,

    renderWidth,
    renderHeight
  );

  const imageData =
    context.getImageData(
      0,
      0,
      ANALYSIS_WIDTH,
      ANALYSIS_HEIGHT
    );

  const mask =
    buildMask(
      imageData.data,
      ANALYSIS_WIDTH,
      ANALYSIS_HEIGHT
    );

  const bounds =
    getBounds(
      mask,
      ANALYSIS_WIDTH,
      ANALYSIS_HEIGHT
    );

  if (
    !bounds ||
    bounds.area <
      30
  ) {
    throw new Error(
      "Logo contains insufficient geometry."
    );
  }

  const skeleton =
    thinMask(
      mask,
      ANALYSIS_WIDTH,
      ANALYSIS_HEIGHT,
      bounds
    );

  const segments =
    traceSkeletonSegments(
      skeleton,
      ANALYSIS_WIDTH,
      ANALYSIS_HEIGHT,
      bounds
    );

  const descriptors =
    createDescriptors(
      segments,
      bounds
    ).sort(
      (
        a,
        b
      ) =>
        b.score -
        a.score
    );

  const winner =
    descriptors[
      0
    ];

  /*
    No acceptable distinctive gesture:
    keep macro crop only.
  */

  if (
    !winner ||
    winner.score <
      MIN_DISTINCTIVENESS
  ) {
    const fallbackFocusX =
      (
        bounds.minX +
        bounds.width /
          2
      ) /
      ANALYSIS_WIDTH;

    const fallbackFocusY =
      (
        bounds.minY +
        bounds.height /
          2
      ) /
      ANALYSIS_HEIGHT;

    return {
      path:
        null,

      useMotif:
        false,

      score:
        winner?.score ??
        0,

      complexity:
        0,

      focusX:
        fallbackFocusX,

      focusY:
        fallbackFocusY,

      macroCropUrl:
        createMacroCrop(
          mask,
          fallbackFocusX,
          fallbackFocusY,
          macroColor
        ),
    };
  }

  const focusX =
    winner.centroidX /
    ANALYSIS_WIDTH;

  const focusY =
    winner.centroidY /
    ANALYSIS_HEIGHT;

  const path =
    createSmoothPath(
      winner.segment.points,
      winner.segment.closed
    );

  return {
    path,

    useMotif:
      Boolean(
        path
      ),

    score:
      winner.score,

    complexity:
      winner.curvature,

    focusX,
    focusY,

    macroCropUrl:
      createMacroCrop(
        mask,
        focusX,
        focusY,
        macroColor
      ),
  };
}

/* ================================================= */
/* HOOK                                              */
/* ================================================= */

export function useLogoDNA({
  logoUrl,
  fallback,
  macroColor =
    "#FFFFFF",
}: UseLogoDNAOptions): LogoDNAData {
  const [
    state,
    setState,
  ] =
    useState<LogoDNAData>({
      ready:
        false,

      hasSourceLogo:
        Boolean(
          logoUrl
        ),

      useMotif:
        false,

      path:
        null,

      score:
        0,

      complexity:
        0,

      focusX:
        0.5,

      focusY:
        0.5,

      macroCropUrl:
        null,
    });

  useEffect(
    () => {
      let cancelled =
        false;

      async function run() {
        const source =
          logoUrl ||
          createFallbackLogo(
            fallback
          );

        try {
          const image =
            await loadImage(
              source
            );

          const result =
            analyseLogo(
              image,
              safeColour(
                macroColor,
                "#FFFFFF"
              )
            );

          if (
            cancelled
          ) {
            return;
          }

          setState({
            ...result,

            ready:
              true,

            hasSourceLogo:
              Boolean(
                logoUrl
              ),
          });
        } catch (
          error
        ) {
          console.warn(
            "Logo DNA analysis failed:",
            error
          );

          if (
            cancelled
          ) {
            return;
          }

          setState({
            ready:
              true,

            hasSourceLogo:
              Boolean(
                logoUrl
              ),

            useMotif:
              false,

            path:
              null,

            score:
              0,

            complexity:
              0,

            focusX:
              0.5,

            focusY:
              0.5,

            macroCropUrl:
              null,
          });
        }
      }

      void run();

      return () => {
        cancelled =
          true;
      };
    },
    [
      logoUrl,
      fallback,
      macroColor,
    ]
  );

  return state;
}

/* ================================================= */
/* MOTIF                                             */
/* ================================================= */

export function LogoDNAMotif({
  dna,

  stroke =
    "#FFFFFF",

  strokeWidth =
    2,

  opacity =
    1,

  className = "",

  flipX =
    false,

  flipY =
    false,
}: LogoDNAMotifProps) {
  if (
    !dna.useMotif ||
    !dna.path
  ) {
    return null;
  }

  const transform = [
    flipX
      ? "scaleX(-1)"
      : "",

    flipY
      ? "scaleY(-1)"
      : "",
  ]
    .filter(
      Boolean
    )
    .join(
      " "
    );

  return (
    <div
      className={`
        relative
        overflow-hidden

        ${className}
      `}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="
          absolute
          inset-0

          h-full
          w-full
        "
        style={{
          opacity,

          transform:
            transform ||
            undefined,
        }}
      >
        <path
          d={
            dna.path
          }
          fill="none"
          stroke={
            stroke
          }
          strokeWidth={
            strokeWidth
          }
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/* ================================================= */
/* MACRO CROP                                        */
/* ================================================= */

export function LogoDNAMacroCrop({
  dna,

  className = "",

  opacity =
    1,
}: LogoDNAMacroCropProps) {
  if (
    !dna.macroCropUrl
  ) {
    return null;
  }

  return (
    <div
      className={`
        relative
        overflow-hidden

        ${className}
      `}
    >
      <img
        src={
          dna.macroCropUrl
        }
        alt=""
        draggable={
          false
        }
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover
        "
        style={{
          opacity,
          filter:
            "none",
        }}
      />
    </div>
  );
}