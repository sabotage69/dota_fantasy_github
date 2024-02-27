import dotaHeroes from "../../../constants/dotaHeroes.json";
import { ethers, BigNumber } from "ethers";
import React from "react";

export default function YourBetCard(props) {
  // console.log(props.data);
  function calculateCombinedLength() {
    let combinedLength = 0;
    try {
      combinedLength =
        separated_particiapting_teams[0].length +
        separated_particiapting_teams[1].length;
    } catch (err) {
      combinedLength = 0;
    }

    return combinedLength;
  }

  let is_mobile_for_created_mobile_bets = undefined;

  if (props.data[10]) {
    if (props.data[10] === true) {
      is_mobile_for_created_mobile_bets = true;
    } else {
      is_mobile_for_created_mobile_bets = false;
    }
  } else {
    if (props.isMobile) {
      is_mobile_for_created_mobile_bets = true;
    } else {
      is_mobile_for_created_mobile_bets = false;
    }
  }

  // if (props.isMobile) {
  //   is_mobile_for_created_mobile_bets = true;
  // } else if (props.isMobile === false) {
  //   is_mobile_for_created_mobile_bets = false;
  // } else {
  //   is_mobile_for_created_mobile_bets = true;
  // }

  // console.log(props.data);
  // console.log(is_mobile_for_created_mobile_bets);

  if (props.type == "parimutuel") {
    var date = new Date(parseInt(props.data[8]) * 1000);
  } else if (props.type == "fantasy") {
    var date = new Date(parseInt(props.data[6]) * 1000);
  } else if (props.type == "uge") {
    var date = new Date(parseInt(props.data[4]) * 1000);
  } else if (props.type == "arbiter") {
    var date = new Date(parseInt(props.data[2]) * 1000);
  } else if (props.type == "parimutuel-fake") {
    var date = new Date(parseInt(props.data[8]) * 1000);
  } else if (props.type == "fantasy-fake") {
    var date = new Date(parseInt(props.data[5]) * 1000);
  } else if (props.type == "arbiter-fake") {
    var date = new Date(parseInt(props.data[3]) * 1000);
  } else if (props.type == "uge-fake") {
    var date = new Date(parseInt(props.data[4]) * 1000);
  }
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();
  var hour = date.getUTCHours();
  var minute = date.getUTCMinutes();

  if (minute < 10) {
    var formattedTime = hour + ":" + "0" + minute + " " + day + "-" + month;
  } else {
    var formattedTime = hour + ":" + minute + " " + day + "-" + month;
  }

  // console.log(props.data[6]);
  // console.log(formattedTime);

  let separated_chosen_array;
  let separated_particiapting_teams;

  if (props.type === "fantasy-fake") {
    separated_chosen_array = props.data[2].split("___");
    separated_particiapting_teams = props.data[6];
  } else {
    separated_chosen_array = props.data[3].split("___");
    separated_particiapting_teams = props.data[5].split("___");
  }

  let boxes = [];
  if (props.type === "fantasy") {
    for (let i = 1; i < separated_chosen_array.length; i++) {
      try {
        let hero_icon;
        for (let j = 0; j < dotaHeroes.length; j++) {
          if (dotaHeroes[j]["name"] === separated_chosen_array[i]) {
            hero_icon = dotaHeroes[j]["icon"];
          }
        }

        // Determine ps (padding start) and pe (padding end) classes based on index
        let psClass = i === 1 ? "ps-1" : "ps-0";
        let peClass = i === separated_chosen_array.length - 1 ? "pe-0" : "pe-1";

        boxes.push(
          <div
            className={`col ${psClass} ${peClass}`}
            key={i}
            style={{ maxWidth: "40px", flexBasis: "0%" }}
          >
            <picture>
              <source srcSet={hero_icon} type="image/png" />
              <img
                className="dota-hero-icon"
                alt={separated_chosen_array[i]}
                src={hero_icon}
                style={{ maxWidth: "40px" }}
              />
            </picture>
          </div>
        );
      } catch (err) {
        boxes.push(<div className="col" key={i}></div>);
      }
    }
  }
  if (props.type == "fantasy-fake") {
    for (let i = 1; i < separated_chosen_array.length; i++) {
      try {
        let hero_icon;
        for (let j = 0; j < dotaHeroes.length; j++) {
          if (dotaHeroes[j]["name"] == separated_chosen_array[i]) {
            //console.log("name matches");
            hero_icon = dotaHeroes[j]["icon"];
          }
        }

        let psClass = i === 1 ? "ps-1" : "ps-0";
        let peClass = i === separated_chosen_array.length - 1 ? "pe-0" : "pe-1";

        boxes.push(
          <div
            className={`col ${psClass} ${peClass}`}
            key={i}
            style={{ maxWidth: "40px", flexBasis: "0%" }}
          >
            <picture>
              <source srcSet={hero_icon} type="image/png" />
              <img
                className="dota-hero-icon"
                alt={separated_chosen_array[i]}
                src={hero_icon}
                style={{ maxWidth: "40px" }}
              ></img>
            </picture>
          </div>
        );
      } catch (err) {
        boxes.push(<div className="col" key={i}></div>);
      }
    }
  }

  switch (props.type) {
    case "parimutuel":
      // Code for parimutuel type
      return (
        <>
          <div className="bet-info-card">
            <div className="bet-info">
              <div className="match-id">
                {" "}
                #️⃣match id -{" "}
                {ethers.utils.formatUnits(props.data.matchId, "wei")}
                -P
              </div>
              <div
                className="bet-status-mobile"
                style={{
                  color:
                    props.status === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.status === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.status}
              </div>
              <div className="parimutuel-match-date">📅{formattedTime}</div>
              <div className="bet-amount">
                💰
                {(
                  (parseInt(props.data.betAmount) *
                    testPricesObject[parseInt(props.data.chainId)]) /
                  1000000000000000000
                ).toFixed(1)}{" "}
                $
              </div>

              <div className="home-away-teams">
                {props.data.homeTeam} - {props.data.awayTeam}
              </div>

              <div className="bet-chain-id">
                🧱{chainNamesObject[props.data.chainId]}
              </div>
              <div className="chosen-team">
                ✔️
                {props.data.teamChosen}
              </div>
            </div>
          </div>
        </>
      );
    case "fantasy":
      // Code for fantasy type
      return (
        <>
          <div className="card fs-7 text-responsive your-bet-card-style mt-3 mb-3">
            <div className="row mt-2 mb-2">
              <div className="col-3 text-md ps-4 pe-1">F-{props.data[2]}</div>
              <div
                className="col-4 text-end text-nowrap"
                style={{
                  color:
                    props.status === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.status === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.status}
              </div>
              <div className="col-5 text-sm text-end ps-1 pe-4">
                📅{formattedTime}
              </div>
            </div>
            <div className="row mt-2 mb-2">
              <div className="col-8 pe-1 ps-4">
                {separated_particiapting_teams.length > 0 ? (
                  <>
                    <>
                      {separated_particiapting_teams[0]} -{" "}
                      {separated_particiapting_teams[1]}
                    </>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-4 text-end ps-1 pe-4">🌟{props.data[4]}</div>
            </div>
            <div className="row ps-2 pe-0 mt-2 mb-2">
              <div className="col-7 ps-4 pe-0">
                <div className="row">{boxes}</div>
              </div>

              <div className="col-5 text-end ps-0 pe-4">
                ✔️
                {separated_chosen_array[0]}
              </div>
            </div>
          </div>
        </>
      );
    case "uge":
      return (
        <>
          <div className="bet-info-card">
            <div className="bet-info">
              <div className="match-id">
                {" "}
                #️⃣match id -{" "}
                {ethers.utils.formatUnits(props.data.matchId, "wei")}
                -B
              </div>
              <div
                className="bet-status"
                style={{
                  color:
                    props.status === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.status === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.status}
              </div>
              <div className="match-date">📅{formattedTime}</div>
              <div className="bet-amount">
                💰
                {(
                  (parseInt(props.data.betAmount) *
                    testPricesObject[parseInt(props.data.chainId)]) /
                  1000000000000000000
                ).toFixed(1)}{" "}
                $
              </div>
              <div className="home-away-teams" title={props.data.title}>
                {props.data.title.length > 58
                  ? props.data.title.slice(0, 58) + "..."
                  : props.data.title}
              </div>

              <div className="bet-chain-id">
                🧱{chainNamesObject[props.data.chainId]}
              </div>
              <div className="chosen-team">
                ✔️
                {props.data.chosenOutcome}
              </div>
            </div>
          </div>
        </>
      );
    case "arbiter":
      // Code for arbiter type
      return (
        <>
          <div className="bet-info-card">
            <div className="bet-info">
              <div className="match-id">
                {" "}
                #️⃣match id - {ethers.utils.formatUnits(props.data[0], "wei")}
                -A
              </div>
              <div
                className="bet-status"
                style={{
                  color:
                    props.status === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.status === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.status}
              </div>
              <div className="match-date">📅{formattedTime}</div>
              <div className="bet-amount"> </div>
              <div className="home-away-teams" title={props.data[3]}>
                {props.data[3].length > 58
                  ? props.data[3].slice(0, 58) + "..."
                  : props.data[3]}
              </div>

              <div className="bet-chain-id">🧱{chainNamesObject[80001]}</div>
              <div className="chosen-team">
                ✔️
                {props.data[1]}
              </div>
            </div>
          </div>
        </>
      );

    case "parimutuel-fake":
      // Code for parimutuel type
      return (
        <>
          <div className="bet-info-card">
            <div className="bet-info">
              <div className="match-id">
                {" "}
                #️⃣match id - {props.data[3]}
                -P
              </div>
              <div
                className="bet-status"
                style={{
                  color:
                    props.status === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.status === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.data[10]}
              </div>
              <div className="parimutuel-match-date">📅{formattedTime}</div>
              <div className="bet-amount">
                💰
                {(
                  (parseInt(props.data[9]) *
                    testPricesObject[parseInt(props.data[4])]) /
                  1000000000000000000
                ).toFixed(1)}{" "}
                $
              </div>

              <div
                className={
                  is_mobile_for_created_mobile_bets
                    ? "home-away-teams-mobile"
                    : "home-away-teams"
                }
              >
                {props.data[5]} - {props.data[6]}
              </div>

              <div className="bet-chain-id">
                🧱{chainNamesObject[props.data[4]]}
              </div>
              <div className="chosen-team">
                ✔️
                {props.data[2]}
              </div>
            </div>
          </div>
        </>
      );

    case "fantasy-fake":
      // Code for fantasy type
      return (
        <>
          <div className="card fs-7 text-responsive your-bet-card-style mt-3 mb-3">
            <div className="row mt-2 mb-2">
              <div className="col-3 text-md ps-4 pe-1">
                F-{parseInt(props.data[1])}
              </div>
              <div
                className="col-4 text-end text-nowrap"
                style={{
                  color:
                    props.data[9] === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.data[9] === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.data[9]}
              </div>
              <div className="col-5 text-sm text-end ps-1 pe-4">
                📅{formattedTime}
              </div>
            </div>
            <div className="row mt-2 mb-2">
              <div className="col-8 pe-1 ps-4">
                {separated_particiapting_teams.length > 0 ? (
                  <>
                    <>
                      {props.data[6][0]} - {props.data[6][1]}
                    </>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-4 text-end ps-1 pe-4">🌟{props.data[3]}</div>
            </div>
            <div className="row ps-2 pe-0 mt-2 mb-2">
              <div className="col-7 ps-4 pe-0">
                <div className="row">{boxes}</div>
              </div>

              <div className="col-5 text-end ps-0 pe-4">
                ✔️
                {separated_chosen_array[0]}
              </div>
            </div>
          </div>
        </>
      );

    case "arbiter-fake":
      // Code for arbiter type
      return (
        <>
          <div className="bet-info-card">
            <div className="bet-info">
              <div className="match-id">
                {" "}
                #️⃣match id - {parseInt(props.data[1])}
                -A
              </div>
              <div
                className="bet-status"
                style={{
                  color:
                    props.data[6] === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.data[6] === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.data[6]}
              </div>
              <div className="match-date">📅{formattedTime}</div>
              <div className="bet-amount"> </div>
              <div className="home-away-teams">
                {props.data[5].length > 40
                  ? props.data[5].slice(0, 40) + "..."
                  : props.data[5]}
              </div>

              <div className="bet-chain-id">🧱{chainNamesObject[80001]}</div>
              <div className="chosen-team">
                ✔️
                {props.data[2]}
              </div>
            </div>
          </div>
        </>
      );

    case "uge-fake":
      return (
        <>
          <div className="bet-info-card">
            <div className="bet-info">
              <div className="match-id">
                {" "}
                #️⃣match id - {parseInt(props.data[1])}
                -B
              </div>
              <div
                className="bet-status"
                style={{
                  color:
                    props.data[8] === "confirmed"
                      ? "rgb(40, 225, 40)"
                      : props.data[8] === "pending"
                      ? "rgb(237, 237, 29)"
                      : "inherit",
                  textTransform: "uppercase",
                }}
              >
                {props.data[8]}
              </div>
              <div className="match-date">📅{formattedTime}</div>
              <div className="bet-amount">
                💰
                {(
                  (parseInt(props.data[7]) *
                    testPricesObject[parseInt(props.data[3])]) /
                  1000000000000000000
                ).toFixed(1)}{" "}
                $
              </div>
              <div className="home-away-teams">
                {props.data[6].length > 40
                  ? props.data[6].slice(0, 40) + "..."
                  : props.data[6]}
              </div>

              <div className="bet-chain-id">
                🧱{chainNamesObject[props.data[3]]}
              </div>
              <div className="chosen-team">
                ✔️
                {props.data[2]}
              </div>
            </div>
          </div>
        </>
      );
    default:
      return <div>default card</div>;
  }

  //console.log(props.id);
}
