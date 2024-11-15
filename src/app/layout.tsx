import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from "next/font/google";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "20vt.help",
  description: "Home of the 12453",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={work_sans.className}>
      <body>{children}</body>
    </html>
  );
}
