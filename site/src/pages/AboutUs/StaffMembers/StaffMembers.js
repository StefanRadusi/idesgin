import React, { useEffect, useState } from "react";
import { Member } from "../Member";
import { getStaffMembers } from "../../../utils/api";

import "./StaffMembers.css";
import { CircleEffect } from "../../../common/CircleEffect";

const useGetStaffMembers = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaffMembers().then((response) => setStaff(response.staffMembers || []));
  }, []);

  return staff;
};

const getOrientation = (index) => (index % 2 === 0 ? "left" : "right");

export const StaffMembers = () => {
  const staff = useGetStaffMembers();

  return (
    <div className="staff-members">
      <CircleEffect />
      <CircleEffect position="right-bottom" />
      {staff.map(({ id, coverImageUrl, name, description, author }, index) => (
        <Member
          key={id}
          coverImageUrl={coverImageUrl}
          name={name}
          description={description}
          author={author}
          orientation={getOrientation(index)}
        />
      ))}
    </div>
  );
};
