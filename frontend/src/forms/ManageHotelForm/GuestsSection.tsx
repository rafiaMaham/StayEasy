import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="md:text-2xl font-bold flex justify-center items-center ">
        Guest
      </h2>

      <div className="flex justify-center items-center mt-4">
        <div className="grid grid-col-2 p-5 rounded-lg bg-gray-300 gap-5 lg:w-[35%] md:w-[70%] w-[70%]">
          <label className="text-gray-700 text-sm font-semibold">
            Adults
            <input
              className="border rounded-full w-full py-2 px-3 font-normal mt-1"
              type="number"
              min={1}
              {...register("adultCount", {
                required: "This field is required",
              })}
            />
            {errors.adultCount && (
              <span className="text-red-500 font-normal text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-semibold">
            Children
            <input
              className="border rounded-full w-full py-2 px-3 font-normal mt-1 "
              type="number"
              min={0}
              {...register("childCount", {
                required: "This field is required",
              })}
            />
            {errors.childCount && (
              <span className="text-red-500 font-normal text-sm">
                {errors.childCount.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
