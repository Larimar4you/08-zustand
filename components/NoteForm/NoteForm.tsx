"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NewNote, NoteTag } from "@/types/note";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values: NewNote = {
      title: String(formData.get("title")),
      content: String(formData.get("content")),
      tag: formData.get("tag") as NoteTag,
    };

    mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          defaultValue={draft.content}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>

        <button
          className={css.cancelButton}
          type="button"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
