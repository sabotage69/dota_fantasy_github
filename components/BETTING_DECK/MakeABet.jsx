import { useWeb3Contract } from "react-moralis";
import contractAddresses from "../../constants/contractAddresses.json";
import abiSidechainBetting from "../../constants/abiSidechainBetting.json";

import { ethers } from "ethers";

import React from "react";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
// import Modal from './modal/Modal';
import NewModal from "./modal/NewModal";
import { FakeBetContext } from "../FakeBetContext";
import { useContext } from "react";
import faunadb from "faunadb";
import Tooltip from "../GENERAL/Tooltip";
import Instructions from "./modal/Instructions";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

const testPricesObject = {
  4: "18000",
  80001: "90",
  31337: "12000",
  5: "18000",
  11155111: "18000",
};

export default function MakeABet(props) {
  // async function automaticTotalPoolUpdater(_matchCountMessage) {
  //   var totalPoolsInMATIC = [];
  //   for (let i = 0; i < Object.keys(contractAddresses).length; i++) {
  //     var loopingChainId = parseInt(Object.keys(contractAddresses)[i]);
  //     try {
  //       var loopingContractAddress = contractAddresses[loopingChainId][0];
  //       var loopingProvider = new ethers.providers.JsonRpcProvider(
  //         contractAddresses[loopingChainId][1],
  //         loopingChainId
  //       );
  //       var loopingSigner = new ethers.Wallet(
  //         NEXT_PUBLIC_SIGNER_PK,
  //         loopingProvider
  //       );
  //       var loopingSidechainContract = new ethers.Contract(
  //         loopingContractAddress,
  //         abiSidechainBetting,
  //         loopingSigner
  //       );
  //       var loopingChainTotalMessage = await loopingSidechainContract.checkTotalPools(
  //         loopingChainId,
  //         _matchCountMessage
  //       );
  //       if (loopingChainId == "80001") {
  //         var loopingTotalPoolInMATIC = parseInt(loopingChainTotalMessage);
  //       } else {
  //         var loopingTotalPoolInMATIC =
  //           parseInt(loopingChainTotalMessage) *
  //           (testPricesObject[loopingChainId] / testPricesObject[80001]);
  //       }
  //       totalPoolsInMATIC.push(loopingTotalPoolInMATIC);
  //     } catch (err) {
  //       console.log(err);
  //       //   console.log(
  //       //     `some error, prolly contract doesnt exist on network ${loopingChainId}`
  //       //   );
  //     }
  //   }

  //   let combinedTotalPoolInMatic = 0;
  //   for (let i = 0; i < totalPoolsInMATIC.length; i++) {
  //     combinedTotalPoolInMatic += totalPoolsInMATIC[i];
  //   }

  //   //console.log(combinedTotalPoolInMatic);
  //   return combinedTotalPoolInMatic;
  // }

  // async function automaticHomePoolUpdater(_matchCountMessage) {
  //   var totalPoolsInMATIC = [];
  //   for (let i = 0; i < Object.keys(contractAddresses).length; i++) {
  //     var loopingChainId = parseInt(Object.keys(contractAddresses)[i]);
  //     try {
  //       var loopingContractAddress = contractAddresses[loopingChainId][0];
  //       var loopingProvider = new ethers.providers.JsonRpcProvider(
  //         contractAddresses[loopingChainId][1],
  //         loopingChainId
  //       );
  //       var loopingSigner = new ethers.Wallet(
  //         NEXT_PUBLIC_SIGNER_PK,
  //         loopingProvider
  //       );
  //       var loopingSidechainContract = new ethers.Contract(
  //         loopingContractAddress,
  //         abiSidechainBetting,
  //         loopingSigner
  //       );
  //       var loopingChainTotalMessage = await loopingSidechainContract.checkHomePools(
  //         loopingChainId,
  //         _matchCountMessage
  //       );
  //       if (loopingChainId == "80001") {
  //         var loopingTotalPoolInMATIC = parseInt(loopingChainTotalMessage);
  //       } else {
  //         var loopingTotalPoolInMATIC =
  //           parseInt(loopingChainTotalMessage) *
  //           (testPricesObject[loopingChainId] / testPricesObject[80001]);
  //       }
  //       totalPoolsInMATIC.push(loopingTotalPoolInMATIC);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   let combinedTotalPoolInMatic = 0;
  //   for (let i = 0; i < totalPoolsInMATIC.length; i++) {
  //     combinedTotalPoolInMatic += totalPoolsInMATIC[i];
  //   }

  //   return combinedTotalPoolInMatic;
  // }

  // async function automaticAwayPoolUpdater(_matchCountMessage) {
  //   var totalPoolsInMATIC = [];
  //   for (let i = 0; i < Object.keys(contractAddresses).length; i++) {
  //     var loopingChainId = parseInt(Object.keys(contractAddresses)[i]);
  //     try {
  //       var loopingContractAddress = contractAddresses[loopingChainId][0];
  //       var loopingProvider = new ethers.providers.JsonRpcProvider(
  //         contractAddresses[loopingChainId][1],
  //         loopingChainId
  //       );
  //       var loopingSigner = new ethers.Wallet(
  //         NEXT_PUBLIC_SIGNER_PK,
  //         loopingProvider
  //       );
  //       var loopingSidechainContract = new ethers.Contract(
  //         loopingContractAddress,
  //         abiSidechainBetting,
  //         loopingSigner
  //       );
  //       var loopingChainTotalMessage = await loopingSidechainContract.checkAwayPools(
  //         loopingChainId,
  //         _matchCountMessage
  //       );
  //       if (loopingChainId == "80001") {
  //         var loopingTotalPoolInMATIC = parseInt(loopingChainTotalMessage);
  //       } else {
  //         var loopingTotalPoolInMATIC =
  //           parseInt(loopingChainTotalMessage) *
  //           (testPricesObject[loopingChainId] / testPricesObject[80001]);
  //       }
  //       totalPoolsInMATIC.push(loopingTotalPoolInMATIC);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   let combinedTotalPoolInMatic = 0;
  //   for (let i = 0; i < totalPoolsInMATIC.length; i++) {
  //     combinedTotalPoolInMatic += totalPoolsInMATIC[i];
  //   }

  //   return combinedTotalPoolInMatic;
  // }

  // async function automaticDrawPoolUpdater(_matchCountMessage) {
  //   var totalPoolsInMATIC = [];
  //   for (let i = 0; i < Object.keys(contractAddresses).length; i++) {
  //     var loopingChainId = parseInt(Object.keys(contractAddresses)[i]);
  //     try {
  //       var loopingContractAddress = contractAddresses[loopingChainId][0];
  //       var loopingProvider = new ethers.providers.JsonRpcProvider(
  //         contractAddresses[loopingChainId][1],
  //         loopingChainId
  //       );
  //       var loopingSigner = new ethers.Wallet(
  //         NEXT_PUBLIC_SIGNER_PK,
  //         loopingProvider
  //       );
  //       var loopingSidechainContract = new ethers.Contract(
  //         loopingContractAddress,
  //         abiSidechainBetting,
  //         loopingSigner
  //       );
  //       var loopingChainTotalMessage = await loopingSidechainContract.checkDrawPools(
  //         loopingChainId,
  //         _matchCountMessage
  //       );
  //       if (loopingChainId == "80001") {
  //         var loopingTotalPoolInMATIC = parseInt(loopingChainTotalMessage);
  //       } else {
  //         var loopingTotalPoolInMATIC =
  //           parseInt(loopingChainTotalMessage) *
  //           (testPricesObject[loopingChainId] / testPricesObject[80001]);
  //       }
  //       totalPoolsInMATIC.push(loopingTotalPoolInMATIC);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   let combinedTotalPoolInMatic = 0;
  //   for (let i = 0; i < totalPoolsInMATIC.length; i++) {
  //     combinedTotalPoolInMatic += totalPoolsInMATIC[i];
  //   }

  //   return combinedTotalPoolInMatic;
  // }

  // async function dbMatchManager(
  //   _matchCountMessage,
  //   _totalPool,
  //   _homePool,
  //   _awayPool,
  //   _drawPool
  // ) {
  //   (async () => {
  //     await client.query(
  //       q.Let(
  //         {
  //           match: q.Match(q.Index("event_number_checker"), _matchCountMessage),
  //           data: {
  //             totalPool: _totalPool,
  //             homePool: _homePool,
  //             awayPool: _awayPool,
  //             drawPool: _drawPool,
  //           },
  //         },
  //         q.If(
  //           q.Exists(q.Var("match")),
  //           q.Update(q.Select(["ref"], q.Get(q.Var("match"))), {
  //             data: q.Var("data"),
  //           }),
  //           q.Do(null) // this line replaces the Create function in the else clause
  //         )
  //       )
  //     );
  //   })();
  // }

  // async function matchCacheUpdater(_matchId) {
  //   console.log("getting pools");
  //   let _totalPool = await automaticTotalPoolUpdater(_matchId);
  //   let _homePool = await automaticHomePoolUpdater(_matchId);
  //   let _awayPool = await automaticAwayPoolUpdater(_matchId);
  //   let _drawPool = await automaticDrawPoolUpdater(_matchId);
  //   console.log("got pools");

  //   console.log("updating db with data");

  //   let stringified_totalPool = parseInt(_totalPool).toString();
  //   let stringified_homePool = parseInt(_homePool).toString();
  //   let stringified_awayPool = parseInt(_awayPool).toString();
  //   let stringified_drawPool = parseInt(_drawPool).toString();

  //   await dbMatchManager(
  //     _matchId,
  //     stringified_totalPool,
  //     stringified_homePool,
  //     stringified_awayPool,
  //     stringified_drawPool
  //   );
  //   console.log("updated db with data");
  // }

  const [show, setShow] = useState(false);

  const chainId = parseInt(chainIdHex);

  const [formData, setFormData] = React.useState({
    userTeamChosen: "",
    eventNumber: 0,
    value: 0,
    ethValue: 0,
  });

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [transactionError, setTransactionError] = useState("");

  function ethTransformer(ethValue) {
    var newEthValue = 0;
    if (ethValue == NaN) {
      newEthValue = 0;
    } else {
      newEthValue = Moralis.Units.ETH(
        (ethValue / props.ethPrice / testPricesObject[chainId]).toFixed(6)
      );
    }

    return newEthValue;
  }

  const [ethValue, setEthValue] = React.useState({
    ethValue: 0,
  });
  const eventOptions = {
    abi: abiSidechainBetting,
    contractAddress: universalContractAddress,
    functionName: "appendUserBet",
    msgValue: ethTransformer(ethValue.ethValue),
    params: {
      userTeamChosen: formData.userTeamChosen,
      eventNumber: props.current_match_payload[0],
      chainId: chainId,
      homeTeam: props.current_match_payload[1],
      awayTeam: props.current_match_payload[2],
      drawTeam: props.current_match_payload[3],
      matchDate: parseInt(props.current_match_payload[4]),
    },
  };

  const {
    runContractFunction,
    isFetching,
    isLoading,
    error,
    onTransactionComplete,
  } = useWeb3Contract(eventOptions);

  // useEffect(() => {
  //   console.log("onTransactionComplete:", onTransactionComplete); // add this line
  //   if (onTransactionComplete) {
  //     onTransactionComplete(
  //       (transaction) => {
  //         // The transaction was successful
  //         setIsTransactionConfirmed(true);
  //         setTransactionError("");
  //         console.log("transaction successful");
  //       },
  //       (error) => {
  //         // There was an error with the transaction
  //         setIsTransactionConfirmed(false);
  //         setTransactionError(error.message);
  //         console.log("transaction failed");
  //       }
  //     );
  //   }
  // }, [onTransactionComplete]);

  const [fundsError, setFundsError] = React.useState(null);

  useEffect(() => {
    if (error) {
      console.log(error.message);
      // console.log(error.data["message"]);
      try {
        if (
          error.message ==
          "MetaMask Tx Signature: User denied transaction signature."
        ) {
          alert("You denied the transaction!");
        } else if (
          error.data["message"] ==
          "execution reverted: You need to spend more ETH!"
        ) {
        } else if (
          error.data["message"] ==
          "execution reverted: You can only bet on the events that have not started yet!"
        ) {
          alert("The match has already started!");
        } else {
          setFundsError(error.message);
          alert("Insufficient funds in your current account!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [error]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  // function updateDbAfterDelay() {
  //   setTimeout(() => {
  //     matchCacheUpdater(props.current_match_payload[0]);
  //   }, 30000); // 20 seconds delay
  // }

  const submit = (e) => {
    setEthValue(() => {
      return { ethValue: formData.value };
    });
    e.preventDefault();
    handleFakeDataUpdateChildren();
    if (formData.value >= 5) {
      runContractFunction();
      // updateDbAfterDelay();
    } else {
      console.log("enter a value greater or euqal to 5$");
    }
  };

  function handleNumeric(event) {
    const { name, valueAsNumber, min, max } = event.target;
    formData.value = Math.max(
      Number(min),
      Math.min(Number(max), valueAsNumber)
    );
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: valueAsNumber };
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await setEthValue(() => {
        return { ethValue: formData.value };
      });
      runContractFunction();
    } catch (err) {
      console.log("submit failed");
    }
  }

  //console.log(blockedBetsList)

  const [isBLocked, setIsBlocked] = React.useState({
    isBlocked: false,
  });

  var blockedBetsList = [];

  for (let i = 0; i < props.matchList.length; i++) {
    blockedBetsList.push(parseInt(props.matchList[i].matchId));
  }

  //console.log(props.matchList)
  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        //console.log(props.matchNumber, blockedBetsList)
        if (props.matchNumber in blockedBetsList) {
          setIsBlocked(() => {
            return {
              isBlocked: true,
            };
          });
        } else if (blockedBetsList == []) {
          setIsBlocked(() => {
            return {
              isBlocked: false,
            };
          });
        }
      }
      //updateUI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(props.current_match_payload);
  //console.log(formData.userTeamChosen);

  // console.log(props.current_match_payload);

  var current_scenario = 4;

  if (formData.userTeamChosen == props.current_match_payload[1]) {
    current_scenario = 1;
  } else if (formData.userTeamChosen == props.current_match_payload[2]) {
    current_scenario = 2;
  } else if (formData.userTeamChosen == props.current_match_payload[3]) {
    current_scenario = 3;
  } else {
    current_scenario = 4;
  }

  //console.log(current_scenario);

  const scenarioObject = {
    1: props.current_match_payload[9],
    2: props.current_match_payload[10],
    3: props.current_match_payload[11],
    4: null,
  };

  //console.log("total pool");
  var total_pool = parseInt(props.current_match_payload[8]);
  // console.log(total_pool);
  // console.log("bet in matic");
  var bet_in_chain_token =
    (formData.value / 1 / testPricesObject[chainId]) * 1000000000000000000;
  // console.log(bet_in_chain_token);
  // console.log("bet_in_matic");
  let bet_in_matic =
    (bet_in_chain_token * testPricesObject[parseInt(chainId)]) /
    testPricesObject[80001];
  // console.log(bet_in_matic);
  // console.log("team pool without bet");
  var team_pool_without_bet = parseInt(scenarioObject[current_scenario]);
  // console.log(team_pool_without_bet);
  var team_pool_with_bet = team_pool_without_bet + bet_in_matic;
  // console.log("team pool with bet");
  // console.log(team_pool_with_bet);
  // console.log("potential winnings in matic");
  var potential_winnings_in_matic =
    (total_pool + bet_in_matic) * (bet_in_matic / team_pool_with_bet);
  // console.log(potential_winnings_in_matic);
  // console.log("potential winnings in usd");
  var potential_winnings_in_usd =
    (potential_winnings_in_matic * testPricesObject[80001]) /
    1000000000000000000;
  // console.log(potential_winnings_in_usd);

  // console.log(formData.value.valueAsNumber);
  // console.log(formData.value);

  const { fakeData, setFakeData } = useContext(FakeBetContext);

  const handleFakeDataUpdateChildren = () => {
    const newFakeData = [
      "parimutuel",
      props.matchType,
      formData.userTeamChosen,
      props.current_match_payload[0],
      chainId,
      props.current_match_payload[1],
      props.current_match_payload[2],
      props.current_match_payload[3],
      parseInt(props.current_match_payload[4]),
      ethTransformer(ethValue.ethValue),
      "pending",
    ]; // replace with your new data
    setFakeData(newFakeData);
  };

  useEffect(() => {
    if (isTransactionConfirmed) {
      handleFakeDataUpdateChildren();
    }
  }, [isTransactionConfirmed]);

  // console.log(isTransactionConfirmed);

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

  function handleHubClick(hub_name) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        userTeamChosen: hub_name,
      };
    });
  }

  return (
    <>
      {" "}
      <div className="match-hubs-container">
        <div
          className={`match-team-hub ${
            formData.userTeamChosen === props.current_match_payload[1]
              ? "selected"
              : ""
          }`}
          onClick={() => handleHubClick(props.current_match_payload[1])}
          style={{
            cursor: "pointer",
          }}
        >
          <div className="match-team-hub-name">
            {props.current_match_payload[1]}
          </div>
          {isNaN(
            Math.round(
              (parseInt(props.current_match_payload[9]) /
                parseInt(props.current_match_payload[8])) *
                100
            )
          ) ? (
            <div className="match-team-hub-percentage">0%</div>
          ) : (
            <div
              className="match-team-hub-percentage"
              style={{
                color: getColor(
                  Math.round(
                    (parseInt(props.current_match_payload[9]) /
                      parseInt(props.current_match_payload[8])) *
                      100
                  )
                ),
              }}
            >
              {Math.round(
                (parseInt(props.current_match_payload[9]) /
                  parseInt(props.current_match_payload[8])) *
                  100
              )}
              %
            </div>
          )}
        </div>
        <div
          className={`match-team-hub ${
            formData.userTeamChosen === props.current_match_payload[3]
              ? "selected"
              : ""
          }`}
          onClick={() => {
            if (props.current_match_payload[3] !== "none") {
              handleHubClick(props.current_match_payload[3]);
            }
          }}
          style={{
            cursor:
              props.current_match_payload[3] !== "none"
                ? "pointer"
                : "not-allowed",
          }}
        >
          <div
            className="match-team-hub-name"
            style={{
              fontSize:
                props.current_match_payload[3] == "none" ? "50px" : "inherit",
            }}
          >
            {props.current_match_payload[3] == "none"
              ? "X"
              : props.current_match_payload[3]}
          </div>
          {props.current_match_payload[3] === "none" ? null : isNaN(
              Math.round(
                (parseInt(props.current_match_payload[11]) /
                  parseInt(props.current_match_payload[8])) *
                  100
              )
            ) ? (
            <div className="match-team-hub-percentage">0%</div>
          ) : (
            <div
              className="match-team-hub-percentage"
              style={{
                color: getColor(
                  Math.round(
                    (parseInt(props.current_match_payload[11]) /
                      parseInt(props.current_match_payload[8])) *
                      100
                  )
                ),
              }}
            >
              {Math.round(
                (parseInt(props.current_match_payload[11]) /
                  parseInt(props.current_match_payload[8])) *
                  100
              )}
              %
            </div>
          )}
        </div>
        <div
          className={`match-team-hub ${
            formData.userTeamChosen === props.current_match_payload[2]
              ? "selected"
              : ""
          }`}
          onClick={() => handleHubClick(props.current_match_payload[2])}
          style={{
            cursor: "pointer",
          }}
        >
          <div className="match-team-hub-name">
            {props.current_match_payload[2]}
          </div>
          {isNaN(
            Math.round(
              (parseInt(props.current_match_payload[10]) /
                parseInt(props.current_match_payload[8])) *
                100
            )
          ) ? (
            <div className="match-team-hub-percentage">0%</div>
          ) : (
            <div
              className="match-team-hub-percentage"
              style={{
                color: getColor(
                  Math.round(
                    (parseInt(props.current_match_payload[10]) /
                      parseInt(props.current_match_payload[8])) *
                      100
                  )
                ),
              }}
            >
              {Math.round(
                (parseInt(props.current_match_payload[10]) /
                  parseInt(props.current_match_payload[8])) *
                  100
              )}
              %
            </div>
          )}
        </div>
      </div>
      {props.made_a_bet === "true" ? (
        <div className="already-did-bet">🚫You already made a bet🚫</div>
      ) : props.current_match_payload[6] == "OPEN" ||
        props.current_match_payload[6] == "" ? (
        <>
          <form className="create-new-bet-form" onSubmit={handleSubmit}>
            <div className="create-new-bet-controls-container">
              <div className="create-new-bet-value">
                <input
                  className="numeric-form"
                  label="Enter your bet in USD"
                  type="number"
                  placeholder="bet amount in $"
                  name="value"
                  value={formData.value.valueAsNumber}
                  onChange={handleNumeric}
                  min="5"
                  max="10000000"
                />
              </div>

              <Tooltip
                content="Winnings may change depending on the amount of bets placed on this and other outcomes."
                direction="left"
              >
                <div className="potential-winnings-hub">
                  {!isNaN(potential_winnings_in_usd) ? (
                    <div className="potential-winnings-text1">
                      {potential_winnings_in_usd.toFixed(1)}* $
                    </div>
                  ) : (
                    <div className="potential-winnings-text2">
                      Potential winnings*
                    </div>
                  )}
                </div>
              </Tooltip>

              <NewModal
                show={show}
                onClose={() => setShow(false)}
                onConfirm={(e) => {
                  submit(e);
                  setShow(false);
                }}
                betValue={formData.value}
                team={formData.userTeamChosen.toUpperCase()}
                matchNumber={props.current_match_payload[0]}
                lowFunds={fundsError}
              />
            </div>

            <div className="create-new-bet-userteam">
              {/* <select
              className="create-new-bet-userteam-form"
              onChange={handleChange}
              name="userTeamChosen"
              value={formData.userTeamChosen}
            >
              <option>--choose---</option>
              <option value={props.current_match_payload[1]}>
                🏠{props.current_match_payload[1]}
              </option>
              <option value={props.current_match_payload[2]}>
                ✈️{props.current_match_payload[2]}
              </option>
              {props.current_match_payload[3] == "none" ? null : (
                <option value={props.current_match_payload[3]}>
                  🙅{props.current_match_payload[3]}
                </option>
              )}
            </select> */}
            </div>

            <div className="create-new-bet-submit">
              <button
                className="button-submit"
                onClick={() => setShow(true)}
                disabled={
                  formData.userTeamChosen === "--choose---" ||
                  formData.userTeamChosen === "" ||
                  isNaN(formData.value) ||
                  formData.value < 5
                }
                style={{
                  cursor:
                    formData.userTeamChosen === "--choose---" ||
                    formData.userTeamChosen === "" ||
                    isNaN(formData.value) ||
                    formData.value < 5 ||
                    !formData.userTeamChosen
                      ? "not-allowed"
                      : "pointer",
                }}
                title={
                  formData.userTeamChosen === "--choose---" ||
                  formData.userTeamChosen === ""
                    ? "Please choose a team"
                    : isNaN(formData.value) || formData.value < 5
                    ? "Minimum bet is $5"
                    : ""
                }
              >
                Submit
              </button>
            </div>
          </form>
          <div className="parimutuel-instructions">
            <Instructions variant="parimutuelInstructions" />
          </div>
        </>
      ) : (
        <div className="already-did-bet">🚫The match has already started🚫</div>
      )}
    </>
  );
}
