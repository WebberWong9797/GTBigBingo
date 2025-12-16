// utils/assetStorage.ts
// IndexedDB storage for uploaded assets

const DB_NAME = 'GTBigBingoAssets';
const STORE_NAME = 'assets';
const DB_VERSION = 1;

interface StoredAsset {
  id: string;
  fileData: ArrayBuffer;
  fileName: string;
  fileType: string;
  createdAt: number;
}

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// Store asset in IndexedDB
export const storeAsset = async (id: string, file: File): Promise<void> => {
  const db = await initDB();
  const arrayBuffer = await file.arrayBuffer();
  
  const asset: StoredAsset = {
    id,
    fileData: arrayBuffer,
    fileName: file.name,
    fileType: file.type,
    createdAt: Date.now()
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(asset);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Retrieve asset from IndexedDB
export const getAsset = async (id: string): Promise<File | null> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const asset = request.result as StoredAsset | undefined;
      if (!asset) {
        resolve(null);
        return;
      }

      const file = new File([asset.fileData], asset.fileName, { type: asset.fileType });
      resolve(file);
    };
  });
};

// Get all asset IDs from IndexedDB
export const getAllAssetIds = async (): Promise<string[]> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const keys = request.result as string[];
      resolve(keys);
    };
  });
};

// Remove asset from IndexedDB
export const removeAssetFromStorage = async (id: string): Promise<void> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Clear all assets from IndexedDB
export const clearAllAssets = async (): Promise<void> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Get count of stored assets
export const getAssetCount = async (): Promise<number> => {
  const ids = await getAllAssetIds();
  return ids.length;
};

