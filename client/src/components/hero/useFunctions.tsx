import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const useFunctions = () => {
  const queryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryRef.current?.value) {
      return navigate("/companies");
    }
    navigate(`/companies?q=${queryRef.current?.value}`);
  };

  return {
    queryRef,
    handleSearchSubmit,
  };
};

export default useFunctions;
