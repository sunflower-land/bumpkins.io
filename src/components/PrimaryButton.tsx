import classNames from "classnames";
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const PrimaryButton: React.FC<{
  title: string;
  onClick?: () => void;
  size?: "sm" | "default";
  disabled?: boolean;
  loading?: boolean;
}> = ({ onClick, title, size = "default", disabled, loading }) => {
  if (size === "sm") {
    return (
      <button
        className={classNames(
          "relative h-8 w-full text-sm leading-none text-white font-medium tracking-tighter font-heading bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg border-[1px] border-blue-500",
          {
            "opacity-60 cursor-not-allowed": disabled,
          }
        )}
        onClick={onClick}
      >
        <div className="flex items-center justify-center">
          {loading && <LoadingSpinner size={20} />}
          <span>{title}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      className={classNames(
        "w-full block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl",
        {
          "opacity-60 cursor-not-allowed": disabled,
        }
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {loading && <LoadingSpinner size={20} />}
        <span>{title}</span>
      </div>
    </button>
  );
};
