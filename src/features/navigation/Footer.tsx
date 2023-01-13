import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <section>
      <div className="bg-blueGray-100 py-8">
        <div className="container px-4 mx-auto">
          <div className="lg:flex lg:justify-between lg:items-center">
            <div className="sm:flex sm:justify-between sm:items-center mb-14 lg:mb-0">
              <Link to="/">
                <img className="h-12" src="images/uistore.svg" alt="" />
              </Link>
              <p className="relative mt-4 sm:mt-0 sm:top-1 lg:ml-11 text-xs text-gray-300 font-medium uppercase tracking-widest">
                © Bumpkins 2022 All rights reserved
              </p>
            </div>
            <ul className="sm:flex">
              <li className="mb-4 sm:mb-0 mr-8">
                <a
                  className="text-gray-400 hover:text-gray-500 font-heading font-medium"
                  href="https://docs.bumpkins.io/support/terms-of-service"
                >
                  Terms and Conditions
                </a>
              </li>

              <li>
                <a
                  className="text-gray-400 hover:text-gray-500 font-heading font-medium"
                  href="https://docs.bumpkins.io/support/privacy-policy"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
