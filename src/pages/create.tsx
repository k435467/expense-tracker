import React, { useState } from "react";
import { Switch } from "@/components/Switch";
import { InputPanel } from "@/components/InputPanel";
import { useProtectedRoute } from "@/utils/auth";
import { CategoryList, useCategoryList } from "@/components/CategoryList";

export default function Create() {
  useProtectedRoute();
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const expCat = useCategoryList("exp"); // TODO - Reset after record creation. redux
  const incoCat = useCategoryList("inco");

  return (
    <div className="flex flex-col [&>div]:flex-shrink-0 overflow-auto items-center m-auto px-6 pt-10 pb-[40rem] gap-4 h-full">
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
      />
    </div>
  );
}
