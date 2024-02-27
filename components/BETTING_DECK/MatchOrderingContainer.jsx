import contractAddresses from "../../constants/contractAddresses.json";

import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import React from "react";
import abiSidechainBetting from "../../constants/abiSidechainBetting.json";
import faunadb from "faunadb";
import MatchesPagesContainer from "./MatchesPagesContainer";
import { InfinitySpin } from "react-loader-spinner";
import { FakeBetContext } from "../FakeBetContext";

import MatchCard from "./MatchCard";
const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function MatchOrderingContainer(props) {
  const chainId = parseInt(chainIdHex);
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  var cards = [];

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {});
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const [blockedBets, setBlockedBets] = React.useState([]);

  async function automaticBlockedMatchesUpdater() {
    //console.log("updating blocked bets");
    var totalUserMatchesAcrossAllChains = [];
    for (let i = 0; i < Object.keys(contractAddresses).length; i++) {
      var loopingChainId = parseInt(Object.keys(contractAddresses)[i]);
      try {
        var loopingContractAddress = contractAddresses[loopingChainId][0];
        var loopingProvider = new ethers.providers.JsonRpcProvider(
          contractAddresses[loopingChainId][1],
          loopingChainId
        );
        var loopingSigner = new ethers.Wallet(
          NEXT_PUBLIC_SIGNER_PK,
          loopingProvider
        );
        var loopingSidechainContract = new ethers.Contract(
          loopingContractAddress,
          abiSidechainBetting,
          loopingSigner
        );
        var loopingChainTotalMessage = await loopingSidechainContract.userMatchesLookUp(
          account.toLowerCase()
        );
        for (let k = 0; k < loopingChainTotalMessage.length; k++) {
          totalUserMatchesAcrossAllChains.push(
            parseInt(loopingChainTotalMessage[k]["matchId"])
          );
        }
      } catch (err) {
        console.log(
          `some error, prolly contract doesnt exist on network ${loopingChainId}`
        );
      }
    }

    setBlockedBets(totalUserMatchesAcrossAllChains);
  }

  useEffect(() => {
    automaticBlockedMatchesUpdater();
    async function updateUI() {}
    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function duplicateIndexes(arr, el) {
    let duplicate = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == el) {
        duplicate.push(i);
      }
    }
    return duplicate;
  }

  if (
    props.matchesData &&
    props.matchesData.data &&
    props.matchesData.data.length
  ) {
    for (let i = 0; i < props.matchesData.data.length; i++) {
      // if (props.chosenMatchTypes.includes(i)) {
      //checking for sport filter
      if (blockedBets.includes(i)) {
        //checking whether a bet has been made to not include this match
      } else {
        cards.push(
          <MatchCard
            key={props.matchesData.data[i][0]}
            id={props.matchesData.data[i][0]}
            owner={props.owner}
            blocked={blockedBets}
            matchType={props.matchTypes[i]}
            matchesData={props.matchesData}
          />
        );
      }
      // } else {
      // }
    }
  }

  // console.log(cards);

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
      if (array_of_chosen_sport_types.includes(props.matchesData.data[i][7])) {
        only_latest_ids.push(props.matchesData.data[i][0]);
        only_latest_ids_n_dates.push({
          key: props.matchesData.data[i][0],
          date: parseInt(props.matchesData.data[i][4]),
        });
      }
    }

    only_latest_ids_n_dates.sort(function(a, b) {
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

    // console.log(no_undefined_cards_order);
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
          no_undefined_cards_order[0]["props"]["matchesData"]["data"][i][4]
        );
        if (match_date < unix_now) {
          // console.log(
          //   "match date " + match_date + " is less than " + unix_now + " (now) "
          // );
          // console.log("pushiong to pop matchid " + match_id + "");
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

    // console.log(filtered_cards);
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

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

  // console.log(filtered_cards);

  return (
    <>
      <div className="betting-cards-container">
        {/* {cards.length > 1 ? (
          cards_ordered
        ) : (
          <div className="betting-deck-info-message">
            <div>Please wait for new matches to load</div>
            <div>or use filter at the top and include</div>
            <div>more sport types</div>
          </div>
        )} */}
        {props.loading == true ? null : cards.length > 1 ? (
          <>
            <FakeBetContext.Consumer>
              {({ onDataUpdate }) => (
                <>
                  <MatchesPagesContainer
                    matchesData={filtered_cards}
                    nPages={nPages}
                    currentPage={currentPage}
                    recordsPerPage={recordsPerPage}
                  />
                </>
              )}
            </FakeBetContext.Consumer>
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
            <div>Please wait for new matches to load</div>
            <div>or use filter at the top and include</div>
            <div>more sport types</div>
          </div>
        )}
      </div>
    </>
  );
}
