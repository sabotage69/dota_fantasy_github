import { useWeb3Contract } from "react-moralis";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import React from "react";
import faunadb from "faunadb";
import sportIcons from "../../constants/iconsSports.json";
import betonomicsEventContractAddresses from "../../constants/betonomicsEventContractAddresses.json";
import abiBetonomicsEvent from "../../constants/abiBetonomicsEvent.json";
import BetonomicsModal from "./modal/BetonomicsModal";
import { FakeBetContext } from "../FakeBetContext";
import { useContext } from "react";
import Instructions from "./modal/Instructions";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_DEPLOYER_PK = process.env.NEXT_PUBLIC_DEPLOYER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function BetonomicsCard(props) {
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  //if chain is undefined, set it to 80001

  let chainId;

  if (chain === undefined) {
    chainId = 80001;
  } else {
    chainId = chain["id"];
  }

  const universalContractAddress =
    chainId in betonomicsEventContractAddresses
      ? betonomicsEventContractAddresses[chainId][0]
      : null;

  const mainchainId = 80001;
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://rpc-mumbai.maticvigil.com",
  //   80001
  // );
  // const signer = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PK, provider);
  // const deployer = new ethers.Wallet(NEXT_PUBLIC_DEPLOYER_PK, provider);

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

  // console.log(props.matchesData);

  // console.log(current_match_payload);

  let participants_pools_combined = 0;

  // console.log(props.matchesData["data"][2]);

  let splitted_participants_pools = current_match_payload[2].split("___");

  try {
    for (let i = 0; i < splitted_participants_pools.length; i++) {
      participants_pools_combined += parseInt(splitted_participants_pools[i]);
    }
  } catch (err) {
    console.log(err);
  }

  let splitted_participants = current_match_payload[1].split("___");

  var date = new Date(current_match_payload[5] * 1000);
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();
  var hour = date.getUTCHours();
  var minute = date.getUTCMinutes();

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const unix_now = getTimestampInSeconds();
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();
  var hour = date.getUTCHours();
  var minute = date.getUTCMinutes();

  if (minute < 10) {
    var formattedTime = hour + ":" + minute + "0" + " " + day + "-" + month;
  } else {
    var formattedTime = hour + ":" + minute + " " + day + "-" + month;
  }

  const [expandedView, setExpandedView] = React.useState({
    expanded: false,
  });

  //console.log(expandedView.expanded);

  function expandView() {
    setExpandedView((prevView) => ({
      ...prevView,
      expanded: !prevView.expanded,
    }));
  }

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
  //console.log(props.id);

  function getParticipantColor(participantPool, combinedPools) {
    const percentage =
      (parseInt(participantPool) / parseInt(combinedPools)) * 100;
    return getColor(Math.round(percentage));
  }

  const title_and_description = current_match_payload[4].split("___");
  const title = title_and_description[0];
  const description = title_and_description[1];
  // console.log(current_match_payload);

  const [show, setShow] = useState(false);

  const [formData, setFormData] = React.useState({
    userTeamChosen: "",
    eventNumber: 0,
    value: 0,
    ethValue: 0,
  });

  function ethTransformer(ethValue) {
    var newEthValue = 0;
    if (props.intro === "true") {
      // Handle the case for props.intro being "true" (if needed)
    } else {
      if (isNaN(ethValue)) {
        newEthValue = 0;
      } else {
        const chainPrice = testPricesObject[chain.id];
        const ethUnit = ethers.utils.parseEther("1");
        const priceUnit = ethers.utils.parseUnits(chainPrice.toString(), "wei");
        const valueInWei = ethers.utils.parseUnits(
          ethValue.toString(),
          "ether"
        );

        const newValueInEth = valueInWei.mul(ethUnit).div(priceUnit);
        newEthValue = Number(
          ethers.utils.formatUnits(newValueInEth, "ether")
        ).toFixed(6);
      }

      return newEthValue;
    }
  }

  const [ethValue, setEthValue] = React.useState({
    ethValue: 0,
  });

  // const eventOptions = {
  //   abi: abiBetonomicsEvent,
  //   contractAddress: universalContractAddress,
  //   functionName: "makeMatchPrediction",
  //   msgValue: ethTransformer(ethValue.ethValue),
  //   params: {
  //     matchId: current_match_payload[0],
  //     chosenOutcome: formData.userTeamChosen,
  //     chainId: chainId,
  //     matchDate: parseInt(current_match_payload[5]),
  //     participatingTeams: splitted_participants,
  //     title: title,
  //     place: current_match_payload[6],
  //     sportType: current_match_payload[8],
  //   },
  // };

  // const { runContractFunction, isFetching, isLoading, error } = useWeb3Contract(
  //   eventOptions
  // );

  const [fundsError, setFundsError] = React.useState(null);

  // useEffect(() => {
  //   if (error) {
  //     // console.log(error);
  //     console.log(error);
  //     // console.log(error.data["message"]);
  //     try {
  //       if (
  //         error.message ==
  //         "MetaMask Tx Signature: User denied transaction signature."
  //       ) {
  //         alert("You denied the transaction!");
  //       } else if (
  //         error.data["message"] ==
  //         "execution reverted: You need to spend more ETH!"
  //       ) {
  //       } else if (
  //         error.data["message"] ==
  //         "execution reverted: You can only bet on the events that have not started yet!"
  //       ) {
  //         alert("The match has already started!");
  //       } else {
  //         setFundsError(error.message);
  //         alert("Insufficient funds in your current account!");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, [error]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  // const submit = (e) => {
  //   setEthValue(() => {
  //     return { ethValue: formData.value };
  //   });
  //   e.preventDefault();
  //   if (formData.value >= 5) {
  //     // runContractFunction();
  //     updateUI();
  //   } else {
  //     console.log("enter a value greater or euqal to 5$");
  //   }
  // };

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

  // const eventOptions = {
  //   abi: abiBetonomicsEvent,
  //   contractAddress: universalContractAddress,
  //   functionName: "makeMatchPrediction",
  //   msgValue: ethTransformer(ethValue.ethValue),
  //   params: {
  //     matchId: current_match_payload[0],
  //     chosenOutcome: formData.userTeamChosen,
  //     chainId: chainId,
  //     matchDate: parseInt(current_match_payload[5]),
  //     participatingTeams: splitted_participants,
  //     title: title,
  //     place: current_match_payload[6],
  //     sportType: current_match_payload[8],
  //   },
  // };

  // const provider = new ethers.providers.Web3Provider(web3.currentProvider);

  // async function updateUI() {
  //   const accounts = await ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const address = accounts[0];
  //   const signer = provider.getSigner();
  //   // console.log(address);
  //   const signature = await signer.signMessage(address.toString());

  //   const betonomicsChainContract = new ethers.Contract(
  //     betonomicsEventContractAddresses[chainId][0],
  //     abiBetonomicsEvent,
  //     signer
  //   );

  //   const gasPrice = await provider.getGasPrice();
  //   const addingAllWinnings = await betonomicsChainContract.makeMatchPrediction(
  //     current_match_payload[0],
  //     formData.userTeamChosen,
  //     chainId,
  //     parseInt(current_match_payload[5]),
  //     splitted_participants,
  //     title,
  //     current_match_payload[6],
  //     current_match_payload[8],
  //     {
  //       //maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei'),
  //       gasPrice: gasPrice,
  //       gasLimit: ethers.utils.parseUnits("10000000", "wei"),
  //       value: ethTransformer(ethValue.ethValue),
  //       //maxFeePerGas: ethers.utils.parseUnits('2.5', 'gwei'),
  //     }
  //   );
  // }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await setEthValue(() => {
        return { ethValue: formData.value };
      });
      // runContractFunction();
      //updateUI();
    } catch (err) {
      console.log("submit failed");
    }
  }

  const index = splitted_participants.indexOf(formData.userTeamChosen);
  const current_scenario = index !== -1 ? index + 1 : 17;

  const scenarioObject = {};
  for (let i = 1; i <= Math.min(16, splitted_participants_pools.length); i++) {
    scenarioObject[i] = splitted_participants_pools[i - 1];
  }
  scenarioObject[17] = null;

  // console.log("total pool");
  var total_pool = parseInt(participants_pools_combined);
  // console.log(total_pool);
  // console.log("bet in bet_in_chain_token");
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
  function generateOptions() {
    return splitted_participants.map((participant, index) => (
      <option key={index} value={participant}>
        {participant}
      </option>
    ));
  }

  function handleParticipantClick(participant) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        userTeamChosen: participant,
      };
    });
  }

  // console.log(eventOptions);
  return (
    <>
      {current_match_payload != null ? (
        current_match_payload[7] == "OPEN" ? (
          <>
            <div className="betonomics-card">
              <div className="your-event-card-icon-container">
                <picture>
                  <source
                    srcSet={sportIcons[current_match_payload[8]]}
                    type="image/png"
                  />
                  <img
                    className="sport-icon"
                    alt=""
                    src={sportIcons[current_match_payload[8]]}
                  ></img>
                </picture>
              </div>
              <div className="your-event-card-title" title={title}>
                {title.length > 58 ? title.slice(0, 58) + "..." : title}
              </div>
              <div className="your-event-card-date">📅{formattedTime}</div>
              <div className="your-event-card-pooled">
                💰Winnings pool:{" "}
                {(
                  (parseInt(participants_pools_combined) *
                    testPricesObject[80001]) /
                  1000000000000000000
                ).toFixed(1)}{" "}
                $
              </div>
              <div className="your-event-card-place">
                📌{current_match_payload[6]}
              </div>
              <div onClick={expandView} className="your-event-expander">
                {expandedView.expanded ? (
                  <svg
                    width="60"
                    height="25"
                    viewBox="0 0 60 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_5)">
                      <path
                        d="M30.5 4L56.9138 16H4.08623L30.5 4Z"
                        fill="#292929"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_5">
                        <rect width="60" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="60"
                    height="25"
                    viewBox="0 0 60 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_4)">
                      <path
                        d="M30.5 20L4.08623 8L56.9138 8L30.5 20Z"
                        fill="#292929"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_4">
                        <rect width="60" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
              {expandedView.expanded ? (
                <>
                  <div className="betonomics-card-description">
                    {description}
                  </div>
                  <div className="betonomics-card-participants">
                    {splitted_participants.map((participant, i) => (
                      <div
                        className={`betonomics-card-participant ${
                          formData.userTeamChosen === participant
                            ? "selected"
                            : ""
                        }`}
                        key={i}
                        onClick={() => handleParticipantClick(participant)}
                        style={{
                          color: getColor(
                            Math.round(
                              (parseInt(splitted_participants_pools[i]) /
                                parseInt(participants_pools_combined)) *
                                100
                            )
                          ),
                          cursor: "pointer",
                        }}
                      >
                        {participant} -{" "}
                        {isNaN(
                          Math.round(
                            (parseInt(splitted_participants_pools[i]) /
                              parseInt(participants_pools_combined)) *
                              100
                          )
                        )
                          ? 0
                          : Math.round(
                              (parseInt(splitted_participants_pools[i]) /
                                parseInt(participants_pools_combined)) *
                                100
                            )}
                        %
                      </div>
                    ))}
                  </div>
                  {/* <div className="your-event-card-edit">edit</div> */}
                  <form
                    className="create-new-betonomics-bet-form"
                    onSubmit={handleSubmit}
                  >
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

                      <div className="potential-winnings-hub">
                        {!isNaN(potential_winnings_in_usd) ? (
                          <div className="potential-winnings-text1">
                            {potential_winnings_in_usd.toFixed(1)} $
                          </div>
                        ) : (
                          <div className="potential-winnings-text2">
                            Potential winnings
                          </div>
                        )}
                      </div>
                      <FakeBetContext.Consumer>
                        {({ onDataUpdate }) => (
                          <>
                            <BetonomicsModal
                              show={show}
                              onClose={() => setShow(false)}
                              onConfirm={(e) => {
                                // submit(e);
                                setShow(false);
                              }}
                              betValue={formData.value}
                              chosenOutcome={formData.userTeamChosen}
                              matchId={current_match_payload[0]}
                              matchDate={parseInt(current_match_payload[5])}
                              participatingTeams={splitted_participants}
                              title={title}
                              place={current_match_payload[6]}
                              sportType={current_match_payload[8]}
                              lowFunds={fundsError}
                              intro={props.intro}
                            />
                          </>
                        )}
                      </FakeBetContext.Consumer>
                    </div>

                    <div className="create-new-bet-userteam">
                      {/* <select
                        className="create-new-bet-userteam-form"
                        onChange={handleChange}
                        name="userTeamChosen"
                        value={formData.userTeamChosen}
                      >
                        <option>--choose---</option>
                        {generateOptions()}
                      </select> */}
                    </div>

                    <div className="create-new-bet-submit">
                      {address ? (
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
                      ) : (
                        <button
                          className="button-submit-disabled"
                          disabled
                          title={"Connect your wallet to make bets."}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                  <div className="betonomics-instructions">
                    <Instructions variant="betonomicsInstructions" />
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
}
