export const SessionTokenStorage = {
  storageKey: "token",
  saveToken(token) {
    return localStorage.setItem(this.storageKey, token);
  },
  getToken() {
    return localStorage.getItem(this.storageKey);
  },
  hasToken() {
    return !!this.getToken();
  },
  removeToken() {
    return localStorage.removeItem(this.storageKey);
  },
};
