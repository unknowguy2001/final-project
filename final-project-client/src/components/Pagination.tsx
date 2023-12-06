import { useSearchParams } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";

interface PaginationProps {
  count: number;
}

const PER_PAGE = 12;

const Pagination = ({ count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")!) || 1;

  const totalPages = Math.ceil(count / PER_PAGE);

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

export default Pagination;
