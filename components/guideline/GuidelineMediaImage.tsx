"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  useGuidelineMediaStore,
  type GuidelineImageSlot,
} from "@/store/guidelineMediaStore";

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
];

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface GuidelineMediaImageProps {
  slot:
    GuidelineImageSlot;

  alt?:
    string;

  className?:
    string;

  style?:
    CSSProperties;

  /*
    Intentional image treatment belonging to
    the page itself.

    This is different from the global
    Dark / Light inversion.
  */

  treatmentFilter?:
    string;
}

/* ================================================= */
/* COMPONENT                                         */
/* ================================================= */

export default function GuidelineMediaImage({
  slot,
  alt = "",
  className = "",
  style,
  treatmentFilter,
}: GuidelineMediaImageProps) {
  const imageRef =
    useRef<HTMLImageElement>(
      null
    );

  const uploadedImage =
    useGuidelineMediaStore(
      (
        state
      ) =>
        state.images[
          slot
        ]
    );

  const [
    extensionIndex,
    setExtensionIndex,
  ] =
    useState(
      0
    );

  const isUploaded =
    Boolean(
      uploadedImage
    );

  /* ------------------------------------------------ */
  /* RESET FALLBACK                                   */
  /* ------------------------------------------------ */

  if (
    extensionIndex >
    IMAGE_EXTENSIONS.length -
      1
  ) {
    setExtensionIndex(
      0
    );
  }

  /* ------------------------------------------------ */
  /* SOURCE                                           */
  /* ------------------------------------------------ */

  const src =
    uploadedImage
      ?.dataUrl ??
    `/images/image${slot}.${IMAGE_EXTENSIONS[extensionIndex]}`;

  /* ------------------------------------------------ */
  /* PROTECT USER MEDIA                               */
  /* ------------------------------------------------ */

  useLayoutEffect(
    () => {
      const image =
        imageRef.current;

      if (
        !image
      ) {
        return;
      }

      /*
        Uploaded images must NEVER inherit the
        global Dark / Light inversion.

        However, if this page intentionally applies
        an image treatment, we preserve that treatment.
      */

      if (
        isUploaded
      ) {
        image.style.setProperty(
          "filter",

          treatmentFilter ??
            "none",

          "important"
        );

        return;
      }

      /*
        Default media goes back to normal behaviour.
      */

      if (
        treatmentFilter
      ) {
        image.style.setProperty(
          "filter",
          treatmentFilter
        );
      } else {
        image.style.removeProperty(
          "filter"
        );
      }
    },
    [
      isUploaded,
      treatmentFilter,
      src,
    ]
  );

  /* ------------------------------------------------ */
  /* RENDER                                           */
  /* ------------------------------------------------ */

  return (
    <img
      ref={
        imageRef
      }

      src={
        src
      }

      alt={
        alt
      }

      draggable={
        false
      }

      data-guideline-image-slot={
        slot
      }

      data-guideline-image-source={
        isUploaded
          ? "user-upload"
          : "default"
      }

      onError={() => {
        /*
          User upload has no extension fallback.
        */

        if (
          isUploaded
        ) {
          return;
        }

        if (
          extensionIndex <
          IMAGE_EXTENSIONS.length -
            1
        ) {
          setExtensionIndex(
            (
              current
            ) =>
              current +
              1
          );
        }
      }}

      className={
        className
      }

      style={
        style
      }
    />
  );
}