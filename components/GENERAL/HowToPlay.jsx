import Link from "next/link";

export default function HowToPlay() {
  return (
    <div className="how-to-play-wrapper">
      <div className="howtoplay-container">
        <h1>How to play?</h1>
        <h2>Game modes</h2>
        <ul>
          • There currently are 4 game modes: Parimutuel, Fantasy Coach,
          Betonomics and Arbiter. Game modes Parimutuel, Betonomics and Arbiter
          are currently available only for super-testers.
        </ul>
        {/* <ul>• To choose a game mode use the menu on the left.</ul>
        <br></br>
        <br></br>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/menu1.png"}
        ></img> */}
        {/* <br></br> <br></br>
        <h2>Parimutuel</h2>
        <ul>
          • If you&apos;re new to sports betting, you may have not heard of
          parimutuel betting. This type of betting allows users to place
          traditional bets on the outcome of events, such as a football match or
          a horse race. However, unlike other types of betting, there are no set
          coefficients to determine winnings. Instead, the amount of money bet
          on each outcome determines the winnings. The less popular an outcome
          is, the more money there is to be won.
          <br></br>
          <br></br>
          Here&apos;s how it works: let&apos;s say there&apos;s a football match
          between Chelsea and Liverpool, and you believe that Chelsea will win.
          You bet $9 on Chelsea to win. If the total amount of bets made on the
          match is $120, and $25 of that total was bet on Chelsea to win, then
          the share of bets made on Chelsea is 25/120. If Chelsea wins the
          match, you&apos;ll take home a portion of the total bets made on
          different outcomes, based on the proportion of bets you placed. In
          this case, your winnings would be 9 / 25 * 120 = $43.20. Pretty cool,
          right?
          <br></br>
          <br></br>
        </ul>
        <ul>
          To make a bet you need to:
          <br></br>
          <br></br>
          1. Choose the outcome you want to bet on for your desired event.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/p1.png"}
        ></img>
        <ul>
          2. Enter your bet amount in the text field, or use the up/down arrows
          in the field if you prefer. Then, click on the &lsquo;Submit&lsquo;
          button.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/p2.png"}
        ></img>
        <ul>
          3. You will receive a confirmation pop-up to verify that your bet
          details are correct. Once you confirm, your web3 extension like
          Metamask will open a new window to complete the on-chain transaction.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/p3.png"}
        ></img>
        <ul>
          4. Congratulations! You&apos;ve successfully placed your bet. Now, all
          you have to do is wait for the match to finish. If your prediction is
          correct, you can collect your winnings. Please allow the system 10-15
          minutes to process the results before claiming your winnings.
        </ul> */}
        <h2>Fantasy Coach</h2>
        <ul>
          • Fantasy Coach mode allows you to step into the shoes of your
          favorite team&apos;s coach. Predict which players will have the most
          impact on the game and earn points. At the end of each week users with
          the most points get rewards from the platform.
          <br></br>
          <br></br>
          Here&apos;s how it works: for each correct prediction on the hero used
          in the series by your favorite team, you&apos;ll earn 30 points. Your
          chosen MVPs are your main sources of points, and every action they
          take towards winning - like killing enemy heroes, setting wards, or
          doing tower damage - earns them more points. At the end of the series,
          each prediction is evaluated according to this formula: 30 x correct
          hero prediction + MVP score.
          <br></br>
          <br></br>
          {/* The users with the highest scores are awarded according to the
          following scheme:
          <br></br>
          <br></br>
          <img
            className="how-to-play-parimituel"
            alt=" "
            src={"/howtoplay/f_schema.png"}
          ></img>
          <br></br> <br></br>
          For example, let&apos;s say there&apos;s a match between PSG.LGD and
          Team Spirit and the total pool of predictions made is $2,000. If you
          take first place, you win 30% of the total pool - that&apos;s a
          whopping $600!
          <br></br> <br></br>
          If two or more players tie for the same score and achieve a winning
          place, their winnings are divided equally. If there are less than 10
          winners, a scheme favoring first place may be applied, and in some
          cases, earning first place can award winnings equal to 70% of the
          prediction pool. */}
        </ul>
        <ul>
          This is a step-by-step guide on how to make a prediction in the
          Fantasy Coach mode:
          <br></br>
          <br></br>
          1. Click the black arrow on the match object to expand the match you
          want to predict on.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/fantasy1.png"}
        ></img>
        <ul>2. Choose the team you want to forecast for.</ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/fantasy2.png"}
        ></img>
        <ul>
          3. Predict their draft by typing hero names in the text field. The
          number of heroes you need to predict is dependent on the length of the
          series. If you need to correct your predictions, press RESET to start
          again.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/fantasy3.png"}
        ></img>
        <ul>4. Choose a match MVP for your chosen team.</ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/fantasy4.png"}
        ></img>
        <ul>
          5. Press SUBMIT button. A popup will appear where you can check your
          prediction and confirm it by pressing CONFIRM button again.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/fantasy5.png"}
        ></img>
        <ul>6. Wait until the match finishes to check your points.</ul>
        <br></br> <br></br>
        {/* <h2>Betonomics</h2>
        <ul>
          • Betonomics is a mode that allows users to create their own events
          that are not available on the platform, and reward event creators,
          event participants, and arbiters. Event creators are responsible for
          creating the event by providing details such as the name, description,
          participants, and date. They receive 4% of the total amount of bets
          made on the event as a reward for their work. Participants of the
          event can bet on the outcome of the event and the amount of money they
          want to bet. Participants who bet on the correct outcome of the event
          receive winnings. Arbiters are responsible for verifying the outcome
          of the event, and they receive 6% of the total amount of bets made on
          the event as a reward for their work.
          <br></br>
          <br></br>
          Only events with public outcomes should be created as betonomics
          events. This allows all arbiters to verify the outcome of the event.
          For example, football matches or political events with publicly
          available outcomes are good candidates for betonomics events. Private
          events, such as bets between two friends, are not good candidates for
          betonomics events. If an event is not satisfying the above criteria,
          it will be removed from the platform.
          <br></br>
          <br></br>
          As an example, if a user creates an event for the next US presidential
          election, and during its time on the platform, the event gathers $1000
          in bets. The event creator will receive 4% of that amount, which is
          $40. Arbiters who verified the outcome of the event will share 6% of
          that amount, which is $60. The remaining $900 will be distributed
          among the participants who bet on the correct outcome. It should be
          noted that creators and arbiters can also bet on the event themselves.
          <br></br>
          <br></br>
        </ul>
        <ul>
          To create an event you need to:
          <br></br>
          <br></br>
          1. Open the &lsquo;Your Events&lsquo; tab and click on &lsquo;Create
          New Betonomics Event&lsquo;.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/betonomics1.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          2. Enter all the required information about the event, including the
          name, description, participants, date, and any other relevant details.
          Make sure to use the platform time when creating the event.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/betonomics2.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          3. Click &lsquo;Create&lsquo; to finalize the event. Confirm the
          transaction in your web3 extension. Wait for the event to appear on
          the platform, which should take around 30 seconds. In rare cases, it
          may take up to 15 minutes.
        </ul>
        <ul>
          <br></br>
          <br></br>
          To bet on Betonomics event you need to:
          <br></br>
          <br></br>
          1. Click on &lsquo;Betonomics&lsquo; in the menu on the left side of
          the screen.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/betonomics3.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          2. Select the desired event from the list of available events and
          expand it by clicking on the arrow on the right side of the event.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/betonomics4.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          3. Choose the outcome of the event and the amount of money you want to
          bet. Press the &lsquo;Submit&lsquo; button to confirm your bet. After
          pressing &lsquo;Submit&lsquo; you will be asked to confirm the
          transaction first in a pop-up window from the platform and then in
          your web3 extension.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/betonomics5.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          To arbiter a Betonomics event you need to:
          <br></br>
          <br></br>
          1. Click on &lsquo;Arbiter&lsquo; in the menu on the left side of the
          screen.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/arbiter1.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          2. Select the desired event from the list of available events and
          expand it by clicking on the arrow on the right side of the event.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/arbiter2.png"}
        ></img>
        <ul>
          <br></br>
          <br></br>
          3. Select the outcome of the event and press &lsquo;Submit&lsquo; to
          confirm.
        </ul>
        <img
          className="how-to-play-parimituel"
          alt=" "
          src={"/howtoplay/arbiter3.png"}
        ></img> */}
        <Link href="/">
          <div className="start-playing">Start playing!</div>
        </Link>
      </div>
    </div>
  );
}
