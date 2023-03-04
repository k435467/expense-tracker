import React from "react";
import { theme } from "@/utils";

const btnCls = "p-1.5 text-base rounded";

export const Switch: React.FC<{
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  l: string;
  r: string;
}> = ({ value, setValue, l, r }) => {
  const mkHandleClk = (isRhs: boolean) => () => {
    setValue(isRhs);
  };

  return (
    <div className="grid grid-cols-2 border rounded">
      <button
        className={`${btnCls} ${!value && theme.bgR}`}
        onClick={mkHandleClk(false)}
      >
        {l}
      </button>
      <button
        className={`${btnCls} ${value && theme.bgB}`}
        onClick={mkHandleClk(true)}
      >
        {r}
      </button>
    </div>
  );
};
