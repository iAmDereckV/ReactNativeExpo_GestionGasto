export const getToday = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
};

export const getMonth = (): string => {
  const today = new Date();
  return today.toISOString().slice(0, 7); // 'YYYY-MM'
};
