import { useReducer, useCallback } from "react";
import { ATTRIBUTE_LIST } from "../consts.js";

const initialState = ATTRIBUTE_LIST.reduce((acc, attr) => {
  acc[attr] = 10;
  return acc;
}, {});

console.log('initialState =>', initialState);

const attributeReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, [action.attribute]: state[action.attribute] + 1 };
    case "decrement":
      return { ...state, [action.attribute]: state[action.attribute] - 1 };
    default:
      return state;
  }
};

export const useAttributes = () => {
  const [attributes, dispatch] = useReducer(attributeReducer, initialState);

  console.log('attributes =>', attributes);

  const increment = useCallback(
    (attribute) => dispatch({ type: "increment", attribute }),
    []
  );
  const decrement = useCallback(
    (attribute) => dispatch({ type: "decrement", attribute }),
    []
  );

  const calculateModifier = useCallback(
    (value) => Math.floor((value - 10) / 2),
    []
  );

  return {
    attributes,
    increment,
    decrement,
    calculateModifier,
  };
};
