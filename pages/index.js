import React, { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Player from "../components/Player";
import Shares from "../components/Shares";
import Modal from "../components/Modal";
import { useInterval } from "../utils/useInterval";
import { useScreenSize } from "../utils/useScreenSize";
import HeartIcon from "../public/heart.svg";

export default function Home() {
  const [currentSong, setCurrentSong] = useState({});
  const [mutedStatus, setMutedStatus] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const audio = useRef(null);
  const screenSize = useScreenSize();
  const isMobile = screenSize === "small";

  useInterval(() => {
    fetch("https://api.radioking.io/widget/radio/rere/track/current")
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
        <title>Ré-dio - La Web radio qui fait bouger la Ré</title>
        <meta name="description" content="Ré-dio est une radio réthaise" />
        <meta name="keywords" content="Ré-dio, ré-dio, Rédio, rédio" />
        <meta
          property="og:title"
          content="Ré-dio - La Web radio qui fait bouger la Ré"
        />
        <meta
          property="og:description"
          content="Ré-dio est une radio réthaise"
        />
        <meta
          property="og:image"
          content="https://www.re-dio.com/share-logo.jpg"
        />
        <meta property="og:url" content="https://re-dio.com" />
        <meta
          property="og:site_name"
          content="Ré-dio - La Web radio qui fait bouger la Ré"
        />
        <meta property="fb:app_id" content="Ré-dio" />
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
              La Web radio qui fait bouger la Ré
            </p>
            {!isMobile && <Shares />}
          </div>
        </div>
        {isMobile && (
          <Player
            mutedStatus={mutedStatus}
            handleClick={handleClick}
            currentSong={currentSong}
            audio={audio}
          />
        )}
        <div className="Main__Right">
          {!isMobile && (
            <Player
              mutedStatus={mutedStatus}
              handleClick={handleClick}
              currentSong={currentSong}
              audio={audio}
            />
          )}
          {isMobile && <Shares />}
          <div className="Main__Right__Support">
            <button
              className="Main__Right__Support__Button"
              onClick={handleModal}
            >
              Pour soutenir Ré-dio :
              <HeartIcon />
            </button>
          </div>
        </div>
      </main>
      <Modal modalIsOpen={modalIsOpen} handleModal={handleModal} />
    </div>
  );
}
