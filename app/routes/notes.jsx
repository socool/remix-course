import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storedNotes } from "~/data/notes";
import { redirect, json } from "@remix-run/node";
import { useCatch, useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";

export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}
//execute in backend never reach client side
//data send from backend to frontend
export async function loader() {
  const notes = await getStoredNotes();
  // return json(notes);
  // CatchBoundary if not catch root will catch
  if (!notes || notes.length === 0) {
    throw json("No notes found", {
      status: 404,
      statusText: "No notes found",
    });
  }
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add Validation... code run on backend then browser function can't work
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long" };
  }
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storedNotes(updatedNotes);
  await new Promise((r) => setTimeout(r, 1000));
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || "Data not found.";
  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An Error related to your notes occurred</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>
      </p>
    </main>
  );
}
