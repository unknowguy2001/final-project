import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useFunctions = () => {
  const businessOperationsRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryRef.current?.value) {
      return navigate("/companies");
    }
    navigate(`/companies?q=${queryRef.current?.value}`);
  };

  const handleScrollClick = (side: "left" | "right") => {
    if (!businessOperationsRef.current) return;
    const scrollAmount = 300;
    if (side === "left") {
      businessOperationsRef.current.scrollTo({
        left: businessOperationsRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else {
      businessOperationsRef.current.scrollTo({
        left: businessOperationsRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return {
    queryRef,
    handleSearchSubmit,
    businessOperationsRef,
    handleScrollClick,
  };
};
