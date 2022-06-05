import Html from "./../src/engine/Html";
describe("Render box element in DOM", () => {
  test("Normal render", () => {
    const box = Html`button`(0);
    box.render();
    expect(box.el.isConnected).toBe(true);
    expect(box.el.textContent).toBe("0");
  });
  test("Normal render array values", () => {
    const box = Html`button`(["Hello", 2022, "World", Html`strong`("!!!")]);
    box.render();
    expect(box.el.isConnected).toBe(true);
  });
  test("Render when node-box is already in the DOM", () => {
    const normalDivElement = document.createElement("div");
    document.body.appendChild(normalDivElement);
    const box = Html`button`(0);

    box.render();

    expect(box.el.parentElement).toBe(document.body);

    box.render(normalDivElement);

    expect(box.el.parentElement).toBe(normalDivElement);
    expect(box.el.isConnected).toBe(true);
    expect(box.el.textContent).toBe("0");
  });
  test("Render without a box parent", () => {
    const buttons = [Html`button`(0), Html`button`(1)];
    Html.render(buttons);
    expect(buttons[0].el.isConnected).toBe(true);
    expect(buttons[1].el.isConnected).toBe(true);
  });
  test("Render on non-existent element", () => {
    const box = Html`button`(0);
    box.render("#app");
  });
  test("Render before the indicated element", () => {
    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);

    const box = Html`button`(0);
    box.render(normalDivElement, "before");
    expect(normalDivElement.previousElementSibling).toBe(box.el);
  });

  test("Render after the indicated element", () => {
    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);

    const box = Html`button`(0);
    box.render(normalDivElement, "after");
    expect(normalDivElement.nextElementSibling).toBe(box.el);
  });

  test("Render null and undefined values", () => {
    const p = Html`p`(null, undefined, Html`span`(null, undefined));
    p.render();
  });

  test("Render node-box reference loop - Should throw an error", () => {
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
