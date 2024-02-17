import { create } from "zustand";
import { api } from "../lib/api";

import { NoteData } from "../components/Note";

interface NoteState {
	notes: NoteData[];
	draggingNoteId: string | false;

	loadNotes: () => void;
	addNote: (note: NoteData) => void;
	updateNote: (noteId: string, noteData: Partial<NoteData>) => void;
	updateNoteIndex: (noteId: string, zIndex: number) => void;
	removeNote: (noteId: string) => void;
	setIsDragging: (noteId: string | false) => void;
}

export const useStore = create<NoteState>((set) => ({
	notes: [],
	draggingNoteId: false,

	loadNotes: async () => {
		const { data: notes } = await api.get<NoteData[]>('notes');

		// In case you prefer to load notes from localStorage
		// const notes = getLocalNotes();

		set({ notes });
	},
	addNote: (note) => {
		set((state) => {
			state.notes.push(note);

			api.post('notes', note);

			// In case you prefer to save notes to localStorage
			// setLocalNotes(state.notes);

			return {
				notes: state.notes
			};
		});
	},
	updateNote: (noteId, noteData) => {
		set((state) => {
			const note = state.notes.find(note => note.id === noteId);

			if (note) {
				if (noteData.content && note.content !== noteData.content) {
					note.content = noteData.content;
				}

				if (noteData.pos && (
					note.pos?.x !== noteData.pos.x ||
					note.pos?.y !== noteData.pos.y ||
					note.pos?.zIndex !== noteData.pos.zIndex
				)) {
					note.pos = noteData.pos;
				}

				if (noteData.size && (
					note.size?.width !== noteData.size.width ||
					note.size?.height !== noteData.size.height
				)) {
					note.size = noteData.size;
				}

				if (noteData.color && (note.color !== noteData.color)) {
					note.color = noteData.color;
				}

				api.put(`notes/${noteId}`, note);

				// In case you prefer to save notes to localStorage
				// setLocalNotes(state.notes);
			}

			return state;
		});
	},
	updateNoteIndex: (noteId, zIndex) => {
		set((state) => {
			const note = state.notes.find(note => note.id === noteId);

			if (note && zIndex) {
				note.pos.zIndex = zIndex;

				api.put(`notes/${noteId}`, note);

				// In case you prefer to save notes to localStorage
				// setLocalNotes(state.notes);
			}

			return state;
		});
	},
	removeNote: (noteId) => {
		set((state) => {
			state.notes.filter((note, index) => {
				if (note.id === noteId) {
					state.notes.splice(index, 1);
				}
			});

			api.delete(`notes/${noteId}`);

			// In case you prefer to remove the note from localStorage
			// setLocalNotes(state.notes);

			return state;
		});
	},
	setIsDragging: (value) => {
		set({ draggingNoteId: value });
	}
}));