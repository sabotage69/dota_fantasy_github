import betonomicsEventContractAddresses from "../../constants/betonomicsEventContractAddresses.json";

import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import React from "react";
import abiBetonomicsEvent from "../../constants/abiBetonomicsEvent.json";
import faunadb from "faunadb";
import FantasyCard from "./FantasyCard";
import FantasyPagesContainer from "./FantasyPagesContainer";
import BetonomicsCard from "./BetonomicsCard";
import BetonomicsPagesContainer from "./BetonomicsPagesContainer";
import { InfinitySpin } from "react-loader-spinner";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function BetonomicsContainer(props) {
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

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

  const [blockedBets, setBlockedBets] = React.useState([]);

  async function automaticBlockedMatchesUpdater() {
    var totalUserMatchesAcrossAllChains = [];
    for (
      let i = 0;
      i < Object.keys(betonomicsEventContractAddresses).length;
      i++
    ) {
      var loopingChainId = parseInt(
        Object.keys(betonomicsEventContractAddresses)[i]
      );
      try {
        var loopingContractAddress =
          betonomicsEventContractAddresses[loopingChainId][0];

        var loopingProvider = new ethers.providers.JsonRpcProvider(
          betonomicsEventContractAddresses[loopingChainId][1],
          loopingChainId
        );
        var loopingSigner = new ethers.Wallet(
          NEXT_PUBLIC_SIGNER_PK,
          loopingProvider
        );
        const administrativeMatchFantasyContract = new ethers.Contract(
          loopingContractAddress,
          abiBetonomicsEvent,
          loopingSigner
        );

        var loopingChainTotalMessage =
          await administrativeMatchFantasyContract.userMatchesLookUp(
            address.toLowerCase()
          );

        for (let k = 0; k < loopingChainTotalMessage.length; k++) {
          totalUserMatchesAcrossAllChains.push(
            parseInt(loopingChainTotalMessage[k]["matchId"])
          );
        }
      } catch (err) {
        //console.log(err);
        console.log(
          `some error, prolly contract doesnt exist on network ${loopingChainId}`
        );
      }
    }

    setBlockedBets(totalUserMatchesAcrossAllChains);
  }

  useEffect(() => {
    if (props.intro === "true") {
    } else {
      automaticBlockedMatchesUpdater();
    }
    async function updateUI() {}
    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var cards = [];

  // //console.log(props.chosenMatchTypes);

  if (
    props.matchesData &&
    props.matchesData.data &&
    props.matchesData.data.length
  ) {
    for (let i = 0; i < props.matchesData.data.length; i++) {
      // if (props.chosenMatchTypes.includes(i)) {
      if (blockedBets.includes(props.matchesData.data[i][0])) {
      } else {
        cards.push(
          <BetonomicsCard
            key={props.matchesData.data[i][0]}
            id={props.matchesData.data[i][0]}
            owner={props.owner}
            blocked={blockedBets}
            matchType={props.matchTypes[i]}
            matchesData={props.matchesData}
            intro={props.intro}
          />
        );
      }
      // } else {
      // }
    }
  }

  // console.log(props.chosenMatchTypes);
  let array_of_chosen_sport_types = props.chosenMatchTypes.map(
    (option) => option.value
  );
  // console.log(cards[0]["props"]["matchesData"]["data"][0][0]); ///key
  // console.log(cards[0]["props"]["matchesData"]["data"][0][4]); ///date
  // console.log(cards[0]["props"]["matchesData"]["data"][0][7]); ///type
  // console.log(cards[0]["key"]);
  // console.log(parseInt(props.matchCount));
  // console.log(blockedBets);
  // console.log(props.chosenMatchTypes);
  // console.log(props.matchesData);

  let only_latest_cards = [];
  let only_latest_ids = [];
  let only_latest_ids_n_dates = [];

  let cards_ordered = [];
  let filtered_cards = [];

  // console.log(cards.length);

  if (
    props.matchesData &&
    props.matchesData.data &&
    props.matchesData.data.length
  ) {
    function getTimestampInSeconds() {
      return Math.floor(Date.now() / 1000);
    }

    const unix_now = getTimestampInSeconds();

    for (let i = 0; i < props.matchesData.data.length; i++) {
      if (array_of_chosen_sport_types.includes(props.matchesData.data[i][8])) {
        only_latest_ids.push(props.matchesData.data[i][0]);
        only_latest_ids_n_dates.push({
          key: props.matchesData.data[i][0],
          date: parseInt(props.matchesData.data[i][5]),
        });
      }
    }

    only_latest_ids_n_dates.sort(function (a, b) {
      return a.date - b.date;
    });

    let event_ids_in_desired_order = only_latest_ids_n_dates.map(
      (obj) => obj.key
    );

    for (let i = 0; i < cards.length; i++) {
      let current_card_key = cards[i]["key"];
      if (only_latest_ids.includes(parseInt(cards[i]["key"]))) {
        only_latest_cards.push(cards[i]);
      }
    }

    cards_ordered = event_ids_in_desired_order.map((k) =>
      only_latest_cards.find((c) => c.key == k)
    );
    // console.log(parseInt(cards_ordered["key"]))
    // console.log(cards_ordered[0]["props"]["matchesData"])
    // console.log(cards_ordered);

    const filteredArray = (arr) => {
      if (arr.length > 0) {
        return arr.filter((obj) => obj !== undefined);
      } else {
        return [];
      }
    };

    let no_undefined_cards_order = filteredArray(cards_ordered);

    let keys_to_pop = [];
    if (
      no_undefined_cards_order.length > 0 &&
      no_undefined_cards_order[0] != undefined
    ) {
      // console.log(no_undefined_cards_order.length);

      for (
        let i = 0;
        i < no_undefined_cards_order[0]["props"]["matchesData"]["data"].length;
        i++
      ) {
        let match_id =
          no_undefined_cards_order[0]["props"]["matchesData"]["data"][i][0];
        let match_date = parseInt(
          no_undefined_cards_order[0]["props"]["matchesData"]["data"][i][5]
        );
        if (match_date < unix_now) {
          keys_to_pop.push(match_id);
        }
      }
      //console.log(keys_to_pop);
      // console.log(cards_ordered);
      filtered_cards = no_undefined_cards_order.filter((card) => {
        if (typeof card === "object" && card.hasOwnProperty("key")) {
          return !keys_to_pop.includes(parseInt(card.key));
        }
      });
    }

    //console.log(filtered_cards);
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  useEffect(() => {
    setData(filtered_cards);
    setLoading(false);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filtered_cards.length / recordsPerPage);

  // console.log(filtered_cards);
  // console.log(filtered_cards.length);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // console.log(filtered_cards.length);
  // console.log(props.matchesData);
  return (
    <>
      <div className="betonomics-container">
        {props.loading == true ? (
          <div className="loader-betting-cards">
            <InfinitySpin
              height="270"
              width="270"
              radius="30"
              color="#E05353"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : cards.length > 0 ? (
          <>
            <BetonomicsPagesContainer
              matchesData={filtered_cards}
              nPages={nPages}
              currentPage={currentPage}
              recordsPerPage={recordsPerPage}
            />
            <div className="matches-pagination-container">
              <div className="prev-page" onClick={prevPage}>
                &lt; previous
              </div>
              {currentPage === 1 ? null : <div className="first-page">1</div>}
              {nPages >= 3 && currentPage === nPages - 1 ? (
                <div className="second-last-page">...</div>
              ) : null}
              {nPages >= 3 && currentPage > 2 ? (
                currentPage === nPages - 1 || currentPage === nPages ? null : (
                  <div>...</div>
                )
              ) : null}
              <div className="current-page"> {currentPage}</div>
              {nPages >= 3 && currentPage < nPages - 1 ? (
                currentPage === 2 ? (
                  <div className="second-page">...</div>
                ) : (
                  <div>...</div>
                )
              ) : null}

              {currentPage === nPages || nPages === 0 ? null : (
                <div className="last-page">{nPages}</div>
              )}
              <div className="next-page" onClick={nextPage}>
                next &gt;
              </div>
            </div>
          </>
        ) : (
          <div className="betting-deck-info-message">
            <div>Please wait for new matches to be created,</div>
            <div>
              create them yourself by going to{" "}
              <span className="red-text">Your Events</span> tab
            </div>
            <div>or use filter at the top and include more sport types</div>
          </div>
        )}
      </div>
    </>
  );
}
