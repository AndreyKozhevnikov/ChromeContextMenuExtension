/*global chrome escapeHTML initialize createLinkOnClick*/
/*eslint no-unused-vars: 1*/

/* eslint-disable */
{{{initializeTxt}}}
/* eslint-enable */

function createLink(url, titleObject){
  let escapedTitle = escapeHTML(titleObject.title);
  return escapedTitle;
}

/* eslint-disable */

{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{escapeHTMLTxt}}}

{{{copyToClipboardTxt}}}

/* eslint-enable */
function createItem(){
  chrome.contextMenus.create({id: 'plainTextItem', title: 'xPlainText', contexts: ['all'], onclick: createLinkOnClick});
}
initialize();
createItem();
