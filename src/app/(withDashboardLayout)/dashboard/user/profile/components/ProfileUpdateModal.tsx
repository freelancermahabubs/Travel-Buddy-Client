/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState} from "react";

import BDForm from "@/components/Forms/BDForm";
import {FieldValues} from "react-hook-form";
import {Button, Grid} from "@mui/material";
import BDInput from "@/components/Forms/BDInput";

import {Gender} from "@/types";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUpdateMYProfileMutation} from "@/redux/api/myProfile";

import {Box} from "@mui/material";

import {singleImageUpload} from "@/redux/hooks";
import BDFullScreenModal from "@/components/Shared/BDModal/BDFullScreenModal";
import BDSelectField from "@/components/Forms/BDSelectField";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  data: object;
};

const ProfileUpdateModal = ({open, setOpen, data, id}: TProps) => {
  const [profilePhoto, setProfilePhoto] = useState();
  const [updateMYProfile, {isLoading: updating}] = useUpdateMYProfileMutation();

  const handleChangeUploadImage = async (event: any) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      await singleImageUpload(formData, setProfilePhoto);
    } catch (error) {
      console.log("Error uploading image");
    }
  };
  const validationSchema = z.object({
    username: z.string().optional(),
    gender: z.string().optional(),
  });
  const submitHandler = async (values: FieldValues) => {
    const data = {
      ...values,
      profilePhoto,
    };
    const res = await updateMYProfile(data);
    console.log(res);
  };

  return (
    <BDFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <BDForm
        onSubmit={submitHandler}
        // defaultValues=
        resolver={zodResolver(validationSchema)}>
        <Grid container spacing={2} sx={{my: 5}}>
          <Grid item xs={12} sm={12} md={4}>
            <BDInput name="username" label="User Name" sx={{mb: 2}} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BDInput
              name="email"
              type="email"
              label="Email"
              sx={{mb: 2}}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <BDSelectField
              items={Gender}
              name="gender"
              label="Gender"
              sx={{mb: 2}}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <input
                  name="profilePhoto"
                  type="file"
                  onChange={handleChangeUploadImage}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Button type="submit">Save</Button>
      </BDForm>
    </BDFullScreenModal>
  );
};

export default ProfileUpdateModal;
