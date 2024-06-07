import React from 'react';
import PropTypes from 'prop-types';

// UI component
const SkillRow = ({ name, points, increment, decrement, modifier, total }) => (
  <div className="flex items-center mb-4">
    <span className="w-32">{name}: {points} (Modifier: {modifier}) Total: {total}</span>
    <button className="bg-gray-200 px-2 py-1 mx-2" onClick={decrement}>-</button>
    <button className="bg-gray-200 px-2 py-1 mx-2" onClick={increment}>+</button>
  </div>
);

SkillRow.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  modifier: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default SkillRow;
