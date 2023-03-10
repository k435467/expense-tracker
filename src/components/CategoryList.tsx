import React, { useState } from "react";
import { Category } from "@/types";
import { expCategories, incoCategories, theme } from "@/utils";

type CategoryListVariant = "exp" | "inco";

/**
 * @param init category title
 */
export const useCategoryList = (
  variant: CategoryListVariant,
  init?: string
) => {
  const categories = variant === "exp" ? expCategories : incoCategories;

  const getInit = () => {
    if (init) {
      return categories.find((v) => v.title === init) ?? categories[0];
    }
    return categories[0];
  };

  const [selCat, setSelCat] = useState<Category>(() => getInit());

  const mkHandleClk = (idx: number) => () => {
    setSelCat(categories[idx]);
  };

  const reset = () => {
    setSelCat(getInit());
  };

  return {
    selCat,
    setSelCat,
    mkHandleClk,
    categories,
    variant,
    reset,
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
