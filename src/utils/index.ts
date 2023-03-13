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
import { Category, ThemeMode } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectThemeMode, setTheme } from "@/redux/themeSlice";
import { getTheme, updateTheme } from "./firestore";
import { IconType } from "react-icons/lib";

export const theme = {
  bgR: "bg-rose-50 dark:bg-rose-500/50",
  bgB: "bg-cyan-50 dark:bg-cyan-500/50",
  bgY: "bg-[#FDECC8]/60 dark:bg-amber-200/20",
  bLR: "border-l-rose-100 dark:border-l-rose-500/60",
  bLB: "border-l-cyan-100 dark:border-l-cyan-500/60",
  bT: "!border-transparent",
  bgG: "bg-emerald-400 dark:bg-emerald-400/70",
  bgDangerous: "bg-rose-500 dark:bg-rose-500/80",
  btn: "border-2 rounded p-1",
};

export const themeModes: ThemeMode[] = ["system", "light", "dark"];

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

export const categoryIcons = (() => {
  const m: { [key: string]: IconType } = {};
  categories.forEach(({ title, Icon }) => {
    m[title] = Icon;
  });
  return m;
})();

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

export const useThemeMode = (userId: string | undefined) => {
  const { themeMode } = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const setThemeMode = (mode: ThemeMode) => dispatch(setTheme(mode));

  // fetch theme from database
  const initTheme = useRef<ThemeMode | null>(null);
  useEffect(() => {
    if (userId) {
      getTheme(userId).then((v) => {
        initTheme.current = v;
        setThemeMode(v);
      });
    }
  }, [userId]);

  const turnDark = () => document?.documentElement.classList.add("dark");
  const turnLight = () => document?.documentElement.classList.remove("dark");

  useEffect(() => {
    // update the value in database
    if (initTheme.current && initTheme.current !== themeMode) {
      initTheme.current = themeMode;
      updateTheme(userId, themeMode);
    }

    if (themeMode === "system") {
      if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
        turnDark();
      } else {
        turnLight();
      }
    } else if (themeMode === "dark") {
      turnDark();
    } else {
      turnLight();
    }
  }, [themeMode]);

  return { themeMode, setThemeMode };
};

const chrtOpct = "0.7";
export const chartColors = [
  `rgba(244,63,94,${chrtOpct})`,
  `rgba(236,72,153,${chrtOpct})`,
  `rgb(217,70,239,${chrtOpct})`,
  `rgb(168,85,247,${chrtOpct})`,
  `rgb(139,92,246,${chrtOpct})`,
  `rgb(99,102,241,${chrtOpct})`,
  `rgb(59,130,246,${chrtOpct})`,
  `rgb(14,165,233,${chrtOpct})`,
  `rgb(6,182,212,${chrtOpct})`,
  `rgb(20,184,166,${chrtOpct})`,
  `rgb(16,185,129,${chrtOpct})`,
  `rgb(34,197,94,${chrtOpct})`,
  `rgb(132,204,22,${chrtOpct})`,
  `rgb(234,179,8,${chrtOpct})`,
  `rgb(245,158,11,${chrtOpct})`,
  `rgb(249,115,22,${chrtOpct})`,
  `rgb(239,68,68,${chrtOpct})`,
  `rgb(120,113,108,${chrtOpct})`,
];