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

const PAGE_WIDTH = 1600;
const PAGE_HEIGHT = 900;

/* ------------------------------------------------ */
/* VIEWER                                           */
/* ------------------------------------------------ */

export default function DocumentViewer() {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const [
    scale,
    setScale,
  ] = useState(0.5);

  const [
    currentPage,
    setCurrentPage,
  ] = useState(0);

  /* ---------------------------------------------- */
  /* PARTNERSHIP MODEL                              */
  /* ---------------------------------------------- */

  const partnershipModel =
    useGuidelineStore(
      (state) =>
        state.partnershipModel
    );

  /* ---------------------------------------------- */
  /* DOCUMENT PAGES                                 */
  /* ---------------------------------------------- */

  /*
    Navigation now comes directly from the
    document definition.

    We remove the React components before
    passing the data to ThumbnailBar because
    the bar only needs metadata.
  */

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
  /* RESET WHEN MODEL CHANGES                       */
  /* ---------------------------------------------- */

  useEffect(() => {
    setCurrentPage(0);
  }, [partnershipModel]);

  /* ---------------------------------------------- */
  /* RESPONSIVE SCALE                               */
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

      setScale(
        Math.min(
          widthScale,
          heightScale,
          1
        )
      );
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
  }, []);

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
        <div>
          <p
            className="
              text-[15px]
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

        {/* SCALE */}

        <div
          className="
            rounded-full

            bg-white/[0.06]

            px-[12px]
            py-[6px]

            text-[12px]
            text-white/45
          "
        >
          {Math.round(
            scale * 100
          )}
          %
        </div>
      </header>

      {/* ======================================== */}
      {/* CANVAS                                   */}
      {/* ======================================== */}

      <div
        className="
          relative

          flex
          flex-1

          items-center
          justify-center

          overflow-hidden

          bg-[#141415]
        "
      >
        {/* SCALED PAGE CONTAINER */}

        <div
          className="
            overflow-hidden

            rounded-[4px]

            shadow-[0_30px_100px_rgba(0,0,0,0.45)]
          "
          style={{
            width:
              PAGE_WIDTH *
              scale,

            height:
              PAGE_HEIGHT *
              scale,
          }}
        >
          {/* ORIGINAL 1600 × 900 PAGE */}

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