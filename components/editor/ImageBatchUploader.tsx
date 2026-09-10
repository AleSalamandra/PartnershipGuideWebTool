"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import {
  GUIDELINE_IMAGE_SLOTS,
  useGuidelineMediaStore,
  type GuidelineImageSlot,
  type UploadedGuidelineImage,
} from "@/store/guidelineMediaStore";

/* ================================================= */
/* COMPONENT                                         */
/* ================================================= */

export default function ImageBatchUploader() {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const images =
    useGuidelineMediaStore(
      (
        state
      ) =>
        state.images
    );

  const setImages =
    useGuidelineMediaStore(
      (
        state
      ) =>
        state.setImages
    );

  const removeImage =
    useGuidelineMediaStore(
      (
        state
      ) =>
        state.removeImage
    );

  const clearImages =
    useGuidelineMediaStore(
      (
        state
      ) =>
        state.clearImages
    );

  const [
    isReading,
    setIsReading,
  ] =
    useState(
      false
    );

  const uploadedCount =
    GUIDELINE_IMAGE_SLOTS.filter(
      (
        slot
      ) =>
        Boolean(
          images[
            slot
          ]
        )
    ).length;

  /* ------------------------------------------------ */
  /* UPLOAD                                           */
  /* ------------------------------------------------ */

  async function handleUpload(
    event:
      ChangeEvent<HTMLInputElement>
  ) {
    const files =
      Array.from(
        event.target
          .files ??
          []
      ).filter(
        (
          file
        ) =>
          file.type.startsWith(
            "image/"
          )
      );

    event.target.value =
      "";

    if (
      files.length ===
      0
    ) {
      return;
    }

    setIsReading(
      true
    );

    try {
      const assignments =
        assignFilesToSlots(
          files
        );

      const uploaded =
        await Promise.all(
          assignments.map(
            async ({
              slot,
              file,
            }) => ({
              slot,

              fileName:
                file.name,

              dataUrl:
                await readFileAsDataUrl(
                  file
                ),
            })
          )
        );

      setImages(
        uploaded
      );
    } catch (
      error
    ) {
      console.error(
        "Unable to load guideline images:",
        error
      );
    } finally {
      setIsReading(
        false
      );
    }
  }

  /* ------------------------------------------------ */
  /* RENDER                                           */
  /* ------------------------------------------------ */

  return (
    <section
      className="
        mt-[30px]

        border-t
        border-white/[0.065]

        pt-[30px]
      "
    >
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <div
        className="
          flex
          items-start
          justify-between

          gap-[12px]
        "
      >
        <div>
          <p
            className="
              text-[17px]
              leading-[1.05]
              tracking-[-0.025em]

              text-white/90

              oook-medium
            "
          >
            Footage & images
          </p>

          <p
            className="
              mt-[5px]

              max-w-[245px]

              text-[9px]
              leading-[1.4]

              text-white/27
            "
          >
            Replace the default image set used throughout the guideline.
          </p>
        </div>

        <span
          className="
            shrink-0

            rounded-full

            border
            border-white/[0.07]

            px-[7px]
            py-[4px]

            text-[7px]

            text-white/25
          "
        >
          {uploadedCount}/10
        </span>
      </div>

      {/* ======================================== */}
      {/* INPUT                                    */}
      {/* ======================================== */}

      <input
        ref={
          inputRef
        }
        type="file"
        multiple
        accept="
          image/png,
          image/jpeg,
          image/webp,
          image/avif
        "
        onChange={
          handleUpload
        }
        className="hidden"
      />

      <button
        type="button"
        disabled={
          isReading
        }
        onClick={() =>
          inputRef.current?.click()
        }
        className="
          mt-[16px]

          flex
          h-[42px]
          w-full

          items-center
          justify-center

          rounded-[11px]

          border
          border-white/[0.09]

          bg-white/[0.022]

          text-[9px]

          text-white/52

          transition-all

          hover:border-white/18
          hover:bg-white/[0.045]
          hover:text-white/80

          disabled:cursor-wait
          disabled:opacity-40
        "
      >
        {isReading
          ? "Loading images…"
          : "Upload image batch"}
      </button>

      <p
        className="
          mt-[7px]

          text-[7px]
          leading-[1.4]

          text-white/18
        "
      >
        Files named image1–image10 keep their matching slot. Other files are assigned in selection order.
      </p>

      {/* ======================================== */}
      {/* IMPORTANT NOTE                           */}
      {/* ======================================== */}

      <div
        className="
          mt-[12px]

          rounded-[10px]

          border
          border-white/[0.055]

          bg-white/[0.015]

          px-[10px]
          py-[8px]
        "
      >
        <p
          className="
            text-[7px]
            leading-[1.45]

            text-white/31
          "
        >
          Uploaded images always preserve their original tones in both Dark and Light document modes.
        </p>
      </div>

      {/* ======================================== */}
      {/* SLOTS                                    */}
      {/* ======================================== */}

      <div
        className="
          mt-[14px]

          grid
          grid-cols-5

          gap-[6px]
        "
      >
        {GUIDELINE_IMAGE_SLOTS.map(
          (
            slot
          ) => {
            const image =
              images[
                slot
              ];

            return (
              <ImageSlot
                key={
                  slot
                }
                slot={
                  slot
                }
                image={
                  image
                }
                onRemove={
                  removeImage
                }
              />
            );
          }
        )}
      </div>

      {/* ======================================== */}
      {/* CLEAR                                    */}
      {/* ======================================== */}

      {uploadedCount >
        0 && (
        <button
          type="button"
          onClick={
            clearImages
          }
          className="
            mt-[11px]

            text-[7px]

            text-white/20

            transition-colors

            hover:text-white/55
          "
        >
          Restore all default images
        </button>
      )}
    </section>
  );
}

