"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import fetchNoteById from "../../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/loading";
import ErrorMessage from "@/app/notes/filter/[...slug]/error";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const noteId = +id;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  function handleClose() {
    router.back();
  }

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage error={error} />}
      {data && <NotePreview note={data} />}
    </Modal>
  );
}
