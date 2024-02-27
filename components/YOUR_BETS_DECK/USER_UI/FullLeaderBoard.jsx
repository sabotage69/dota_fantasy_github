import React from "react";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import FullLeaderBoardPosition from "./FullLeaderBoardPosition";
import FullLeaderBoardPagesContainer from "./FullLeaderBoardPagesContainer";
import faunadb from "faunadb";
import { Pagination } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function FullLeaderBoard({
  currentWeek,
  matchesData,
  toggleMyFocusState,
  user,
  currentYear,
  isMobile,
}) {
  // console.log(matchesData);

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const [chosenWeek, setChosenWeek] = useState(currentWeek);
  const [chosenYear, setChosenYear] = useState(currentYear);
  const [chosenMatchesData, setChosenMatchesData] = useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  async function getMatchesData(_week, _year) {
    let _data;

    try {
      await client
        .query(
          q.Paginate(
            q.Match(q.Index("get_resolved_bets_by_week_and_year"), [
              _week,
              _year,
            ])
          )
        )
        .then((ret) => {
          //   console.log(ret);
          _data = ret.data;
        })
        .catch((err) =>
          console.error(
            "Error: [%s] %s: %s",
            err.name,
            err.message
            // err.errors()[0].description
          )
        );
      // console.log("trying to access fauna");

      // console.log("matches exist");
      // console.log(_data);

      return _data;
    } catch (err) {
      console.log("cant access matches");
      console.error("Error:", err);
    }
  }

  // console.log("existing matches data");
  // console.log(matchesData);

  useEffect(() => {
    if (chosenWeek !== currentWeek) {
      async function updateUI() {
        // console.log(
        //   "using this week and year: " + chosenWeek + " " + chosenYear
        // );
        let fauna_data = await getMatchesData(chosenWeek, chosenYear);
        let playerScores = {}; // Initialize playerScores here

        // console.log("fauna_data");
        // console.log(fauna_data);
        try {
          fauna_data.forEach((subarray) => {
            const [
              matchId,
              week,
              year,
              userNamesStr,
              chosenDataStr,
              scoresStr,
            ] = subarray;
            const userNames = userNamesStr.split("___");
            const scores = scoresStr.split("___").map(parseFloat);

            userNames.forEach((userName, index) => {
              playerScores[userName] =
                (playerScores[userName] || 0) + scores[index];
            });
          });

          const sortedPlayerScores = Object.entries(playerScores)
            .sort((a, b) => b[1] - a[1])
            .reduce((sortedObj, [key, value]) => {
              sortedObj[key] = value;
              return sortedObj;
            }, {});
          // console.log(sortedPlayerScores);
          setChosenMatchesData(sortedPlayerScores);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
      updateUI();
    }
  }, [chosenWeek]);

  var cards = [];

  // console.log(matchesData);
  // console.log(chosenMatchesData);

  //if chosenMatchesData  is not empty then set matchesData to chosenMatchesData
  if (currentWeek !== chosenWeek) {
    matchesData = chosenMatchesData;
  }

  // console.log(matchesData);

  let dataArray = Object.entries(matchesData);
  dataArray = dataArray.filter(([name, score]) => name && !isNaN(score));

  // console.log(dataArray);

  // Sort the array based on scores in descending order
  dataArray.sort((a, b) => b[1] - a[1]);

  // Loop through the sorted array and create FullLeaderBoardPosition components
  dataArray.forEach(([name, score], index) => {
    cards.push(
      <FullLeaderBoardPosition
        key={index}
        positionData={{ name, score, position: index + 1 }}
        user={user}
        isMobile={isMobile}
      />
    );
  });

  //push cards into cards array

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    setData(cards);
    setLoading(false);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(cards.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // console.log(chosenMatchesData);

  const handlePreviousClick = () => {
    setIsLoading(true); // Set loading state to true
    setChosenWeek(chosenWeek - 1);
    // Perform any other actions related to previous button click
  };

  const handleNextClick = () => {
    setIsLoading(true); // Set loading state to true
    setChosenWeek(chosenWeek + 1);
    // Perform any other actions related to next button click
  };
  return (
    <>
      <div className="container">
        <nav aria-label="...">
          <ul className="pagination justify-content-center mt-5">
            <li className="page-item" onClick={handlePreviousClick}>
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&lt;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Week {chosenWeek}
              </a>
            </li>
            <li className="page-item" onClick={handleNextClick}>
              <a className="page-link" href="#">
                <span aria-hidden="true">&gt;</span>
              </a>
            </li>
          </ul>
        </nav>
        {isLoading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <FullLeaderBoardPagesContainer
            matchesData={cards}
            nPages={nPages}
            currentPage={currentPage}
            recordsPerPage={recordsPerPage}
            isMobile={isMobile}
          />
        )}
        {nPages > 1 ? (
          <Pagination
            className="justify-content-center mt-3"
            bg="dark"
            data-bs-theme="dark"
          >
            <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
            {currentPage > 3 && <Pagination.Ellipsis />}
            {currentPage > 2 && (
              <Pagination.Item onClick={() => prevPage(1)}>{1}</Pagination.Item>
            )}
            {currentPage > 1 && (
              <Pagination.Item onClick={() => prevPage(currentPage - 1)}>
                {currentPage - 1}
              </Pagination.Item>
            )}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < nPages && (
              <Pagination.Item onClick={() => nextPage(currentPage + 1)}>
                {currentPage + 1}
              </Pagination.Item>
            )}
            {currentPage < nPages - 1 && (
              <Pagination.Item onClick={() => nextPage(nPages)}>
                {nPages}
              </Pagination.Item>
            )}
            {currentPage < nPages - 2 && <Pagination.Ellipsis />}
            <Pagination.Next
              onClick={nextPage}
              disabled={currentPage === nPages}
            />
          </Pagination>
        ) : null}

        <div className="to-myfocus-button" onClick={toggleMyFocusState}>
          &lt;- To my focus{" "}
        </div>
      </div>
    </>
  );
}
