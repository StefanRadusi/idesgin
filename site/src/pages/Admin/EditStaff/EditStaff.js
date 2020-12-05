import React, { useEffect, useState } from "react";
import { UpdateStaffModal } from "./UpdateStaffModal";
import { getStaffMembers } from "../../../utils/api";

import "./EditStaff.css";
import { Loading } from "../../../common/Loading";
import { StaffBox } from "./StaffBox/StaffBox";
import { DeleteMemberModal } from "./DeleteMemberModal";

const getStaff = (setStaff, setLoading) => {
  setLoading(true);
  getStaffMembers()
    .then((response) => {
      console.log(response);
      const { staffMembers } = response || {};
      setStaff(staffMembers || []);

      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
};

const useGetStaffMembers = (setLoading) => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    console.log("get staff");
    getStaff(setStaff, setLoading);
  }, [setLoading]);

  return [staff, setStaff];
};

export const EditStaff = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [staffMembers, setStaffMembers] = useGetStaffMembers(setLoading);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="edit-staff">
      <button
        className="add-staff-button"
        onClick={() => {
          setCurrentMember(null);
          setShowUpdateModal(true);
        }}
      >
        add new staff member
      </button>
      <div className="edit-staff__members-container">
        {staffMembers.map((member) => {
          const { id, name, coverImageUrl, description, author } = member;
          return (
            <StaffBox
              key={id}
              name={name}
              coverUrl={coverImageUrl}
              description={description}
              author={author}
              openEditModal={() => {
                setShowUpdateModal(true);
                setCurrentMember(member);
              }}
              showDeleteMemberModal={() => {
                setCurrentMember(member);
                setShowDeleteModal(true);
              }}
            />
          );
        })}
        <Loading show={loading} />
      </div>
      <UpdateStaffModal
        show={showUpdateModal}
        hideModal={() => {
          setCurrentMember(null);
          setShowUpdateModal(false);
        }}
        currentMember={currentMember}
        reFetchMembers={() => getStaff(setStaffMembers, setLoading)}
      />
      <DeleteMemberModal
        show={showDeleteModal}
        hide={() => {
          setCurrentMember(null);
          setShowDeleteModal(false);
        }}
        memberId={currentMember && currentMember.id}
        memberName={currentMember && currentMember.name}
        reFetchStaff={() => getStaff(setStaffMembers, setLoading)}
      />
    </div>
  );
};
