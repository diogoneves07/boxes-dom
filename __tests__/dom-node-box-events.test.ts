import Html from "./../src/engine/Html";

describe("Check dom-node-box events", () => {
  //* setTimeouts Ensures verification of the number of calls.

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
  test("@beforeMount", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeMount", callbackfn);
    button.render();
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });
  test("@mounted", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@mounted", callbackfn);
    button.render();
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });
  test("@afterMount", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@afterMount", callbackfn);
    button.render();

    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });
  test("@beforeUpdate", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeUpdate", callbackfn);
    button.render();
    setTimeout(() => {
      button("2022");
    }, 50);
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 200);
  });
  test("@updated", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@updated", callbackfn);
    button.render();
    setTimeout(() => {
      button("2022");
    }, 50);
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 200);
  });

  test("@afterUpdate", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@afterUpdate", callbackfn);
    button.render();
    setTimeout(() => {
      button("2022");
    }, 50);
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 200);
  });
  test("@beforeUnmount", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@beforeUnmount", callbackfn);
    button.render();
    button.unrender();
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });
  test("@unmounted", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@unmounted", callbackfn);
    button.render();
    button.unrender();
    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });

  test("@afterUnmount", (done) => {
    const button = Html`button`(Html`span`("Hello World!!!"));
    const callbackfn = jest.fn();
    button.on("@afterUnmount", callbackfn);
    button.render();
    button.unrender();

    setTimeout(() => {
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
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
    (button.el as HTMLButtonElement).click();

    expect(callbackfn).toBeCalledTimes(1);
  });
});
