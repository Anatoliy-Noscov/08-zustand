import { fetchNoteById } from "../../../lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const note = await fetchNoteById(Number(params.id));

  return {
    title: note?.title || "Note not found",
    description: note?.content || "",
    openGraph: {
      title: note?.title || "Note not found",
      description: note?.content || "",
      url: `https://yourdomain.com/notes/${params.id}`,
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

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(Number(params.id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
