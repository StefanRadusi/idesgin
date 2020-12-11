import React from "react";
import { Proposals } from "./Proposals/Proposals";
import { Steps } from "./Steps";

import "./ServicesBody.css";

export const ServicesBody = () => {
  return (
    <div className="services-body-container">
      <div className="steps__circle" />
      <div className="services-body">
        <div className="services-body__title-container">
          <h2 className="services-body__title">CHECK OUT OUR OFFERS</h2>
          <p className="services-body__sub-title">
            We mainly offer interior design services, but at your request over
            the past years we figured the need to design 3 types of
            deals/offers/packages/proposals according to your needs:
          </p>
        </div>
        <Proposals />
        <Steps />
      </div>
    </div>
  );
};
