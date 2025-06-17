import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ✅ assure-toi que le chemin est bon

export const metadata: Metadata = {
  title: "Lancine Keita",
  description: "Created by keita",
  generator: "keita.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* ✅ NAVBAR visible sur toutes les pages */}
        <main className="pt-16">{children}</main>{" "}
        {/* push content under navbar */}
      </body>
    </html>
  );
}
