import { Subject } from '@/types/Subject';
import { SubjectCriteria } from '@/types/SubjectCriteria';
import { getToken } from '@/lib/local';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function getJoinedSubjects(): Promise<Subject[]> {
  const token = getToken();
  const res = await fetch(`${API_BASE}api/user/subject/joined`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer les sujets.");
  }

  return res.json();
}

export interface ResponseBody {
  subjectId: number;
  criteriaId: number;
  content: string;
}

export async function respondToCriteria(body: ResponseBody): Promise<SubjectCriteria> {
  const token = getToken();
  const res = await fetch(`${API_BASE}api/user/subject/response`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Échec de l'envoi de la réponse.");
  }

  return res.json();
}
