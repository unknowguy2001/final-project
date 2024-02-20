import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useFunctions from "./useFunctions";

export const AdminCompanyForm = () => {
  const { isNewMode, register, handleSubmit, onSubmit, formState } =
    useFunctions();

  return (
    <Container
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      paddingY={8}
      maxWidth="6xl"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="2xl">
          {isNewMode ? "เพิ่มบริษัทใหม่" : "แก้ไขบริษัท"}
        </Heading>
        <FormControl isInvalid={!!formState.errors.name}>
          <FormLabel htmlFor="name">
            ชื่อบริษัท{" "}
            <Box display="inline" color="red">
              *
            </Box>
          </FormLabel>
          <Input
            id="name"
            placeholder="ชื่อบริษัท"
            {...register("name", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="address">ที่อยู่</FormLabel>
          <Input id="address" placeholder="ที่อยู่" {...register("address")} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="road">ที่อยู่</FormLabel>
          <Input id="road" placeholder="ถนน" {...register("road")} />
        </FormControl>
        <FormControl>
          <Input placeholder="แขวง/ตำบล" {...register("village")} />
        </FormControl>
        <FormControl>
          <Input placeholder="เขต/อำเภอ" {...register("district")} />
        </FormControl>
        <FormControl>
          <Input placeholder="จังหวัด" {...register("province")} />
        </FormControl>
        <FormControl>
          <Input placeholder="รหัสไปรษณีย์" {...register("zipcode")} />
        </FormControl>
        <FormControl>
          <FormLabel>เบอร์โทรศัพท์</FormLabel>
          <Input placeholder="เบอร์โทรศัพท์" {...register("telephone")} />
        </FormControl>
      </Stack>
      <Flex gap={2} mt={4}>
        <Button
          to="/admin/companies"
          as={Link}
          variant="outline"
          colorScheme="red"
        >
          ยกเลิก
        </Button>
        <Button type="submit">ยืนยัน</Button>
      </Flex>
    </Container>
  );
};
