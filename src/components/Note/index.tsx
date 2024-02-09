import { DragEvent, MouseEvent, useEffect, useRef, useState } from "react";

import { useStore } from "../../store";

import { NoteOptions } from "../NoteOptions";

import styles from "./styles.module.scss";

export interface NoteData {
  id: string;
  content: string;
  pos: {
    x: number;
    y: number;
    zIndex?: number;
  };
  size?: {
    width: number;
    height: number;
  };
  color?: string;
}

interface NoteProps {
  noteId: string;
}

export function Note({ noteId }: NoteProps) {
  const noteContent = useStore(
    (state) => state.notes.find((note) => note.id === noteId)?.content
  );
  const notePos = useStore(
    (state) => state.notes.find((note) => note.id === noteId)?.pos
  );
  const noteSize = useStore(
    (state) => state.notes.find((note) => note.id === noteId)?.size
  );
  const noteColor = useStore(
    (state) => state.notes.find((note) => note.id === noteId)?.color
  );

  const updateNote = useStore((state) => state.updateNote);

  const setIsDragging = useStore((state) => state.setIsDragging);

  const [isActive, setIsActive] = useState(false);
  const [textareaContent, setTextareaContent] = useState(noteContent);

  const noteRef = useRef<HTMLDivElement>(null);

  function handleOnDragStart(event: DragEvent) {
    const emptyImg = new Image();
    event.dataTransfer?.setDragImage(emptyImg, 0, 0);
    setIsDragging(noteId);
  }

  function updateNotePosition(event: MouseEvent) {
    const notePos = getNotePosition(event.clientX, event.clientY);

    if (noteRef.current) {
      noteRef.current.style.left = `${notePos.x}px`;
      noteRef.current.style.top = `${notePos.y}px`;
    }
  }

  function handleOnDragEnd(event: MouseEvent) {
    const notePos = getNotePosition(event.clientX, event.clientY);

    updateNotePosition(event);
    updateNote(noteId, { pos: notePos });
    setIsDragging(false);
  }

  function getNotePosition(posX: number, posY: number) {
    let x = 0;
    let y = 0;
    let zIndex = 0;

    if (noteRef.current) {
      const offsetX = noteRef.current.clientWidth / 2;
      const offsetY = noteRef.current.clientHeight;

      x = posX - offsetX;
      y = posY - offsetY;
      zIndex = Number(noteRef.current.style.zIndex);
    }

    return { x, y, zIndex };
  }

  function handleTextareaResize() {
    if (noteRef.current) {
      const currentW = Number(noteRef.current.getAttribute("data-w") ?? "");
      const currentH = Number(noteRef.current.getAttribute("data-h") ?? "");

      const newWidth = noteRef.current.clientWidth;
      const newHeight = noteRef.current.clientHeight;

      if (currentW !== newWidth || currentH !== newHeight) {
        updateNote(noteId, { size: { width: newWidth, height: newHeight } });
      }
    }
  }

  useEffect(() => {
    noteRef.current?.setAttribute("data-w", `${noteRef.current.clientWidth}`);
    noteRef.current?.setAttribute("data-h", `${noteRef.current.clientHeight}`);
  }, []);

  return (
    <div
      ref={noteRef}
      className={styles.noteWrapper}
      onDrag={updateNotePosition}
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      onTouchStart={() => setIsActive(true)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        top: notePos?.y,
        left: notePos?.x,
        zIndex: notePos?.zIndex,
      }}
      draggable
    >
      {isActive && <NoteOptions noteId={noteId} setIsActive={setIsActive} />}
      <textarea
        className={styles.note}
        placeholder="Type your note..."
        value={textareaContent}
        onChange={(e) => setTextareaContent(e.currentTarget.value)}
        onBlur={(e) => updateNote(noteId, { content: e.currentTarget.value })}
        onMouseUp={handleTextareaResize}
        style={{
          width: `${noteSize?.width}px`,
          height: `${noteSize?.height}px`,
          backgroundColor: noteColor,
        }}
      ></textarea>
    </div>
  );
}
