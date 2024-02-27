import { useEffect, useState } from "react";
import faunadb from "faunadb";
import React from "react";
import MyFocus from "./MyFocus";
import FullLeaderBoard from "./FullLeaderBoard";

const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function Leaderboard(props) {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [matchesData, setMatchesData] = useState({});
  const [myFocusState, setMyFocusState] = useState(true);

  const toggleMyFocusState = () => {
    setMyFocusState(!myFocusState);
  };

  useEffect(() => {
    const currentDate = new Date();
    // console.log("currentDate");
    // console.log(currentDate);
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);

    // console.log("yearStart");
    // console.log(yearStart);

    const daysPassed = Math.floor(
      (currentDate - yearStart) / (24 * 60 * 60 * 1000)
    );

    // console.log("daysPassed");
    // console.log(daysPassed);

    // const weekNumber = Math.ceil((daysPassed + 1) / 7); // Adding 1 to account for the first week
    const weekNumber = Math.ceil(daysPassed / 7); // Adding 1 to account for the first week

    // console.log("weekNumber");
    // console.log(weekNumber);

    setCurrentWeek(weekNumber);
    const year = currentDate.getFullYear();
    setCurrentYear(year);
  }, []);

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

  useEffect(() => {
    // let fauna_data;
    async function updateUI() {
      let fauna_data = await getMatchesData(currentWeek, currentYear);
      let playerScores = {}; // Initialize playerScores here

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
        setMatchesData(sortedPlayerScores);
      } catch (err) {
        console.log(err);
      }
    }
    updateUI();
  }, [currentWeek]);

  // console.log(matchesData);
  // console.log(currentWeek);
  // console.log(currentYear);

  return (
    <>
      <div className="container px-0">
        {myFocusState ? (
          <MyFocus
            matchesData={matchesData}
            toggleMyFocusState={toggleMyFocusState}
            user={props.user}
            isMobile={props.isMobile}
          />
        ) : (
          <FullLeaderBoard
            matchesData={matchesData}
            toggleMyFocusState={toggleMyFocusState}
            user={props.user}
            currentWeek={currentWeek}
            currentYear={currentYear}
            isMobile={props.isMobile}
          />
        )}
      </div>
    </>
  );
}
