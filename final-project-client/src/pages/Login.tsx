import {
  Card,
  CardHeader,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  CardBody,
  Center,
  Checkbox,
  Box,
  CardFooter,
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

import axiosInstance from "../axiosInstance";
import { IAuthInfo, ILoginRequest } from "../interfaces/auth";
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

  const handleLoginClick = async () => {
    try {
      setIsAuthenticating(true);
      const response = await axiosInstance.post<IAuthInfo>(
        "/auth/login",
        loginRequest
      );
      setAuthInfo(response.data);
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
    <Center height="100%">
      <Card maxWidth="350px" width="100%">
        <CardHeader textAlign="center">
          <Heading mb={4}>Log in</Heading>
          <Text>Explore internships and part-time jobs</Text>
        </CardHeader>
        <CardBody>
          <Stack spacing="4">
            <Input
              onChange={handleInputChange}
              value={loginRequest.username}
              name="username"
              placeholder="Username"
            />
            <Box position="relative">
              <Input
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
            <Box>
              <Checkbox>Remember me</Checkbox>
            </Box>
            <Button isLoading={isAuthenticating} onClick={handleLoginClick}>
              Log in
            </Button>
          </Stack>
        </CardBody>
        <CardFooter justifyContent="center">
          <Text>
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
