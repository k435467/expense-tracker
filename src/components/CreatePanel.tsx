import React, { useState } from "react";
import { Container } from "@/components/Container";
import { IconType } from "react-icons/lib";
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
import { Category, KeyActions } from "@/types";
import { useAuth } from "@/utils/auth";
import { Toast, useToast } from "@/components/Toast";
import { createPortal } from "react-dom";
import { useInputDate } from "@/utils/input";
import { addRecord } from "@/utils/firestore";

const maxDigit = 12;
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
const aKeys: { Icon: IconType; value: KeyActions }[] = [
  { Icon: RiArrowLeftLine, value: "back" },
  { Icon: RiCloseLine, value: "clear" },
  { Icon: RiCheckLine, value: "ok" },
];

export const CreatePanel: React.FC<{ selCat: Category; isIncome: boolean }> = ({
  selCat,
  isIncome,
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [num, setNum] = useState<number>(0);
  const toast = useToast();
  const { date, handleChange } = useInputDate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    createPortal(<div id="toast123">123</div>, document.body);
    setTitle(e.target.value);
  };

  const mkHandlePressNKey = (value: number) => () => {
    if (num.toString().length < maxDigit) setNum((n) => n * 10 + value);
  };

  const mkHandlePressAKey = (value: KeyActions) => () => {
    switch (value) {
      case "back":
        setNum((n) => Math.floor(n / 10));
        return;
      case "clear":
        setNum(0);
        return;
      case "ok":
        addRecord(user?.uid, {
          category: selCat.title,
          date,
          money: isIncome ? num : -num,
          title,
          uid: Date.now().toString(),
        })
          .then(() => {
            toast.display("Add Successfully!");
          })
          .catch((e) => {
            toast.display("Failed to Add!");
            console.error(e);
          });
        setNum(0);
        setTitle("");
        return;
      default:
        return;
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <Toast show={toast.show} title={toast.title} />

      <Container className="mb-12 border-t bg-white">
        <div className="flex items-center">
          <selCat.Icon className="text-3xl m-3 shrink-0" />
          <div className="flex-grow">
            <input
              className="text-xl shrink border-0 outline-none w-full"
              type="text"
              name="title"
              maxLength={40}
              value={title}
              placeholder="Title"
              onChange={handleInput}
            />
          </div>
          <div className="m-3 text-lg shrink-0">
            $ {num.toLocaleString("en-US")}
          </div>
        </div>
        <div className="border-t flex flex-col items-center">
          <input
            type="date"
            min="2000-01-01"
            max="2100-01-01"
            value={date}
            onChange={handleChange}
          />
          <div className="w-full grid grid-cols-4 p-4">
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
                  className="w-full flex justify-center items-center last:row-span-2 last:bg-slate-100 last:rounded-md"
                  onClick={mkHandlePressAKey(k.value)}
                >
                  <k.Icon className="text-3xl m-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
