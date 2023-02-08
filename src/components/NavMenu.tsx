import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { useAuth } from "@/hooks/auth";

const menuItems = [
  { Icon: AiOutlineUnorderedList, url: "/list" },
  { Icon: AiOutlinePlusCircle, url: "/create" },
  { Icon: AiOutlineSetting, url: "/setting" },
];

export const NavMenu: React.FC<{}> = () => {
  const { user } = useAuth();
  const { asPath } = useRouter();
  if (!user) return <div />;
  return (
    <div className="w-full grid grid-cols-3 border-t bg-white">
      {menuItems.map((v) => (
        <Link key={v.url} href={v.url}>
          <div className="w-full p-3 flex items-center justify-center">
            <v.Icon
              className={`text-2xl ${
                !asPath.startsWith(v.url) && " text-slate-400"
              }`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
