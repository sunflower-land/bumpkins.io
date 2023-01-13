import classNames from "classnames";
import React from "react";

interface Props {
  title: string;
  selected?: boolean;
  secondaryText?: string;
  onClick: () => void;
}

export const CategoryButton: React.FC<Props> = ({
  title,
  secondaryText,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between py-4 px-8 mb-3 bg-white bg-opacity-50 font-heading font-medium rounded-3xl cursor-pointer border-[1px] border-gray-100",
        { "bg-opacity-100": selected }
      )}
      onClick={onClick}
    >
      <span>{title}</span>
      <span className="text-sm text-gray-300">{secondaryText}</span>
    </div>
  );
};
