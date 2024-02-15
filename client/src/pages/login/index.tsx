import {
  Heading,
  Text,
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  Link,
} from "@chakra-ui/react";
import { Link as ReactRouterDomLink } from "react-router-dom";

import { useFunctions } from "./useFunctions";
import { PasswordVisibilityToggleButton } from "../../components/password-visibility-toggle-button";

export const Login = () => {
  const {
    handleFormSubmit,
    handleInputChange,
    isAuthenticating,
    loginRequest,
    passwordType,
    switchPasswordType,
  } = useFunctions();

  return (
    <>
      <Box>
        <Heading fontSize={32} mb={2}>
          เข้าสู่ระบบ
        </Heading>
        <Text>ค้นหาบริษัทสหกิจศึกษาที่เหมาะกับคุณ</Text>
      </Box>
      <Box
        as="form"
        onSubmit={handleFormSubmit}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <FormControl>
          <FormLabel>รหัสนักศึกษา</FormLabel>
          <Input
            onChange={handleInputChange}
            value={loginRequest.username}
            name="username"
            maxLength={14}
            required
            placeholder="056xxxxxxxxx-x"
          />
        </FormControl>
        <FormControl>
          <FormLabel>รหัสผ่าน</FormLabel>
          <Box pos="relative">
            <Input
              onChange={handleInputChange}
              value={loginRequest.password}
              name="password"
              required
              type={passwordType}
              placeholder="********"
            />
            <PasswordVisibilityToggleButton
              passwordType={passwordType}
              switchPasswordType={switchPasswordType}
            />
          </Box>
        </FormControl>
        <Button mt={4} type="submit" isLoading={isAuthenticating}>
          เข้าสู่ระบบ
        </Button>
      </Box>
      <Text
        color="gray.600"
        _dark={{
          color: "gray.400",
        }}
        textAlign="center"
      >
        ยังไม่มีบัญชีผู้ใช้งาน?{" "}
        <Link
          as={ReactRouterDomLink}
          color="black"
          _dark={{
            color: "white",
          }}
          to="/auth/register"
          textAlign="center"
        >
          สมัครสมาชิก
        </Link>
      </Text>
    </>
  );
};
