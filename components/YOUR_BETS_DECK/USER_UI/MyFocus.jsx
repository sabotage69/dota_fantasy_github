import React from "react";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function MyFocus({
  user,
  matchesData,
  toggleMyFocusState,
  isMobile,
}) {
  // console.log(user.userName);
  // console.log(matchesData);

  useEffect(() => {
    console.log("");
  }, [matchesData]);

  let dataArray = Object.entries(matchesData);
  dataArray = dataArray.filter(([name, score]) => name && !isNaN(score));
  dataArray.sort((a, b) => b[1] - a[1]);

  let transformedArray = [];

  dataArray.forEach(([name, score], index) => {
    const positionData = {
      name: name,
      score: score,
      position: index,
    };

    transformedArray.push(positionData);
  });

  // console.log("transformedArray");
  // console.log(transformedArray);

  let userPositionObject = transformedArray.find(
    (item) => item.name === user.userName
  );

  // console.log("userPositionObject");
  // console.log(userPositionObject);

  let userIndex = -1;

  userIndex = userPositionObject ? userPositionObject.position : -1;
  let userScore = userPositionObject ? userPositionObject.score.toFixed(1) : 0;

  // console.log(userIndex);

  let namesArray = transformedArray.map((item) => item.name);
  let pointsArray = transformedArray.map((item) => item.score);
  let positions = transformedArray.map((item) => item.position);

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

  let boxes = [];

  if (userIndex !== -1 && pointsArray.length > 0) {
    // Display players above user (up to 2 players)
    for (let i = userIndex - 1; i >= Math.max(0, userIndex - 2); i--) {
      if (namesArray[i] && pointsArray[i] !== null) {
        boxes.unshift(
          <div
            className="row px-3 mt-1 mb-1"
            key={`above-${i}`}
            style={{ color: getPositionColor(i + 1) }}
          >
            <div className="col text-start">#{i + 1}</div>
            <div className="col text-center">{namesArray[i]}</div>
            <div className="col text-end">{pointsArray[i].toFixed(1)}</div>
          </div>
        );
      }
    }

    // Display user
    if (namesArray[userIndex] && pointsArray[userIndex] !== null) {
      boxes.push(
        <div className="row px-3 player-position mt-1 mb-1" key={userIndex}>
          <div className="col text-start">#{userIndex + 1}</div>
          <div className="col text-center">{namesArray[userIndex]}</div>
          <div className="col text-end">
            {pointsArray[userIndex].toFixed(1)}
          </div>
        </div>
      );
    }

    // Display players below user (up to 2 players)
    for (
      let i = userIndex + 1;
      i <= Math.min(namesArray.length - 1, userIndex + 2);
      i++
    ) {
      if (namesArray[i] && pointsArray[i] !== null) {
        boxes.push(
          <div
            className="row px-3 mt-1 mb-1"
            key={`below-${i}`}
            style={{ color: getPositionColor(i + 1) }}
          >
            <div className="col text-start ">#{i + 1}</div>
            <div className="col text-center">{namesArray[i]}</div>
            <div className="col text-end">{pointsArray[i].toFixed(1)}</div>
          </div>
        );
      }
    }
  } else {
    // Display the top 5 users
    for (let i = 0; i < Math.min(5, namesArray.length); i++) {
      if (namesArray[i] && pointsArray[i] !== null) {
        boxes.push(
          <div
            className="row px-3 mt-1 mb-1"
            key={`top-${i}`}
            style={{ color: getPositionColor(i + 1) }}
          >
            <div className="col text-start">#{i + 1}</div>
            <div className="col text-center">{namesArray[i]}</div>
            <div className="col text-end">{pointsArray[i].toFixed(1)}</div>
          </div>
        );
      }
    }
  }

  // if (userPosition >= 0) {
  //   // Display players above user (up to 2 players)
  //   for (let i = Math.max(0, userPosition - 2); i < userPosition; i++) {
  //     console.log("pushing above user")
  //     if (transformedArray[i]) {
  //       boxes.push(
  //         <div
  //           className="row px-3 mt-1 mb-1"
  //           key={`above-${i}`}
  //           style={{ color: getPositionColor(transformedArray[i].position) }}
  //         >
  //           <div className="col text-start">
  //             #{transformedArray[i].position}
  //           </div>
  //           <div className="col text-center">{transformedArray[i].name}</div>
  //           <div className="col text-end">
  //             {transformedArray[i].score.toFixed(1)}
  //           </div>
  //         </div>
  //       );
  //     }
  //   }

  //   // Display user position
  //   boxes.push(
  //     <div className="row px-3 player-position mt-1 mb-1" key={userPosition}>
  //       <div className="col text-start">
  //         #{transformedArray[userPosition].position}
  //       </div>
  //       <div className="col text-center">
  //         {transformedArray[userPosition].name}
  //       </div>
  //       <div className="col text-end">
  //         {transformedArray[userPosition].score.toFixed(1)}
  //       </div>
  //     </div>
  //   );

  //   // Display players below user (up to 2 players)
  //   for (
  //     let i = userPosition + 1;
  //     i <= Math.min(userPosition + 2, transformedArray.length - 1);
  //     i++
  //   ) {
  //     if (transformedArray[i]) {
  //       boxes.push(
  //         <div
  //           className="row px-3 mt-1 mb-1"
  //           key={`below-${i}`}
  //           style={{ color: getPositionColor(transformedArray[i].position) }}
  //         >
  //           <div className="col text-start ">
  //             #{transformedArray[i].position}
  //           </div>
  //           <div className="col text-center">{transformedArray[i].name}</div>
  //           <div className="col text-end">
  //             {transformedArray[i].score.toFixed(1)}
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  // } else {
  //   // Display the top 5 users
  //   for (let i = 0; i < Math.min(5, transformedArray.length); i++) {
  //     if (transformedArray[i]) {
  //       boxes.push(
  //         <div
  //           className="row px-3 mt-1 mb-1"
  //           key={`top-${i}`}
  //           style={{ color: getPositionColor(transformedArray[i].position) }}
  //         >
  //           <div className="col text-start">
  //             #{transformedArray[i].position}
  //           </div>
  //           <div className="col text-center">{transformedArray[i].name}</div>
  //           <div className="col text-end">
  //             {transformedArray[i].score.toFixed(1)}
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  // }

  // console.log(pointsArray);
  // console.log(boxes);

  return (
    <>
      <div className="container px-0">
        <div className="row ps-0 pe-3">
          <div className="col-4">
            <h1 className="display-1 mt-1 points-this-week-number">
              #{userIndex + 1}
            </h1>
          </div>
          <div className="col-8">
            <h1 className="display-6 mt-3 mb-0 text-end leaderboard-text-responsive text-white">
              current weekly rank
            </h1>
          </div>
        </div>
        <div className="row ps-0 pe-3">
          <div className="col-4">
            <h1 className="display-1 mt-1 points-this-week-number">
              #{userScore}
            </h1>
          </div>
          <div className="col-8 ">
            <h1 className="display-6 mt-3 mb-0 text-end align-middle leaderboard-text-responsive text-white">
              points this week
            </h1>
          </div>
        </div>

        <div className="container px-0">{boxes}</div>

        <div
          className="to-full-leaderboard-button"
          onClick={toggleMyFocusState}
        >
          To full leaderboard -&gt;{" "}
        </div>
      </div>
    </>
  );
}
