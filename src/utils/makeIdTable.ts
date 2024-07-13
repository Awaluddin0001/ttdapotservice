export const makeIdTable = (
  currentCode: string,
  idName: string,
  digits: number,
) => {
  const numericPart = currentCode.substring(5);
  // Convert the numeric part to an integer
  let number = parseInt(numericPart, 10);
  // Increment the number
  number += 1;

  // Format the number with leading zeros (up to 3 digits)
  const incrementedCode = `${idName}` + String(number).padStart(digits, '0');
  return incrementedCode;
};
