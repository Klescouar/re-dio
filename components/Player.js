import React from "react";
import classNames from "classnames";
import Loader from "./Loader";

export default function Player({
  mutedStatus,
  handleClick,
  currentSong,
  audio,
}) {
  return (
    <div className="Player">
      {currentSong.title ? (
        <>
          <button
            className={classNames("Player__Button", {
              pause: !mutedStatus,
              play: mutedStatus,
            })}
            onClick={handleClick}
          >
            <span className="left" />
            <span className="right" />
          </button>
          <p className="Player__Title">
            {currentSong.title}
            <span className="Player__Title__Separator">-</span>
            {currentSong.artist}
          </p>
          <audio
            muted={mutedStatus}
            autoPlay
            ref={audio}
            src="https://www.radioking.com/play/re-dio-1"
          ></audio>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
