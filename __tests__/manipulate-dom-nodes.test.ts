import Html from "../src/engine/Html";

test("Manipulate DOM nodes", () => {
  const list = Html<[]>`5li`.map((li, i) => li(i + "li"));
  const div = Html`div`(...list, [2022], "07");
  const button = Html`button`(0);

  div.render();

  div.set((values) => {
    const a = values as any[];
    const li4 = a[3];
    a.unshift(button);
    a[1] = "Hello World!!!";
    a[2] = null;
    a[a.length - 2] = 2022;
    a.splice(3, 1);
    a.push(li4);
    a.pop();
    return a;
  });
  const childNodes = div.el.childNodes;
  expect(list[1].el.isConnected).toBe(false);
  expect(childNodes[0]).toBe(button.el);
  expect(childNodes[1].textContent).toBe("Hello World!!!");
  expect(childNodes[2] as HTMLElement).toBe(list[3].el);
});
