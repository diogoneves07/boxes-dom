import { DOMNodeBox } from "./../src/types/dom-node-box";
import Html from "./../src/engine/Html";
describe("Render with Html function", () => {
  test("Normal render", (done) => {
    const buttons = [Html`button`(0), Html`button`(1), "Hello World!!!"];
    const div = document.createElement("div");
    div.setAttribute("id", "apps");
    document.body.appendChild(div);
    Html.render(buttons, "#apps");
    setTimeout(() => {
      expect((buttons[0] as DOMNodeBox).el.isConnected).toBe(true);
      expect((buttons[1] as DOMNodeBox).el.isConnected).toBe(true);
      expect((div.lastChild as Text).textContent).toBe("Hello World!!!");
      done();
    }, 50);
  });

  test("Normal render components", (done) => {
    const Button = () => Html`button`(0);

    document.body.innerHTML = "";

    Html.render([Button, Button]);
    setTimeout(() => {
      expect(document.body.children[0].tagName).toBe("BUTTON");
      expect(document.body.children[1].tagName).toBe("BUTTON");
      done();
    }, 50);
  });
  test("Before the indicated element", (done) => {
    document.body.innerHTML = "";
    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    const buttons = [Html`button`(0), Html`button`(1)];

    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);
    Html.render(buttons, normalDivElement, "before");
    setTimeout(() => {
      expect(buttons[0].el).toBe(document.body.firstElementChild);

      done();
    }, 50);
  });
  test("After the indicated element", (done) => {
    document.body.innerHTML = "";

    const normalDivElement = document.createElement("div");
    const normalButtonElement = document.createElement("button");
    const buttons = [Html`button`(0), Html`button`(1)];

    document.body.appendChild(normalDivElement);
    document.body.appendChild(normalButtonElement);

    Html.render(buttons, normalDivElement, "after");
    setTimeout(() => {
      expect(buttons[0].el).toBe(normalDivElement.nextElementSibling);

      done();
    }, 50);
  });
});
