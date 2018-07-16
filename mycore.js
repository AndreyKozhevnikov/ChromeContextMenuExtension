let fs = require('fs');

function initialize() {
  document.addEventListener('copy', (ev) => {
    ev.preventDefault();
    const proxy = chrome.extension.getBackgroundPage().document.getElementById('clipboard_object')
    var text = proxy.value;
    ev.clipboardData.setData("text/plain", text);
    ev.clipboardData.setData("text/html", text);
  }, true);
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
  let link=createLink(url,titleObject);
  copyToClipboard(link);
}

function getLinkTitleFromTag(tab){
  let title=tab.title;
  let additionalText;
  console.log(title);
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

function findTicketNoInText(textToSearch){
  let regex=/[TESQKAB]{1,2}\d{3,6}/gi;
  let results=regex.exec(textToSearch);
  console.log(textToSearch);
 console.log(results);
  if (results!=null)
    return results[0];
}

function createJSON(){
  let jsonData={};
  jsonData.initializeTxt=initialize.toString();
  jsonData.createLinkOnClickTxt=createLinkOnClick.toString();
  jsonData.getLinkTitleFromTagTxt=getLinkTitleFromTag.toString();
  jsonData.copyToClipboardTxt=copyToClipboard.toString();
  jsonData.findTicketNoInTextTxt=findTicketNoInText.toString();


 //console.log(jsonData);
  fs.writeFile('myCoreJSON.txt',JSON.stringify(jsonData));
}
createJSON();