import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const Booking = () => {
  //fetch current user endpoint using react query

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  console.log(currentUser?.email);

  return<></>
};

export default Booking;
