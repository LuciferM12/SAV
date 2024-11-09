import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/headers/Header";



export const metadata: Metadata = {
  title: "SAV",
  description: "New System for all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
