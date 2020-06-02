import React, { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Player from "../components/Player";
import Shares from "../components/Shares";
import Modal from "../components/Modal";
import { useInterval } from "../utils/useInterval";
import HeartIcon from "../public/heart.svg";

export default function Home() {
  const [currentSong, setCurrentSong] = useState({});
  const [mutedStatus, setMutedStatus] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className="container">
      <Head>
        <title>Ré-dio</title>
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main className="Main">
        <div className="Main__Left">
          <div className="Main__Left__Logo">
            <img
              className="Main__Left__Logo__Image"
              src="/logo.png"
              alt="Ré-Dio"
            />
          </div>
          <div className="Main__Left__Infos">
            <p className="Main__Left__Infos__Slogan">
              La web radio qui bouge la re
            </p>
            <Shares />
          </div>
        </div>
        <div className="Main__Right">
          <Player
            mutedStatus={mutedStatus}
            handleClick={handleClick}
            currentSong={currentSong}
            audio={audio}
          />
          <div className="Main__Right__Support">
            <button
              className="Main__Right__Support__Button"
              onClick={handleModal}
            >
              Pour nous soutenir clique sur notre petit coeur :
              <HeartIcon />
            </button>
          </div>
        </div>
      </main>
      <Modal modalIsOpen={modalIsOpen} handleModal={handleModal} />
    </div>
  );
}
