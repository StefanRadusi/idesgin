import React from "react";
import { Footer } from "../../common/Footer";
import { GoogleMap } from "../../common/GoogleMap";
import { PageCover } from "../../common/PageCover";
import { ContactBody } from "./ContactBody";

export const Contact = () => {
  return (
    <div className="contact page">
      <PageCover
        src="/img/contact.jpg"
        backText="CONTACT"
        frontText="US"
        description="We design homes that mirrors and shelters each and every lifestyle."
      />
      <ContactBody />
      <GoogleMap />
      <Footer />
    </div>
  );
};
