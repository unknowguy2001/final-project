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

export const AdminAddUser = () => {
  const { userData, roles, handleChange, handleAddUserClick } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Stack spacing={4}>
        <Heading as="h1" fontSize="3xl">
          เพิ่มผู้ใช้ใหม่
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
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="รหัสผ่าน"
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
      <Button onClick={handleAddUserClick} mt={4}>
        เพิ่มผู้ใช้
      </Button>
    </Container>
  );
};
