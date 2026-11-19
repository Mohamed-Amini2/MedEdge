export const API_URL = import.meta.env.VITE_API_URL ?? "";

export type StoredUser = {
  id?: string;
  name?: string;
  email?: string;
};

export const getStoredUser = (): StoredUser | null => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
};

export const firstName = (user: StoredUser | null, fallback: string) =>
  user?.name?.trim().split(/\s+/)[0] || fallback;

export const logoutRequest = async () => {
  try {
    await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
  } catch {
    localStorage.removeItem("user");
  }
  localStorage.removeItem("user");
};

export const apiPost = async (path: string, body: unknown) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: false, error: text || `HTTP ${res.status}` };
  }
  return { ...data, _status: res.status } as {
    success: boolean;
    error?: string;
    code?: string;
    data?: any;
    details?: { message: string }[];
    _status: number;
  };
};
