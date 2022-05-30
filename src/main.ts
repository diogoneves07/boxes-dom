// import "./style.css";

import Html from "./engine/Html";
import Box from "../../../diogo07/boxes/src/main";

const Button = (i: number) => Html`button`(i).set((v: any) => ++v, "click");
const Buttons = () => {
  //const btn1 = Button(0);
  const div = Html`div`("Name ", "middle ", "last");

  div.on("*changeChild", () => {
    div.setIndex(0, "Diogo ", 2, "Pereira ");
  });

  return div;
};

Buttons().render("#app", "after");
setTimeout(() => {
  Box().emit("*changeChild");
}, 2000);
// divChild.on('@event1 @event3 @event4 @event5', (e)=> divParent.emit(e.type))
/*  

const $UserName = Box()("Name", "middleName", "lastName");
setTimeout(() => {
    $UserName.change("Diogo Neves Pereira");
  }, 4000);

Html`strong`($UserName);

const strong =Html`strong`("Name", "middleName", "lastName")

setTimeout(() => {
    strong.change("Diogo Neves Pereira");
  }, 4000);
*/

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
