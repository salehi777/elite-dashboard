import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import { ReactComponent as CameraIcon } from "assets/icons/Camera.svg";

import { uploadApi } from "services";

type UploaderProps = {
  setFilename?: (res: any) => void;
  defaultValue?: string;
};

export default function Uploader({ setFilename, defaultValue }: UploaderProps) {
  const [image, setImage] = useState(defaultValue);
  const { mutate, isLoading } = useMutation((formData: any) =>
    uploadApi(formData)
      .then((res) => {
        setFilename?.(res);
        setImage(res.filename);
      })
      .catch(() => {})
  );

  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    mutate(formData);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="py-6">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Skeleton className="w-[130px] h-[130px] mx-auto" isLoaded={!isLoading}>
          {image ? (
            <img src={`${image}`} alt="Upload" />
          ) : (
            <i className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
              <CameraIcon />
            </i>
          )}
        </Skeleton>
      </div>
    </div>
  );
}
