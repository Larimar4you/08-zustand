"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // 👈 обязательно для проверки
  });

  const closeModal = () => {
    router.back();
  };

  return (
    <Modal onClose={closeModal}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading note.</p>}

      {note && (
        <div className={css.container}>
          <button onClick={closeModal}>Close</button>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p>{note.createdAt}</p> {/* 👈 тоже обязателен */}
        </div>
      )}
    </Modal>
  );
}
