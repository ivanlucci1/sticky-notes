import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useStore } from "../../store";
import { NoteData } from "../Note";

import { getRandomColor } from "../../utils/colors";

import styles from "./styles.module.scss";

interface NoteDrawer {
  boardRef: React.RefObject<HTMLDivElement>;
  setIsAdding: (value: boolean) => void;
}

export function NoteDrawer({ boardRef, setIsAdding }: NoteDrawer) {
  const [cursorPos, setCursorPos] = useState({} as { x: number; y: number });
  const [noteColor] = useState(getRandomColor());
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStartPos, setDrawStartPos] = useState(
    {} as { x: number; y: number }
  );
  const newNoteRef = useRef<HTMLDivElement>(null);

  const addNote = useStore((state) => state.addNote);

  const noteSize = useMemo(() => {
    const width = cursorPos.x - drawStartPos.x;
    const height = cursorPos.y - drawStartPos.y;

    return { width, height };
  }, [cursorPos, drawStartPos]);

  const watchUserCursor = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.onmousemove = (e) => {
        if (newNoteRef.current) {
          if (!isDrawing) {
            newNoteRef.current.style.top = `${e.clientY}px`;
            newNoteRef.current.style.left = `${e.clientX}px`;
          }

          setCursorPos({
            x: e.clientX,
            y: e.clientY,
          });
        }
      };

      boardRef.current.onmousedown = (e) => {
        if (newNoteRef.current) {
          newNoteRef.current.innerHTML = "";
        }

        setIsDrawing(true);
        setCursorPos({ x: e.clientX, y: e.clientY });
        setDrawStartPos({ x: e.clientX, y: e.clientY });
      };

      boardRef.current.onmouseup = () => {
        const newNote: NoteData = {
          id: Math.round(Math.random() * 1000).toString(),
          content: "",
          pos: {
            x: cursorPos.x - noteSize.width,
            y: cursorPos.y - noteSize.height,
            zIndex: 1,
          },
          color: noteColor,
        };

        if (noteSize.width > 0 && noteSize.height > 0) {
          newNote.size = {
            width: noteSize.width,
            height: noteSize.height,
          };
        }

        addNote(newNote);

        // Clean-up states and event listeners
        setIsAdding(false);
        setIsDrawing(false);
        setDrawStartPos({} as { x: number; y: number });

        if (boardRef.current) {
          boardRef.current.onmousemove = null;
          boardRef.current.onmousedown = null;
          boardRef.current.onmouseup = null;
        }
      };
    }

    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setIsAdding(false);
      }
    });
  }, [
    boardRef,
    isDrawing,
    noteSize,
    cursorPos,
    noteColor,
    setIsAdding,
    addNote,
  ]);

  useEffect(() => {
    if (isDrawing && newNoteRef.current) {
      newNoteRef.current.style.width = `${noteSize.width}px`;
      newNoteRef.current.style.height = `${noteSize.height}px`;
    }
  }, [isDrawing, noteSize]);

  useEffect(() => {
    watchUserCursor();
  }, [watchUserCursor]);

  return (
    <div
      ref={newNoteRef}
      className={styles.notePlaceholder}
      style={{ backgroundColor: noteColor }}
    >
      Add new note...
    </div>
  );
}
