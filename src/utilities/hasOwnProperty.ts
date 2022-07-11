export default function hasOwnProperty(o: object, key: string) {
  return Object.prototype.hasOwnProperty.call(o, key);
}
