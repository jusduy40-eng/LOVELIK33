import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surprise Web - สร้างเซอร์ไพรส์ให้แฟน",
  description: "สร้างเว็บไซต์เซอร์ไพรส์แฟนฟรี",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
