import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useFunctions } from "./useFunctions";

export const AdminEditUser = () => {
  const { userData, roles, handleChange, handleSaveUserClick } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Stack spacing={4}>
        {JSON.stringify(userData)}
        <Heading as="h1" fontSize="3xl">
          แก้ไขผู้ใช้
        </Heading>
        <FormControl>
          <FormLabel>ชื่อผู้ใช้</FormLabel>
          <Input
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="ชื่อผู้ใช้"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ชื่อจริง</FormLabel>
          <Input
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
            placeholder="ชื่อจริง"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ตำแหน่ง</FormLabel>
          <Select name="roleId" value={userData.roleId} onChange={handleChange}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button onClick={handleSaveUserClick} mt={4}>
        บันทึก
      </Button>
    </Container>
  );
};
