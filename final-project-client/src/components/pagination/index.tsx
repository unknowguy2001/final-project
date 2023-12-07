import { Button, Flex, Text } from "@chakra-ui/react";

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
  } = useFunctions({ count });

  if (totalPages <= 1) return null;

  return (
    <Flex justifyContent="center" gap={4} alignItems="center">
      <Button
        variant="outline"
        onClick={handleFirstClick}
        isDisabled={isFirstPage}
      >
        First
      </Button>
      <Button
        variant="outline"
        onClick={handlePreviousClick}
        isDisabled={isFirstPage}
      >
        Previous
      </Button>
      <Text>
        {page} of {totalPages}
      </Text>
      <Button
        variant="outline"
        onClick={handleNextClick}
        isDisabled={isFinalPage}
      >
        Next
      </Button>
      <Button
        variant="outline"
        onClick={handleLastClick}
        isDisabled={isFinalPage}
      >
        Last
      </Button>
    </Flex>
  );
};
