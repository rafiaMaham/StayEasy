import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
   const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId, //this query is gonna run only if we have a hotel Id , it will not run if the hotel id is undefined
    }
  );
  

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
    });

    const handleSave = (hotelFormData: FormData) => {
      mutate(hotelFormData);
    };




  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
