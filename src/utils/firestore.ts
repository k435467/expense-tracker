import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/index";
import { Record } from "@/types";

/**
 * Add a record to database. Grouped by month yyyy-mm.
 */
export const addRecord = (userId: string | undefined, record: Record) => {
  return new Promise<boolean>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error adding document: userId is undefined!"));
    if (record.date.length !== 10)
      return reject(
        new Error("Error adding document: record's date is invalid!")
      );
    try {
      const userDocRef = doc(db, "users", userId);
      const listColRef = collection(
        userDocRef,
        record.date.slice(0, 7) // extract yyyy-mm
      );
      const recordRef = await addDoc(listColRef, record);
      if (recordRef.id) {
        return resolve(true);
      }
    } catch (e) {
      return reject(new Error("Error adding document: " + e));
    }
  });
};

/**
 * Get records from the database.
 * 
 * Sorted by date descending then createTime descending
 * 
 * @param month yyyy-mm
 */
export const getRecords = (userId: string | undefined, month: string) => {
  console.log("dbg getRecords");
  return new Promise<Record[]>(async (resolve, reject) => {
    if (!userId)
      return reject(new Error("Error getting document: userId is undefined!"));
    if (month.length !== 7)
      return reject(new Error("Error getting document: month is invalid!"));
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
      return resolve(records);
    } catch (e) {
      return reject(new Error("Error getting document: " + e));
    }
  });
};
