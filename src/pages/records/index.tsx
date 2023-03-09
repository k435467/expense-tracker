import React, { useEffect, useState } from "react";
import { useInputMonth } from "@/utils/input";
import { RecordItem } from "@/components/RecordItem";
import { delRecord, getRecords } from "@/utils/firestore";
import { useAuth } from "@/utils/auth";
import { useListSelect, theme } from "@/utils";
import { Record } from "@/types";
import { Modal } from "@/components/Modal";
import { useAppDispatch } from "@/redux/store";
import { showToast } from "@/redux/toastSlice";
import { edit } from "@/redux/recordEditorSlice";
import { useRouter } from "next/router";

export default function Records() {
  const { user } = useAuth();
  const { month, handleChange } = useInputMonth();
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const lsSel = useListSelect();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // TODO - analyse

  // Fetch records
  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [month, user?.uid || ""]);

  const handleDelete = () => {
    setShowModal(false);
    delRecord(user?.uid, records[lsSel.sel])
      .then(() => {
        const newRecords = [...records];
        newRecords.splice(lsSel.sel, 1);
        setRecords(newRecords);
        lsSel.reset();
        dispatch(showToast("Delete Successfully!"));
      })
      .catch(() => {
        dispatch(showToast("Failed to Delete!"));
      });
  };

  const handleEdit = () => {
    dispatch(edit(records[lsSel.sel]));
    router.push(`${router.asPath}/edit`);
  };

  return (
    <div className="m-auto flex h-full flex-col items-center gap-4 p-6 pt-10 pb-12">
      <input
        type="month"
        min="2000-01"
        max="2100-01"
        value={month}
        onChange={(e) => {
          handleChange(e);
          lsSel.reset();
        }}
        className="flex-shrink-0"
      />

      {records.length > 0 && (
        <div className="flex-shrink-0">${total.toLocaleString("en-US")}</div>
      )}

      <div className="flex w-full flex-col items-center gap-4">
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          (records.length === 0 ? (
            <div>No Records</div>
          ) : (
            records.map((record, idx) => (
              <RecordItem
                key={record.createTime}
                {...record}
                onClick={lsSel.mkHandleSel(idx)}
                isSelected={lsSel.sel === idx}
                onDelete={() => {
                  setShowModal(true);
                }}
                onEdit={handleEdit}
              />
            ))
          ))}
        {records.length > 0 && (
          <div className="text-slate-300">{`${records.length} Result(s)`}</div>
        )}
        <div className="h-28 flex-shrink-0" />
      </div>

      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="text-center text-xl">Confirm Deletion?</div>
          <div className="text-center">{records[lsSel.sel]?.date}</div>
          <div className="text-center">
            ${records[lsSel.sel]?.money?.toLocaleString("en-US")}
          </div>
          <div className="text-center">{records[lsSel.sel]?.title}</div>
          <button
            onClick={handleDelete}
            className={`w-full text-white ${theme.btn} ${theme.bT} ${theme.bgDangerous}`}
          >
            DELETE
          </button>
        </div>
      </Modal>
    </div>
  );
}
