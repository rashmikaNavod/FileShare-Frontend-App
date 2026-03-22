import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FileShare — Share files instantly",
  description:
    "Upload, manage, and share files with a simple link. Built with Next.js and Spring Boot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-[#07070b] text-white antialiased min-h-screen`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
