import React from "react";

export default function BetonomicsPagesContainer(props) {
  let records_per_page = 8;

  let cards_for_display = [];
  for (let i = 0; i < records_per_page; i++) {
    if (
      props.matchesData[
        props.currentPage * records_per_page + i - records_per_page
      ]
    ) {
      cards_for_display.push(
        props.matchesData[
          props.currentPage * records_per_page + i - records_per_page
        ]
      );
    }
  }
  // console.log(cards_for_display);
  return <>{cards_for_display}</>;
}
