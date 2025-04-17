import { LogInBody, SignInBody, Token } from "@/types/Auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function signIn(data: SignInBody): Promise<Token> {
  const res = await fetch(`${API_BASE}api/auth/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de l'inscription.");
  }

  return res.json();
}

export async function logIn(data: LogInBody): Promise<Token> {
  const res = await fetch(`${API_BASE}api/auth/logIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la connexion.");
  }

  return res.json();
}
