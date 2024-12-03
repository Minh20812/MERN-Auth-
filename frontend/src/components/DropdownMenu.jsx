import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import { useSelector } from "react-redux";

const DropdownMenu = ({ openModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNestedMenu, setShowNestedMenu] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const settingsRef = useRef(null);

  const linkClasses =
    "cursor-pointer px-3 py-2 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500";
  const nestedClasses =
    "cursor-pointer flex gap-2 justify-between items-center px-3 py-2 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500";

  const closeDropdown = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowMenu(false);
      setShowNestedMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="flex h-[32rem] items-start justify-end space-y-2 rounded-lg p-4 md:justify-center md:p-16 dark:bg-black dark:text-white">
      <div className="mx-6 sm:mx-auto">
        <div ref={settingsRef} className="relative">
          <div
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNestedMenu(false);
            }}
            className="relative flex w-56 cursor-pointer items-center justify-between gap-2 rounded-lg border border-slate-300 bg-transparent px-2 py-2 focus:outline-none dark:border-slate-600 dark:bg-transparent"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://i.imgur.com/ZgBah7z.jpeg"
                alt="Profile"
                className="size-8 rounded-full object-cover md:size-10"
              />
              <h2>{userInfo?.username}</h2>
            </div>
            {!showMenu ? (
              <ChevronUpIcon className="pointer-events-none size-5" />
            ) : (
              <ChevronDownIcon className="pointer-events-none size-5" />
            )}
          </div>
          {showMenu && (
            <div className="absolute right-0 top-16 z-10 mt-1 w-56 rounded-lg border border-slate-300 bg-white shadow-md dark:border-slate-600 dark:bg-slate-900">
              <div className="flex flex-col divide-y divide-slate-300 dark:divide-slate-600">
                <div className="flex flex-col py-2">
                  <a href="#" className={linkClasses}>
                    Edit Profile
                  </a>
                </div>
                <div className="flex flex-col py-2">
                  <div
                    className="relative"
                    onClick={() => setShowNestedMenu(!showNestedMenu)}
                  >
                    <div className={nestedClasses}>
                      <p>Account</p>
                      <ChevronRightIcon className="size-6" />
                    </div>
                    {showNestedMenu && (
                      <div className="absolute -right-48 top-0 flex w-48 flex-col rounded-r-lg border border-slate-300 bg-white py-2 dark:border-slate-600 dark:bg-slate-900">
                        <a href="#" className={linkClasses}>
                          Change Email
                        </a>
                        <a href="#" className={linkClasses}>
                          Change Password
                        </a>
                        <a href="#" className={linkClasses}>
                          Backup Data
                        </a>
                      </div>
                    )}
                  </div>
                  <a href="#" className={linkClasses}>
                    Privacy
                  </a>
                  <a href="#" className={linkClasses}>
                    Security
                  </a>
                </div>
                <div className="flex flex-col py-2">
                  <a href="#" className={linkClasses}>
                    Help
                  </a>
                  <a href="#" className={linkClasses}>
                    About
                  </a>
                  <a href="#" className={linkClasses} onClick={openModal}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
