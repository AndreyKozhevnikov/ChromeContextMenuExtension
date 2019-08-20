/*global chrome */
'use strict';

function handleItemClick(s, e) {
  let text = s.menuItemId;
  let script = `
   var text='` + text + `';
   var form = document.activeElement;
   var ta = form;
   var saveSelectionStart = ta.selectionStart;

   var newvalue = ta.value.slice(0,ta.selectionStart) + text + ta.value.slice(ta.selectionEnd,ta.length);
   // console.log("output : " + newvalue  + ", len : " + newvalue.length);
   var newSelectionEnd = ta.selectionStart + text.length;

   ta.value = newvalue;
   ta.selectionStart = ta.selectionEnd = (newSelectionEnd);      
  `;
  chrome.tabs.executeScript({ code: script });
}
function createItem() {
  chrome.contextMenus.create({ id: 'makeDocsTagsItem', title: 'Docs Tags', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'No code snippet', title: 'No code snippet', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'Bad code snippet', title: 'Bad code snippet', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'Obsolete info', title: 'Obsolete info', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'Doc structure', title: 'Doc structure', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'Insufficient info', title: 'Insufficient info', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'Empty topic', title: 'Empty topic', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.create({ id: 'No doc for a scenario', title: 'No doc for a scenario', parentId: 'makeDocsTagsItem', contexts: ['all'] });
  chrome.contextMenus.onClicked.addListener((s, e) => handleItemClick(s, e));
}
createItem();
