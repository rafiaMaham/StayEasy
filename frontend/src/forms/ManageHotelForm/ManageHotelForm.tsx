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

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLaoding: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    //create new formdata object and call our API
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("country", formDataJson.country);
    formData.append("city", formDataJson.city);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);

    // try {
    //   console.log(formData);
    // } catch (error) {
    //   console.log(error);
    // }
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
              disabled={isLoading}
              type="submit"
              className="text-white text-sm md:text-lg  md:p-3  p-2 bg-purple-600 font-bold hover:bg-purple-500 rounded-lg mt-2 flex justify-center items-center w-full md:w-[500px] disabled:bg-gray-500"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </span>
        </div>
      </form>
      ;
    </FormProvider>
  );
};

export default ManageHotelForm;
