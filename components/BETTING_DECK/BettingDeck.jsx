// import contractAddresses from "../../constants/contractAddresses.json";

import { useEffect, useState, useRef } from "react";
import { ethers, BigNumber } from "ethers";
import React from "react";
// import abiSidechainBetting from "../../constants/abiSidechainBetting.json";
import SportsSelector from "./SportsSelector";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import faunadb from "faunadb";
import MatchOrderingContainer from "./MatchOrderingContainer";
import Link from "next/link";
import MatchFantasyContainer from "./MatchFantasyContainer";
// import BetonomicsContainer from "./BetonomicsContainer";
// import ArbiterContainer from "./ArbiterContainer";
import { FakeBetContext } from "../FakeBetContext";

// import abiBetonomicsArbiter from "../../constants/abiBetonomicsArbiter.json";
// import betonomicsArbiterContractAddresses from "../../constants/betonomicsArbiterContractAddresses.json";
// import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import MatchCard from "./MatchCard";
const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function BettingDeck({
  fantasyMatchCount,
  fantasyMatchNumbers,
  fantasyMatchTypes,
  fantasyMatchesData,
  loading,
  intro,
  fiat_demo,
  user,
  updateDataAfterBet,
}) {
  // const { address, isConnected } = useAccount();
  // const { chain, chains } = useNetwork();

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const [isUserAnArbiter, setIsUserAnArbiter] = React.useState(false);

  // async function arbiterUpdater() {
  //   var loopingContractAddress = betonomicsArbiterContractAddresses[80001][0];

  //   var loopingProvider = new ethers.providers.JsonRpcProvider(
  //     betonomicsArbiterContractAddresses[80001][1],
  //     80001
  //   );
  //   var loopingSigner = new ethers.Wallet(
  //     NEXT_PUBLIC_SIGNER_PK,
  //     loopingProvider
  //   );
  //   const administrativeMatchFantasyContract = new ethers.Contract(
  //     loopingContractAddress,
  //     abiBetonomicsArbiter,
  //     loopingSigner
  //   );

  //   let arbiters_list_message =
  //     await administrativeMatchFantasyContract.getArbiterAddresses();

  //   //console.log(arbiters_list_message);
  //   //make an array that turns every single address into lowercase
  //   let arbiters_list_lowercase = [];

  //   for (let j = 0; j < arbiters_list_message.length; j++) {
  //     arbiters_list_lowercase.push(arbiters_list_message[j].toLowerCase());
  //   }
  //   // console.log("hi");
  //   // console.log(arbiters_list_lowercase);
  //   //check if the user is in the list of arbiters

  //   //console.log(address.toLowerCase());
  //   // console.log(arbiters_list_lowercase);

  //   setIsUserAnArbiter(arbiters_list_lowercase.includes(address.toLowerCase()));
  // }

  useEffect(() => {
    if (intro === "true") {
    } else {
      // arbiterUpdater();
    }

    // async function updateUI() {}
    // updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        // window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const sportsOptions = [
    // { value: "soccer", label: "Soccer" },
    { value: "dota", label: "Dota 2" },
    // { value: "tennis", label: "Tennis" },
    { value: "csgo", label: "CS:GO" },
    // { value: "polytics", label: "Polytics" },
    // { value: "twitch", label: "Twitch" },
    // { value: "world", label: "World" },
    // { value: "other", label: "Other" },
  ];

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input type="checkbox" checked={isSelected} onChange={() => null} />{" "}
          <label>{label}</label>
        </components.Option>
      </div>
    );
  };

  const [sportsSelectorState, setSportsSelectorState] = React.useState({
    optionSelected: [
      // { value: "economics", label: "Economics" },
      // { value: "esports", label: "E-sports" },
      { value: "csgo", label: "CS:GO" },
      { value: "dota", label: "Dota 2" },
      // { value: "soccer", label: "Football" },
      // { value: "politics", label: "Politics" },
      // { value: "sports", label: "Sports" },
      // { value: "tennis", label: "Tennis" },
      // { value: "twitch", label: "Twitch" },
      // { value: "other", label: "Other" },
      // { value: "world", label: "World" },
    ],
    isFocused: true,
  });

  function handleChange(selected) {
    setSportsSelectorState((prev) => {
      return { ...prev, optionSelected: selected };
    });
  }

  var currentlySelectedTypesList = [];

  for (let i = 0; i < sportsSelectorState.optionSelected.length; i++) {
    currentlySelectedTypesList.push(
      sportsSelectorState.optionSelected[i]["value"]
    );
  }

  function duplicateIndexes(arr, el) {
    if (!Array.isArray(arr)) {
      return [];
    }

    let duplicate = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === el) {
        duplicate.push(i);
      }
    }
    return duplicate;
  }

  let chosenMatchTypes = [];
  let chosenFantasyMatchTypes = [];

  // console.log(matchTypes);

  for (let i = 0; i < sportsSelectorState.optionSelected.length; i++) {
    let d = duplicateIndexes(
      fantasyMatchTypes,
      sportsSelectorState.optionSelected[i]["value"]
    );
    for (let j = 0; j < d.length; j++) {
      chosenMatchTypes.push(d[j]);
    }
  }

  for (let i = 0; i < sportsSelectorState.optionSelected.length; i++) {
    let d = duplicateIndexes(
      fantasyMatchTypes,
      sportsSelectorState.optionSelected[i]["value"]
    );
    for (let j = 0; j < d.length; j++) {
      chosenFantasyMatchTypes.push(d[j]);
    }
  }

  const [gameMode, setGameMode] = React.useState({
    currentMode: "fantasy-coach",
  });

  const modeProps = {
    // parimutuel: {
    //   component: MatchOrderingContainer,
    //   props: {
    //     matchTypes: matchTypes,
    //     matchCount: matchCount,
    //     owner: owner,
    //     matchesData: matchesData,
    //     chosenMatchTypes: sportsSelectorState.optionSelected,
    //     loading: loading,
    //   },
    // },
    "fantasy-coach": {
      component: MatchFantasyContainer,
      props: {
        matchTypes: fantasyMatchTypes,
        matchCount: fantasyMatchCount,
        // owner: owner,
        matchesData: fantasyMatchesData,
        chosenMatchTypes: sportsSelectorState.optionSelected,
        loading: loading,
        intro: intro,
        fiat_demo: fiat_demo,
        user: user,
        updateDataAfterBet: updateDataAfterBet,
        isMobile: false,
      },
    },
    // betonomics: {
    //   component: BetonomicsContainer,
    //   props: {
    //     matchTypes: ugeMatchTypes,
    //     matchCount: ugeMatchCount,
    //     owner: owner,
    //     matchesData: ugeMatchesData,
    //     chosenMatchTypes: sportsSelectorState.optionSelected,
    //     loading: loading,
    //     intro: intro,
    //   },
    // },
    // arbiter: {
    //   component: ArbiterContainer,
    //   props: {
    //     matchTypes: ugeMatchTypes,
    //     matchCount: ugeMatchCount,
    //     owner: owner,
    //     matchesData: arbiterMatchesData,
    //     chosenMatchTypes: sportsSelectorState.optionSelected,
    //     isArbiter: isUserAnArbiter,
    //     userArbiterMatches: userArbiterMatches,
    //     loading: loading,
    //     intro: intro,
    //   },
    // },
  };

  // Render the component for the current mode
  const ModeComponent = modeProps[gameMode.currentMode].component;
  const modePropsForComponent = modeProps[gameMode.currentMode].props;

  // console.log(fantasyMatchesData);

  return (
    <>
      <div className="container px-0 mt-3">
        <FakeBetContext.Consumer>
          {({ onDataUpdate }) => (
            <>
              <ModeComponent {...modePropsForComponent} />
            </>
          )}
        </FakeBetContext.Consumer>
      </div>
    </>
  );
}
