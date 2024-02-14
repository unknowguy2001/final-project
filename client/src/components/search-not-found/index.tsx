import { AspectRatio, Flex, Image, Text } from "@chakra-ui/react";

export const SearchNotFound = () => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <AspectRatio width="100%" maxWidth="500px" ratio={16 / 9}>
        <Image width="100%" height="100%" src="decrease.png" />
      </AspectRatio>
      <Text textAlign="center" fontWeight="bold">
        ไม่พบข้อมูลที่ค้นหา
      </Text>
    </Flex>
  );
};
