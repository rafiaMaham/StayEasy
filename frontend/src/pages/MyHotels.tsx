import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useAppContext } from "../contexts/AppContext";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="md:text-3xl font-bold flex justify-center items-center">
          My Hotels
        </h1>

        <Link
          to="/add-hotel"
          className="flex bg-purple-600 text-white text-sm md:text-lg  font-bold md:p-3 p-2 hover:bg-purple-500 rounded-lg"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-5">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid md:grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.country}, {hotel.city}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex  items-center">
                <BiMoney className="mr-1" />₹{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-purple-600 text-white text-sm  font-bold p-2 hover:bg-purple-500 rounded-lg"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
