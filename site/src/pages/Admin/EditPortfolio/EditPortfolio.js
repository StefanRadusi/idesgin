import React, { useState } from "react";
import { UploadButton } from "./UploadButton";

import "./EditPortfolio.css";
import { uploadImg } from "../../../utils/api";
import { Link, Route, withRouter } from "react-router-dom";
import { TabsHeaderButton } from "../Tabs/TabsHeaderButton";
import { isTabSelected } from "../Tabs";
import { UpdateProjectModal } from "./UpdateProjectModal";

export const EditPortfolio = withRouter(({ location: { pathname } }) => {
  const [showEditProjectModal, setShowEditProjectModal] = useState(true);

  // function onChange(event) {
  //   const [file] = event.target.files;
  //   console.log(file);
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     // console.log(event.target.result);
  //     const data = event.target.result.substr(
  //       event.target.result.indexOf("base64,") + 7
  //     );
  //     console.log(file.name);
  //     uploadImg({
  //       name: file.name,
  //       type: file.type,
  //       data,
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }

  return (
    <div className="edit-portfolio">
      {/* <UploadButton onChange={onChange} /> */}
      <div className="tabs-header portfolio-tab-header">
        <Link to="/admin/edit-portfolio/residential">
          <TabsHeaderButton
            label={"Residential"}
            selected={isTabSelected(pathname, "residential")}
          />
        </Link>
        <Link to="/admin/edit-portfolio/commercial">
          <TabsHeaderButton
            label={"Commercial"}
            selected={isTabSelected(pathname, "commercial")}
          />
        </Link>
      </div>
      <div className="tabs-body edit-portfolio-tabs-body">
        <button
          className="add-project-button"
          onClick={() => setShowEditProjectModal(true)}
        >
          add project
        </button>
        <UpdateProjectModal
          show={showEditProjectModal}
          hideModal={() => setShowEditProjectModal(false)}
          type="commercial"
        />
      </div>
    </div>
  );
});
