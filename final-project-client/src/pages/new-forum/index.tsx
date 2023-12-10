import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import { useFunctions } from "./useFunctions";
import { Editor } from "../../components/editor";

export const NewForum = () => {
  const {
    title,
    handleTitleChange,
    description,
    setDesciption,
    handleNewForumClick,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth={1024}>
      <Heading as="h1" mb={4} fontSize="3xl">
        สร้างกระทู้ใหม่
      </Heading>
      <FormControl mb={4}>
        <FormLabel>หัวข้อ</FormLabel>
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="หัวข้อ"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>รายละเอียด</FormLabel>
        <Editor
          placeholder="รายละเอียด"
          data={description}
          setData={setDesciption}
        />
      </FormControl>
      <Button onClick={handleNewForumClick}>สร้างกระทู้</Button>
    </Container>
  );
};
