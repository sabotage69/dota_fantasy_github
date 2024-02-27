import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import CloseIcon from "../../CloseIcon";
import { Modal, Button } from "react-bootstrap";
import faunadb from "faunadb";
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

const FantasyModal = ({
  show,
  onClose,
  onConfirm,
  betValue,
  team,
  matchNumber,
  chosenTeamAndPicks,
  chosenMvps,
  matchDate,
  participatingTeams,
  updateDataAfterBet,
  user,
  isMobile,
  onPredictionPlaced,
}) => {
  const submit = (e) => {
    e.preventDefault();
    console.log("hi");
  };

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  if (!show) {
    return null;
  }

  function splitStringToArray(inputString) {
    const elementsArray = inputString.split("___");
    return elementsArray;
  }

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

  // console.log(chosenTeamAndPicks);

  let separated_team_and_picks = splitStringToArray(chosenTeamAndPicks);

  const handleConfirmClick = (e) => {
    // Call both functions when the button is clicked
    e.preventDefault();
    onPredictionPlaced(e);
    onConfirm(e);
  };

  return (
    <Modal show={show} onHide={onClose} centered bg="dark" data-bs-theme="dark">
      <Modal.Header closeButton className="text-center text-white">
        <Modal.Title className="w-100">Bet Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center text-white text-responsive">
        You are making a bet for {separated_team_and_picks[0]}
        <br />
        You chose {chosenMvps} as your MVP
        <br />
        Do you wish to continue?
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FantasyModal;

{
  /* <div className="modal-new">
<div className="modal-content">
  <div className="modal-header">
    <h4 className="modal-title">Bet confirmation</h4>
  </div>
  <div className="modal-body">
    You are making a bet for {separated_team_and_picks[0]}
    <br /> You chose {chosenMvps} as your MVP
    <br /> Do you wish to continue?
  </div>
  <div>
    <button className="modal-close" onClick={onClose}>
      <CloseIcon
        height="20px"
        width="20px"
        className={styles.close__icon}
      />
    </button>
  </div>
  <div className="create-new-bet-submit-modal">
    <button className="button-submit-modal" onClick={handleConfirmClick}>
      Confirm
    </button>
  </div>
</div>
</div> */
}
