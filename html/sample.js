function initialize() {
  document.addEventListener('copy', (ev) => {
    ev.preventDefault();
    const proxy = chrome.extension.getBackgroundPage().document.getElementById('clipboard_object')
    var text = proxy.value;
    ev.clipboardData.setData("text/plain", text);
    ev.clipboardData.setData("text/html", text);
  }, true);
}

function createHTMLLink(url,titleObject){
  let escapedTitle=escapeHTML(titleObject.title);
  let st=`<a href="${url}">${escapedTitle}</a>`;
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
  console.log(title);
  //remove ' | SC 3.0' from sc tickets
  let unwantedEnds=[' | SC 3.0', ' | DevExpress Support Center'];
  for (let unwantedEnd of unwantedEnds){
    if (title.endsWith(unwantedEnd)){
      title=title.replace(unwantedEnd,'');
    }
  }
  //handle dx documentation
  if (tab.url.startsWith('https://documentation.devexpress.com')||tab.url.startsWith('https://docs.devexpress.com')){
    let regex=/ \(DevExpress\..+\)$/gi;
    let results=regex.exec(title);
    if (results!=null){
      title=title.replace(results[0],'');
    }
    let lastTitle=title.split(' | ')[0];
     //fit documentation links to members
      let memberTypes=['property', 'method', 'event', 'interface', 'class']
      let splittedTitle=lastTitle.split(' ');
      if (splittedTitle.length>1){
        let memberType=splittedTitle[splittedTitle.length-1].toLowerCase();
       
        if (memberType!=undefined && memberTypes.includes(memberType)){
          additionalText=memberType;
          splittedTitle.splice(-1,1);
          title=splittedTitle.join(' ');
        }else{
          title=lastTitle;
        }
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
  let regex=/[TESQKA]{1,2}\d{3,6}/gi;
  let results=regex.exec(textToSearch);
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
function escapeHTML(text) {
  return text ? text.replace(/[&<>'"]/g, convertHTMLChar) : text;
}

function convertHTMLChar(c) { return charMap[c]; }
var charMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&apos;',
  '"': '&quot;'
};

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
  chrome.contextMenus.create({"id":'htmlItem',"title": 'HTML', "contexts":['all'], "onclick": createLinkOnClick});
 // chrome.contextMenus.create({'id':'markDownItem',"title": 'Markdown', "contexts":['all'], "onclick": createLinkOnClick});
 // chrome.contextMenus.create({"title": 'Open in SC', "contexts":['all'],    "onclick": openTicketInSC});
}
initialize();
createItems();
// Create one test item for each context type.


//https://github.com/ku/CreateLink/blob/master/src/createlink.js