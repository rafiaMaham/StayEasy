import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="md:text-3xl font-bold flex justify-center items-center">
        Add Hotel
      </h1>

      <div className="flex flex-col w-full gap-5 justify-center items-center">
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Name
          <input
            type="name"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1 "
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && (
            <span className="text-red-500 font-normal text-sm">
              {errors.name.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Country
          <input
            type="text"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1 "
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 font-normal text-sm">
              {errors.country.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          City
          <input
            type="text"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1 "
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 font-normal text-sm">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col md:mr-0 mr-5 ">
          Description
          <textarea
            rows={3}
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1 "
            {...register("description", { required: "This field is required" })}
          />
          {errors.description && (
            <span className="text-red-500 font-normal text-sm">
              {errors.description.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Price per night
          <input
            type="number"
            min={1}
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1  "
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 font-normal text-sm">
              {errors.pricePerNight.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Rating
          <select
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1 md:mr-0 mr-10"
            {...register("starRating", { required: "This field is required" })}
          >
            <option value="" className="text-sm ">
              Select as rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 font-normal text-sm">
              {errors.starRating.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
