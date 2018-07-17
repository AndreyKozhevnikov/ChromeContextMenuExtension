{{{initializeTxt}}}

{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{findTicketNoInTextTxt}}}

{{{copyToClipboardTxt}}}

function createLink(url,titleObject){
 let ticketNo=findTicketNoInText(url);
 let res=`<sclink viewType="IDSubject" id="${ticketNo}"/>`;
 return res;
}

function createItem(){
  chrome.contextMenus.create({"id":'scLinkItem',"title": 'xCreate SC link', "contexts":['all'], "onclick": createLinkOnClick});
}
initialize();
createItem();
