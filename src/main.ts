import { DOMNodeBox } from "./types/dom-node-box";
// import "./style.css";

import Html from "./engine/Html";
const list = Html<[]>`5li`.map((li, i) => li(i + " li"));
const div = Html`div`(...list, 2022);
const button = Html`button`(0);

div.render();

div.set((values) => {
  const a = values as any[];
  a.unshift(button);
  a[1] = "Hello World!!!";
  a[2] = null;
  values.pop();

  return a;
});

/*
const Button = (i: number, s: number) =>
  Html`button`(i).set((v: any) => (v += s), "click");

Button(0, 1).render();
Button(0, 5).render();

const diogoNeves = Html.toBoxes("#diogo-neves", true) as DOMNodeBox;
diogoNeves.on("click", () => {
  alert("8");
});
diogoNeves.render();
*/
// divChild.on('@event1 @event3 @event4 @event5', (e)=> divParent.emit(e.type))
/*  
Pode ser util para o usuario indentificar se o elemento já esta no DOM
isMounted

All boxes
Box.extend("http", (box, args...)=>{

});

Only Html boxes
Html.extend("http", (box, args...)=>{

});

Ou

Html.all.define("lAnime", (box, args...) => {
eventos  automaticos: @beforeUseAxios @afterUseAxios
});

Html.delete("lAnime")

Html`button`.lAnime({
  top:"50px",
});

Html`button`.lStyle``;


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

  $List.on("@seted", function () {
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
$Counter.on("@seted", ({content})=>{
  button(content)
})
const button = Html`button`(0);
setInterval(() => {
  button.set((values) => values + 1);
}, 1000);
button.render();*/
