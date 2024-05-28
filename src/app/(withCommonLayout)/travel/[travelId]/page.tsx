import {useGetSingleTripQuery} from "@/redux/api/trip";
import React from "react";
import TravelDetails from "./component/TravelDetails";
type PropTypes = {
  params: {
    travelId: string;
  };
};
const TravelDetailPage = async ({params}: PropTypes) => {
  const id = params.travelId;

  return (
    <div>
      <TravelDetails id={id} />
    </div>
  );
};

export default TravelDetailPage;
