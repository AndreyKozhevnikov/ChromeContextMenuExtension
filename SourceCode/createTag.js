{{{initializeTxt}}}

{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{findTicketNoInTextTxt}}}

{{{escapeHTMLTxt}}}

{{{copyToClipboardTxt}}}

function createLink(url,titleObject){
 let ticketNo=findTicketNoInText(url);
 let res=`<sclink viewType="IDSubject" id="${ticketNo}"/>`;
 res=escapeHTML(res);
 return res;
}

function createItem(){
  chrome.contextMenus.create({"id":'scLinkItem',"title": 'xCreate SC link', "contexts":['all'], "onclick": createLinkOnClick});
}
initialize();
createItem();
