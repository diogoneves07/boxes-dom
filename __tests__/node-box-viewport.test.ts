import Html from "./../src/engine/Html";

test("Checks update order", (done) => {
  const button1 = Html`button`("Hello - 1");
  const button2 = Html`button`("Hello - 2");
  const callbackfn = jest.fn();
  jest.spyOn(button1.el, "getBoundingClientRect").mockImplementation(() => {
    return {
      top: -200,
      left: -200,
      bottom: 200,
      right: 200,
      width: 200,
      height: 200,
      x: 200,
      y: 200,
    } as DOMRect;
  });

  button1.render();
  button2.render();
  button1.on("@updated", callbackfn);
  button2.on("@updated", callbackfn);
  setTimeout(() => {
    button1("World!!!");
    button2("World!!!");
    setTimeout(() => {
      expect(callbackfn.mock.calls[0][0].box).toBe(button2);
      done();
    }, 50);
  }, 50);
});
