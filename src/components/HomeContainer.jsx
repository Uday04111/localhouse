import React from "react";
import delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start gap-6 justify-center">
        <div className="flex items-center justify-center gap-2 bg-orange-100 rounded-full px-4 py-1">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[4.5rem] tracking-wide font-bold text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] md:text-[5rem]">
            Your City
          </span>
        </p>
        <p className="text-base texr-textColor text-center md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
          laboriosam magnam eligendi nostrum sapiente, porro rem molestias
          perferendis autem distinctio!
        </p>
        <button className="px-4 py-2 bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto rounded-lg hover:shadow-lg duration-100 transition-all ease-in-out">
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={heroBg}
          alt="heroBg"
          className="ml-auto h-420 w-full lg:h-650 lg:w-auto"
        />

        <div className="w-full h-full absolute lg:px-32 py-4 top-0 left-0 items-center justify-center flex gap-4 flex-wrap  ">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4  bg-cardOverlay backdrop-blur-md items-center justify-center rounded-3xl flex flex-col "
              >
                <img
                  src={n.imgsrc}
                  alt="f9"
                  className=" w-20 lg:w-40 -mt-10 lg:-mt-20"
                />
                <p className="font-semibold text-xl mt-1 lg:mt-4 text-textColor">
                  {n.name}
                </p>
                <p className="text-[12px] lg:text-sm font-semibold text-lighttextGrey my-1 lg:my-3">
                  {n.decp}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">Rs. </span> {n.price}/-
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
