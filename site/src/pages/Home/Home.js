import React, { useState } from "react";
import Typing from "react-typing-animation";

import "./Home.css";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="page home" onClick={() => setLoading(!loading)}>
      <div className="logo-container">
        <Typing>
          <p>
            <span className="company-title">iDesign</span> coming soon
          </p>
        </Typing>
      </div>
    </div>
  );
};