/* ================================================= */
/* SLOT                                              */
/* ================================================= */

function ImageSlot({
  slot,
  image,
  onRemove,
}: {
  slot:
    GuidelineImageSlot;

  image:
    UploadedGuidelineImage |
    undefined;

  onRemove: (
    slot:
      GuidelineImageSlot
  ) => void;
}) {
  return (
    <div
      className="
        group

        relative

        aspect-video

        overflow-hidden

        rounded-[7px]

        border
        border-white/[0.065]

        bg-white/[0.015]
      "
    >
      {image ? (
        <>
          <img
            src={
              image.dataUrl
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
          />

          <div
            className="
              absolute
              inset-0

              bg-black/0

              transition-colors

              group-hover:bg-black/55
            "
          />

          <button
            type="button"
            onClick={() =>
              onRemove(
                slot
              )
            }
            className="
              absolute

              right-[3px]
              top-[3px]

              flex
              h-[15px]
              w-[15px]

              items-center
              justify-center

              rounded-full

              bg-black/70

              text-[8px]

              text-white/0

              transition-all

              group-hover:text-white/70
            "
          >
            ×
          </button>
        </>
      ) : (
        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center
          "
        >
          <span
            className="
              text-[7px]

              text-white/16
            "
          >
            {String(
              slot
            ).padStart(
              2,
              "0"
            )}
          </span>
        </div>
      )}

      {image && (
        <span
          className="
            absolute

            bottom-[3px]
            left-[4px]

            text-[6px]

            text-white/65

            drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]
          "
        >
          {String(
            slot
          ).padStart(
            2,
            "0"
          )}
        </span>
      )}
    </div>
  );
}

/* ================================================= */
/* SLOT ASSIGNMENT                                   */
/* ================================================= */

function assignFilesToSlots(
  files:
    File[]
) {
  const assignments:
    {
      slot:
        GuidelineImageSlot;

      file:
        File;
    }[] = [];

  const reserved =
    new Set<GuidelineImageSlot>();

  const unnamed:
    File[] = [];

  /* ------------------------------------------------ */
  /* EXPLICIT image1, image2...                       */
  /* ------------------------------------------------ */

  files.forEach(
    (
      file
    ) => {
      const namedSlot =
        getSlotFromFileName(
          file.name
        );

      if (
        namedSlot
      ) {
        const existingIndex =
          assignments.findIndex(
            (
              item
            ) =>
              item.slot ===
              namedSlot
          );

        if (
          existingIndex >=
          0
        ) {
          assignments[
            existingIndex
          ] = {
            slot:
              namedSlot,

            file,
          };
        } else {
          assignments.push({
            slot:
              namedSlot,

            file,
          });
        }

        reserved.add(
          namedSlot
        );
      } else {
        unnamed.push(
          file
        );
      }
    }
  );

  /* ------------------------------------------------ */
  /* REMAINING FILES                                  */
  /* ------------------------------------------------ */

  const available =
    GUIDELINE_IMAGE_SLOTS.filter(
      (
        slot
      ) =>
        !reserved.has(
          slot
        )
    );

  unnamed.forEach(
    (
      file,
      index
    ) => {
      const slot =
        available[
          index
        ];

      if (
        !slot
      ) {
        return;
      }

      assignments.push({
        slot,
        file,
      });
    }
  );

  return assignments.slice(
    0,
    10
  );
}

/* ================================================= */
/* FILE NAME                                         */
/* ================================================= */

function getSlotFromFileName(
  fileName:
    string
):
  | GuidelineImageSlot
  | null {
  const base =
    fileName.replace(
      /\.[^.]+$/,
      ""
    );

  const match =
    base.match(
      /^image[\s_-]*0?(10|[1-9])(?:[\s_-].*)?$/i
    );

  if (
    !match
  ) {
    return null;
  }

  const number =
    Number(
      match[
        1
      ]
    );

  if (
    !GUIDELINE_IMAGE_SLOTS.includes(
      number as GuidelineImageSlot
    )
  ) {
    return null;
  }

  return number as GuidelineImageSlot;
}

/* ================================================= */
/* READER                                            */
/* ================================================= */

function readFileAsDataUrl(
  file:
    File
) {
  return new Promise<string>(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader();

      reader.onload =
        () => {
          if (
            typeof reader.result ===
            "string"
          ) {
            resolve(
              reader.result
            );
          } else {
            reject(
              new Error(
                "Invalid image data."
              )
            );
          }
        };

      reader.onerror =
        () => {
          reject(
            reader.error
          );
        };

      reader.readAsDataURL(
        file
      );
    }
  );
}