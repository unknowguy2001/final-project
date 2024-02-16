import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

import useFunctions from "./useFunctions";
import { Editor } from "../../components/editor";

export const ForumForm = () => {
  const {
    title,
    handleTitleChange,
    description,
    setDesciption,
    handleActionClick,
    mode,
    handleCancelClick,
    isForumLoading,
    isActionLoading,
  } = useFunctions();

  return (
    <Container as="main" paddingY={8} maxWidth="6xl">
      <Heading as="h1" mb={4} fontSize="2xl">
        {mode === "new" ? "สร้างกระทู้" : "แก้ไขกระทู้"}
      </Heading>
      <FormControl mb={4}>
        <FormLabel>หัวข้อ</FormLabel>
        <Input
          isDisabled={isActionLoading}
          value={isForumLoading ? "กำลังโหลด..." : title}
          onChange={handleTitleChange}
          placeholder="หัวข้อ"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>รายละเอียด</FormLabel>
        <Editor
          placeholder="รายละเอียด"
          data={isForumLoading ? "กำลังโหลด..." : description}
          setData={setDesciption}
        />
      </FormControl>
      <Button
        isDisabled={isActionLoading}
        variant="outline"
        colorScheme="red"
        onClick={handleCancelClick}
      >
        ยกเลิก
      </Button>
      <Button isLoading={isActionLoading} ml={2} onClick={handleActionClick}>
        ยืนยัน
      </Button>
    </Container>
  );
};
