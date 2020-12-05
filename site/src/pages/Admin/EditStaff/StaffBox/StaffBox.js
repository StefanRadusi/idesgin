import React from "react";

import "./StaffBox.css";

export const StaffBox = ({
  coverUrl,
  name,
  description,
  author,
  openEditModal,
  showDeleteMemberModal,
}) => {
  return (
    <div className="edit-staff__member__container">
      <div className="edit-staff__member__cover">
        <img src={coverUrl} alt="member cover" />
      </div>
      <div className="edit-staff__member__details">
        <h2 className="edit-staff__member__details__name">{name}</h2>
        <p className="edit-staff__member__details__description">
          {description}
        </p>
        <p className="edit-staff__member__details__author">{`- ${author}`}</p>
        <div className="edit-staff__member__buttons">
          <img
            src="/svg/edit.svg"
            alt="edit member"
            className="edit-staff__member__buttons__button edit-staff__member__buttons__button__edit"
            onClick={openEditModal}
          />

          <img
            src="/svg/trash.svg"
            alt="delete member"
            className="edit-staff__member__buttons__button edit-staff__member__buttons__button__delete"
            onClick={showDeleteMemberModal}
          />
        </div>
      </div>
    </div>
  );
};
