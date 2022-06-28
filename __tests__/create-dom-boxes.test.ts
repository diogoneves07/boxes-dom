import Html from "./../src/engine/Html";
test("Create DOM boxes", () => {
  const button = Html`${"button"}`;
  const div = Html`${"div"}`;
  const span = Html("span");
  expect(button.el.tagName).toBe("BUTTON");
  expect(div.el.tagName).toBe("DIV");
  expect(span.el.tagName).toBe("SPAN");
});
