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
      />
    </div>
  );
}
