import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import { logout } from "../redux/feature/auth/authSlice";
import DropdownMenu from "./DropdownMenu.jsx";
import { Menu, X } from "lucide-react";

const SideComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const sidebarLinks = [{ to: "/", label: "Dashboard", icon: "🏠" }];

  return (
    <>
      {/* Toggle Button for All Screens */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 rounded-full lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {showSidebar ? (
          <X className="text-white" size={24} />
        ) : (
          <Menu className="text-white" size={24} />
        )}
      </button>

      {/* Overlay for Sidebar */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out 
          z-50 bg-black text-white 
          w-64 sm:w-72 
          h-full 
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          flex flex-col shadow-lg`}
      >
        {/* Logo/Brand */}
        <div className="flex items-center justify-center p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">MINOVA</h1>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center px-4 py-3 hover:bg-gray-800 rounded-md transition-colors duration-200"
              onClick={() => {
                toggleSidebar();
              }}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User and Settings Section */}
        <div className="p-4 border-t border-gray-800">
          <DropdownMenu openModal={openModal} />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Logout
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    Are you sure you want to logout?
                  </p>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SideComponent;
