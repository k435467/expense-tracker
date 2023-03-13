import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
  AiOutlineSetting,
  AiOutlinePieChart
} from "react-icons/ai";
import { useAuth } from "@/utils/auth";
import { theme } from "@/utils";

const menuItems = [
  { Icon: AiOutlinePlusCircle, url: "/create" },
  { Icon: AiOutlineUnorderedList, url: "/records" },
  { Icon: AiOutlinePieChart, url: "/statistics" },
  { Icon: AiOutlineSetting, url: "/setting" },
];

export const NavMenu: React.FC<{}> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [aniIdx, setAniIdx] = useState(-1);

  useEffect(() => {
    // prefetch pages
    menuItems.forEach(({ url }) => {
      router.prefetch(url);
    });
  }, []);

  if (!user) return <div />;
  return (
    <div className="grid w-full grid-cols-4 border-t bg-white dark:border-zinc-700 dark:bg-zinc-800">
      {menuItems.map((v, idx) => (
        <div
          key={v.url}
          onClick={() => router.push(v.url)}
          onTouchStart={() => setAniIdx(idx)}
          onAnimationEnd={() => setAniIdx(-1)}
          className={`flex w-full items-center justify-center p-3 pb-6 ${
            aniIdx === idx && "ani-headShake"
          }`}
        >
          <div className="relative">
            <v.Icon
              className={`relative z-10 text-2xl text-slate-400 dark:text-zinc-400 ${
                router.asPath.startsWith(v.url) &&
                "text-black dark:!text-zinc-100"
              }`}
            />
            {/* active indicator */}
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 rounded-full ${
                router.asPath.startsWith(v.url) && theme.bgY
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
