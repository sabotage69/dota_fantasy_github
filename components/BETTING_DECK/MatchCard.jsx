import { useWeb3Contract } from "react-moralis";
import contractAddresses from "../../constants/contractAddresses.json";

import abiBetting from "../../constants/abiBetting.json";
import abiEvent from "../../constants/abiEvent.json";
import abiSidechainBetting from "../../constants/abiSidechainBetting.json";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import React from "react";
import MakeABet from "./MakeABet";
import BetInfo from "./BetInfo";
import faunadb from "faunadb";
import { FakeBetContext } from "../FakeBetContext";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_DEPLOYER_PK = process.env.NEXT_PUBLIC_DEPLOYER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function MatchCard(props) {
  const chainId = parseInt(chainIdHex);
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const mainChainId = 80001;
  const mainContractAddress = contractAddresses[mainChainId][0];
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com",
    80001
  );
  const signer = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PK, provider);
  const deployer = new ethers.Wallet(NEXT_PUBLIC_DEPLOYER_PK, provider);

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

  for (let i = 0; i < props.matchesData["data"].length; i++) {
    if (props.id == props.matchesData["data"][i][0]) {
      current_match_payload = props.matchesData["data"][i];
    }
  }
  //console.log(current_match_payload);
  const matchNumber = props.id;

  const [ethData, setEthData] = React.useState({
    ethPrice: 1,
  });

  // RINKEBY TESTNET ONLY

  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  return (
    <>
      {current_match_payload != null ? (
        current_match_payload[6] == "OPEN" ? (
          <div className="bet-card">
            <BetInfo
              matchNumber={parseInt(matchNumber)}
              ethPrice={ethData.ethPrice}
              owner={props.owner}
              matchType={current_match_payload[7]}
              current_match_payload={current_match_payload}
            />
            {!props.blocked.includes(parseInt(matchNumber)) ? (
              <FakeBetContext.Consumer>
                {({ onDataUpdate }) => (
                  <>
                    <MakeABet
                      matchType={current_match_payload[7]}
                      matchNumber={parseInt(matchNumber)}
                      ethPrice={ethData.ethPrice}
                      matchList={userMatches.userMatchesList}
                      current_match_payload={current_match_payload}
                      made_a_bet="false"
                    />
                  </>
                )}
              </FakeBetContext.Consumer>
            ) : (
              <>
                <MakeABet
                  matchType={current_match_payload[7]}
                  matchNumber={parseInt(matchNumber)}
                  ethPrice={ethData.ethPrice}
                  matchList={userMatches.userMatchesList}
                  current_match_payload={current_match_payload}
                  made_a_bet="true"
                />
              </>
            )}
          </div>
        ) : null
      ) : null}
    </>
  );
}

{
  /* <div className="already-did-bet">🚫You already made a bet🚫</div> */
}
