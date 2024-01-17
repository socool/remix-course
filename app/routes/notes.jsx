import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storedNotes } from "~/data/notes";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add Validation...
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storedNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
