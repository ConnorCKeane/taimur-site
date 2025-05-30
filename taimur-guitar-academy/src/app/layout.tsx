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
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="theme-color" content="#18181A" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} antialiased bg-[#232326] text-white`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
