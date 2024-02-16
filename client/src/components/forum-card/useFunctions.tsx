import { useNavigate } from "react-router-dom";

import { Forum } from "../../interfaces/forum";

const useFunctions = (forum: Forum) => {
  const navigate = useNavigate();

  const handleForumClick = () => {
    navigate(`/forums/${forum.id}`);
  };

  return { handleForumClick };
};

export default useFunctions;
