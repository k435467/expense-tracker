import React, { useState } from "react";
import { Category } from "@/types";
import { expCategories, incoCategories, theme } from "@/utils";

type CategoryListVariant = "exp" | "inco";

export const useCategoryList = (variant: CategoryListVariant) => {
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
    variant,
  };
};

export const CategoryList: React.FC<{
  selCat: Category;
  mkHandleClk: (idx: number) => () => void;
  categories: Category[];
  variant: CategoryListVariant;
}> = ({ selCat, mkHandleClk, categories, variant }) => {
  const bg = variant === "exp" ? theme.bgR : theme.bgB;

  return (
    <div className="w-full grid grid-cols-4">
      {categories.map((cat, idx) => (
        <button
          key={cat.title}
          className={`w-full flex flex-col items-center justify-center aspect-square text-sm rounded-md ${
            cat.title === selCat.title && bg
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
