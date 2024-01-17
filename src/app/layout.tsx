import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ErrorProvider } from "@/context/ErrorContext";
import { HotelProvider } from "@/context/HotelContext";
import { ModalStatusProvider } from "@/context/ModalContext";
import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="pt-28">
          <ErrorProvider>
            <ModalStatusProvider>
              <HotelProvider>{children}</HotelProvider>
            </ModalStatusProvider>
          </ErrorProvider>
        </div>
      </body>
    </html>
  );
}
