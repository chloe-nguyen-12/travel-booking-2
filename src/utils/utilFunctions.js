//Shuffles array and returns first *number* amount of elements as array
const returnArrayRandom = (array, number) => {
  const returnArray = array;
  for (let i = returnArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [returnArray[i], returnArray[j]] = [returnArray[j], returnArray[i]];
  }
  return returnArray.slice(0, number);
};

export { returnArrayRandom };
