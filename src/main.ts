import Box from "../../boxes/src/main";
import { render, _button, _div, _fragment, _i, _strong } from "./index";
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
    button.new(data);
  });
  // Emitir para todos a partir da raiz
  // excutar
  button.on("@mounted", () => {
    button.attrs`
    style = 
      transition: 0.7s all;
      border-${$postion}: 15px solid red;
      background-color: blue; \ 
    data-value`;

    setInterval(() => {
      $postion.new(positions[count >= 3 ? (count = 0) : ++count]);
    }, 1000);
  });
  return [span, () => "Diogo ", ["neves"], button];
};

const Wellcome = () => {
  const $global = Box("start");

  setInterval(() => $global.emit("*stop", new Date().toLocaleString()), 100);
  // O usuario precisar criar um elemento para usar hooks
  // a emisão so pode ser feita apos a montagem
  return [HelloWorld, HelloWorld];
};

render(Wellcome);

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
/*
const Buttons = () => {
  console.time("@mounted");

  const buttons = _button.make(10000);

  const divParent = _div(buttons);

  buttons.forEach((button) => button(0));

  setInterval(() => {
    buttons.forEach((button) => {
      button.set((values) => {
        return ++values;
      });
    });
  }, 0);

   setInterval(() => {
    divParent.set((values) => {
      values.splice(0, 100);
      return values;
    });
  }, 0);

  divParent.on("@mounted", () => console.timeEnd("@mounted"));

  return divParent;
};

//render(Buttons);
//const Counter = () => _button(0).set((v) => ++v, "click");
const Condition = () => {
  const button = _button(1);
  const strong = _strong(2);

  const $value = Box(button);

  const divParent = _div($value);

  setTimeout(() => {
    $value.new(strong);
  }, 4000);
  return divParent;
};*/

const HelloWorld = () => {
  const $postion = Box("top");
  const button = _button("Hello world!!!");
  const positions = ["top", "left", "bottom", "right"];
  const div = _div();

  div.on("@updated", () => {
    alert("m");
  });
  // Html("button", 5)("Hello world!!!") ou
  // tipo  Html<string, HTMLButtonElement>`button`
  // Html.div
  let count = 0;

  button.attrs`
  style = 
    transition: 0.7s all;
    border-${$postion}: 15px solid red;
    background-color: blue; \
  data-value`;

  button.on("@mounted", () => {
    setInterval(() => {
      const p = positions[count >= 3 ? (count = 0) : ++count];
      $postion.new(p);
    }, 800);
  });

  const fragment = _fragment(" A ", button, " C ");
  const secondFragment = _fragment(" 1 ");

  setTimeout(() => {
    fragment.set((values) => {
      values.unshift(secondFragment);

      return values;
    });
  }, 1000);

  setTimeout(() => {
    fragment.set((values) => {
      values.push(" QUero  ");

      return values;
    });
  }, 3000);
  console.log(fragment);

  return _div(fragment);
};

render(HelloWorld);
