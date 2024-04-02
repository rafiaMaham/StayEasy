import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="md:text-2xl font-bold flex justify-center items-center">
        Facilities
      </h2>
      <div className="flex flex-col justify-center items-center ml-8 mt-4 ">
        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-2 gap-1 text-gray-700 md:ml-0 ml:10">
          {hotelFacilities.map((facility) => (
            <label
              className="md:text-sm text-xs flex gap-2 font-semibold"
              key={facility}
            >
              <input
                type="checkbox"
                value={facility}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                      return true;
                    } else {
                      return ("Atleast one facility is required") ;
                    }
                  },
                })}
              />
              {facility}
            </label>
          ))}
        </div>
        {errors.facilities && (
          <span className="text-red-500 font-normal text-sm">
            {errors.facilities.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FacilitiesSection;
