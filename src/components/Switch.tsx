import React from "react";

const btnCls = "p-1.5 text-base rounded transition";
const activeCls = "bg-slate-100";

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
    <div className="relative grid grid-cols-2 border rounded">
      <button
        className={`${btnCls} ${!value && activeCls}`}
        onClick={mkHandleClk(false)}
      >
        {l}
      </button>
      <button
        className={`${btnCls} ${value && activeCls}`}
        onClick={mkHandleClk(true)}
      >
        {r}
      </button>
    </div>
  );
};
