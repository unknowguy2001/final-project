import { useSearchParams } from "react-router-dom";

const DEFAULT_PER_PAGE = 12;

interface UseFunctionsProps {
  count: number;
}
const useFunctions = ({ count }: UseFunctionsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")!) || 1;
  const perPage = parseInt(searchParams.get("perPage")!) || DEFAULT_PER_PAGE;

  const totalPages = Math.ceil(count / perPage);

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

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((params) => {
      params.set("page", "1");
      params.set("perPage", event.target.value);
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
    handlePerPageChange,
    perPage,
  };
};

export default useFunctions;
