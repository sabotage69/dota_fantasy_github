import React from "react";
import YourBetCard from "./YourBetCard";
import { useEffect, useState } from "react";
import BetsPagesContainer from "./BetsPagesContainer";
import { InfinitySpin } from "react-loader-spinner";
import { FakeBetContext } from "../../FakeBetContext";
import faunadb from "faunadb";
import Spinner from "react-bootstrap/Spinner";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function YourBetsContainer(props) {
  const [betsStateData, setBetsStateData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  useEffect(() => {
    async function updateUI() {
      try {
        if (props.user) {
          let fantasy_bets_data;

          await client
            .query(
              q.Paginate(
                q.Match(q.Index("bets_by_userid"), props.user.userName)
              )
            )
            .then((ret) => {
              // console.log(ret);
              fantasy_bets_data = ret.data;
            })
            .catch((err) =>
              console.error(
                "Error: [%s] %s: %s",
                err.name,
                err.message,
                err.errors()[0].description
              )
            );

          // console.log("setting bets state data");
          setBetsStateData(fantasy_bets_data);
          // console.log(betsStateData);
        } else {
          // Handle the case where props.user is null
          console.log("props.user is null");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    updateUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  var cards = [];

  var fantasy_cards = [];

  // console.log("bets state data");
  // console.log(betsStateData);

  // console.log(props.fakeData);

  try {
    if (betsStateData) {
      for (let i = 0; i < betsStateData.length; i++) {
        if (betsStateData[i][3] !== "") {
          cards.push(
            <YourBetCard
              key={i}
              id={i}
              data={betsStateData[i]}
              type="fantasy"
              status="confirmed"
              isMobile={props.isMobile}
            />
          );
          fantasy_cards.push(
            <YourBetCard
              key={i}
              id={i}
              data={betsStateData[i]}
              type="fantasy"
              status="confirmed"
              isMobile={props.isMobile}
            />
          );
        }
      }
    } else {
      // Handle the case where betsStateData is null
      // You can choose to show a message or take any other appropriate action
      // console.log("Bets state data is null.");
    }
  } catch (error) {
    // Handle any other errors that might occur during processing
    console.error("Error:", error);
  }
  let fake_cards = [];

  // console.log(props.fakeData);

  try {
    for (let i = 0; i < 1; i++) {
      if (props.fakeData[0] == "parimutuel") {
        cards.push(
          <YourBetCard
            key={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            id={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="parimutuel-fake"
            status={props.fakeData[10]}
          />
        );
        fake_cards.push(
          <YourBetCard
            key={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            id={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="parimutuel-fake"
            status={props.fakeData[10]}
          />
        );
      } else if (props.fakeData[0] == "fantasy") {
        cards.push(
          <YourBetCard
            key={betsStateData.length + i}
            id={betsStateData.length + i}
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="fantasy-fake"
            status={props.fakeData[10]}
          />
        );
        fake_cards.push(
          <YourBetCard
            key={betsStateData.length + i}
            id={betsStateData.length + i}
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="fantasy-fake"
            status={props.fakeData[10]}
          />
        );
      } else if (props.fakeData[0] == "uge") {
        cards.push(
          <YourBetCard
            key={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            id={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="uge-fake"
            status={props.fakeData[10]}
          />
        );
        fake_cards.push(
          <YourBetCard
            key={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            id={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="uge-fake"
            status={props.fakeData[10]}
          />
        );
      } else if (props.fakeData[0] == "arbiter") {
        cards.push(
          <YourBetCard
            key={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            id={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="arbiter-fake"
            status={props.fakeData[10]}
          />
        );
        fake_cards.push(
          <YourBetCard
            key={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            id={
              props.data.length +
              props.fantasyData.length +
              props.ugeData.length +
              (props.arbiterData[0]?.[0]?.length || 0) +
              i
            }
            data={props.fakeData}
            ethPrice={props.ethPrice}
            owner={props.owner}
            type="arbiter-fake"
            status={props.fakeData[10]}
          />
        );
      }
    }
  } catch (error) {
    // Handle any other errors that might occur during processing
    console.error("Error:", error);
  }

  // console.log(cards);
  // console.log(fake_cards);

  //find a card with an match id that matches the match id of the fake card and print its index
  //then create a new array of cards removing the card with the index found above

  let only_latest_ids_n_dates = [];
  let cards_ordered = [];

  try {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i]["props"]["type"] == "arbiter") {
        only_latest_ids_n_dates.push({
          key: i,
          date: parseInt(cards[i]["props"]["data"][2]),
        });
      } else {
        only_latest_ids_n_dates.push({
          key: i,
          date: parseInt(cards[i]["props"]["data"]["timeStamp"]),
        });
      }
    }

    only_latest_ids_n_dates.sort(function(a, b) {
      return a.date - b.date;
    });

    let event_ids_in_desired_order = only_latest_ids_n_dates.map(
      (obj) => obj.key
    );

    cards_ordered = event_ids_in_desired_order.map((k) =>
      cards.find((c) => c.key == k)
    );
    cards_ordered.reverse();
  } catch (err) {
    console.log("pass");
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);

  useEffect(() => {
    setData(cards_ordered);
    setLoading(false);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(cards_ordered.length / recordsPerPage);

  // console.log(cards_ordered);

  try {
    for (let i = 0; i < cards_ordered.length; i++) {
      if (
        cards_ordered[i]["props"]["data"][2] ===
        fake_cards[0]["props"]["data"][1]
      ) {
        cards_ordered.splice(i, 1);
        // i--; // Decrement i to account for removed element
      }
    }
  } catch (error) {
    // Handle the case where fake_cards is empty or null
    // console.error("An error occurred:", error);
  }

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // console.log("hi");
  // console.log(fake_cards);
  // console.log(cards_ordered);
  // console.log(
  //   props.data.length +
  //     props.fantasyData.length +
  //     props.ugeData.length +
  //     props.arbiterData.length
  // );
  // console.log(props.data.length);
  // console.log(props.fantasyData.length);
  // console.log(props.ugeData.length);
  // console.log(props.arbiterData.length);

  // console.log(props.isMobile);

  // console.log(props.loading);

  return (
    <>
      <div className="container px-0">
        {cards_ordered.length == 0 ? (
          isLoading == true ? (
            <div className="text-center mt-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="container">
              <div className="col text-white text-center mt-5">
                ⬇️ Your bets will appear here ⬇️
              </div>
            </div>
          )
        ) : (
          <>
            <BetsPagesContainer
              matchesData={cards_ordered}
              nPages={nPages}
              currentPage={currentPage}
              recordsPerPage={recordsPerPage}
              isMobile={props.isMobile}

              // setCurrentPage={setCurrentPage}
            />

            {nPages > 1 ? (
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center mt-3">
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
        )}
      </div>
    </>
  );
}
