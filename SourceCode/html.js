/*eslint no-unused-vars: 1*/
/*global chrome initialize createLinkOnClick escapeHTML*/
/* eslint-disable */
{{{initializeTxt}}}



function createLink(url, titleObject){
  /* eslint-enable */
  let escapedTitle = escapeHTML(titleObject.title);
  let st = `<a href="${url}">${escapedTitle}</a>`;
  if (titleObject.additionalText != undefined){
    st = st + ' ' + titleObject.additionalText;
  }
  return st;
}

/* eslint-disable */
{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{escapeHTMLTxt}}}

{{{copyToClipboardTxt}}}
/* eslint-enable */

function createItem(){
  chrome.contextMenus.create({id: 'htmlItem', title: 'HTML', contexts: ['all'], onclick: createLinkOnClick});
}
initialize();
createItem();
