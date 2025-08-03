chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "markup2-context-menu",
    title: "Markup2 Action",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "markup2-context-menu") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => {
        alert('Markup2 context menu item clicked!');
      }
    });
  }
});
