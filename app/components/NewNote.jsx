import style from "./NewNote.css";
import { Form } from "@remix-run/react";

function NewNote() {
  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="note-title">Title</label>
        <input type="text" id="note-title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>

      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
