let textCorrect = false;
let mutationObserver;
const fixText = (dark = true) => {
  for (const comment of document.querySelectorAll(".zd-comment")) {
    const allDescendants = comment.querySelectorAll("*");
    for (const el of allDescendants) {
      if (dark && window.getComputedStyle(el).color === "rgb(0, 0, 0)")
        el.style.color = "rgb(255, 255, 255)";
      else if (
        !dark &&
        window.getComputedStyle(el).color === "rgb(255, 255, 255)"
      )
        el.style.color = "rgb(0, 0, 0)";
    }
  }
};

const setupFixMutation = () => {
  setTimeout(() => {
    fixText();
    mutationObserver = new MutationObserver((mutationList) => {
      fixText();
    }).observe(document, { subtree: true, childList: true });
  }, 1000); // timeout to reduce flashing
};

browser.storage.local.get("textcorrect", (result) => {
  textCorrect = result["textcorrect"];
  if (textCorrect) setupFixMutation();
});

browser.storage.local.onChanged.addListener((result) => {
  if (!result["textcorrect"]) return;
  if (result["textcorrect"].newValue) {
    textCorrect = true;
    setupFixMutation();
  } else if (!result["textcorrect"].newValue) {
    textCorrect = false;
    if (mutationObserver) mutationObserver.disconnect();
    fixText(false);
  }
});
