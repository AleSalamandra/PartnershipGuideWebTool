"use client";

import {
  createRoot,
} from "react-dom/client";

import html2canvas from "html2canvas-pro";

import {
  jsPDF,
} from "jspdf";

import GuidelineDocument, {
  GUIDELINE_PAGES,
} from "@/components/guideline/GuidelineDocument";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const PAGE_WIDTH =
  1600;

const PAGE_HEIGHT =
  900;

const EXPORT_SCALE =
  1;

const LOGO_RASTER_SCALE =
  2;


/* ================================================= */
/* WAIT                                              */
/* ================================================= */

function wait(
  milliseconds:
    number
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


/* ================================================= */
/* IMAGES                                            */
/* ================================================= */

async function waitForSingleImage(
  image:
    HTMLImageElement
) {
  if (
    image.complete &&
    image.naturalWidth > 0
  ) {
    try {
      await image.decode();
    } catch {
      // Already usable.
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
  container:
    HTMLElement
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


/* ================================================= */
/* UPLOADED LOGOS                                    */
/* ================================================= */

function isUploadedImage(
  image:
    HTMLImageElement
) {
  const source =
    image.currentSrc ||
    image.src ||
    "";

  return (
    source.startsWith(
      "data:image/"
    ) ||
    source.startsWith(
      "blob:"
    )
  );
}


/* ================================================= */
/* OBJECT POSITION                                   */
/* ================================================= */

function getPositionFactor(
  value:
    string,

  axis:
    "x" | "y"
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

  return 0.5;
}


/* ================================================= */
/* OBJECT FIT                                        */
/* ================================================= */

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

  /* ------------------------------------------------ */
  /* FILL                                             */
  /* ------------------------------------------------ */

  if (
    objectFit ===
    "fill"
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

  /* ------------------------------------------------ */
  /* NONE                                             */
  /* ------------------------------------------------ */

  if (
    objectFit ===
    "none"
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

  /* ------------------------------------------------ */
  /* CONTAIN / COVER / SCALE DOWN                     */
  /* ------------------------------------------------ */

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
    objectFit ===
    "cover"
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


/* ================================================= */
/* RASTERISE UPLOADED LOGO                           */
/* ================================================= */

async function rasterizeUploadedImage(
  image:
    HTMLImageElement
) {
  await waitForSingleImage(
    image
  );

  /*
    offsetWidth / offsetHeight intentionally
    ignore transform: scale().

    That prevents Page13 etc. from applying
    visual transforms twice during export.
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
    image.naturalWidth <= 0 ||
    image.naturalHeight <= 0
  ) {
    return;
  }

  const computed =
    window.getComputedStyle(
      image
    );

  const objectFit =
    computed.objectFit ||
    "contain";

  const objectPosition =
    computed.objectPosition ||
    "50% 50%";

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

  /* ------------------------------------------------ */
  /* FREEZE SIZE                                      */
  /* ------------------------------------------------ */

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
    The raster already contains the fitted image.
  */

  image.style.objectFit =
    "fill";

  image.style.objectPosition =
    "50% 50%";

  /*
    NO exporter-added shadow.

    If Page05 / 06 / 07 wants a shadow,
    it belongs to the wrapper around the logo.
  */

  image.style.filter =
    "none";

  image.removeAttribute(
    "srcset"
  );

  image.removeAttribute(
    "sizes"
  );

  image.src =
    rasterUrl;

  try {
    await image.decode();
  } catch {
    // Continue.
  }

  canvas.width =
    1;

  canvas.height =
    1;
}


/* ================================================= */
/* STABILISE UPLOADED LOGOS                          */
/* ================================================= */

async function stabilizeUploadedImages(
  container:
    HTMLElement
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

  for (
    const image of
    uploadedImages
  ) {
    await rasterizeUploadedImage(
      image
    );
  }
}


/* ================================================= */
/* PAGE READY                                        */
/* ================================================= */

async function waitForPage(
  container:
    HTMLElement
) {
  /*
    React commit.
  */

  await waitForFrame();

  /*
    Page05–07 may update random image state
    immediately after mount.
  */

  await wait(
    150
  );

  /*
    Fonts.
  */

  try {
    await document.fonts.ready;
  } catch {
    // Continue.
  }

  /*
    Images.
  */

  await waitForImages(
    container
  );

  /*
    Uploaded logos are converted to exact-size
    transparent PNGs before html2canvas sees them.
  */

  await stabilizeUploadedImages(
    container
  );

  await waitForImages(
    container
  );

  await waitForFrame();

  await wait(
    80
  );
}


/* ================================================= */
/* FREEZE COMPUTED COLOURS                           */
/* ================================================= */

/*
  Chrome already displays the correct colours.

  html2canvas should not have to reinterpret
  Tailwind Light Mode classes a second time.

  We therefore copy the final browser-computed
  colours from the live export DOM into the clone.
*/

function freezeComputedColours(
  sourcePage:
    HTMLElement,

  clonedPage:
    HTMLElement
) {
  const sourceElements:
    Element[] = [
    sourcePage,
    ...Array.from(
      sourcePage.querySelectorAll(
        "*"
      )
    ),
  ];

  const clonedElements:
    Element[] = [
    clonedPage,
    ...Array.from(
      clonedPage.querySelectorAll(
        "*"
      )
    ),
  ];

  const count =
    Math.min(
      sourceElements.length,
      clonedElements.length
    );

  for (
    let index =
      0;

    index <
    count;

    index +=
      1
  ) {
    const source =
      sourceElements[
        index
      ];

    const clone =
      clonedElements[
        index
      ];

    const computed =
      window.getComputedStyle(
        source
      );

    /* ------------------------------------------------ */
    /* HTML                                             */
    /* ------------------------------------------------ */

    if (
      clone instanceof
      HTMLElement
    ) {
      clone.style.setProperty(
        "color",
        computed.color,
        "important"
      );

      clone.style.setProperty(
        "background-color",
        computed.backgroundColor,
        "important"
      );

      clone.style.setProperty(
        "border-top-color",
        computed.borderTopColor,
        "important"
      );

      clone.style.setProperty(
        "border-right-color",
        computed.borderRightColor,
        "important"
      );

      clone.style.setProperty(
        "border-bottom-color",
        computed.borderBottomColor,
        "important"
      );

      clone.style.setProperty(
        "border-left-color",
        computed.borderLeftColor,
        "important"
      );

      clone.style.setProperty(
        "outline-color",
        computed.outlineColor,
        "important"
      );

      clone.style.setProperty(
        "text-decoration-color",
        computed.textDecorationColor,
        "important"
      );
    }

    /* ------------------------------------------------ */
    /* SVG                                              */
    /* ------------------------------------------------ */

    if (
      clone instanceof
      SVGElement
    ) {
      clone.style.setProperty(
        "color",
        computed.color,
        "important"
      );

      clone.style.setProperty(
        "fill",
        computed.fill,
        "important"
      );

      clone.style.setProperty(
        "stroke",
        computed.stroke,
        "important"
      );
    }
  }
}


/* ================================================= */
/* PROTECT LOGOS IN CLONE                            */
/* ================================================= */

function protectLogosInClone(
  clonedPage:
    HTMLElement
) {
  const images =
    clonedPage.querySelectorAll(
      "img"
    );

  images.forEach(
    (image) => {
      const src =
        image.getAttribute(
          "src"
        ) ||
        "";

      /*
        Uploaded assets are already rasterised
        by the time html2canvas clones the page.

        Do not add a filter to them.
      */

      if (
        src.startsWith(
          "data:image/"
        ) ||
        src.startsWith(
          "blob:"
        )
      ) {
        image.style.setProperty(
          "filter",
          "none",
          "important"
        );
      }
    }
  );
}


/* ================================================= */
/* PREPARE CLONE                                     */
/* ================================================= */

function prepareCloneForExport(
  sourcePage:
    HTMLElement,

  clonedDocument:
    Document
) {
  const clonedPage =
    clonedDocument.querySelector(
      '[data-guideline-export-page="true"]'
    ) as HTMLElement | null;

  if (!clonedPage) {
    return;
  }

  /* ------------------------------------------------ */
  /* EXACT PAGE                                       */
  /* ------------------------------------------------ */

  Object.assign(
    clonedPage.style,
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

      boxSizing:
        "border-box",
    }
  );

  /* ------------------------------------------------ */
  /* FINAL BROWSER COLOURS                            */
  /* ------------------------------------------------ */

  freezeComputedColours(
    sourcePage,
    clonedPage
  );

  /* ------------------------------------------------ */
  /* LOGOS                                            */
  /* ------------------------------------------------ */

  protectLogosInClone(
    clonedPage
  );

  /* ------------------------------------------------ */
  /* STATIC EXPORT                                    */
  /* ------------------------------------------------ */

  const elements =
    clonedPage.querySelectorAll(
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

      node.style.animation =
        "none";

      node.style.transition =
        "none";

      node.style.caretColor =
        "transparent";
    }
  );
}


/* ================================================= */
/* FILE NAME                                         */
/* ================================================= */

function sanitizeFileName(
  value:
    string
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


/* ================================================= */
/* EXPORT HOST                                       */
/* ================================================= */

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
        "transparent",

      boxSizing:
        "border-box",
    }
  );

  document.body.appendChild(
    host
  );

  return host;
}


/* ================================================= */
/* EXPORT                                            */
/* ================================================= */

export async function exportGuidelinePdf() {
  const pageCount =
    GUIDELINE_PAGES.length;

  if (
    pageCount ===
    0
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
      let pageIndex =
        0;

      pageIndex <
      pageCount;

      pageIndex +=
        1
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
              "transparent",
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
      /* WAIT                                       */
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
            pageIndex +
            1
          }.`
        );
      }

      /* ------------------------------------------ */
      /* HTML → CANVAS                              */
      /* ------------------------------------------ */

      let canvas:
        HTMLCanvasElement;

      try {
        canvas =
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

              /*
                MUST remain false.

                true produced completely blank
                pages in this project.
              */

              foreignObjectRendering:
                false,

              useCORS:
                true,

              allowTaint:
                false,

              imageTimeout:
                20000,

              backgroundColor:
                null,

              scrollX:
                0,

              scrollY:
                0,

              logging:
                false,

              removeContainer:
                true,

              onclone: (
                clonedDocument
              ) => {
                prepareCloneForExport(
                  pageNode,
                  clonedDocument
                );
              },
            }
          );
      } catch (
        error
      ) {
        console.error(
          `html2canvas failed on page ${
            pageIndex +
            1
          }:`,
          error
        );

        const message =
          error instanceof
          Error
            ? error.message
            : String(
                error
              );

        throw new Error(
          `PDF export failed on page ${
            pageIndex +
            1
          }: ${message}`
        );
      }

      /* ------------------------------------------ */
      /* CANVAS VALIDATION                          */
      /* ------------------------------------------ */

      if (
        canvas.width <= 1 ||
        canvas.height <= 1
      ) {
        throw new Error(
          `PDF export generated an invalid canvas on page ${
            pageIndex +
            1
          }.`
        );
      }

      /* ------------------------------------------ */
      /* CANVAS → PNG                               */
      /* ------------------------------------------ */

      const imageData =
        canvas.toDataURL(
          "image/png"
        );

      /* ------------------------------------------ */
      /* CREATE PDF                                 */
      /* ------------------------------------------ */

      if (
        pageIndex ===
        0
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
          "Unable to initialise PDF."
        );
      }

      const pdfWidth =
        pdf.internal
          .pageSize
          .getWidth();

      const pdfHeight =
        pdf.internal
          .pageSize
          .getHeight();

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

      canvas.width =
        1;

      canvas.height =
        1;

      await wait(
        20
      );
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
  } catch (
    error
  ) {
    console.error(
      "GUIDELINE PDF EXPORT ERROR:",
      error
    );

    throw error;
  } finally {
    root.unmount();

    exportHost.remove();
  }
}