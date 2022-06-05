import Html from "./../src/engine/Html";
describe("Render with Html function", () => {
  test("Normal render", () => {
    const buttons = [Html`button`(0), Html`button`(1)];
    Html.render(buttons);
    expect(buttons[0].el.isConnected).toBe(true);
    expect(buttons[1].el.isConnected).toBe(true);
  });
  test("Render before the indicated element", () => {
    document.body.innerHTML = "";
    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    const buttons = [Html`button`(0), Html`button`(1)];

    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);
    Html.render(buttons, normalDivElement, "before");
    expect(buttons[0].el).toBe(document.body.firstElementChild);
  });
  test("Render after the indicated element", () => {
    document.body.innerHTML = "";

    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    const buttons = [Html`button`(0), Html`button`(1)];

    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);

    Html.render(buttons, normalDivElement, "after");
    expect(buttons[0].el).toBe(normalDivElement.nextElementSibling);
  });
});
