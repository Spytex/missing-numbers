export function binary(
  sequence: ArrayLike<number>,
  lowerBound: number = 1
): [number, number] {
  const findMissingAt = (target: number): number => {
    let lo = 0,
      hi = sequence.length - 1;
    let index = sequence.length;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
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

  const missing1 = findMissingAt(1);
  const missing2 = findMissingAt(2);
  return missing1 < missing2 ? [missing1, missing2] : [missing2, missing1];
}
