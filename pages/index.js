import React, { useRef, useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import classNames from "classnames";
import Head from "next/head";
import { useInterval } from "../utils/useInterval";

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
        <link rel="icon" href="/logo.jpg" />
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
          <div className="Main__Bottom__Item">
            <p>Soutenir Ré-Dio</p>
          </div>
          <div className="Main__Bottom__Item"></div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
