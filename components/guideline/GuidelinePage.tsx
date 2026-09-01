import { ReactNode } from "react";

interface GuidelinePageProps {
  children: ReactNode;
}

export default function GuidelinePage({
  children,
}: GuidelinePageProps) {
  return (
    <div
      className="
        relative
        h-[900px]
        w-[1600px]
        overflow-hidden
        bg-black
        text-white
      "
    >
      {children}
    </div>
  );
}