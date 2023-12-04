import { Button, Flex, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")!) || 1;

  const isFirstPage = page === 1;
  const isFinalPage = page >= totalPages;

  const handlePreviousClick = () => {
    setSearchParams((params) => {
      params.set("page", (page - 1).toString());
      return params;
    });
  };

  const handleNextClick = () => {
    setSearchParams((params) => {
      params.set("page", (page + 1).toString());
      return params;
    });
  };

  return (
    <Flex justifyContent="center" gap={4} alignItems="center">
      <Button onClick={handlePreviousClick} isDisabled={isFirstPage}>
        Previous
      </Button>
      <Text>
        {page} of {totalPages}
      </Text>
      <Button onClick={handleNextClick} isDisabled={isFinalPage}>
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
