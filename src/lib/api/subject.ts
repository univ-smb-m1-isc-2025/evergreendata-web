import { Subject } from "@/types/Subject";
import { SubjectFull } from "@/types/SubjectFull";

import { getApiUrl } from "../getApi";

const API_BASE = getApiUrl();

export async function getAllSubjects(): Promise<Subject[]> {
  const res = await fetch(`${API_BASE}api/subject/all`);
  if (!res.ok) throw new Error("Erreur lors du chargement des sujets.");
  return await res.json();
}

export async function getSubjectById(id: number): Promise<SubjectFull> {
  const res = await fetch(`${API_BASE}api/subject/${id}`);
  if (!res.ok) throw new Error("Sujet introuvable.");
  return await res.json();
}