//{initialize}


function createLink(url,titleObject){
 let ticketNo=findTicketNoInText(url);
 let res=`<sclink viewType="IDSubject" id="${ticketNo}"/>`;
 return res;
}

//{getLinkTitleFromTag}

//{createLinkOnClick}

//{findTicketNoInText}





//{copyToClipboard}

function createItems(){
  chrome.contextMenus.create({"id":'scLinkItem',"title": 'xCreate SC link', "contexts":['all'], "onclick": createLinkOnClick});
}
initialize();
createItems();
