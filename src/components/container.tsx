import React from "react";

export const Container: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <div className="w-full max-w-3xl m-auto">{children}</div>;
};
