import { useEffect, useState } from "react";

import React from "react";
import YourBetsContainer from "./USER_UI/YourBetsContainer";
import { InfinitySpin } from "react-loader-spinner";

import { FakeBetContext } from "../FakeBetContext";

import Leaderboard from "./USER_UI/Leaderboard";
import WeeklyHub from "./USER_UI/WeeklyHub";
import MobileBettingDeck from "../BETTING_DECK/MobileBettingDeck";
import BettingDeck from "../BETTING_DECK/BettingDeck";

export default function DesktopDeck(props) {
  const [userMatches, setUserMatches] = React.useState({
    userMatchesList: [],
  });

  const [parimutuelArrays, setParimutuelArrays] = React.useState({
    contractTypesArray: [],
    matchIdsArray: [],
  });

  const [fantasyArrays, setFantasyArrays] = React.useState({
    contractTypesArray: [],
    matchIdsArray: [],
  });

  const [ugeArrays, setUgeArrays] = React.useState({
    contractTypesArray: [],
    matchIdsArray: [],
  });

  const [arbiterArrays, setArbiterArrays] = React.useState({
    contractTypesArray: [],
    matchIdsArray: [],
  });

  const [creatorArrays, setCreatorArrays] = React.useState({
    contractTypesArray: [],
    matchIdsArray: [],
  });

  const [isLoading, setIsLoading] = React.useState(true);

  const [parimutuelLoading, setParimutuelLoading] = React.useState(true);

  const [fantasyLoading, setFantasyLoading] = React.useState(true);

  const [ugeLoading, setUgeLoading] = React.useState(true);

  const [arbiterLoading, setArbiterLoading] = React.useState(true);

  const [creatorLoading, setCreatorLoading] = React.useState(true);

  //if props.intro === "true" then set all loading states to false

  useEffect(() => {
    if (props.intro === "true") {
      setIsLoading(false);
      setParimutuelLoading(false);
      setFantasyLoading(false);
      setUgeLoading(false);
      setArbiterLoading(false);
      setCreatorLoading(false);
    }
  }, [props.intro]);

  const [fantasyUserMatches, setFantasyUserMatches] = React.useState({
    userMatchesList: [],
  });

  const [ugeMatches, setUgeMatches] = React.useState({
    userMatchesList: [],
  });

  const [arbiterMatches, setArbiterMatches] = React.useState({
    userMatchesList: [],
  });

  const [creatorMatches, setCreatorMatches] = React.useState({
    userMatchesList: [],
  });

  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  const [ethData, setEthData] = React.useState({
    ethPrice: 1,
  });

  const [tabActive, setTabActive] = React.useState({
    yourBetsTabActive: false,
    mobileBettingDeckActive: true,
    leaderBoardTabActive: false,
  });

  function handleTabs(tab) {
    setTabActive({
      yourBetsTabActive: tab === "yourBetsTabActive",
      mobileBettingDeckActive: tab === "mobileBettingDeckActive",
      leaderBoardTabActive: tab === "leaderBoardTabActive",
    });
  }

  return (
    <>
      <div className="admin-deck">
        <ul className="nav nav-pills nav-fill mt-2">
          <li className="nav-item">
            <button
              className={`nav-link ${
                tabActive.mobileBettingDeckActive ? "active" : ""
              }`}
              onClick={() => handleTabs("mobileBettingDeckActive")}
            >
              Beting Deck
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                tabActive.yourBetsTabActive ? "active" : ""
              }`}
              onClick={() => handleTabs("yourBetsTabActive")}
            >
              Your Bets
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                tabActive.leaderBoardTabActive ? "active" : ""
              }`}
              onClick={() => handleTabs("leaderBoardTabActive")}
            >
              Leaderboard
            </button>
          </li>
        </ul>
        {parimutuelLoading ||
        fantasyLoading ||
        ugeLoading ||
        arbiterLoading ||
        creatorLoading ? null : (
          <>
            {tabActive.yourBetsTabActive ? (
              <FakeBetContext.Consumer>
                {({ fakeData }) => (
                  <>
                    <YourBetsContainer
                      data={userMatches.userMatchesList}
                      ethPrice={ethData.ethPrice}
                      fantasyData={fantasyUserMatches.userMatchesList}
                      loading={isLoading}
                      ugeData={ugeMatches.userMatchesList}
                      arbiterData={arbiterMatches.userMatchesList}
                      fakeData={fakeData}
                      intro={props.intro}
                      user={props.user}
                      isMobile={props.isMobile}
                    />
                  </>
                )}
              </FakeBetContext.Consumer>
            ) : tabActive.mobileBettingDeckActive ? (
              <BettingDeck
                intro={props.intro}
                fantasyMatchCount={props.fantasyMatchCount}
                fantasyMatchNumbers={props.fantasyMatchNumbers}
                fantasyMatchTypes={props.fantasyMatchTypes}
                fantasyMatchesData={props.fantasyMatchesData}
                loading={props.loading}
                fiat_demo={props.fiat_demo}
                user={props.user}
                isMobile={props.isMobile}
                leftSideLoading={props.leftSideLoading}
              />
            ) : (
              <Leaderboard
                intro={props.intro}
                user={props.user}
                isMobile={props.isMobile}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
