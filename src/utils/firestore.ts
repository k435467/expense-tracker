import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/index";
import { Record, ThemeMode } from "@/types";

// records cache

export const clearRecordsCache = (month?: string) => {
  if (month && window.myCache?.records?.[month]) {
    window.myCache.records[month] = undefined;
  } else {
    window.myCache = undefined;
  }
};

const lookupCache = (month: string) => {
  if (!window.myCache) {
    window.myCache = { records: {} };
  }
  return window.myCache.records[month];
};

const storeCache = (month: string, records: Record[]) => {
  if (!window.myCache) {
    window.myCache = { records: {} };
  }
  window.myCache.records[month] = records;
};

/**
 * Add a record to database. Grouped by month yyyy-mm.
 */
export const addRecord = (userId: string | undefined, record: Record) =>
  new Promise<boolean>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error adding document: userId is undefined!"));
    if (record.date.length !== 10)
      return reject(
        new Error("Error adding document: record's date is invalid!")
      );
    const month = record.date.slice(0, 7); // extract yyyy-mm
    clearRecordsCache(month);
    try {
      const userDocRef = doc(db, "users", userId);
      const listColRef = collection(userDocRef, month);
      const recordRef = await addDoc(listColRef, record);
      if (recordRef.id) {
        return resolve(true);
      }
    } catch (e) {
      return reject(new Error("Error adding document: " + e));
    }
  });

/**
 * Get records from the database.
 * Sorted by date descending then createTime descending
 * @param month yyyy-mm
 */
export const getRecords = (userId: string | undefined, month: string) =>
  new Promise<Record[]>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error getting document: userId is undefined!"));
    if (month.length !== 7)
      return reject(new Error("Error getting document: month is invalid!"));
    const cache = lookupCache(month);
    if (cache) return resolve(cache);
    else {
      try {
        const userDocRef = doc(db, "users", userId);
        const listColRef = collection(userDocRef, month);
        const querySnapshot = await getDocs(listColRef);
        let records: Record[] = [];
        querySnapshot.forEach((doc) => {
          records.push(doc.data() as Record);
        });
        records.sort((a, b) => {
          if (a.date > b.date) return -1;
          else if (a.date < b.date) return 1;
          else {
            return a.createTime > b.createTime ? -1 : 1;
          }
        });
        storeCache(month, records);
        return resolve(records);
      } catch (e) {
        return reject(new Error("Error getting document: " + e));
      }
    }
  });

/**
 * Get the ref from a certain record
 */
const getDocRefs = async (userId: string, record: Record) => {
  const userDocRef = doc(db, "users", userId);
  const listColRef = collection(
    userDocRef,
    record.date.slice(0, 7) // extract yyyy-mm
  );
  const q = query(listColRef, where("createTime", "==", record.createTime));
  const docRefs = await getDocs(q);
  return docRefs;
};

/**
 * Delete a record from database
 */
export const delRecord = (userId: string | undefined, record: Record) =>
  new Promise<boolean>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error deleting document: userId is undefined!"));
    if (!record.createTime)
      return reject(
        new Error("Error deleting document: record's createTime is invalid!")
      );
    const month = record.date.slice(0, 7); // extract yyyy-mm
    clearRecordsCache(month);
    try {
      const docRefs = await getDocRefs(userId, record);

      docRefs.forEach((doc) => {
        deleteDoc(doc.ref)
          .then(() => {
            return resolve(true);
          })
          .catch((e) => {
            return reject(e);
          });
      });
    } catch (e) {
      return reject(new Error("Error deleting document: " + e));
    }
  });

/**
 * Update the record from database
 */
export const updateRecord = (
  userId: string | undefined,
  ogRecord: Record,
  newRecord: Record
) =>
  new Promise<boolean>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error updating document: userId is undefined!"));
    if (!ogRecord.createTime)
      return reject(
        new Error("Error updating document: record's createTime is invalid!")
      );

    Promise.all([delRecord(userId, ogRecord), addRecord(userId, newRecord)])
      .then(() => {
        return resolve(true);
      })
      .catch((e) => {
        return reject(new Error("Error updating document: ", e));
      });
  });

export const getTheme = (userId: string | undefined) =>
  new Promise<ThemeMode>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error getting theme: userId is undefined!"));
    try {
      const userDocRef = doc(db, "users", userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        return resolve(docSnap.data().theme);
      } else {
        return resolve("system");
      }
    } catch (e) {
      return reject(new Error("Error getting theme: " + e));
    }
  });

export const updateTheme = (userId: string | undefined, themeMode: ThemeMode) =>
  new Promise(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error updating theme: userId is undefined!"));
    try {
      const userDocRef = doc(db, "users", userId);
      return updateDoc(userDocRef, { theme: themeMode });
    } catch (e) {
      return reject(new Error("Error updating theme: " + e));
    }
  });
