export const SessionTokenStorage = {
  storageKey: "token",
  saveToken(token) {
    return localStorage.setItem(this.storageKey, token);
  },
  getToken() {
    const token = localStorage.getItem(this.storageKey);
    if (
      token === "null" ||
      token === null ||
      token === "undefined" ||
      token === undefined ||
      token === ""
    )
      return "";
    return token;
  },
  hasToken() {
    return !!this.getToken();
  },
  removeToken() {
    return localStorage.removeItem(this.storageKey);
  },
};
