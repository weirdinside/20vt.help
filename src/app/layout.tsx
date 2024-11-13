import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "20vt.help",
  description: "Home of the 12453",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
