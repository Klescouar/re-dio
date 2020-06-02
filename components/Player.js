import React from "react";
import classNames from "classnames";

export default function Player({
  mutedStatus,
  handleClick,
  currentSong,
  audio,
}) {
  return (
    <div className="Player">
      <button
        className={classNames("Player__Button", {
          pause: !mutedStatus,
          play: mutedStatus,
        })}
        onClick={handleClick}
      >
        <span className="left"></span>
        <span className="right"></span>
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
        src="https://www.radioking.com/play/poncho"
      ></audio>
    </div>
  );
}
