export const USER = 'freeUser'
export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
  has(key) {
    return localStorage.hasOwnProperty(key);
  },
  getToken() {
    const res = localStorage.getItem(USER);
    if (res) {
      return JSON.parse(res).token;
    } else {
      return res;
    }
  },
  removeToken() {
    localStorage.removeItem(USER);
  }
}
