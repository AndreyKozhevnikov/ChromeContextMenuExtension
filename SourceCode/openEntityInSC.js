/*global chrome findUserIdInText findTicketNoInText */
'use strict';
function openTicketInSC(ticketNo) {
  let scTemplate = 'https://isc.devexpress.com/Thread/WorkplaceDetails?id=';
  chrome.tabs.create({ url: scTemplate + ticketNo });
}
function openUserIdInSC(userId) {
  let scTemplate = 'https://internal.devexpress.com/supportstat/Tools/ViewUser?customer=';
  chrome.tabs.create({ url: scTemplate + userId });
}
/* eslint-disable */
{{{findTicketNoInTextTxt}}}
{{{findUserIdInTextTxt}}}
/* eslint-enable */
function openEntityInSC(info, tab) {
  let textToSearch = info.selectionText ? info.selectionText : tab.url;
  let userId = findUserIdInText(textToSearch);
  if (userId != undefined) {
    openUserIdInSC(userId);
  } else {
    let ticketNo = findTicketNoInText(textToSearch);
    if (ticketNo != undefined)
      openTicketInSC(ticketNo);
  }
}

function createItems() {
  chrome.contextMenus.create({ title: 'Open in SC', contexts: ['all'], onclick: openEntityInSC });
}

createItems();

