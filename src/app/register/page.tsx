"use client";
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";

import Link from "next/link";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";

import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {userLogin} from "@/services/actions/userLogin";
import {storeUserInfo} from "@/services/auth.services";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import BDInput from "@/components/Forms/BDInput";
import BDForm from "@/components/Forms/BDForm";

import {useUserCreateMutation} from "@/redux/api/userApi";

export const userValidationSchema = z.object({
  username: z.string().min(1, "Please enter your username!"),
  email: z.string().email("Please enter a valid email address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  user: userValidationSchema,
});

export const defaultValues = {
  password: "",
  user: {
    username: "",
    email: "",
    password: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();
  const [userCreate, {isLoading}] = useUserCreateMutation();
  const handleRegister = async (values: FieldValues) => {
    const data = values;

    try {
      const res = await userCreate(data);

      if (res?.data?.data?.id) {
        toast.success(res?.data?.message);
        const result = await userLogin({
          password: values.password,
          email: values?.user.email,
          username: values?.user.username,
        });
        console.log(result);
        if (result?.data?.accessToken) {
          storeUserInfo({accessToken: result?.data?.accessToken});
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box>BD Travelers</Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <BDForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <BDInput
                    label="Username"
                    fullWidth={true}
                    name="user.username"
                  />
                </Grid>
                <Grid item md={6}>
                  <BDInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="user.email"
                  />
                </Grid>
                <Grid item md={6}>
                  <BDInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <BDInput
                    label="Confirm Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit">
                {isLoading ? "Loading..." : "Register"}
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </BDForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
