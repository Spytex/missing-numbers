export function binaryGolden(
  sequence: ArrayLike<number>,
  lowerBound: number = 1
): [number, number] {
  const phi = (Math.sqrt(5) - 1) / 2;
  const findMissingAtGolden = (target: number): number => {
    let lo = 0,
      hi = sequence.length - 1;
    let index = sequence.length;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) * phi);
      const missingCount = sequence[mid] - (lowerBound + mid);
      if (missingCount >= target) {
        index = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    return index === sequence.length
      ? lowerBound + sequence.length + (target - 1)
      : lowerBound + index + (target - 1);
  };

  const missing1 = findMissingAtGolden(1);
  const missing2 = findMissingAtGolden(2);
  return missing1 < missing2 ? [missing1, missing2] : [missing2, missing1];
}
