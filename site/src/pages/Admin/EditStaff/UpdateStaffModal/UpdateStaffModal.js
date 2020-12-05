import React, { useEffect, useState } from "react";
import { Loading } from "../../../../common/Loading";
import { updateStaff } from "../../../../utils/api";
import { mergeCssClass, resizeImg } from "../../../../utils/helpers";

import "./UpdateStaffModal.css";

const DEFAULT_IMG_SRC = "/svg/upload-photo.svg";

const canSaveProject = (imgSrc, name, description) =>
  !!(imgSrc && name && description);

const handleUploadImg = (setImgSrc, setImgType) => {
  return async ({ target }) => {
    const [file] = target.files;
    if (file) {
      const image = await resizeImg(file);
      setImgSrc(image);
      setImgType(file.type);
    }
  };
};

const handleSaveProject = (
  id,
  name,
  description,
  author,
  imgSrc,
  imgType,
  setLoading,
  hideModal,
  reFetchMembers
) => {
  return () => {
    const payload = {
      id,
      name,
      description,
      author,
    };

    if (imgType !== "url") {
      const [, imgData] = imgSrc.split(",");

      payload.imgType = imgType;
      payload.imgData = imgData;
    }

    console.log(payload);

    setLoading(true);
    updateStaff(payload)
      .then(() => {
        setLoading(false);
        hideModal();
        reFetchMembers();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        hideModal();
      });
  };
};

export const UpdateStaffModal = ({
  show,
  hideModal,
  currentMember,
  reFetchMembers,
}) => {
  const {
    id,
    name: currentName,
    description: currentDescription,
    author: currentAuthor,
    coverImageUrl,
  } = currentMember || {};

  const [name, setName] = useState(currentName || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [author, setAuthor] = useState(currentAuthor || []);
  const [imgSrc, setImgSrc] = useState("");
  const [imgType, setImgType] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(currentName || "");
    setDescription(currentDescription || "");
    setAuthor(currentAuthor || []);
    if (coverImageUrl) {
      setImgSrc(coverImageUrl);
      setImgType("url");
    } else {
      setImgSrc("");
      setImgType("");
    }
  }, [currentName, currentDescription, currentAuthor, coverImageUrl, show]);

  return (
    show && (
      <div className="edit-staff-modal">
        <div className="edit-staff-modal__overlay" />
        <div className="edit-staff-modal__content">
          <h3 className="edit-staff-modal__title">
            {currentName ? "Edit member" : "Add member"}
          </h3>
          <div className="edit-staff-modal__attributes">
            <div className="edit-staff-modal__cover">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="member img"
                  className={"edit-staff-modal__cover_img"}
                />
              )}

              <img
                src={DEFAULT_IMG_SRC}
                alt="upload icon"
                className={mergeCssClass(
                  "edit-staff-modal__cover_img--default",
                  imgSrc && "edit-staff-modal__cover_img--with-img"
                )}
              />

              <input
                className="edit-staff-modal__cover__upload-input"
                type="file"
                onChange={handleUploadImg(setImgSrc, setImgType)}
              />
            </div>
            <div className="edit-staff-modal__attributes-container">
              <div className="edit-staff-modal__member-name">
                <p>Name</p>
                <input
                  placeholder="edit name"
                  value={name}
                  onChange={({ target: { value } }) => setName(value)}
                />
              </div>

              <div className="edit-staff-modal__project-description">
                <p>Description</p>
                <textarea
                  placeholder="edit description"
                  value={description}
                  onChange={({ target: { value } }) => setDescription(value)}
                />
              </div>
              <div className="edit-staff-modal__member-author">
                <p>Author</p>
                <input
                  placeholder="edit description author"
                  value={author}
                  onChange={({ target: { value } }) => setAuthor(value)}
                />
              </div>
            </div>
          </div>
          <div className="edit-staff-modal__buttons">
            <button
              className="edit-staff-modal__buttons__button-cancel"
              onClick={hideModal}
            >
              Cancel
            </button>
            <button
              className={mergeCssClass(
                "edit-staff-modal__buttons__button-apply",
                canSaveProject(imgSrc, name, description) &&
                  "edit-staff-modal__buttons__button-apply--enable"
              )}
              onClick={handleSaveProject(
                id,
                name,
                description,
                author,
                imgSrc,
                imgType,
                setLoading,
                hideModal,
                reFetchMembers
              )}
            >
              {currentMember ? "Save" : "Add"}
            </button>
          </div>
          <Loading show={loading} />
        </div>
      </div>
    )
  );
};
