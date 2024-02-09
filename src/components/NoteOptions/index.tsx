import { useStore } from "../../store";

import { getRandomColor } from "../../utils/colors";

import { BringToFront, Palette, SendToBack, Trash } from "lucide-react";

import styles from "./styles.module.scss";

interface NoteOptionsProps {
  noteId: string;
  setIsActive: (value: boolean) => void;
}

export function NoteOptions({ noteId, setIsActive }: NoteOptionsProps) {
  const zIndex = useStore(
    (store) => store.notes.find((note) => note.id === noteId)?.pos.zIndex
  );

  const updateNote = useStore((store) => store.updateNote);
  const updateNoteIndex = useStore((store) => store.updateNoteIndex);
  const removeNote = useStore((store) => store.removeNote);

  function handleColorUpdate() {
    updateNote(noteId, { color: getRandomColor() });
    setIsActive(false);
  }

  function handleBringToFront() {
    if (!zIndex) return;

    updateNoteIndex(noteId, zIndex + 1);
    setIsActive(false);
  }

  function handleSendToBack() {
    if (!zIndex || zIndex < 1) return;

    updateNoteIndex(noteId, zIndex - 1);
    setIsActive(false);
  }

  function handleRemoveNote() {
    removeNote(noteId);
  }

  return (
    <div className={styles.options}>
      <button
        type="button"
        title="Update color"
        onClick={() => handleColorUpdate()}
      >
        <Palette size={14} />
      </button>

      <button
        className={styles.orderBtn}
        type="button"
        title="Bring to front"
        onClick={() => handleBringToFront()}
      >
        <BringToFront size={14} />
      </button>

      {zIndex && zIndex > 1 ? (
        <button
          className={styles.orderBtn}
          type="button"
          title="Send to back"
          onClick={() => handleSendToBack()}
        >
          <SendToBack size={14} />
        </button>
      ) : (
        <></>
      )}

      <button
        className={styles.delButton}
        type="button"
        title="Remove note"
        onClick={() => handleRemoveNote()}
      >
        <Trash size={14} color="#DC2626" />
      </button>
    </div>
  );
}
