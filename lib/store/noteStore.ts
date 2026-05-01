import { NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteStore = {
  draft: NoteDraft;
  setDraft: (data: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
