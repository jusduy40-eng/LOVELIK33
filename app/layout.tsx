import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"] 
});

export const metadata: Metadata = {
  title: "Surprise Web - สร้างเซอร์ไพรส์ให้แฟนฟรี",
  description: "สร้างเว็บไซต์เซอร์ไพรส์แฟนฟรี ไม่มีค่าใช้จ่าย ง่ายและรวดเร็ว",
  keywords: ["เซอร์ไพรส์", "แฟน", "ความรัก", "เว็บไซต์ฟรี"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
