import { useState, useMemo, useCallback } from 'react';
import { SKILL_LIST } from "../consts.js";

const initialSkillState = SKILL_LIST.reduce((acc, skill) => {
  acc[skill.name] = 0;
  return acc;
}, {});

export const useSkills = (attributes) => {
  const [skillPoints, setSkillPoints] = useState(initialSkillState);

  const intelligenceModifier = useMemo(
    () => Math.floor((attributes.Intelligence - 10) / 2),
    [attributes.Intelligence]
  );

  const totalPoints = useMemo(() => 10 + 4 * intelligenceModifier, [intelligenceModifier]);

  const remainingPoints = useMemo(
    () => totalPoints - Object.values(skillPoints).reduce((sum, points) => sum + points, 0),
    [totalPoints, skillPoints]
  );

  const increment = useCallback((skill) => {
    setSkillPoints((prev) => {
      if (remainingPoints > 0) {
        return { ...prev, [skill]: prev[skill] + 1 };
      }
      return prev;
    });
  }, [remainingPoints]);

  const decrement = useCallback((skill) => {
    setSkillPoints((prev) => ({
      ...prev,
      [skill]: Math.max(0, prev[skill] - 1),
    }));
  }, []);

  const calculateSkillTotal = useCallback((skill, attribute) => {
    const attributeModifier = Math.floor((attributes[attribute] - 10) / 2);
    return skillPoints[skill] + attributeModifier;
  }, [attributes, skillPoints]);

  return {
    skillPoints,
    increment,
    decrement,
    calculateSkillTotal,
    totalPoints,
    remainingPoints,
  };
};
