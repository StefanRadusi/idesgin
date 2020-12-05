import React, { useState } from "react";
import { Loading } from "../../../../common/Loading";
import { deleteStaffMember } from "../../../../utils/api";
import { mergeCssClass } from "../../../../utils/helpers";

import "./DeleteMemberModal.css";

const handleDeleteMember = (memberId, setLoading, hide, reFetchStaff) => {
  return () => {
    setLoading(true);
    deleteStaffMember(memberId)
      .then(() => {
        setLoading(false);
        reFetchStaff();
        hide();
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        hide();
      });
  };
};

export const DeleteMemberModal = ({
  show,
  hide,
  memberId,
  memberName,
  reFetchStaff,
}) => {
  const [showLoading, setLoading] = useState(false);

  return (
    show && (
      <div className="delete-member-modal">
        <div className="delete-member-modal__overlay" />
        <div className="delete-member-modal__content">
          <div className="delete-member-modal__content__message">
            <img src="/svg/trash.svg" alt="trash" />
            <div className="delete-member-modal__content__message__text">
              <p>Are sure you want to delete:</p>
              <p className="delete-member-modal__content__message__member-name">
                {memberName}
              </p>
            </div>
          </div>

          <div className="edit-staff-modal__buttons">
            <button
              className="edit-staff-modal__buttons__button-cancel"
              onClick={hide}
            >
              No
            </button>
            <button
              className={mergeCssClass(
                "edit-staff-modal__buttons__button-apply",
                "edit-staff-modal__buttons__button-apply--enable"
              )}
              onClick={handleDeleteMember(
                memberId,
                setLoading,
                hide,
                reFetchStaff
              )}
            >
              Yes
            </button>
          </div>
          <Loading show={showLoading} />
        </div>
      </div>
    )
  );
};
