import { useWeb3Contract } from "react-moralis";

import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import contractAddresses from "../../../constants/contractAddresses.json";
import abiSidechainBetting from "../../../constants/abiSidechainBetting.json";

import mfContractAddresses from "../../../constants/mfContractAddresses.json";
import abiMatchFantasy from "../../../constants/abiMatchFantasy.json";

import abiBetonomicsEvent from "../../../constants/abiBetonomicsEvent.json";
import betonomicsEventContractAddresses from "../../../constants/betonomicsEventContractAddresses.json";

import abiAggregator from "../../../constants/abiAggregator.json";
import aggregatorAddresses from "../../../constants/aggregatorAddresses.json";

const NEXT_PUBLIC_SIGNER_PK = process.env.NEXT_PUBLIC_SIGNER_PK;
const NEXT_PUBLIC_DEPLOYER_PK = process.env.NEXT_PUBLIC_DEPLOYER_PK;

export default function ContractBalances() {
  let chains_list = [80001, 11155111];

  async function contractChainBalanceLookUp(
    _chainId,
    _contractAddresses,
    _abi,
    _rpcUrl
  ) {
    const curent_contract_address = _contractAddresses[_chainId][0];
    const provider = new ethers.providers.JsonRpcProvider(_rpcUrl, _chainId);

    const wallet = new ethers.Wallet(NEXT_PUBLIC_DEPLOYER_PK, provider);
    const signer = wallet.provider.getSigner();
    const current_contract = new ethers.Contract(
      curent_contract_address,
      _abi,
      wallet
    );

    let current_message = await current_contract.checkBalance();

    return current_message;
  }

  //create a state to store the balances of all contracts

  const [contractBalances, setContractBalances] = React.useState({
    parimutuelBalances: [],
    fantasyBalances: [],
    ugeBalances: [],
    aggregatorBalances: [],
  });

  //get balance of all parimutuel contracts

  useEffect(() => {
    async function fetchData() {
      const balances = {
        parimutuelBalances: [],
        fantasyBalances: [],
        ugeBalances: [],
        aggregatorBalances: [],
      };

      for (let i = 0; i < chains_list.length; i++) {
        console.log("iterating balances lookup for chain: ", chains_list[i]);

        let current_chain = chains_list[i];
        let current_rpc_url = contractAddresses[current_chain][1];

        let parimutuel_abi = abiSidechainBetting;
        let fantasy_abi = abiMatchFantasy;
        let uge_abi = abiBetonomicsEvent;
        let aggregator_abi = abiAggregator;

        console.log("getting balance for parimutuel");
        let parimutuel_message = await contractChainBalanceLookUp(
          current_chain,
          contractAddresses,
          parimutuel_abi,
          current_rpc_url
        );

        let inted_parimutuel_message = parseInt(parimutuel_message);

        console.log("getting balance for fantasy");
        let fantasy_message = await contractChainBalanceLookUp(
          current_chain,
          mfContractAddresses,
          fantasy_abi,
          current_rpc_url
        );

        let inted_fantasy_message = parseInt(fantasy_message);

        console.log("getting balance for uge");
        let uge_message = await contractChainBalanceLookUp(
          current_chain,
          betonomicsEventContractAddresses,
          uge_abi,
          current_rpc_url
        );

        let inted_uge_message = parseInt(uge_message);

        console.log("getting balance for aggregator");

        let aggregator_message = await contractChainBalanceLookUp(
          current_chain,
          aggregatorAddresses,
          aggregator_abi,
          current_rpc_url
        );

        let inted_aggregator_message = parseInt(aggregator_message);

        balances.parimutuelBalances.push(inted_parimutuel_message);
        balances.fantasyBalances.push(inted_fantasy_message);
        balances.ugeBalances.push(inted_uge_message);
        balances.aggregatorBalances.push(inted_aggregator_message);
      }

      setContractBalances(balances);
    }

    fetchData();
  }, []);
  //get balance of all match fantasy contracts

  //get balance of all betonomics contracts

  //show balance for each contract type and chain, amount of chains is static
  //it is equal to chains_list.length
  return (
    <>
      <div className="contract-balances-container">
        <div className="contract-balances-parimutuel">
          {" "}
          Parimutuel
          {chains_list.map((chain, index) => (
            <div className="chain-balance" key={index}>
              {chain} - {contractBalances.parimutuelBalances[index] / 1e18} ETH
            </div>
          ))}
        </div>
        <br></br>
        <div className="contract-balances-fantasy">
          Fantasy
          {chains_list.map((chain, index) => (
            <div className="chain-balance" key={index}>
              {chain} - {contractBalances.fantasyBalances[index] / 1e18} ETH
            </div>
          ))}
        </div>
        <br></br>
        <div className="contract-balances-uge">
          Betonomics
          {chains_list.map((chain, index) => (
            <div className="chain-balance" key={index}>
              {chain} - {contractBalances.ugeBalances[index] / 1e18} ETH
            </div>
          ))}
        </div>
        <br></br>
        <div className="contract-balances-aggregator">
          Aggregator
          {chains_list.map((chain, index) => (
            <div className="chain-balance" key={index}>
              {chain} - {contractBalances.aggregatorBalances[index] / 1e18} ETH
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
