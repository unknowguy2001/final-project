import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useFunctions } from "./useFunctions";

export const NewCompany = () => {
  const { handleChange, handleAddCompanyClick } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Stack spacing={4}>
        <Heading as="h1" fontSize="3xl">
          เพิ่มบริษัทใหม่
        </Heading>
        <FormControl>
          <FormLabel>ชื่อบริษัท</FormLabel>
          <Input name="name" onChange={handleChange} placeholder="ชื่อบริษัท" />
        </FormControl>
        <FormControl>
          <FormLabel>ที่อยู่</FormLabel>
          <Input name="address" onChange={handleChange} placeholder="ที่อยู่" />
        </FormControl>
        <FormControl>
          <Input name="road" onChange={handleChange} placeholder="ถนน" />
        </FormControl>
        <FormControl>
          <Input
            name="village"
            onChange={handleChange}
            placeholder="แขวง/ตำบล"
          />
        </FormControl>
        <FormControl>
          <Input
            name="district"
            onChange={handleChange}
            placeholder="เขต/อำเภอ"
          />
        </FormControl>
        <FormControl>
          <Input
            name="province"
            onChange={handleChange}
            placeholder="จังหวัด"
          />
        </FormControl>
        <FormControl>
          <Input
            name="zipcode"
            onChange={handleChange}
            placeholder="รหัสไปรษณีย์"
          />
        </FormControl>
        <FormControl>
          <FormLabel>เบอร์โทรศัพท์</FormLabel>
          <Input
            name="telephone"
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์"
          />
        </FormControl>
      </Stack>
      <Button onClick={handleAddCompanyClick} mt={4}>
        เพิ่มบริษัท
      </Button>
    </Container>
  );
};
