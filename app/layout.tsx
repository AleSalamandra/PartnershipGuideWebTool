import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Partnership Guide Tool",
  description: "Interactive partnership visual guideline generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/dwz5pyv.css"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}