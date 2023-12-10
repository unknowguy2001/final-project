import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export const Editor = ({ data, setData, placeholder }: EditorProps) => {
  const handleDataChange = (event: unknown, editor: ClassicEditor) => {
    const currentData = editor.getData();
    setData(currentData);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        placeholder,
      }}
      data={data}
      onChange={handleDataChange}
    />
  );
};
