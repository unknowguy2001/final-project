import { MouseEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Company } from "../../interfaces/company";

interface UseFunctionsProps {
  company: Company;
}

export const useFunctions = ({ company }: UseFunctionsProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingCircleRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    navigate(`/companies/${company.id}`);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    if (floatingCircleRef.current) {
      floatingCircleRef.current!.style.removeProperty("left");
      floatingCircleRef.current!.style.removeProperty("top");
      floatingCircleRef.current.style.transform =
        "scale(1.25) translate(-50%, -50%)";
      const { x, y } = cardRef.current!.getBoundingClientRect();
      if (floatingCircleRef.current) {
        floatingCircleRef.current.style.opacity = "1";
        floatingCircleRef.current.style.left = `${e.clientX - x}px`;
        floatingCircleRef.current.style.top = `${e.clientY - y}px`;
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { x, y } = cardRef.current!.getBoundingClientRect();
    if (floatingCircleRef.current) {
      floatingCircleRef.current.style.left = `${e.clientX - x}px`;
      floatingCircleRef.current.style.top = `${e.clientY - y}px`;
    }
  };

  const handleMouseLeave = () => {
    if (floatingCircleRef.current) {
      floatingCircleRef.current.style.opacity = "0";
      floatingCircleRef.current.style.transform =
        "scale(0.5) translate(-50%, -50%)";
    }
  };

  return {
    cardRef,
    floatingCircleRef,
    handleClick,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  };
};
