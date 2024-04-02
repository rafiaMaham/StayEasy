import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="md:text-2xl font-bold flex justify-center items-center ">
        Type
      </h2>

      <div className="flex justify-center items-center mt-4">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {hotelTypes.map((type) => (
            <label
              className={
                typeWatch === type
                  ? "cursor-pointer bg-purple-600 md:text-sm text-xs rounded-full md:px-3 md:py-1 px-2 py-1 font-semibold "
                  : "cursor-pointer bg-gray-300 md:text-sm text-xs rounded-full md:px-3  md:py-1 px-2 py-1 font-semibold  "
              }
            >
              <input
                type="radio"
                className="hidden"
                value={type}
                {...register("type", {
                  required: "This field is required",
                })}
              />

              <span>{type}</span>

              {errors.type && (
                <span className="text-red-500 text-sm font-bold">
                  {errors.type.message}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeSection;
