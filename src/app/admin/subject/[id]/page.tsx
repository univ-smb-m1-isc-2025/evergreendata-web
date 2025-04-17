"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  assignCriteria,
  assignDeputy,
} from "@/lib/api/adminSubject";
import SubjectCriteriaCard from "@/components/SubjectCriteriaCard";
import { getSubjectById } from "@/lib/api/subject";
import { notifyDeputies } from "@/lib/api/adminSubject";
import { getAllCriteria } from "@/lib/api/adminCriteria";
import { getAllUser } from "@/lib/api/admin";
import { SubjectFull } from "@/types/SubjectFull";
import { Criteria } from "@/types/Criteria";
import { User } from "@/types/User";
import DeputyCard from "@/components/DeputyCard";
import { useIsAdmin } from "@/lib/hook/UseIsAdmin";

export default function AdminSubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [subject, setSubject] = useState<SubjectFull | null>(null);
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCriteriaId, setSelectedCriteriaId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

const { isAdmin, loading } = useIsAdmin();
  
  const subjectId = Number(params.id);

  const loadSubject = async () => {
    const s = await getSubjectById(subjectId);
    setSubject(s);
  };

  useEffect(() => {
    if (!loading && !isAdmin) {
        router.push("/warning");
    } else {
        loadSubject();
        getAllCriteria().then(setCriteriaList);
        getAllUser().then(setUsers);
    }
  }, [isAdmin, loading, router, subjectId]);

  const handleNotify = async () => {
    await notifyDeputies(subjectId);
    alert("Notification envoyée !");
  };

  const handleAssignCriteria = async () => {
    if (!selectedCriteriaId) return;
    await assignCriteria(subjectId, selectedCriteriaId);
    setSelectedCriteriaId(null);
    loadSubject();
  };


  const handleAssignDeputy = async () => {
    if (!selectedUserId) return;
    await assignDeputy(subjectId, selectedUserId);
    setSelectedUserId(null);
    loadSubject();
  };

  if (!subject) return <div>Chargement...</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "20%", padding: "1rem", borderRight: "1px solid #ddd" }}>
        <h3>Actions</h3>
        <button onClick={handleNotify} style={{ marginBottom: "1rem" }}>
          Notifier les utilisateurs
        </button>

        <div style={{ marginBottom: "1rem" }}>
          <select
            value={selectedCriteriaId || ""}
            onChange={(e) => setSelectedCriteriaId(Number(e.target.value))}
          >
            <option value="">-- Ajouter un critère --</option>
            {criteriaList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button onClick={handleAssignCriteria}>Ajouter</button>
        </div>

        <div>
          <select
            value={selectedUserId || ""}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
          >
            <option value="">-- Ajouter un utilisateur --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
          <button onClick={handleAssignDeputy}>Ajouter</button>
        </div>
      </div>


      <div style={{ width: "50%", padding: "1rem", borderRight: "1px solid #ddd" }}>
        <h2>{subject.title}</h2>

        <h3>📝 Critères</h3>
        <ul>
          {subject.subjectsCriteria.map((sc) => (
            <SubjectCriteriaCard
                key={sc.criteriaId}
                criteria={sc}
                subjectId={subject.id}
                onUpdate={() => {}}
                edit={false}
            />
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: "1rem" }}>
        <h3>Deputies</h3>
        <ul>
          {subject.deputies.map((d) => (
            <div key={d.id} onClick={()=> router.push("/admin/user/" + d.id)}><DeputyCard deputy={d}/></div>
          ))}
        </ul>
      </div>
    </div>
  );
}
