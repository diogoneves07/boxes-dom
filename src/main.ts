// import "./style.css";

import Html from "./engine/Html";
import Box from "../../../diogo07/boxes/src/main";

const Button = (i: number) => Html`button`(i).set((v: any) => ++v, "click");
const Buttons = () => {
  const btn1 = Button(0);
  const div = Html`div`(btn1);
  const $UserName = Box()("Diogo neves");
  setTimeout(() => {
    $UserName.change("Diogo Pereira");
  }, 4000);

  div(Html`strong`($UserName));

  return div;
};
document.addEventListener;
Buttons().render("#app", "after");
setTimeout(() => {
  Box().emit("*changeChild");
}, 2000);
//Menu().render();
//button.it or button.el
/*


const $List = Box()(true);

const Menu = () => {
  const lis = Html<[]>`5li`.map((li, i) => li(i));
  const div = Html`div`(lis);

  $List.on("@set", function () {
    div.set((values: any) => {
      values[2] = "UserName Neves";
      return values;
    });
  });

  return div;
};

setTimeout(() => {
  $List.set(() => false);
}, 5000);
const buttons = Html<[]>`3button`;
buttons.forEach((button, index) => {
  if (index > 0) {
    buttons[index - 1](button(index));
    setInterval(() => {
      button.set((values) => {
        if (Array.isArray(values)) {
          values[0] += 1;

          return values;
        }
        return values + 1;
      });
    }, 1000);
  }
});
buttons[0].render();
console.timeEnd("Dioog");*/
/*
const $Counter = Box()(0);
$Counter.on("@set", ({content})=>{
  button(content)
})
const button = Html`button`(0);
setInterval(() => {
  button.set((values) => values + 1);
}, 1000);
button.render();*/
