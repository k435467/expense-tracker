import React, { useState } from "react";
import { Switch } from "@/components/Switch";
import { InputPanel } from "@/components/InputPanel";
import { CategoryList, useCategoryList } from "@/components/CategoryList";
import { Record } from "@/types";

export const RecordEditor: React.FC<{ record?: Record }> = ({ record }) => {
  const [isIncome, setIsIncome] = useState<boolean>((record?.money ?? -1) > 0);
  const expCat = useCategoryList("exp", record?.category); // TODO - Reset after record creation. redux
  const incoCat = useCategoryList("inco", record?.category);

  return (
    <div className="m-auto flex h-full flex-col items-center gap-4 overflow-auto px-6 pt-10 pb-[40rem] [&>div]:flex-shrink-0">
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
