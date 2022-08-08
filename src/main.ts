import { DOMNodeBoxEventMap } from "./types/dom-node-boxes";
import { lAttrs as lAttrs, lGetChildNodes } from "./engine/native-wrappers";
import Box, { WrapEmit, WrapOn } from "../../boxes/src/main";
import DOMB from "./engine/domb";
import { render, _button, _div, _fragment, _i, _strong } from "./index";

const lMounted = WrapOn<DOMNodeBoxEventMap["@mounted"]>("@mounted");
/*

onGlobalMounted(()=>{

});

box.it(() => {});

box.nodes(() => {});

box.subtree(() => {});

box.children(() => {});

*/

const lOnClick = WrapOn<
  DOMNodeBoxEventMap["click"],
  boolean | AddEventListenerOptions
>("click");

const lMouseover = WrapOn("mouseover");

const lEmitDiogo = WrapEmit("diogo");

const HelloWorld = () => {
  const $postion = Box("top").key("diogo-neves");

  // !render deve clonar a caixa casa já tenha sido adcionado

  const italic = DOMB<HTMLElement>`<i>Convertido!!!</i>`;

  // const Counter = () => _button(0).set((v) => ++v, lOnClick);

  // const password = Box().lock()
  // Box().unlock()

  const strong = _strong(" Dn ");

  const button = _button(strong, $postion, strong);
  lAttrs`
    style = 
      width: 250px;
      height: 150px;
      white-space: nowrap;
      overflow: hidden;
      transition: 0.7s all;
      border-${$postion}: 15px solid red;
      background-color: blue;
    `;

  const positions = ["top", "left", "bottom", "right"];

  const fragment = _fragment(button, italic, button);

  let count = 0;

  lMounted((e) => {
    setInterval(() => {
      const p = positions[count >= 3 ? (count = 0) : ++count];
      $postion.new(p);
    }, 1000);
  });

  return [fragment, fragment];
};
// lOnClick((e)=>e.values)

const Button = () => {
  const strong = _strong(0).it(() => {
    lMouseover((e) => {
      console.log(e);
    });
  });
  lOnClick(() => strong.set((v) => ++v));

  return _button(strong);
};

render([HelloWorld, Button]);

// box.defineKey();
// getBoxByKey()
/*

  const convert =HTMLB`
  <div>DIogo Neves</div>
  `;

  const d = document.createElement("div");
  d.innerHTML = convert;
  console.log(d);

const Buttons = () => {
  console.time("@created");

  const buttons = _button.make(10000);

  const div = _div(buttons);

  // CSSB``

  lOnClick((e) => {
    console.log(e);
  });

  buttons.forEach((button) => button(0));

  created(() => {
    console.timeEnd("@created");
  });

  // lMethod: metodos do usuario, tMethod metodos de libs de terceiros
  // e tambem wrrapers como Css(box)`` ou auto definir como nos eventos: lastBox Css``
  return div;
};
//Buttons().render();
render(Wellcome);

const buttons = Html<[]>`div 10000button`;
console.time("@created");

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

buttons[0].on("@created", () => {
  console.timeEnd("@created");
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

  console.time("@created");
  const div = Html`div`($box3);
  return div;
};*/
