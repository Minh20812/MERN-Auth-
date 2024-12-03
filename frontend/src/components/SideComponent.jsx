import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import { logout } from "../redux/feature/auth/authSlice";

const SideComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
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

  return (
    <div>
      {/* Toggle Button for Small Screens */}
      <button
        className="block md:hidden p-2 bg-gray-800 text-white"
        onClick={toggleSidebar}
      >
        Menu
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 bg-black text-white w-64 md:w-1/4 xl:w-1/5 flex flex-col justify-between h-full`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-white"
          onClick={toggleSidebar}
        >
          X
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4 p-4 mt-8">
          {[{ to: "/", label: "Dashboard" }].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 hover:bg-gray-700 rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Settings and Logout */}
        <div className="flex flex-col items-start space-y-2 p-4">
          <Link
            to="/settings"
            className="w-full text-left hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Settings
          </Link>
          <button
            onClick={openModal}
            className="w-full text-left hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Logout
          </button>
          <button
            onClick={toggleDropdown}
            className="w-full text-left hover:bg-gray-700 rounded-md px-4 py-2"
          >
            {userInfo?.username}
          </button>
          {dropdownOpen && userInfo && (
            <div className="w-full bg-gray-800 rounded-md shadow-md">
              {userInfo.isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                Profile
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900"
                  >
                    Confirm logout
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to logout?
                  </p>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      className="bg-gray-100  px-4 py-2 rounded-md text-gray-900 hover:bg-gray-200"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700"
                      onClick={logoutHandler}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SideComponent;
