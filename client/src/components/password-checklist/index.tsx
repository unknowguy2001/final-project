import { Icon } from "@iconify/react";
import { Flex, Stack } from "@chakra-ui/react";

interface PasswordChecklistProps {
  isPasswordMoreThan8Characters: boolean;
  isPasswordHas1UpperCase: boolean;
  isPasswordHas1Number: boolean;
  isPasswordHas1SpecialCharacter: boolean;
}

export const PasswordChecklist = ({
  isPasswordMoreThan8Characters,
  isPasswordHas1UpperCase,
  isPasswordHas1Number,
  isPasswordHas1SpecialCharacter,
}: PasswordChecklistProps) => {
  return (
    <Stack pt={4} px={4}>
      <Flex
        alignItems="center"
        gap={2}
        fontSize="sm"
        color={isPasswordMoreThan8Characters ? "green.500" : "gray.500"}
      >
        <Icon
          icon={
            isPasswordMoreThan8Characters
              ? "lucide:check-circle-2"
              : "lucide:x-circle"
          }
        />{" "}
        รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร
      </Flex>
      <Flex
        alignItems="center"
        gap={2}
        fontSize="sm"
        color={isPasswordHas1UpperCase ? "green.500" : "gray.500"}
      >
        <Icon
          icon={
            isPasswordHas1UpperCase
              ? "lucide:check-circle-2"
              : "lucide:x-circle"
          }
        />{" "}
        รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
      </Flex>
      <Flex
        alignItems="center"
        gap={2}
        fontSize="sm"
        color={isPasswordHas1Number ? "green.500" : "gray.500"}
      >
        <Icon
          icon={
            isPasswordHas1Number ? "lucide:check-circle-2" : "lucide:x-circle"
          }
        />{" "}
        รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว
      </Flex>
      <Flex
        alignItems="center"
        gap={2}
        fontSize="sm"
        color={isPasswordHas1SpecialCharacter ? "green.500" : "gray.500"}
      >
        <Icon
          icon={
            isPasswordHas1SpecialCharacter
              ? "lucide:check-circle-2"
              : "lucide:x-circle"
          }
        />{" "}
        รหัสผ่านต้องมีอักษรพิเศษอย่างน้อย 1 ตัว
      </Flex>
    </Stack>
  );
};
