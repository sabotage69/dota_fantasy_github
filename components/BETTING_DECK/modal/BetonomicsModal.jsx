import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import CloseIcon from "../../CloseIcon";
import betonomicsEventContractAddresses from "../../../constants/betonomicsEventContractAddresses.json";
import { useWeb3Contract } from "react-moralis";
import { ethers, BigNumber } from "ethers";

import abiBetonomicsEvent from "../../../constants/abiBetonomicsEvent.json";
import { FakeBetContext } from "../../FakeBetContext";
import { useContext } from "react";
import faunadb from "faunadb";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

const BetonomicsModal = (props) => {
  // let chains_list = [80001, 11155111];

  // function joinWithTripleUnderscore(arr) {
  //   return arr.join("___");
  // }

  // async function automaticTotalPoolUpdater(_matchCountMessage) {
  //   var totalPoolsInMATIC = [];
  //   for (
  //     let i = 0;
  //     i < Object.keys(betonomicsEventContractAddresses).length;
  //     i++
  //   ) {
  //     var loopingchainId = parseInt(
  //       Object.keys(betonomicsEventContractAddresses)[i]
  //     );
  //     try {
  //       var loopingContractAddress =
  //         betonomicsEventContractAddresses[loopingchainId][0];
  //       var loopingProvider = new ethers.providers.JsonRpcProvider(
  //         betonomicsEventContractAddresses[loopingchainId][1],
  //         loopingchainId
  //       );
  //       var loopingSigner = new ethers.Wallet(
  //         NEXT_PUBLIC_SIGNER_PK,
  //         loopingProvider
  //       );
  //       var loopingSidechainContract = new ethers.Contract(
  //         loopingContractAddress,
  //         abiBetonomicsEvent,
  //         loopingSigner
  //       );
  //       var loopingChainTotalMessage = await loopingSidechainContract.checkTotalPools(
  //         loopingchainId,
  //         _matchCountMessage
  //       );
  //       if (loopingchainId == "80001") {
  //         var loopingTotalPoolInMATIC = parseInt(loopingChainTotalMessage);
  //       } else {
  //         var loopingTotalPoolInMATIC =
  //           parseInt(loopingChainTotalMessage) *
  //           (testPricesObject[loopingchainId] / testPricesObject[80001]);
  //       }
  //       totalPoolsInMATIC.push(loopingTotalPoolInMATIC);
  //     } catch (err) {
  //       console.log(err);
  //       //   console.log(
  //       //     `some error, prolly contract doesnt exist on network ${loopingchainId}`
  //       //   );
  //     }
  //   }

  //   let combinedTotalPoolInMatic = 0;
  //   for (let i = 0; i < totalPoolsInMATIC.length; i++) {
  //     combinedTotalPoolInMatic += totalPoolsInMATIC[i];
  //   }

  //   //console.log(combinedTotalPoolInMatic);
  //   return combinedTotalPoolInMatic;
  // }

  // async function chainCollector(
  //   _chainId,
  //   _contractAddresses,
  //   _abi,
  //   _matchId,
  //   _matchesDataObjects
  // ) {
  //   const current_contract_address = _contractAddresses[_chainId][0];
  //   const current_rpc_url = _contractAddresses[_chainId][1];
  //   const current_provider = new ethers.providers.JsonRpcProvider(
  //     current_rpc_url,
  //     _chainId
  //   );
  //   const wallet = new ethers.Wallet(NEXT_PUBLIC_SIGNER_PK, current_provider);
  //   const current_contract = new ethers.Contract(
  //     current_contract_address,
  //     _abi,
  //     wallet
  //   );

  //   console.log("getting event data");
  //   try {
  //     const _matchLookUpMessage = await current_contract.matchLookUp(_matchId);
  //     let converted_participants_pools = [];
  //     for (
  //       let i = 0;
  //       i < _matchLookUpMessage["_participantsPools"].length;
  //       i++
  //     ) {
  //       //if current chain id is 80001, then we don't need to convert the values
  //       if (_chainId == 80001) {
  //         converted_participants_pools.push(
  //           BigInt(_matchLookUpMessage["_participantsPools"][i])
  //         );
  //       } else {
  //         //if current chain id is not 80001, then we need to convert the values
  //         converted_participants_pools.push(
  //           BigInt(_matchLookUpMessage["_participantsPools"][i]) *
  //             (BigInt(testPricesObject[_chainId]) /
  //               BigInt(testPricesObject[80001]))
  //         );
  //       }
  //     }

  //     let underscore_separated_participants = joinWithTripleUnderscore(
  //       _matchLookUpMessage["_participants"]
  //     );

  //     let lowered_createdBy = _matchLookUpMessage["_createdBy"].toLowerCase();
  //     // console.log(stringified_patricipants_pools);

  //     if (_matchLookUpMessage["_finished"] == "FINISHED") {
  //       console.log("match has finished, no need to cash additional data");
  //     } else {
  //       let stringified_matchDate = parseInt(
  //         _matchLookUpMessage["_matchDate"]
  //       ).toString();
  //       console.log("getting pools");
  //       let _totalPool = await automaticTotalPoolUpdater(_matchId);
  //       console.log("got pools");

  //       let converted_total_pool = 0;

  //       //if chaind id is 80001, then we don't need to convert the values

  //       if (_chainId == 80001) {
  //         converted_total_pool = BigInt(_totalPool);
  //       } else {
  //         converted_total_pool =
  //           BigInt(_totalPool) *
  //           (BigInt(testPricesObject[_chainId]) /
  //             BigInt(testPricesObject[80001]));
  //       }

  //       console.log(_chainId);
  //       console.log("creating data object");

  //       //push the data to the matchesDataObject

  //       _matchesDataObjects.push({
  //         chainId: _chainId,
  //         matchId: _matchId,
  //         participants: underscore_separated_participants,
  //         participantsPools: converted_participants_pools,
  //         createdBy: lowered_createdBy,
  //         eventDescription: _matchLookUpMessage["_eventDescription"],
  //         matchDate: stringified_matchDate,
  //         place: _matchLookUpMessage["_place"],
  //         finished: _matchLookUpMessage["_finished"],
  //         sportType: _matchLookUpMessage["_sportType"],
  //         totalPool: converted_total_pool,
  //       });
  //       console.log("created data object");
  //     }
  //   } catch (error) {
  //     if (error.errorName === "Panic") {
  //       console.log("Match doesnt exist on this chain yet");
  //     } else {
  //       console.log(error);
  //     }
  //   }
  //   console.log("got event data");

  //   //before joining the participants, we need to convert them to mumbai token values
  //   //create a new array with the same length as the participants pools array
  //   //iterate through the participants pools array and convert the values to mumbai token values
  //   //use testPricesObject to convert the values
  //   //then join the participants pools array with triple underscores
  // }

  // async function ugeDbMatchManager(
  //   _matchCountMessage,
  //   _participantsPools,
  //   _totalPool
  // ) {
  //   (async () => {
  //     await client.query(
  //       q.Let(
  //         {
  //           match: q.Match(q.Index("uge_number_checker"), _matchCountMessage),
  //           data: {
  //             participantsPools: _participantsPools,
  //             totalPool: _totalPool,
  //           },
  //         },
  //         q.If(
  //           q.Exists(q.Var("match")),
  //           q.Update(q.Select(["ref"], q.Get(q.Var("match"))), {
  //             data: q.Var("data"),
  //           }),
  //           q.Do(null) // this line replaces the Create function in the else clause
  //         )
  //       )
  //     );
  //   })();
  // }

  // async function matchCacheUpdater(_matchId) {
  //   let matchesDataObjects = [];

  //   for (let j = 0; j < chains_list.length; j++) {
  //     console.log("collecting data from chain: " + chains_list[j] + "");
  //     await chainCollector(
  //       chains_list[j],
  //       betonomicsEventContractAddresses,
  //       abiBetonomicsEvent,
  //       _matchId,
  //       matchesDataObjects
  //     );
  //   }

  //   console.log("data collected from all chains");
  //   console.log(matchesDataObjects);

  //   //now create a final object with the data from all the chains
  //   //by adding converted participants pools arrays and total pools
  //   //then changing all the converted values to strings
  //   //and joining the paritipants pools with triple underscores
  //   //keeping the rest of the data the same

  //   try {
  //     let finalObject = {
  //       chainId: matchesDataObjects[0].chainId,
  //       matchId: matchesDataObjects[0].matchId,
  //       participants: matchesDataObjects[0].participants,
  //       participantsPools: [],
  //       createdBy: matchesDataObjects[0].createdBy,
  //       eventDescription: matchesDataObjects[0].eventDescription,
  //       matchDate: matchesDataObjects[0].matchDate,
  //       place: matchesDataObjects[0].place,
  //       finished: matchesDataObjects[0].finished,
  //       sportType: matchesDataObjects[0].sportType,
  //       totalPool: 0,
  //     };

  //     //add total pools

  //     for (let j = 0; j < matchesDataObjects.length; j++) {
  //       finalObject.totalPool =
  //         BigInt(finalObject.totalPool) +
  //         BigInt(matchesDataObjects[j].totalPool);
  //     }

  //     //add participants pools

  //     let full_participants_pools = [];

  //     for (let j = 0; j < matchesDataObjects[0].participantsPools.length; j++) {
  //       let participant_sum = 0;
  //       let amount_of_chains = matchesDataObjects.length;

  //       for (let k = 0; k < matchesDataObjects.length; k++) {
  //         participant_sum =
  //           BigInt(participant_sum) +
  //           BigInt(matchesDataObjects[k].participantsPools[j]);
  //       }

  //       full_participants_pools.push(participant_sum);
  //     }

  //     finalObject.participantsPools = full_participants_pools;

  //     //convert all the values to strings

  //     finalObject.totalPool = finalObject.totalPool.toString();

  //     for (let j = 0; j < finalObject.participantsPools.length; j++) {
  //       finalObject.participantsPools[j] = finalObject.participantsPools[
  //         j
  //       ].toString();
  //     }

  //     //join the participants pools with triple underscores

  //     finalObject.participantsPools = joinWithTripleUnderscore(
  //       finalObject.participantsPools
  //     );

  //     //push the final object to the database

  //     console.log("pushing data to database");

  //     await ugeDbMatchManager(
  //       finalObject.matchId,
  //       finalObject.participantsPools,
  //       finalObject.totalPool
  //     );

  //     console.log("data pushed to database");
  //   } catch (error) {
  //     console.log(error);
  //     console.log("no return data from contract");
  //   }
  // }

  // function updateDbAfterDelay() {
  //   setTimeout(() => {
  //     matchCacheUpdater(props.matchId);
  //   }, 30000); // 20 seconds delay
  // }

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  let chainId;

  if (chain === undefined) {
    chainId = 80001;
  } else {
    chainId = chain["id"];
  }

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

  // const eventOptions = {
  //   abi: abiBetonomicsEvent,
  //   contractAddress: universalContractAddress,
  //   functionName: "makeMatchPrediction",
  //   msgValue: ethTransformer(props.betValue),
  //   params: {
  //     matchId: props.matchId,
  //     chosenOutcome: props.chosenOutcome,
  //     chainId: chainId,
  //     matchDate: props.matchDate,
  //     participatingTeams: props.participatingTeams,
  //     title: props.title,
  //     place: props.place,
  //     sportType: props.sportType,
  //   },
  // };

  const { fakeData, setFakeData } = useContext(FakeBetContext);
  // const { runContractFunction, isFetching, isLoading, error } =
  //   useWeb3Contract(eventOptions);

  const handleFakeDataUpdateChildren = () => {
    const newFakeData = [
      "uge",
      props.matchId,
      props.chosenOutcome,
      chainId,
      props.matchDate,
      props.participatingTeams,
      props.title,
      ethTransformer(props.betValue),
      "pending",
    ];
    setFakeData(newFakeData);
  };

  function ethTransformer(ethValue) {
    var newEthValue = 0;
    if (props.intro === "true") {
      // Handle the case for props.intro being "true" (if needed)
    } else {
      if (isNaN(ethValue)) {
        newEthValue = 0;
      } else {
        const chainPrice = testPricesObject[chain.id];
        const ethUnit = ethers.utils.parseEther("1");
        const priceUnit = ethers.utils.parseUnits(chainPrice.toString(), "wei");
        const valueInWei = ethers.utils.parseUnits(ethValue.toString(), "wei");

        const newValueInEth = valueInWei.mul(ethUnit).div(priceUnit);
        newEthValue = ethers.utils.formatUnits(newValueInEth, "wei");
      }

      return newEthValue;
    }
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
      betonomicsEventContractAddresses[chainId][0],
      abiBetonomicsEvent,
      signer
    );

    const gasPrice = await provider.getGasPrice();
    // console.log(gasPrice.toString());
    // const increasedGasPrice = gasPrice.mul(115).div(100);
    // console.log(increasedGasPrice.toString());
    const addingAllWinnings = await betonomicsChainContract.makeMatchPrediction(
      props.matchId,
      props.chosenOutcome,
      chainId,
      props.matchDate,
      props.participatingTeams,
      props.title,
      props.place,
      props.sportType,
      {
        //maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei'),
        gasPrice: gasPrice,
        // gasLimit: ethers.utils.parseUnits("1000000", "wei"),
        value: ethTransformer(props.betValue),
        //maxFeePerGas: ethers.utils.parseUnits('2.5', 'gwei'),
      }
    );
  }

  const submit = (e) => {
    e.preventDefault();
    handleFakeDataUpdateChildren();
    updateUI();
    // runContractFunction();
    //updateDbAfterDelay();
  };

  if (!props.show || props.lowFunds) {
    return null;
  }

  return (
    <div className="modal-new">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Bet confirmation</h4>
        </div>
        <div className="modal-body">
          You are making a bet of 💰{props.betValue}$ for {props.chosenOutcome}
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

export default BetonomicsModal;
