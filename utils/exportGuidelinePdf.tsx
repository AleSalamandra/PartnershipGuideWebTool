"use client";

import { createRoot } from "react-dom/client";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

import GuidelineDocument, {
  GUIDELINE_PAGES,
} from "@/components/guideline/GuidelineDocument";

import { useGuidelineStore } from "@/store/guidelineStore";

/* ------------------------------------------------ */
/* CONSTANTS                                        */
/* ------------------------------------------------ */

const PAGE_WIDTH = 1600;
const PAGE_HEIGHT = 900;

const EXPORT_SCALE = 1;

/*
  Uploaded logos are rasterised internally at 2×
  so they remain sharp in the PDF.

  Their CSS dimensions stay unchanged.
*/

const LOGO_RASTER_SCALE = 2;

/* ------------------------------------------------ */
/* WAIT HELPERS                                     */
/* ------------------------------------------------ */

function wait(
  milliseconds: number
) {
  return new Promise<void>(
    (resolve) => {
      window.setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}

function waitForFrame() {
  return new Promise<void>(
    (resolve) => {
      requestAnimationFrame(
        () => {
          requestAnimationFrame(
            () => {
              resolve();
            }
          );
        }
      );
    }
  );
}

/* ------------------------------------------------ */
/* IMAGE LOADING                                    */
/* ------------------------------------------------ */

async function waitForSingleImage(
  image: HTMLImageElement
) {
  if (
    image.complete &&
    image.naturalWidth > 0
  ) {
    try {
      await image.decode();
    } catch {
      // Image is already usable.
    }

    return;
  }

  await new Promise<void>(
    (resolve) => {
      const finish =
        async () => {
          image.removeEventListener(
            "load",
            finish
          );

          image.removeEventListener(
            "error",
            finish
          );

          try {
            await image.decode();
          } catch {
            // Continue anyway.
          }

          resolve();
        };

      image.addEventListener(
        "load",
        finish,
        {
          once: true,
        }
      );

      image.addEventListener(
        "error",
        finish,
        {
          once: true,
        }
      );
    }
  );
}

async function waitForImages(
  container: HTMLElement
) {
  const images =
    Array.from(
      container.querySelectorAll(
        "img"
      )
    );

  await Promise.all(
    images.map(
      (image) =>
        waitForSingleImage(
          image
        )
    )
  );
}

/* ------------------------------------------------ */
/* IDENTIFY UPLOADED ASSETS                         */
/* ------------------------------------------------ */

function isUploadedImage(
  image: HTMLImageElement
) {
  const src =
    image.currentSrc ||
    image.src ||
    "";

  /*
    LogoUploader / FileReader generates
    data:image/... URLs.

    blob: is included as a future-safe option.
  */

  return (
    src.startsWith(
      "data:image/"
    ) ||
    src.startsWith(
      "blob:"
    )
  );
}

/* ------------------------------------------------ */
/* OBJECT POSITION                                  */
/* ------------------------------------------------ */

function getPositionFactor(
  value: string,
  axis:
    | "x"
    | "y"
) {
  const normalized =
    value
      .trim()
      .toLowerCase();

  if (
    normalized.includes(
      axis === "x"
        ? "left"
        : "top"
    )
  ) {
    return 0;
  }

  if (
    normalized.includes(
      axis === "x"
        ? "right"
        : "bottom"
    )
  ) {
    return 1;
  }

  const parts =
    normalized.split(
      /\s+/
    );

  const relevant =
    axis === "x"
      ? parts[0]
      : parts[1] ??
        parts[0];

  if (
    relevant?.endsWith(
      "%"
    )
  ) {
    const number =
      parseFloat(
        relevant
      );

    if (
      Number.isFinite(
        number
      )
    ) {
      return Math.min(
        1,
        Math.max(
          0,
          number / 100
        )
      );
    }
  }

  /*
    CSS default:
    object-position: 50% 50%
  */

  return 0.5;
}

/* ------------------------------------------------ */
/* DRAW IMAGE USING CSS OBJECT-FIT                  */
/* ------------------------------------------------ */

function drawImageWithObjectFit(
  context:
    CanvasRenderingContext2D,

  image:
    HTMLImageElement,

  destinationWidth:
    number,

  destinationHeight:
    number,

  objectFit:
    string,

  objectPosition:
    string
) {
  const sourceWidth =
    image.naturalWidth;

  const sourceHeight =
    image.naturalHeight;

  if (
    sourceWidth <= 0 ||
    sourceHeight <= 0
  ) {
    return;
  }

  const xFactor =
    getPositionFactor(
      objectPosition,
      "x"
    );

  const yFactor =
    getPositionFactor(
      objectPosition,
      "y"
    );

  /* ---------------------------------------------- */
  /* FILL                                           */
  /* ---------------------------------------------- */

  if (
    objectFit === "fill"
  ) {
    context.drawImage(
      image,

      0,
      0,

      destinationWidth,
      destinationHeight
    );

    return;
  }

  /* ---------------------------------------------- */
  /* NONE                                           */
  /* ---------------------------------------------- */

  if (
    objectFit === "none"
  ) {
    const x =
      (
        destinationWidth -
        sourceWidth
      ) *
      xFactor;

    const y =
      (
        destinationHeight -
        sourceHeight
      ) *
      yFactor;

    context.drawImage(
      image,
      x,
      y,
      sourceWidth,
      sourceHeight
    );

    return;
  }

  /* ---------------------------------------------- */
  /* CONTAIN / COVER / SCALE-DOWN                    */
  /* ---------------------------------------------- */

  const containScale =
    Math.min(
      destinationWidth /
        sourceWidth,

      destinationHeight /
        sourceHeight
    );

  const coverScale =
    Math.max(
      destinationWidth /
        sourceWidth,

      destinationHeight /
        sourceHeight
    );

  let scale =
    containScale;

  if (
    objectFit === "cover"
  ) {
    scale =
      coverScale;
  }

  if (
    objectFit ===
    "scale-down"
  ) {
    scale =
      Math.min(
        1,
        containScale
      );
  }

  const renderWidth =
    sourceWidth *
    scale;

  const renderHeight =
    sourceHeight *
    scale;

  const x =
    (
      destinationWidth -
      renderWidth
    ) *
    xFactor;

  const y =
    (
      destinationHeight -
      renderHeight
    ) *
    yFactor;

  context.drawImage(
    image,

    x,
    y,

    renderWidth,
    renderHeight
  );
}

/* ------------------------------------------------ */
/* RASTERISE ONE UPLOADED LOGO                      */
/* ------------------------------------------------ */

async function rasterizeUploadedImage(
  image: HTMLImageElement
) {
  await waitForSingleImage(
    image
  );

  /*
    offsetWidth / offsetHeight are intentional.

    Unlike getBoundingClientRect(), these values
    do NOT include transform: scale(...).

    This means Page13 can keep its 1.08 / 1.10
    optical logo scaling without us applying
    that scale twice.
  */

  const width =
    image.offsetWidth;

  const height =
    image.offsetHeight;

  if (
    width <= 0 ||
    height <= 0
  ) {
    return;
  }

  if (
    image.naturalWidth <=
      0 ||
    image.naturalHeight <=
      0
  ) {
    return;
  }

  const computed =
    window.getComputedStyle(
      image
    );

  const objectFit =
    computed.objectFit ||
    "fill";

  const objectPosition =
    computed.objectPosition ||
    "50% 50%";

  /* ---------------------------------------------- */
  /* CREATE HIGH RES PNG                            */
  /* ---------------------------------------------- */

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    Math.max(
      1,
      Math.round(
        width *
          LOGO_RASTER_SCALE
      )
    );

  canvas.height =
    Math.max(
      1,
      Math.round(
        height *
          LOGO_RASTER_SCALE
      )
    );

  const context =
    canvas.getContext(
      "2d"
    );

  if (!context) {
    return;
  }

  context.imageSmoothingEnabled =
    true;

  context.imageSmoothingQuality =
    "high";

  context.scale(
    LOGO_RASTER_SCALE,
    LOGO_RASTER_SCALE
  );

  context.clearRect(
    0,
    0,
    width,
    height
  );

  drawImageWithObjectFit(
    context,

    image,

    width,
    height,

    objectFit,
    objectPosition
  );

  const rasterUrl =
    canvas.toDataURL(
      "image/png"
    );

  /* ---------------------------------------------- */
  /* FREEZE THE EXACT BROWSER SIZE                  */
  /* ---------------------------------------------- */

  /*
    This is the important part.

    Once converted to PNG, html2canvas no longer
    gets a chance to reinterpret the SVG viewport
    or intrinsic dimensions.
  */

  image.style.width =
    `${width}px`;

  image.style.height =
    `${height}px`;

  image.style.minWidth =
    `${width}px`;

  image.style.minHeight =
    `${height}px`;

  image.style.maxWidth =
    "none";

  image.style.maxHeight =
    "none";

  /*
    The content is ALREADY fitted into the PNG.

    We therefore make the replacement image fill
    its frozen box exactly.
  */

  image.style.objectFit =
    "fill";

  image.style.objectPosition =
    "50% 50%";

  /*
    Avoid srcset overriding our raster source.
  */

  image.removeAttribute(
    "srcset"
  );

  image.removeAttribute(
    "sizes"
  );

  image.src =
    rasterUrl;

  /*
    Keep CSS transform untouched.

    This preserves any intentional Page13 scale()
    or other optical adjustment.
  */

  try {
    await image.decode();
  } catch {
    // Continue.
  }

  canvas.width = 1;
  canvas.height = 1;
}

/* ------------------------------------------------ */
/* STABILISE ALL UPLOADED LOGOS                     */
/* ------------------------------------------------ */

async function stabilizeUploadedImages(
  container: HTMLElement
) {
  const images =
    Array.from(
      container.querySelectorAll(
        "img"
      )
    );

  const uploadedImages =
    images.filter(
      isUploadedImage
    );

  await Promise.all(
    uploadedImages.map(
      (image) =>
        rasterizeUploadedImage(
          image
        )
    )
  );
}

/* ------------------------------------------------ */
/* WAIT FOR COMPLETE PAGE                           */
/* ------------------------------------------------ */

async function waitForPage(
  container: HTMLElement
) {
  /* React commit */

  await waitForFrame();

  /*
    Pages with random image selection,
    extension fallback, etc.
  */

  await wait(120);

  /* Fonts */

  try {
    await document.fonts.ready;
  } catch {
    // Continue.
  }

  /* Original images */

  await waitForImages(
    container
  );

  /*
    IMPORTANT:

    Convert user-uploaded logos into exact-size
    raster images BEFORE html2canvas sees them.
  */

  await stabilizeUploadedImages(
    container
  );

  /* Raster replacements */

  await waitForImages(
    container
  );

  /* Final browser paint */

  await waitForFrame();

  await wait(80);
}

/* ------------------------------------------------ */
/* FILE NAME                                        */
/* ------------------------------------------------ */

function sanitizeFileName(
  value: string
) {
  return value
    .trim()
    .replace(
      /[^a-zA-Z0-9-_]+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

function buildFileName() {
  const {
    brandA,
    brandB,
  } =
    useGuidelineStore.getState();

  const brandAName =
    sanitizeFileName(
      brandA.name ||
        "Brand-A"
    );

  const brandBName =
    sanitizeFileName(
      brandB.name ||
        "Brand-B"
    );

  return `Partnership-Guide-${brandAName}-${brandBName}.pdf`;
}

/* ------------------------------------------------ */
/* EXPORT HOST                                      */
/* ------------------------------------------------ */

function createExportHost() {
  const host =
    document.createElement(
      "div"
    );

  host.setAttribute(
    "data-guideline-export-host",
    "true"
  );

  Object.assign(
    host.style,
    {
      position:
        "fixed",

      left:
        "-10000px",

      top:
        "0px",

      width:
        `${PAGE_WIDTH}px`,

      height:
        `${PAGE_HEIGHT}px`,

      minWidth:
        `${PAGE_WIDTH}px`,

      minHeight:
        `${PAGE_HEIGHT}px`,

      margin:
        "0",

      padding:
        "0",

      overflow:
        "hidden",

      pointerEvents:
        "none",

      backgroundColor:
        "#000000",

      boxSizing:
        "border-box",
    }
  );

  document.body.appendChild(
    host
  );

  return host;
}

/* ------------------------------------------------ */
/* PREPARE HTML2CANVAS CLONE                        */
/* ------------------------------------------------ */

function prepareCloneForExport(
  clonedDocument: Document
) {
  const page =
    clonedDocument.querySelector(
      '[data-guideline-export-page="true"]'
    ) as HTMLElement | null;

  if (!page) {
    return;
  }

  /* ---------------------------------------------- */
  /* EXACT PAGE SIZE                                */
  /* ---------------------------------------------- */

  Object.assign(
    page.style,
    {
      width:
        `${PAGE_WIDTH}px`,

      height:
        `${PAGE_HEIGHT}px`,

      minWidth:
        `${PAGE_WIDTH}px`,

      minHeight:
        `${PAGE_HEIGHT}px`,

      maxWidth:
        `${PAGE_WIDTH}px`,

      maxHeight:
        `${PAGE_HEIGHT}px`,

      margin:
        "0",

      padding:
        "0",

      transform:
        "none",

      transformOrigin:
        "top left",

      overflow:
        "hidden",

      backgroundColor:
        "#000000",

      boxSizing:
        "border-box",
    }
  );

  /* ---------------------------------------------- */
  /* REMOVE SHADOW ARTEFACTS                        */
  /* ---------------------------------------------- */

  /*
    Keep the fix that already solved the
    giant border / halo problem.

    Only the export clone is modified.
  */

  const elements =
    page.querySelectorAll(
      "*"
    );

  elements.forEach(
    (node) => {
      if (
        !(
          node instanceof
          HTMLElement
        )
      ) {
        return;
      }

      node.style.boxShadow =
        "none";
    }
  );
}

/* ------------------------------------------------ */
/* EXPORT                                           */
/* ------------------------------------------------ */

export async function exportGuidelinePdf() {
  const pageCount =
    GUIDELINE_PAGES.length;

  if (
    pageCount === 0
  ) {
    throw new Error(
      "No guideline pages found."
    );
  }

  const exportHost =
    createExportHost();

  const root =
    createRoot(
      exportHost
    );

  let pdf:
    jsPDF | null =
    null;

  try {
    /* ============================================ */
    /* PAGE LOOP                                    */
    /* ============================================ */

    for (
      let pageIndex = 0;
      pageIndex <
      pageCount;
      pageIndex += 1
    ) {
      /* ------------------------------------------ */
      /* RENDER                                     */
      /* ------------------------------------------ */

      root.render(
        <div
          data-guideline-export-page="true"

          style={{
            position:
              "relative",

            display:
              "block",

            width:
              `${PAGE_WIDTH}px`,

            height:
              `${PAGE_HEIGHT}px`,

            minWidth:
              `${PAGE_WIDTH}px`,

            minHeight:
              `${PAGE_HEIGHT}px`,

            margin:
              "0",

            padding:
              "0",

            overflow:
              "hidden",

            boxSizing:
              "border-box",

            backgroundColor:
              "#000000",
          }}
        >
          <GuidelineDocument
            currentPage={
              pageIndex
            }
          />
        </div>
      );

      /* ------------------------------------------ */
      /* WAIT + STABILISE LOGOS                     */
      /* ------------------------------------------ */

      await waitForPage(
        exportHost
      );

      const pageNode =
        exportHost.querySelector(
          '[data-guideline-export-page="true"]'
        ) as HTMLElement | null;

      if (
        !pageNode
      ) {
        throw new Error(
          `Unable to render guideline page ${
            pageIndex + 1
          }.`
        );
      }

      /* ------------------------------------------ */
      /* HTML → CANVAS                              */
      /* ------------------------------------------ */

      const canvas =
        await html2canvas(
          pageNode,
          {
            width:
              PAGE_WIDTH,

            height:
              PAGE_HEIGHT,

            scale:
              EXPORT_SCALE,

            windowWidth:
              PAGE_WIDTH,

            windowHeight:
              PAGE_HEIGHT,

            foreignObjectRendering:
              false,

            useCORS:
              true,

            allowTaint:
              false,

            imageTimeout:
              20000,

            backgroundColor:
              "#000000",

            scrollX: 0,
            scrollY: 0,

            logging:
              false,

            removeContainer:
              true,

            onclone: (
              clonedDocument
            ) => {
              prepareCloneForExport(
                clonedDocument
              );
            },
          }
        );

      /* ------------------------------------------ */
      /* CANVAS → PNG                               */
      /* ------------------------------------------ */

      const imageData =
        canvas.toDataURL(
          "image/png"
        );

      /* ------------------------------------------ */
      /* PDF                                        */
      /* ------------------------------------------ */

      if (
        pageIndex === 0
      ) {
        pdf =
          new jsPDF({
            orientation:
              "landscape",

            unit:
              "px",

            format: [
              PAGE_WIDTH,
              PAGE_HEIGHT,
            ],

            compress:
              true,

            hotfixes: [
              "px_scaling",
            ],
          });
      } else {
        pdf?.addPage(
          [
            PAGE_WIDTH,
            PAGE_HEIGHT,
          ],
          "landscape"
        );
      }

      if (!pdf) {
        throw new Error(
          "Unable to create PDF."
        );
      }

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      pdf.addImage(
        imageData,

        "PNG",

        0,
        0,

        pdfWidth,
        pdfHeight,

        undefined,

        "FAST"
      );

      /* ------------------------------------------ */
      /* MEMORY                                     */
      /* ------------------------------------------ */

      canvas.width = 1;
      canvas.height = 1;

      await wait(20);
    }

    /* ============================================ */
    /* SAVE                                         */
    /* ============================================ */

    if (!pdf) {
      throw new Error(
        "PDF generation failed."
      );
    }

    pdf.save(
      buildFileName()
    );
  } finally {
    root.unmount();

    exportHost.remove();
  }
}