import { useState } from "react";

import { createForum } from "../../services/forumsService";
import { useNavigate } from "react-router-dom";

export const useFunctions = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleNewForumClick = async () => {
    const response = await createForum({
      title,
      description,
    });
    if (response.statusText === "Created") {
      navigate("/forums");
    }
  };

  return {
    title,
    handleTitleChange,
    description,
    setDesciption,
    handleNewForumClick,
  };
};
