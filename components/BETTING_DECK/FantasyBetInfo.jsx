import React from "react";
import sportIcons from "../../constants/iconsSports.json";
import Tooltip from "../GENERAL/Tooltip.jsx";
import FantasyMakeABet from "./FantasyMakeABet";
import { Card, Accordion, Button } from "react-bootstrap";

export default function FantasyBetInfo({
  matchNumber,
  matchType,
  current_match_payload,
  user,
  updateDataAfterBet,
  isMobile,
  id,
}) {
  var date = new Date(current_match_payload[5] * 1000);
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();
  var hour = date.getUTCHours();
  var minute = date.getUTCMinutes();

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const unix_now = getTimestampInSeconds();

  const difference_in_unix = parseInt(current_match_payload[5]) - unix_now;
  // console.log(difference_in_unix);

  const difference_in_hours = Math.round(difference_in_unix / 60 / 60);
  const difference_in_minutes = Math.round(difference_in_unix / 60);
  // console.log(difference_in_hours);

  var formattedTime = hour + ":" + minute + " " + day + "-" + month;

  var sliced_hometeam_array = current_match_payload[1].split("___");
  var sliced_awayteam_array = current_match_payload[3].split("___");

  const [expandedViewState, setExpandedViewState] = React.useState({
    expanded: false,
  });

  function handleExpandView() {
    setExpandedViewState((prevView) => ({
      ...prevView,
      expanded: !prevView.expanded,
    }));
  }

  const isWideViewport = window.innerWidth > 770;

  return (
    <>
      <Accordion className="your-bet-card-style mb-3">
        <Accordion.Item eventKey="0" className="accordion-header">
          <Accordion.Header className="accordion-header">
            <div className="row ps-0 pe-4 accordion-header white-text text-responsive">
              <div className="col-1 ps-0 pe-2">
                <img
                  className="sport-icon"
                  alt=" "
                  src={sportIcons[current_match_payload[8]]}
                  style={{
                    width: "auto",
                    height: "28px",
                  }}
                />
              </div>
              <div className="col-5 ps-2 pe-1">
                {sliced_hometeam_array[0]} - {sliced_awayteam_array[0]}{" "}
                {isWideViewport && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                )}{" "}
              </div>
              <div className="col-3 px-1">
                {difference_in_hours < 49 ? (
                  difference_in_hours < 1 ? (
                    <div>📅 in {difference_in_minutes} minutes</div>
                  ) : (
                    <div>📅 in {difference_in_hours} hours</div>
                  )
                ) : (
                  <div>📅 {formattedTime}</div>
                )}
              </div>
              <div className="col-3 px-1 text-end">
                📌{current_match_payload[6]}
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="your-bet-card-style border-0">
            <FantasyMakeABet
              current_match_payload={current_match_payload}
              hometeam_payload={sliced_hometeam_array}
              awayteam_payload={sliced_awayteam_array}
              user={user}
              updateDataAfterBet={updateDataAfterBet}
              isMobile={isMobile}
              id={id}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
