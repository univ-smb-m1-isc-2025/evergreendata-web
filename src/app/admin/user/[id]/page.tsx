"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserDocs } from "@/lib/api/admin";
import { invalidateUser } from "@/lib/api/admin";
import { SubjectFull } from "@/types/SubjectFull";
import DocumentationCard from "@/components/DocumentationCard";
import { useIsAdmin } from "@/lib/hook/UseIsAdmin";

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.id);
  const [subjects, setSubjects] = useState<SubjectFull[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const { isAdmin, loading } = useIsAdmin();

  
  useEffect(() => {
    if (!loading && !isAdmin) {
        router.push("/warning");
    } else {
        getUserDocs(userId).then(setSubjects);
    }
  }, [isAdmin, loading, router, userId]);

  const handleInvalidate = async () => {
    if (!confirm("Voulez-vous vraiment invalider cet utilisateur ?")) return;
    await invalidateUser(userId);
    alert("Utilisateur invalidé !");
    router.push("/admin");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "15%", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h3>⚙️ Actions Utilisateur</h3>
        <button onClick={handleInvalidate} style={{ backgroundColor: "#ffdddd", padding: "0.5rem" }}>
          ❌ Invalider l utilisateur
        </button>
      </div>

      <div style={{ flex: 1, padding: "1rem" }}>
        <h2>📚 Sujets Rejoints</h2>
        {subjects.length === 0 ? (
          <p>Aucun sujet trouvé.</p>
        ) : (
          subjects.map((subject) => (
            <div
              key={subject.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setExpanded(expanded === subject.id ? null : subject.id)}
              >
                <strong>{subject.title}</strong>
                <span>{expanded === subject.id ? "🔼" : "🔽"}</span>
              </div>

              {expanded === subject.id && (
                <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                  {subject.subjectsCriteria.map((criteria) => (
                    <div key={criteria.criteriaId} style={{ marginBottom: "1rem" }}>
                      <strong>{criteria.name}</strong>
                      <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                        {criteria.documentations.map((doc) => (
                          <DocumentationCard key={doc.id} documentation={doc} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
