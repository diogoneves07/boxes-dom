import Html from "./../src/engine/Html";
describe("Render box element in DOM", () => {
  test("Normal render", (done) => {
    const box = Html`button`(0);
    box.render();
    setTimeout(() => {
      expect(box.el.isConnected).toBe(true);
      expect(box.el.textContent).toBe("0");
      done();
    }, 50);
  });
  test("Normal render array values", (done) => {
    const box = Html`button`(["Hello", 2022, "World", Html`strong`("!!!")]);
    box.render();
    setTimeout(() => {
      expect(box.el.isConnected).toBe(true);
      done();
    }, 50);
  });
  test("When node-box is already in the DOM", (done) => {
    const normalDivElement = document.createElement("div");
    document.body.appendChild(normalDivElement);
    const box = Html`button`(0);

    box.render();

    setTimeout(() => {
      expect(box.el.parentElement).toBe(document.body);
      box.render(normalDivElement);
    }, 50);
    setTimeout(() => {
      expect(box.el.parentElement).toBe(normalDivElement);
      expect(box.el.isConnected).toBe(true);
      expect(box.el.textContent).toBe("0");
      done();
    }, 150);
  });
  test("Without a box parent", (done) => {
    const buttons = [Html`button`(0), Html`button`(1)];
    Html.render(buttons);
    setTimeout(() => {
      expect(buttons[0].el.isConnected).toBe(true);
      expect(buttons[1].el.isConnected).toBe(true);
      done();
    }, 50);
  });
  test("When non-existent element", () => {
    const fn = () => {
      const box = Html`button`(0);
      box.render("#app");
    };

    expect(fn).not.toThrow();
  });
  test("Before the indicated element", (done) => {
    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);

    const box = Html`button`(0);
    box.render(normalDivElement, "before");
    setTimeout(() => {
      expect(normalDivElement.previousElementSibling).toBe(box.el);
      done();
    }, 50);
  });

  test("After the indicated element", (done) => {
    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);

    const box = Html`button`(0);
    box.render(normalDivElement, "after");
    setTimeout(() => {
      expect(normalDivElement.nextElementSibling).toBe(box.el);
      done();
    }, 50);
  });

  test("null and undefined values", () => {
    const fn = () => {
      const p = Html`p`(null, undefined, Html`span`(null, undefined));
      p.render();
    };

    expect(fn).not.toThrow();
  });

  test("node-box reference loop - Should throw an error", () => {
    const fn = () => {
      const button = Html`button`(0);
      const div = Html`div`(button);
      const article = Html`article`(div);
      div(article);
      div.render();
    };
    expect(fn).toThrow();
  });
});
