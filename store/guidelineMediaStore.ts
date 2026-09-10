"use client";

import {
  create,
} from "zustand";

/* ================================================= */
/* SLOTS                                             */
/* ================================================= */

export const GUIDELINE_IMAGE_SLOTS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
] as const;

export type GuidelineImageSlot =
  (typeof GUIDELINE_IMAGE_SLOTS)[number];

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export interface UploadedGuidelineImage {
  slot:
    GuidelineImageSlot;

  fileName:
    string;

  dataUrl:
    string;
}

interface GuidelineMediaStore {
  images:
    Partial<
      Record<
        GuidelineImageSlot,
        UploadedGuidelineImage
      >
    >;

  setImage: (
    image:
      UploadedGuidelineImage
  ) => void;

  setImages: (
    images:
      UploadedGuidelineImage[]
  ) => void;

  removeImage: (
    slot:
      GuidelineImageSlot
  ) => void;

  clearImages: () => void;
}

/* ================================================= */
/* STORE                                             */
/* ================================================= */

export const useGuidelineMediaStore =
  create<GuidelineMediaStore>(
    (
      set
    ) => ({
      images: {},

      setImage: (
        image
      ) => {
        set(
          (
            state
          ) => ({
            images: {
              ...state.images,

              [image.slot]:
                image,
            },
          })
        );
      },

      setImages: (
        newImages
      ) => {
        set(
          (
            state
          ) => {
            const next = {
              ...state.images,
            };

            newImages.forEach(
              (
                image
              ) => {
                next[
                  image.slot
                ] =
                  image;
              }
            );

            return {
              images:
                next,
            };
          }
        );
      },

      removeImage: (
        slot
      ) => {
        set(
          (
            state
          ) => {
            const next = {
              ...state.images,
            };

            delete next[
              slot
            ];

            return {
              images:
                next,
            };
          }
        );
      },

      clearImages:
        () => {
          set({
            images: {},
          });
        },
    })
  );