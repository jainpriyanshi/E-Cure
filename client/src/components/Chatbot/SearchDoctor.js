import React from "react";
import "./InitialOptions.css";

const SearchDoctor = (props) => {
  const options = [
    { text: "ENT", handler: () => {}, id: 1 },
    { text: "Cardiac", handler: () => {}, id: 2 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default SearchDoctor;
