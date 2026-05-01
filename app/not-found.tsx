import type { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: "404 | Page not found",
  description: "The page you are looking for does not exist in NoteHub.",
  openGraph: {
    title: "404 | Page not found",
    description: "The page you are looking for does not exist in NoteHub.",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 page",
      },
    ],
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
