import { useEffect, useState } from "react";

import React from "react";
import YourBetsContainer from "./USER_UI/YourBetsContainer";
import { InfinitySpin } from "react-loader-spinner";

import { FakeBetContext } from "../FakeBetContext";

import Leaderboard from "./USER_UI/Leaderboard";
import WeeklyHub from "./USER_UI/WeeklyHub";

export default function YourBetsDeck(props) {
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

  useEffect(() => {
    // async function updateUI() {
    //   if (props.intro === "true") {
    //   } else {
    //     setEthData(() => {
    //       return {
    //         ethPrice: Math.round(testPricesObject[chain["id"]]),
    //       };
    //     });
    //   }
    // }
    // updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [ethData, setEthData] = React.useState({
    ethPrice: 1,
  });

  const [tabActive, setTabActive] = React.useState({
    yourBetsTabActive: true,
    // weeklyHubTabActive: false,
    leaderBoardTabActive: false,
  });

  function handleTabs(tab) {
    setTabActive((prevTabActive) => {
      return {
        ...prevTabActive,
        [tab]: true,
        yourBetsTabActive: tab === "yourBetsTabActive" ? true : false,
        // weeklyHubTabActive: tab === "weeklyHubTabActive" ? true : false,
        leaderBoardTabActive: tab === "leaderBoardTabActive" ? true : false,
      };
    });
  }

  // console.log("is it mobile?");
  // console.log(props.isMobile);

  return (
    <>
      <div className="admin-deck">
        <div className="tab-selector">
          <div
            className={
              tabActive.yourBetsTabActive
                ? "tab-title-active"
                : "tab-title-passive"
            }
            onClick={() => handleTabs("yourBetsTabActive")}
          >
            <div className="your-bets-tab-text">Your Bets</div>
          </div>
          <div
            className={
              tabActive.leaderBoardTabActive
                ? "tab-title-active"
                : "tab-title-passive"
            }
            onClick={() => handleTabs("leaderBoardTabActive")}
          >
            <div className="your-events-tab-text">Leaderboard</div>
          </div>

          {/* <div
            className={
              tabActive.weeklyHubTabActive
                ? "tab-title-active"
                : "tab-title-passive"
            }
            onClick={() => handleTabs("weeklyHubTabActive")}
          >
            <div className="claim-winnings-tab-text">Weekly Hub</div>
          </div> */}
        </div>

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
          ) : tabActive.weeklyHubTabActive ? (
            <WeeklyHub intro={props.intro} isMobile={props.isMobile} />
          ) : (
            <Leaderboard
              intro={props.intro}
              user={props.user}
              isMobile={props.isMobile}
            />
          )}
        </>
      </div>
    </>
  );
}
