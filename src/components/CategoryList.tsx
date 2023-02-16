import React, { useState } from "react";
import { Category } from "@/types";
import { expCategories, incoCategories } from "@/utils";

export const useCategoryList = (variant: "exp" | "inco") => {
  const categories = variant === "exp" ? expCategories : incoCategories;

  const [selCat, setSelCat] = useState<Category>(categories[0]);

  const mkHandleClk = (idx: number) => () => {
    setSelCat(categories[idx]);
  };

  return {
    selCat,
    setSelCat,
    mkHandleClk,
    categories,
  };
};

export const CategoryList: React.FC<{
  selCat: Category;
  mkHandleClk: (idx: number) => () => void;
  categories: Category[];
}> = ({ selCat, mkHandleClk, categories }) => {
  return (
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
  );
};
