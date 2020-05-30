import React, { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import classNames from "classnames";
import Head from "next/head";
import { useInterval } from "../utils/useInterval";
import FacebookIcon from "../public/facebook.svg";
import MailIcon from "../public/mail.svg";
import InstagramIcon from "../public/instagram.svg";
import HeartIcon from "../public/heart.svg";

export default function Home() {
  const [currentSong, setCurrentSong] = useState({});
  const [mutedStatus, setMutedStatus] = useState(true);
  const audio = useRef(null);

  useInterval(() => {
    fetch("https://api.radioking.io/widget/radio/poncho/track/current")
      .then((r) => r.json())
      .then((data) => {
        if (data.title !== currentSong.title) {
          setCurrentSong(data);
        }
      });
  }, 4000);

  const handleClick = () => {
    setMutedStatus(!mutedStatus);
  };

  return (
    <div className="container">
      <Head>
        <title>Ré-dio</title>
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main className="Main">
        <div className="Main__Top">
          <div className="Main__Top__Logo">
            <img
              className="Main__Top__Logo__Image"
              src="/logo.jpg"
              alt="Ré-Dio"
            />
          </div>
          <div className="Main__Top__Player">
            <button
              className={classNames("Main__Top__Player__Button", {
                pause: !mutedStatus,
                play: mutedStatus,
              })}
              onClick={handleClick}
            >
              <span className="left"></span>
              <span className="right"></span>
            </button>
            <p className="Main__Top__Player__Title">
              {currentSong.title}
              <span className="Main__Top__Player__Title__Separator">-</span>
              {currentSong.artist}
            </p>
            <audio
              muted={mutedStatus}
              autoPlay
              ref={audio}
              src="https://www.radioking.com/play/poncho"
            ></audio>
          </div>
        </div>
        <div className="Main__Bottom">
          <div className="Main__Bottom__Support">
            <a
              className="Main__Bottom__Support__Link"
              href="https://www.paypal.com"
              target="_blank"
            >
              <HeartIcon />
              Soutenir Ré-Dio
              <HeartIcon />
            </a>
          </div>
          <div className="Main__Bottom__Socials">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="Main__Bottom__Socials__Link"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="Main__Bottom__Socials__Link"
            >
              <InstagramIcon />
            </a>
            <a
              href="mailto:re-dio@mail.com"
              className="Main__Bottom__Socials__Link"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
