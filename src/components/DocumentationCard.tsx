'use client';

import { Documentation } from '@/types/Documentation';

export default function DocumentationCard({ documentation }: { documentation: Documentation }) {
  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    author: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    content: {
      fontSize: '0.9rem',
      marginTop: '0.5rem',
    },
    date: {
      fontSize: '0.8rem',
      color: '#777',
      marginTop: '0.5rem',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.author}>
        {documentation.author.firstName} {documentation.author.lastName}
      </div>
      <div style={styles.content}>{documentation.content}</div>
      <div style={styles.date}>{new Date(documentation.date).toLocaleString()}</div>
    </div>
  );
}
