import { useEffect, useState } from "react";

import React from "react";

export default function FullLeaderBoardPosition(props) {
  // console.log(props.positionData);

  function getPositionColor(position) {
    if (position === 1) {
      return "#FFD700"; // Gold color
    } else if (position === 2) {
      return "#C0C0C0"; // Silver color
    } else if (position === 3) {
      return "#CD7F32"; // Silver color
    } else {
      return "#FFFFFF"; // Set your default color here
    }
  }

  return (
    <>
      {props.user.userName == props.positionData.name ? (
        <>
          <div className="row px-3 player-position mt-1 mb-1">
            <div className="col text-start">{props.positionData.position}</div>
            <div className="col text-center">{props.positionData.name}</div>
            <div className="col text-end">
              {props.positionData.score.toFixed(1)}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row px-3 mt-1 mb-1">
            <div
              className="col text-start"
              style={{ color: getPositionColor(props.positionData.position) }}
            >
              {props.positionData.position}
            </div>
            <div
              className="col text-center"
              style={{ color: getPositionColor(props.positionData.position) }}
            >
              {props.positionData.name}
            </div>
            <div
              className="col text-end"
              style={{ color: getPositionColor(props.positionData.position) }}
            >
              {props.positionData.score.toFixed(1)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
