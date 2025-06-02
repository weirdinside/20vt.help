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

export const metadata = {
  metadataBase: 'https://20vt.help',
  title: '20vt.help',
  description: 'a resource for the 12453',
  openGraph: {
    title: '20vt.help',
    description: 'a resource for the 12453',
    url: 'https://20vt.help',
    siteName: '20vt.help',
    images: [
      {
        url: '/og.png',
        width: 400,
        height: 300,
        alt: '20vt.help - a resource for 12453',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '20vt.help',
    description: 'a resource for the 12453',
    images: ['/og.png'],
  },
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
