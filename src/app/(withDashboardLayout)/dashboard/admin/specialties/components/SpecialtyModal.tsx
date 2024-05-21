import PHFileUploader from "@/components/Forms/PHFileUploader";
import BDForm from "@/components/Forms/BDForm";
import BDInput from "@/components/Forms/BDInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import {useCreateSpecialtyMutation} from "@/redux/api/specialtiesApi";
import {modifyPayload} from "@/utils/modifyPayload";
import {Button, Grid} from "@mui/material";

import React from "react";
import {FieldValues} from "react-hook-form";
import {toast} from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({open, setOpen}: TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Specialty created successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <BDForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <BDInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{mt: 1}} type="submit">
          Create
        </Button>
      </BDForm>
    </PHModal>
  );
};

export default SpecialtyModal;
