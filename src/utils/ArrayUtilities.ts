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

/* export const shuffleArray = (arr: any[]): any[] => {
    return arr
        .map((a) => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map((a) => a[1]);
};

export function shuffleeArray<T>(array: T[]): T[] {
    const shuffledArray: T[] = [...array];

    const compareFunction = () => Math.random() - 0.5;
    shuffledArray.sort(compareFunction);
    return shuffledArray;
} */
