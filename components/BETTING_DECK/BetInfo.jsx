import React from "react";
import { ethers } from "ethers";

import { useWeb3Contract } from "react-moralis";
import contractAddresses from "../../constants/contractAddresses.json";
import abiEvent from "../../constants/abiEvent.json";
import { useEffect, useState } from "react";
import abiSidechainBetting from "../../constants/abiSidechainBetting.json";
import sportIcons from "../../constants/iconsSports.json";
import Tooltip from "../GENERAL/Tooltip.jsx";
const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;

export default function BetInfo(props) {
  const chainId = parseInt(chainIdHex);
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const mainChainId = 80001;
  const mainContractAddress = contractAddresses[mainChainId][0];
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com",
    80001
  ); ///rpc url
  const signer = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PK, provider); ///private key

  ///// 1 000 000 000 000 000 000  wei of token = this amount of usd -v-
  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  const getColor = (quantity) => {
    if (quantity < 50) {
      var r = 250;
      var g = 5;
      var b = 0;
      var n = 5;
      var update = Math.floor(quantity * n);
      g = g + update;
      return `rgb(${r},${g},${b})`;
    } else {
      var r = 255;
      var g = 255;
      var b = 0;
      var n = 5;
      var update = Math.floor(quantity * n);
      r = r - update;
      return `rgb(${r},${g},${b})`;
    }
  };

  var date = new Date(props.current_match_payload[4] * 1000);
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();
  var hour = date.getUTCHours();
  var minute = date.getUTCMinutes();

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const unix_now = getTimestampInSeconds();
  // console.log(parseInt(props.current_match_payload[4]));
  // console.log(unix_now);

  const difference_in_unix =
    parseInt(props.current_match_payload[4]) - unix_now;
  // console.log(difference_in_unix);

  const difference_in_hours = Math.round(difference_in_unix / 60 / 60);
  // console.log(difference_in_hours);

  const difference_in_minutes = Math.round(difference_in_unix / 60);

  var formattedTime = hour + ":" + minute + "0" + " " + day + "-" + month;

  return (
    <>
      <div className="bet-card-info-container">
        <div className="match-info-container">
          <div className="sport-icon-container">
            <picture>
              <source
                srcSet={sportIcons[props.current_match_payload[7]]}
                type="image/png"
              />
              <img
                className="sport-icon"
                alt=" "
                src={sportIcons[props.current_match_payload[7]]}
              ></img>
            </picture>
          </div>
          <div className="match-info-name">
            {props.current_match_payload[1]} - {props.current_match_payload[2]}
          </div>
          {/* <div className="match-info-date">📅{formattedTime}</div> */}
          {difference_in_hours < 49 ? (
            difference_in_hours < 1 ? (
              <div className="match-info-date">
                📅 in {difference_in_minutes} minutes
              </div>
            ) : (
              <div className="match-info-date">
                📅 in {difference_in_hours} hours
              </div>
            )
          ) : (
            <div className="match-info-date">📅{formattedTime}</div>
          )}
          <div className="match-info-place">
            📌{props.current_match_payload[5]}
          </div>

          <div className="match-info-winnings-pool">
            💰Winnings pool:{" "}
            {(
              (parseInt(props.current_match_payload[8]) *
                testPricesObject[80001]) /
              1000000000000000000
            ).toFixed(1)}{" "}
            $
          </div>
          <div className="example-wrapper">
            <Tooltip
              content="Winnings pool is the total sum of all bets made on a match.
            Percentages below represent the share of bets made on a certain outcome"
              direction="right"
            >
              <span
                className="example-emoji"
                role="img"
                aria-label="cowboy emoji"
              >
                ❓
              </span>
            </Tooltip>
          </div>
          {account.toLowerCase() == props.owner.toLowerCase() ? (
            <div className="match-dev-data">
              {props.current_match_payload[0]},{" "}
              {String(props.current_match_payload[6])}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
