import React, { useEffect, useState } from "react";
import { useInputMonth } from "@/utils/input";
import { RecordItem } from "@/components/RecordItem";
import { getRecords } from "@/utils/firestore";
import { useAuth, useProtectedRoute } from "@/utils/auth";
import { Record } from "@/types";

export default function List() {
  useProtectedRoute();
  const { user } = useAuth();
  const { month, handleChange } = useInputMonth();
  const [records, setRecords] = useState<Record[]>([]);
  const [total, setTotal] = useState<number>(0);

  // TODO - cache

  useEffect(() => {
    console.log(month); // TODO - remove
    if (user?.uid) {
      getRecords(user.uid, month)
        .then((res) => {
          let t = 0;
          res.forEach((v) => {
            t += v.money;
          });
          setTotal(t);
          setRecords(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [month, user?.uid || ""]);

  return (
    <div className="flex flex-col items-center m-auto p-6 pt-10 pb-12 gap-4 h-full">
      <input
        type="month"
        min="2000-01"
        max="2100-01"
        value={month}
        onChange={handleChange}
      />

      <div>{total.toLocaleString("en-US")}</div>

      <div className="flex flex-col overflow-auto items-center gap-4 wider-box">
        {records.map((record) => (
          <RecordItem key={record.uid} {...record} />
        ))}
        {records.length === 0 && <div>No Records</div>}
        <div className="h-10 flex-shrink-0" />
      </div>
    </div>
  );
}
