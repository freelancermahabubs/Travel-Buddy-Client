"use client";

import {useGetMYProfileQuery} from "@/redux/api/myProfile";

import React, {useState} from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import {Box, Button, Container, Grid} from "@mui/material";
import Image from "next/image";
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data, isLoading} = useGetMYProfileQuery(undefined);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
        data={data}
      />
      <Container sx={{mt: 4}}>
        <Grid container spacing={4}>
          <Box
            sx={{
              height: 300,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
            }}>
            <Image
              height={300}
              width={400}
              src={data?.data?.profilePhoto}
              alt="User Photo"
            />
          </Box>
          <Button
            sx={{width: 200}}
            endIcon={<ModeEditIcon />}
            onClick={() => setIsModalOpen(true)}>
            Edit Profile
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
