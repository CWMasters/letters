import React from "react";

const Footer = () => {
  return (
    <div className="footer has-text-centered">
      <div className="names is-flex is-justify-content-space-between	">
        <p>Created by</p>
        <div className="name-background">
          <a href="https://github.com/Moses-Ian/" target="_blank" rel="noreferrer">
            IM
          </a>
        </div>
        <div className="name-background">
          <a href="https://github.com/hadasss/" target="_blank" rel="noreferrer">
            HK
          </a>
        </div>
        <div className="name-background">
          <a href="https://github.com/CWMasters/" target="_blank" rel="noreferrer">
            CM
          </a>
        </div>
        <div className="name-background">
          <a href="https://github.com/DavidTJGriffin/" target="_blank" rel="noreferrer">
            DG
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
