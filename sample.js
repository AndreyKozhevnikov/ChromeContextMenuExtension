// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function initialize() {
  document.addEventListener('copy', (ev) => {
    ev.preventDefault();

    const proxy = chrome.extension.getBackgroundPage().document.getElementById('clipboard_object')
    var text = proxy.value;

    ev.clipboardData.setData("text/plain", text);
    ev.clipboardData.setData("text/html", text);
  }, true);
}

function createHTMLLink(url,title){
  let st='<a href=\"'+url+'\">'+title+'</a>';
  return st;
}

function getLinkTitleFromTag(tab){
  let title=tab.title;
  
  //remove ' | SC 3.0' from sc tickets
  const scEnd=' | SC 3.0'
  if (title.endsWith(scEnd)){
    title=title.replace(scEnd);
  }


  return title;
}

function createHTMLOnClick(info, tab) {

  let url=tab.url;
  let title=tab.title;
  let linkTitle=info.selectionText;

  if (linkTitle==null){
    linkTitle=getLinkTitleFromTag(tab);
  }
  let link=createHTMLLink(url,linkTitle);
  copyToClipboard(link);
  
  
  console.log('url '+url + ' selectionText -' +linkTitle+' title - '+title );
  //console.log("item " + info.menuItemId + " was clicked");
  //console.log("info: " + JSON.stringify(info));
  //console.log("tab: " + JSON.stringify(tab));
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
  chrome.contextMenus.create({"title": 'HTML1', "contexts":['all'],
   "onclick": createHTMLOnClick});
  //chrome.contextMenus.create({"title": 'Markdown', "contexts":['all'],   "onclick": genericOnClick});
  //chrome.contextMenus.create({"title": 'Open in SC', "contexts":['all'],    "onclick": genericOnClick});
}
initialize();
createItems();
// Create one test item for each context type.


//https://github.com/ku/CreateLink/blob/master/src/createlink.js