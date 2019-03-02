class LocalStorage {
  
  setItem(key, item) {
    localStorage.ssetItem(key, JSON.stringify(item));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default new LocalStorage();