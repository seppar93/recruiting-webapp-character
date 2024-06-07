import React from "react";
import { useAttributes } from "../hooks/useAttributes";
import AttributeRow from "./AttributeRow";

const Attributes = () => {
  const { attributes, increment, decrement, calculateModifier } =
    useAttributes();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Attributes</h2>
      {Object.entries(attributes).map(([name, value]) => (
        <AttributeRow
          key={name}
          name={name}
          value={value}
          modifier={calculateModifier(value)}
          increment={() => increment(name)}
          decrement={() => decrement(name)}
        />
      ))}
    </div>
  );
};

export default Attributes;
