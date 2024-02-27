import React, { Component } from "react";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

export default function SportsSelector() {
  const sportsOptions = [
    { value: "soccer", label: "Soccer" },
    { value: "dota", label: "Dota 2" },
    { value: "tennis", label: "Tennis" },
    { value: "csgo", label: "CS:GO" },
  ];

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const [sportsSelectorState, setSportsSelectorState] = React.useState({
    optionSelected: null,
    isFocused: true,
  });

  function handleChange(selected) {
    setSportsSelectorState(() => {
      return { optionSelected: selected };
    });
    console.log(sportsSelectorState.optionSelected);
  }

  return (
    <>
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
        // onBlur={() => { this.setState({ isFocused: false }); console.log("blurred", this.state.isFocused) }}
        // onFocus={() => { this.setState({ isFocused: true }); console.log("focused", this.state.isFocused) }}
        onBlur={() => {
          setSportsSelectorState({ isFocused: false });
        }}
        onFocus={() => {
          setSportsSelectorState({ isFocused: true });
        }}
        style={sportsSelectorState.isFocused ? { zIndex: 1 } : { zIndex: 0 }}
      >
        <ReactSelect
          options={sportsOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          onChange={handleChange}
          allowSelectAll={true}
          value={sportsSelectorState.optionSelected}
          placeholder="Select sports to filter"
          menuPortalTarget={document.body}
          classNamePrefix="mySelect"
        />
      </span>
    </>
  );
}
