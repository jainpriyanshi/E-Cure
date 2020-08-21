import React from "react";
import "./InitialOptions.css";

const InitialOptions = (props) => {
  const options = [
    { text: "Track Cases", handler: props.actionProvider.handleTrackCases, id: 1 },
    { text: "Search Doctor", handler: props.actionProvider.handleSearchDoctor , id: 2 },
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

export default InitialOptions;
