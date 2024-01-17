import { useHotelContext } from "@/context/HotelContext";
import React from "react";
import { useForm } from "react-hook-form";
import { uuid } from "uuidv4";

const CreateForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({ mode: "onChange" });

  const { createHotel } = useHotelContext();

  const onSubmit = (data: any) => {
    createHotel({
      id: uuid(),
      name: data.name,
      address: data.address,
      city: data.city,
      country: data.country,
    });
    onCloseModal();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 2,
              })}
              type="text"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="Name..."
            />
          </div>

          {errors.name?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.name?.message?.toString()}
            </p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="mt-1 text-xs italic text-red-600">
              Minimum input length of 2
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("address", {
                required: "Address is required",
              })}
              type="address"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="Address..."
            />
          </div>

          {errors.email?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.address?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("city", {
                required: "City is required",
              })}
              type="text"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="City..."
            />
          </div>

          {errors.city?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.city?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center ">
            <input
              {...register("country", {
                required: "Country is required",
                minLength: 5,
              })}
              type="country"
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 "
              placeholder="Country..."
            />
          </div>

          {errors.country?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {errors.country?.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <button
            className="py-3 w-full rounded-lg bg-slate-600 hover:bg-slate-400 text-white text-sm cursor-pointer text-center"
            type="submit"
          >
            {" "}
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
