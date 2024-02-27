import { useEffect, useRef, useState } from "react";
import React from "react";

import MatchFantasyContainer from "./MatchFantasyContainer";
import { FakeBetContext } from "../FakeBetContext";

export default function MobileBettingDeck({
  fantasyMatchCount,
  fantasyMatchNumbers,
  fantasyMatchTypes,
  fantasyMatchesData,
  loading,
  intro,
  fiat_demo,
  user,
  updateDataAfterBet,
}) {
  const sportsOptions = [
    // { value: "soccer", label: "Soccer" },
    { value: "dota", label: "Dota 2" },
    // { value: "tennis", label: "Tennis" },
    { value: "csgo", label: "CS:GO" },
    // { value: "polytics", label: "Polytics" },
    // { value: "twitch", label: "Twitch" },
    // { value: "world", label: "World" },
    // { value: "other", label: "Other" },
  ];

  // const Option = (props) => {
  //   return (
  //     <div>
  //       <components.Option {...props}>
  //         <input type="checkbox" checked={isSelected} onChange={() => null} />{" "}
  //         <label>{label}</label>
  //       </components.Option>
  //     </div>
  //   );
  // };

  const [sportsSelectorState, setSportsSelectorState] = React.useState({
    optionSelected: [
      // { value: "economics", label: "Economics" },
      // { value: "esports", label: "E-sports" },
      { value: "csgo", label: "CS:GO" },
      { value: "dota", label: "Dota 2" },
      // { value: "soccer", label: "Football" },
      // { value: "politics", label: "Politics" },
      // { value: "sports", label: "Sports" },
      // { value: "tennis", label: "Tennis" },
      // { value: "twitch", label: "Twitch" },
      // { value: "other", label: "Other" },
      // { value: "world", label: "World" },
    ],
    isFocused: true,
  });

  function handleChange(selected) {
    setSportsSelectorState((prev) => {
      return { ...prev, optionSelected: selected };
    });
  }

  var currentlySelectedTypesList = [];

  for (let i = 0; i < sportsSelectorState.optionSelected.length; i++) {
    currentlySelectedTypesList.push(
      sportsSelectorState.optionSelected[i]["value"]
    );
  }

  function duplicateIndexes(arr, el) {
    if (!Array.isArray(arr)) {
      return [];
    }

    let duplicate = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === el) {
        duplicate.push(i);
      }
    }
    return duplicate;
  }

  let chosenMatchTypes = [];
  let chosenFantasyMatchTypes = [];

  // console.log(matchTypes);

  for (let i = 0; i < sportsSelectorState.optionSelected.length; i++) {
    let d = duplicateIndexes(
      fantasyMatchTypes,
      sportsSelectorState.optionSelected[i]["value"]
    );
    for (let j = 0; j < d.length; j++) {
      chosenMatchTypes.push(d[j]);
    }
  }

  for (let i = 0; i < sportsSelectorState.optionSelected.length; i++) {
    let d = duplicateIndexes(
      fantasyMatchTypes,
      sportsSelectorState.optionSelected[i]["value"]
    );
    for (let j = 0; j < d.length; j++) {
      chosenFantasyMatchTypes.push(d[j]);
    }
  }

  const [gameMode, setGameMode] = React.useState({
    currentMode: "fantasy-coach",
  });

  const modeProps = {
    "fantasy-coach": {
      component: MatchFantasyContainer,
      props: {
        matchTypes: fantasyMatchTypes,
        matchCount: fantasyMatchCount,
        matchesData: fantasyMatchesData,
        chosenMatchTypes: sportsSelectorState.optionSelected,
        loading: loading,
        intro: intro,
        fiat_demo: fiat_demo,
        user: user,
        updateDataAfterBet: updateDataAfterBet,
        isMobile: true,
      },
    },
  };

  // Render the component for the current mode
  const ModeComponent = modeProps[gameMode.currentMode].component;
  const modePropsForComponent = modeProps[gameMode.currentMode].props;

  const menuPortalTargetRef = useRef(null);

  useEffect(() => {
    if (menuPortalTargetRef.current && typeof document !== "undefined") {
      // Pass the element only when it's available
      menuPortalTargetRef.current.appendChild(document.createElement("div"));
    }
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to handle the window resize event
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add an event listener for the window resize event
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // The empty array [] ensures this effect runs only once, like componentDidMount

  return (
    <>
      <div className={"betting-deck-container-mobile "}>
        {/* <div className="betting-deck-head-container-mobile">
          <div className="betting-deck-title">Betting Deck</div>
        </div> */}

        <div className="menu-and-match-container">
          <FakeBetContext.Consumer>
            {({ onDataUpdate }) => (
              <>
                <ModeComponent {...modePropsForComponent} />
              </>
            )}
          </FakeBetContext.Consumer>
        </div>
      </div>
    </>
  );
}
