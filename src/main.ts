import Box from "../../boxes/src/main";
import Html from "./engine/Html";

const $message = Box()("Hello ");

const span = Html`span`($message).render();

span.change("");
$message.change(2022);

const Component = () => {
  // State vars first
  const $value = Box()("Hello ");
  const $value1 = Box()("2022 ");

  // DOM elements second and after another things...
  const span = Html`span`($value);
  const button = Html`button`(span);

  // $InputValue.on("@changed", () => (input.el.value = $InputValue.get()));

  $value.on("*data", () => {
    span("World! ", $value1);

    setTimeout(() => {
      span.change(2023);
    }, 500);
  });

  return button;
};

Component().render();

let count = 0;
setTimeout(() => {
  Box().emit("*data", { value: (count += 5) });
}, 1000);
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
All boxes
Box.define("lHttp", (box, args...)=>{

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
*/
