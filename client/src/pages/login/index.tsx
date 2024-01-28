import {
  Heading,
  Text,
  Input,
  Button,
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

import { useFunctions } from "./useFunctions";
import rmutpLogo from "../../assets/images/rmutp-logo.png";

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
    <Flex height="100%">
      <Flex
        flexBasis={350}
        flexGrow={0}
        flexShrink={0}
        marginBlock={20}
        marginInline={40}
        flexDirection="column"
        gap={8}
      >
        <Image src={rmutpLogo} alt="RMUTP Logo" width="80px" height="63px" />
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
            <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
            <Input
              id="username"
              onChange={handleInputChange}
              value={loginRequest.username}
              name="username"
              required
              placeholder="กรอกชื่อผู้ใช้งาน"
            />
          </FormControl>
          <FormControl>
            <FormLabel>รหัสผ่าน</FormLabel>
            <Box position="relative">
              <Input
                id="password"
                onChange={handleInputChange}
                value={loginRequest.password}
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
                    passwordType === "password"
                      ? "lucide:eye"
                      : "lucide:eye-off"
                  }
                />
              </Box>
            </Box>
          </FormControl>
          <Button mt={4} type="submit" isLoading={isAuthenticating}>
            เข้าสู่ระบบ
          </Button>
        </Box>
      </Flex>
      <Box>
        <Image
          src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          objectFit="cover"
          objectPosition="center"
          height="100%"
          alt="RMUTP Place"
        />
      </Box>
    </Flex>
  );
};
