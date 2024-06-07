import React from 'react';
import { useSkills } from '../hooks/useSkills';
import SkillRow from './SkillRow';
import { SKILL_LIST } from "../consts.js";
import PropTypes from 'prop-types';

const Skills = ({ attributes }) => {
  const { skillPoints, increment, decrement, calculateSkillTotal, totalPoints, remainingPoints } = useSkills(attributes);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Skills</h2>
      {SKILL_LIST.map((skill) => (
        <SkillRow
          key={skill.name}
          name={skill.name}
          points={skillPoints[skill.name]}
          increment={() => increment(skill.name)}
          decrement={() => decrement(skill.name)}
          modifier={Math.floor((attributes[skill.attributeModifier] - 10) / 2)}
          total={calculateSkillTotal(skill.name, skill.attributeModifier)}
        />
      ))}
      <p>Total skill points available: {totalPoints}</p>
      <p>Remaining skill points: {remainingPoints}</p>
    </div>
  );
};

Skills.propTypes = {
  attributes: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Skills;
