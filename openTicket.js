function openTicketInSC(info,tab){
  let scTemplate = 'https://isc.devexpress.com/Thread/WorkplaceDetails?id=';
  let ticketNo;
  if (info.selectionText==null){
    ticketNo=findTicketNoInText(tab.url);
  }
  else{
    ticketNo=findTicketNoInText(info.selectionText);
  }
  if (ticketNo!=undefined)
    chrome.tabs.create({ url: scTemplate+ticketNo });
}
function findTicketNoInText(textToSearch){
  let regex=/[TESQKAB]{1,2}\d{3,6}/gi;
  let results=regex.exec(textToSearch);
  console.dir(textToSearch);
  console.dir(results);
  if (results!=null)
    return results[0];
}


//{copyToClipboard}

function createItems(){
  chrome.contextMenus.create({"title": 'Open in SC', "contexts":['all'],    "onclick": openTicketInSC});
}

createItems();
