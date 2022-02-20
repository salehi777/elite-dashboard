import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { ReactComponent as CameraIcon } from "assets/icons/Camera.svg";

import { uploadApi } from "services";

type UploaderProps = {
  setFilename?: (res: any) => void;
};

export default function Uploader({ setFilename }: UploaderProps) {
  const [image, setImage] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    uploadApi(formData)
      .then((res) => {
        setFilename?.(res);
        setImage(res.filename);
      })
      .catch(() => {});
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="py-6">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="w-[130px] h-[130px] flex items-center justify-center mx-auto rounded-full bg-gray-100">
          {image ? (
            <img src={`${process.env.REACT_APP_BASE_URL_FILES}/${image}`} />
          ) : (
            <i>
              <CameraIcon />
            </i>
          )}
        </div>
      </div>
    </div>
  );
}
