import avatar from "animal-avatar-generator";
import { Box, Flex, Heading } from "@chakra-ui/react";

interface UserProfileProps {
  avatarSize?: number;
  fullname: string | undefined;
  rightNode?: React.ReactNode;
  verticalInfo?: boolean;
}

export const UserProfile = ({
  avatarSize = 32,
  fullname = "",
  rightNode,
  verticalInfo = false,
}: UserProfileProps) => {
  if (verticalInfo) {
    avatarSize = 48;
  }
  return (
    <Flex gap={2} align="center">
      <Box
        dangerouslySetInnerHTML={{
          __html: avatar(fullname, {
            size: avatarSize,
          }),
        }}
      />
      <Flex
        gap={verticalInfo ? 1 : 2}
        align={verticalInfo ? "flex-start" : "center"}
        flexDirection={verticalInfo ? "column" : "row"}
      >
        <Heading fontSize="sm" fontWeight="500" as="h4">
          {fullname}
        </Heading>
        {rightNode}
      </Flex>
    </Flex>
  );
};
