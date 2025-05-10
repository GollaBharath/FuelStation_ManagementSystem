// src/api/hello.ts
const API_BASE = import.meta.env.VITE_API_URL;

export const fetchMessage = async () => {
  const res = await fetch(`${API_BASE}/`);
  const data = await res.text();
  return data;
};
