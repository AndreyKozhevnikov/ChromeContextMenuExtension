/*global chrome findUserIdInText findTicketNoInText findMailInText */
'use strict';
function openTicketInSC(ticketNo) {
  let scTemplate = 'https://isc.devexpress.com/Search/ById?id=';
  chrome.tabs.create({ url: scTemplate + ticketNo });
}
function openUserIdInSC(userIdOrMail) {
  let scTemplate = 'https://internal.devexpress.com/supportstat/Tools/ViewUser?customer=';
  chrome.tabs.create({ url: scTemplate + userIdOrMail });
}
/* eslint-disable */
function findTicketNoInText(textToSearch) {
  let regex = /[TESQKBC]{1,2}A?\d{3,7}/gi;
  let regexShortA = /(A\d{1,4})\D/gi;
  let results = regex.exec(textToSearch);
  let resultsShortA = regexShortA.exec(textToSearch);
  console.dir(textToSearch);
  console.dir(results);
  if (results != null)
    return results[0];
  if (resultsShortA != null)
    return resultsShortA[1];
}
function findUserIdInText(textToSearch) {
  let regex = /([^K]|^)(A\d{5,8})/gi;
  let results = regex.exec(textToSearch);
  if (results != null)
    return results[results.length - 1];
}
function findMailInText(textToSearch) {
  let regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
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
  chrome.contextMenus.create({ title: 'Open in SC', contexts: ['all'], onclick: openEntityInSC });
}

createItems();

