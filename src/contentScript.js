"use strict";

// using chrome-extension cli
// use npm run watch

const steal = ({ target }) => {
  const txt = target.t;
  const src = target.parentNode.parentNode.parentNode.children[0].src;
  const s = src.replace(/\?.*/, "?size=48");
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

let prevText;

const setImg = (match) => {
  document.querySelector(
    'span[data-slate-string="true"]'
  ).innerHTML = `<img src="${match}">`;
};
const onKeyDown = async (input) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 50);
  });
  input = input.target;
  const txt = input.textContent;

  if (prevText === txt) return;
  prevText = txt;

  // const r = /:([^:]+):/;
  const r = /:([^:]+)/;
  const found = txt.match(r);

  if (found) {
    let result, match;
    try {
      match = found[1];
      match = `:${match.replace("Emoji", "").replace("matching", "").trim()}:`;
      // console.log('retrieving.......', match)
      result = await chrome.storage.sync.get([match]);
    } catch (e) {
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
        for (let i = 1; i < 5; ++i) {
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
    clearInterval(ii);
  }
}, 400);
