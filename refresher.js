var zendeskRefreshId;

const clickRefresh = () => {
  const refresh = document.querySelectorAll(
    "[data-test-id='views_views-list_header-refresh']",
  )[0];
  // Only click when page is a filter/view
  if (
    refresh !== undefined &&
    window.location.href.includes(".zendesk.com/agent/filters/")
  ) {
    refresh.click();
  }
};

const setupInterval = () => {
  browser.storage.local.get("interval", (result) => {
    let seconds = 10; // default interval
    if (result["interval"]) seconds = result["interval"];
    if (zendeskRefreshId) clearInterval(zendeskRefreshId);
    zendeskRefreshId = setInterval(clickRefresh, seconds * 1000);
  });
};

// Restore interval after inactivity
window.addEventListener("focus", () => {
  setupInterval();
});

setupInterval();

browser.storage.local.onChanged.addListener((result) => {
  if (!result["interval"] || !result["interval"].newValue) return;
  if (zendeskRefreshId) clearInterval(zendeskRefreshId);
  zendeskRefreshId = setInterval(
    clickRefresh,
    result["interval"].newValue * 1000,
  );
});
