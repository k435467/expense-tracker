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
import { Category } from "@/types";

export const categories: Category[] = [
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
