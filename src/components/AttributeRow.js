import React from "react";
import PropTypes from "prop-types";


const AttributeRow = ({ name, value, modifier, increment, decrement }) => (
  <div className="flex items-center mb-4">
    <span className="w-32">
      {name}: {value} (Modifier: {modifier})
    </span>
    <button className="bg-gray-500 px-2 py-1 mx-2" onClick={decrement}>
      -
    </button>
    <button className="bg-gray-500 px-2 py-1 mx-2" onClick={increment}>
      +
    </button>
  </div>
);

AttributeRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  modifier: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default AttributeRow;
