import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { ReactComponent as CameraIcon } from "assets/icons/Camera.svg";

export default function Uploader() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="py-6">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="w-[130px] h-[130px] flex items-center justify-center mx-auto rounded-full bg-gray-100">
          <i>
            <CameraIcon />
          </i>
        </div>
      </div>
    </div>
  );
}
