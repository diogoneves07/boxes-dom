//import Box from "../../boxes/src/main";
import Html from "./engine/Html";
/*
const HelloWorld = () => {
  // State vars first
  const $postion = Box("top");
  // DOM elements second and after another things...
  const button = Html`button`("");
  const span = Html`button`("555");

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
      background-color: blue; \ data-value`;
    setInterval(() => {
      $postion.change(positions[count >= 3 ? (count = 0) : ++count]);
    }, 1000);
  });
  return [span, ["Diogo neves"], button];
};

const Wellcome = () => {
  const $global = Box("start");

  setInterval(() => {
    $global.emit("*stop", new Date().toLocaleString());
  }, 100);
  // O usuario precisar criar um elemento para usar hooks
  // a emisão so pode ser feita apos a montagem
  return [HelloWorld, HelloWorld];
};
Html.render(Wellcome());

const buttons = Html<[]>`div 10000button`;
console.time("@mounted");

buttons.forEach((button, index) => {
  const b = button;
  if (index > 0) {
    

    buttons[0](b);
  }
});

setInterval(() => {
  buttons.forEach((button, index) => {
    if (index > 0) {
      button.set((values) => {
        return ++values;
      });
    }
  });
}, 0);

buttons[0].on("@mounted", () => {
  console.timeEnd("@mounted");
});
buttons[0].render();

Css(box)``;

Transition(box)((t, box)=> {
  t.group(()=>{
    return {
      
    }
  });
});

box.css();
*/
/*
const TreeOn = () => {
  const $box1 = Box("Hello: ");
  const $box2 = Box(0);
  const $box3 = Box($box1, $box2);
  setInterval(() => {
    $box2.set((v) => ++v);
  }, 200);

  console.time("@mounted");
  const divParent = Html`div`($box3);
  return divParent;
};*/

const Buttons = () => {
  console.time("@mounted");
  const divParent = Html`div`;
  const buttons = Html<[]>`10000button`;
  buttons.forEach((button) => button);
  setInterval(() => {
    buttons.forEach((button) => {
      button.set((values) => {
        return ++values;
      });
    });
  }, 0);

  /* setInterval(() => {
    divParent.set((values) => {
      values.splice(0, 100);
      return values;
    });
  }, 0);*/

  divParent.on("@mounted", () => {
    console.timeEnd("@mounted");
  });
  return divParent(buttons);
};

Buttons().render();
//TreeOn().render();
