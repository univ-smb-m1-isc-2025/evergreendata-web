'use client';

import { User } from '@/types/User';

export default function AuthorCard({ author }: { author: User }) {
  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    name: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    role: {
      fontSize: '1rem',
      color: '#777',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.name}>{author.firstName} {author.lastName}</div>
      <div style={styles.role}>{author.role}</div>
    </div>
  );
}
