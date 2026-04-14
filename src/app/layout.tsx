import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Guild - Blueprint",
  description:
    "A website creator studio for building your Build Guild custom city website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-rcbasic">
      <body className="grid-bg grainy-bg">
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id="grainy" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".3"
              numOctaves="2"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
