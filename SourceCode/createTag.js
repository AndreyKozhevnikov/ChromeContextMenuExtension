/*eslint no-unused-vars: 1*/
/*global chrome initialize createLinkOnClick escapeHTML findTicketNoInText*/
/* eslint-disable */
{{{initializeTxt}}}

{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{findTicketNoInTextTxt}}}

{{{escapeHTMLTxt}}}

{{{copyToClipboardTxt}}}

function createLink(url, titleObject){
  /* eslint-enable */
  let ticketNo = findTicketNoInText(url);
  let res = `<sclink viewType="IDSubject" id="${ticketNo}"/>`;
  res = escapeHTML(res);
  return res;
}

function createItem(){
  chrome.contextMenus.create({id: 'scLinkItem', title: 'xCreate SC link', contexts: ['all'], onclick: createLinkOnClick});
}
initialize();
createItem();
