import axios from "axios";
import type { Note, NewNote } from "../types/note";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await noteHubApi.post<Note>("/notes", newNote);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteHubApi.get<Note>(`/notes/${id}`);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteHubApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const getNotesByTag = async (
  page: number = 1,
  search: string = "",
  tag?: string,
): Promise<NoteResponse> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = {
    page,
    perPage: 12,
  };

  if (search.trim()) {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }

  const response = await noteHubApi.get<NoteResponse>("/notes", {
    params,
  });

  return response.data;
};
