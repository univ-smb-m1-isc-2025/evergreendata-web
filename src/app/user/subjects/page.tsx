'use client';

import { useEffect, useState } from "react";
import { Subject } from "@/types/Subject";
import { getJoinedSubjects } from "@/lib/api/userSubject";
import SubjectCard from "@/components/SubjectCard";
import useAuthRedirect from "@/lib/hook/UseAuthRedirect";

export default function JoinedSubjectsPage() {
useAuthRedirect();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJoinedSubjects()
      .then(setSubjects)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sujets rejoints</h1>
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
