import { NoteData } from "../components/Note";

const LOCAL_STORAGE_KEY = "sticky-notes-data";

export const getLocalNotes = () => {
	const localData = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "";

	return JSON.parse(localData);
};

export const setLocalNotes = (data: NoteData[]) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};