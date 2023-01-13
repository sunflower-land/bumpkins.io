import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useActor } from "@xstate/react";

import logo from "assets/icons/player.png";
import arrowDown from "assets/images/down.svg";
import { Context } from "features/auth/lib/Provider";

export const NavBar: React.FC = () => {
  const { authService } = useContext(Context);
  const [authState] = useActor(authService);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (showMobileNav) {
      setShowMobileNav(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="text-gray-700 font-heading font-medium relative bg-gray-50 bg-opacity-50">
      <nav className="flex justify-between px-6 lg:px-12 py-6 border-b border-gray-100">
        <div className="w-full items-center hidden md:flex">
          <Link to="/" className="flex items-center">
            <img
              className="h-6 mr-2"
              src={logo}
              alt=""
              style={{
                imageRendering: "pixelated",
              }}
            />
            <span className="font-bold text-2xl relative">Bumpkins.io</span>
          </Link>
          <ul className="md:flex lg:px-4 flex-grow md:ml-4 lg:ml-7">
            <li>
              <Link
                className="flex items-center text-gray-400 hover:text-gray-500"
                to="/upcoming-drops"
              >
                <span className="mr-4 lg:mr-8">Upcoming drops</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center text-gray-400 hover:text-gray-500"
                to="/collection"
              >
                <span className="mr-4">Collection</span>
              </Link>
            </li>
          </ul>
          <div className="flex items-center ml-5">
            <Link className="flex items-center" to="/bumpkins">
              <span>My Bumpkins</span>
              <img
                className="ml-6 w-5 md:hidden"
                style={{ imageRendering: "pixelated" }}
                src={logo}
                alt=""
              />
            </Link>

            {
              // Show this CTA if not authorised
              !authState.matches("authorised") ? (
                <Link
                  to="/bumpkins"
                  className="ml-6 uppercase text-sm font-bold font-body border-2 border-gray-200 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300"
                >
                  <span className="block mt-px">CONNECT</span>
                </Link>
              ) : (
                <Link
                  to="/mint-bumpkin"
                  className="ml-6 uppercase text-sm font-bold font-body border-2 border-gray-200 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300"
                >
                  <span className="block mt-px">Mint Bumpkin</span>
                </Link>
              )
            }
          </div>
        </div>
        <div className="flex w-full items-center md:hidden">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl relative">Bumpkins.io</span>
          </Link>
          <div className="flex items-center ml-auto">
            <Link className="flex items-center" to="/bumpkins">
              <img
                className="ml-6 w-5"
                style={{ imageRendering: "pixelated" }}
                src={logo}
                alt=""
              />
            </Link>
            <div
              className="w-5 md:hidden flex justify-center items-center ml-3"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              <img className="w-3" src={arrowDown} alt="menu" />
            </div>
          </div>
        </div>
      </nav>
      {showMobileNav && (
        <div className="md:hidden p-2 border border-gray-200 shadow absolute right-6 top-[70px] bg-white rounded z-40">
          <ul className="flex-col">
            <Link
              className="text-gray-400 hover:text-gray-500"
              to="/upcoming-drops"
            >
              <li
                className="flex items-center h-10 px-4"
                onClick={() => setShowMobileNav(false)}
              >
                <span className="">Upcoming drops</span>
              </li>
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-500"
              to="/collection"
            >
              <li className="flex items-center h-10 px-4">
                <span className="">Collection</span>
              </li>
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-500"
              to="/mint-bumpkin"
            >
              <li className="flex items-center h-10 px-4">
                <span>Mint bumpkin</span>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
