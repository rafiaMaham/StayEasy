import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery("fetchMyHotelById", () =>
    apiClient.fetchMyHotelById(hotelId || ""), {
        enabled: !!hotelId,
    }
  );
  //this query is gonna run only if we have a hotel Id , it will not run if the hotel id is undefined

  return <ManageHotelForm hotel={hotel} />;
};

export default EditHotel;
