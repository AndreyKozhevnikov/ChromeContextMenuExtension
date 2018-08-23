/*global chrome findUserIdInText findTicketNoInText findMailInText */
'use strict';
function openTicketInSC(ticketNo) {
  let scTemplate = 'https://manhattan.devexpress.com/internal/ticket/details/';
  chrome.tabs.create({ url: scTemplate + ticketNo });
}
function openUserIdInSC(userIdOrMail) {
  let scTemplate = 'https://internal.devexpress.com/supportstat/Tools/ViewUser?customer=';
  chrome.tabs.create({ url: scTemplate + userIdOrMail });
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
function findMailInText(textToSearch) {
  let regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  let results = regex.exec(textToSearch);
  if (results != null)
    return results[0];
}
/* eslint-enable */
function openEntityInSC(info, tab) {
  let textToSearch = info.selectionText ? info.selectionText : tab.url;
  let userId = findUserIdInText(textToSearch);
  let userIdOrMail = userId || findMailInText(textToSearch);
  if (userIdOrMail != undefined) {
    openUserIdInSC(userIdOrMail);
  } else {
    let ticketNo = findTicketNoInText(textToSearch);
    if (ticketNo != undefined)
      openTicketInSC(ticketNo);
  }
}

function createItems() {
  chrome.contextMenus.create({ title: 'Open in AD', contexts: ['all'], onclick: openEntityInSC });
}

createItems();

