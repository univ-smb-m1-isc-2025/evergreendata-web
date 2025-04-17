'use client';

import { useEffect, useState } from 'react';
import { getSubjectById } from '@/lib/api/subject';
import { useParams } from 'next/navigation';
import { SubjectFull } from '@/types/SubjectFull';
import CriteriaCard from '@/components/SubjectCriteriaCard';
import DeputyCard from '@/components/DeputyCard';

export default function SubjectPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const [subject, setSubject] = useState<SubjectFull | null>(null);

  const loadSubjectAgain = async () => {
    try {
      const data = await getSubjectById(id);
      setSubject(data);
    } catch (err) {
      console.error('Erreur lors du chargement du sujet:', err);
    }
  };

  useEffect(() => {
    loadSubjectAgain();
  }, [loadSubjectAgain]);

  if (!subject) return <div>Chargement...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{subject.title}</h1>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h2>Députés</h2>
          {subject.deputies.map((deputy) => (
            <DeputyCard key={deputy.id} deputy={deputy} />
          ))}
        </div>
        <div style={{ flex: 2 }}>
          <h2>Critères</h2>
          {subject.subjectsCriteria.map((criteria) => (
            <CriteriaCard
              key={criteria.criteriaId}
              criteria={criteria}
              subjectId={subject.id}
              onUpdate={loadSubjectAgain}
              edit={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
