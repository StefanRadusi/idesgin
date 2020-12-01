import React from "react";
import PageCover from "../../common/PageCover/PageCover";

import "./Home.css";

export const Home = () => {
  return (
    <div className="page home">
      <div className="home__landing-cover">
        <PageCover
          src="/img/cover.jpg"
          backText="OUR"
          frontText="MISSION"
          description="iDesign Studio's mission is to design and implement functionally-aesthetically balanced spaces tailored to the client's personality traits."
        />
        <div className="home__cover-header">
          <img className="home__logo" alt="logo" src="/svg/logo.svg" />
          <a
            href="https://www.facebook.com/idizainstudio"
            className="home__facebook-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="logo" src="/svg/facebook.svg" />
          </a>
          <a
            className="home__instagram-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/idizainstudio/?fbclid=IwAR2N-qG63_q1pHRIL7R3stExnEXxZ7G_YQJ917Dp7QmvmcecH20nlaH1oEo"
          >
            <img alt="logo" src="/svg/instagram.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};
