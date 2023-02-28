import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { useAuth } from "@/utils/auth";
import { theme } from "@/utils";

const menuItems = [
  { Icon: AiOutlineUnorderedList, url: "/records" },
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
            <div className="relative">
              <v.Icon
                className={`relative z-10 text-2xl text-slate-400 ${
                  asPath.startsWith(v.url) && "text-black "
                }`}
              />
              <div
                className={`absolute top-0 bottom-0 left-0 right-0 rounded-full ${
                  asPath.startsWith(v.url) && theme.bgY
                }`}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
