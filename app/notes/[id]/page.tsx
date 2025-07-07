import fetchNoteId from "../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteDetailsProps {
  params: { id: string };
}

export const generateMetadata = async ({
  params,
}: NoteDetailsProps): Promise<Metadata> => {
  const { id } = params;
  const noteId = +id;
  const note = await fetchNoteId(noteId);

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://yourdomain.com/notes/${id}`,
      images: [
        {
          url: "https://picsum.photos/200/300",
          width: 300,
          height: 300,
        },
      ],
    },
  };
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = params;
  const noteId = +id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteId(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
