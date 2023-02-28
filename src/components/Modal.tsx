import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalContent: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <div
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
  );
};

export const Modal: React.FC<{
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ show, onClose, children }) => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window === "object") setHasWindow(true);
  }, []);

  if (!show || !hasWindow) return null;
  return (
    <>
      {createPortal(
        <ModalContent onClose={onClose}>{children}</ModalContent>,
        document.body
      )}
    </>
  );
};
