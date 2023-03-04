import React, { useEffect, useState } from "react";
import { Switch } from "@/components/Switch";
import { InputPanel } from "@/components/InputPanel";
import { CategoryList, useCategoryList } from "@/components/CategoryList";
import { Record } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { markOutReset, selectRecordEditor } from "@/redux/recordEditorSlice";

export const RecordEditor: React.FC<{ record?: Record }> = ({ record }) => {
  const [isIncome, setIsIncome] = useState<boolean>((record?.money ?? -1) > 0);
  const expCat = useCategoryList("exp", record?.category);
  const incoCat = useCategoryList("inco", record?.category);

  // reset cat when a record is created or updated
  const { reset } = useAppSelector(selectRecordEditor);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (reset) {
      expCat.reset();
      dispatch(markOutReset());
    }
  }, [reset]);

  return (
    <div className="flex flex-col items-center gap-4 overflow-auto px-6 pt-10 pb-[40rem] [&>div]:flex-shrink-0">
      <Switch l="Expense" r="Income" value={isIncome} setValue={setIsIncome} />

      <div className={`w-full ${isIncome && "hidden"}`}>
        <CategoryList {...expCat} />
      </div>
      <div className={`w-full ${!isIncome && "hidden"}`}>
        <CategoryList {...incoCat} />
      </div>

      <InputPanel
        selCat={isIncome ? incoCat.selCat : expCat.selCat}
        isIncome={isIncome}
        record={record}
      />
    </div>
  );
};
