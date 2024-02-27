import { useEffect, useState } from "react";
import { ethers } from "ethers";
import React from "react";
import FantasyBetInfo from "./FantasyBetInfo";
import faunadb from "faunadb";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function FantasyCard({
  id,
  blocked,
  matchType,
  matchesData,
  user,
  updateDataAfterBet,
  isMobile,
}) {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const [userMatches, setUserMatches] = React.useState({
    userMatchesList: [],
  });

  let current_match_payload;

  for (let i = 0; i < matchesData["data"].length; i++) {
    if (id == matchesData["data"][i][0]) {
      current_match_payload = matchesData["data"][i];
    }
  }
  //console.log(current_match_payload);
  const matchNumber = id;

  return (
    <>
      {current_match_payload != null ? (
        current_match_payload[7] == "OPEN" ? (
          <div className="container px-1 ">
            <FantasyBetInfo
              matchNumber={parseInt(matchNumber)}
              matchType={current_match_payload[7]}
              current_match_payload={current_match_payload}
              user={user}
              updateDataAfterBet={updateDataAfterBet}
              isMobile={isMobile}
              id={id}
            />
          </div>
        ) : null
      ) : null}
    </>
  );
}
