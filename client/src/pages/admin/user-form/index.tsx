import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Select as SelectWithSearch, SingleValue } from "chakra-react-select";

import useFunctions from "./useFunctions";
import { UserData } from "../../../interfaces/user";
import { CompanyNameOption } from "../../register/useFunctions";
import { PasswordChecklist } from "../../../components/password-checklist";
import { PasswordVisibilityToggleButton } from "../../../components/password-visibility-toggle-button";

export const AdminUserForm = () => {
  const {
    userData,
    roles,
    handleChange,
    handleActionClick,
    isNewMode,
    handleCancelClick,
    companyNames,
    isTrained,
    selectedCompany,
    setSelectedCompany,
    isPasswordMoreThan8Characters,
    isPasswordHas1UpperCase,
    isPasswordHas1Number,
    isPasswordHas1SpecialCharacter,
    passwordType,
    switchPasswordType,
    handleUsernameBlur,
  } = useFunctions();

  return (
    <Container
      as="form"
      onSubmit={handleActionClick}
      paddingY={8}
      maxWidth="6xl"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="2xl">
          {isNewMode ? "เพิ่มผู้ใช้ใหม่" : "แก้ไขผู้ใช้"}
        </Heading>
        <FormControl>
          <FormLabel>ชื่อผู้ใช้</FormLabel>
          <Input
            required
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="ชื่อผู้ใช้"
            onBlur={handleUsernameBlur}
          />
        </FormControl>
        {isNewMode && (
          <>
            <FormControl>
              <FormLabel>รหัสผ่าน</FormLabel>
              <Box pos="relative">
                <Input
                  required
                  name="password"
                  value={(userData as UserData).password}
                  onChange={handleChange}
                  placeholder="รหัสผ่าน"
                  type={passwordType}
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
          </>
        )}
        <FormControl isDisabled={userData.username.length < 14 || !isTrained}>
          <FormLabel>บริษัทที่เคยเข้ารับการฝึกสหกิจฯ</FormLabel>
          <SelectWithSearch
            required
            isClearable
            isMulti={false}
            name="companyNames"
            placeholder="เลือกบริษัท"
            options={companyNames}
            closeMenuOnSelect={true}
            value={selectedCompany}
            onChange={(e: SingleValue<CompanyNameOption>) => {
              setSelectedCompany(e!);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>ชื่อจริง</FormLabel>
          <Input
            required
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
            placeholder="ชื่อจริง"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ตำแหน่ง</FormLabel>
          <Select
            required
            name="roleId"
            value={userData.roleId!}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box mt={4}>
        <Button variant="outline" colorScheme="red" onClick={handleCancelClick}>
          ยกเลิก
        </Button>
        <Button ml={2} type="submit">
          ยืนยัน
        </Button>
      </Box>
    </Container>
  );
};
