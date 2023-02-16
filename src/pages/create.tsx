import React, { useState } from "react";
import { Switch } from "@/components/Switch";
import { CreatePanel } from "@/components/CreatePanel";
import { useProtectedRoute } from "@/utils/auth";
import { Category } from "@/types";
import { categories } from "@/utils";

export default function Create() {
  useProtectedRoute();
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [selCat, setSelCat] = useState<Category>(categories[0]);

  const mkHandleClk = (idx: number) => () => {
    setSelCat(categories[idx]);
  };

  return (
    <div className="flex flex-col [&>div]:flex-shrink-0 overflow-auto items-center m-auto px-6 pt-10 pb-[32rem] gap-4 h-full">
      <Switch l="Expense" r="Income" value={isIncome} setValue={setIsIncome} />

      <div className="w-full grid grid-cols-4">
        {categories.map((cat, idx) => (
          <button
            key={cat.title}
            className={`w-full flex flex-col items-center justify-center aspect-square text-sm ${
              cat.title === selCat.title && "bg-slate-100 rounded-md"
            }`}
            onClick={mkHandleClk(idx)}
          >
            <cat.Icon className="text-3xl" />
            {cat.title}
          </button>
        ))}
      </div>

      <CreatePanel selCat={selCat} isIncome={isIncome} />
    </div>
  );
}
