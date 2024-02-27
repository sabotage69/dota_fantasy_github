import React from "react";

export default function MatchesPagesContainer(props) {
  /// 8 records per page due to parent container
  //   console.log(props.matchesData);
  //   console.log(props.nPages);
  //   console.log(props.currentPage);
  let records_per_page = 6;

  let cards_for_display = [];
  for (let i = 0; i < records_per_page; i++) {
    // console.log(i);
    // console.log(props.currentPage * records_per_page + i - records_per_page);
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
