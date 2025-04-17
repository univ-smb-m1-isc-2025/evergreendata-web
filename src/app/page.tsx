"use client";

import SubjectCard from '@/components/SubjectCard';
import { getAllSubjects } from '@/lib/api/subject';
import { Subject } from '@/types/Subject';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useIsAdmin } from '@/lib/hook/UseIsAdmin';

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAdmin, loading } = useIsAdmin(); // Utilisation du hook pour vérifier si l'utilisateur est admin

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    getAllSubjects()
      .then(setSubjects)
      .catch((err) => {
        console.error("Erreur lors du chargement des sujets :", err);
      });
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    height: "100%",
  };

  const sidebarStyle: React.CSSProperties = {
    width: '220px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRight: '1px solid #ddd',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    padding: '2rem',
  };

  if (loading) {
    return <div>Chargement...</div>; // Afficher pendant que la vérification du rôle est en cours
  }

  return (
    <div style={containerStyle}>
      {isLoggedIn && (
        <div style={sidebarStyle}>
          <h3 style={{ marginBottom: '1rem' }}>Espace Utilisateur</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link href="/user/subjects" style={{ textDecoration: 'none', color: '#0070f3' }}>
                Mes Sujets Rejoints
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin" style={{ textDecoration: 'none', color: '#0070f3' }}>
                  Panneau d Administration
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
      <main style={mainStyle}>
        <h1 style={{ marginBottom: '1rem' }}>Tous les Sujets</h1>
        <ul>
          {subjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </ul>
      </main>
    </div>
  );
}
