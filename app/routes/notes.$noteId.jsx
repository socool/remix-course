import { Link, useLoaderData } from "@remix-run/react";
import styles from "~/styles/note-details.css";
import { getStoredNotes, storedNotes } from "~/data/notes";
export default function NoteDetailesPage() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);
  if (!selectedNote) {
    throw json(
      { message: "Could not find note for id " + noteId },
      { status: 404 }
    );
  }
  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
