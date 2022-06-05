import Html from "./../src/engine/Html";
describe("Remove DOM listeners", () => {
  test("Method off", () => {
    const button = Html`button`("Hello World!!!");
    const callbackfn = jest.fn();
    button.on("click", callbackfn);
    button.render();
    button.off("click", callbackfn);

    button.el.click();

    expect(callbackfn).toBeCalledTimes(0);
  });
  test("Method off from event object", () => {
    const button = Html`button`("Hello World!!!");
    const callbackfn = jest.fn();
    button.on("click", (e) => {
      callbackfn();
      e.off();
    });
    button.render();
    button.off("click", callbackfn);

    button.el.click();
    button.el.click();

    expect(callbackfn).toBeCalledTimes(1);
  });

  test("After unmounted node-box", () => {
    const button = Html`button`("Hello World!!!");
    const callbackfn = jest.fn();
    button.on("click", callbackfn);
    button.render();
    button.unrender();
    button.el.click();

    expect(callbackfn).toBeCalledTimes(0);
  });
});
