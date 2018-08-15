/*eslint no-unused-vars: 1*/
/*global chrome initialize createLinkOnClick*/
/* eslint-disable */
{{{initializeTxt}}}

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
/* eslint-enable */
function createItem(){
  chrome.contextMenus.create({id: 'markDownItem', title: 'Markdown', contexts: ['all'], onclick: createLinkOnClick});
}
initialize();
createItem();
