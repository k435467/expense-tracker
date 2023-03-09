import React, { useState } from "react";
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
  const [aniIdx, setAniIdx] = useState(-1);

  // TODO - imperative navigate
  // TODO - router prefetch

  if (!user) return <div />;
  return (
    <div className="grid w-full grid-cols-3 border-t bg-white dark:border-zinc-700 dark:bg-zinc-800">
      {menuItems.map((v, idx) => (
        <Link key={v.url} href={v.url}>
          <div
            onTouchStart={() => setAniIdx(idx)}
            onAnimationEnd={() => setAniIdx(-1)}
            className={`flex w-full items-center justify-center p-3 pb-6 ${
              aniIdx === idx && "ani-headShake"
            }`}
          >
            <div className="relative">
              <v.Icon
                className={`relative z-10 text-2xl text-slate-400 dark:text-zinc-400 ${
                  asPath.startsWith(v.url) && "text-black dark:!text-zinc-100"
                }`}
              />
              {/* active indicator */}
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
