import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taimur's Guitar Academy",
  description: "Professional guitar lessons with Taimur - Learn guitar from an experienced musician",
  keywords: "guitar lessons, music education, guitar teacher, online guitar lessons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#1a202c" />
      </head>
      <body className={`${inter.className} antialiased bg-background`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
