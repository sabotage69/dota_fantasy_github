import { useWeb3Contract } from "react-moralis";
//import { contractAddresses, abiBetting, abiEvent } from "../constants"
import contractAddresses from "../../../constants/contractAddresses.json";
import abiSidechainBetting from "../../../constants/abiSidechainBetting.json";
import abiEvent from "../../../constants/abiEvent.json";

import { ethers } from "ethers";
import React from "react";
import AppendCancellations from "./AppendCancellations";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_DEPLOYER_PK = process.env.NEXT_PUBLIC_DEPLOYER_PK;

export default function CalculateCancellation() {
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  //console.log(`ChainId is ${chainId}`)
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [formData, setFormData] = React.useState({
    eventNumber: 0,
    winnerTeam: "",
  });

  const eventOptions = {
    abi: abiEvent,
    contractAddress: universalContractAddress,
    functionName: "finishEvent",
    params: {
      eventNumber: formData.eventNumber,
    },
  };

  function handleChange(event) {
    //console.log(event)
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`executed checkUsers for eventNumber ${formData.eventNumber}`);
    await automaticTotalPoolUpdater();
    console.log("gathered all the required data");
  }

  function clickContract() {
    console.log("checking data before contract execution");
    console.log(
      calculatedData.winningsList,
      calculatedData.loopedOverChainsList,
      calculatedData.winnersList
    );
    runContractFunction();
    console.log("done contract execution");
  }

  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  async function automaticTotalPoolUpdater() {
    userObjects = [];
    currencyPoolsInMATIC = [];
    var loopedOverChainsList = [];
    var winnersList = [];
    var winningsObjects = [];
    var winningsList = [];

    for (let i = 0; i < Object.keys(contractAddresses).length; i++) {
      var loopingChainId = parseInt(Object.keys(contractAddresses)[i]);
      try {
        var loopingContractAddress = contractAddresses[loopingChainId][0];
        var loopingProvider = new ethers.providers.JsonRpcProvider(
          contractAddresses[loopingChainId][1],
          loopingChainId
        );
        var loopingSigner = new ethers.Wallet(
          NEXT_PUBLIC_SIGNER_PK,
          loopingProvider
        );
        var loopingSidechainContract = new ethers.Contract(
          loopingContractAddress,
          abiSidechainBetting,
          loopingSigner
        );
        var loopingUserListMessage = await loopingSidechainContract.checkUsers(
          formData.eventNumber
        );
        //console.log(loopingChainId)
        //console.log(loopingUserListMessage)
        var loopingUserBetsMessage =
          await loopingSidechainContract.betsOfUsersList(formData.eventNumber);
        //console.log(parseInt(loopingUserBetsMessage))
        loopedOverChainsList.push(loopingChainId);

        for (let j = 0; j < loopingUserListMessage.length; j++) {
          winnersList.push(loopingUserListMessage[j]);
          winningsObjects.push({
            chainId: loopingChainId,
            winnings: parseInt(loopingUserBetsMessage).toString(),
          });
        }
      } catch (err) {
        console.log(
          `some error, prolly contract doesnt exist on network ${loopingChainId}`
        );
      }
    }

    //console.log("oi")
    for (let i = 0; i < winningsObjects.length; i++) {
      let objectForPush = [];
      //console.log("hi")
      for (let j = 0; j < loopedOverChainsList.length; j++) {
        //console.log(winningsObjects[i]["chainId"])
        //console.log(loopedOverChainsList[j])
        if (winningsObjects[i]["chainId"] == loopedOverChainsList[j]) {
          objectForPush.push(winningsObjects[i]["winnings"]);
        } else {
          objectForPush.push(0);
        }
      }
      winningsList.push(objectForPush);
    }

    console.log("data before setting state");
    console.log(winningsList, loopedOverChainsList, winnersList);

    setCalculatedData(() => {
      return {
        winningsList: winningsList,
        loopedOverChainsList: loopedOverChainsList,
        winnersList: winnersList,
      };
    });
    console.log("data should be set now");
  }

  const [calculatedData, setCalculatedData] = React.useState({
    winningsList: [],
    loopedOverChainsList: [],
    winnersList: [],
  });

  const { runContractFunction, isFetching, isLoading } =
    useWeb3Contract(winningsOptions);

  const winningsOptions = {
    abi: abiSidechainBetting,
    contractAddress: universalContractAddress,
    functionName: "addAllPotentialWinnings",
    //msgValue: 1,
    params: {
      _eventNumber: formData.eventNumber,
      _potentialWinnings: calculatedData.winningsList,
      _chainsList: calculatedData.loopedOverChainsList,
      _winnersList: calculatedData.winnersList,
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="calculate-winnings-card">
          <div className="close-match-card-title">Calculate cancellations</div>
          <div>
            <input
              className="evaluate-match-card-id-loop2-form"
              type="text"
              placeholder="eventNumber"
              onChange={handleChange}
              name="eventNumber"
              value={formData.eventNumber}
            />
          </div>
          <div>
            <button className="evaluate-match-card-loop2-button">Submit</button>
          </div>
        </div>
      </form>
      {/* <button className="evaluate-match-card-loop2-button" a onClick={clickContract}>RunContract</button> */}
      <AppendCancellations
        eventNumber={formData.eventNumber}
        winningsList={calculatedData.winningsList}
        loopedOverChainsList={calculatedData.loopedOverChainsList}
        winnersList={calculatedData.winnersList}
      />
    </>
  );
}
