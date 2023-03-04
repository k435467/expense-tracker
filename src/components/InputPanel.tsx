import React, { useState } from "react";
import { useRouter } from "next/router";
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
import { Category, KeyActions, Record } from "@/types";
import { useAuth } from "@/utils/auth";
import { useInputDate } from "@/utils/input";
import { addRecord,updateRecord } from "@/utils/firestore";
import { theme } from "@/utils";
import { useAppDispatch } from "@/redux/store";
import { showToast } from "@/redux/toastSlice";
import { markReset } from "@/redux/recordEditorSlice";

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

export const InputPanel: React.FC<{
  selCat: Category;
  isIncome: boolean;
  record?: Record;
}> = ({ selCat, isIncome, record }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState<string>(record?.title ?? "");
  const [num, setNum] = useState<number>(Math.abs(record?.money ?? 0));
  const { date, handleChange } = useInputDate(record?.date);
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const mkHandlePressNKey = (value: number) => () => {
    if (num.toString().length < maxDigit) setNum((n) => n * 10 + value);
  };

  const mkHandlePressAKey = (value: KeyActions) => () => {
    if (num === 0) return;
    switch (value) {
      case "back":
        setNum((n) => Math.floor(n / 10));
        return;
      case "clear":
        setNum(0);
        return;
      case "ok":
        const newRecord = {
          category: selCat.title,
          date,
          money: isIncome ? num : -num,
          title,
          createTime: Date.now().toString(),
        };
        if (record?.createTime) {
          updateRecord(user?.uid, record, newRecord)
            .then(() => {
              dispatch(showToast("Update Successfully!"));
              router.push("/records");
            })
            .catch((e) => {
              dispatch(showToast("Failed to Update!"));
              console.error(e);
            });
        } else {
          addRecord(user?.uid, newRecord)
            .then(() => {
              dispatch(showToast("Add Successfully!"));
              dispatch(markReset());
              setNum(0);
              setTitle("");
            })
            .catch((e) => {
              dispatch(showToast("Failed to Add!"));
              console.error(e);
            });
        }
        return;
      default:
        return;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <Container className="mb-12 bg-white">
        <div className="flex items-center border-y">
          <div className="relative m-3 shrink-0 text-3xl">
            <selCat.Icon className="relative z-10 text-3xl" />
            <div
              className={`absolute top-0 bottom-0 right-0 left-0 rounded-full ${
                isIncome ? theme.bgB : theme.bgR
              }`}
            />
          </div>
          <div className="flex-grow">
            <input
              className="w-full shrink border-0 text-xl outline-none"
              type="text"
              name="title"
              maxLength={40}
              value={title}
              placeholder="Title"
              onChange={handleInput}
            />
          </div>
          <div className="m-3 shrink-0 text-lg">
            $ {num.toLocaleString("en-US")}
          </div>
        </div>

        <div className="mt-2 mb-[-0.5rem] flex justify-center">
          <input
            type="date"
            min="2000-01-01"
            max="2100-01-01"
            value={date}
            onChange={handleChange}
          />
        </div>

        <div className="grid w-full grid-cols-4 p-4">
          <div className="col-span-3 grid grid-cols-3">
            {nKeys.map((k) => (
              <button
                key={k.value}
                className="flex w-full items-center justify-center last:col-span-3"
                onClick={mkHandlePressNKey(k.value)}
              >
                <k.Icon className="m-4 text-3xl" />
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 grid-rows-4">
            {aKeys.map((k, idx) => (
              <button
                key={k.value}
                className={`flex w-full items-center justify-center rounded-md last:row-span-2 ${
                  idx === 2 && theme.bgY
                }`}
                onClick={mkHandlePressAKey(k.value)}
              >
                <k.Icon className="m-4 text-3xl" />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
