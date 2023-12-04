const StringUtilities = {
  /**
   * Returns a string with the first letter capitalized
   */
  capitalizeFirstLetter: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};

export default StringUtilities;
