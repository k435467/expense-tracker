import React from "react";
import { Record } from "@/types";
import { categories } from "@/utils";

export const RecordItem: React.FC<Record> = ({
  category,
  date,
  money,
  title,
}) => {
  const cat = categories.find((v) => v.title === category) || categories[0];

  return (
    <div className="flex flex-col border rounded-md w-full p-2 gap-2">
      <div className="flex justify-between">
        <div>{date}</div>
        <div>${money.toLocaleString("en-US")}</div>
      </div>

      <div className="flex items-center">
        <cat.Icon className="text-xl flex-shrink-0" />
        <div className="ml-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
      </div>
    </div>
  );
};
