/*eslint no-unused-vars: 1*/
/*global chrome initialize createLinkOnClick*/
/* eslint-disable */


function createLink(url, titleObject){
  /* eslint-enable */
  let fullTitle = titleObject.title;
  if (titleObject.additionalText != undefined){
    fullTitle = fullTitle + ' ' + titleObject.additionalText;
  }
  let st = `[${fullTitle}](${url})`;
  return st;
}
/* eslint-disable */
{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{copyToClipboardTxt}}}

{{{addToClipboard}}}

/* eslint-enable */
function createItems() {
  chrome.contextMenus.create({ id: 'markupItem', title: 'markup2', contexts: ['all'] });
  chrome.contextMenus.onClicked.addListener(function(i, t) {
    let link = createLinkOnClick(i, t);
    addToClipboard(link);
  });
}

createItem();
