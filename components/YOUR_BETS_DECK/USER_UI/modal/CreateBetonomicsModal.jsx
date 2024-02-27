import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import CloseIcon from "../../CloseIcon";
import { useWeb3Contract } from "react-moralis";
import { ethers, BigNumber } from "ethers";

import abiBetonomicsEvent from "../../../../constants/abiBetonomicsEvent.json";
import betonomicsEventContractAddresses from "../../../../constants/betonomicsEventContractAddresses.json";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;

// console.log(NEXT_PUBLIC_SIGNER_PK);

// const [fundsError, setFundsError] = React.useState(null);

// useEffect(() => {
//   if (error) {
//     console.log(error);
//     console.log(error.message);
//     try {
//       console.log(error.data["message"]);
//     } catch (err) {
//       console.log(error["message"]);
//     }
//     console.log(error.data["message"]);
//     if (
//       error.message ==
//       "MetaMask Tx Signature: User denied transaction signature."
//     ) {
//       alert("You denied the transaction!");
//     } else if (
//       error.data["message"] == "execution reverted: You need to spend more ETH!"
//     ) {
//     } else if (
//       error.data["message"] ==
//       "execution reverted: You can only bet on the events that have not started yet!"
//     ) {
//       alert("The match has already started!");
//     } else {
//       setFundsError(error.message);
//       alert("Insufficient funds in your current account!");
//     }
//   }
// }, [error]);

const CreateBetonomicsModal = (props) => {
  const mainChainId = 80001;
  const mainContractAddress = betonomicsEventContractAddresses[mainChainId][0];
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com",
    80001
  ); ///rpc url
  const signer = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PK, provider); ///private key

  const chainId = parseInt(chainIdHex);

  const universalContractAddress =
    chainId in betonomicsEventContractAddresses
      ? betonomicsEventContractAddresses[chainId][0]
      : null;

  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  // function ethTransformer(value) {
  //   //console.log("transforming");
  //   //console.log(value);
  //   var newEthValue = 0;
  //   try {
  //     if (value == NaN) {
  //       console.log("ethValue is NAN");
  //       newEthValue = 0;
  //     } else {
  //       //console.log("ethValue is a number");
  //       newEthValue = Moralis.Units.ETH(
  //         (value / 1 / testPricesObject[chainId]).toFixed(6)
  //       );
  //     }

  //     return newEthValue;
  //   } catch (err) {
  //     //console.log(err);
  //   }
  // }

  const eventOptions = {
    abi: abiBetonomicsEvent,
    contractAddress: universalContractAddress,
    functionName: "createMatch",
    params: {
      _participants: props.participants,
      _eventDescription: props.combined_description,
      _matchDate: props.matchDate,
      _place: props.place,
      _sportType: props.sportType,
    },
  };

  const { runContractFunction, isFetching, isLoading, error } =
    useWeb3Contract(eventOptions);

  const submit = (e) => {
    e.preventDefault();
    //console.log("hi");
    //console.log(eventOptions);
    runContractFunction();
  };

  if (!props.show) {
    return null;
  }
  // console.log("KEK");
  // console.log(props.lowFunds);
  // console.log("KEK");
  if (props.lowFunds != null) {
    return null;
  }

  // console.log(props.chosenTeamAndPicks);
  // console.log(props.chosenMvps);

  //   <button
  //   className="button-submit-modal"
  //   onClick={(e) => {
  //     submit(e);
  //     props.onConfirm;
  //     // setShow(false);
  //   }}
  // >

  //   Submit
  // </button>

  return (
    <div className="modal-new">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Creation confirmation</h4>
        </div>
        <div className="modal-body">
          You are making a match for 💰{props.sportType}$ between{" "}
          {props.participants}
          on {props.matchDate} at {props.place}
          {/* <br /> You chose {props.chosenMvps[0]} and {props.chosenMvps[1]} as */}
          <br /> Do you wish to continue?
        </div>
        <div>
          <button className="modal-close" onClick={props.onClose}>
            <CloseIcon
              height="20px"
              width="20px"
              className={styles.close__icon}
            />
          </button>
        </div>
        <div className="create-new-bet-submit-modal">
          <button
            className="button-submit-modal"
            onClick={(e) => {
              submit(e);
              props.onConfirm();
              props.onClose();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetonomicsModal;
