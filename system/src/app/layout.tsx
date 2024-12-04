import type { Metadata } from "next";
import "./globals.css";
import { CookieProvider } from "./context/sesiones/SessionContext";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import { ThemeProvider } from "next-themes";

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
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CookieProvider>
            {children}
            <ThemeToggle />
          </CookieProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

