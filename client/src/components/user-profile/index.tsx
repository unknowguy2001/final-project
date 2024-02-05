import avatar from "animal-avatar-generator";
import { Box, Flex, Heading } from "@chakra-ui/react";

interface UserProfileProps {
  avatarSize?: number;
  fullname: string | undefined;
  rightNode?: React.ReactNode;
}

export const UserProfile = ({
  avatarSize = 32,
  fullname = "",
  rightNode,
}: UserProfileProps) => {
  return (
    <Flex gap={2} align="center">
      <Box
        dangerouslySetInnerHTML={{
          __html: avatar(fullname, {
            size: avatarSize,
          }),
        }}
      />
      <Heading fontSize="sm" fontWeight="500" as="h4">
        {fullname}
      </Heading>
      {rightNode}
    </Flex>
  );
};
