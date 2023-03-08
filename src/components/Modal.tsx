import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const ModalMain: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      appear={true}
      in={true}
      // timeout longer
      timeout={300}
      classNames="fade"
    >
      <div
        ref={nodeRef}
        onClick={onClose}
        className="fixed top-0 right-0 bottom-0 left-0 z-40 flex items-center bg-black/50 p-6 "
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full rounded-2xl bg-white p-4"
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export const Modal: React.FC<{
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ show, onClose, children }) => {
  // Prevent document undefined error on server-side
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window === "object") setHasWindow(true);
  }, []);

  if (!show || !hasWindow) return null;
  return (
    <>
      {createPortal(
        <ModalMain onClose={onClose}>{children}</ModalMain>,
        document.body
      )}
    </>
  );
};
