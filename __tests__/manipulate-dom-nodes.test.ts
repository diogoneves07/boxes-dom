import Html from "../src/engine/Html";

test("Manipulate DOM nodes", (done) => {
  const list = Html<[]>`5li`.map((li, i) => li(i + "li"));
  const div = Html`div`(...list, [2022], "07");
  const button = Html`button`(0);
  const p = Html`p`(null, undefined, Html`span`(null, undefined));

  p.render();

  div.render();

  setTimeout(() => {
    div.set((values) => {
      const newValues = values as any[];
      const li4 = newValues[3];
      newValues.unshift(button);
      newValues[1] = "Hello World!!!";
      newValues[2] = null;
      newValues[newValues.length - 2] = 2022;
      newValues.splice(3, 1);
      newValues.push(li4);
      newValues.pop();
      return newValues;
    });
    p.change("");
  }, 50);

  setTimeout(() => {
    const childNodes = div.el.childNodes;

    expect(list[1].el.isConnected).toBe(false);
    expect(childNodes[0]).toBe(button.el);
    expect(childNodes[1].textContent).toBe("Hello World!!!");
    expect(childNodes[2]).toBe(list[3].el);
    expect(p.el.innerHTML).toBe("");
    done();
  }, 200);
});
