import React, { useState } from "react";
import { Container } from "@/components/Container";
import { IconType } from "react-icons/lib";
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
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/index";
import {Record} from '@/types'

const addRecord = async (record: Record) => {
  console.log('adding')
  try{
    const docRef = await addDoc(collection(db, "record"), record);
    console.log('document written with ID: ', docRef.id)
  } catch(e) {
    console.error('Error adding document: ', e)
  }
};

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
const aKeys: { Icon: IconType; value: "back" | "clear" | "ok" }[] = [
  { Icon: RiArrowLeftLine, value: "back" },
  { Icon: RiCloseLine, value: "clear" },
  { Icon: RiCheckLine, value: "ok" },
];

export const CreatePanel: React.FC<{}> = () => {
  const [title, setTitle] = useState<string>("");
  const [num, setNum] = useState<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const mkHandlePressNKey = (value: number) => () => {
    if (num.toString().length < maxDigit) setNum((n) => n * 10 + value);
  };

  const mkHandlePressAKey = (value: "back" | "clear" | "ok") => () => {
    switch (value) {
      case "back":
        setNum((n) => Math.floor(n / 10));
        return;
      case "clear":
        setNum(0);
        return;
      case "ok":
        addRecord({category: '', date: '', isIncome: false, money: num, title})
        setNum(0)
        setTitle('')
        return;
      default:
        return;
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <Container className="mb-12 border-t bg-white">
        <div className="flex items-center">
          <MdOutlineLunchDining className="text-3xl m-3 shrink-0" />
          <div className="flex-grow">
            <input
              className="text-xl shrink border-0 outline-none"
              type="text"
              name="title"
              maxLength={25}
              value={title}
              placeholder="Title"
              onChange={handleInput}
            />
          </div>
          <div className="m-3 text-lg shrink-0">
            $ {num.toLocaleString("en-US")}
          </div>
        </div>
        <div className="border-t">
          <div className="text-center">calendar</div>
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
