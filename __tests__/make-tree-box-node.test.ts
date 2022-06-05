import Html from "../src/engine/Html";

test("Make tree box-node", () => {
  const [button, span, strong] = Html<[]>`button span strong`;
  button(span("Hello", strong("World!!!")));
  button.render();

  expect(button.el.isConnected).toBe(true);
  expect(span.el.isConnected).toBe(true);
  expect(strong.el.isConnected).toBe(true);
  expect(button.el.parentElement).toBe(document.body);
  expect(span.el.parentElement).toBe(button.el);
  expect(strong.el.parentElement).toBe(span.el);
  expect(strong.el.textContent).toBe("World!!!");
});
