import React from "react";

export const ImgPreviewerContext = React.createContext();

export const withImgPreviewer = (WrappedComponent) => (props) => {
  return (
    <ImgPreviewerContext.Consumer>
      {(setCurrentImgUrlPreview) => (
        <WrappedComponent
          {...props}
          setCurrentImgUrlPreview={setCurrentImgUrlPreview}
        />
      )}
    </ImgPreviewerContext.Consumer>
  );
};
