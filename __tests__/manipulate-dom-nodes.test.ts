import Html from "../src/engine/Html";

test("Manipulate DOM nodes", () => {
  const list = Html<[]>`5li`.map((li, i) => li(i + "li"));
  const div = Html`div`(...list, 2022);
  const button = Html`button`(0);

  div.render();

  div.set((values) => {
    const a = values as any[];
    a.unshift(button);
    a[1] = "Hello World!!!";
    a[2] = null;
    a.pop();
    return a;
  });
  const childNodes = div.el.childNodes;
  expect(list[1].el.isConnected).toBe(false);
  expect(childNodes[0]).toBe(button.el);
  expect(childNodes[1].textContent).toBe("Hello World!!!");
  expect(childNodes[2] as HTMLElement).toBe(list[2].el);
});
