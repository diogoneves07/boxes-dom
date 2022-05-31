export default function removeBreakLinesChars(s: string) {
  return s.replace(/\r?\n|\r/, "");
}
