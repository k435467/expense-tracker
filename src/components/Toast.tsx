import React, { useEffect, useState } from "react";

const toastTimeout = 2000;

/**
 * get states and auto close after timeout.
 * render a Toast component before use this hook
 *
 * @return display - use this function to show a toast.
 */
export const useToast = () => {
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, toastTimeout);
    }
  }, [show]);

  const display = (title: string) => {
    setTitle(title);
    setShow(true);
  };

  return {
    show,
    setShow,
    title,
    setTitle,
    display,
  };
};

export const Toast: React.FC<{ show: boolean; title: React.ReactNode }> = ({
  show,
  title,
}) => {
  return (
    <div
      className={`p-4 rounded-md bg-gray-700 transition-opacity text-white text-lg fixed top-1/2 left-1/2 translate-center pointer-events-none ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {title}
    </div>
  );
};
