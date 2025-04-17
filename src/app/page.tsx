"use client";
import { getAllSubjects } from '@/lib/api/subject';
import { Subject } from '@/types/Subject';
import { useEffect, useState } from 'react'

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    console.log("test log ?");
    getAllSubjects()
      .then(setSubjects)
      .catch((err) => {
        console.error("Erreur lors du chargement des sujets :", err);
      });
  }, []);

  return (
    <div>
      <p>update ?</p>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>
             {subject.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
