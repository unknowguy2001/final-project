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
  const { companyData, handleChange, handleAddCompanyClick } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Stack spacing={4}>
        <Heading as="h1" fontSize="3xl">
          เพิ่มบริษัทใหม่
        </Heading>
        <FormControl>
          <FormLabel>ชื่อบริษัท</FormLabel>
          <Input
            name="name"
            value={companyData.name}
            onChange={handleChange}
            placeholder="ชื่อบริษัท"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ที่อยู่</FormLabel>
          <Input
            name="address"
            value={companyData.address}
            onChange={handleChange}
            placeholder="ที่อยู่"
          />
        </FormControl>
        <FormControl>
          <Input
            name="road"
            value={companyData.road}
            onChange={handleChange}
            placeholder="ถนน"
          />
        </FormControl>
        <FormControl>
          <Input
            name="village"
            value={companyData.village}
            onChange={handleChange}
            placeholder="แขวง/ตำบล"
          />
        </FormControl>
        <FormControl>
          <Input
            name="district"
            value={companyData.district}
            onChange={handleChange}
            placeholder="เขต/อำเภอ"
          />
        </FormControl>
        <FormControl>
          <Input
            name="province"
            value={companyData.province}
            onChange={handleChange}
            placeholder="จังหวัด"
          />
        </FormControl>
        <FormControl>
          <Input
            name="zipcode"
            value={companyData.zipcode}
            onChange={handleChange}
            placeholder="รหัสไปรษณีย์"
          />
        </FormControl>
        <FormControl>
          <FormLabel>เบอร์โทรศัพท์</FormLabel>
          <Input
            value={companyData.telephone}
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
