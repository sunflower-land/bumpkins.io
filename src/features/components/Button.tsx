import classNames from "classnames";
import React from "react";

interface Props {
  type: "primary" | "secondary";
  title: string;
  onClick: () => void;
}

export const Button: React.FC<Props> = ({
  type = "primary",
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "py-4 w-full text-base sm:text-lg leading-3 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl",
        {
          "text-blue-500 hover:text-white border border-blue-500 hover:border-transparent bg-transparent":
            type === "secondary",
        }
      )}
    >
      {title}
    </button>
  );
};
