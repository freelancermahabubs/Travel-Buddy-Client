"use client";
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";

import Link from "next/link";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {userLogin} from "@/services/actions/userLogin";
import {storeUserInfo} from "@/services/auth.services";
import {toast} from "sonner";

import BDForm from "@/components/Forms/BDForm";
import BDInput from "@/components/Forms/BDInput";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),

  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    // console.log(values);
    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        toast.success("Login success");
        storeUserInfo({accessToken: res?.data?.accessToken});
      } else {
        setError(res?.data?.message);
        // console.log(res);
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
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login BD Travelers
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}>
                {error}
              </Typography>
            </Box>
          )}

          <Box>
            <BDForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <BDInput
                    name="email"
                    label="Username or Email Address"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <BDInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Link href={"/forgot-password"}>
                <Typography
                  mb={1}
                  textAlign="end"
                  component="p"
                  fontWeight={300}
                  sx={{
                    textDecoration: "underline",
                  }}>
                  Forgot Password?
                </Typography>
              </Link>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit">
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
            </BDForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
