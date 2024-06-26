"use client";

import useUserInfo from "@/hooks/useUserInfo";
import {logoutUser} from "@/services/actions/logoutUser";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/navigation";


const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };


  return (
    <Box
      sx={{
        bgcolor: "primary.main",
      }}>
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="#ffffff">
            B
            <Box component="span" color="#ffffff">
              D
            </Box>{" "}
            Travelers
          </Typography>

          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography component={Link} href="/" color="#ffffff">
              Home
            </Typography>

            <Typography component={Link} href="/about-us" color="#ffffff">
              About Us
            </Typography>

            {userInfo?.userId ? (
              <Typography component={Link} href="/dashboard" color="#ffffff">
                Dashboard
              </Typography>
            ) : null}

            <Typography color="#ffffff">My Profile</Typography>
          </Stack>

          {userInfo?.userId ? (
            <Button color="error" onClick={handleLogOut} sx={{boxShadow: 0}}>
              Logout
            </Button>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
