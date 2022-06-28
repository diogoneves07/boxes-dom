import Html from "./../src/engine/Html";
describe("Remove DOM listeners", () => {
  test("Method off", (done) => {
    const button = Html`button`("Hello World!!!");
    const callbackfn = jest.fn();
    button.on("click", callbackfn);
    button.render();
    button.off("click", callbackfn);

    setTimeout(() => {
      (button.el as HTMLButtonElement).click();

      expect(callbackfn).toBeCalledTimes(0);
      done();
    }, 50);
  });
  test("Method off from event object", (done) => {
    const button = Html`button`("Hello World!!!");
    const callbackfn = jest.fn();
    button.on("click", (e) => {
      callbackfn();
      e.off();
    });
    button.render();
    button.off("click", callbackfn);
    setTimeout(() => {
      (button.el as HTMLButtonElement).click();
      (button.el as HTMLButtonElement).click();
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });

  test("After unmounted node-box", (done) => {
    const button = Html`button`("Hello World!!!");
    const callbackfn = jest.fn();
    button.on("click", callbackfn);
    button.render();
    button.unrender();
    setTimeout(() => {
      (button.el as HTMLButtonElement).click();
      expect(callbackfn).toBeCalledTimes(0);
      done();
    }, 50);
  });
});
