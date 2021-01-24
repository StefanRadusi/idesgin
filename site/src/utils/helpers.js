import Resizer from "react-image-file-resizer";

const MAX_WIDTH_IMG = 1440;
const MAX_HEIGHT_IMG = 788;

export const mergeCssClass = (...cssClasses) => {
  if (cssClasses && cssClasses.length) {
    return cssClasses.filter((cssClass) => cssClass).join(" ");
  }

  return undefined;
};

export const resizeImg = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      MAX_WIDTH_IMG,
      MAX_HEIGHT_IMG,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const addNewLine = (text) => {
  return text && text.replace(/\r?\n/g, "<br />").replace("<script>", "");
};
