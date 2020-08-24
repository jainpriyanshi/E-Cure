import React from "react";
import "./InitialOptions.css";

const SearchDoctor = (props) => {
  const options = [
    { text: "ENT",  handler: props.actionProvider.handleENTDoctor, id: 1 },
    { text: "Cardiac", handler: props.actionProvider.handleCardiacDoctor, id: 2 },
    { text: "Neurologist", handler: props.actionProvider.handleNeurologistDoctor, id: 3 },
    { text: "Dermatologist", handler: props.actionProvider.handleDermatologistDoctor , id: 4 },
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
