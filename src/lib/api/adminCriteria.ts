import { Criteria } from "@/types/Criteria";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCriteria(): Promise<Criteria[]> {
    const res = await fetch(`${BASE_URL}api/admin/criteria/all`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Erreur lors du chargement des critères.");
    return res.json();
}
  

export async function createCriteria(name: string): Promise<Criteria> {
    const res = await fetch(`${BASE_URL}api/admin/criteria/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
  
    if (!res.ok) throw new Error("Erreur lors de la création du critère.");
    return res.json();
  }

  export async function deleteCriteria(criteriaId: number): Promise<void> {
    const res = await fetch(`${BASE_URL}api/admin/criteria/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ criteriaId }),
    });
  
    if (!res.ok) throw new Error("Erreur lors de la suppression du critère.");
  }