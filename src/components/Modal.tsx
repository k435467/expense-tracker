import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

interface ModalMainProp {
  onClose: () => void;
  children: React.ReactNode;
  narrow?: boolean;
}

const ModalMain: React.FC<ModalMainProp> = ({ onClose, children, narrow }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      appear={true}
      in={true}
      timeout={300}
      classNames="fade"
    >
      <div
        ref={nodeRef}
        onClick={onClose}
        className="fixed top-0 right-0 bottom-0 left-0 z-40 flex justify-center items-center bg-black/50 p-6 "
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${!narrow && "w-full p-4"} rounded-2xl bg-white dark:bg-zinc-800`}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

interface ModalProp extends ModalMainProp {
  show: boolean;
}

export const Modal: React.FC<ModalProp> = ({
  show,
  onClose,
  narrow,
  children,
}) => {
  // Prevent document undefined error on server-side
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window === "object") setHasWindow(true);
  }, []);

  if (!show || !hasWindow) return null;
  return (
    <>
      {createPortal(
        <ModalMain onClose={onClose} narrow={narrow}>
          {children}
        </ModalMain>,
        document.body
      )}
    </>
  );
};
