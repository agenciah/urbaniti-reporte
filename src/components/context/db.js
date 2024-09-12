// db.js
export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('reportDatabase', 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('reportData', { keyPath: 'id' });
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  
  export const saveData = async (data) => {
    const db = await openDB();
    const transaction = db.transaction('reportData', 'readwrite');
    const store = transaction.objectStore('reportData');
    store.put(data);
  };
  
  export const getData = async (id) => {
    const db = await openDB();
    const transaction = db.transaction('reportData', 'readonly');
    const store = transaction.objectStore('reportData');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  