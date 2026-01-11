import type { Metadata } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import Navbar from "@/components/common/Navbar";
import ToastContainer from "@/components/common/ToastContainer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my work and skills.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          <div className="relative">
            {/* Navbar will be conditionally rendered or always present depending on design preferences. 
                    Given the requirements, a global navbar is good. */}
            <Navbar />
            {children}
            <ToastContainer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
