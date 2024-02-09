import { useEffect, useRef, useState } from "react";

import { useStore } from "../../store";

import { Note } from "../Note";
import { NoteDrawer } from "../NoteDrawer";
import { TrashZone } from "../TrashZone";

import { PlusCircle, X } from "lucide-react";

import styles from "./styles.module.scss";

export function Board() {
  const [isAdding, setIsAdding] = useState(false);

  const loadNotes = useStore((state) => state.loadNotes);
  const notes = useStore((state) => state.notes);
  const draggingNoteId = useStore((state) => state.draggingNoteId);

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div className="wrapper">
      <header>
        <div>Sticky Notes</div>

        <div>
          {!isAdding ? (
            <button
              type="button"
              title="Add new note"
              onClick={() => setIsAdding(true)}
            >
              <PlusCircle color="#fff" />
            </button>
          ) : (
            <button
              type="button"
              title="Cancel adding note"
              onClick={() => setIsAdding(false)}
            >
              <X color="red" />
            </button>
          )}
        </div>
      </header>

      <main ref={boardRef} className={styles.boardWrapper}>
        {isAdding && (
          <NoteDrawer boardRef={boardRef} setIsAdding={setIsAdding} />
        )}

        {notes.map((note) => (
          <Note key={note.id} noteId={note.id} />
        ))}

        {draggingNoteId && <TrashZone />}
      </main>
    </div>
  );
}
