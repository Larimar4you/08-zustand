"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { getNotesByTag } from "@/lib/api";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

type Props = {
  tag?: string;
};

export default function NotesPage({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, debouncedQuery, tag],
    queryFn: () => getNotesByTag(currentPage, debouncedQuery, tag),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  const notes = data?.notes ?? [];

  return (
    <>
      <SearchBox onSearch={handleSearch} />

      {isSuccess && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}
    </>
  );
}
