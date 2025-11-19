import { useEffect, useState } from "react";
import { getNotes, deleteNoteById } from "../api/notesApi";

export default function Card({ refreshToken = 0, accessToken = "" }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      if (!accessToken) {
        setNotes([]);
        setError("Sign in to load your notes.");
        return;
      }

      setIsLoading(true);
      setError("");

      const data = await getNotes(accessToken);
      setNotes(data || []);
    } catch (err) {
      console.error("Error fetching notes", err);
      setError("Something went wrong while loading notes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, accessToken]);
  
  const deleteNote = async (notesId) => {
    try {
      if (!accessToken) {
        setError("Sign in to delete notes.");
        return;
      }
      await deleteNoteById(notesId, accessToken);

      // Optimistically update local state so UI reflects deletion immediately
      setNotes((prev) => prev.filter((n) => n.notesId !== notesId));
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  if (isLoading && !notes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-slate-400 text-xs">
        <div className="h-8 w-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-3" />
        <p className="text-slate-500">Loading your notes...</p>
      </div>
    );
  }

  if (error && !notes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-xs">
        <p className="text-red-500 mb-1">{error}</p>
        <button
          onClick={fetchNotes}
          className="mt-1 rounded-md border border-slate-200 px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-100 transition"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-xs text-slate-400">
        <div className="h-10 w-10 rounded-xl border border-dashed border-slate-300 bg-white flex items-center justify-center mb-3">
          <span className="text-slate-400 text-lg">+</span>
        </div>
        <p className="text-slate-500">No notes yet.</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Create your first note above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {notes.map((note) => (
        <article
          key={note.notesId}
          className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-900/10 transition hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-slate-900">
                {note.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-4">
                {note.desc}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="inline-flex items-center gap-1 rounded-full border border-red-100 px-3 py-1 text-[11px] font-medium text-red-500 transition hover:bg-red-50"
              onClick={() => deleteNote(note.notesId)}
              aria-label={`Delete ${note.title}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 3.22a.75.75 0 0 1 .53-.22h3.88c.2 0 .39.08.53.22l.89.89H18a.75.75 0 0 1 0 1.5h-.41l-.91 11.53a2.25 2.25 0 0 1-2.24 2.06H9.56a2.25 2.25 0 0 1-2.24-2.06L6.41 5.61H6a.75.75 0 0 1 0-1.5h2.04l.89-.89ZM9.4 5.61l.84 10.66a.75.75 0 1 0 1.5-.12L10.9 5.5H9.4Zm4.7 0h-1.5l.84 10.66a.75.75 0 0 0 1.5-.12L14.1 5.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
