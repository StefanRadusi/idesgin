import React from "react";
import { UploadButton } from "./UploadButton";

import "./EditPortfolio.css";
import { uploadImg } from "../../../utils/api";

export const EditPortfolio = () => {
  function onChange(event) {
    console.log(event.target.files);

    const [file] = event.target.files;
    console.log(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
      const data = event.target.result.substr(
        event.target.result.indexOf("base64,") + 7
      );
      console.log(data);
      uploadImg({
        name: file.name,
        type: file.type,
        data,
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="edit-portfolio">
      <UploadButton onChange={onChange} />
    </div>
  );
};
