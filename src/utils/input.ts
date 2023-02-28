import React, { useState } from "react";

const padLeadingZero = (a: number) => ("0" + a.toString()).slice(-2);

/**
 * @param {Date} date
 * @returns yyyy-mm-dd
 */
export const getInputDate = (date = new Date()) =>
  `${date.getFullYear()}-${padLeadingZero(
    date.getMonth() + 1
  )}-${padLeadingZero(date.getDate())}`;

export const useInputDate = (init?: string) => {
  const [date, setDate] = useState(() =>
    init ? getInputDate(new Date(init)) : getInputDate()
  );

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
