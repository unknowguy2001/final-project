import {
  Card,
  CardHeader,
  Heading,
  Text,
  Input,
  Button,
  CardBody,
  Center,
  Box,
  CardFooter,
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

import axiosInstance from "../axiosInstance";
import { ILoginRequest, ILoginResponse } from "../interfaces/auth";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { setAuthInfo } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [loginRequest, setLoginRequest] = useState<ILoginRequest>({
    username: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const switchPasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const visibilityIcon =
    passwordType === "password" ? <ViewIcon /> : <ViewOffIcon />;

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsAuthenticating(true);
      const response = await axiosInstance.post<ILoginResponse>(
        "/auth/login",
        loginRequest
      );
      setAuthInfo(response.data.authInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginRequest((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Center
      background="radial-gradient(50% 50% at 50% 50%, rgba(77, 0, 255, 0.25) 0.01%, rgba(255, 255, 255, 0.25) 100%), #FFF"
      height="100%"
    >
      <Card gap={8} borderRadius={16} padding={8} maxWidth="350px" width="100%">
        <CardHeader p={0} textAlign="center">
          <Heading fontSize="4xl" mb={4}>
            Login
          </Heading>
          <Text fontSize="sm">Explore internships and part-time jobs</Text>
        </CardHeader>
        <CardBody p={0}>
          <Box
            as="form"
            onSubmit={handleFormSubmit}
            display="flex"
            flexDirection="column"
            gap={4}
          >
            <Input
              id="username"
              onChange={handleInputChange}
              value={loginRequest.username}
              name="username"
              placeholder="Username"
            />
            <Box position="relative">
              <Input
                id="password"
                onChange={handleInputChange}
                value={loginRequest.password}
                name="password"
                type={passwordType}
                placeholder="Password"
              />
              <Box
                position="absolute"
                right={4}
                top="50%"
                zIndex={1}
                transform="translateY(-50%)"
                cursor="pointer"
                onClick={switchPasswordType}
              >
                {visibilityIcon}
              </Box>
            </Box>
            <Button type="submit" isLoading={isAuthenticating}>
              Login
            </Button>
          </Box>
        </CardBody>
        <CardFooter p={0} justifyContent="center">
          <Text fontSize="sm">
            Log in with{" "}
            <Link to="https://www.rmutp.ac.th/passport" as={ReactRouterLink}>
              RMUTP Passport
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default Login;
