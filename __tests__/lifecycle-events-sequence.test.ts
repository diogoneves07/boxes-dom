import Html from "./../src/engine/Html";

test("Lifecycle events sequence", (done) => {
  const button = Html`button`(0);
  const callbackfn = jest.fn();
  button.on("@beforeCreate", callbackfn);
  button.on("@created", callbackfn);
  button.on("@beforeMount", callbackfn);
  button.on("@mounted", callbackfn);
  button.on("@afterMount", callbackfn);

  button.render();

  button.on("@beforeUpdate", callbackfn);
  button.on("@updated", callbackfn);

  button.on("@afterUpdate", callbackfn);

  let count = 1;
  button.on("@effect", (e) => {
    if (count === 1) {
      callbackfn(e);
      button(2022);
    } else {
      callbackfn(e);
      button.unrender();
    }
    count++;
  });

  button.on("@beforeUnmount", callbackfn);
  button.on("@unmounted", callbackfn);

  button.on("@afterUnmount", callbackfn);

  setTimeout(() => {
    const calls = callbackfn.mock.calls;
    expect(calls[0][0].type).toBe("@beforeCreate");
    expect(calls[1][0].type).toBe("@created");
    expect(calls[2][0].type).toBe("@beforeMount");
    expect(calls[3][0].type).toBe("@mounted");

    expect(calls[4][0].type).toBe("@afterMount");
    expect(calls[5][0].type).toBe("@effect");

    expect(calls[6][0].type).toBe("@beforeUpdate");
    expect(calls[7][0].type).toBe("@updated");

    expect(calls[8][0].type).toBe("@afterUpdate");
    expect(calls[9][0].type).toBe("@effect");

    expect(calls[10][0].type).toBe("@beforeUnmount");
    expect(calls[11][0].type).toBe("@unmounted");
    expect(calls[12][0].type).toBe("@afterUnmount");
    expect(callbackfn).toBeCalledTimes(13);
    done();
  }, 1000);
});
