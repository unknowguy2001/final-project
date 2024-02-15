import {
  Heading,
  Text,
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  Flex,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link as ReactRouterDomLink } from "react-router-dom";

import { useFunctions } from "./useFunctions";
import { PasswordChecklist } from "../../components/password-checklist";
import { PasswordVisibilityToggleButton } from "../../components/password-visibility-toggle-button";

export const Register = () => {
  const {
    handleFormSubmit,
    handleInputChange,
    isAuthenticating,
    registerData,
    passwordType,
    switchPasswordType,
    isPasswordMoreThan8Characters,
    isPasswordHas1UpperCase,
    isPasswordHas1Number,
    isPasswordHas1SpecialCharacter,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordType,
    switchConfirmPasswordType,
    isConfirmPasswordInvalid,
  } = useFunctions();

  return (
    <>
      <Box>
        <Heading fontSize={32} mb={2}>
          สมัครสมาชิก
        </Heading>
        <Text>สมัครสมาชิกเพื่อเข้าสู่ระบบ</Text>
      </Box>
      <Box
        as="form"
        onSubmit={handleFormSubmit}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Flex gap={4}>
          <FormControl>
            <FormLabel>ชื่อ</FormLabel>
            <Input
              onChange={handleInputChange}
              value={registerData.firstName}
              name="firstName"
              required
              placeholder="สมชาย"
            />
          </FormControl>
          <FormControl>
            <FormLabel>นามสกุล</FormLabel>
            <Input
              onChange={handleInputChange}
              value={registerData.lastName}
              name="lastName"
              required
              placeholder="ใจดี"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>รหัสนักศึกษา</FormLabel>
          <Input
            onChange={handleInputChange}
            value={registerData.username}
            name="username"
            maxLength={14}
            required
            placeholder="056xxxxxxxxx-x"
          />
        </FormControl>
        <FormControl>
          <FormLabel>รหัสผ่าน</FormLabel>
          <Box position="relative">
            <Input
              onChange={handleInputChange}
              value={registerData.password}
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
          <PasswordChecklist
            isPasswordMoreThan8Characters={isPasswordMoreThan8Characters}
            isPasswordHas1UpperCase={isPasswordHas1UpperCase}
            isPasswordHas1Number={isPasswordHas1Number}
            isPasswordHas1SpecialCharacter={isPasswordHas1SpecialCharacter}
          />
        </FormControl>
        <FormControl isInvalid={isConfirmPasswordInvalid}>
          <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
          <Box position="relative">
            <Input
              pos="relative"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              type={confirmPasswordType}
              placeholder="********"
            />
            <PasswordVisibilityToggleButton
              passwordType={confirmPasswordType}
              switchPasswordType={switchConfirmPasswordType}
            />
          </Box>
          {isConfirmPasswordInvalid && (
            <FormErrorMessage>รหัสผ่านไม่ตรงกัน</FormErrorMessage>
          )}
        </FormControl>
        <Button mt={4} type="submit" isLoading={isAuthenticating}>
          สมัครสมาชิก
        </Button>
      </Box>
      <Text
        color="gray.600"
        _dark={{
          color: "gray.400",
        }}
        textAlign="center"
      >
        มีบัญชีอยู่แล้ว?{" "}
        <Link
          as={ReactRouterDomLink}
          color="black"
          _dark={{
            color: "white",
          }}
          to="/auth/login"
          textAlign="center"
        >
          เข้าสู่ระบบ
        </Link>
      </Text>
    </>
  );
};
