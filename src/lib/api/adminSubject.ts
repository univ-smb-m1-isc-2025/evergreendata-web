import { getApiUrl } from "../getApi";

const BASE_URL = getApiUrl();


const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export async function createSubject(title: string) {
  const res = await fetch(`${BASE_URL}api/create`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Erreur lors de la création du sujet");
  return res.json();
}

export async function deleteSubject(subjectId: number) {
  const res = await fetch(`${BASE_URL}api/delete`, {
    method: "DELETE",
    headers: authHeader(),
    body: JSON.stringify({ subjectId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du sujet");
}

export async function notifyDeputies(subjectId: number) {
  const res = await fetch(`${BASE_URL}api/admin/subject/notify`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ subjectId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la notification des députés");
}

export async function assignDeputy(subjectId: number, userId: number) {
  const res = await fetch(`${BASE_URL}api/admin/subject/deputy/assign`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ subjectId, userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de l’assignation du député");
  return res.json();
}


export async function removeDeputy(subjectId: number, userId: number) {
  const res = await fetch(`${BASE_URL}api/admin/subject/deputy/remove`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ subjectId, userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du député");
}

export async function assignCriteria(subjectId: number, criteriaId: number) {
  const res = await fetch(`${BASE_URL}api/admin/subject/criteria/assign`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ subjectId, criteriaId }),
  });
  if (!res.ok) throw new Error("Erreur lors de l’assignation du critère " + res.body);
  return res.json();
}


export async function removeCriteria(subjectId: number, criteriaId: number) {
  const res = await fetch(`${BASE_URL}api/admin/subject/criteria/remove`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ subjectId, criteriaId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du critère");
}
