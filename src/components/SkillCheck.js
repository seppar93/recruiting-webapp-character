import React, { useState, useCallback } from "react";
import { SKILL_LIST } from "../consts.js";
import PropTypes from "prop-types";

const SkillCheck = ({ calculateSkillTotal }) => {
  // TODO: given more time refactor to a useReducer state
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(10);
  const [rollResult, setRollResult] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRoll = useCallback(() => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const skill = SKILL_LIST.find((skill) => skill.name === selectedSkill);
    const total =
      roll + calculateSkillTotal(skill.name, skill.attributeModifier);
    setRollResult(roll);
    setSuccess(total >= dc);
  }, [selectedSkill, dc, calculateSkillTotal]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Skill Check</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="skill" className="mr-2">
          Skill:
        </label>
        <select
          id="skill"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="mr-4"
        >
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
        <label htmlFor="dc" className="mr-2">
          DC:
        </label>
        <input
          id="dc"
          type="number"
          value={dc}
          onChange={(e) => setDc(Number(e.target.value))}
          className="w-16 mr-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleRoll}
        >
          Roll
        </button>
      </div>
      {rollResult !== null && (
        <div>
          <p>You Rolled: {rollResult}</p>
          <p>The DC was: {dc}</p>
          <p>Result: {success ? "Successful" : "Failed"}</p>
        </div>
      )}
    </div>
  );
};

SkillCheck.propTypes = {
  calculateSkillTotal: PropTypes.func.isRequired,
};

export default SkillCheck;
