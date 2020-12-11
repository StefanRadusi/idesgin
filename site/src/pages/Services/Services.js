import React from "react";
import { Footer } from "../../common/Footer";
import { PageCover } from "../../common/PageCover";
import { ServicesBody } from "./ServicesBody";

export const Services = () => {
  return (
    <div className="services page">
      <PageCover
        src="/img/services.png"
        backText="OUR"
        frontText="SERVICES"
        description="We design homes that mirrors and shelters each and every lifestyle."
      />
      <ServicesBody />
      <Footer />
    </div>
  );
};
