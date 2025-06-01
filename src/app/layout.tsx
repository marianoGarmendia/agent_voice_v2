import type { Metadata } from "next";
import localFont from "next/font/local";
import { VoiceChatProvider } from "@/context/VoiceChatContexts";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Agente AI conversacional de inmobiliaria Maria ",
  description: "Un agente AI conversacional para inmobiliaria Maria M&M",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VoiceChatProvider>
          
        {children}
        </VoiceChatProvider>
      </body>
    </html>
  );
}
