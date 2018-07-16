//{initialize}

function createLink(url,titleObject){
  let escapedTitle=escapeHTML(titleObject.title);
  let st=`<a href="${url}">${escapedTitle}</a>`;
  if (titleObject.additionalText!=undefined){
    st=st+' '+titleObject.additionalText;
  }
  return st;
}

//{getLinkTitleFromTag}

//{createLinkOnClick}

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

//{copyToClipboard}

function createItem(){
  chrome.contextMenus.create({"id":'htmlItem',"title": 'HTML', "contexts":['all'], "onclick": createLinkOnClick});
}
initialize();
createItems();
