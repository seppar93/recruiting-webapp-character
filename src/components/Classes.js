import React from "react";
import ClassItem from "./ClassItem";
import { CLASS_LIST } from "../consts.js";

import PropTypes from "prop-types";

const Classes = ({ attributes }) => {
  const checkClassRequirements = (minAttributes) =>
    Object.entries(minAttributes).every(
      ([attr, value]) => attributes[attr] >= value
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Classes</h2>
      {Object.entries(CLASS_LIST).map(([name, minAttributes]) => (
        <ClassItem
          key={name}
          name={name}
          minAttributes={minAttributes}
          meetsRequirements={checkClassRequirements(minAttributes)}
        />
      ))}
    </div>
  );
};

Classes.propTypes = {
  attributes: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Classes;
