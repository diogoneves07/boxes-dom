import Html from "./../src/engine/Html";

test("Unrender box element from DOM", () => {
  const box = Html`button`(0);
  box.render();
  box.unrender();
  expect(box.el.isConnected).toBe(false);
});
