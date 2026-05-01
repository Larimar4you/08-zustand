import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getNotesByTag } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tagFromUrl = slug[0];
  const tag = tagFromUrl === "all" ? "All" : tagFromUrl;

  return {
    title: `${tag} notes | NoteHub`,
    description: `Browse ${tag.toLowerCase()} notes in NoteHub.`,
    openGraph: {
      title: `${tag} notes | NoteHub`,
      description: `Browse ${tag.toLowerCase()} notes in NoteHub.`,
      url: `/notes/filter/${tagFromUrl}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tag} notes | NoteHub`,
        },
      ],
    },
  };
}

export default async function FilterNotesPage({ params }: Props) {
  const { slug } = await params;

  const tagFromUrl = slug[0];
  const tag = tagFromUrl === "all" ? undefined : tagFromUrl;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => getNotesByTag(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
