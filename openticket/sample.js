function initialize() {
  document.addEventListener('copy', (ev) => {
    ev.preventDefault();
    const proxy = chrome.extension.getBackgroundPage().document.getElementById('clipboard_object')
    var text = proxy.value;
    //console.log(text);
    ev.clipboardData.setData("text/plain", text);
    ev.clipboardData.setData("text/html", text);
  }, true);
}

function createHTMLLink(url,titleObject){
  //console.dir(titleObject);
  let st=`<a href="${url}">${titleObject.title}</a>`;
  if (titleObject.additionalText!=undefined){
    st=st+' '+titleObject.additionalText;
  }
  return st;
}

function createMarkDownLink(url,titleObject){
  let fullTitle=titleObject.title;
  if (titleObject.additionalText!=undefined){
   fullTitle=fullTitle +' '+titleObject.additionalText;
 } 
 let st=`[${fullTitle}](${url})`;
 return st;
}

function getLinkTitleFromTag(tab){
  let title=tab.title;
  let additionalText;
  //remove ' | SC 3.0' from sc tickets
  let unwantedEnds=[' | SC 3.0', ' | DevExpress Support Center'];
  for (let unwantedEnd of unwantedEnds){
    if (title.endsWith(unwantedEnd)){
      title=title.replace(unwantedEnd,'');
    }
  }
  //handle dx documentation
  if (tab.url.startsWith('https://documentation.devexpress.com')){
   let lastTitle=title.split(' | ')[0];

     //fit documentation links to members
     let memberTypes=['property', 'method', 'event', 'interface', 'class']
     let splittedTitle=lastTitle.split(' ');
     let memberType=splittedTitle[1].toLowerCase();
     
     if (memberType!=undefined && memberTypes.includes(memberType)){
      console.log('member');
      additionalText=memberType;
      title=splittedTitle[0];
    }
    else{
      title=lastTitle;
    }
  }
  let titleResult={
    title, additionalText
  }
  return titleResult;
}

function createLinkOnClick(info, tab) {

  let url=tab.url;
  let title=tab.title;
  let titleObject;

  if (info.selectionText==null){
    titleObject=getLinkTitleFromTag(tab);
  }else{
    titleObject={title:info.selectionText};
  }
  let link;
  switch(info.menuItemId){
    case 'htmlItem':
    link=createHTMLLink(url,titleObject);
    break;
    case 'markDownItem':
    link=createMarkDownLink(url,titleObject);
    break;
  }
  copyToClipboard(link);
}

function findTicketNoInText(textToSearch){
  let regex=/[TESQ]\d{4,6}/g;
  let results=regex.exec(textToSearch);
  console.dir(textToSearch);
  console.dir(results);
  if (results!=null)
    return results[0];
}

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



function copyToClipboard(text) {
  const backgroundPage = chrome.extension.getBackgroundPage()
  let textarea = document.getElementById('clipboard_object');
  if (!textarea) {
    textarea = backgroundPage.document.createElement('textarea')
    textarea.setAttribute('id', 'clipboard_object')
    backgroundPage.document.body.appendChild(textarea)
  }
  textarea.value = text;
  textarea.select();
  document.execCommand("copy");
}

function createItems(){
 // chrome.contextMenus.create({"id":'htmlItem',"title": 'HTML', "contexts":['all'], "onclick": createLinkOnClick});
 // chrome.contextMenus.create({'id':'markDownItem',"title": 'Markdown', "contexts":['all'], "onclick": createLinkOnClick});
  chrome.contextMenus.create({"title": 'Open in SC', "contexts":['all'],    "onclick": openTicketInSC});
}
//initialize();
createItems();
// Create one test item for each context type.


//https://github.com/ku/CreateLink/blob/master/src/createlink.js