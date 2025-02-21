/**
 * Creates a virtual sequence of numbers from 1 to upperBound with two missing numbers.
 * The sequence length is upperBound - 2.
 * Elements are computed on the fly via a Proxy.
 *
 * @param upperBound The total count of numbers in the range [1, upperBound].
 * @param missing An array of two missing numbers (sorted in ascending order).
 * @returns A virtual sequence implemented as ArrayLike<number>.
 */
export function createVirtualSequence(
  upperBound: number,
  missing: [number, number]
): ArrayLike<number> {
  const length = upperBound - 2;
  return new Proxy(
    { length },
    {
      get(target, prop, receiver) {
        if (prop === "length") return length;
        const index = Number(prop);
        if (!isNaN(index)) {
          const [m1, m2] = missing;
          if (index < m1 - 1) {
            return index + 1;
          } else if (index < m1 - 1 + (m2 - m1 - 1)) {
            return index + 2;
          } else {
            return index + 3;
          }
        }
        return Reflect.get(target, prop, receiver);
      },
    }
  );
}
