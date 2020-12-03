import Resizer from "react-image-file-resizer";

const MAX_WIDTH_IMG = 1440;
const MAX_HEIGHT_IMG = 788;

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
