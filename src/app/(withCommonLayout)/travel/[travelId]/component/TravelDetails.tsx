"use client";
import React from "react";
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useGetSingleTripQuery} from "@/redux/api/trip";
type PropTypes = {
  id: string;
};
const TravelDetails = ({id}: PropTypes) => {
  const {data, isLoading} = useGetSingleTripQuery(id);

  const travelDetails = data?.data;

  const handleRequestClick = (id: string) => {
    console.log(id);
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container mx-auto my-8">
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {travelDetails?.destination}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {travelDetails?.description}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Travel Dates:</strong> {travelDetails?.travelDates}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Travel Type:</strong> {travelDetails?.travelType}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                className="mt-5 pt-2"
                onClick={() => handleRequestClick(travelDetails?.id)}>
                Request to Join
              </Button>
            </CardContent>
            <div className="flex justify-center">
              {travelDetails?.photos?.map((imageUrl: any, index: number) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="200"
                  image={imageUrl}
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TravelDetails;
