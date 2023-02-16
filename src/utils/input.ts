import React, { useState } from "react";

/**
 * @param {Date} date
 * @returns yyyy-mm-dd
 */
export const getInputDate = (date = new Date()) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1).toString()).slice(
    -2
  )}-${date.getDate()}`;

export const useInputDate = () => {
  const [date, setDate] = useState(() => getInputDate());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return { date, setDate, handleChange };
};

export const useInputMonth = () => {
  const [month, setMonth] = useState(() => getInputDate().slice(0, 7)); // extract yyyy-mm

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  return { month, setMonth, handleChange };
};
