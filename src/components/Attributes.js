import React from 'react';
import AttributeRow from './AttributeRow';
import PropTypes from 'prop-types';
import { ATTRIBUTE_LIST } from "../consts.js";


const Attributes = ({ attributes, onIncrement, onDecrement, calculateModifier }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Attributes</h2>
      {ATTRIBUTE_LIST.map((name) => (
        <AttributeRow
          key={name}
          name={name}
          value={attributes[name]}
          modifier={calculateModifier(attributes[name])}
          increment={() => onIncrement(name)}
          decrement={() => onDecrement(name)}
        />
      ))}
    </div>
  );
};

Attributes.propTypes = {
  attributes: PropTypes.objectOf(PropTypes.number).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  calculateModifier: PropTypes.func.isRequired,
};

export default Attributes;
