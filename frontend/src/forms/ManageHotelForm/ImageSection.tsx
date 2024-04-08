import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

   const handleDelete = (
     event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
     imageUrl: string
   ) => {
     event.preventDefault();
     setValue(
       "imageUrls",
       existingImageUrls.filter((url) => url !== imageUrl)
     );
   };


  return (
    <div>
      <h2 className="md:text-2xl font-bold flex justify-center items-center ">
        Upload Images
      </h2>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="border rounded p-4 flex flex-col  lg:w-[35%] md:w-[70%] w-[70%] justify-start ">
          {existingImageUrls && (
            
              <div className="grid grid-cols-6 gap-4 mb-4">
                {existingImageUrls.map((url) => (
                  <div className="relative group">
                    <img src={url} className="min-h-full object-cover" />
                    <button 
                    onClick={(event)=> handleDelete(event, url)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            className=" text-gray-700 font-semibold"
            {...register("imageFiles", {
              validate: (imageFiles) => {
                const totalLength =
                  imageFiles.length + (existingImageUrls?.length || 0);
                  
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
