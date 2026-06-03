let fixText = false;

const fixText = () => {
    for (const comment of document.querySelectorAll(".zd-comment")) {
        const allDescendants = comment.querySelectorAll("*");
        for (const el of allDescendants) {
            if (window.getComputedStyle(el).color === 'rgb(0, 0, 0)')
                el.style.color = 'rgb(255, 255, 255)';
        }
    }
};

const setupFixMutation = () => {
  fixText = true;
  fixText();
  setTimeout(() => {
    fixText(); // call again in case no further mutations occur
    new MutationObserver((mutationList) => {
        correctText();
    }).observe(document, {subtree: true, childList: true});
  }, 3000);
};

chrome.storage.local.get("fixtext", (result) => {
    fixText = result["fixtext]
    if (fixText)
        setupFixMutation();   
});

chrome.storage.local.onChange.addListener(()=>{
    if (!fixText && result["fixtext])
        setupFixMutation();   
});
