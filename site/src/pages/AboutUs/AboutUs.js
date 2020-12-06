import React, { useEffect, useRef } from "react";
import { Footer } from "../../common/Footer";
import { AboutUsCover } from "./AboutUsCover";
import { StaffMembers } from "./StaffMembers";

import "./AboutUs.css";

export const AboutUs = () => {
  const pageRef = useRef();

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="page about" ref={pageRef}>
      <AboutUsCover />
      <StaffMembers />
      <Footer />
    </div>
  );
};
