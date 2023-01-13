import React from "react";
import classNames from "classnames";

export const Modal: React.FC<{ show: boolean; onHide?: () => void }> = ({
  children,
  show,
  onHide,
}) => (
  <div
    className={classNames(
      "fixed z-10 overflow-y-auto top-0 left-0 h-screen w-screen flex",
      {
        hidden: !show,
      }
    )}
    id="modal"
  >
    <div className="flex items-center justify-center min-height-100vh w-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" onClick={onHide}>
        <div className="absolute inset-0 bg-gray-900 opacity-60" />
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
        &#8203;
      </span>
      <div
        className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {children}
      </div>
    </div>
  </div>
);
