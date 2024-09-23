import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,

} from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Switch from "./Switch";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/avatar.png";

export default function Navbar() {
  const { currentUser, logOut } = useAuth();
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white w-full "
      >
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between">
            <Link className="text-2xl pr-2 font-semibold" to="/">
              React Movie App
            </Link>
            <div className=" inset-y-0 right-9 flex items-center">
              {currentUser && (
                <h5 className="mr-2 capitalize">{currentUser.displayName} </h5>
              )}
              <Switch />
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only"> Open User menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser?.photoURL || avatar}
                  />
                </MenuButton>

                <MenuItems
                  anchor="botton "
                  className="absolute right-0 mt-2 origin-top-right top-20 w-48  bg-white shadow-lg focus:outline-none "
                >
                  {!currentUser && (
                    <>
                      <MenuItem>
            
                          <Link
                            to="/register"
                            className="block px-2 py-2 text-sm text-gray-700"
                          >
                            Register
                          </Link>
                    
                      </MenuItem>

                      <MenuItem>
          
                          <Link
                            to="/login"
                            className="block px-2 py-2 text-sm text-gray-700"
                          >
                            Login
                          </Link>
   
                      </MenuItem>
                    </>
                  )}

                  {currentUser && (
                    <MenuItem>
                      {({ active }) => (
                        <span
                          onClick={() => logOut()}
                          className={`block px-2 py-2 text-sm text-gray-700 ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Logout
                        </span>
                      )}
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
      <div className="h-[55px]"> </div>
    </>
  );
}
