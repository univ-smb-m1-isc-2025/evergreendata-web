import { SubjectFull } from "@/types/SubjectFull";
import { User } from "@/types/User";
import { getApiUrl } from "../getApi";

const BASE_URL = getApiUrl();

export async function invalidateUser(userId: number): Promise<void> {
    const res = await fetch(`${BASE_URL}api/admin/invalid`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Échec de l'invalidation de l'utilisateur.");
}


export async function getUserDocs(id: number): Promise<SubjectFull[]> {
    const res = await fetch(`${BASE_URL}api/admin/userDoc/${id}`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Erreur lors du chargement des documents de l'utilisateur.");
    return res.json();
}


export async function getAllUser(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}api/admin/user/all`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Erreur lors du chargement des documents de l'utilisateur.");
    return res.json();
}

