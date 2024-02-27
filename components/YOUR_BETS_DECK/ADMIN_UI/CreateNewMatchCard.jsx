import { useWeb3Contract } from "react-moralis";

import contractAddresses from "../../../constants/contractAddresses.json";

import abiEvent from "../../../constants/abiEvent.json";

import React from "react";
export default function CreateNewMatchCard() {
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  //console.log(`ChainId is ${chainId}`)
  const universalContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [formData, setFormData] = React.useState({
    homeTeam: "",
    awayTeam: "",
    drawTeam: "",
    matchDate: "",
    sportType: "",
    place: "",
    apiId: "",
  });

  const eventOptions = {
    abi: abiEvent,
    contractAddress: universalContractAddress,
    functionName: "createMatch",
    //msgValue: 1,
    params: {
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      drawTeam: formData.drawTeam,
      matchDate: formData.matchDate,
      place: formData.place,
      sportType: formData.sportType,
      userList: [],
      apiId: formData.apiId,
    },
  };

  const { runContractFunction, isFetching, isLoading } =
    useWeb3Contract(eventOptions);

  const { runContractFunction: createMatch } = useWeb3Contract();

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
    runContractFunction();
    console.log(
      `created new match between ${formData.homeTeam} and ${formData.awayTeam} at ${formData.matchDate} in ${formData.place}`
    );
  }

  const sportsList = ["soccer", "dota", "tennis", "csgo"];

  return (
    <>
      <div className="create-new-match-card">
        <div className="create-new-match-card-title">
          <div className="create-new-match-card-title-text">
            Create new match
          </div>
        </div>
        <div className="create-new-match-form-container">
          <form className="create-new-match-form" onSubmit={handleSubmit}>
            <div className="create-new-match-hometeam">
              <input
                className="create-new-match-hometeam-form"
                type="text"
                placeholder="Hometeam"
                onChange={handleChange}
                name="homeTeam"
                value={formData.homeTeam}
              />
            </div>

            <div className="create-new-match-awayteam">
              <input
                className="create-new-match-awayteam-form"
                type="text"
                placeholder="Awayteam"
                onChange={handleChange}
                name="awayTeam"
                value={formData.awayTeam}
              />
            </div>
            <div className="create-new-match-draw">
              <input
                className="create-new-match-draw-form"
                type="text"
                placeholder="Drawteam"
                onChange={handleChange}
                name="drawTeam"
                value={formData.drawTeam}
              />
            </div>
            <div className="create-new-match-date">
              <input
                className="create-new-match-date-form"
                type="text"
                placeholder="Date"
                onChange={handleChange}
                name="matchDate"
                value={formData.matchDate}
              />
            </div>
            <div className="create-new-match-place">
              <input
                className="create-new-match-place-form"
                type="text"
                placeholder="Place"
                onChange={handleChange}
                name="place"
                value={formData.place}
              />
            </div>
            <div className="create-new-match-type">
              <select
                className="create-new-match-type-form"
                onChange={handleChange}
                name="sportType"
                value={formData.sportType}
              >
                <option>--choose---</option>
                <option value={sportsList[0]}>{sportsList[0]}</option>
                <option value={sportsList[1]}>{sportsList[1]}</option>
                <option value={sportsList[2]}>{sportsList[2]}</option>
                <option value={sportsList[3]}>{sportsList[3]}</option>
              </select>
            </div>
            <div className="create-new-match-apiid">
              <input
                className="create-new-match-apiid-form"
                type="text"
                placeholder="apiId"
                onChange={handleChange}
                name="apiId"
                value={formData.apiId}
              />
            </div>
            <div className="create-new-match-submit">
              <button className="create-new-match-submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
