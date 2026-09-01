"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import GuidelineDocument, {
  GUIDELINE_PAGES,
} from "@/components/guideline/GuidelineDocument";

import ThumbnailBar from "@/components/viewer/ThumbnailBar";

import { useGuidelineStore } from "@/store/guidelineStore";

/* ------------------------------------------------ */
/* CONSTANTS                                        */
/* ------------------------------------------------ */

const PAGE_WIDTH = 1600;
const PAGE_HEIGHT = 900;

const MIN_SCALE = 0.25;
const MAX_SCALE = 1.5;
const ZOOM_STEP = 0.1;

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

function roundScale(
  value: number
) {
  return (
    Math.round(
      value * 100
    ) / 100
  );
}

/* ------------------------------------------------ */
/* VIEWER                                           */
/* ------------------------------------------------ */

export default function DocumentViewer() {
  const wrapperRef =
    useRef<HTMLDivElement>(
      null
    );

  /* ---------------------------------------------- */
  /* SCALE                                          */
  /* ---------------------------------------------- */

  const [
    fitScale,
    setFitScale,
  ] = useState(0.5);

  const [
    scale,
    setScale,
  ] = useState(0.5);

  const [
    fitMode,
    setFitMode,
  ] = useState(true);

  /* ---------------------------------------------- */
  /* PAGE                                           */
  /* ---------------------------------------------- */

  const [
    currentPage,
    setCurrentPage,
  ] = useState(0);

  /* ---------------------------------------------- */
  /* PARTNERSHIP                                    */
  /* ---------------------------------------------- */

  const partnershipModel =
    useGuidelineStore(
      (state) =>
        state.partnershipModel
    );

  /* ---------------------------------------------- */
  /* PAGES                                          */
  /* ---------------------------------------------- */

  const pages =
    GUIDELINE_PAGES.map(
      ({
        id,
        number,
        title,
      }) => ({
        id,
        number,
        title,
      })
    );

  /* ---------------------------------------------- */
  /* RESET PAGE ON MODEL CHANGE                     */
  /* ---------------------------------------------- */

  useEffect(() => {
    setCurrentPage(0);
  }, [partnershipModel]);

  /* ---------------------------------------------- */
  /* CALCULATE FIT SCALE                            */
  /* ---------------------------------------------- */

  useEffect(() => {
    const updateScale = () => {
      const wrapper =
        wrapperRef.current;

      if (!wrapper) return;

      const availableWidth =
        wrapper.clientWidth -
        120;

      const availableHeight =
        wrapper.clientHeight -
        170;

      const widthScale =
        availableWidth /
        PAGE_WIDTH;

      const heightScale =
        availableHeight /
        PAGE_HEIGHT;

      const nextFitScale =
        Math.min(
          widthScale,
          heightScale,
          1
        );

      const safeFitScale =
        Math.max(
          MIN_SCALE,
          nextFitScale
        );

      setFitScale(
        safeFitScale
      );

      if (
        fitMode
      ) {
        setScale(
          safeFitScale
        );
      }
    };

    updateScale();

    const observer =
      new ResizeObserver(
        updateScale
      );

    if (
      wrapperRef.current
    ) {
      observer.observe(
        wrapperRef.current
      );
    }

    return () => {
      observer.disconnect();
    };
  }, [fitMode]);

  /* ---------------------------------------------- */
  /* ZOOM                                           */
  /* ---------------------------------------------- */

  const zoomIn = () => {
    setFitMode(false);

    setScale(
      (current) =>
        Math.min(
          MAX_SCALE,

          roundScale(
            current +
              ZOOM_STEP
          )
        )
    );
  };

  const zoomOut = () => {
    setFitMode(false);

    setScale(
      (current) =>
        Math.max(
          MIN_SCALE,

          roundScale(
            current -
              ZOOM_STEP
          )
        )
    );
  };

  const resetToFit = () => {
    setFitMode(true);
    setScale(
      fitScale
    );
  };

  /* ---------------------------------------------- */
  /* DISPLAY SIZE                                   */
  /* ---------------------------------------------- */

  const scaledWidth =
    PAGE_WIDTH *
    scale;

  const scaledHeight =
    PAGE_HEIGHT *
    scale;

  /* ---------------------------------------------- */
  /* RENDER                                         */
  /* ---------------------------------------------- */

  return (
    <section
      ref={wrapperRef}
      className="
        flex
        min-w-0
        flex-1
        flex-col

        bg-[#0d0d0e]
      "
    >
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          flex
          h-[72px]
          shrink-0

          items-center
          justify-between

          border-b
          border-white/[0.07]

          px-[28px]
        "
      >
        {/* DOCUMENT INFO */}

        <div>
          <p
            className="
              text-[15px]

              text-white

              oook-medium
            "
          >
            Partnership Guide
          </p>

          <p
            className="
              mt-[2px]

              text-[13px]

              text-white/35
            "
          >
            {
              pages[
                currentPage
              ]?.title
            }
          </p>
        </div>

        {/* ====================================== */}
        {/* ZOOM CONTROLS                          */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center

            gap-[7px]
          "
        >
          {/* MINUS */}

          <button
            type="button"

            onClick={
              zoomOut
            }

            disabled={
              scale <=
              MIN_SCALE
            }

            aria-label="Zoom out"

            className="
              flex

              h-[32px]
              w-[32px]

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.07]

              bg-white/[0.025]

              text-[17px]
              leading-none

              text-white/45

              transition-all

              hover:border-white/14
              hover:bg-white/[0.05]
              hover:text-white/80

              disabled:pointer-events-none
              disabled:opacity-20
            "
          >
            −
          </button>

          {/* SCALE */}

          <div
            className="
              flex
              h-[32px]
              min-w-[60px]

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.07]

              bg-white/[0.035]

              px-[10px]

              text-[11px]

              text-white/48
            "
          >
            {Math.round(
              scale * 100
            )}
            %
          </div>

          {/* PLUS */}

          <button
            type="button"

            onClick={
              zoomIn
            }

            disabled={
              scale >=
              MAX_SCALE
            }

            aria-label="Zoom in"

            className="
              flex

              h-[32px]
              w-[32px]

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.07]

              bg-white/[0.025]

              text-[17px]
              leading-none

              text-white/45

              transition-all

              hover:border-white/14
              hover:bg-white/[0.05]
              hover:text-white/80

              disabled:pointer-events-none
              disabled:opacity-20
            "
          >
            +
          </button>

          {/* FIT */}

          <button
            type="button"

            onClick={
              resetToFit
            }

            className={`
              flex
              h-[32px]

              items-center
              justify-center

              rounded-full

              border

              px-[11px]

              text-[9px]

              transition-all

              ${
                fitMode
                  ? `
                      border-white/15
                      bg-white
                      text-black
                    `
                  : `
                      border-white/[0.07]
                      bg-white/[0.025]
                      text-white/36

                      hover:border-white/14
                      hover:bg-white/[0.05]
                      hover:text-white/70
                    `
              }
            `}
          >
            Fit
          </button>
        </div>
      </header>

      {/* ======================================== */}
      {/* CANVAS / SCROLL AREA                     */}
      {/* ======================================== */}

      <div
        className="
          relative

          min-h-0
          flex-1

          overflow-auto

          bg-[#141415]

          [scrollbar-width:thin]
          [scrollbar-color:rgba(255,255,255,0.12)_transparent]
        "
      >
        {/* ====================================== */}
        {/* SCROLLABLE STAGE                       */}
        {/* ====================================== */}

        <div
          className="
            flex
            shrink-0

            items-center
            justify-center
          "
          style={{
            width:
              `max(100%, ${
                scaledWidth +
                80
              }px)`,

            height:
              `max(100%, ${
                scaledHeight +
                80
              }px)`,

            minWidth:
              scaledWidth +
              80,

            minHeight:
              scaledHeight +
              80,
          }}
        >
          {/* ==================================== */}
          {/* PAGE CONTAINER                       */}
          {/* ==================================== */}

          <div
            className="
              shrink-0

              overflow-hidden

              rounded-[4px]

              shadow-[0_30px_100px_rgba(0,0,0,0.45)]
            "
            style={{
              width:
                scaledWidth,

              height:
                scaledHeight,
            }}
          >
            {/* ================================== */}
            {/* ORIGINAL 1600 × 900 PAGE           */}
            {/* ================================== */}

            <div
              style={{
                width:
                  PAGE_WIDTH,

                height:
                  PAGE_HEIGHT,

                transform:
                  `scale(${scale})`,

                transformOrigin:
                  "top left",
              }}
            >
              <GuidelineDocument
                currentPage={
                  currentPage
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================== */}
      {/* NAVIGATION                               */}
      {/* ======================================== */}

      <ThumbnailBar
        pages={pages}

        currentPage={
          currentPage
        }

        onPageChange={
          setCurrentPage
        }
      />
    </section>
  );
}