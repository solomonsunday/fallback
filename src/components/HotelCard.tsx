import { IHotel, IUser } from "@/utils/interface";
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHotelContext } from "@/context/HotelContext";

const HotelCard = ({ hotel }: { hotel: IHotel }) => {
  const { name, address, city, country, id } = hotel;
  const { getHotel, deleteHotel } = useHotelContext();

  const handleViewHotel = (id: string) => {
    const hotel = getHotel(id);
    console.log("id hotel: ", id, "hotel item", hotel);
  };

  const handleDeleteHotel = (id: string) => {
    deleteHotel(id);
    console.log("hotel deleted");
  };

  return (
    <div
      data-testid={"user-card"}
      className="bg-slate-400 rounded-md p-5 h-[60px] flex items-center justify-around hover:shadow-md cursor-pointer"
    >
      <Image
        priority={true}
        className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center"
        src="/public/vercel.svg"
        alt="avater_url"
        width={100}
        height={0}
      />
      <div>{name}</div>
      <div>
        {/* <EllipsisHorizontalIcon width={20} /> */}
        <div className="">
          <Menu as="div" className="relative inline-block text-center">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-200 text-black" : "text-black-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => handleViewHotel(id)}
                      >
                        View
                      </button>
                    )}
                  </Menu.Item>
                </div>

                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        // onClick={() => {
                        //   setSelectedUser(user);
                        //   setPermissionModalIsOpen(true);
                        // }}
                        className={`${
                          active ? "bg-gray-200 text-black" : "text-black-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>

                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleDeleteHotel(id)}
                        className={`${
                          active ? "bg-gray-200 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm  text-red-500`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
