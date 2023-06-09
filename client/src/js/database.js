import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//strater code: export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  // const db = await initdb();
  // const tx = db.transaction('jate', 'readwrite');
  // const store = tx.objectStore('jate');
  // const result = await store.put({ iid: Date.now(), todo: content });
  // await tx.done;

  // return result;
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
//starter code: export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('result.value', result);
  await tx.done;

  return result > 0 ? result[0] : null;
};

initdb();
