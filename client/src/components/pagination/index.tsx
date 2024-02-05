import { Button, Flex, Select, Text } from "@chakra-ui/react";

import { useFunctions } from "./useFunctions";

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
    <>
      {count >= 1 && (
        <Flex zIndex={1} justifyContent="space-between" alignItems="center">
          <Flex gap={4} alignItems="center">
            <Text>แสดง</Text>
            <Select
              value={perPage}
              onChange={handlePerPageChange}
              width="150px"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </Select>
            <Text width="100%">รายการต่อหน้า</Text>
          </Flex>
          <Flex gap={4} alignItems="center">
            <Button
              variant="outline"
              onClick={handleFirstClick}
              isDisabled={isFirstPage}
            >
              แรกสุด
            </Button>
            <Button
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
              variant="outline"
              onClick={handleNextClick}
              isDisabled={isFinalPage}
            >
              ถัดไป
            </Button>
            <Button
              variant="outline"
              onClick={handleLastClick}
              isDisabled={isFinalPage}
            >
              สุดท้าย
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};
