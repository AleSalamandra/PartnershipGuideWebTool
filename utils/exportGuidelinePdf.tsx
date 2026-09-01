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

/*
  The guideline is already designed
  natively at 1600 × 900.

  Scale 1 gives us the most faithful
  interpretation of borders and radii.
*/

const EXPORT_SCALE = 1;

/* ------------------------------------------------ */
/* WAIT                                             */
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
/* IMAGES                                           */
/* ------------------------------------------------ */

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
      async (image) => {
        /*
          If it has loaded, still wait
          for decode where possible.
        */

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
                  // Continue.
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
    )
  );
}

/* ------------------------------------------------ */
/* PAGE READY                                       */
/* ------------------------------------------------ */

async function waitForPage(
  container: HTMLElement
) {
  /*
    React commit.
  */

  await waitForFrame();

  /*
    Pages 05–13 have various effects,
    image fallbacks and state changes.
  */

  await wait(120);

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
    Final browser paint.
  */

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

  /*
    Keep it rendered normally.

    It must NOT use:
    display:none
    visibility:hidden
    opacity:0

    Otherwise screenshot libraries
    may capture an empty element.
  */

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
/* CLEAN EXPORT CLONE                               */
/* ------------------------------------------------ */

function prepareCloneForExport(
  clonedDocument: Document
) {
  const page =
    clonedDocument.querySelector(
      '[data-guideline-export-page="true"]'
    ) as HTMLElement | null;

  if (!page) return;

  /* ---------------------------------------------- */
  /* FORCE EXACT PAGE SIZE                          */
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
  /* FIX HTML2CANVAS SHADOW ARTIFACTS               */
  /* ---------------------------------------------- */

  /*
    html2canvas may turn subtle card /
    frame shadows into large grey halos.

    We remove ONLY box-shadow in the
    export clone.

    This does not modify the viewer.
  */

  const elements =
    page.querySelectorAll(
      "*"
    );

  elements.forEach(
    (node) => {
      if (
        !(node instanceof HTMLElement)
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
    jsPDF | null = null;

  try {
    /* ============================================ */
    /* EXPORT EVERY PAGE                            */
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
      /* WAIT                                       */
      /* ------------------------------------------ */

      await waitForPage(
        exportHost
      );

      const pageNode =
        exportHost.querySelector(
          '[data-guideline-export-page="true"]'
        ) as HTMLElement | null;

      if (!pageNode) {
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

            /*
              IMPORTANT:
              Do NOT enable this.

              It was responsible for
              the blank pages.
            */

            foreignObjectRendering:
              false,

            /*
              Keep DOM transforms rather
              than normalising the design.
            */

            normalizeDom:
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

            /*
              Modify ONLY the cloned DOM,
              never the real guideline.
            */

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
      /* CREATE PDF                                 */
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

      /* ------------------------------------------ */
      /* ADD CAPTURE                                */
      /* ------------------------------------------ */

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
      /* RELEASE MEMORY                             */
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