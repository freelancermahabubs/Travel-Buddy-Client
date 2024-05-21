import {Box, Button, Container, Typography} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
      }}>
      <Box sx={{flex: 1, position: "relative"}}>
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            left: "-90px",
            top: "-120px",
          }}>
          <Image src={assets.svgs.grid} alt="doctor1" />
        </Box>
        <Typography variant="h2" component="h1" fontWeight={600}>
          Find Your Perfect
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          color="primary.main">
          Travel Buddy!
        </Typography>
        <Typography
          variant="subtitle1"
          component="a"
          fontWeight={400}
          color="primary.main">
          No matter where in the world you want to go, we can help get you
          there,
        </Typography>

        <Box sx={{display: "flex", gap: 2, my: 4}}>
          <Button>Share Your Trip</Button>
          <Button variant="outlined">Contact us</Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 0,
        }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}>
          <Box mt={4}>
            <Image
              src={assets.images.familyOnBeach}
              width={600}
              height={380}
              alt="doctor1"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
