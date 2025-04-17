'use client';

import { Subject } from '@/types/Subject';
import { useRouter } from 'next/navigation';

export default function SubjectCard({ subject }: { subject: Subject }) {
  const router = useRouter();

  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '1rem',
      margin: '1rem 0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    id: {
      fontSize: '0.9rem',
      color: '#777',
    },
  };

  const handleClick = () => {
    router.push(`/subject/${subject.id}`);
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <div style={styles.title}>{subject.title}</div>
      <div style={styles.id}>ID: {subject.id}</div>
    </div>
  );
}