import Html from "./../src/engine/Html";
import Box from "../../boxes/src/main";
describe("Use data from normal state boxes", () => {
  test("Use state box", () => {
    const $message = Box()("Hello ");
    const $year = Box()("2022");

    const span = Html`span`($message).render();

    span("World! ", $year);
    expect(span.el.textContent).toBe("Hello World! 2022");
    span.change("");
  });
  test("React to changing values in the state box", () => {
    const $message = Box()("Hello ");

    const span = Html`span`($message).render();

    $message.change(2022);
    expect(span.el.textContent).toBe("2022");
  });
  test("Remove state box", () => {
    const $message = Box()("Hello ");

    const span = Html`span`($message).render();

    span.change("");
    $message.change(2022);
    expect(span.el.textContent).toBe("");
  });
});
