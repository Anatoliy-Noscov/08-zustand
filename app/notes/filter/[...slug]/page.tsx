import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "all notes" : slug[0];

  return {
    title: `Notes filtered by ${tag}`,
    description: `List of notes filtered by ${tag}`,
    openGraph: {
      title: `Notes filtered by ${tag}`,
      description: `List of notes filtered by ${tag}`,
      url: `https://yourdomain.com/notes/filter/${tag}`,
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

export const revalidate = 60;

export default async function Notes({ params }: NotesProps) {
  const initialQuery = "";
  const initialPage = 1;
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const data = await fetchNotes(initialQuery, initialPage, tag);

  return (
    <NotesClient
      initialQuery={initialQuery}
      initialPage={initialPage}
      initialTag={tag}
      initialData={data}
    />
  );
}
