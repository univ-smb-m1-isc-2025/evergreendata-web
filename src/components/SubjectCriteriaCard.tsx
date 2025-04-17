import { useState } from 'react';
import { respondToCriteria, ResponseBody } from '@/lib/api/userSubject';
import { getToken } from '@/lib/local';
import { SubjectCriteria } from '@/types/SubjectCriteria';
import DocumentationCard from './DocumentationCard';

export default function SubjectCriteriaCard({ criteria, subjectId, onUpdate, edit }: {
  criteria: SubjectCriteria;
  subjectId: number;
  onUpdate: () => void;
  edit: boolean;
}) {
  const [showDocs, setShowDocs] = useState(false);
  const [newContent, setNewContent] = useState('');
  const token = getToken();

  const handleSubmit = async () => {
    if (!newContent.trim()) return;

    const body: ResponseBody = {
      subjectId,
      criteriaId: criteria.criteriaId,
      content: newContent,
    };

    try {
      await respondToCriteria(body);
      setNewContent('');
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '1rem' }}>
      <h3 style={{ fontSize: '1.2rem' }}>{criteria.name}</h3>

      <button onClick={() => setShowDocs(!showDocs)} style={{ marginBottom: '1rem' }}>
        {showDocs ? 'Cacher' : 'Afficher'} les documentations ({criteria.documentations.length})
      </button>

      {showDocs && (
        <div style={{ marginLeft: '1rem' }}>
          {criteria.documentations.map(doc => (
            <DocumentationCard key={doc.id} documentation={doc} />
          ))}
        </div>
      )}

      {(token != null && edit) && (
        <div style={{ marginTop: '1rem' }}>
          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="Ajouter votre documentation"
            style={{ width: '100%', height: '100px', padding: '0.5rem' }}
          />
          <button onClick={handleSubmit} style={{
            marginTop: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem'
          }}>
            Soumettre
          </button>
        </div>
      )}
    </div>
  );
}
