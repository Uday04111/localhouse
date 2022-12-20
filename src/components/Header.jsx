import React from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase.config";

import { useState } from "react";

import Logo from "../img/Logo.png";
import Avatar from "../img/Avatar.png";
import { json } from "react-router-dom";
import { Link } from "react-router-dom";
import { async } from "@firebase/util";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { type } from "@testing-library/user-event/dist/type";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({ type: actionType.SET_USER, user: null });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed w-screen z-50 p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* {desktop} */}
      <div className="hidden h-full w-full md:flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 h-10 object-cover " />
          <p className="text-headingColor text-xl font-bold">LocalHouse</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-1 "
          >
            <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 hover:scale-110 drop-shadow-2xl shadow-red-700 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center hover:scale-125 transition-all duration-250s"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center -top-2 -right-2">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className=" relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userprofile"
              className="w-10 min-w-[40px] h-10 min-h-[40px]  drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex item-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>

                <p
                  className="px-4 py-2 flex item-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* {mobile} */}
      <div className="flex items-center justify-between h-full w-full md:hidden ">
        <div
          className="relative flex items-center justify-center hover:scale-125 transition-all duration-250s"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer " />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center -top-2 -right-2">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 h-10 object-cover " />
          <p className="text-headingColor text-xl font-bold">LocalHouse</p>
        </Link>

        <div className=" relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="userprofile"
            className="w-10 min-w-[40px] h-10 min-h-[40px]  drop-shadow-xl cursor-pointer rounded-full"
            onClick={login}
          />

          {isMenu && (
            <div className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 ">
              <Link to={"/createItem"}>
                <p
                  className="px-4 py-2 flex item-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => setIsMenu(false)}
                >
                  New Item <MdAdd />
                </p>
              </Link>

              <ul className="flex flex-col px-4 py-2  gap-1 ">
                <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 hover:scale-110 drop-shadow-2xl shadow-red-700 transition-all ease-in-out cursor-pointer">
                  Home
                </li>
                <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
                  Menu
                </li>
                <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
                  About Us
                </li>
                <li className="text-base pl-5 pr-5 pt-2 pb-2 rounded text-textColor hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer">
                  Services
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex justify-center bg-slate-200 item-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
