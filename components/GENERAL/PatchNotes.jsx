export default function PatchNotes() {
  return (
    <>
      <div className="container text-white mt-4 px-4">
        <h1>Patch 0.2.1.5c notes 12.10.2023</h1>
        <ul>
          • Sport icon now preserve their aspect ratio across all viewports
        </ul>
        <ul>
          • Sometimes on wider screens match information was not displayed as
          inteded. Now it is fixed
        </ul>
        <ul>• Aplied dark theme to paginators</ul>
        <h1>Patch 0.2.1.5b notes 11.10.2023</h1>
        <ul>
          • Fixed a loader bug that was preventing it from showing up in certain
          cases{" "}
        </ul>
        <h1>Patch 0.2.1.5a notes 9.10.2023</h1>
        <ul>
          • Updated fantasy score schema to be more fair towards carry players
        </ul>
        <ul>• Kill from 4 to 5 points</ul>
        <ul>• Assists from 4 to 2.5 </ul>
        <ul>• Last hits from 0.006 to 0.015</ul>
        <ul>• GPM from 0.006 to 0.015</ul>
        <ul>• Tower damage from 0.0006 to 0.0018</ul>
        <ul>• Roshan kills from 2 to 5</ul>
        <ul>• Observer wards placed from 2 to 1.5</ul>
        <ul>• Sentry wards placed from 0.5 to 1.1</ul>
        <ul>• Denies from 0.004 to 0.45</ul>
        <ul>• Camps stacked from 0.5 to 1.2</ul>
        <ul>• Runes picked up from 0.8 to 1</ul>
        <ul>• Courier kills from 1.5 to 3</ul>
        <ul>• Observer wards killed from 1.5 to 2</ul>
        <ul>• Sentry wards killed from 0.3 to 1.2</ul>
        <ul>
          • In general supports were a bit overtuned - getting too much free
          score from assists and vision
        </ul>
        <ul>
          • Created Discord community server and added links to it in the Social
          tab
        </ul>

        <h1>Patch 0.2.1.5 notes 8.10.2023</h1>
        <ul>• Further UI improvements</ul>
        <ul>• Updated color scheme</ul>
        <ul>• Updated instructions for new color scheme</ul>
        <ul>• Improved support of small viewport devices</ul>
        <ul>• Fixed Leaderboard display bug for users with numeric names</ul>
        <ul>• Removed old loaders</ul>

        <h1>Patch 0.2.1.4 notes 3.10.2023</h1>
        <ul>• Fixed various UI elements looks/positioning</ul>
        <ul>• Reintroduced animated loaders for critical components</ul>
        <ul>• Added pop-up confirmation for a succesfull prediction</ul>

        <h1>Patch 0.2.1.3 notes 1.10.2023</h1>
        <ul>• Normalized css for unified look on all platforms</ul>
        <ul>• Fixed fantasy-score calculation bug</ul>
        <ul>
          • Paginators now only displayed if there are more than 1 page of
          content available
        </ul>
        <h1>Patch 0.2.1.2 notes 30.09.2023</h1>
        <ul>• Made a big visual overhaul standardizing UI</ul>
        <ul>• Introduced adaptive UI-scaling</ul>
        <ul>• Various frontend and backend fixes</ul>
        <h1>Patch 0.2.1.1 notes 24.09.2023</h1>
        <ul>• Fixed UI scaling for mobile view</ul>
        <ul>• Modal windows are now rendered correctly in mobile view</ul>
        <ul>• Some frontend and backend fixes</ul>
        <ul>
          • Hero search bar is now getting focued after a hero is selected{" "}
        </ul>
        <h1>Patch 0.2.1.0 notes 23.09.2023</h1>
        <ul>• Added mobile version for phone users</ul>
        <ul>• Rebuilt hero selector to improve user experience</ul>

        <ul>• Various frontend and backend fixes</ul>
        <h1>Patch 0.2.0.3 notes 18.09.2023</h1>
        <ul>
          • Added more than 500 more new teams to the database so many more
          matches will be created
        </ul>
        <ul>
          • Tweaked various UI elements added since 0.2 patch to imporve
          visibility
        </ul>
        <h1>Patch 0.2.0.2 notes 07.09.2023</h1>
        <ul>• Improved match resolver robustness</ul>
        <ul>
          • Changed Leaderboard display logic to improve new user experience
        </ul>
        <h1>Patch 0.2.0.1 notes 05.09.2023</h1>
        <ul>• Integrated ReCaptcha</ul>
        <ul>• Added profanity filter for usernames</ul>
        <ul>• Fixed date display bug in Your Bets</ul>

        <h1>Patch 0.2 notes 03.09.2023</h1>
        <ul>• Temporarily diasbled web3 interfaces</ul>
        <ul>• Temporarily diasbled Parimutuel, Betonomics and Arbiter modes</ul>
        <ul>• Implemented custom authentification wihtout web3 components</ul>
        <ul>
          • Changed Fantasy Coach mode logic - now points are accumulated during
          a week and top 3 users are awarded at the end of each week
        </ul>
        <ul>• Updated UI with a new Leaderboard tab and its subtabs</ul>
        <ul>• Numerous UI and bug-fixes</ul>
        <ul>• Added Contacts block in the footer</ul>

        {/* <h1>Patch 0.1.4.4 notes 18.06.2023</h1>
        <ul>• Updated WalletConnect SDK from V1 to V2</ul>
        <ul>• Many more wallets are supported now</ul>
        <ul>• Platform is now usable on mobile but not optimized for it yet</ul>

        <h1>Patch 0.1.4.3 notes 12.06.2023</h1>
        <ul>• Temporarily disabled Parimutuel and Fantasy game-modes</ul>
        <ul>• Implemented platform intro view</ul>

        <h1>Patch 0.1.4.2 notes 02.06.2023</h1>
        <ul>• Increased title length for Betonomics event to better fit UI</ul>
        <ul>• Added a tooltip for longer Betonomics titles</ul>
        <ul>
          • Implemented a system to prevent users from submitting edited events
          without all the required data
        </ul>
        <ul>
          • Changed display logic for Arbiter events so that events with no bets
          are no longer elegible for arbitering
        </ul>
        <h1>Patch 0.1.4.1 notes 31.05.2023</h1>
        <ul>• Various UI fixes to improve readability and ergonomics</ul>
        <ul>• Added additional sports/categories for all types of events</ul>
        <ul>• Introduced additional tooltips to improve new user experience</ul>
        <ul>• Implemented contract event systems</ul>
        <ul>• Various bug fixes</ul>
        <ul>
          • Reworked claiming architecture for greater stability and security
        </ul>
        <ul>• Improved claiming load times by up to 95%</ul>
        <ul>
          • Greatly decreased time between making a bet/creating event and
          seeing updates on the platform from 7-15 minutes to ~15 seconds
        </ul>
        <ul>• Improved support for higher screen resolutions</ul>
        <ul>
          • Added support for lower resolutions including devices with pixel
          ratios greater than 1 to improve experience for affected users
        </ul>
        <ul>• Improved copywriting for long texts to improve readability</ul>

        <h1>Patch 0.1.4.0 notes 02.05.2023</h1>
        <ul>
          • Added 2 new modes - &quot;Betonomics&quot; and &quot;Arbiter&quot;
          including all corresponding integrations
        </ul>
        <ul>
          • Updated How To Play page to include instructions for new modes
        </ul>
        <ul>• Updated Fantasy Coach bets to only require 1 MVP instead of 2</ul>
        <ul>
          • Fixed modal confirmation windows producing twice as many Metamask
          pop-ups
        </ul>
        <ul>• Improved winnings amount display precision</ul>
        <ul>• Introduced various security features</ul>
        <ul>
          • Implemented UI loaders to improve UX when waiting for data to fetch
        </ul>
        <ul>• Added various UX improvements to Your Bets tab</ul>
        <ul>
          • Changed claiming architecture to improve security and scalability
        </ul>
        <ul>• Improved paginators behavior in certain edge cases</ul>
        <ul>
          • Introduced changes preventing users from submitting bets without all
          the needed information
        </ul>
        <ul>• Added platform clock to improve UX</ul>
        <ul>
          • Implemented a system to cache match data after a bet is made,
          Drasctically improving time to see new bet in the total pool of a
          corresponding match{" "}
        </ul>
        <ul>• Released full support for 1920 x 1080 resolution</ul>
        <ul>
          • Released alpha support for 2560 x 1440 resolution, please submit any
          display bugs if you use this resolution
        </ul>

        <h1>Patch 0.1.3.0 notes 10.02.2023</h1>
        <ul>
          • Added new mode - &quot;Fantasy Coach&quot; and all corresponding
          integrations
        </ul>
        <ul>• Reworked Parimutuel match window</ul>
        <ul>• Added Potential winnings block to Parimutuel match window</ul>

        <ul>• Introduced side menu to switch between modes</ul>
        <ul>• Applied various stability and security features</ul>
        <ul>• Drasctically imporved loading times - up to 95%</ul>
        <ul>• Various UI and readability fixes</ul>
        <ul>• Introduced pagination mechanism</ul>
        <ul>• Added &quot;How to play&quot; page</ul>

        <h1>Patch 0.1.2.0 notes 19.11.2022</h1>
        <ul>• Intorduced L2 scaling</ul>
        <ul>• Introduced support for betting on any EVM-supported network</ul>
        <ul>
          • Introduced &quot;Claim Winnings&quot; tab with its UI elements
        </ul>
        <ul>• Introduced &quot;FAQ&quot; page</ul>
        <ul>
          • Added contract and UI rigidity to allow for more user-friendly
          experience
        </ul>
        <ul>• Added multiple contract features for event management</ul>
        <ul>• Introduced sports filter/selector</ul>
        <ul>
          • Added sport icons to help distinguish between different events
        </ul>
        <ul>• Scaled down the UI to improve ergonomics</ul>
        <ul>• Various bug fixes</ul>

        <h1>Patch 0.1.1.0 notes 23.07.2022</h1>
        <ul>
          • Prop optimization to reduce load in non-static front-end version
        </ul>
        <ul>• Added responsiveness to UI to account for different screens</ul>
        <ul>
          • Fixed critical contract bug that prevented from sending winnings in
          certain cases
        </ul>
        <ul>• Added requirement of maximum 1 bet per match for each user</ul>
        <ul>• Added ETH price feed from Chainlink</ul>
        <ul>• Dev data is now only seen by the admins</ul>
        <ul>• Added various UI improvements</ul>
        <ul>• Added styling to various UI elements</ul>
        <ul>
          • Improved login procedure to allow working with multiple networks
        </ul>
        <ul>• Added UI elements for improved login procedure</ul>
        <ul>• Added support for mobile web3-enabled browsers</ul>
        <ul>• Introduced &apos;Patch notes&apos; page</ul> */}
      </div>
    </>
  );
}
