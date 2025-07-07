"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import css from "./NotePage.module.css";
import { fetchNotes } from "../../../../lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Loader from "../../../loading";
import ErrorMessage from "./error";
import { FetchNotesValues } from "../../../../types/note";
import Link from "next/link";

interface NotesClientProps {
  initialPage: number;
  initialQuery: string;
  initialTag?: string;
  initialData: FetchNotesValues | undefined;
}

export default function NotesClient({
  initialPage,
  initialQuery,
  initialTag,
  initialData,
}: NotesClientProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, initialTag, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, initialTag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });

  const notesRequest = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 1;

  function handleChange(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {isLoading && <Loader />}

      {isError && <ErrorMessage error={error} />}
      {isSuccess && <NoteList notes={notesRequest} />}
    </div>
  );
}
