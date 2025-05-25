import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans, Kosugi, Sometype_Mono } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next";
import { SearchProvider } from "./contexts/SearchProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const kosugi = Kosugi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kosugi",
  display: "swap",
});

const sometypeMono = Sometype_Mono({
  subsets: ["latin"],
  variable: "--font-sometype-mono",
  display: "swap",
});

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
    <SearchProvider>
      <NuqsAdapter>
        <html
          lang="en"
          className={`${workSans.variable} ${kosugi.variable} ${sometypeMono.variable}`}
        >
          <body>{children}</body>
        </html>
      </NuqsAdapter>
    </SearchProvider>
  );
}
