import fs from "fs/promises";

export async function getStoredNotes() {
  const file = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(file);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storedNotes(notes) {
  return fs.writeFile("notes.json", JSON.stringify({ notes }));
}
