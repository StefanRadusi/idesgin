import React, { useEffect, useState } from "react";
import { Loading } from "../../../../common/Loading";
import { updateProject } from "../../../../utils/api";
import { mergeCssClass, resizeImg } from "../../../../utils/helpers";
import { tagsList } from "./Tags";

import "./UpdateProjectModal.css";

const DEFAULT_IMG_SRC = "/svg/upload-photo.svg";

const tagIsSelected = (tag, tags) => {
  return tags.includes(tag);
};

const toggleTag = (tag, tags, setTags) => {
  if (tagIsSelected(tag, tags)) {
    return () => setTags(tags.filter((currentTag) => currentTag !== tag));
  }

  return () => setTags([...tags, tag]);
};

const canSaveProject = (title, imgSrc) => !!(title && imgSrc);

const handleUploadImg = (imgSrc, setImgSrc, setImgType) => {
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
  title,
  type,
  description,
  tags,
  imgSrc,
  imgType,
  setLoading,
  hideModal,
  reFetchProjects
) => {
  return () => {
    const payload = {
      id,
      title,
      type,
      description,
      tags,
    };

    if (imgType !== "url") {
      const [, imgData] = imgSrc.split(",");

      payload.imgType = imgType;
      payload.imgData = imgData;
    }

    console.log(payload);

    setLoading(true);
    updateProject(payload)
      .then(() => {
        setLoading(false);
        hideModal();
        reFetchProjects();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        hideModal();
      });
  };
};

export const UpdateProjectModal = ({
  show,
  hideModal,
  type,
  currentProject,
  reFetchProjects,
}) => {
  const {
    id,
    title: currentTitle,
    description: currentDescription,
    tags: currentTags,
    coverImageUrl,
  } = currentProject || {};

  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [tags, setTags] = useState(currentTags || []);
  const [imgSrc, setImgSrc] = useState("");
  const [imgType, setImgType] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(currentTitle || "");
    setDescription(currentDescription || "");
    setTags(currentTags || []);
    if (coverImageUrl) {
      setImgSrc(coverImageUrl);
      setImgType("url");
    } else {
      setImgSrc("");
      setImgType("");
    }
  }, [currentTitle, currentDescription, currentTags, coverImageUrl, show]);

  return (
    show && (
      <div className="add-project-modal">
        <div className="add-project-modal__overlay" />
        <div className="add-project-modal__content">
          <h3 className="add-project-modal__title">
            {currentProject ? "Edit project" : "Add project"}
          </h3>
          <div className="add-project-modal__attributes">
            <div className="add-project-modal__cover">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="project img"
                  className={"add-project-modal__cover_img"}
                />
              )}

              <img
                src={DEFAULT_IMG_SRC}
                alt="upload icon"
                className={mergeCssClass(
                  "add-project-modal__cover_img--default",
                  imgSrc && "add-project-modal__cover_img--with-img"
                )}
              />

              <input
                className="add-project-modal__cover__upload-input"
                type="file"
                onChange={handleUploadImg(imgSrc, setImgSrc, setImgType)}
              />
            </div>
            <div className="add-project-modal__attributes-container">
              <div className="add-project-modal__project-title">
                <p>Title</p>
                <input
                  placeholder="edit title"
                  value={title}
                  onChange={({ target: { value } }) => setTitle(value)}
                />
              </div>

              <div className="add-project-modal__project-description">
                <p>Description</p>
                <textarea
                  placeholder="edit description"
                  value={description}
                  onChange={({ target: { value } }) => setDescription(value)}
                />
              </div>

              <div className="add-project-modal__project-tags">
                <p>Tags</p>
                <div className="add-project-modal__project-tags-container">
                  {tagsList.map((tag) => (
                    <p
                      key={tag}
                      className={mergeCssClass(
                        "add-project-modal__project-tags__tag",
                        tagIsSelected(tag, tags) &&
                          "add-project-modal__project-tags__tag--selected"
                      )}
                      onClick={toggleTag(tag, tags, setTags)}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="add-project-modal__buttons">
            <button
              className="add-project-modal__buttons__button-cancel"
              onClick={hideModal}
            >
              Cancel
            </button>
            <button
              className={mergeCssClass(
                "add-project-modal__buttons__button-apply",
                canSaveProject(title, imgSrc) &&
                  "add-project-modal__buttons__button-apply--enable"
              )}
              onClick={handleSaveProject(
                id,
                title,
                type,
                description,
                tags,
                imgSrc,
                imgType,
                setLoading,
                hideModal,
                reFetchProjects
              )}
            >
              {currentProject ? "Save" : "Add"}
            </button>
          </div>
        </div>
        <Loading show={loading} />
      </div>
    )
  );
};
