/*global chrome */
'use strict';

function handleItemClick() {
  chrome.tabs.executeScript(null, { file: 'content.js' });
}

function createItem() {
  chrome.contextMenus.create({ id: 'createTextBoxItem', title: 'xCreate TextBox', contexts: ['all'] });
  chrome.contextMenus.onClicked.addListener(() => handleItemClick());
}

createItem();
