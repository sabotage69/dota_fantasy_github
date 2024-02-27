import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import CloseIcon from "../../CloseIcon";
import betonomicsArbiterContractAddresses from "../../../constants/betonomicsArbiterContractAddresses.json";
import { useWeb3Contract } from "react-moralis";
import { ethers, BigNumber } from "ethers";

import abiBetonomicsArbiter from "../../../constants/abiBetonomicsArbiter.json";
import { FakeBetContext } from "../../FakeBetContext";
import { useContext } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;

const ArbiterModal = (props) => {
  const mainChainId = 80001;
  const mainContractAddress =
    betonomicsArbiterContractAddresses[mainChainId][0];

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  let chainId;

  if (chain === undefined) {
    chainId = 80001;
  } else {
    chainId = chain["id"];
  }

  const universalContractAddress =
    chainId in betonomicsArbiterContractAddresses
      ? betonomicsArbiterContractAddresses[80001][0]
      : null;

  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  // const eventOptions = {
  //   abi: abiBetonomicsArbiter,
  //   contractAddress: universalContractAddress,
  //   functionName: "castVote",
  //   params: {
  //     _matchId: props.matchId,
  //     _outcome: props.chosenOutcome,
  //     _matchDate: props.matchDate,
  //     _title: props.title,
  //   },
  // };

  // const { runContractFunction, isFetching, isLoading, error } =
  //   useWeb3Contract(eventOptions);

  if (!props.show) {
    return null;
  }

  if (props.lowFunds != null) {
    return null;
  }

  const provider = new ethers.providers.Web3Provider(web3.currentProvider);

  async function updateUI() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const signer = provider.getSigner();
    // console.log(address);
    const signature = await signer.signMessage(address.toString());

    const betonomicsChainContract = new ethers.Contract(
      betonomicsArbiterContractAddresses[chainId][0],
      abiBetonomicsArbiter,
      signer
    );

    const gasPrice = await provider.getGasPrice();
    // console.log(gasPrice.toString());
    // const increasedGasPrice = gasPrice.mul(115).div(100);
    // console.log(increasedGasPrice.toString());
    const addingAllWinnings = await betonomicsChainContract.castVote(
      props.matchId,
      props.chosenOutcome,
      props.matchDate,
      props.title,
      {
        //maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei'),
        gasPrice: gasPrice,
        // gasLimit: ethers.utils.parseUnits("1000000", "wei"),
        // value: ethTransformer(props.betValue),
        //maxFeePerGas: ethers.utils.parseUnits('2.5', 'gwei'),
      }
    );
  }

  const submit = (e) => {
    e.preventDefault();
    // runContractFunction();
    updateUI();
  };

  return (
    <div className="modal-new">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Vote confirmation</h4>
        </div>
        <div className="modal-body">
          You are making a vote for {props.chosenOutcome}
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
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArbiterModal;
