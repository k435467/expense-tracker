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
  MdOutlineMonetizationOn,
  MdOutlineMoneyOff,
  MdOutlineCardMembership,
  MdOutlineLeaderboard,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const theme = {
  bgR: "bg-rose-50",
  bgB: "bg-cyan-50",
  bgY: "bg-[#FDECC8]/60",
  bLR: "border-l-rose-100",
  bLB: "border-l-cyan-100",
  bG: "border-emerald-400",
  bgG: "bg-emerald-400",
  bDangerous: "border-rose-500",
  bgDangerous: "bg-rose-500",
  btn: "border-2 rounded p-1",
};

export const expCategories: Category[] = [
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

export const incoCategories: Category[] = [
  { Icon: MdOutlineMonetizationOn, title: "Salary" },
  { Icon: MdOutlineMoneyOff, title: "Bonus" },
  { Icon: MdOutlineCardMembership, title: "Rebate" },
  { Icon: FaRegHandshake, title: "Trade" },
  { Icon: MdOutlineLeaderboard, title: "Dividend" },
  { Icon: MdOutlineHouseSiding, title: "Rent" },
  { Icon: MdOutlineAccountBalanceWallet, title: "Investment" },
  { Icon: MdOutlineWorkspaces, title: "Other" },
];

export const categories = [...expCategories, ...incoCategories];

/**
 * index to indicate a element is selected from a list
 */
export const useListSelect = () => {
  const init = -1;
  const [sel, setSel] = useState<number>(init);

  const mkHandleSel = (idx: number) => () => {
    if (sel === idx) setSel(init);
    else setSel(idx);
  };

  const reset = () => {
    setSel(init);
  };

  return {
    sel,
    setSel,
    mkHandleSel,
    reset,
  };
};

/**
 * scroll to top whenever the path change
 */
export const useScrollToTop = () => {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [router.asPath]);
};