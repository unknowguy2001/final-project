import { useSearchParams } from "react-router-dom";

const PER_PAGE = 12;

interface UseFunctionsProps {
  count: number;
}
export const useFunctions = ({ count }: UseFunctionsProps) => {
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

  return {
    page,
    totalPages,
    isFirstPage,
    isFinalPage,
    handleFirstClick,
    handlePreviousClick,
    handleNextClick,
    handleLastClick,
  };
};
