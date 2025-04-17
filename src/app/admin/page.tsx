"use client";

import { useEffect, useState } from "react";
import { createCriteria, deleteCriteria, getAllCriteria } from "@/lib/api/adminCriteria";
import { getAllSubjects } from "@/lib/api/subject";
import { useRouter } from "next/navigation";
import { Criteria } from "@/types/Criteria";
import { Subject } from "@/types/Subject";
import { useIsAdmin } from "@/lib/hook/UseIsAdmin";

export default function AdminPanel() {
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newCriteria, setNewCriteria] = useState("");
  const { isAdmin, loading } = useIsAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/warning");
    } else {
      loadCriteria();
      loadSubjects();
    }
  }, [isAdmin, loading, router]);

  const loadCriteria = async () => {
    const data = await getAllCriteria();
    setCriteria(data);
  };

  const loadSubjects = async () => {
    const data = await getAllSubjects();
    setSubjects(data);
  };

  const handleAddCriteria = async () => {
    if (newCriteria.trim() === "") return;
    await createCriteria(newCriteria);
    setNewCriteria("");
    loadCriteria();
  };

  const handleDeleteCriteria = async (id: number) => {
    await deleteCriteria(id);
    loadCriteria();
  };

  const handleSubjectClick = (id: number) => {
    router.push(`/admin/subject/${id}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", padding: "2rem", borderRight: "1px solid #ccc" }}>
        <h2>🗂️ Admin Panel</h2>

        <div style={{ marginBottom: "2rem" }}>
          <button onClick={() => router.push("/")} style={{ marginBottom: "1rem" }}>
            📚 Voir tous les sujets
          </button>
        </div>

        <div>
          <h3>Critères</h3>
          <input
            type="text"
            value={newCriteria}
            onChange={(e) => setNewCriteria(e.target.value)}
            placeholder="Nouveau critère"
          />
          <button onClick={handleAddCriteria}>➕ Ajouter</button>
          <ul>
            {criteria.map(c => (
              <li key={c.id} style={{ display: "flex", justifyContent: "space-between" }}>
                {c.name}
                <button onClick={() => handleDeleteCriteria(c.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <h2>📄 Liste des Sujets</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {subjects.map(subject => (
            <li
              key={subject.id}
              onClick={() => handleSubjectClick(subject.id)}
              style={{
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "1rem",
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            >
              {subject.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
