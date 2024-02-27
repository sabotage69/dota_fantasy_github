import { useEffect, useState } from "react";

import React from "react";
import faunadb from "faunadb";
import FantasyCard from "./FantasyCard";
import FantasyPagesContainer from "./FantasyPagesContainer";
import { InfinitySpin } from "react-loader-spinner";
import Spinner from "react-bootstrap/Spinner";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function MatchFantasyContainer({
  matchTypes,
  matchCount,
  owner,
  matchesData,
  chosenMatchTypes,
  intro,
  fiat_demo,
  user,
  updateDataAfterBet,
  isMobile,
  loading,
}) {
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

  useEffect(() => {
    // automaticBlockedMatchesUpdater();
    async function updateUI() {}
    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var cards = [];

  //console.log(chosenMatchTypes);

  // console.log(matchesData);

  if (matchesData && matchesData.data && matchesData.data.length) {
    for (let i = 0; i < matchesData.data.length; i++) {
      // if (chosenMatchTypes.includes(i)) {
      if (blockedBets.includes(matchesData.data[i][0])) {
      } else {
        cards.push(
          <FantasyCard
            key={matchesData.data[i][0]}
            id={matchesData.data[i][0]}
            blocked={blockedBets}
            matchType={matchTypes[i]}
            matchesData={matchesData}
            user={user}
            updateDataAfterBet={updateDataAfterBet}
            isMobile={isMobile}
          />
        );
      }
      // } else {
      // }
    }
  }

  let array_of_chosen_sport_types = chosenMatchTypes.map(
    (option) => option.value
  );
  let only_latest_cards = [];
  let only_latest_ids = [];
  let only_latest_ids_n_dates = [];

  let cards_ordered = [];
  let filtered_cards = [];

  if (matchesData && matchesData.data && matchesData.data.length) {
    function getTimestampInSeconds() {
      return Math.floor(Date.now() / 1000);
    }

    const unix_now = getTimestampInSeconds();

    for (let i = 0; i < matchesData.data.length; i++) {
      if (array_of_chosen_sport_types.includes(matchesData.data[i][8])) {
        only_latest_ids.push(matchesData.data[i][0]);
        only_latest_ids_n_dates.push({
          key: matchesData.data[i][0],
          date: parseInt(matchesData.data[i][4]),
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

    let keys_to_pop = [];
    if (cards_ordered.length > 0 && cards_ordered[0] != undefined) {
      for (
        let i = 0;
        i < cards_ordered[0]["props"]["matchesData"]["data"].length;
        i++
      ) {
        let t1_data_full = true;
        let t2_data_full = true;
        let match_id = cards_ordered[0]["props"]["matchesData"]["data"][i][0];
        let team1_data = cards_ordered[0]["props"]["matchesData"]["data"][i][1];
        let sliced_team1_data = team1_data.split("___");
        let team2_data = cards_ordered[0]["props"]["matchesData"]["data"][i][3];
        let sliced_team2_data = team2_data.split("___");

        if (sliced_team1_data.includes("undefined")) {
          t1_data_full = false;
        }

        if (sliced_team2_data.includes("undefined")) {
          t2_data_full = false;
        }
        let match_date = parseInt(
          cards_ordered[0]["props"]["matchesData"]["data"][i][5]
        );
        if (match_date < unix_now) {
          keys_to_pop.push(match_id);
        }
        if (t1_data_full == false || t2_data_full == false) {
          keys_to_pop.push(match_id);
        }
      }

      // console.log(cards_ordered);
      filtered_cards = cards_ordered.filter((card) => {
        if (typeof card === "object" && card.hasOwnProperty("key")) {
          // console.log(card.key);
          return !keys_to_pop.includes(parseInt(card.key));
        }
      });
      //console.log(filtered_cards);
    }
  }

  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  useEffect(() => {
    setData(filtered_cards);
    // setLoading(false);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filtered_cards.length / recordsPerPage);

  // console.log(cards_ordered.length);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // console.log(filtered_cards.length);
  // console.log(filtered_cards);

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="container px-0">
          {filtered_cards.length > 0 ? (
            <>
              <FantasyPagesContainer
                matchesData={filtered_cards}
                nPages={nPages}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
              />
              {nPages > 1 ? (
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mt-3 ">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <span className="page-link" onClick={prevPage}>
                        &lt;
                      </span>
                    </li>
                    {currentPage > 2 && (
                      <li className="page-item">
                        <span className="page-link">1</span>
                      </li>
                    )}
                    {currentPage > 3 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    {currentPage > 1 && (
                      <li className="page-item">
                        <span className="page-link">{currentPage - 1}</span>
                      </li>
                    )}
                    <li className="page-item active">
                      <span className="page-link">{currentPage}</span>
                    </li>
                    {currentPage < nPages && (
                      <li className="page-item">
                        <span className="page-link">{currentPage + 1}</span>
                      </li>
                    )}
                    {currentPage < nPages - 2 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    {currentPage < nPages - 1 && (
                      <li className="page-item">
                        <span className="page-link">{nPages}</span>
                      </li>
                    )}
                    <li
                      className={`page-item ${
                        currentPage === nPages ? "disabled" : ""
                      }`}
                    >
                      <span className="page-link" onClick={nextPage}>
                        &gt;
                      </span>
                    </li>
                  </ul>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="container">
              <div className="col mt-5 text-center text-white">
                There are no matches availble currently
              </div>
              <div className="col mt-5 text-center text-white">
                Please check later
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
