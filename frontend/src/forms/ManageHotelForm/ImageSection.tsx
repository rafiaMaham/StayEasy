import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="md:text-2xl font-bold flex justify-center items-center ">
        Upload Images
      </h2>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="border rounded p-4 flex flex-col  lg:w-[35%] md:w-[70%] justify-start">
          <input
            type="file"
            multiple
            accept="image/*"
            className=" text-gray-700 font-semibold"
            {...register("imageFiles", {
              validate: (imageFiles) => {
                const totalLength = imageFiles.length;
                if (totalLength === 0) {
                  return "Atleast one image should be uplaoded";
                }
                if (totalLength > 6) {
                  return "Total number of images should not be grater than 6";
                }
                return true;
              },
            })}
          />
        </div>
        {errors.imageFiles && (
          <span className="text-red-500 font-normal text-sm">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
