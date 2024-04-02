import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formData: HotelFormData) => {
    //create new formdata object and call our API
    try {
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />

        <div className="flex justify-center items-center mt-4">
          <span className="flex justify-center items-center w-[80%]">
            <button
              type="submit"
              className="text-white text-sm md:text-lg  md:p-3  p-2 bg-purple-600 font-bold hover:bg-purple-500 rounded-lg mt-2 flex justify-center items-center w-full md:w-[500px] "
            >
              Save
            </button>
          </span>
        </div>
      </form>
      ;
    </FormProvider>
  );
};

export default ManageHotelForm;
