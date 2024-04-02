import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const { register, watch } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="md:text-2xl font-bold flex justify-center items-center ">
        Type
      </h2>
      

      <div className="flex justify-center items-center mt-4">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
          {hotelTypes.map((type) => (
            <label
              className={
                typeWatch === type
                  ? "cursor-pointer bg-purple-600 text-sm rounded-full px-3 py-1 font-semibold "
                  : "cursor-pointer bg-gray-300 text-sm rounded-full px-3 py-1 font-semibold "
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
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeSection;
