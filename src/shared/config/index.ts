function getEnv(key: string): string | null {
  const env = import.meta.env[key] as unknown;

  if (!env) {
    return null;
  }

  return env as string;
}

export const API_URL =
  getEnv('VITE_API_URL') || `${window.location.origin}/api/`;
