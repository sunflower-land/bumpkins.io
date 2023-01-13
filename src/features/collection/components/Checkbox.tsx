import classNames from "classnames";
import React from "react";

interface Props {
  text: string;
  isChecked: boolean;
  onToggle: () => void;
}
export const Checkbox: React.FC<Props> = ({ text, isChecked, onToggle }) => {
  return (
    <button
      className={classNames(
        "flex w-full items-center py-4 px-10 mb-3 leading-8 font-heading font-medium bg-white rounded-3xl",
        {
          "bg-opacity-50 ": !isChecked,
        }
      )}
      onClick={onToggle}
    >
      <span className="mr-6">
        {isChecked ? (
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="27" height="27" rx="8" fill="#28E172"></rect>
            <path
              d="M11.4534 19L6 13.6758L6.72022 12.9726L11.4534 17.5937L21.2798 8L22 8.70316L11.4534 19Z"
              fill="white"
            ></path>
          </svg>
        ) : (
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="26"
              height="26"
              rx="5.5"
              fill="white"
              stroke="#DBDDE1"
            ></rect>
          </svg>
        )}
      </span>
      <span>{text}</span>
    </button>
  );
};
