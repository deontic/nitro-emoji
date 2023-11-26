"use strict";

// using chrome-extension cli
// use npm run watch

const steal = ({ target }) => {
  const txt = target.t;
  const src = target.parentNode.parentNode.parentNode.children[0].src;
  const s = src.replace(/\?.*/, "?size=48&c="); //7cf4e2a071dbc399d01663&c=");
  navigator.clipboard.writeText(s);

  // saving to {txt: s} would save to key 'txt'
  const obj = {};
  obj[txt] = s;
  chrome.storage.sync.set(obj);
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("emoji")) {
    const maxWait = 20; // * 250ms (5000ms)
    let i = 0;
    const self = setInterval(() => {
      const label = document.getElementsByClassName(
        "defaultColor__77578 text-md-semibold__4cb23"
      )[0];
      if (label) {
        const content = label.textContent;
        label.innerHTML += '<a id="steal_content">(steal)</a>';
        const steal1 = document.getElementById("steal_content");
        steal1.t = content;

        steal1.addEventListener("click", steal);
      }
      // either use an arbitrary wait time
      // or wait till the element is added
      if (++i === maxWait || label) {
        clearInterval(self);
      }
    }, 250);
  }
});

// let prevText;

// let iHeight;
const setImg = (match) => {
  // const container = document.querySelector('span[data-slate-node="text"]');
  // container.replaceChildren(container.children[0])

  // container.innerHTML = ''

  // document.querySelector('div[role="textbox"]').textContent = ''

  setTimeout(() => {
    document.execCommand("selectAll", false, null);
    setTimeout(() => {
      document.execCommand("paste");
      setTimeout(()=>{
        const inner = document.querySelector('span[data-slate-string="true"]');
        if (inner) {
          inner.innerHTML = `<img src="${match}">`;
        }
      }, 100)
    
    }, 200);
  }, 50);
};

// const inner = document.querySelectorAll('span[data-slate-string="true"]');
// if (inner) {
// inner[0].innerHTML = `<img src="${match}">`;
// console.log('inner::::', inner)

// const el = document.createElement('img')
// el.setAttribute('src', match)
// inner[0].appendChild(el)

// console.log("removing: ", document.querySelector(".fakeLink__57dfc"));
// document.querySelector(".fakeLink__57dfc").remove();

// if (inner.length > 1) {
//   console.log("more than 11111");
//   inner[1].parentElement.removeChild(inner[1]);
// }
// if (document.querySelector(".slateContainer_b692b3")) {
//   document.querySelector(".slateContainer_b692b3").style.height = iHeight;
// }
//   }
// };
const onKeyDown = async (input) => {
  // if ()

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 50);
  });
  input = input.target;
  const txt = input.textContent;
  /*
  if (
    input.key === "Backspace" ||
    input.key === "Delete" ||
    input.key === "Space"
  ) {
    return;
  }

  if (txt.includes("7cf4e2a071dbc399d01663")) {
    setImg(
      txt.match(
        /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      )
    );
  }
  */

  // if (prevText === txt) {console.log('not running'); return};
  // prevText = txt;

  // const r = /:([^:]+):/;
  const r = /:([^:]+)/;
  const found = txt.match(r);

  console.log("found = ", found);

  if (found) {
    let result, match;
    try {
      match = found[1];

      /// not working ????????
      // randomly stops working.....................................
      ///...........
      // error in Network tab says web request not authorized or smth
      // maybe check what url is being saved and maybe check if ?c= is ruining stuff
      // ????????????
      // what changed recently bro fix it

      match = `:${match.replace("Emoji", "").replace("matching", "").trim()}:`;
      console.log("retrieving.......", match);
      result = await chrome.storage.sync.get([match]);
    } catch (e) {
      console.log("error while retrieving: ", e);
      return;
    }
    if (
      Object.keys(result).length != 0 &&
      !input.textContent.includes("Message ")
    ) {
      navigator.clipboard.writeText(result[match]);
      // discord won't let you automate input into the textbox
      // document.querySelector('span[data-slate-string="true"]').textContent = replacement;
      // input.textContent = txt.replace(r, result[match]);
      // document.execCommand("delete", false, null);
      // todo: use alternative to deprecated document.execCommand
      document.execCommand("selectAll", false, null);
      setTimeout(() => {
        document.execCommand("paste");
        // @todo since imgs send in their own line anyway, don't let user replace it unless they are backspacing/removing it
        for (let i = 1; i < 2; ++i) { // i=5
          setTimeout(setImg.bind(null, result[match]), 50 * i ** 2.65);
        }
      }, 100);
    }
  }
};
const ii = setInterval(() => {
  const input = document.querySelector("form>div");
  if (input) {
    input.addEventListener("keydown", onKeyDown);
    // iHeight = document.querySelector(".slateContainer_b692b3").style.height;
    clearInterval(ii);
  }
}, 400);

setInterval(() => {
  console.log("..");
}, 5000);
