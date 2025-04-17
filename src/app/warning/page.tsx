"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WarningPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');  // Redirige vers la page de connexion après 5 secondes
    }, 5000); // Délai de 5 secondes avant la redirection

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>Avertissement !</h1>
      <p style={{ fontSize: '1.2rem' }}>Vous devez être connecté pour accéder à cette page.</p>
      <p style={{ fontSize: '1rem', color: '#555' }}>Vous allez être redirigé vers la page de connexion.</p>
    </div>
  );
}
