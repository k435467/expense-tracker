import React, { useState } from "react";
import { Switch } from "@/components/Switch";
import { CreatePanel } from "@/components/CreatePanel";
import {
  MdOutlineLunchDining,
  MdOutlineRamenDining,
  MdOutlineBrunchDining,
  MdOutlineEmojiFoodBeverage,
  MdOutlineTapas,
  MdOutlineLocalBar,
  MdOutlineDirectionsCar,
  MdOutlineShoppingBag,
  MdOutlineSportsEsports,
  MdOutlineLight,
  MdOutlineHouseSiding,
  MdOutlineMedicalServices,
  MdOutlineGroup,
  MdOutlineCardGiftcard,
  MdOutlineDevicesOther,
  MdOutlineWorkspaces,
} from "react-icons/md";

const categories = [
  { Icon: MdOutlineLunchDining, title: "Breakfast" },
  { Icon: MdOutlineRamenDining, title: "Lunch" },
  { Icon: MdOutlineBrunchDining, title: "Dinner" },
  { Icon: MdOutlineEmojiFoodBeverage, title: "Drinks" },
  { Icon: MdOutlineTapas, title: "Snack" },
  { Icon: MdOutlineLocalBar, title: "Alcohol" },
  { Icon: MdOutlineDirectionsCar, title: "Traffic" },
  { Icon: MdOutlineShoppingBag, title: "Shopping" },
  { Icon: MdOutlineSportsEsports, title: "Entertainment" },
  { Icon: MdOutlineLight, title: "Housing" },
  { Icon: MdOutlineHouseSiding, title: "Rent" },
  { Icon: MdOutlineMedicalServices, title: "Medical" },
  { Icon: MdOutlineGroup, title: "Social" },
  { Icon: MdOutlineCardGiftcard, title: "Gift" },
  { Icon: MdOutlineDevicesOther, title: "Eletronics" },
  { Icon: MdOutlineWorkspaces, title: "Other" },
];

export default function Create() {
  const [isIncome, setIsIncome] = useState<boolean>(false);

  return (
    <div className="flex flex-col [&>div]:flex-shrink-0 overflow-auto items-center m-auto px-6 pt-10 pb-[32rem] gap-4 h-full">
      <Switch l="Expense" r="Income" value={isIncome} setValue={setIsIncome} />

      <div className="w-full grid grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="w-full flex flex-col items-center justify-center aspect-square text-sm"
          >
            <cat.Icon className="text-3xl" />
            {cat.title}
          </div>
        ))}
      </div>

      <CreatePanel />
    </div>
  );
}
