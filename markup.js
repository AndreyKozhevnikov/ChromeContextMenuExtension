{{{initializeTxt}}}

function createLink(url,titleObject){
  let fullTitle=titleObject.title;
  if (titleObject.additionalText!=undefined){
   fullTitle=fullTitle +' '+titleObject.additionalText;
 } 
 let st=`[${fullTitle}](${url})`;
 return st;
}

{{{getLinkTitleFromTagTxt}}}

{{{createLinkOnClickTxt}}}

{{{copyToClipboardTxt}}}

function createItem(){
  chrome.contextMenus.create({'id':'markDownItem',"title": 'Markdown', "contexts":['all'], "onclick": createLinkOnClick});
}
initialize();
createItem();
