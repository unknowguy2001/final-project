import ReactQuill from "react-quill";

interface EditorProps {
  data?: string;
  setData?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  readOnly?: boolean;
  theme?: "snow" | "bubble";
}

export const Editor = ({
  data = "",
  setData,
  placeholder = "",
  readOnly = false,
  theme = "snow",
}: EditorProps) => {
  const handleDataChange = (value: string) => {
    if (setData) {
      setData(value);
    }
  };

  return (
    <ReactQuill
      placeholder={placeholder}
      theme={theme}
      value={data}
      readOnly={readOnly}
      onChange={handleDataChange}
    />
  );
};
