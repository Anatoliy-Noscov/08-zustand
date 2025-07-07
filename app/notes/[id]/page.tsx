import { fetchNoteById } from "../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id } = params;
  const note = await fetchNoteById(Number(id));

  return {
    title: note?.title || "Note not found",
    description: note?.content || "",
    openGraph: {
      title: note?.title || "Note not found",
      description: note?.content || "",
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

export default async function NoteDetails({ params }: PageProps) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", Number(id)],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
