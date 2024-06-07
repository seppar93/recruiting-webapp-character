import React from 'react';
import PropTypes from 'prop-types';

const ClassItem = ({ name, minAttributes, meetsRequirements, }) => {
    console.log('meetsRequirements =>', meetsRequirements)
    return (
  <div className={`p-2 my-2 cursor-pointer ${meetsRequirements ? 'bg-green-200' : 'bg-red-200'}`} >
    <h3 className="font-bold">{name}</h3>
    <p>Requirements:</p>
    <ul>
      {Object.entries(minAttributes).map(([attr, value]) => (
        <li key={attr}>
          {attr}: {value}
        </li>
      ))}
    </ul>
  </div>
    )
};

ClassItem.propTypes = {
  name: PropTypes.string.isRequired,
  minAttributes: PropTypes.objectOf(PropTypes.number).isRequired,
  meetsRequirements: PropTypes.bool.isRequired,
};

export default ClassItem;
