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
  IMPORTANT:

  The guideline itself is designed at
  exactly 1600 × 900.

  We therefore capture at scale 1.

  This avoids html2canvas re-scaling
  shadows, blur radii and clipping masks.
*/

const EXPORT_SCALE = 1;

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
/* WAIT FOR IMAGES                                  */
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
      (image) => {
        /*
          Already loaded.
        */

        if (
          image.complete &&
          image.naturalWidth >
            0
        ) {
          return Promise.resolve();
        }

        return new Promise<void>(
          (resolve) => {
            const finish =
              () => {
                image.removeEventListener(
                  "load",
                  finish
                );

                image.removeEventListener(
                  "error",
                  finish
                );

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
/* WAIT FOR PAGE                                    */
/* ------------------------------------------------ */

async function waitForPage(
  container: HTMLElement
) {
  /*
    Let React commit.
  */

  await waitForFrame();

  /*
    Pages such as 05 / 06 / 07
    use state/effects for image sources.
  */

  await wait(140);

  /*
    Wait for Oook, uploaded fonts,
    Typekit, etc.
  */

  try {
    await document.fonts.ready;
  } catch {
    // Continue even if one font fails.
  }

  /*
    Wait for actual image decoding.
  */

  await waitForImages(
    container
  );

  /*
    Give the browser one final layout
    and compositing pass.
  */

  await waitForFrame();

  await wait(100);
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
/* CREATE EXPORT HOST                               */
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
    IMPORTANT:

    Do NOT use opacity: 0.
    Do NOT use display: none.
    Do NOT use transform: scale(...).
    Do NOT use negative z-index.

    The page must be rendered normally
    by Chrome. We simply place it far
    outside the visible viewport.
  */

  Object.assign(
    host.style,
    {
      position:
        "fixed",

      left:
        "-100000px",

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

      maxWidth:
        `${PAGE_WIDTH}px`,

      maxHeight:
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

  /* ============================================== */
  /* CREATE REAL 1600 × 900 RENDER TARGET            */
  /* ============================================== */

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
    /* PAGE LOOP                                    */
    /* ============================================ */

    for (
      let pageIndex = 0;
      pageIndex <
      pageCount;
      pageIndex += 1
    ) {
      /* ------------------------------------------ */
      /* RENDER PAGE                                */
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

            maxWidth:
              `${PAGE_WIDTH}px`,

            maxHeight:
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

            transform:
              "none",

            transformOrigin:
              "top left",
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
      /* WAIT FOR FULL BROWSER RENDER               */
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
          `Unable to find export page ${pageIndex + 1}.`
        );
      }

      /* ------------------------------------------ */
      /* DOM → CANVAS                               */
      /* ------------------------------------------ */

      const canvas =
        await html2canvas(
          pageNode,
          {
            /*
              Exact guideline dimensions.
            */

            width:
              PAGE_WIDTH,

            height:
              PAGE_HEIGHT,

            scale:
              EXPORT_SCALE,

            /*
              Very important.

              Instead of html2canvas
              repainting our entire UI
              manually, Chrome renders
              the cloned DOM through an
              SVG ForeignObject.

              This gives us much closer
              results to the actual viewer.
            */

            foreignObjectRendering:
              true,

            /*
              Assets.
            */

            useCORS:
              true,

            allowTaint:
              false,

            imageTimeout:
              20000,

            /*
              Capture environment.
            */

            windowWidth:
              PAGE_WIDTH,

            windowHeight:
              PAGE_HEIGHT,

            scrollX: 0,
            scrollY: 0,

            x: 0,
            y: 0,

            backgroundColor:
              "#000000",

            logging:
              false,

            removeContainer:
              true,

            /* ------------------------------------ */
            /* NORMALISE EXPORT CLONE               */
            /* ------------------------------------ */

            onclone: (
              clonedDocument
            ) => {
              const clonedPage =
                clonedDocument.querySelector(
                  '[data-guideline-export-page="true"]'
                ) as HTMLElement | null;

              if (
                !clonedPage
              ) {
                return;
              }

              /*
                Make absolutely sure
                the viewer zoom never
                leaks into export.
              */

              clonedPage.style.width =
                `${PAGE_WIDTH}px`;

              clonedPage.style.height =
                `${PAGE_HEIGHT}px`;

              clonedPage.style.minWidth =
                `${PAGE_WIDTH}px`;

              clonedPage.style.minHeight =
                `${PAGE_HEIGHT}px`;

              clonedPage.style.maxWidth =
                `${PAGE_WIDTH}px`;

              clonedPage.style.maxHeight =
                `${PAGE_HEIGHT}px`;

              clonedPage.style.margin =
                "0";

              clonedPage.style.padding =
                "0";

              clonedPage.style.transform =
                "none";

              clonedPage.style.transformOrigin =
                "top left";

              clonedPage.style.overflow =
                "hidden";

              clonedPage.style.backgroundColor =
                "#000000";

              clonedPage.style.boxSizing =
                "border-box";
            },
          }
        );

      /* ------------------------------------------ */
      /* CANVAS → PNG                               */
      /* ------------------------------------------ */

      /*
        PNG is intentional.

        JPEG introduces visible halos
        around dark gradients, thin
        borders, transparent glass,
        small white type and shadows.
      */

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

      /* ------------------------------------------ */
      /* PDF SIZE                                   */
      /* ------------------------------------------ */

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      /* ------------------------------------------ */
      /* ADD PAGE                                   */
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

      /*
        Small gap between pages helps
        Chrome release compositing data
        before rendering the next one.
      */

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
    /* ============================================ */
    /* CLEANUP                                      */
    /* ============================================ */

    root.unmount();

    exportHost.remove();
  }
}