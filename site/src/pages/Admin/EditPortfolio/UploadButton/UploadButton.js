import React from "react";

import "./UploadButton.css";

export const UploadButton = ({ onChange }) => {
  return (
    <div className="upload-button">
      <p className="upload-button-icon">+</p>
      <input className="upload-button-input" type="file" onChange={onChange} />
    </div>
  );
};
