import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackprovider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: `NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible`,

  openGraph: {
    title: "NoteHub",
    description: `NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
