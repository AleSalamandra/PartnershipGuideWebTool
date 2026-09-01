"use client";

interface ThumbnailPage {
  id: string;
  number: string;
  title: string;
}

interface ThumbnailBarProps {
  pages: ThumbnailPage[];
  currentPage: number;
  onPageChange: (
    pageIndex: number
  ) => void;
}

export default function ThumbnailBar({
  pages,
  currentPage,
  onPageChange,
}: ThumbnailBarProps) {
  return (
    <footer
      className="
        flex
        h-[76px]
        shrink-0

        items-center
        justify-center

        border-t
        border-white/[0.07]

        bg-[#101011]

        px-[24px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-center

          gap-[8px]
        "
      >
        {pages.map(
          (page, index) => {
            const active =
              index ===
              currentPage;

            return (
              <button
                key={page.id}
                type="button"

                onClick={() =>
                  onPageChange(
                    index
                  )
                }

                aria-label={`Go to ${page.title}`}

                aria-current={
                  active
                    ? "page"
                    : undefined
                }

                className={`
                  flex

                  h-[38px]
                  min-w-[38px]

                  items-center
                  justify-center

                  rounded-full

                  px-[12px]

                  text-[13px]

                  transition-all
                  duration-200

                  ${
                    active
                      ? `
                          bg-white
                          text-black
                        `
                      : `
                          text-white/35

                          hover:bg-white/[0.06]
                          hover:text-white
                        `
                  }
                `}
              >
                {page.number}
              </button>
            );
          }
        )}
      </div>
    </footer>
  );
}