import { HiOutlineUpload } from "react-icons/hi";

type UploadFileProps = {
  setPdfFile: (file: File) => void;
};

export default function UploadFile(props: UploadFileProps) {
  const { setPdfFile } = props;

  /**
   * 处理文件上传的回调函数，选中 PDF 文件后读取其内容并存储。
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 文件上传事件对象。
   */
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPdfFile(file);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="h-[350px] relative text-center w-[275px]">
        <label
          htmlFor="file-upload"
          className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300"
        >
          <div className="cursor-pointer flex flex-col items-center space-y-3">
            <HiOutlineUpload className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-500">Click to upload or drag and drop</p>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={(e) => onFileChange(e)}
          className="cursor-pointer hidden"
        />
      </div>
    </div>
  );
}
