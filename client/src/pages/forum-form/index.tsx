import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

import { useFunctions } from "./useFunctions";
import { Editor } from "../../components/editor";

interface ForumFormProps {
  mode: "new" | "edit";
}

export const ForumForm: FC<ForumFormProps> = ({ mode }) => {
  const {
    title,
    handleTitleChange,
    description,
    setDesciption,
    handleActionClick,
  } = useFunctions(mode);

  return (
    <Container as="main" paddingY={8} maxWidth="6xl">
      <Heading as="h1" mb={4} fontSize="3xl">
        {mode === "new" ? "สร้างกระทู้" : "แก้ไขกระทู้"}
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
      <Button onClick={handleActionClick}>บันทึก</Button>
    </Container>
  );
};
