import { useWeb3Contract } from "react-moralis";
import contractAddresses from "../../../constants/contractAddresses.json";
import abiEvent from "../../../constants/abiEvent.json";

import React from "react";
export default function CancelMatch() {
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  //console.log(`ChainId is ${chainId}`)
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [formData, setFormData] = React.useState({
    eventNumber: 0,
  });

  const eventOptions = {
    abi: abiEvent,
    contractAddress: universalContractAddress,
    functionName: "cancelEvent",
    params: {
      eventNumber: formData.eventNumber,
    },
  };

  const { runContractFunction, isFetching, isLoading } =
    useWeb3Contract(eventOptions);

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

  function handleSubmit(event) {
    event.preventDefault();
    //ViewThings()
    // TransferAmount()
    runContractFunction();
    console.log(`executed cancelEvent for eventNumber ${formData.eventNumber}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="close-match-card">
          <div className="close-match-card-title">CANCEL event</div>
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
    </>
  );
}
