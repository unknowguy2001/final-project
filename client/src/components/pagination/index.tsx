import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";

import useFunctions from "./useFunctions";

interface PaginationProps {
  count: number;
}

export const Pagination = ({ count }: PaginationProps) => {
  const {
    totalPages,
    handleFirstClick,
    handleLastClick,
    handleNextClick,
    handlePreviousClick,
    isFinalPage,
    isFirstPage,
    page,
    perPage,
    handlePerPageChange,
  } = useFunctions({ count });

  return (
    <Box
      _empty={{
        mt: 0,
      }}
      mt={4}
    >
      {totalPages > 1 && (
        <Flex
          zIndex={1}
          gap={[4, 4, 8]}
          flexWrap="wrap"
          justifyContent={["center", "center", "center", "space-between"]}
          alignItems="center"
        >
          <Flex gap={4} alignItems="center">
            <Text>แสดง</Text>
            <Select
              size={["sm", "md"]}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </Select>
            <Text whiteSpace="nowrap">รายการต่อหน้า</Text>
          </Flex>
          <Flex gap={4} alignItems="center">
            <Button
              size={["sm", "md"]}
              variant="outline"
              onClick={handleFirstClick}
              isDisabled={isFirstPage}
            >
              แรกสุด
            </Button>
            <Button
              size={["sm", "md"]}
              variant="outline"
              onClick={handlePreviousClick}
              isDisabled={isFirstPage}
            >
              ก่อนหน้า
            </Button>
            <Text>
              {page} / {totalPages}
            </Text>
            <Button
              size={["sm", "md"]}
              variant="outline"
              onClick={handleNextClick}
              isDisabled={isFinalPage}
            >
              ถัดไป
            </Button>
            <Button
              size={["sm", "md"]}
              variant="outline"
              onClick={handleLastClick}
              isDisabled={isFinalPage}
            >
              สุดท้าย
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
