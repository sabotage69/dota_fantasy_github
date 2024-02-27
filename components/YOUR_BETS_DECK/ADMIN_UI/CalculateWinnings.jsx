import { useWeb3Contract } from "react-moralis";
//import { contractAddresses, abiBetting, abiEvent } from "../constants"
import contractAddresses from "../../../constants/contractAddresses.json";
import abiBetting from "../../../constants/abiBetting.json";
import abiSidechainBetting from "../../../constants/abiSidechainBetting.json";
import abiEvent from "../../../constants/abiEvent.json";

import React from "react";
import AppendWinnings from "./AppendWinnings";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_DEPLOYER_PK = process.env.NEXT_PUBLIC_DEPLOYER_PK;
export default function CalculateWinnings() {
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  //console.log(`ChainId is ${chainId}`)
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [formData, setFormData] = React.useState({
    eventNumber: 0,
    winnerTeam: "",
  });

  // const eventOptions = {
  //     abi: abiEvent,
  //     contractAddress: universalContractAddress,
  //     functionName: "finishEvent",
  //     params: {
  //         eventNumber: formData.eventNumber,
  //     }
  // };

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

  // function clickContract() {
  //     console.log("checking data before contract execution")
  //     console.log(calculatedData.winningsList, calculatedData.loopedOverChainsList, calculatedData.winnersList)
  //     runContractFunction()
  //     console.log("done contract execution")
  // }

  const testPricesObject = {
    4: "18000",
    80001: "90",
    31337: "12000",
    5: "18000",
    11155111: "18000",
  };

  var userObjects = [];
  var currencyPoolsInMATIC = [];

  async function automaticTotalPoolUpdater() {
    var homePoolInMATIC = 0;
    var awayPoolInMATIC = 0;
    var drawPoolInMATIC = 0;
    var totalPoolInMATIC = 0;
    userObjects = [];
    currencyPoolsInMATIC = [];
    var homeTeam = "";
    var awayTeam = "";
    var drawTeam = "";
    var loopedOverChainsList = [];

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
        var loopingUserBetsMessage =
          await loopingSidechainContract.betsOfUsersList(formData.eventNumber);
        var loopingUserTeamsChosenMessage =
          await loopingSidechainContract.chosenTeamsOfUsersList(
            formData.eventNumber
          );
        var teamNamesLookUpMessage =
          await loopingSidechainContract.userStructLookUp(
            formData.eventNumber,
            loopingUserListMessage[0]
          );
        homeTeam = teamNamesLookUpMessage.homeTeam;
        awayTeam = teamNamesLookUpMessage.awayTeam;
        drawTeam = teamNamesLookUpMessage.drawTeam;
        loopedOverChainsList.push(loopingChainId);
        if (loopingChainId != "80001") {
          var loopingUserBetsInMATIC = loopingUserBetsMessage.map(
            (x) =>
              (x * testPricesObject[loopingChainId]) / testPricesObject[80001]
          ); //1
        } else {
          var loopingUserBetsInMATIC = loopingUserBetsMessage;
        }
        var loopingCurrencyPool =
          await loopingSidechainContract.checkTotalPools(
            loopingChainId,
            formData.eventNumber
          ); //2
        if (loopingChainId != "80001") {
          var loopingCurrencyPoolInMATIC =
            (parseInt(loopingCurrencyPool) * testPricesObject[loopingChainId]) /
            testPricesObject[80001]; //3
        } else {
          var loopingCurrencyPoolInMATIC = parseInt(loopingCurrencyPool);
        }
        currencyPoolsInMATIC.push({
          chainId: loopingChainId,
          currencyPoolInMATIC: loopingCurrencyPoolInMATIC,
        });

        var loopingHomePools = await loopingSidechainContract.checkHomePools(
          loopingChainId,
          formData.eventNumber
        );
        var loopingAwayPools = await loopingSidechainContract.checkAwayPools(
          loopingChainId,
          formData.eventNumber
        );
        var loopingDrawPools = await loopingSidechainContract.checkDrawPools(
          loopingChainId,
          formData.eventNumber
        );
        if (loopingChainId != "80001") {
          homePoolInMATIC +=
            (parseInt(loopingHomePools) * testPricesObject[loopingChainId]) /
            testPricesObject[80001]; //4
          awayPoolInMATIC +=
            (parseInt(loopingAwayPools) * testPricesObject[loopingChainId]) /
            testPricesObject[80001];
          drawPoolInMATIC +=
            (parseInt(loopingDrawPools) * testPricesObject[loopingChainId]) /
            testPricesObject[80001];
          totalPoolInMATIC += parseInt(loopingCurrencyPoolInMATIC);
          // testTotalPoolInMATIC.push(parseInt(loopingCurrencyPoolInMATIC) * testPricesObject[loopingChainId] / testPricesObject[80001])
        } else {
          homePoolInMATIC += parseInt(loopingHomePools);
          awayPoolInMATIC += parseInt(loopingAwayPools);
          drawPoolInMATIC += parseInt(loopingDrawPools);
          totalPoolInMATIC += parseInt(loopingCurrencyPoolInMATIC); //5
          // testTotalPoolInMATIC.push(parseInt(loopingCurrencyPoolInMATIC))
        }

        for (let m = 0; m < loopingUserListMessage.length; m++) {
          userObjects.push({
            address: loopingUserListMessage[m],
            chainId: loopingChainId,
            originalBet: loopingUserBetsMessage[m],
            chosenTeam: loopingUserTeamsChosenMessage[m],
            maticBet: parseInt(loopingUserBetsInMATIC[m]),
            totalPotentialWinningsInMATIC: 0,
            winningsValueForEachChainInMATIC: [],
            winningsValueForEachChainInOriginalCurrency: [],
          });
        }

        //console.log(loopingChainId, loopingCurrencyPoolInMATIC)
        //console.log(`looping chainId ${loopingChainId} users array ${loopingUserListMessage} bets array ${loopingUserBetsMessage} bets in MATIC array ${loopingUserBetsInMATIC}`)
      } catch (err) {
        console.log(
          `some error, prolly contract doesnt exist on network ${loopingChainId}`
        );
      }
    }

    for (let p = 0; p < userObjects.length; p++) {
      if (userObjects[p]["chosenTeam"] == homeTeam) {
        userObjects[p]["totalPotentialWinningsInMATIC"] =
          (userObjects[p]["maticBet"] * totalPoolInMATIC) / homePoolInMATIC;
      } else if (userObjects[p]["chosenTeam"] == awayTeam) {
        userObjects[p]["totalPotentialWinningsInMATIC"] =
          (userObjects[p]["maticBet"] * totalPoolInMATIC) / awayPoolInMATIC;
      } else {
        userObjects[p]["totalPotentialWinningsInMATIC"] =
          (userObjects[p]["maticBet"] * totalPoolInMATIC) / drawPoolInMATIC;
      }
    }

    var winningsCurrencyShare = [];
    for (let d = 0; d < currencyPoolsInMATIC.length; d++) {
      //console.log(currencyPoolsInMATIC[d]["currencyPoolInMATIC"])
      winningsCurrencyShare.push({
        chainId: currencyPoolsInMATIC[d]["chainId"],
        share:
          parseInt(currencyPoolsInMATIC[d]["currencyPoolInMATIC"]) /
          totalPoolInMATIC,
      });
    }
    //console.log(winningsCurrencyShare)

    for (let r = 0; r < userObjects.length; r++) {
      var sharesOfOneUser = [];
      for (let k = 0; k < winningsCurrencyShare.length; k++) {
        sharesOfOneUser.push({
          chainId: winningsCurrencyShare[k]["chainId"],
          value:
            winningsCurrencyShare[k]["share"] *
            userObjects[r]["totalPotentialWinningsInMATIC"],
        });
      }
      userObjects[r]["winningsValueForEachChainInMATIC"] = sharesOfOneUser;
    }
    //console.log(userObjects)

    for (let q = 0; q < userObjects.length; q++) {
      var sharesOfOneUser = [];
      for (
        let z = 0;
        z < userObjects[q]["winningsValueForEachChainInMATIC"].length;
        z++
      ) {
        sharesOfOneUser.push({
          chainId:
            userObjects[q]["winningsValueForEachChainInMATIC"][z]["chainId"],
          value: parseInt(
            userObjects[q]["winningsValueForEachChainInMATIC"][z]["value"] /
              testPricesObject[
                userObjects[q]["winningsValueForEachChainInMATIC"][z]["chainId"]
              ]
          ),
        });
      }
      userObjects[q]["winningsValueForEachChainInOriginalCurrency"] =
        sharesOfOneUser;
    }
    //console.log(userObjects)

    var winnersObjects = [];
    for (let x = 0; x < userObjects.length; x++) {
      if (userObjects[x]["chosenTeam"] == formData.winnerTeam) {
        winnersObjects.push(userObjects[x]);
      }
    }
    //console.log(winnersObjects)
    var winnersList = [];

    for (let x = 0; x < winnersObjects.length; x++) {
      winnersList.push(winnersObjects[x]["address"]);
    }
    //console.log(winnersList)

    var winningsList = [];

    for (let x = 0; x < winnersObjects.length; x++) {
      //console.log(winnersObjects[x]["winningsValueForEachChainInOriginalCurrency"])
      var valuesToPush = [];
      for (
        let k = 0;
        k <
        winnersObjects[x]["winningsValueForEachChainInOriginalCurrency"].length;
        k++
      ) {
        //console.log(winnersObjects[x]["winningsValueForEachChainInOriginalCurrency"][k]["value"])
        valuesToPush.push(
          winnersObjects[x]["winningsValueForEachChainInOriginalCurrency"][k][
            "value"
          ]
        );
      }
      winningsList.push(valuesToPush);
    }
    //console.log(winningsList)
    //console.log(loopedOverChainsList)
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

  // const { runContractFunction, isFetching, isLoading } =
  //     useWeb3Contract(winningsOptions);

  // const winningsOptions = {
  //     abi: abiSidechainBetting,
  //     contractAddress: universalContractAddress,
  //     functionName: "addAllPotentialWinnings",
  //     //msgValue: 1,
  //     params: {
  //         _eventNumber: formData.eventNumber,
  //         _potentialWinnings: calculatedData.winningsList,
  //         _chainsList: calculatedData.loopedOverChainsList,
  //         _winnersList: calculatedData.winnersList,
  //     }
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="calculate-winnings-card">
          <div className="close-match-card-title">Calculate winnings</div>
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
            <input
              className="evaluate-match-card-id-loop2-form"
              type="text"
              placeholder="winnerTeam"
              onChange={handleChange}
              name="winnerTeam"
              value={formData.winnerTeam}
            />
          </div>
          <div>
            <button className="evaluate-match-card-loop2-button">Submit</button>
          </div>
        </div>
      </form>
      {/* <button className="evaluate-match-card-loop2-button" a onClick={clickContract}>RunContract</button> */}
      <AppendWinnings
        eventNumber={formData.eventNumber}
        winningsList={calculatedData.winningsList}
        loopedOverChainsList={calculatedData.loopedOverChainsList}
        winnersList={calculatedData.winnersList}
      />
    </>
  );
}
