import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearToast, selectToast } from "@/redux/toastSlice";

const duration = 2000;

export const Toast: React.FC<{}> = () => {
  const { show, title, indicator } = useAppSelector(selectToast);
  const dipatch = useAppDispatch();
  const timeoutID = useRef<NodeJS.Timeout>();

  // Clear after duration.
  // If there is another showToast() being dispatched,
  // remove previous timeout to avoid extra clear()
  useEffect(() => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }

    timeoutID.current = setTimeout(() => {
      dipatch(clearToast());
      timeoutID.current = undefined;
    }, duration);
  }, [indicator]);

  return (
    <div
      className={`translate-center pointer-events-none fixed top-1/2 left-1/2 z-10 rounded-2xl bg-gray-700 p-4 text-center text-lg text-white transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {title}
    </div>
  );
};
