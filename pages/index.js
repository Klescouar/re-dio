import React, { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import classNames from "classnames";
import Head from "next/head";
import Rodal from "rodal";
import { useInterval } from "../utils/useInterval";
import FacebookIcon from "../public/facebook.svg";
import MailIcon from "../public/mail.svg";
import InstagramIcon from "../public/instagram.svg";
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
          <p className="Main__Left__Slogan">La web radio qui bouge la re</p>
          <div className="Main__Left__Share">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="Main__Left__Share__Link"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="Main__Left__Share__Link"
            >
              <InstagramIcon />
            </a>
            <a
              href="mailto:re-dio@mail.com"
              className="Main__Left__Share__Link"
            >
              <MailIcon />
            </a>
          </div>
        </div>
        <div className="Main__Right">
          <div className="Main__Right__Player">
            <button
              className={classNames("Main__Right__Player__Button", {
                pause: !mutedStatus,
                play: mutedStatus,
              })}
              onClick={handleClick}
            >
              <span className="left"></span>
              <span className="right"></span>
            </button>
            <p className="Main__Right__Player__Title">
              {currentSong.title}
              <span className="Main__Right__Player__Title__Separator">-</span>
              {currentSong.artist}
            </p>
            <audio
              muted={mutedStatus}
              autoPlay
              ref={audio}
              src="https://www.radioking.com/play/poncho"
            ></audio>
          </div>
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
      <Rodal visible={modalIsOpen} onClose={handleModal} animation="slideDown">
        <div className="Main__Modal">
          <p className="Main__Modal__Text">
            Si vous voulez soutenir Ré-dio, payez nous un ti-punch (emoji ti
            punch ou pas loin je ne le trouve pas mais il existe) ! En effet,
            cette web radio à un coût de fonctionnement d'environ 600 euros à
            l'année soit 120 ti-punchs à 5 euros (tarif Ile de Ré). Le ti-punch
            est notre carburant nécessaire pour créer, innover et améliorer ce
            beau projet et vous pouvez y contribuer ici ----->
            <a
              className="Main__Modal__Text__Link"
              href="https://www.paypal.com"
              target="_blank"
            >
              lien PayPal
            </a>
            .
          </p>
          <p className="Main__Modal__Subtitle">
            L'abus d'alcool est dangereux pour la santé. Mangez 5 citrons verts
            par jour. Pour votre santé : bougez buvez et vive l'Ile de Ré
          </p>
        </div>
      </Rodal>
    </div>
  );
}
