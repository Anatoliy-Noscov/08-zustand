import { CreateNoteValues } from "../../types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft: CreateNoteValues = {
  title: "",
  content: "",
  tag: "Todo",
};

interface noteDraftStore {
  draft: CreateNoteValues;
  setDraft: (note: CreateNoteValues) => void;
  clearDraft: () => void;
}

export const useDraftStore = create<noteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    }
  )
);
