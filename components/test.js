import { useEffect, useRef } from "react";
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

  return (
    <>
      <div className="betting-deck-container">
        <div className="betting-deck-head-container">
          <div className="betting-deck-title">Betting Deck</div>
        </div>

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
