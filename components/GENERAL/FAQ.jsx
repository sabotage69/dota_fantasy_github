import React from "react";
import "reactjs-popup/dist/index.css";
import { useEffect, useState, useRef } from "react";

export default function FAQ() {
  const [currentIsMobile, setCurrentIsMobile] = useState(null);

  useEffect(() => {
    // Check if we are on the client-side (browser) before accessing the window object
    if (typeof window !== "undefined") {
      setCurrentIsMobile(window.innerHeight > window.innerWidth);
    }
  }, []); // Empty dependency array ensures the code runs once after component mount

  return (
    <>
      <div className="container text-white text-16 mt-5 pt-3 pb-5">
        <h1>Frequently Asked Questions</h1>

        <h2>How to predict?</h2>
        <ul>
          <li>
            Open any event in Betting Deck tab, choose the team you want to
            predict for, pick your match MVP, then draft the heroes you think
            will be picked during the series. After that press Submit.
          </li>
          <li>
            You can receive help from the system by click on Help in the match
            card.
          </li>
        </ul>

        <h2>How are fantasy player scores calculated?</h2>
        <ul>
          <li>
            Player scores are calculated based on their in-game actions, here is
            a detailed list of the actions and their respective scores:
          </li>
          <ul>• Hero Kills award 5 points</ul>
          <ul>• Kill assists award 2.5 points</ul>
          <ul>• Each last hit is 0.015</ul>
          <ul>
            • Each point of GPM at the end of the match awards 0.015 points
          </ul>
          <ul>• Each point of tower damage is 0.0018 points</ul>
          <ul>• Each Roshan kill bring 5 points</ul>
          <ul>• Placing an observer wards gives 1.5</ul>
          <ul>• Placing a sentry wards gives 1.1</ul>
          <ul>• Each creep deny is 0.45</ul>
          <ul>• For each neutral camp stacked player receives 1.2 points</ul>
          <ul>• Each rune picked up awards 1 point</ul>
          <ul>• Courier kills award 3 points per courier killed</ul>
          <ul>• Observer wards kills are 2 points per ward</ul>
          <ul>• Sentry wards kills are 1.2 points per ward</ul>
        </ul>

        <h2>How are user scores calculated?</h2>
        <ul>
          <li>
            After the match each participant receives a score based on their
            predictions.
          </li>
          <li>
            Match scores are calculated like this = MVP score + 30 points per
            correct hero drafted prediction.
          </li>
          <ul>• Whoever gets the highest score at the end of the week wins</ul>
        </ul>

        <h2>What events are available?</h2>
        <ul>
          <li>
            Events are created when most of the data for the event is available,
            allowing the system to automatically resolve them.
          </li>
          <li>
            New events are created roughly every hour, but at least 24 hours
            before the event&apos;s start time if both teams are already
            determined.
          </li>
        </ul>

        <h2>Can I remake my prediction?</h2>
        <ul>
          <li>
            Yes, making a new bet on the match will overwrite the previous bet
            if you changed your mind before the match has started
          </li>
          <li>Once the event starts, no additional bets can be placed.</li>
          <li>
            Events are automatically resolved after the match ends,
            approximately every 10 minutes.
          </li>
        </ul>

        <h2>When are results determined?</h2>
        <ul>
          <li>
            Most events are resolved automatically after the match ends,
            approximately every 10 minutes. Sometimes matches have to be
            resolved manually, then it can take up to 24 hours, but usually only
            a few hours.
          </li>
          <li>
            Winners are determined after the results for each match are added up
            at the end of the week.
          </li>
        </ul>

        <h2>Prizes</h2>
        <ul>
          <li>
            MasterBetter contacts elegible users via email to arrange the
            delivery of winnings.
          </li>
          <li>
            You can add or update your email by going to the menu in top-right
            corner and clicking Account.
          </li>
          <li>Prizes are determined by the administration each week.</li>
          <li>Each winner gets a mystery skin of a known quality.</li>
          <li>
            Prizes are delivered within 30-40 days after the winners are known
            due to Steam Trade limitations.
          </li>
          <li>
            In case there are two or more players at 1-st, 2-nd or 3-rd, winners
            for those particular places are determined by their seeding next
            week. For example - Players A and B get 1-st palce with 10 points
            both, Player C gets 2-nd place with 7 and player D gets 3-rd with 5.
            Players C and D get their prizes according to the rules, but players
            A and B will get their prizes next week, when their place will be
            determined.
          </li>
        </ul>

        <h2>Fees</h2>
        <ul>
          <li>Master Better is completely free to use for all users.</li>
        </ul>
        <h2>Support</h2>
        <ul>
          <li>
            In case you have question regarding your prizes or just want to chat
            with other masterbettors - go to community Discord server, by
            clicking Menu in the top right, then Social and then on Discord
            icon.
          </li>
        </ul>
      </div>
    </>
  );
}
