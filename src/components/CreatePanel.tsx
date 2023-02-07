import React, { useState } from "react";
import { MdOutlineLunchDining } from "react-icons/md";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
  RiNumber7,
  RiNumber8,
  RiNumber9,
  RiNumber0,
  RiArrowLeftLine,
  RiCloseLine,
  RiCheckLine,
} from "react-icons/ri";

const nKeys = [
  { Icon: RiNumber1, value: 1 },
  { Icon: RiNumber2, value: 2 },
  { Icon: RiNumber3, value: 3 },
  { Icon: RiNumber4, value: 4 },
  { Icon: RiNumber5, value: 5 },
  { Icon: RiNumber6, value: 6 },
  { Icon: RiNumber7, value: 7 },
  { Icon: RiNumber8, value: 8 },
  { Icon: RiNumber9, value: 9 },
  { Icon: RiNumber0, value: 0 },
];
const aKeys = [
  { Icon: RiArrowLeftLine, value: "back" },
  { Icon: RiCloseLine, value: "clear" },
  { Icon: RiCheckLine, value: "ok" },
];

export const CreatePanel: React.FC<{}> = () => {
  const [num, setNum] = useState<number>(0);

  const mkHandlePressNKey = (value: number) => () => {
    setNum((n) => n * 10 + value);
  };

  const mkHandlePressAKey = (value: "back" | "clear" | "ok") => () => {
    switch (value) {
      case "back":
        setNum((n) => Math.floor(n / 10));
        return;
      case "clear":
      case "ok":
        setNum(0);
        return;
      default:
        return;
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 mb-12 border-t">
      <div className="flex items-center">
        <MdOutlineLunchDining className="text-3xl m-3" />
        <div className="flex-grow m-3">name</div>
        <div className="m-3 text-lg">$ {num.toLocaleString("en-US")}</div>
      </div>

      <div className="border-t">
        <div>calendar</div>

        <div className="grid grid-cols-4 p-4">
          <div className="col-span-3 grid grid-cols-3">
            {nKeys.map((k) => (
              <button
                key={k.value}
                className="w-full flex justify-center items-center last:col-span-3"
                onClick={mkHandlePressNKey(k.value)}
              >
                <k.Icon className="text-3xl m-4" />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 grid-rows-4">
            {aKeys.map((k) => (
              <button
                key={k.value}
                className="w-full flex justify-center items-center last:row-span-2"
                onClick={mkHandlePressAKey(k.value)}
              >
                <k.Icon className="text-3xl m-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
