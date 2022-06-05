import Html from "./../src/engine/Html";

describe("Check dom-node-box events", () => {
  test("@beforeCreate", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeCreate", callbackfn);
    button.render();
    expect(callbackfn).toBeCalledTimes(1);
  });
  test("@created", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@created", callbackfn);
    button.render();
    expect(callbackfn).toBeCalledTimes(1);
  });
  test("@beforeMount", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeMount", callbackfn);
    button.render();
    expect(callbackfn).toBeCalledTimes(1);
  });
  test("@mounted", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@mounted", callbackfn);
    button.render();
    expect(callbackfn).toBeCalledTimes(1);
  });
  test("@afterMount", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@afterMount", callbackfn);
    button.render();

    // Ensures verification of the number of calls.
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 100);
  });
  test("@beforeUpdate", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeUpdate", callbackfn);
    button.render();
    button("2022");
    expect(callbackfn).toBeCalledTimes(1);
  });
  test("@updated", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@updated", callbackfn);
    button.render();
    button("2022");
    expect(callbackfn).toBeCalledTimes(1);
  });

  test("@afterUpdate", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@afterUpdate", callbackfn);
    button.render();
    button(2022);

    // Ensures verification of the number of calls.
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 100);
  });
  test("@beforeUnmount", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeUnmount", callbackfn);
    button.render();
    button.unrender();
    expect(callbackfn).toBeCalledTimes(1);
  });
  test("@unmounted", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@unmounted", callbackfn);
    button.render();
    button.unrender();
    expect(callbackfn).toBeCalledTimes(1);
  });

  test("@afterUnmount", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@afterUnmount", callbackfn);
    button.render();
    button.unrender();

    // Ensures verification of the number of calls.
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 100);
  });

  test("@effect", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    let called = false;
    button.on("@effect", () => {
      !called && button(2022);
      called = true;
      callbackfn();
    });
    button.render();

    // Ensures verification of the number of calls.
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(2);
      done();
    }, 500);
  });

  test("Click DOM event", () => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("click", callbackfn);
    button.render();
    button.el.click();

    expect(callbackfn).toBeCalledTimes(1);
  });
});
