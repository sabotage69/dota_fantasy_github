import React from "react";
import "reactjs-popup/dist/index.css";
import { useEffect, useState, useRef } from "react";
import FantasyModal from "./modal/FantasyModal";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { FakeBetContext } from "../FakeBetContext";
import { useContext } from "react";
import faunadb from "faunadb";
import dotaHeroes from "../../constants/dotaHeroes.json";
import Instructions from "./modal/Instructions";
import AutocompleteField from "../GENERAL/AutocompleteField";
import PredictionConfirmation from "./modal/PredictionConfirmation";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function FantasyMakeABet({
  current_match_payload,
  hometeam_payload,
  awayteam_payload,
  user,
  updateDataAfterBet,
  isMobile,
}) {
  const q = faunadb.query;

  const [currentIsMobile, setCurrentIsMobile] = useState(null);

  useEffect(() => {
    // Check if we are on the client-side (browser) before accessing the window object
    if (typeof window !== "undefined") {
      setCurrentIsMobile(window.innerHeight > window.innerWidth);
    }
  }, []); // Empty dependency array ensures the code runs once after component mount

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const [show, setShow] = useState(false);

  // console.log(show);

  const [formData, setFormData] = React.useState({
    userTeamChosen: "",
    mvp1: "",
    mvp2: "",
    picks: [],
    eventNumber: 0,
    value: 5,
    ethValue: 0,
    chosenTeamAndPicks: "",
    chosenMvps: "",
    participatingTeams: [],
  });

  function joinWithTripleUnderscore(arr) {
    try {
      if (!Array.isArray(arr)) {
        throw new Error("Input is not an array");
      }

      return arr.join("___");
    } catch (error) {
      console.error("Error:", error.message);
      return ""; // Return an empty string or handle the error as needed
    }
  }

  function fantasyDataFinalizer() {
    // console.log("excuted data finalizer");
    let finalized_mvps = [];

    finalized_mvps.push(formData.mvp1);
    // finalized_mvps.push(formData.mvp2);

    let stringified_finalized_mvps = joinWithTripleUnderscore(finalized_mvps);

    let finalized_chosendTeamAndPicks = [];
    finalized_chosendTeamAndPicks.push(formData.userTeamChosen);
    for (let i = 0; i < picksData.length; i++) {
      finalized_chosendTeamAndPicks.push(picksData[i]);
    }

    let stringified_finalized_chosendTeamAndPicks = joinWithTripleUnderscore(
      finalized_chosendTeamAndPicks
    );

    let participatingTeams = [];

    try {
      participatingTeams = [hometeam_payload[0], awayteam_payload[0]];
    } catch (err) {
      console.log("error in participating teams");
    }

    // console.log("participating teams");
    // console.log(participatingTeams);
    let stringified_participating_teams = joinWithTripleUnderscore(
      participatingTeams
    );

    setFormData(() => {
      return {
        chosenMvps: stringified_finalized_mvps,
        chosenTeamAndPicks: stringified_finalized_chosendTeamAndPicks,
        participatingTeams: stringified_participating_teams,
      };
    });
    // console.log(finalized_mvps);
    // console.log(finalized_chosendTeamAndPicks);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    //console.log(formData);
  }

  function getCurrentTimestamp() {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    return currentTimestamp;
  }

  async function fantasy_bet_creator(
    _betId,
    _userId,
    _matchId,
    _chosenTeamAndPicks,
    _chosenMvps,
    _participatingTeams,
    _timestamp
  ) {
    (async () => {
      await client
        .query(
          q.Let(
            {
              match: q.Match(q.Index("fantasy_bet_by_betId"), _betId),
              data: {
                chosenTeamAndPicks: _chosenTeamAndPicks,
                chosenMvps: _chosenMvps,
                participatingTeams: _participatingTeams,
              },
            },
            q.If(
              q.Exists(q.Var("match")),
              q.Update(
                q.Select(
                  ["ref"],
                  q.Get(q.Match(q.Index("fantasy_bet_by_betId"), _betId))
                ),
                {
                  data: {
                    chosenTeamAndPicks: _chosenTeamAndPicks,
                    chosenMvps: _chosenMvps,
                    participatingTeams: _participatingTeams,
                  },
                }
              ),
              q.Create(q.Collection("fantasy_bets"), {
                data: {
                  betId: _betId,
                  userId: _userId,
                  matchId: _matchId,
                  chosenTeamAndPicks: _chosenTeamAndPicks,
                  chosenMvps: _chosenMvps,
                  participatingTeams: _participatingTeams,
                  timestamp: _timestamp,
                },
              })
            )
          )
        )
        // .then((ret) => console.log(ret))
        .catch((err) =>
          console.error(
            "Error: [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description
          )
        );
    })();
  }

  async function matchCacheBetSaver(_matchId, _dataString) {
    (async () => {
      await client
        .query(
          q.Update(
            q.Select(
              ["ref"],
              q.Get(q.Match(q.Index("cached_fantasy_matches_by_id"), _matchId))
            ),
            {
              data: {
                bets: _dataString,
              },
            }
          )
        )
        // .then((ret) => console.log(ret))
        .catch((err) =>
          console.error(
            "Error: [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description
          )
        );
    })();
  }

  async function betUserProfileSaver(_userName, _userBets) {
    (async () => {
      await client
        .query(
          q.Update(
            q.Select(
              ["ref"],
              q.Get(q.Match(q.Index("user_by_name"), _userName))
            ),
            {
              data: {
                userBets: _userBets,
              },
            }
          )
        )
        // .then((ret) => console.log(ret))
        .catch((err) =>
          console.error(
            "Error: [%s] %s: %s",
            err.name,
            err.message,
            err.errors()[0].description
          )
        );
    })();
  }

  async function updateMatchBetCache(matchId, dataString, valueString) {
    const entries = dataString.split("___");
    const exists = entries.some((entry) => entry === valueString);

    if (!exists) {
      // console.log("bet doesnt exist in cache");
      const updatedDataString = exists
        ? dataString
        : `${dataString ? dataString + "___" : ""}${valueString}`;

      // console.log("updating db");
      await matchCacheBetSaver(matchId, updatedDataString);

      // console.log("db updated");
      // console.log(matchId, updatedDataString, valueString);
    }

    // console.log("bet exists in cache, passing");
  }

  async function updateUserProfileBets(_userId, _userBets, _betId) {
    try {
      const entries = (_userBets || "").split("___");
      const exists = entries.some((entry) => entry === _betId);

      if (!exists) {
        // console.log("bet doesnt exist in user profile");
        const updatedDataString = exists
          ? _userBets
          : `${_userBets ? _userBets + "___" : ""}${_betId}`;

        // console.log("updating user profile in db");
        await betUserProfileSaver(_userId, updatedDataString);

        // console.log("db updated");
      }

      // console.log("bet exists in user profile, passing");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const [showPopup, setShowPopup] = useState(false);

  const handlePredictionPlaced = () => {
    setShowPopup(true);

    // After 1.5 seconds, setShowPopup(false) will be called automatically by the Popup component
  };

  const submit = async (e) => {
    e.preventDefault();
    handleFakeDataUpdateChildren();
    fantasyDataFinalizer();

    let stringified_teams = "";

    let participatingTeams = [];

    try {
      participatingTeams = [hometeam_payload[0], awayteam_payload[0]];
    } catch (err) {
      console.log("error in participating teams");
    }

    // console.log("participating teams");
    // console.log(participatingTeams);
    stringified_teams = joinWithTripleUnderscore(participatingTeams);

    // console.log("creating a bet in db");
    await fantasy_bet_creator(
      `F-${current_match_payload[0]}-${user.userName}`,
      user.userName,
      current_match_payload[0],
      formData.chosenTeamAndPicks,
      formData.chosenMvps,
      stringified_teams,
      getCurrentTimestamp()
    );

    //instead of data from user bets use data from match cache
    await updateMatchBetCache(
      current_match_payload[0],
      current_match_payload[11],
      `F-${current_match_payload[0]}-${user.userName}`
    );
    // console.log("bet saved to match cache");

    // console.log("saving bet to user profile");
    await updateUserProfileBets(
      user.userName,
      freshFaunaUserData.userBets,
      `F-${current_match_payload[0]}-${user.userName}`
    );
  };

  // console.log(current_match_payload);
  // console.log(user);
  async function handleSubmit(event) {
    console.log("ran submit");
    try {
      event.preventDefault();
      console.log("finalizing bet data");
      fantasyDataFinalizer();

      console.log("updating user data");
      await updateUserData();
      console.log("user data updated");
    } catch (err) {
      // console.log("submit failed");
    }
  }

  // console.log(current_match_payload);

  let current_scenario = 0;

  if (formData.userTeamChosen == hometeam_payload[0]) {
    current_scenario = 1;
  } else if (formData.userTeamChosen == awayteam_payload[0]) {
    current_scenario = 2;
  } else {
    current_scenario = 0;
  }

  //console.log(current_scenario);

  let sampleTeam = ["SampleName", "Choose", "Your", "Team", "First", "Please"];

  const scenarioObject = {
    0: sampleTeam,
    1: hometeam_payload,
    2: awayteam_payload,
  };

  let amount_of_picks = 4;

  if (current_match_payload[10] > 6) {
    amount_of_picks = 7;
  } else if (current_match_payload[10] > 4) {
    amount_of_picks = 6;
  } else if (current_match_payload[10] > 2) {
    amount_of_picks = 5;
  } else {
  }

  const items = dotaHeroes;

  const [picksData, setPicksData] = React.useState([]);

  const handleOnSearch = (string, results) => {};

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  // Callback function to handle hero selection
  const handleOnSelect = (selectedHero) => {
    if (picksData.length < amount_of_picks) {
      if (picksData.includes(selectedHero.name)) {
        console.log(`Hero ${selectedHero.name} is already picked.`);
      } else {
        setPicksData((oldPicks) => [...oldPicks, selectedHero.name]);
      }
    } else {
      console.log("All heroes are picked.");
    }
  };

  const handleOnFocus = () => {
    // console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  //console.log(picksData);

  function cleanPicksData() {
    setPicksData([]);
  }

  let boxes = [];

  for (let i = 0; i < amount_of_picks; i++) {
    try {
      let hero_icon;
      for (let j = 0; j < dotaHeroes.length; j++) {
        if (dotaHeroes[j]["name"] == picksData[i]) {
          hero_icon = dotaHeroes[j]["icon"];
        }
      }

      boxes.push(
        <div className="hero-pick-box" key={i}>
          {hero_icon ? (
            <picture>
              <source srcSet={hero_icon} type="image/png" />
              <img
                className="dota-hero-icon"
                alt={picksData[i]}
                src={hero_icon}
              />
            </picture>
          ) : (
            // You can render a placeholder image or leave it empty based on your preference
            <div className="no-hero-icon-placeholder"></div>
          )}
        </div>
      );
    } catch (err) {
      boxes.push(<div className="hero-pick-box" key={i}></div>);
    }
  }

  let participatingTeams = [];
  participatingTeams.push(hometeam_payload[0]);
  participatingTeams.push(awayteam_payload[0]);
  // console.log(participatingTeams);

  const { fakeData, setFakeData } = useContext(FakeBetContext);

  const handleFakeDataUpdateChildren = () => {
    const newFakeData = [
      "fantasy",
      current_match_payload[0],
      formData.chosenTeamAndPicks,
      formData.chosenMvps,
      80001,
      parseInt(current_match_payload[5]),
      [hometeam_payload[0], awayteam_payload[0]],
      0,
      5,
      "pending",
      currentIsMobile,
    ]; // replace with your new data
    setFakeData(newFakeData);
    // console.log(newFakeData);
  };
  // console.log(currentIsMobile);

  async function checkUserData(_userName) {
    let faunaUser;

    try {
      // console.log("trying to access fauna");
      faunaUser = await client.query(
        q.Let(
          {
            match: q.Match(q.Index("user_by_name"), [_userName]), //_uniqueId matches[i]["apiId"]
            data: {
              userName: _userName,
            },
          },
          q.If(
            q.Exists(q.Var("match")),
            q.Get(q.Var("match")),
            "User not found"
          )
        )
      );
      // console.log("user exists");
      // console.log(user);
    } catch (err) {
      console.log("cant access user");
      console.error("Error:", err);
    }

    if (!faunaUser) {
      throw new Error("User not found.");
    } else {
      return faunaUser.data;
    }
  }

  const [freshFaunaUserData, setFreshFaunaUserData] = useState({});

  async function updateUserData() {
    const updatedUser = await checkUserData(user.userName);
    // console.log("fresh data from fauna");
    // console.log(updatedUser);
    updateDataAfterBet(updatedUser);
    setFreshFaunaUserData(updatedUser);
  }

  //create a useeffect that will console log when fresh fauna data is updated

  useEffect(() => {
    console.log("");
    // console.log(freshFaunaUserData);
  }, [freshFaunaUserData]);

  return (
    <>
      {current_match_payload[7] == "OPEN" || current_match_payload[7] == "" ? (
        <Form onSubmit={handleSubmit} className="container text-white ">
          <Row>1. Choose Team</Row>
          <Form.Select
            onChange={handleChange}
            name="userTeamChosen"
            value={formData.userTeamChosen}
            className="mt-2"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <option>--choose--</option>
            <option value={hometeam_payload[0]}>{hometeam_payload[0]}</option>
            <option value={awayteam_payload[0]}>{awayteam_payload[0]}</option>
          </Form.Select>

          <Row className="mt-2">2. Choose MVP</Row>
          <Form.Select
            onChange={handleChange}
            name="mvp1"
            value={formData.mvp1}
            className="mt-2"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <option>--choose--</option>
            <option value={scenarioObject[current_scenario][1]}>
              {scenarioObject[current_scenario][1]}
            </option>
            <option value={scenarioObject[current_scenario][2]}>
              {scenarioObject[current_scenario][2]}
            </option>
            <option value={scenarioObject[current_scenario][3]}>
              {scenarioObject[current_scenario][3]}
            </option>
            <option value={scenarioObject[current_scenario][4]}>
              {scenarioObject[current_scenario][4]}
            </option>
            <option value={scenarioObject[current_scenario][5]}>
              {scenarioObject[current_scenario][5]}
            </option>
          </Form.Select>

          <Row className="mt-2">3. Predict draft</Row>
          <div className="container mt-2">
            <Row>
              <Col className="ps-0 ">
                <div className="fantasy-pick-boxes-container">{boxes}</div>
              </Col>
              <Col className="mt-1">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => cleanPicksData()}
                >
                  RESET
                </button>
              </Col>

              <Col className="text-end">
                <Instructions
                  variant="fantasyInstructions"
                  isMobile={isMobile}
                />
              </Col>
            </Row>
            <Row>
              {" "}
              <div className="hero-search mt-2 ps-0">
                <AutocompleteField onSelect={handleOnSelect} />
              </div>
            </Row>
          </div>

          <FantasyModal
            show={show}
            onClose={() => setShow(false)}
            onConfirm={(e) => {
              submit(e);
              setShow(false);
              handlePredictionPlaced(e);
            }}
            betValue={5}
            team={formData.userTeamChosen}
            matchNumber={current_match_payload[0]}
            chosenTeamAndPicks={formData.chosenTeamAndPicks}
            chosenMvps={formData.chosenMvps}
            matchDate={parseInt(current_match_payload[5])}
            participatingTeams={participatingTeams}
            updateDataAfterBet={updateDataAfterBet}
            user={freshFaunaUserData}
            isMobile={isMobile}
            onPredictionPlaced={handlePredictionPlaced}
          />

          <Button
            onClick={() => setShow(true)}
            className="mt-3"
            variant="primary"
            type="submit"
            disabled={
              !formData?.userTeamChosen ||
              !picksData.length ||
              !formData?.mvp1 ||
              !user ||
              Object.keys(user).length === 0
            }
            title={
              !formData?.userTeamChosen ||
              !picksData.length ||
              !formData?.mvp1 ||
              !user ||
              Object.keys(user).length === 0
                ? !user || Object.keys(user).length === 0
                  ? "Please sign in before making bets"
                  : "You can't submit the form until all the required fields are filled in"
                : undefined
            }
          >
            Submit
          </Button>

          {showPopup && (
            <PredictionConfirmation
              message="Prediction placed ✔️"
              onClose={() => setShowPopup(false)}
            />
          )}
        </Form>
      ) : (
        <div className="already-did-bet">🚫The match has already started🚫</div>
      )}
    </>
  );
}

{
  /* <form className="container" onSubmit={handleSubmit}>
<div className="fantasy-choose-team">
  {" "}
  1. choose team
  <select
    className="create-new-bet-userteam-form"
    onChange={handleChange}
    name="userTeamChosen"
    value={formData.userTeamChosen}
  >
    <option className="select-option">--choose---</option>
    <option value={hometeam_payload[0]} className="select-option">
      {hometeam_payload[0]}
    </option>
    <option value={awayteam_payload[0]} className="select-option">
      {awayteam_payload[0]}
    </option>
  </select>
</div>
<div className="fantasy-choose-mvp1">
  {" "}
  2. choose mvp
  <select
    className="create-new-bet-userteam-form"
    onChange={handleChange}
    name="mvp1"
    value={formData.mvp1}
  >
    <option>--choose---</option>
    <option value={scenarioObject[current_scenario][1]}>
      {scenarioObject[current_scenario][1]}
    </option>
    <option value={scenarioObject[current_scenario][2]}>
      {scenarioObject[current_scenario][2]}
    </option>
    <option value={scenarioObject[current_scenario][3]}>
      {scenarioObject[current_scenario][3]}
    </option>
    <option value={scenarioObject[current_scenario][4]}>
      {scenarioObject[current_scenario][4]}
    </option>
    <option value={scenarioObject[current_scenario][5]}>
      {scenarioObject[current_scenario][5]}
    </option>
  </select>
</div>
<div className="fantasy-choose-bet-value"> </div>
<div className="draft-heroes-title">3. draft heroes</div>
<div className="fantasy-choose-picks">
  <div className="fantasy-pick-boxes-container">{boxes}</div>
  <div
    className="hero-reset-pick-box"
    onClick={() => cleanPicksData()}
  >
    RESET
  </div>
  <div className="hero-search">
    <AutocompleteField onSelect={handleOnSelect} />
  </div>
</div>

<FantasyModal
  show={show}
  onClose={() => setShow(false)}
  onConfirm={(e) => {
    submit(e);
    setShow(false);
    handlePredictionPlaced(e);
  }}
  betValue={5}
  team={formData.userTeamChosen}
  matchNumber={current_match_payload[0]}
  chosenTeamAndPicks={formData.chosenTeamAndPicks}
  chosenMvps={formData.chosenMvps}
  matchDate={parseInt(current_match_payload[5])}
  participatingTeams={participatingTeams}
  updateDataAfterBet={updateDataAfterBet}
  user={freshFaunaUserData}
  isMobile={isMobile}
  onPredictionPlaced={handlePredictionPlaced}
/>

<div className="fantasy-instructions">
  <Instructions
    variant="fantasyInstructions"
    isMobile={currentIsMobile}
  />
</div>
<div className="fantasy-choose-submit">
  <button
    className="button-submit"
    onClick={(e) => {
      // submit(e);
      handleSubmit;
      setShow(true);
    }}
    disabled={
      !formData?.userTeamChosen ||
      !picksData.length ||
      !formData?.mvp1 ||
      !user ||
      Object.keys(user).length === 0
    }
    title={
      !formData?.userTeamChosen ||
      !picksData.length ||
      !formData?.mvp1 ||
      !user ||
      Object.keys(user).length === 0
        ? !user || Object.keys(user).length === 0
          ? "Please sign in before making bets"
          : "You can't submit the form until all the required fields are filled in"
        : undefined
    }
    style={{
      cursor:
        !formData?.userTeamChosen ||
        !picksData.length ||
        !formData?.mvp1 ||
        !user ||
        Object.keys(user).length === 0
          ? "not-allowed"
          : "pointer",
    }}
  >
    Submit
  </button>
</div>

{showPopup && (
  <PredictionConfirmation
    message="Prediction placed ✔️"
    onClose={() => setShowPopup(false)}
  />
)}
</form> */
}
