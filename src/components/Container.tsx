import React from "react";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { className = "", children, ...rest } = props;
  return (
    <div className={`w-full h-full max-w-xl m-auto ${className}`} {...rest}>
      {props.children}
    </div>
  );
};
