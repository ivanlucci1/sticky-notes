import { DragEvent, useRef } from "react";

import { useStore } from "../../store";

import styles from "./styles.module.scss";

export function TrashZone() {
  const zoneRef = useRef<HTMLDivElement>(null);

  const draggingNoteId = useStore((state) => state.draggingNoteId);
  const removeNote = useStore((state) => state.removeNote);
  const setIsDragging = useStore((state) => state.setIsDragging);

  function handleOnDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (zoneRef.current) {
      zoneRef.current.style.opacity = "1";
    }
  }

  function handleOnDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (confirm("Are you sure to remove it?") && draggingNoteId) {
      removeNote(draggingNoteId);
    }

    setIsDragging(false);
  }

  function handleOnDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (zoneRef.current) {
      zoneRef.current.style.opacity = "";
    }
  }

  return (
    <div className={styles.zoneWrapper}>
      <div
        ref={zoneRef}
        onDragEnter={handleOnDragEnter}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDragLeave={handleOnDragLeave}
        onDrop={handleOnDrop}
        className={styles.zoneOverlay}
      >
        Drop your note here to remove it
      </div>
    </div>
  );
}
