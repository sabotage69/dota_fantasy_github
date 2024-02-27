import BettingDeck from "../components/BETTING_DECK/BettingDeck";

import { useEffect, useState } from "react";

import React from "react";
import YourBetsDeck from "./YOUR_BETS_DECK/YourBetsDeck";

import { InfinitySpin } from "react-loader-spinner";

import faunadb from "faunadb";
import { FakeBetContext } from "./FakeBetContext";
import MobileDeck from "./YOUR_BETS_DECK/MobileDeck";
import DesktopDeck from "./YOUR_BETS_DECK/DesktopDeck";
import ImageBanner from "./GENERAL/ImageBanner";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function DecksContainer({
  intro,
  fiat_demo,
  user,
  updateDataAfterBet,
}) {
  // console.log(user);

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        // window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        // window.location.reload();
      });
    }
  });

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const unix_now = getTimestampInSeconds();

  const [fantasyMatchCount, setFantasyMatchCount] = React.useState({
    matchCount: 0,
  });

  const [fantasyEventTypeData, setFantasyEventTypeData] = React.useState({
    matchNumbers: [],
    matchTypes: [],
  });

  const [fantasyMatchesData, setFantasyMatchesData] = React.useState([]);

  useEffect(() => {
    async function updateUI() {
      let fantasy_saved_data;

      await client
        .query(
          q.Paginate(
            q.Match(q.Index("front_data_provider_matchfantasy_full"), "OPEN")
          )
        )
        .then((ret) => {
          //   console.log(ret);
          fantasy_saved_data = ret;
        })
        .catch((err) =>
          console.error(
            "Error: [%s] %s: %s",
            err.name,
            err.message
            // err.errors()[0].description
          )
        );

      setFantasyMatchesData(fantasy_saved_data);

      setIsLoading(false);
    }
    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fakeData, setFakeData] = useState("initial fake data");

  const handleFakeDataUpdate = (newFakeData) => {
    setFakeData(newFakeData);
  };

  const [isMobile, setIsMobile] = useState(false);

  const [unoptimizedMObile, setUnoptimizedMObile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerHeight > window.innerWidth);
    };

    handleResize(); // Check initial dimensions

    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  const handleNoticeClick = () => {
    setUnoptimizedMObile(false);
  };

  return (
    <>
      <FakeBetContext.Provider
        value={{ fakeData, setFakeData, onDataUpdate: handleFakeDataUpdate }}
      >
        {/* <ImageBanner /> */}
        <div className="decks-container">
          <DesktopDeck
            fantasyMatchCount={fantasyMatchCount.matchCount}
            fantasyMatchNumbers={fantasyEventTypeData.matchNumbers}
            fantasyMatchTypes={fantasyEventTypeData.matchTypes}
            fantasyMatchesData={fantasyMatchesData}
            loading={isLoading}
            intro={intro}
            fiat_demo={fiat_demo}
            user={user}
            isMobile={isMobile}
            leftSideLoading={isLoading}
          />
        </div>
      </FakeBetContext.Provider>
    </>
  );
}

// {isMobile ? (
//   <div className="decks-container-mobile">
//     <MobileDeck
//       fantasyMatchCount={fantasyMatchCount.matchCount}
//       fantasyMatchNumbers={fantasyEventTypeData.matchNumbers}
//       fantasyMatchTypes={fantasyEventTypeData.matchTypes}
//       fantasyMatchesData={fantasyMatchesData}
//       loading={isLoading}
//       intro={intro}
//       fiat_demo={fiat_demo}
//       user={user}
//       isMobile={isMobile}
//       leftSideLoading={isLoading}
//     />
//   </div>
// ) : (
//   <div className="decks-container">
//     <DesktopDeck
//       fantasyMatchCount={fantasyMatchCount.matchCount}
//       fantasyMatchNumbers={fantasyEventTypeData.matchNumbers}
//       fantasyMatchTypes={fantasyEventTypeData.matchTypes}
//       fantasyMatchesData={fantasyMatchesData}
//       loading={isLoading}
//       intro={intro}
//       fiat_demo={fiat_demo}
//       user={user}
//       isMobile={isMobile}
//       leftSideLoading={isLoading}
//     />
//   </div>
// )}
