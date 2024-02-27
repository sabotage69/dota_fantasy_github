import React, { useEffect } from "react";
import styles from "./modal.module.css";
import CloseIcon from "../../CloseIcon";
import ReactDOM from "react-dom";
import contractAddresses from "../../../constants/contractAddresses.json";

import { ethers, BigNumber } from "ethers";

import abiSidechainBetting from "../../../constants/abiSidechainBetting.json";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;

// console.log(NEXT_PUBLIC_SIGNER_PK);

const mainChainId = 80001;
const mainContractAddress = contractAddresses[mainChainId][0];
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com",
  80001
); ///rpc url
const signer = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PK, provider); ///private key

const administrativeSidechainContract = new ethers.Contract(
  mainContractAddress,
  abiSidechainBetting,
  signer
);

const NewModal = (props) => {
  if (!props.show) {
    return null;
  }
  // console.log("KEK");
  // console.log(props.lowFunds);
  // console.log("KEK");
  if (props.lowFunds != null) {
    return null;
  }

  return (
    <div className="modal-new">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Bet confirmation</h4>
        </div>
        <div className="modal-body">
          You are making a bet of 💰{props.betValue}$ for {props.team}
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
          <button className="button-submit-modal" onClick={props.onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewModal;
