import Box from "../../boxes/src/main";
import Html from "./engine/Html";
const HelloWorld = () => {
  // State vars first
  const $postion = Box("top");

  // DOM elements second and after another things...
  const button = Html`button`("");

  const positions = ["top", "left", "bottom", "right"];
  let count = 0;

  Box().on("*stop", ({ data }) => {
    button.change(data);
  });

  button.on("@mounted", () => {
    button.attrs`
    style = 
      transition: 0.7s all;
      border-${$postion}: 15px solid red;
      background-color: blue;`;

    setInterval(() => {
      $postion.change(positions[count >= 3 ? (count = 0) : ++count]);
    }, 1000);
  });
  return [button];
};

const Wellcome = () => {
  const $global = Box("start");
  const box1 = Box();
  const box2 = Box(box1, "something else");
  box2.on("@deepChanges", (e) => {
    console.log(e);
    alert("m");
  });
  box1(2022);
  setInterval(() => {
    $global.emit("*stop", new Date().toLocaleString());
  }, 100);
  // O usuario precisar criar um elemento para usar hooks
  // a emisão so pode ser feita apos a montagem
  return [HelloWorld, HelloWorld];
};
Html.render(Wellcome());

/*
console.time("Dioog");
const buttons = Html<[]>`div 2000li`;
buttons.forEach((button, index) => {
  if (index > 0) {
    buttons[0](button(0, " --- 2022"));
    setInterval(() => {
      button.set((values) => {
        if (Array.isArray(values)) {
          values[0] += 1;

          return values;
        }
        return values + 1;
      });
    }, index * 3);
  }
});
buttons[0].render();
console.timeEnd("Dioog");*/
