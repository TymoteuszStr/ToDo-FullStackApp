
const ID_TOKEN_KEY = "id_token";

export function getToken(): string | null {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export function saveToken(token: string): void {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export function destroyToken(): void {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
