import React, { useState, useRef, useEffect } from "react";
import dotaHeroes from "../../constants/dotaHeroes.json";

function AutocompleteField({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionListRef = useRef(null); // Reference to the suggestion list
  const inputRef = useRef(null); // Reference to the input field

  // Function to handle input changes and filter heroes
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    // Filter heroes based on the input value
    const filteredHeroes = dotaHeroes
      .filter((hero) => hero.name.toLowerCase().includes(value))
      .slice(0, 6); // Limit to a maximum of 6 items

    setSuggestions(filteredHeroes);
  };

  // Function to handle suggestion selection
  const handleSuggestionClick = (selectedHero) => {
    setInputValue(""); // Clear the input field
    setSuggestions([]); // Clear suggestions
    onSelect(selectedHero); // Call the onSelect callback
    inputRef.current.focus(); // Focus the input field again
  };

  // Event listener to close suggestion list when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionListRef.current &&
        !suggestionListRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search for a hero..."
        value={inputValue}
        className="autocomplete-input"
        onChange={handleInputChange}
        ref={inputRef} // Set the ref to the input element
      />
      {suggestions.length > 0 && (
        <div className="autocomplete-suggestion-list" ref={suggestionListRef}>
          {suggestions.map((hero) => (
            <div
              className="autocomplete-suggestion"
              key={hero.id}
              onClick={() => handleSuggestionClick(hero)}
            >
              {hero.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteField;
