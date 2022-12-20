import { motion } from "framer-motion";
import React from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import CartItem from "./CartItem";
import { useEffect } from "react";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // useEffect(() => {
  //   let totalPrice = cartItems.reduce(function (accumulator, item) {
  //     return accumulator + item.qty * item.price;
  //   }, 0);
  //   setTot(totalPrice);
  //   console.log(tot);
  // }, [tot, flag]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 2 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
          {""}
        </motion.p>
      </div>

      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        <div className="w-full h-340 md:h-42 px-6 py-10 flex-col flex gap-3 overflow-y-scroll scrollbar-none">
          {cartItems &&
            cartItems.map((item) => <CartItem key={item.id} item={item} />)}
        </div>

        <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">Sub Total</p>
            <p className="text-white text-lg">Rs.30/-</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className=" text-white text-lg">Delivery</p>
            <p className="text-white text-lg">Rs.20/-</p>
          </div>

          <div className="w-full border-b border-gray-600 my-2"></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">Total</p>
            <p className="text-white text-lg">Rs.50/-</p>
          </div>

          {user ? (
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
            >
              Check Out
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
            >
              Login to Check Out
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CartContainer;
