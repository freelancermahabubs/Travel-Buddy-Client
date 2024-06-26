"use client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import {useGetAllTripsQuery} from "@/redux/api/trip";
import {useState} from "react";
import {useDebounced} from "@/redux/hooks";

const TravelCard = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const {data: trips, isLoading} = useGetAllTripsQuery({...query});
  const meta = trips?.meta;
 

  return (
    <Box
      sx={{
        my: 10,
     
      }}>
      <Box sx={{textAlign: "center"}}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Travels
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400} sx={{mt: 2}}>
          Your Trip Starts Here
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          and top-quality surgery facilities right here.
        </Typography>
      </Box>

      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <Container sx={{margin: "30px auto"}}>
          <Grid container spacing={2}>
            {trips?.trips?.map((trip: any) => (
              <Grid item key={trip?.id} md={4}>
                <Link href={`/travel/${trip?.id}`}>
                  {" "}
                  <Card>
                    <Box
                      sx={{
                        width: "100%",
                        height: 300,
                        "& img": {
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                          objectFit: "cover",
                        },
                      }}>
                      <Image
                        src={trip?.photos[0]}
                        alt="photo"
                        width={500}
                        height={100}
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {trip.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trip.travelDates}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        <LocationOnIcon /> {trip.destination}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trip.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
     
        </Container>
      )}
    </Box>
  );
};

export default TravelCard;
