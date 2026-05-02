import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sky Consultants KP - Study Abroad Consultants | Italy, UK, Germany & More",
  description: "Sky Consultants KP - Your trusted partner for study abroad. We send students to Italy, Turkey, Serbia, Finland, France, UK, Belgium, Germany, South Korea, and Ireland. No IELTS required for most destinations.",
  keywords: ["study abroad", "study visa", "Sky Consultants KP", "study in Italy", "study in UK", "study in Germany", "study in Turkey", "study in Serbia", "study in Finland", "study in France", "study in Belgium", "study in South Korea", "study in Ireland", "consultants KP", "visa consultant"],
  authors: [{ name: "Sky Consultants KP" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Sky Consultants KP - Study Abroad Consultants",
    description: "Your trusted partner for study abroad. 10+ countries, 50+ universities, no IELTS required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
