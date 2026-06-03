let saveButton = document.getElementById("save");
let textCorrect = document.getElementById("textcorrect");

saveButton.addEventListener("click", async () => {
  let newInterval = document.getElementById("interval").value;

  // Check if not a number
  if (isNaN(parseInt(newInterval))) {
    let message = document.getElementById("message");
    message.innerHTML = "Not a valid interval";
    message.classList = "show";
    setTimeout(() => {
      message.classList = "hidden";
    }, "3000");
  } else {
    let message = document.getElementById("message");
    message.innerHTML = "Saved & Updated";

    // get active tabs
    const tabs = await new Promise((resolve) => {
      browser.tabs.query({ active: true }, (tabs) => {
        resolve(tabs);
      });
    });

    browser.storage.local.set({ interval: newInterval });
    browser.storage.local.set({ textcorrect: textCorrect.checked });

    message = document.getElementById("message");
    message.classList = "show";
    setTimeout(() => {
      message.classList = "hidden";
    }, "3000");
  }
});

const intervalFill = async () => {
  const interval = await new Promise((resolve) => {
    browser.storage.local.get("interval", (result) => {
      resolve(result["interval"]);
    });
  });

  if (interval) document.getElementById("interval").value = interval;
};

intervalFill();

browser.storage.local.get("textcorrect", (result) => {
  if (result["textcorrect"]) textCorrect.checked = true;
});
