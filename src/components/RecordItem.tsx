import React, { useRef } from "react";
import { Record } from "@/types";
import { categories, theme } from "@/utils";
import { CSSTransition } from "react-transition-group";

interface RecordItemProps extends Record {
  onClick: (e: any) => void;
  isSelected: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export const RecordItem: React.FC<RecordItemProps> = ({
  category,
  date,
  money,
  title,
  onClick,
  isSelected,
  onDelete,
  onEdit,
}) => {
  const cat = categories.find((v) => v.title === category) || categories[0];
  const borderLColor = money < 0 ? theme.bLR : theme.bLB;
  const nodeRef = useRef(null);

  return (
    <div
      className={`flex w-full flex-col gap-2 rounded-md border border-l-8 p-2 ${borderLColor}`}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="text-slate-300">{date}</div>
        <div>${money.toLocaleString("en-US")}</div>
      </div>
      <div className="flex items-center">
        <cat.Icon className="flex-shrink-0 text-xl text-slate-600" />
        <div className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </div>
      </div>

      <CSSTransition
        nodeRef={nodeRef}
        in={isSelected}
        timeout={100}
        classNames="collapse"
      >
        <div className="max-h-0 overflow-hidden" ref={nodeRef}>
          <div className="grid grid-cols-2 gap-4 p-2">
            <button
              onClick={onEdit}
              className={`w-full text-white ${theme.btn} ${theme.bT} ${theme.bgG}`}
            >
              EDIT
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className={`w-full text-white ${theme.btn} ${theme.bT} ${theme.bgDangerous}`}
            >
              DELETE
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
