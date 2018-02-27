// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}


function createItems(){
  chrome.contextMenus.create({"title": 'HTML1', "contexts":['all'],
   "onclick": genericOnClick});
  chrome.contextMenus.create({"title": 'Markdown', "contexts":['all'],
   "onclick": genericOnClick});
  chrome.contextMenus.create({"title": 'Open in SC', "contexts":['all'], 
   "onclick": genericOnClick});
}

createItems();
// Create one test item for each context type.


