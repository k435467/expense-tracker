import React, { useEffect, useRef } from "react";
import { clearEdit, selectRecordEditor } from "@/redux/recordEditorSlice";
import { RecordEditor } from "@/components/RecordEditor";
import { useAppSelector, useAppDispatch } from "@/redux/store";

export default function RecordEditorPage() {
  const dispatch = useAppDispatch();
  const { og } = useAppSelector(selectRecordEditor);
  const pageInit = useRef(true);

  // clear when leaving page
  useEffect(
    () => () => {
      if (pageInit.current) {
        pageInit.current = false;
      } else {
        pageInit.current = true;
        dispatch(clearEdit());
      }
    },
    []
  );

  if (!og?.createTime) {
    return <div className="w-full text-center">Loading...</div>;
  }
  return <RecordEditor record={og} />;
}
