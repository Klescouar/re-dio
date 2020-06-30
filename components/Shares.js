import React from "react";
import FacebookIcon from "../public/facebook.svg";
import MailIcon from "../public/mail.svg";
import InstagramIcon from "../public/instagram.svg";

export default function Shares() {
  return (
    <div className="Shares">
      <a
        href="https://www.facebook.com/redio17580"
        target="_blank"
        className="Shares__Link"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.instagram.com/redio17580/"
        target="_blank"
        className="Shares__Link"
      >
        <InstagramIcon />
      </a>
      <a href="mailto:redio17580@gmail.com" className="Shares__Link">
        <MailIcon />
      </a>
    </div>
  );
}
