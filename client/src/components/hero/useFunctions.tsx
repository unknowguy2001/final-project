import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFunctions = () => {
  const businessOperationsRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isLeftScrollable, setIsLeftScrollable] = useState(false);
  const [isRightScrollable, setIsRightScrollable] = useState(false);

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

  useEffect(() => {
    const firstElementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsLeftScrollable(!entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    const lastElementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsRightScrollable(!entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const elements = businessOperationsRef.current!.childNodes;
    firstElementObserver.observe(elements[0] as Element);
    lastElementObserver.observe(elements[elements.length - 1] as Element);

    return () => {
      firstElementObserver.disconnect();
      lastElementObserver.disconnect();
    };
  }, []);

  return {
    queryRef,
    handleSearchSubmit,
    businessOperationsRef,
    handleScrollClick,
    isLeftScrollable,
    isRightScrollable,
  };
};
