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
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";

import { useFunctions } from "./useFunctions";
import { PasswordChecklist } from "../../components/password-checklist";

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
              placeholder="กรอกชื่อ"
            />
          </FormControl>
          <FormControl>
            <FormLabel>นามสกุล</FormLabel>
            <Input
              onChange={handleInputChange}
              value={registerData.lastName}
              name="lastName"
              required
              placeholder="กรอกนามสกุล"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
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
              placeholder="กรอกรหัสผ่าน"
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
              <Icon
                icon={
                  passwordType === "password" ? "lucide:eye" : "lucide:eye-off"
                }
              />
            </Box>
          </Box>
          <PasswordChecklist
            isPasswordMoreThan8Characters={isPasswordMoreThan8Characters}
            isPasswordHas1UpperCase={isPasswordHas1UpperCase}
            isPasswordHas1Number={isPasswordHas1Number}
            isPasswordHas1SpecialCharacter={isPasswordHas1SpecialCharacter}
          />
        </FormControl>
        <Button mt={4} type="submit" isLoading={isAuthenticating}>
          สมัครสมาชิก
        </Button>
      </Box>
      <Text color="gray.600" textAlign="center">
        มีบัญชีอยู่แล้ว?{" "}
        <Link as={RouterLink} color="black" to="/auth/login" textAlign="center">
          เข้าสู่ระบบ
        </Link>
      </Text>
    </>
  );
};
