'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    header: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#f3f3f3',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    side: {
      width: '20%',
      display: 'flex',
      alignItems: 'center',
    },
    center: {
      flex: 1,
      textAlign: 'center' as const,
      fontWeight: 'bold',
      fontSize: '4rem',
      display: "flex",
      alignItems: "start"
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
    logo: {
      height: '100px',
      borderRadius: '20%',
    },
    logoutButton: {
      backgroundColor: '#e53e3e',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        
        <div style={styles.side}>
          <img 
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F15%2F07%2Fe41507353fe4d67781acd67129594b08.jpg&f=1&nofb=1&ipt=2629a70bd603d8dec309a9676d3891211ceecd1a0047534170d90450e1d575d8" 
            alt="Logo"
            style={styles.logo}
            onClick={() => window.location.href = "/"}
          />
        </div>

        <div style={styles.center}>Evergreen Data</div>

        <div style={{ ...styles.side, justifyContent: 'flex-end' }}>
          {isLoggedIn ? (
            <button style={styles.logoutButton} onClick={handleLogout}>
              Déconnexion
            </button>
          ) : (
            <button style={styles.button} onClick={() => {window.location.href = "/auth/login"}}>Se connecter</button>
          )}
        </div>
      </div>
    </header>
  );
}
