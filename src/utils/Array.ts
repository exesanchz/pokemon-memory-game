const ArrayUtilities = {
  /**
   * Returns a shuffled version of the array
   */
  shuffle: <T>(arr: Array<T>): Array<T> => {
    const compareFunction = () => Math.random() - 0.5; //Assing a random order value
    return [...arr].sort(compareFunction);
  },
};

export default ArrayUtilities;
