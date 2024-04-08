export const compareRanges =(range1: number[], range2: number[]): boolean => {
  //checking each rang if it is standard or not?
  if (range1[0] > range1[1] || range2[0] > range2[1]) {
    return false; 
  }

  const min1 = Math.min(...range1);
  const max1 = Math.max(...range1);
  const min2 = Math.min(...range2);
  const max2 = Math.max(...range2);

  return (min1 <= max2) && (min2 <= max1);
}