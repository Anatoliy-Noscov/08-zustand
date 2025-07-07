import { fetchNoteById } from "../../../lib/api";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
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

export default async function NotePage({ params }: Props) {
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
