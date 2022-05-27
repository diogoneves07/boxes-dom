export default function hasTextContent(o: object) {
  return typeof (o as any).textContent === "string";
}
