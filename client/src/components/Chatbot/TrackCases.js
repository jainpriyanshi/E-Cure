import React from "react";
import "./InitialOptions.css";

const TrackCases = (props) => {
  const options = [
    { text: "India", handler: props.actionProvider.handleIndiaCovidCases, id: 1 },
    { text: "State wise", handler: props.actionProvider.handleStateCovidCases, id: 2 },
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

export default TrackCases;
