import { beforeEach, describe, expect, it } from "vitest";
import { useStore as store } from "./index";
import { randomID } from "../utils/numbers";
import { colorPalette } from '../utils/colors';

const note = {
  id: randomID(),
  content: "Test content",
  pos: {
    x: 646,
    y: 58,
    zIndex: 1,
  },
  color: "#FECDD3",
  size: {
    width: 388,
    height: 222,
  },
};

const initialState = store.getState();

describe("sticky notes zustend store", () => {
  beforeEach(() => {
    store.setState(initialState);
  });

  it("should be able to set isDraggingNote", () => {
    const { setIsDragging } = store.getState();

    setIsDragging(note.id)

    const { draggingNoteId } = store.getState();

    expect(draggingNoteId).toBe(note.id);
  });

  it("should be able to add a note", () => {
    const { addNote } = store.getState();

    addNote(note);
  });

  it("should be able to retrieve added note", () => {
    const { notes } = store.getState();

    expect(notes).toContain(note);
  });

  it("should be able to load all notes", () => {
    const { loadNotes } = store.getState();

    loadNotes();

    const { notes } = store.getState();

    expect(notes).not.toBeNull();
    expect(notes).toContain(note);
  });

  it("should be able to update the note content", () => {
    const updatedContent = "Note have been updated!";
    const { updateNote } = store.getState();

    updateNote(note.id, { content: updatedContent });

    const { notes } = store.getState();
    const updatedNote = notes.filter((n) => n.id === note.id)[0];

    expect(updatedNote.content).toBe(updatedContent);
  });

  it("should be able to update the note position", () => {
    const { updateNote } = store.getState();

    updateNote(note.id, { pos: { x: 100, y: 50 } });

    const { notes } = store.getState();
    const updatedNote = notes.filter((n) => n.id === note.id)[0];

    expect(updatedNote.pos).toHaveProperty("x", 100);
    expect(updatedNote.pos).toHaveProperty("y", 50);
  });

  it("should be able to update the note z-index", () => {
    const { updateNoteIndex } = store.getState();

    updateNoteIndex(note.id, 100);

    const { notes } = store.getState();
    const updatedNote = notes.filter((n) => n.id === note.id)[0];

    expect(updatedNote.pos.zIndex).toBe(100);
  });

  it("should be able to update the note size", () => {
    const { updateNote } = store.getState();

    updateNote(note.id, { size: { width: 500, height: 250 } });

    const { notes } = store.getState();
    const updatedNote = notes.filter((n) => n.id === note.id)[0];

    expect(updatedNote.size).toHaveProperty("width", 500);
    expect(updatedNote.size).toHaveProperty("height", 250);
  });

  it("should be able to update the note color", () => {
    const { updateNote } = store.getState();

    updateNote(note.id, { color: colorPalette[6] });

    const { notes } = store.getState();
    const updatedNote = notes.filter((n) => n.id === note.id)[0];

    expect(updatedNote.color).toBe(colorPalette[6]);
  });

  it("should be able to remove the note", () => {
    const { removeNote } = store.getState();

    removeNote(note.id);

    const { notes } = store.getState();

    expect(notes).not.toContain(note);
  });
});
