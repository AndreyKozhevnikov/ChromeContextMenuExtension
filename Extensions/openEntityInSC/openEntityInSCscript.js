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
function findTicketNoInText(textToSearch) {
  let regex = /[TESQKB]{1,2}\d{3,6}|A\d{1,4}/gi;
  let results = regex.exec(textToSearch);
  console.dir(textToSearch);
  console.dir(results);
  if (results != null)
    return results[0];
}
function findUserIdInText(textToSearch) {
  let regex = /A\d{5,8}/gi;
  let results = regex.exec(textToSearch);
  if (results != null)
    return results[0];
}
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

