{{{initializeTxt}}}

function createLink(url,titleObject){
  let escapedTitle=escapeHTML(titleObject.title);
  return escapedTitle;
}

{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{escapeHTMLTxt}}}

{{{copyToClipboardTxt}}}

function createItem(){
  chrome.contextMenus.create({"id":'plainTextItem',"title": 'xPlainText', "contexts":['all'], "onclick": createLinkOnClick});
}
initialize();
createItem();