// utils/indexedDB.js

export const openDB = (dbName, storeName) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(storeName, { keyPath: "id" });
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject("Error opening IndexedDB");
      };
    });
  };
  
  export const storeDataInIndexedDB = async (dbName, storeName, data) => {
    const db = await openDB(dbName, storeName);
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    store.put({ id: "movies", ...data });
  };
  
  export const getDataFromIndexedDB = async (dbName, storeName) => {
    const db = await openDB(dbName, storeName);
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
  
    return new Promise((resolve, reject) => {
      const request = store.get("movies");
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject("Error fetching data from IndexedDB");
      };
    });
  };
  