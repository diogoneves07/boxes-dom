import { DOMNodeBox } from "./../src/types/dom-node-box";
import Html from "./../src/engine/Html";
describe("Convert elements in DOM to node-box", () => {
  test("Normal", () => {
    const callbackfn = jest.fn();

    // * Dirty nodes with break lines
    document.body.innerHTML = `
    <button>
        Hello
        <span>2022</span>

        <span>2022</span>

        <span>2022</span>

        Worls!!!
    </button>
    `;
    const button = Html.convertToBoxes(
      document.body.firstElementChild as HTMLElement
    ) as DOMNodeBox;

    button.on("click", callbackfn);

    (button.el as HTMLButtonElement).click();

    expect(button.el.isConnected).toBe(true);
    expect(button.el).toBe(document.body.firstElementChild);
    expect(callbackfn).toBeCalledTimes(1);
  });

  test("For use as a component", (done) => {
    const normalSpanElement = document.createElement("span");
    const normalButtonElement = document.createElement("button");
    const callbackfn = jest.fn();
    normalButtonElement.appendChild(normalSpanElement);
    document.body.appendChild(normalButtonElement);
    const Button = () =>
      Html.convertToBoxes(normalButtonElement, true) as DOMNodeBox;
    const button = Button();
    button.render();
    button.on("click", callbackfn);

    (button.el as HTMLButtonElement).click();
    setTimeout(() => {
      expect(button.el.isConnected).toBe(true);
      expect(button.el).not.toBe(normalButtonElement);
      expect(callbackfn).toBeCalledTimes(1);
      done();
    }, 50);
  });

  test("When the indicated element non-existent", () => {
    const button = Html.convertToBoxes("#app");
    expect(button).toBe(false);
  });
});
