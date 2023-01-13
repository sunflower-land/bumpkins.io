import React from "react";

export const SecondaryButton: React.FC<{
  onClick: () => void;
  title: string;
}> = ({ onClick, title }) => {
  return (
    <button
      className="h-16 w-full block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-blue-500 text-center hover:bg-gray-50 focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 rounded-xl border border-blue-500"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
