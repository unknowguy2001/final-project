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

  const handleFirstClick = () => {
    setSearchParams((params) => {
      params.set("page", "1");
      return params;
    });
  };

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

  const handleLastClick = () => {
    setSearchParams((params) => {
      params.set("page", totalPages.toString());
      return params;
    });
  };

  return (
    <Flex justifyContent="center" gap={4} alignItems="center">
      <Button onClick={handleFirstClick} isDisabled={isFirstPage}>
        First
      </Button>
      <Button onClick={handlePreviousClick} isDisabled={isFirstPage}>
        Previous
      </Button>
      <Text>
        {page} of {totalPages}
      </Text>
      <Button onClick={handleNextClick} isDisabled={isFinalPage}>
        Next
      </Button>
      <Button onClick={handleLastClick} isDisabled={isFinalPage}>
        Last
      </Button>
    </Flex>
  );
};

export default Pagination;
