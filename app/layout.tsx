import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs';
import "./globals.css";
import { cn } from "@/lib/utils";


const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  weight: ['400','500','600', '700'],
});

export const metadata: Metadata = {
  title: "BitDavai | Best Quant Bot 2024",
  description: "Discover BitDavai, the Best Quant Bot of 2024. Maximize your trading profits with advanced algorithms, real-time data analysis, and automated strategies. Start optimizing your crypto investments today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          {children}
          </body>
      </html>
    </ClerkProvider> 
  );
}
