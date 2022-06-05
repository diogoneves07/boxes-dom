const NEW_ARRAY: any[] = [];

export default function concatArrays(array: any[]) {
  array.forEach((value) => {
    if (Array.isArray(value)) {
      NEW_ARRAY.push(...value);
    } else {
      NEW_ARRAY.push(value);
    }
  });
  array.length = 0;
  array.push(...NEW_ARRAY);
  NEW_ARRAY.length = 0;
  return array;
}
