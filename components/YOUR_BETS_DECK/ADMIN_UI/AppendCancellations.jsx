import contractAddresses from "../../../constants/contractAddresses.json";

import { ethers } from "ethers";
import React from "react";
import abiSidechainBetting from "../../../constants/abiSidechainBetting.json";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_DEPLOYER_PK = process.env.NEXT_PUBLIC_DEPLOYER_PK;

export default function AppendCancellations(props) {
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  //console.log(`ChainId is ${chainId}`)
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const mainChainId = 80001;
  const mainContractAddress = contractAddresses[mainChainId][0];

  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const wallet = new ethers.Wallet(NEXT_PUBLIC_DEPLOYER_PK, provider);
  const signer = wallet.provider.getSigner(wallet.address);
  //console.log(signer)
  const administrativeSidechainContract = new ethers.Contract(
    mainContractAddress,
    abiSidechainBetting,
    signer
  );

  async function updateUI() {
    const gasPrice = await provider.getGasPrice();
    const addingAllWinnings =
      await administrativeSidechainContract.createWinningsStruct(
        props.eventNumber,
        props.winningsList,
        props.loopedOverChainsList,
        props.winnersList,
        {
          //maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei'),
          gasPrice: gasPrice,
          gasLimit: ethers.utils.parseUnits("10000000", "wei"),
          //maxFeePerGas: ethers.utils.parseUnits('2.5', 'gwei'),
        }
      );
  }

  function handleSubmit(event) {
    event.preventDefault();

    //console.log("propdata")
    console.log(
      props.eventNumber,
      props.winningsList,
      props.loopedOverChainsList,
      props.winnersList
    );
    //runContractFunction()
    updateUI();
    console.log(
      `executed appending winings for eventNumber ${props.eventNumber}`
    );
  }

  return (
    <>
      <div className="submit-winnings-card">
        <div className="close-match-card-title">Submit cancellations</div>
        <button
          className="evaluate-match-card-loop2-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}
