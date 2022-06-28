import Box from "../../boxes/src/main";
import Html from "./../src/engine/Html";
describe("Use DOM attributes", () => {
  test("Simple use", (done) => {
    const $postion = Box("top");
    const $size = Box(["height:", "200px;", "width:", "500px"]);
    const button = Html`button`("");

    button.on("@mounted", () => {
      button.attrs`
        style = 
        ${$size};
        border-${$postion}: 15px solid red; \ 
        class = hello`;
      setTimeout(() => {
        $postion.change("left");
        setTimeout(() => {
          const computedStyle = window.getComputedStyle(button.el);
          expect(computedStyle.getPropertyValue("width")).toBe("500px");
          expect(computedStyle.getPropertyValue("border-left")).toBe(
            "15px solid red"
          );
          expect((button.el as HTMLElement).classList.contains("hello")).toBe(
            true
          );
          done();
        }, 50);
      }, 50);
    });
    button.render();
  });

  test("Removes all attributes", (done) => {
    const $postion = Box("top");
    const button = Html`button`("");

    button.on("@mounted", () => {
      button.attrs`
        style = 
        width: 500px;
        border-${$postion}: 15px solid red; \ 
        class = hello`;
      setTimeout(() => {
        button.attrs``;
        setTimeout(() => {
          expect(button.el.hasAttribute("style")).toBe(false);
          done();
        }, 50);
      }, 50);
    });
    button.render();
  });

  test("Replaces attributes", (done) => {
    const $postion = Box("top");
    const button = Html`button`("");

    button.on("@mounted", () => {
      button.attrs`
        style = 
        width: 500px;
        border-${$postion}: 15px solid red; \ 
        class = hello`;
      setTimeout(() => {
        button.attrs`class = hello \ style= width:900px \ data-value`;
        setTimeout(() => {
          const computedStyle = window.getComputedStyle(button.el);
          expect(computedStyle.getPropertyValue("width")).toBe("900px");
          done();
        }, 50);
      }, 50);
    });
    button.render();
  });

  test("Checks invalid values", (done) => {
    const button = Html`button`("");

    button.on("@mounted", () => {
      button.attrs`
        null = 
        null \ 
        undefined = 
            undefined
        data-hello = null`;
      setTimeout(() => {
        expect(button.el.hasAttribute("null")).toBe(false);
        expect(button.el.hasAttribute("undefined")).toBe(false);
        expect(button.el.hasAttribute("data-hello")).toBe(false);

        done();
      }, 10);
    });
    button.render();
  });
});
